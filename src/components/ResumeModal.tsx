"use client";

import React, { useRef } from "react";
import { X, Download, Printer, ExternalLink, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#0b0e14] border border-white/10 shadow-2xl z-10 overflow-hidden">
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-sm text-slate-200 font-semibold">
              Salman_Khan_Resume.pdf
            </span>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              Verified Source of Truth
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Body */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-[#07090e] print:bg-white print:text-black">
          <div
            ref={resumeRef}
            className="max-w-3xl mx-auto bg-[#0d1117] border border-white/10 rounded-xl p-8 sm:p-12 shadow-inner print:shadow-none print:border-none print:bg-white print:p-0"
          >
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-6 print:border-slate-300">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white print:text-black">
                {PORTFOLIO_DATA.personal.name}
              </h1>
              <p className="text-cyan-400 font-mono text-sm sm:text-base mt-1.5 font-medium print:text-cyan-700">
                {PORTFOLIO_DATA.personal.role}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono mt-3 print:text-slate-600">
                <span>📍 {PORTFOLIO_DATA.personal.location}</span>
                <span>•</span>
                <span>✉️ {PORTFOLIO_DATA.personal.email}</span>
                <span>•</span>
                <span>🔗 github.com/salmankhan</span>
                <span>•</span>
                <span>💼 linkedin.com/in/salmankhan</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-2 print:text-slate-800">
                Executive Profile
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed print:text-slate-800">
                {PORTFOLIO_DATA.about.whoIAm} {PORTFOLIO_DATA.personal.subheadline}
              </p>
            </div>

            {/* Core Competencies / Technical Stack */}
            <div className="mb-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 print:text-slate-800">
                Technical Stack & Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 print:border-slate-200">
                  <span className="font-mono font-semibold text-cyan-300 print:text-cyan-800">Frontend: </span>
                  <span className="text-slate-300 print:text-slate-700">
                    React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 print:border-slate-200">
                  <span className="font-mono font-semibold text-indigo-300 print:text-indigo-800">Backend: </span>
                  <span className="text-slate-300 print:text-slate-700">
                    Node.js, Express.js, Python, FastAPI, REST APIs
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 print:border-slate-200">
                  <span className="font-mono font-semibold text-teal-300 print:text-teal-800">Databases: </span>
                  <span className="text-slate-300 print:text-slate-700">
                    MongoDB, MySQL
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 print:border-slate-200">
                  <span className="font-mono font-semibold text-violet-300 print:text-violet-800">AI / Machine Learning: </span>
                  <span className="text-slate-300 print:text-slate-700">
                    Machine Learning, Supervised Learning, Unsupervised Learning, Computer Vision, Python AI/ML Ecosystem
                  </span>
                </div>
                <div className="sm:col-span-2 p-3 rounded-lg bg-white/[0.02] border border-white/5 print:border-slate-200">
                  <span className="font-mono font-semibold text-amber-300 print:text-amber-800">Developer Tools: </span>
                  <span className="text-slate-300 print:text-slate-700">
                    Git, GitHub, VS Code, Postman, Figma, Linux
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="mb-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 print:text-slate-800">
                Key Technical Projects
              </h2>

              {/* VITALS */}
              <div className="mb-4 pb-4 border-b border-white/5 print:border-slate-200">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    VITALS — AI-Assisted Healthcare Screening Platform
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold print:text-cyan-800">
                    Featured AI Platform
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed print:text-slate-700">
                  {PORTFOLIO_DATA.featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PORTFOLIO_DATA.featuredProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 print:bg-slate-100 print:text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* METAVERSE 2D */}
              <div className="mb-4 pb-4 border-b border-white/5 print:border-slate-200">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    METAVERSE 2D — Real-Time Virtual Workspace
                  </h3>
                  <span className="text-[11px] font-mono text-indigo-400 print:text-indigo-800">
                    Real-Time Multiplayer
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed print:text-slate-700">
                  {PORTFOLIO_DATA.projects[0].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PORTFOLIO_DATA.projects[0].technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 print:bg-slate-100 print:text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI EVENT MANAGEMENT SYSTEM */}
              <div className="mb-4 pb-4 border-b border-white/5 print:border-slate-200">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    AI EVENT MANAGEMENT SYSTEM
                  </h3>
                  <span className="text-[11px] font-mono text-violet-400 print:text-violet-800">
                    AI & Dashboard
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed print:text-slate-700">
                  {PORTFOLIO_DATA.projects[1].description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PORTFOLIO_DATA.projects[1].technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 print:bg-slate-100 print:text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI FITNESS TRACKER & EATHERS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white print:text-black">
                    AI FITNESS TRACKER
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 print:text-slate-700">
                    {PORTFOLIO_DATA.projects[2].description}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white print:text-black">
                    EATHERS
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 print:text-slate-700">
                    {PORTFOLIO_DATA.projects[3].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 print:text-slate-800">
                Work Experience
              </h2>
              {PORTFOLIO_DATA.experience.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-white print:text-black">
                      {exp.role} — {exp.company}
                    </span>
                    <span className="text-xs font-mono text-slate-400 print:text-slate-600">
                      {exp.location} | {exp.period}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300 list-disc list-inside print:text-slate-700">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education & Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-white/10 print:border-slate-200">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-2 print:text-slate-800">
                  Education & Credentials
                </h2>
                <div className="text-xs text-slate-300 print:text-slate-700">
                  <p className="font-semibold text-white print:text-black">
                    {PORTFOLIO_DATA.education[0].degree}
                  </p>
                  <p className="text-slate-400 print:text-slate-600">
                    {PORTFOLIO_DATA.education[0].institution}, {PORTFOLIO_DATA.education[0].location}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-2 print:text-slate-800">
                  Honors & Achievements
                </h2>
                <div className="flex items-center space-x-2 text-xs">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-amber-300 print:text-amber-800">
                    {PORTFOLIO_DATA.achievements[0].title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
                  {PORTFOLIO_DATA.achievements[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
