"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scan,
  ShieldCheck,
  BrainCircuit,
  Activity,
  Github,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function FeaturedProject() {
  const project = PORTFOLIO_DATA.featuredProject;
  const [activeStep, setActiveStep] = useState(0);

  const pipelineStages = [
    {
      id: 0,
      title: "Healthcare Input",
      sub: "Patient Intake & Document Ingest",
      icon: FileText,
      tech: "Next.js UI & Web Portal",
      previewData: {
        documentName: "clinical_patient_report.pdf",
        patientId: "PT-9824-A",
        intakeType: "Fasting Glucose & Metabolic Panel",
        status: "Ingested via Web Portal",
      },
    },
    {
      id: 1,
      title: "OCR",
      sub: "Document & Lab Digitization",
      icon: Scan,
      tech: "Tesseract OCR Engine",
      previewData: {
        rawExtractedText: "Fasting Glucose: 128 mg/dL | HbA1c: 6.9% | Total Cholesterol: 218 mg/dL",
        confidence: "Character & tabular layout parsed",
        status: "Digitized into Structured Format",
      },
    },
    {
      id: 2,
      title: "AI Processing",
      sub: "Validation & Normalization",
      icon: ShieldCheck,
      tech: "FastAPI & Python Schemas",
      previewData: {
        endpoint: "POST /api/v1/screening/process",
        schema: "Pydantic Clinical Report Schema Validated",
        status: "Feature Normalization Complete",
      },
    },
    {
      id: 3,
      title: "Screening",
      sub: "Biomarker Risk Evaluation",
      icon: BrainCircuit,
      tech: "AI/ML Screening Models",
      previewData: {
        screeningModel: "Metabolic Risk Classification Engine",
        biomarkerEvaluation: "Elevated Fasting Plasma Biomarkers Flagged",
        status: "Screening Inference Complete",
      },
    },
    {
      id: 4,
      title: "Insights",
      sub: "Clinical Guidance & Referral",
      icon: Activity,
      tech: "Automated Clinical Reports",
      previewData: {
        clinicalSummary: "Impaired fasting glycaemia flagged for physician review.",
        triagePriority: "Secondary Clinical Assessment Recommended",
        status: "Delivered to Clinician Portal",
      },
    },
  ];

  const currentStage = pipelineStages[activeStep];
  const CurrentIcon = currentStage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Featured Project Case Study Container */}
      <div className="group relative rounded-3xl bg-[#0B1620]/85 border border-white/10 p-6 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/35 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden">
        {/* Subtle Ambient Radial Glow with AI cyan/indigo gradients */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/[0.08] rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Flagship Case Study</span>
            </span>

            <span className="text-xs font-mono text-[#94A3B8] hidden sm:inline-block">
              // HEALTHCARE & AI INTELLIGENCE PLATFORM
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </a>
            )}

            {project.liveUrl && project.liveUrl !== "#" ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-semibold font-mono transition-colors shadow-cyan-soft"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Interactive Pipeline Below</span>
              </span>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="relative z-10 mb-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8FAFC] flex items-center gap-3">
            {project.title}
            <span className="text-xs sm:text-sm font-mono font-normal text-cyan-300 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
              Next.js + FastAPI
            </span>
          </h3>
          <p className="text-lg sm:text-xl font-medium text-cyan-400 mt-2 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Description & Straight Architectural Preview */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">
                  Problem Addressed:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Engineered Solution:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Technology Badges with micro hover */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold block mb-2">
                Technology Badges:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ y: -2, scale: 1.03 }}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-cyan-300 shadow-sm cursor-default hover:border-cyan-500/30"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Perfectly straight preview card with clean subtle hover lift */}
          <div className="lg:col-span-5 rounded-2xl bg-[#07101A]/90 border border-white/10 p-5 font-mono text-xs space-y-3 transition-all duration-200 hover:border-cyan-500/30 hover:-translate-y-1">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[#94A3B8] uppercase text-[11px] font-semibold">
                Clinical Workflow Specs
              </span>
              <span className="text-cyan-400 text-[11px] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 inline-block animate-pulse" />
                Live Architecture
              </span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Frontend Portal:</span>
                <span className="text-white font-medium">Next.js (App Router)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">API Gateway:</span>
                <span className="text-white font-medium">FastAPI Asynchronous</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">OCR Engine:</span>
                <span className="text-cyan-300 font-medium">Tesseract OCR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inference Mode:</span>
                <span className="text-cyan-300 font-medium">AI/ML Biomarker Screening</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-[#94A3B8]">
              💡 <span className="text-slate-200">Interactive Pipeline:</span> Click the stages below to step through clinical intake, OCR extraction, schema validation, screening inference, and physician reporting.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ANIMATED HEALTHCARE SCREENING PIPELINE WITH MOVING DATA DOTS */}
        {/* ========================================================================= */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4" />
              <span>NURA AI Pipeline</span>
            </h4>
            <span className="text-xs font-mono text-slate-500">
              Stage {activeStep + 1} of {pipelineStages.length}
            </span>
          </div>

          {/* Progressive Connecting Line with Moving Data Dots */}
          <div className="relative mb-6">
            {/* Background track line */}
            <div className="hidden sm:block absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            
            {/* Progress filled line with subtle AI gradient */}
            <motion.div
              className="hidden sm:block absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 -translate-y-1/2 z-0"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStep / (pipelineStages.length - 1)) * 92}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Traveling Data Pulse Dot */}
            <motion.div
              className="hidden sm:block absolute top-1/2 w-2 h-2 rounded-full bg-cyan-300 -translate-y-1/2 shadow-lg shadow-cyan-400/80 z-5"
              animate={{
                left: ["2%", "94%"],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative z-10">
              {pipelineStages.map((stage, idx) => {
                const StepIcon = stage.icon;
                const isSelected = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStep(idx)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400 shadow-cyan-subtle text-white scale-[1.02]"
                        : isPassed
                        ? "bg-white/5 border-cyan-500/30 text-slate-300 hover:bg-white/10"
                        : "bg-[#07101A] border-white/10 text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <StepIcon
                        className={`w-4 h-4 ${
                          isSelected ? "text-cyan-400" : isPassed ? "text-cyan-300" : "text-slate-500"
                        }`}
                      />
                      <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                    </div>
                    <div className="text-xs font-bold truncate">{stage.title}</div>
                    <div className="text-[10px] font-mono text-[#94A3B8] truncate mt-0.5">
                      {stage.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Real-Time Inspection Console */}
          <div className="rounded-2xl bg-[#07101A]/90 border border-cyan-500/30 p-5 font-mono text-xs text-slate-300">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <CurrentIcon className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-sm">
                  Stage 0{activeStep + 1}: {currentStage.title}
                </span>
                <span className="text-slate-500">({currentStage.tech})</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setActiveStep((prev) => (prev > 0 ? prev - 1 : pipelineStages.length - 1))
                  }
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] transition-colors"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setActiveStep((prev) => (prev < pipelineStages.length - 1 ? prev + 1 : 0))
                  }
                  className="px-2.5 py-1 rounded bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>

            {/* Stage Output Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(currentStage.previewData).map(([key, val]) => (
                <div key={key} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-cyan-400 block mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-slate-200 font-mono text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
