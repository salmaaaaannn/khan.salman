"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
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

  // Subtle photo micro-animation: mouse movement restricted to maximum 4px, zero rotation, zero skew
  const portraitMoveX = useTransform(smoothMouseX, [-500, 500], [-4, 4]);
  const portraitMoveY = useTransform(smoothMouseY, [-500, 500], [-4, 4]);

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
          className="w-[900px] h-[900px] opacity-20 animate-pulse-slow"
        >
          <defs>
            <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#07101a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="500" r="420" fill="url(#waveGlow)" />
        </svg>
      </motion.div>

      {/* Floating Ambient Glow Orbs with subtle Cyan / Indigo / Violet accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/[0.08] rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-600/[0.08] rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-600/[0.05] rounded-full blur-3xl pointer-events-none" />

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
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B1620]/85 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="font-medium">Available for Opportunities</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-cyan-400" />
                  {PORTFOLIO_DATA.personal.location}
                </span>
              </div>
            </motion.div>

            {/* 2. SALMAN KHAN Reveals */}
            <motion.div variants={itemFadeUp}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08] font-mono">
                SALMAN KHAN
              </h1>
            </motion.div>

            {/* 3. Role Text */}
            <motion.div variants={itemFadeUp}>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight flex flex-wrap items-center gap-x-3">
                <span className="text-cyan-400">Full-Stack Developer</span>
                <span className="text-slate-600">|</span>
                <span className="text-[#8B5CF6] font-semibold">AI/ML Developer</span>
              </div>
            </motion.div>

            {/* 4. Headline & Description */}
            <motion.div variants={itemFadeUp} className="space-y-2">
              <p className="text-lg sm:text-xl font-medium text-slate-100 max-w-2xl leading-relaxed">
                &ldquo;{PORTFOLIO_DATA.personal.headline}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
                {PORTFOLIO_DATA.personal.subheadline}
              </p>
            </motion.div>

            {/* 5. Primary CTA Buttons with Magnetic Hover */}
            <motion.div variants={buttonVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="btn-shimmer group inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-95 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-cyan-soft hover:shadow-cyan-subtle hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#0B1620]/80 hover:bg-[#0B1620] active:scale-95 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Direct Coordinates */}
            <motion.div
              variants={itemFadeUp}
              className="pt-4 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs text-[#94A3B8] font-mono"
            >
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </a>

              <div className="flex items-center space-x-3 ml-auto">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* 6. Right Column: Portrait + Terminal Bento Group */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-6 w-full">
            {/* Salman's Portrait in Large Asymmetric Rounded Frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              style={{ x: portraitMoveX, y: portraitMoveY }}
              className="relative group w-full max-w-md"
            >
              {/* Subtle Cyan / Indigo Glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#22D3EE]/20 via-[#6366F1]/15 to-[#8B5CF6]/20 rounded-[2.5rem] rounded-tr-xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Very Subtle Floating AI Orb */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2.5 -right-2.5 w-14 h-14 rounded-full bg-gradient-to-br from-[#22D3EE]/25 to-[#8B5CF6]/25 blur-md pointer-events-none"
              />

              {/* Frame Container: Asymmetric Rounded Frame with Dark Glassmorphism */}
              <div className="relative rounded-[2.5rem] rounded-tr-xl bg-[#0B1620]/85 border border-white/10 p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-cyan-500/35">
                {/* Soft Radial Gradient & Faint Abstract AI / Network Lines */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                  <div className="absolute inset-0 bg-radial-at-top-right from-cyan-500/[0.08] via-transparent to-transparent" />
                  <svg
                    viewBox="0 0 400 480"
                    className="absolute inset-0 w-full h-full opacity-15 text-cyan-400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="60" cy="70" r="2" fill="currentColor" />
                    <circle cx="340" cy="90" r="2" fill="currentColor" />
                    <circle cx="360" cy="260" r="2" fill="currentColor" />
                    <circle cx="40" cy="320" r="2" fill="currentColor" />
                    <circle cx="200" cy="400" r="2" fill="currentColor" />
                    <path
                      d="M60 70 L340 90 M340 90 L360 260 M360 260 L200 400 M60 70 L40 320 M40 320 L200 400"
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>

                {/* Portrait Image Container: Straight, Natural Colors, Zero Distortion */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative w-full h-[370px] sm:h-[430px] rounded-[2rem] rounded-tr-lg overflow-hidden bg-[#07101A]"
                >
                  <Image
                    src="/salman.jpeg"
                    alt="Salman Khan - Full-Stack Developer & AI/ML Developer"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 420px, 450px"
                    className="object-cover object-[center_12%] select-none transition-transform duration-500"
                  />

                  {/* Ambient Subtle Gradient Overlay at bottom for seamless badge integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101A]/90 via-[#07101A]/10 to-transparent pointer-events-none" />

                  {/* Integrated Status Pill in Photo */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-[#0B1620]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#F8FAFC]">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      <span className="truncate text-[11px] text-slate-200 font-semibold">Salman Khan</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-[11px] text-cyan-300 truncate">AI/ML & Full-Stack</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2 hidden sm:inline">Mumbai, IN</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Developer Terminal Card */}
            <motion.div
              variants={terminalVariants}
              initial="hidden"
              animate="visible"
              className="w-full max-w-md"
            >
              <TerminalCard />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
