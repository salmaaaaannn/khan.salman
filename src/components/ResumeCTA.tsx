"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Sparkles, Eye } from "lucide-react";

interface ResumeCTAProps {
  onOpenResume: () => void;
}

export function ResumeCTA({ onOpenResume }: ResumeCTAProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl bg-gradient-to-b from-[#0B1620] to-[#07101A] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl overflow-hidden text-center group hover:border-cyan-500/35 hover:shadow-card-hover transition-all duration-300"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/[0.08] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Comprehensive Curriculum Vitae</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC] tracking-tight">
            Want the complete picture?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            View my experience, technical skills, projects and achievements in my resume.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenResume}
              className="btn-shimmer inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-95 text-slate-950 font-semibold text-sm font-mono transition-all duration-200 shadow-cyan-soft hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" />
              <span>View Resume</span>
            </button>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/15 text-slate-200 hover:text-white font-medium text-sm font-mono transition-all duration-200 hover:border-cyan-500/40 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
