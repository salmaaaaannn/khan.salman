"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Activity,
  Layers,
  Github,
  Radio,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { FeaturedProject } from "./FeaturedProject";

// Mini Interactive 2D Metaverse Simulation component
function MetaversePreview() {
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50 });
  const activePlayers = [
    { id: "peer_1", name: "Dev_1", x: 25, y: 35, color: "#0d9488" },
    { id: "peer_2", name: "Dev_2", x: 75, y: 65, color: "#0f766e" },
    { id: "peer_3", name: "Dev_3", x: 70, y: 30, color: "#14b8a6" },
  ];

  const moveAvatar = (dx: number, dy: number) => {
    setAvatarPos((prev) => ({
      x: Math.min(85, Math.max(15, prev.x + dx)),
      y: Math.min(85, Math.max(15, prev.y + dy)),
    }));
  };

  return (
    <div className="relative w-full h-48 sm:h-56 rounded-2xl bg-[#090d13] border border-white/10 overflow-hidden select-none font-mono shadow-inner">
      {/* Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />

      {/* Peer Avatars */}
      {activePlayers.map((player) => (
        <div
          key={player.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 flex flex-col items-center"
          style={{ left: `${player.x}%`, top: `${player.y}%` }}
        >
          <div
            className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-[9px] font-bold text-white shadow-lg"
            style={{ backgroundColor: player.color }}
          >
            {player.name[0]}
          </div>
          <span className="text-[9px] text-slate-400 mt-0.5 bg-black/60 px-1 rounded">
            {player.name}
          </span>
        </div>
      ))}

      {/* Main User Avatar */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex flex-col items-center z-10"
        style={{ left: `${avatarPos.x}%`, top: `${avatarPos.y}%` }}
      >
        <div className="relative w-6 h-6 rounded-full bg-teal-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-950 shadow-lg shadow-teal-500/40">
          SK
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="text-[9px] text-teal-300 font-bold mt-0.5 bg-black/80 px-1 rounded border border-teal-500/30">
          You (salman)
        </span>
      </div>

      {/* Status Overlay */}
      <div className="absolute top-2.5 left-2.5 flex items-center space-x-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] text-slate-300">
        <Radio className="w-3 h-3 text-teal-400 animate-pulse" />
        <span>Colyseus Room: #workspace-alpha</span>
      </div>

      {/* Controls */}
      <div className="absolute bottom-2.5 right-2.5 flex items-center space-x-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10 text-[10px]">
        <button
          onClick={() => moveAvatar(-10, 0)}
          className="px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95 transition-colors"
        >
          ←
        </button>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => moveAvatar(0, -10)}
            className="px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95 transition-colors"
          >
            ↑
          </button>
          <button
            onClick={() => moveAvatar(0, 10)}
            className="px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95 transition-colors"
          >
            ↓
          </button>
        </div>
        <button
          onClick={() => moveAvatar(10, 0)}
          className="px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}

// Visual Preview for AI Event Management
function EventManagementPreview() {
  return (
    <div className="w-full h-48 sm:h-56 rounded-2xl bg-[#090d13] border border-white/10 p-4 font-mono text-xs text-slate-300 flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
        <span className="text-teal-400 font-semibold flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Smart Schedule & Recommendations</span>
        </span>
        <span className="text-[10px] text-slate-500">AI Match: 96%</span>
      </div>

      <div className="space-y-2.5 my-auto">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="truncate">
            <span className="text-white font-medium block truncate">
              Keynote: Scalable Distributed Architectures
            </span>
            <span className="text-[10px] text-slate-400">Track: Cloud Systems • Hall A</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-semibold shrink-0 ml-2">
            Recommended
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="truncate">
            <span className="text-white font-medium block truncate">
              Workshop: Applied Machine Learning Pipelines
            </span>
            <span className="text-[10px] text-slate-400">Track: AI Engineering • Room 3</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-semibold shrink-0 ml-2">
            Matching
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span>Event Discovery Engine</span>
        <span className="text-teal-400">FastAPI & Python backend</span>
      </div>
    </div>
  );
}

// Visual Preview for AI Fitness Tracker
function FitnessTrackerPreview() {
  return (
    <div className="w-full h-48 sm:h-56 rounded-2xl bg-[#090d13] border border-white/10 p-4 font-mono text-xs text-slate-300 flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
        <span className="text-teal-400 font-semibold flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5" />
          <span>Computer Vision Landmark Tracker</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-semibold">Real-Time</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 my-auto text-center">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase block">Reps Count</span>
          <span className="text-xl font-bold text-white">24</span>
          <span className="text-[9px] text-teal-400 block">Form: 98%</span>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase block">Joint Angle</span>
          <span className="text-xl font-bold text-teal-300">92°</span>
          <span className="text-[9px] text-emerald-400 block">Optimal</span>
        </div>
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase block">Cadence</span>
          <span className="text-xl font-bold text-slate-200">1.8s</span>
          <span className="text-[9px] text-slate-400 block">Pace</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span>Pose Landmark Detection</span>
        <span className="text-teal-400">Feedback Active</span>
      </div>
    </div>
  );
}

// Visual Preview for Eathers
function EathersPreview() {
  return (
    <div className="w-full h-48 sm:h-56 rounded-2xl bg-[#090d13] border border-white/10 p-4 font-mono text-xs text-slate-300 flex flex-col justify-between overflow-hidden shadow-inner">
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
        <span className="text-teal-400 font-semibold flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Full-Stack API & Database Controller</span>
        </span>
        <span className="text-[10px] text-slate-500">MongoDB Node API</span>
      </div>

      <div className="space-y-2 my-auto text-[11px]">
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">GET</span>
          <span className="text-slate-200">/api/v1/items?filter=active</span>
          <span className="text-slate-500 text-[10px] ml-auto">200 OK</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400 text-[9px] font-bold">POST</span>
          <span className="text-slate-200">/api/v1/orders/create</span>
          <span className="text-slate-500 text-[10px] ml-auto">201 Created</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 text-[9px] font-bold">AUTH</span>
          <span className="text-slate-200">Bearer Token Verified</span>
          <span className="text-teal-400 text-[10px] ml-auto">Valid</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span>React + Node + Express + MongoDB</span>
        <span className="text-teal-400">RESTful Controller</span>
      </div>
    </div>
  );
}

export function ProjectsGrid() {
  const otherProjects = PORTFOLIO_DATA.projects;

  const renderPreview = (id: string) => {
    switch (id) {
      case "metaverse-2d":
        return <MetaversePreview />;
      case "ai-event-management":
        return <EventManagementPreview />;
      case "ai-fitness-tracker":
        return <FitnessTrackerPreview />;
      case "eathers":
        return <EathersPreview />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center sm:text-left"
      >
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Case Studies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Selected Engineering Works
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Architectural breakdowns of real-world production systems spanning clinical AI screening, real-time multiplayer spaces, and full-stack web products.
        </p>
      </motion.div>

      {/* Featured Flagship Scene: NURA AI */}
      <div className="mb-20 sm:mb-28">
        <FeaturedProject />
      </div>

      {/* Other Projects: Spacious Editorial Case Study Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {otherProjects.map((proj, idx) => {
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-3xl bg-[#0c1017]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-teal-500/40 hover:shadow-card-hover flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview with subtle 2-4px movement on card hover */}
                <div className="mb-6 overflow-hidden rounded-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  {renderPreview(proj.id)}
                </div>

                {/* Header & Subtitle */}
                <div className="mb-3">
                  <span className="text-[11px] font-mono text-teal-400 font-semibold uppercase tracking-wider block mb-1">
                    {proj.subtitle}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors">
                    {proj.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {proj.description}
                </p>

                {/* Problem / Solution Blocks */}
                <div className="space-y-2.5 mb-5 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">
                      Problem:
                    </span>
                    <span className="text-slate-300">{proj.problem}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-emerald-400 font-semibold block text-[11px] mb-0.5">
                      Solution:
                    </span>
                    <span className="text-slate-300">{proj.solution}</span>
                  </div>
                </div>
              </div>

              {/* Technologies & Actions */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:border-teal-500/20 transition-transform group-hover:translate-y-[-1px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-teal-400" />
                    <span>View Repository</span>
                  </a>

                  <a
                    href={proj.liveUrl}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center space-x-1 text-xs font-mono text-teal-400 hover:text-teal-300 transition-colors group/link"
                  >
                    <span>Architecture Overview</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
