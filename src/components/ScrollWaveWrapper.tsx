"use client";

import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

interface ScrollWaveWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollWaveWrapper({ children, className = "" }: ScrollWaveWrapperProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map velocity (-2000px/s to 2000px/s) to gentle subtle skew (-1.2deg to 1.2deg)
  const rawSkew = useTransform(scrollVelocity, [-2500, 0, 2500], [-1.2, 0, 1.2]);
  const smoothSkew = useSpring(rawSkew, {
    damping: 28,
    stiffness: 180,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ skewY: smoothSkew }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
