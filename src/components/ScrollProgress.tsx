"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-teal-600 via-teal-400 to-emerald-400 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
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
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-xl bg-[#0c1017]/90 hover:bg-[#131924] border border-white/10 text-slate-400 hover:text-teal-400 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
