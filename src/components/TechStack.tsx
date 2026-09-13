"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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

// Magnetic Skill Card component
function MagneticSkillCard({
  tech,
  categoryColor,
}: {
  tech: TechItem;
  categoryColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.12;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = ICON_MAP[tech.iconName] || Code;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      whileHover={{ y: -3 }}
      className="group rounded-2xl bg-[#0c1017]/90 border border-white/10 p-4 sm:p-5 backdrop-blur-md transition-all duration-200 hover:border-teal-500/40 hover:shadow-card-hover flex flex-col justify-between will-change-transform"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-colors">
            <IconComponent className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${categoryColor}`}>
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
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60 group-hover:bg-teal-400 group-hover:scale-125 transition-all duration-200" />
      </div>
    </motion.div>
  );
}

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

      {/* Technology Cards Grid with Magnetic Interaction */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTech.map((tech) => (
          <MagneticSkillCard
            key={tech.name}
            tech={tech}
            categoryColor={getCategoryColor(tech.category)}
          />
        ))}
      </div>
    </section>
  );
}
