"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export function CursorWave() {
  const [mounted, setMounted] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const pointIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smooth liquid spring interpolation
  const springConfig = { damping: 24, stiffness: 240, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Detect if device has a precise pointer (mouse) vs touch, or prefers reduced motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsPointerDevice(false);
      return;
    }

    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const now = performance.now();
      if (now - lastTrailTime > 40) {
        lastTrailTime = now;
        const newPoint = { id: pointIdRef.current++, x: e.clientX, y: e.clientY };
        setTrail((prev) => [...prev.slice(-4), newPoint]);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const newRipple = { id: rippleIdRef.current++, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-2), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const shouldHover = Boolean(
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[role='button']") ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      );
      setIsHovering((prev) => (prev !== shouldHover ? shouldHover : prev));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isPointerDevice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Tiny Teal Particle Trail */}
      {trail.map((point, index) => {
        const ratio = (index + 1) / trail.length;
        return (
          <div
            key={point.id}
            className="absolute rounded-full bg-cyan-400 pointer-events-none transition-opacity duration-300"
            style={{
              left: point.x,
              top: point.y,
              width: 3.5 * ratio,
              height: 3.5 * ratio,
              transform: "translate(-50%, -50%)",
              opacity: 0.5 * ratio,
              boxShadow: "0 0 5px rgba(34, 211, 238, 0.6)",
            }}
          />
        );
      })}

      {/* Subtle Click Ripple */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ width: 8, height: 8, opacity: 0.6 }}
            animate={{ width: 44, height: 44, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute rounded-full border border-cyan-400 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 8px rgba(34, 211, 238, 0.4)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Delicate spring-interpolated ripple ring */}
      <motion.div
        className="absolute rounded-full border border-teal-500/25 dark:border-cyan-400/35 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 34 : 22,
          height: isHovering ? 34 : 22,
          backgroundColor: isHovering ? "rgba(34, 211, 238, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Center subtle teal/white sprinkle dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-teal-500/80 dark:bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.7)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
