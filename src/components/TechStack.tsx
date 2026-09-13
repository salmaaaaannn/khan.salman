"use client";

import React, { useState } from "react";
import {
  FileCode,
  Binary,
  Atom,
  Globe,
  Layout,
  Palette,
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
  Github,
  Code,
  Send,
  Share2,
  Figma,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA, TechItem } from "@/data/portfolioData";

// Icon mapping helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCode,
  Binary,
  Atom,
  Globe,
  Layout,
  Palette,
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
  Github,
  Code,
  Send,
  Share2,
  Figma,
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "Databases", "AI / ML", "Tools"];

  const filteredTech =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.techStack
      : PORTFOLIO_DATA.techStack.filter((t) => t.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "Backend":
        return "text-indigo-400 bg-indigo-500/10 border-indigo-500/30";
      case "Databases":
        return "text-teal-400 bg-teal-500/10 border-teal-500/30";
      case "AI / ML":
        return "text-violet-400 bg-violet-500/10 border-violet-500/30";
      case "Tools":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default:
        return "text-slate-400 bg-white/5 border-white/10";
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineering Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Verified technologies, frameworks, and methodologies applied across full-stack systems and machine learning pipelines.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0 p-1 rounded-xl bg-white/[0.03] border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-black font-semibold shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Technology Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTech.map((tech) => {
          const IconComponent = ICON_MAP[tech.iconName] || Code;
          return (
            <div
              key={tech.name}
              className="group rounded-xl bg-[#0c1017]/80 border border-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getCategoryColor(
                      tech.category
                    )}`}
                  >
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </h3>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>production ready</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
