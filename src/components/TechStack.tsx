"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCode,
  Binary,
  Atom,
  Globe,
  Sparkles,
  Server,
  Layers,
  Terminal,
  Zap,
  Database,
  HardDrive,
  BrainCircuit,
  TrendingUp,
  Network,
  Cpu,
  Eye,
  GitBranch,
  Code,
  Send,
  Share2,
  Figma,
} from "lucide-react";
import { PORTFOLIO_DATA, TechItem } from "@/data/portfolioData";

// Icon mapping helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCode,
  Binary,
  Atom,
  Globe,
  Sparkles,
  Server,
  Layers,
  Terminal,
  Zap,
  Database,
  HardDrive,
  BrainCircuit,
  TrendingUp,
  Network,
  Cpu,
  Eye,
  GitBranch,
  Code,
  Send,
  Share2,
  Figma,
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "AI / ML",
    "Programming & Problem Solving",
    "Tools & APIs",
  ];

  const filteredTech =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.techStack
      : PORTFOLIO_DATA.techStack.filter((t) => t.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "text-teal-400 bg-teal-500/10 border-teal-500/30";
      case "Backend":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "Database":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "AI / ML":
        return "text-teal-300 bg-teal-600/15 border-teal-500/30";
      case "Programming & Problem Solving":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "Tools & APIs":
        return "text-slate-300 bg-white/5 border-white/10";
      default:
        return "text-slate-400 bg-white/5 border-white/10";
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12"
      >
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineering Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Verified technologies, frameworks, and problem-solving disciplines applied in full-stack architecture and AI systems.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0 p-1 rounded-xl bg-white/[0.03] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-teal-600 text-slate-950 font-bold shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Technology Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {filteredTech.map((tech) => {
          const IconComponent = ICON_MAP[tech.iconName] || Code;
          return (
            <motion.div
              layout
              key={tech.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="group rounded-xl bg-[#0c1017]/90 border border-white/10 p-4 backdrop-blur-md transition-all duration-200 hover:border-teal-500/40 hover:shadow-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-colors">
                    <IconComponent className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getCategoryColor(
                      tech.category
                    )}`}
                  >
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {tech.name}
                </h3>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="group-hover:text-slate-400 transition-colors">production ready</span>
                {/* Subtle animated indicator on hover */}
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60 group-hover:bg-teal-400 group-hover:scale-125 transition-all duration-200" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
