import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
  depth: number;
}

export const ParticleSelfBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
      radius: 140,
    };

    const colors = [
      "rgba(56, 189, 248, ", // cyan
      "rgba(255, 255, 255, ", // white
      "rgba(129, 140, 248, ", // indigo
      "rgba(147, 197, 253, ", // ice blue
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Determine count based on viewport area
      const count = Math.min(Math.floor((width * height) / 11000), 160);
      particles = [];

      for (let i = 0; i < count; i++) {
        const depth = 0.4 + Math.random() * 0.6; // 0.4 to 1.0 depth factor
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55 * depth,
          vy: (Math.random() - 0.5) * 0.55 * depth,
          baseRadius: 1 + Math.random() * 2 * depth,
          radius: 1 + Math.random() * 2 * depth,
          alpha: 0.25 + Math.random() * 0.65,
          color: colorPrefix,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
          depth,
        });
      }
    };

    initParticles();

    // Mouse & Touch interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const maxConnectDist = 110;
    const maxConnectDistSq = maxConnectDist * maxConnectDist;

    const render = () => {
      // Lerp mouse
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep space ambient radial glow
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      grad.addColorStop(0, "rgba(14, 28, 48, 0.45)");
      grad.addColorStop(0.5, "rgba(5, 10, 20, 0.25)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Constellation Lines first
      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * p1.alpha * p2.alpha;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Particles
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Pulse
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulsePhase) * 0.2);

        // Boundary wrap
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Mouse deflection & interaction (particle-self physics)
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < mouse.radius && mDist > 0) {
            const force = (1 - mDist / mouse.radius) * 3.5;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }

        // Draw particle dot with glow
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = p.depth > 0.7 ? 8 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-self-canvas"
      aria-hidden="true"
    />
  );
};

export default ParticleSelfBackground;
