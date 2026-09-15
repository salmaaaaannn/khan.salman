"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Achievements() {
  const achievement = PORTFOLIO_DATA.achievements[0];

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 text-center sm:text-left"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Competitive Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC] tracking-tight">
          Achievements
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-2xl">
          Demonstrated engineering capability, high-velocity prototyping, and problem-solving under competitive hackathon pressure.
        </p>
      </motion.div>

      {/* Hero Achievement Card with Scroll Entrance & Hover Lift */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className="relative rounded-3xl bg-[#0B1620]/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-cyan-500/35 hover:shadow-card-hover transition-all duration-300"
      >
        {/* Subtle Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Trophy Visual with Restrained Award Interaction */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-cyan-500/25 transition-colors">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-amber-500/10 border border-cyan-500/30 flex items-center justify-center shadow-lg mb-4 cursor-default group/trophy"
            >
              <Trophy className="w-12 h-12 text-cyan-400 group-hover/trophy:text-cyan-300 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]" />
              <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-mono font-black text-[10px] tracking-wider uppercase shadow-md shadow-cyan-500/30">
                3× Champion
              </div>
            </motion.div>

            <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
              3× Hackathon Winner
            </h3>
            <p className="text-xs font-mono text-cyan-300/90 mt-1">
              Competitive Hackathon Prototyping
            </p>
          </div>

          {/* Right: Details & Engineering Highlights */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified Resume Milestone</span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              {achievement.title}
            </h4>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {achievement.description}
            </p>

            {/* Core Hackathon Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <span className="text-cyan-400 font-bold block mb-1">
                  ⚡ 24-48h Delivery
                </span>
                <span className="text-[#94A3B8] text-[11px]">
                  Rapid architecture from zero to working deployed MVP
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <span className="text-indigo-400 font-bold block mb-1">
                  🧠 AI Integration
                </span>
                <span className="text-[#94A3B8] text-[11px]">
                  Embedding practical ML models and intelligent workflows
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <span className="text-teal-400 font-bold block mb-1">
                  🎯 Pitch & Demo
                </span>
                <span className="text-[#94A3B8] text-[11px]">
                  Clear technical communication and live interactive demos
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
