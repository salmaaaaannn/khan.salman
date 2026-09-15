"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2, GitBranch, Terminal, Cpu } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function GithubSection() {
  const engineeringFocus = [
    {
      title: "Full-Stack Web Architecture",
      description: "Scalable client-server applications engineered with Next.js, React, Node.js, and TypeScript.",
      icon: Code2,
      tag: "Full-Stack",
    },
    {
      title: "AI & Machine Learning Systems",
      description: "Applied AI models, document OCR extraction pipelines, and automated healthcare screening engines.",
      icon: Cpu,
      tag: "AI / ML",
    },
    {
      title: "Backend & Microservices",
      description: "Asynchronous RESTful APIs with FastAPI, Express.js, MongoDB document stores, and MySQL schemas.",
      icon: Terminal,
      tag: "Backend",
    },
    {
      title: "Version Control & Prototyping",
      description: "Modular Git branch workflows, rapid MVP iteration, and clean architectural separation of concerns.",
      icon: GitBranch,
      tag: "Engineering",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl bg-[#0B1620]/85 border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl hover:border-cyan-500/35 transition-all shadow-xl relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open Source & Engineering Activity</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F8FAFC] tracking-tight">
              Explore Code & Repositories
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 max-w-xl leading-relaxed">
              Explore public implementations, full-stack web applications, and AI pipelines directly on GitHub.
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-95 text-slate-950 text-xs sm:text-sm font-mono font-bold transition-all shadow-cyan-soft self-start md:self-center shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Visit @salmaaaaannn</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Engineering Areas Showcase */}
        <div className="pt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {engineeringFocus.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/25 transition-all flex flex-col justify-between group/card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover/card:bg-cyan-500/10 group-hover/card:border-cyan-500/30 transition-colors">
                        <Icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                        {item.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#F8FAFC] group-hover/card:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Repository Focus</span>
                    <span className="text-cyan-400 font-semibold group-hover/card:underline">GitHub</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Profile Handle Strip */}
          <div className="mt-6 p-4 rounded-2xl bg-[#07101A]/80 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300">
                Official Profile: <strong className="text-white">github.com/salmaaaaannn</strong>
              </span>
            </div>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 underline underline-offset-4"
            >
              <span>View All Repositories</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
