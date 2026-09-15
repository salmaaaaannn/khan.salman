"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

export function BackgroundWaveLayer() {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothPointerX = useSpring(pointerX, { damping: 28, stiffness: 120, mass: 0.8 });
  const smoothPointerY = useSpring(pointerY, { damping: 28, stiffness: 120, mass: 0.8 });

  const rawVelocityY = useTransform(scrollVelocity, [-2500, 0, 2500], [28, 0, -28]);
  const smoothVelocityY = useSpring(rawVelocityY, {
    damping: 24,
    stiffness: 150,
    mass: 0.5,
  });

  const bgTranslateY1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgTranslateY2 = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const orbDriftX1 = useTransform(smoothPointerX, (value) => value * 0.18);
  const orbDriftX2 = useTransform(smoothPointerX, (value) => value * -0.14);
  const waveDriftX = useTransform(smoothPointerX, (value) => value * 0.08);
  const waveAShift = useTransform(smoothPointerX, [-260, 260], [100, -100]);
  const waveBShift = useTransform(smoothPointerX, [-260, 260], [-90, 90]);
  const waveCShift = useTransform(smoothPointerY, [-220, 220], [70, -70]);
  const waveAPointerY = useTransform(smoothPointerY, (value) => value * 0.3);
  const waveBPointerY = useTransform(smoothPointerY, (value) => value * 0.45);
  const waveCSecondaryShift = useTransform(waveCShift, (value) => value * 0.7);
  const waveSecondaryVelocityY = useTransform(smoothVelocityY, (value) => value * 0.8);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePointer = (event: PointerEvent) => {
      const offsetX = event.clientX - window.innerWidth / 2;
      const offsetY = event.clientY - window.innerHeight / 2;

      pointerX.set(offsetX * 0.22);
      pointerY.set(offsetY * 0.18);
    };

    if (mediaQuery.matches) {
      return;
    }

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
    };
  }, [pointerX, pointerY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />

      <motion.div
        style={{ y: bgTranslateY1, x: orbDriftX1 }}
        className="absolute left-[12%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),rgba(34,211,238,0)_62%)] blur-3xl dark:opacity-100 opacity-80"
      />
      <motion.div
        style={{ y: bgTranslateY2, x: orbDriftX2 }}
        className="absolute right-[8%] bottom-[14%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.14),rgba(99,102,241,0)_60%)] blur-3xl dark:opacity-100 opacity-70"
      />
      <motion.div
        style={{ y: smoothVelocityY, x: waveDriftX }}
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradientA" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="var(--accent-teal)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--accent-indigo)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="waveGradientB" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.08" />
              <stop offset="50%" stopColor="var(--accent-teal)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent-violet)" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <motion.path
            d="M-120 560 C 150 440, 320 470, 500 560 S 900 700, 1100 560 S 1485 430, 1720 560 L1720 960 L-120 960 Z"
            fill="url(#waveGradientA)"
            style={{ x: waveAShift, y: waveAPointerY }}
          />
          <motion.path
            d="M-180 610 C 120 500, 330 610, 520 640 S 910 760, 1120 670 S 1470 510, 1780 640 L1780 960 L-180 960 Z"
            fill="url(#waveGradientB)"
            style={{ x: waveBShift, y: waveBPointerY }}
          />
          <motion.path
            d="M-140 465 C 220 300, 470 330, 720 470 S 1180 640, 1600 480"
            stroke="var(--accent-cyan)"
            strokeOpacity="0.38"
            strokeWidth="2"
            fill="none"
            style={{ x: waveCShift, y: smoothVelocityY }}
          />
          <motion.path
            d="M-180 545 C 200 390, 470 430, 760 520 S 1180 710, 1640 570"
            stroke="var(--accent-teal)"
            strokeOpacity="0.30"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 12"
            style={{ x: waveCSecondaryShift, y: waveSecondaryVelocityY }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
