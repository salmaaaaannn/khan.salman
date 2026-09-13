"use client";

import React, { useState } from "react";
import {
  Gamepad2,
  Calendar,
  Activity,
  Layers,
  Github,
  ExternalLink,
  Users,
  Radio,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { FeaturedProject } from "./FeaturedProject";

// Mini Interactive 2D Metaverse Simulation component
function MetaversePreview() {
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50 });
  const [activePlayers, setActivePlayers] = useState([
    { id: "peer_1", name: "Alex", x: 25, y: 35, color: "#6366f1" },
    { id: "peer_2", name: "Priya", x: 75, y: 65, color: "#06b6d4" },
    { id: "peer_3", name: "David", x: 70, y: 30, color: "#a855f7" },
  ]);

  const moveAvatar = (dx: number, dy: number) => {
    setAvatarPos((prev) => ({
      x: Math.min(85, Math.max(15, prev.x + dx)),
      y: Math.min(85, Math.max(15, prev.y + dy)),
    }));
  };

  return (
    <div className="relative w-full h-44 rounded-xl bg-[#090d15] border border-white/10 overflow-hidden select-none font-mono">
      {/* Grid Floor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />

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
        <div className="relative w-6 h-6 rounded-full bg-cyan-400 border-2 border-white flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-cyan-500/50">
          SK
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <span className="text-[9px] text-cyan-300 font-bold mt-0.5 bg-black/80 px-1 rounded border border-cyan-500/30">
          You (salman)
        </span>
      </div>

      {/* Status Overlay */}
      <div className="absolute top-2 left-2 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-[10px] text-slate-300">
        <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span>Colyseus Room: #workspace-main (4 online)</span>
      </div>

      {/* Controls */}
      <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10 text-[10px]">
        <button
          onClick={() => moveAvatar(-10, 0)}
          className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95"
        >
          ←
        </button>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => moveAvatar(0, -10)}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95"
          >
            ↑
          </button>
          <button
            onClick={() => moveAvatar(0, 10)}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95"
          >
            ↓
          </button>
        </div>
        <button
          onClick={() => moveAvatar(10, 0)}
          className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-200 active:scale-95"
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
    <div className="w-full h-44 rounded-xl bg-[#090d15] border border-white/10 p-3.5 font-mono text-xs text-slate-300 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
        <span className="text-violet-400 font-semibold flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>Smart Schedule & Recommendations</span>
        </span>
        <span className="text-[10px] text-slate-500">AI Match: 96%</span>
      </div>

      <div className="space-y-2 my-auto">
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="truncate">
            <span className="text-white font-medium block truncate">
              Keynote: Scalable Distributed Systems
            </span>
            <span className="text-[10px] text-slate-400">Track: Cloud Architecture • Hall A</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-semibold shrink-0 ml-2">
            Recommended
          </span>
        </div>

        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
          <div className="truncate">
            <span className="text-white font-medium block truncate">
              Workshop: Applied Machine Learning in Prod
            </span>
            <span className="text-[10px] text-slate-400">Track: AI Engineering • Lab 2</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold shrink-0 ml-2">
            Matching
          </span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span>Discovery Engine: Active</span>
        <span className="text-emerald-400">FastAPI & Python backend</span>
      </div>
    </div>
  );
}

// Visual Preview for AI Fitness Tracker
function FitnessTrackerPreview() {
  return (
    <div className="w-full h-44 rounded-xl bg-[#090d15] border border-white/10 p-3.5 font-mono text-xs text-slate-300 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
        <span className="text-teal-400 font-semibold flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5" />
          <span>Computer Vision Landmark Tracker</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-semibold">60 FPS Inference</span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-auto text-center">
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase block">Reps Count</span>
          <span className="text-lg font-bold text-white">24</span>
          <span className="text-[9px] text-teal-400 block">Form: 98%</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase block">Joint Angle</span>
          <span className="text-lg font-bold text-cyan-300">92°</span>
          <span className="text-[9px] text-emerald-400 block">Optimal</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] text-slate-400 uppercase block">Cadence</span>
          <span className="text-lg font-bold text-violet-300">1.8s</span>
          <span className="text-[9px] text-slate-400 block">Pace</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span>Pose Landmark Detection</span>
        <span className="text-teal-400">Real-Time Feedback</span>
      </div>
    </div>
  );
}

// Visual Preview for Eathers
function EathersPreview() {
  return (
    <div className="w-full h-44 rounded-xl bg-[#090d15] border border-white/10 p-3.5 font-mono text-xs text-slate-300 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
        <span className="text-cyan-400 font-semibold flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Full-Stack API & Database Controller</span>
        </span>
        <span className="text-[10px] text-slate-500">MongoDB Node API</span>
      </div>

      <div className="space-y-1.5 my-auto text-[11px]">
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">GET</span>
          <span className="text-slate-200">/api/v1/items?filter=active</span>
          <span className="text-slate-500 text-[10px] ml-auto">200 OK • 18ms</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[9px] font-bold">POST</span>
          <span className="text-slate-200">/api/v1/orders/create</span>
          <span className="text-slate-500 text-[10px] ml-auto">201 Created • 29ms</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[9px] font-bold">AUTH</span>
          <span className="text-slate-200">Bearer Token Verified</span>
          <span className="text-emerald-400 text-[10px] ml-auto">Valid</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span>React + Node + Express + MongoDB</span>
        <span className="text-cyan-400">RESTful Architecture</span>
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Selected Work & Engineering Systems</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Real-world production architectures spanning AI-assisted healthcare screening, multiplayer 2D virtual workspaces, and full-stack web platforms.
        </p>
      </div>

      {/* Featured Project: VITALS (Occupies primary focus at top) */}
      <div className="mb-12">
        <FeaturedProject />
      </div>

      {/* Other Projects Grid (2 columns on tablet/desktop, 1 column on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {otherProjects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="group rounded-2xl bg-[#0c1017]/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview */}
                <div className="mb-5 overflow-hidden rounded-xl">
                  {renderPreview(proj.id)}
                </div>

                {/* Header & Subtitle */}
                <div className="mb-3">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider block mb-1">
                    {proj.subtitle}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {proj.description}
                </p>

                {/* Problem / Solution Blocks */}
                <div className="space-y-2 mb-4 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 font-semibold block text-[11px] mb-0.5">
                      Problem:
                    </span>
                    <span className="text-slate-300">{proj.problem}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
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
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-500/20"
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
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>

                  <a
                    href={proj.liveUrl}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center space-x-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Architecture Overview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
