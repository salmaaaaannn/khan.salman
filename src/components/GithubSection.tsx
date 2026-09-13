"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function GithubSection() {
  const weeks = 28;

  const matrixLevels = [
    [0, 1, 2, 0, 3, 2, 1],
    [1, 2, 3, 1, 0, 2, 3],
    [2, 3, 4, 2, 1, 3, 2],
    [1, 0, 2, 3, 2, 1, 0],
    [0, 2, 1, 2, 3, 4, 1],
    [2, 1, 3, 4, 2, 0, 2],
    [1, 3, 2, 1, 0, 2, 3],
    [3, 2, 4, 3, 2, 1, 2],
    [0, 1, 2, 0, 1, 2, 3],
    [2, 3, 1, 2, 4, 3, 2],
    [1, 2, 3, 1, 2, 0, 1],
    [3, 4, 2, 3, 1, 2, 0],
    [2, 1, 0, 2, 3, 2, 1],
    [1, 2, 3, 4, 2, 1, 2],
    [0, 3, 2, 1, 0, 2, 3],
    [2, 1, 4, 3, 2, 1, 0],
    [3, 2, 1, 2, 3, 4, 2],
    [1, 0, 2, 3, 1, 2, 1],
    [2, 3, 4, 2, 1, 0, 2],
    [1, 2, 1, 3, 4, 2, 1],
    [0, 1, 2, 1, 2, 3, 2],
    [2, 3, 0, 2, 1, 2, 3],
    [3, 4, 2, 1, 3, 2, 1],
    [1, 2, 3, 2, 0, 1, 2],
    [2, 1, 4, 3, 2, 1, 0],
    [0, 2, 1, 2, 3, 4, 2],
    [1, 3, 2, 1, 2, 3, 1],
    [2, 4, 3, 2, 1, 2, 0],
  ];

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-teal-950 border-teal-900";
      case 2:
        return "bg-teal-800 border-teal-700";
      case 3:
        return "bg-teal-600 border-teal-500";
      case 4:
        return "bg-teal-400 border-teal-300 shadow-sm shadow-teal-400/40";
      default:
        return "bg-white/[0.03] border-white/5";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl bg-[#0c1017]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-md"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-400 mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>Open Source & Engineering Activity</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore My Code and Projects
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Inspect repositories, full-stack implementations, and AI experiments on GitHub.
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/15 text-slate-200 hover:text-white text-xs font-mono font-semibold transition-all hover:border-teal-500/40 self-start md:self-center"
          >
            <Github className="w-4 h-4 text-teal-400" />
            <span>Visit GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Contribution Activity Grid Visual */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <span>Commit & Build Cadence</span>
            <div className="flex items-center space-x-1.5 text-[11px]">
              <span className="text-slate-500">Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.03] border border-white/5" />
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-950 border border-teal-900" />
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-800 border border-teal-700" />
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-600 border border-teal-500" />
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-400 border border-teal-300" />
              <span className="text-slate-500">More</span>
            </div>
          </div>

          {/* Matrix Container */}
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1 p-3 rounded-xl bg-[#090d13] border border-white/5">
              {matrixLevels.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((lvl, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-[2.5px] border ${getColorClass(
                        lvl
                      )} transition-transform hover:scale-125 cursor-pointer`}
                      title={`Cadence block ${wIdx + 1}.${dIdx + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-2 text-right">
            Continuous deployment & test automation cycles
          </div>
        </div>
      </motion.div>
    </section>
  );
}
