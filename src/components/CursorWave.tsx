"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorWave() {
  const [mounted, setMounted] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Smooth liquid spring interpolation
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Secondary delayed spring for subtle wave lag effect
  const waveSpringConfig = { damping: 32, stiffness: 120, mass: 0.8 };
  const waveX = useSpring(mouseX, waveSpringConfig);
  const waveY = useSpring(mouseY, waveSpringConfig);

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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted || !isPointerDevice) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Delicate spring-interpolated ripple ring */}
      <motion.div
        className="absolute rounded-full border border-teal-500/25 dark:border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.12)]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 36 : 24,
          height: isHovering ? 36 : 24,
          backgroundColor: isHovering ? "rgba(34, 211, 238, 0.06)" : "transparent",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Center subtle teal/white sprinkle dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-teal-500/80 dark:bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.6)]"
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
