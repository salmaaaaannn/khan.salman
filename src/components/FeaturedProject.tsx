"use client";

import React, { useState } from "react";
import {
  FileText,
  Scan,
  ShieldCheck,
  BrainCircuit,
  Activity,
  ArrowRight,
  Github,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function FeaturedProject() {
  const project = PORTFOLIO_DATA.featuredProject;
  const [activeStep, setActiveStep] = useState(0);

  const pipelineStages = [
    {
      id: 0,
      title: "Patient / Document",
      sub: "Clinical Intake & Upload",
      icon: FileText,
      tech: "Next.js UI & File Upload",
      previewData: {
        documentName: "clinical_lab_report_panel.pdf",
        patientId: "PT-9482-B",
        sampleType: "Fasting Metabolic & Lipid Panel",
        status: "Ingested via Web Interface",
      },
    },
    {
      id: 1,
      title: "OCR Extraction",
      sub: "Text & Tabular Digitization",
      icon: Scan,
      tech: "Tesseract OCR Engine",
      previewData: {
        rawExtractedText: "Glucose: 126 mg/dL | HbA1c: 6.8% | Total Chol: 215 mg/dL",
        confidence: "98.4% OCR Confidence",
        bboxes: "18 bounding boxes parsed",
        status: "Text Normalized",
      },
    },
    {
      id: 2,
      title: "Backend Validation",
      sub: "Sanity & Pydantic Checks",
      icon: ShieldCheck,
      tech: "FastAPI & Python Schemas",
      previewData: {
        endpoint: "POST /api/v1/screening/validate",
        schema: "LabReportSchema validated",
        latency: "14ms async execution",
        status: "Input Sanitized & Verified",
      },
    },
    {
      id: 3,
      title: "AI Screening",
      sub: "Machine Learning Evaluation",
      icon: BrainCircuit,
      tech: "Scikit-Learn / ML Models",
      previewData: {
        biomarkerEvaluation: "Type-2 Glycemic Risk Model",
        riskProbability: "High Probability (0.84)",
        classification: "Elevated Risk / Screening Alert",
        status: "Inference Complete",
      },
    },
    {
      id: 4,
      title: "Healthcare Insights",
      sub: "Clinical Action & Triage",
      icon: Activity,
      tech: "Automated Report Generator",
      previewData: {
        clinicalSummary: "Impaired fasting glycaemia detected. Recommend formal oral GTT.",
        priority: "Tier-2 Priority Follow-up",
        exportReady: "Summary PDF generated for clinician review",
        status: "Delivered to Doctor Portal",
      },
    },
  ];

  const currentStage = pipelineStages[activeStep];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="w-full">
      {/* Featured Project Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0e1420] to-[#080b11] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 lg:p-10 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold tracking-wide shadow-sm shadow-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Featured Project</span>
            </span>

            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              // FLAGSHIP HEALTHCARE & AI PLATFORM
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" />
              <span>GitHub</span>
            </a>

            <a
              href={project.liveUrl}
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold font-mono transition-colors shadow-lg shadow-cyan-500/20"
              title="Interactive pipeline demo running below"
            >
              <span>Interactive Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="relative z-10 mb-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-center gap-3">
            {project.title}
            <span className="text-xs sm:text-sm font-mono font-normal text-cyan-400 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
              Next.js + FastAPI
            </span>
          </h3>
          <p className="text-lg sm:text-xl font-medium text-cyan-300 mt-2 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Description & Technical Context */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">
                  Problem Addressed:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-xs font-mono text-emerald-400 font-semibold block mb-1">
                  Engineered Solution:
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Technology Badges */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                Technology Badges:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right side metric/clinical summary card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#090d15] border border-white/10 p-5 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-slate-400 uppercase text-[11px] font-semibold">
                Clinical Workflow Specs
              </span>
              <span className="text-emerald-400 text-[11px] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 inline-block" />
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
                <span className="text-indigo-300 font-medium">AI/ML Biomarker Screening</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
              💡 <span className="text-slate-300">Interactive Pipeline:</span> Click the pipeline steps below to inspect how patient records progress from raw upload to clinical insight.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE HEALTHCARE SCREENING PIPELINE VISUALIZATION */}
        {/* ========================================================================= */}
        <div className="relative z-10 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-2">
              <BrainCircuit className="w-4 h-4" />
              <span>AI Healthcare Screening Pipeline</span>
            </h4>
            <span className="text-xs font-mono text-slate-500">
              Step {activeStep + 1} of {pipelineStages.length}
            </span>
          </div>

          {/* Pipeline Steps Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
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
                      ? "bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/20 text-white"
                      : isPassed
                      ? "bg-white/5 border-cyan-500/30 text-slate-300 hover:bg-white/10"
                      : "bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <StepIcon
                      className={`w-4 h-4 ${
                        isSelected ? "text-cyan-400" : isPassed ? "text-emerald-400" : "text-slate-500"
                      }`}
                    />
                    <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
                  </div>
                  <div className="text-xs font-bold truncate">{stage.title}</div>
                  <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                    {stage.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Real-Time Inspection Console */}
          <div className="rounded-2xl bg-[#080b10] border border-cyan-500/20 p-5 font-mono text-xs text-slate-300">
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
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 text-[11px]"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setActiveStep((prev) => (prev < pipelineStages.length - 1 ? prev + 1 : 0))
                  }
                  className="px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold"
                >
                  Next Step →
                </button>
              </div>
            </div>

            {/* Stage Output Simulator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(currentStage.previewData).map(([key, val]) => (
                <div key={key} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-cyan-400/80 block mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-slate-200 font-mono text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
