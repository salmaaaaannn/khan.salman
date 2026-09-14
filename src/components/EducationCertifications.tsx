"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function EducationCertifications() {
  const { education, certifications } = PORTFOLIO_DATA;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Education Card */}
        <div className="rounded-3xl bg-[#0B1620]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/35 hover:shadow-card-hover">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                Academic Foundation
              </span>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Education</h3>
            </div>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-500/20 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <h4 className="text-base font-bold text-[#F8FAFC]">
                    {edu.degree}
                  </h4>
                  {edu.current ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0 self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Currently Pursuing • {edu.expectedCompletion}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400 border border-white/10 shrink-0 self-start sm:self-auto">
                      {edu.status}
                    </span>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {edu.institution}
                </div>
                <div className="flex items-center text-xs text-[#94A3B8] font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Card */}
        <div className="rounded-3xl bg-[#0B1620]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/35 hover:shadow-card-hover">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                Professional Credentials
              </span>
              <h3 className="text-xl font-bold text-[#F8FAFC]">Certifications</h3>
            </div>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-cyan-500/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-[#F8FAFC]">
                    {cert.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shrink-0 ml-2">
                    {cert.date}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300">
                  {cert.provider}
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-cyan-300 font-mono pt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Credential verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
