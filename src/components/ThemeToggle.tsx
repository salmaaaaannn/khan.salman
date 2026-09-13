"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/[0.08] animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform hover:scale-110 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:scale-110 text-slate-700" />
      )}
    </button>
  );
}
