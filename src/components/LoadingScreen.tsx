"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_38%),linear-gradient(135deg,rgba(248,250,252,0.92),rgba(226,232,240,0.92))] dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_38%),linear-gradient(135deg,rgba(7,16,26,0.96),rgba(11,22,32,0.98))] backdrop-blur-md ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-live="polite"
      aria-busy={isVisible}
    >
      <div className="flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative h-52 w-56">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute left-1/2 top-0 h-28 w-28 -translate-x-1/2 rounded-[2rem] border border-slate-300/60 bg-white/80 shadow-[0_20px_80px_rgba(34,211,238,0.18)] dark:border-white/10 dark:bg-[#0b1620]/80"
            >
              <div className="absolute inset-3 rounded-[1.4rem] border border-cyan-400/40 bg-slate-100/80 dark:bg-[#081018]">
                <div className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-500 dark:bg-cyan-300" />
                <div className="absolute left-1/2 top-10 h-3 w-12 -translate-x-1/2 rounded-full bg-slate-300/90 dark:bg-slate-700" />
                <div className="absolute left-1/2 top-16 h-6 w-16 -translate-x-1/2 rounded-xl bg-slate-200/90 dark:bg-slate-700" />
              </div>
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 3, -3, 0], y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
              className="absolute left-1/2 top-24 h-20 w-24 -translate-x-1/2 rounded-[1.5rem] border border-slate-300/60 bg-white/80 dark:border-white/10 dark:bg-[#0b1620]/80"
            >
              <div className="absolute left-1/2 top-3 h-8 w-8 -translate-x-1/2 rounded-full bg-cyan-500/90 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
              <div className="absolute left-[22%] top-12 h-4 w-4 rounded-full bg-slate-400 dark:bg-slate-500" />
              <div className="absolute right-[22%] top-12 h-4 w-4 rounded-full bg-slate-400 dark:bg-slate-500" />
              <div className="absolute left-1/2 top-16 h-2.5 w-10 -translate-x-1/2 rounded-full bg-cyan-500/90" />
            </motion.div>

            <motion.div
              animate={{ x: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
              className="absolute left-6 top-32 h-16 w-7 rounded-full bg-slate-200/90 dark:bg-slate-700"
            />
            <motion.div
              animate={{ x: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
              className="absolute right-6 top-32 h-16 w-7 rounded-full bg-slate-200/90 dark:bg-slate-700"
            />

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute left-1/2 bottom-0 h-16 w-28 -translate-x-1/2 rounded-[1.4rem] border border-slate-300/60 bg-white/80 dark:border-white/10 dark:bg-[#0b1620]/80"
            >
              <div className="absolute inset-x-4 top-3 flex justify-between">
                {[0, 1, 2, 3, 4].map((block) => (
                  <div
                    key={block}
                    className="h-2 w-2 rounded-sm bg-cyan-500/80 dark:bg-cyan-300"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.45rem] text-slate-600 dark:text-slate-300">
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
            className="inline-block h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
          />
          LOADING
        </div>
      </div>
    </motion.div>
  );
}
