"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ExperienceTimeline() {
  const experiences = PORTFOLIO_DATA.experience;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const markerTop = useTransform(smoothProgress, [0, 1], ["0%", "98%"]);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center sm:text-left"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional History</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#F8FAFC] tracking-tight">
          Work Experience
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-2xl">
          Engineering roles, software responsibilities, and delivered technical outcomes.
        </p>
      </motion.div>

      {/* Timeline Container with Dynamic Scroll-Drawn Line & Marker */}
      <div
        ref={containerRef}
        className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12"
      >
        {/* Animated Line that draws as user scrolls with AI gradient */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute -left-[1px] top-0 w-[2px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-violet-500 will-change-transform"
        />

        {/* Dynamic Marker that rides down the timeline */}
        <motion.div
          style={{ top: markerTop }}
          className="absolute -left-[5px] w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80 z-20 pointer-events-none"
        />

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Base Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-4 h-4 rounded-full bg-[#07101A] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-cyan-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            {/* Experience Card */}
            <div className="rounded-3xl bg-[#0B1620]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/35 hover:shadow-card-hover hover:-translate-y-1">
              {/* Header: Role & Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-400 mt-1">
                    <span className="text-slate-200 font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 self-start sm:self-center">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="mt-5 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold block">
                  Core Responsibilities:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start space-x-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] block mb-2 font-semibold">
                  Technologies Deployed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded text-xs font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-500/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
