"use client";

import React from "react";
import { TerminalCard } from "./TerminalCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Code2,
} from "lucide-react";

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Information */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status & Location Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full-Stack & AI/ML Developer</span>
              <span className="text-slate-500">•</span>
              <span className="inline-flex items-center text-slate-400">
                <MapPin className="w-3 h-3 mr-1 text-cyan-400" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </div>

            {/* Name & Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <p className="mt-3 text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                {PORTFOLIO_DATA.personal.headline}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {PORTFOLIO_DATA.personal.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-medium text-sm transition-all hover:border-cyan-500/40 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Secondary Social Links & Tech Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs text-slate-400 font-mono">
              <div className="flex items-center space-x-4">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 hover:text-indigo-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                <span>•</span>
                <span className="text-slate-400">Next.js</span>
                <span>•</span>
                <span className="text-slate-400">FastAPI</span>
                <span>•</span>
                <span className="text-slate-400">Python AI/ML</span>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}
