"use client";

import React, { useState, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function TerminalCard() {
  const [inputVal, setInputVal] = useState("");
  const [typedLines, setTypedLines] = useState<number>(0);
  const [outputHistory, setOutputHistory] = useState<
    { cmd: string; result: string | React.ReactNode }[]
  >([]);

  // Sequential typing/reveal once on initial load
  useEffect(() => {
    const timers = [
      setTimeout(() => setTypedLines(1), 350),  // whoami
      setTimeout(() => setTypedLines(2), 750),  // role
      setTimeout(() => setTypedLines(3), 1150), // stack
      setTimeout(() => setTypedLines(4), 1550), // status
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    let result: string | React.ReactNode = "";

    switch (trimmed) {
      case "help":
        result = "Available commands: whoami, role, stack, status, contact, projects, clear";
        break;
      case "whoami":
        result = `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.location}`;
        break;
      case "role":
        result = PORTFOLIO_DATA.personal.role;
        break;
      case "stack":
        result = "React, Next.js, Node.js, Python, FastAPI, MongoDB, MySQL, TypeScript";
        break;
      case "status":
        result = "Building intelligent systems with full-stack & AI/ML architecture.";
        break;
      case "contact":
        result = `Email: ${PORTFOLIO_DATA.personal.email} | Phone: ${PORTFOLIO_DATA.personal.phone}`;
        break;
      case "projects":
        result = "Key Projects: NURA AI (AI Healthcare), METAVERSE 2D, AI EVENT MANAGEMENT, AI FITNESS TRACKER, EATHERS";
        break;
      case "clear":
        setOutputHistory([]);
        setInputVal("");
        return;
      default:
        result = `command not found: "${trimmed}". Type "help" for a list of commands.`;
    }

    setOutputHistory((prev) => [...prev, { cmd: inputVal, result }]);
    setInputVal("");
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-[#0B1620]/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-cyan-500/35 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#07101A]/90 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 hover:opacity-100 transition-opacity cursor-pointer inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 hover:opacity-100 transition-opacity cursor-pointer inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 hover:opacity-100 transition-opacity cursor-pointer inline-block" />
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-[#94A3B8]">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>salman@portfolio:~</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-300 font-medium">live</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-3 text-slate-200 select-text overflow-x-hidden min-h-[260px]">
        {/* Command 1: whoami */}
        {typedLines >= 1 && (
          <div className="transition-opacity duration-300 opacity-100">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-300">whoami</span>
            </div>
            <div className="pl-4 mt-1 font-semibold text-[#F8FAFC] tracking-wide">
              Salman Khan
            </div>
          </div>
        )}

        {/* Command 2: role */}
        {typedLines >= 2 && (
          <div className="transition-opacity duration-300 opacity-100">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-300">role</span>
            </div>
            <div className="pl-4 mt-1 text-slate-300 space-y-0.5">
              <div className="text-cyan-300 font-medium">Full-Stack Developer</div>
              <div className="text-indigo-300 font-medium">AI/ML Developer</div>
            </div>
          </div>
        )}

        {/* Command 3: stack */}
        {typedLines >= 3 && (
          <div className="transition-opacity duration-300 opacity-100">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-300">stack</span>
            </div>
            <div className="pl-4 mt-1 text-slate-300 space-y-0.5">
              <div className="text-slate-200">React • Next.js • Node • Python</div>
              <div className="text-[#94A3B8]">FastAPI • MongoDB • MySQL</div>
            </div>
          </div>
        )}

        {/* Command 4: status */}
        {typedLines >= 4 && (
          <div className="transition-opacity duration-300 opacity-100">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-300">status</span>
            </div>
            <div className="pl-4 mt-1 flex items-center space-x-2 text-cyan-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-ping" />
              <span>Building intelligent systems</span>
            </div>
          </div>
        )}

        {/* Blinking cursor during typing phase */}
        {typedLines < 4 && (
          <div className="flex items-center space-x-1 text-cyan-400">
            <span>$</span>
            <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse" />
          </div>
        )}

        {/* Command History from interactive runs */}
        {outputHistory.map((item, idx) => (
          <div key={idx} className="pt-2 border-t border-white/5">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-300">{item.cmd}</span>
            </div>
            <div className="pl-4 mt-1 text-slate-300 text-xs break-words">
              {item.result}
            </div>
          </div>
        ))}

        {/* Interactive Command Prompt once typing is done */}
        {typedLines >= 4 && (
          <form
            onSubmit={handleCommand}
            className="pt-2 border-t border-white/10 flex items-center space-x-2"
          >
            <span className="text-cyan-400 font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help' or command..."
              className="w-full bg-transparent text-[#F8FAFC] placeholder:text-slate-600 focus:outline-none text-xs sm:text-sm font-mono"
            />
            <button
              type="submit"
              aria-label="Run command"
              className="p-1 rounded text-[#94A3B8] hover:text-cyan-400 transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-[#07101A]/80 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
        <span>interactive dev terminal</span>
        <span className="text-cyan-400">mumbai, in</span>
      </div>
    </div>
  );
}
