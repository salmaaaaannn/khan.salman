"use client";

import React from "react";
import { GraduationCap, Award, CheckCircle, MapPin, Calendar, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function EducationCertifications() {
  const { education, certifications } = PORTFOLIO_DATA;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education Card */}
        <div className="rounded-2xl bg-[#0c1017]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                Academic Foundation
              </span>
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2"
              >
                <h4 className="text-base font-bold text-white">
                  {edu.degree}
                </h4>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">
                  {edu.institution}
                </div>
                <div className="flex items-center text-xs text-slate-400 font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Card */}
        <div className="rounded-2xl bg-[#0c1017]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                Professional Credentials
              </span>
              <h3 className="text-xl font-bold text-white">Certifications</h3>
            </div>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-base font-bold text-white">
                    {cert.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 shrink-0 ml-2">
                    {cert.date}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300">
                  {cert.provider}
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono pt-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Credential verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
