"use client";

import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

/**
 * BackgroundWaveLayer:
 * Dedicated decorative starfield & SVG background layer positioned behind all content.
 * Gently responds to scroll velocity without touching or bending main content containers.
 */
export function BackgroundWaveLayer() {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Velocity-driven displacement:
  // Downward scroll (velocity > 0) -> waves move upward (negative Y)
  // Upward scroll (velocity < 0) -> waves move downward (positive Y)
  // Stop scroll (velocity = 0) -> smoothly springs back to 0
  // Capped at ~15px max movement
  const rawVelocityY = useTransform(scrollVelocity, [-2500, 0, 2500], [15, 0, -15]);
  const smoothVelocityY = useSpring(rawVelocityY, {
    damping: 24,
    stiffness: 160,
    mass: 0.5,
  });

  // Parallax on decorative ambient glows
  const bgTranslateY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgTranslateY2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const waveShift = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Uiverse-Style 3-Depth Starfield / Sprinkle Effect (Velocity Responsive) */}
      <motion.div style={{ y: smoothVelocityY }} className="absolute inset-0">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </motion.div>

      {/* Ambient background glow orbs */}
      <motion.div
        style={{ y: bgTranslateY1 }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.03] blur-3xl"
      />
      <motion.div
        style={{ y: bgTranslateY2 }}
        className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.03] blur-3xl"
      />
      <div className="absolute top-2/3 left-1/5 w-[400px] h-[400px] rounded-full bg-violet-600/[0.02] blur-3xl" />

      {/* Subtle flowing SVG background wave line responding to scroll velocity */}
      <motion.div
        style={{ y: smoothVelocityY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.svg
          style={{ x: waveShift }}
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[120%] -ml-[10%] h-[600px] opacity-[0.04] text-teal-400"
        >
          <path
            d="M-100,300 C200,100 500,500 800,280 C1100,60 1400,450 1600,250"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M-100,360 C250,180 550,560 850,340 C1150,120 1450,510 1650,310"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            fill="none"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
