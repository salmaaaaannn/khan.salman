"use client";

import React from "react";
import { Trophy, Award, Sparkles, CheckCircle2, Zap, Flame, ShieldAlert } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Achievements() {
  const achievement = PORTFOLIO_DATA.achievements[0];

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Recognition & Competitive Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Achievements
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Demonstrated engineering capability, high-velocity prototyping, and problem-solving under competitive hackathon pressure.
        </p>
      </div>

      {/* Hero Achievement Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#121008] via-[#0c1017] to-[#07090e] border border-amber-500/30 shadow-2xl p-6 sm:p-10 overflow-hidden group hover:border-amber-500/50 transition-all duration-300">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Trophy Visual */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/[0.02] border border-amber-500/20">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/5 border border-amber-400/40 flex items-center justify-center shadow-xl shadow-amber-500/10 mb-4 group-hover:scale-105 transition-transform">
              <Trophy className="w-12 h-12 text-amber-400 animate-pulse" />
              <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-mono font-black text-[10px] tracking-wider uppercase">
                {achievement.badge}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Hackathon Excellence
            </h3>
            <p className="text-xs font-mono text-amber-300/80 mt-1">
              3 Distinct Winning Solutions
            </p>
          </div>

          {/* Right: Details & Engineering Highlights */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Resume Milestone</span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {achievement.title}
            </h4>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {achievement.description}
            </p>

            {/* Core Hackathon Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <span className="text-amber-400 font-bold block mb-1">
                  ⚡ 24-48h Delivery
                </span>
                <span className="text-slate-400 text-[11px]">
                  Rapid architecture from zero to working deployed MVP
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <span className="text-cyan-400 font-bold block mb-1">
                  🧠 AI Integration
                </span>
                <span className="text-slate-400 text-[11px]">
                  Embedding practical ML models and intelligent workflows
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                <span className="text-emerald-400 font-bold block mb-1">
                  🎯 Pitch & Demo
                </span>
                <span className="text-slate-400 text-[11px]">
                  Clear technical communication and live interactive demos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
