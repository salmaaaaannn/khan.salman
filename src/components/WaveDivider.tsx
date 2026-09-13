"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WaveDividerProps {
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ flip = false, className = "" }: WaveDividerProps) {
  const { scrollYProgress } = useScroll();
  
  // Subtle wave translation driven by scroll
  const waveX = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none py-4 sm:py-6 ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <motion.svg
        style={{ x: waveX }}
        viewBox="0 0 1440 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[105%] -ml-[2.5%] h-7 sm:h-10 text-teal-500/10"
      >
        <path
          d="M0 32C240 10 480 54 720 32C960 10 1200 54 1440 32V74H0V32Z"
          fill="currentColor"
        />
        <path
          d="M0 32C240 10 480 54 720 32C960 10 1200 54 1440 32"
          stroke="rgba(20, 184, 166, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </motion.svg>
    </div>
  );
}
