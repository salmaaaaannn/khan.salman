"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-transparent z-50 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-teal-400 shadow-sm shadow-cyan-400/50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 450;
          setVisible((prev) => (prev !== isOver ? isOver : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-white/90 dark:bg-[#0B1620]/90 hover:bg-slate-100 dark:hover:bg-[#101F2E] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-xl backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
