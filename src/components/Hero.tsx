"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TerminalCard } from "./TerminalCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle floating background wave displacement based on mouse
  const waveMoveX = useTransform(smoothMouseX, [-500, 500], [-18, 18]);
  const waveMoveY = useTransform(smoothMouseY, [-500, 500], [-12, 12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const terminalVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
  };

  const cleanPhone = PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "");

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-subtle"
    >
      {/* Abstract Floating Liquid Wave Background reacts to mouse */}
      <motion.div
        style={{ x: waveMoveX, y: waveMoveY }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-[900px] h-[900px] opacity-15 text-teal-600/30 animate-pulse-slow"
        >
          <defs>
            <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#0f766e" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0a0d12" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="500" r="420" fill="url(#waveGlow)" />
        </svg>
      </motion.div>

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-800/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Sequenced Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* 1. Availability Badge */}
            <motion.div variants={itemFadeUp} className="inline-flex items-center space-x-2.5">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                </span>
                <span className="font-medium">Available for Opportunities</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-teal-400" />
                  {PORTFOLIO_DATA.personal.location}
                </span>
              </div>
            </motion.div>

            {/* 2. SALMAN KHAN Reveals */}
            <motion.div variants={itemFadeUp}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-mono">
                SALMAN KHAN
              </h1>
            </motion.div>

            {/* 3. Role Text */}
            <motion.div variants={itemFadeUp}>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-teal-400 tracking-tight flex flex-wrap items-center gap-x-3">
                <span>Full-Stack Developer</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-200">AI/ML Developer</span>
              </div>
            </motion.div>

            {/* 4. Headline & Description */}
            <motion.div variants={itemFadeUp} className="space-y-2">
              <p className="text-lg sm:text-xl font-medium text-slate-200 max-w-2xl leading-relaxed">
                &ldquo;{PORTFOLIO_DATA.personal.headline}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                {PORTFOLIO_DATA.personal.subheadline}
              </p>
            </motion.div>

            {/* 5. Primary CTA Buttons with Magnetic Hover */}
            <motion.div variants={buttonVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="btn-shimmer group inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-teal-soft hover:shadow-teal-subtle hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-teal-500/40 text-slate-200 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Direct Coordinates */}
            <motion.div
              variants={itemFadeUp}
              className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs text-slate-400 font-mono"
            >
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </a>

              <div className="flex items-center space-x-3 ml-auto">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* 6. Right Column: Terminal Card */}
          <motion.div
            variants={terminalVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <TerminalCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
