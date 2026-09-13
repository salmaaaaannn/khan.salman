"use client";

import React from "react";
import { FileText, Download, Sparkles, ArrowRight, Eye } from "lucide-react";

interface ResumeCTAProps {
  onOpenResume: () => void;
}

export function ResumeCTA({ onOpenResume }: ResumeCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0c1017] to-indigo-950/40 border border-cyan-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden text-center group hover:border-cyan-500/50 transition-all duration-300">
        {/* Ambient Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Comprehensive Curriculum Vitae</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Want the complete picture?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            View my experience, technical skills, projects and achievements in my resume.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm font-mono transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" />
              <span>View Resume</span>
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-medium text-sm font-mono transition-all hover:border-cyan-500/40 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
