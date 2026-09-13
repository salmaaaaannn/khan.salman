"use client";

import React from "react";
import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface FooterProps {
  onOpenResume: () => void;
}

export function Footer({ onOpenResume }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const cleanPhone = PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "");

  return (
    <footer className="border-t border-white/[0.08] bg-[#050B12] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-cyan-400 shadow-sm shadow-cyan-400/50 font-mono" />
            <span className="font-bold text-white tracking-tight">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            {PORTFOLIO_DATA.personal.role}
          </p>
          <p className="text-[11px] font-mono text-slate-500">
            {PORTFOLIO_DATA.personal.location}
          </p>
        </div>

        {/* Clickable Links & Coordinates */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <a
            href={`tel:${cleanPhone}`}
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <button
            onClick={onOpenResume}
            className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Closing note */}
        <div className="text-center md:text-right space-y-1 text-xs font-mono text-slate-500">
          <p className="text-slate-400">
            &quot;Built with React/Next.js and a little too much coffee.&quot;
          </p>
          <p className="text-[11px]">
            © {currentYear} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
