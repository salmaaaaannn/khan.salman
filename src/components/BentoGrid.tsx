"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  BrainCircuit,
  Server,
  Database,
  Trophy,
  Sparkles,
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
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "backend",
      title: "Backend Engine",
      value: "Node.js + Express.js + FastAPI",
      tagline: "Asynchronous APIs",
      detail:
        "Designing high-throughput RESTful endpoints, request validation schemas, and real-time socket connections.",
      icon: Server,
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
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "achievement",
      title: "Recognition",
      value: "3× Hackathon Winner",
      tagline: "Rapid Prototyping",
      detail:
        "Proven record of architecting, implementing, and delivering competitive solutions within 24-48 hour hackathons.",
      icon: Trophy,
      colSpan: "col-span-12 md:col-span-12 lg:col-span-4",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-center sm:text-left"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>System Overview</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight">
          Developer Dashboard
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1 max-w-2xl">
          Core architectural pillars, primary technical competencies, and engineering execution.
        </p>
      </motion.div>

      {/* Connected Bento Grid with Subtle Depth */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`${card.colSpan} group relative rounded-2xl bg-[#0B1620]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/35 hover:shadow-card-hover overflow-hidden`}
            >
              {/* Subtle Cyan / Indigo Gradient Wash on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-indigo-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-start justify-between relative z-10 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
                    <Icon className="w-5 h-5 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold block">
                      {card.title}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {card.tagline}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
                  Verified
                </span>
              </div>

              {/* Value / Headline */}
              <div className="relative z-10 my-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] tracking-tight group-hover:text-cyan-200 transition-colors">
                  {card.value}
                </h3>
              </div>

              {/* Description */}
              <p className="relative z-10 text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                {card.detail}
              </p>

              {/* Bottom indicator line */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>active core pillar</span>
                </span>
                <span className="text-cyan-400 font-medium">0{idx + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
