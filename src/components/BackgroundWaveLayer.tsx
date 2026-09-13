"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * BackgroundWaveLayer:
 * Dedicated decorative SVG/CSS background layer positioned behind all content.
 * Gently flows with scroll position without touching or bending main content containers.
 */
export function BackgroundWaveLayer() {
  const { scrollYProgress } = useScroll();

  // Subtle vertical parallax on the background decorative shapes
  const bgTranslateY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgTranslateY2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const waveShift = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Ambient background glow orbs */}
      <motion.div
        style={{ y: bgTranslateY1 }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-teal-600/[0.04] blur-3xl"
      />
      <motion.div
        style={{ y: bgTranslateY2 }}
        className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-teal-800/[0.04] blur-3xl"
      />

      {/* Subtle flowing SVG background wave line */}
      <motion.svg
        style={{ x: waveShift }}
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-1/2 left-0 w-[120%] -ml-[10%] h-[600px] -translate-y-1/2 opacity-[0.03] text-teal-400"
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
    </div>
  );
}
