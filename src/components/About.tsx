"use client";

import React from "react";
import {
  User,
  CheckCircle2,
  Cpu,
  Terminal,
  Target,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function About() {
  const { about, personal } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <User className="w-3.5 h-3.5" />
          <span>Developer Profile</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          About Me
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Structured engineering background, technical orientation, and architectural focus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Structured Profile */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: WHO I AM */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1017]/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                WHO I AM
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {about.whoIAm}
            </p>
          </div>

          {/* Card: WHAT I BUILD */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1017]/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center space-x-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                WHAT I BUILD
              </h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.whatIBuild.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-300 p-2 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card: CURRENT FOCUS */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1017]/80 border border-white/10 backdrop-blur-md">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
                CURRENT FOCUS
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
              {about.currentFocus}
            </p>
          </div>
        </div>

        {/* Right Column: Technical Philosophy & Profile Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0e1420] to-[#080b11] border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>salman_profile.json</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-slate-500 block mb-1">// Primary Location</span>
                <span className="text-white text-sm font-semibold">{personal.location}</span>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">// Professional Specialization</span>
                <span className="text-cyan-300 text-sm font-semibold">{personal.role}</span>
              </div>

              <div className="pt-2">
                <span className="text-slate-500 block mb-2">// Engineering Principles</span>
                <div className="space-y-2">
                  {about.corePrinciples.map((principle, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5"
                    >
                      <span className="text-cyan-400 font-bold block text-[11px]">
                        {principle.label}:
                      </span>
                      <span className="text-slate-300 text-xs font-normal">
                        {principle.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Clean Architecture</span>
            <span className="text-cyan-400">Zero Fluff</span>
          </div>
        </div>
      </div>
    </section>
  );
}
