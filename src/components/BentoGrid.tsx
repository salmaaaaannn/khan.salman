"use client";

import React from "react";
import {
  Code2,
  Layers,
  BrainCircuit,
  Server,
  Database,
  Trophy,
  ArrowUpRight,
  Sparkles,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function BentoGrid() {
  const cards = [
    {
      id: "role",
      title: "Current Role",
      value: "Full-Stack Developer / AI-ML Developer",
      tagline: "Architecture & Integration",
      detail:
        "Building end-to-end web applications paired with high-performance APIs and practical machine learning capabilities.",
      icon: Code2,
      accent: "from-cyan-500/20 to-cyan-500/5",
      borderAccent: "group-hover:border-cyan-500/50",
      textColor: "text-cyan-400",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "stack",
      title: "Primary Stack",
      value: "React + Next.js + Node.js + Python",
      tagline: "Full-Stack Ecosystem",
      detail:
        "Component-driven React/Next.js frontends connected to resilient Node.js and Python microservices.",
      icon: Layers,
      accent: "from-indigo-500/20 to-indigo-500/5",
      borderAccent: "group-hover:border-indigo-500/50",
      textColor: "text-indigo-400",
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "ai",
      title: "AI Focus",
      value: "Machine Learning + AI-Powered Apps",
      tagline: "Applied Intelligence",
      detail:
        "Document OCR extraction, predictive health screening, and computer vision classification pipelines.",
      icon: BrainCircuit,
      accent: "from-violet-500/20 to-violet-500/5",
      borderAccent: "group-hover:border-violet-500/50",
      textColor: "text-violet-400",
      badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "backend",
      title: "Backend Engine",
      value: "Node.js + Express + FastAPI",
      tagline: "Asynchronous APIs",
      detail:
        "Designing high-throughput RESTful endpoints, request validation schemas, and real-time socket connections.",
      icon: Server,
      accent: "from-teal-500/20 to-teal-500/5",
      borderAccent: "group-hover:border-teal-500/50",
      textColor: "text-teal-400",
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/30",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "database",
      title: "Data Persistence",
      value: "MongoDB + MySQL",
      tagline: "Polyglot Storage",
      detail:
        "Flexible document schemas in MongoDB coupled with relational integrity and transactional consistency in MySQL.",
      icon: Database,
      accent: "from-cyan-500/20 to-cyan-500/5",
      borderAccent: "group-hover:border-cyan-500/50",
      textColor: "text-cyan-400",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "achievement",
      title: "Recognition",
      value: "3× Hackathon Winner",
      tagline: "Rapid Prototyping",
      detail:
        "Proven record of architecting, implementing, and delivering competitive, production-ready solutions within 24-48 hour hackathons.",
      icon: Trophy,
      accent: "from-amber-500/20 to-amber-500/5",
      borderAccent: "group-hover:border-amber-500/50",
      textColor: "text-amber-400",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      colSpan: "col-span-12 md:col-span-12 lg:col-span-4",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>System Overview</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Developer Dashboard
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
          Core architectural pillars, primary technical competencies, and engineering execution.
        </p>
      </div>

      {/* Connected Bento Grid */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`${card.colSpan} group relative rounded-2xl bg-[#0c1017]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${card.borderAccent} overflow-hidden`}
            >
              {/* Subtle gradient background wash */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              {/* Card Header */}
              <div className="flex items-start justify-between relative z-10 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${card.textColor}`} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      {card.title}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {card.tagline}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}
                >
                  Verified
                </span>
              </div>

              {/* Value / Headline */}
              <div className="relative z-10 my-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-slate-100 transition-colors">
                  {card.value}
                </h3>
              </div>

              {/* Description */}
              <p className="relative z-10 text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {card.detail}
              </p>

              {/* Bottom indicator line */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>active production skill</span>
                </span>
                <span className={card.textColor}>0{cards.indexOf(card) + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
