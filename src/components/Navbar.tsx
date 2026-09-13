"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import {
  Menu,
  X,
  Github,
  Linkedin,
  FileText,
  Command,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export function Navbar({ onOpenCommandPalette, onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cleanPhone = PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out ${
          scrolled
            ? "h-14 sm:h-16 bg-[#07101A]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-cyan-950/20"
            : "h-20 sm:h-24 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-[#07101A] font-bold font-mono text-xs shadow-md shadow-cyan-500/20 transition-transform"
            >
              {PORTFOLIO_DATA.personal.initials}
            </motion.div>
            <span className="font-bold tracking-tight text-white text-sm sm:text-base font-mono uppercase group-hover:text-cyan-400 transition-colors">
              SALMAN KHAN
            </span>
          </a>

          {/* Desktop Navigation Links with Fluid Liquid Pill Indicator (Jitter Inspired) */}
          <nav
            onMouseLeave={() => setHoveredSection(null)}
            className="hidden md:flex items-center p-1 rounded-full bg-[#0B1620]/80 border border-white/[0.08] backdrop-blur-md relative"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              const isHovered = hoveredSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredSection(sectionId)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium font-mono transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-[#07101A] font-bold"
                      : isHovered
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {/* Subtle Text Translation on Hover */}
                  <span className="relative z-10 block transition-transform duration-200 group-hover:-translate-y-0.5">
                    {link.name}
                  </span>

                  {/* Active Liquid Sliding Pill (Highest Priority) */}
                  {isActive && (
                    <motion.div
                      layoutId="liquidActivePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 shadow-md shadow-cyan-500/30"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}

                  {/* Hover Floating Aura when not active */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="liquidHoverPill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Contact Icons */}
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
              title={`Email: ${PORTFOLIO_DATA.personal.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
              title={`Call: ${PORTFOLIO_DATA.personal.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* CMD + K Shortcut Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.08] text-slate-400 hover:text-cyan-300 text-xs font-mono transition-colors"
              title="Open Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400" />
              <span>⌘K</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-all hover:border-cyan-500/50"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg bg-white/5 border border-white/[0.08] text-slate-400 hover:text-cyan-300 text-xs font-mono"
              aria-label="Open Command Palette"
            >
              <Command className="w-4 h-4 text-cyan-400" />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Panel (Jitter Inspired Smooth Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-35 bg-[#07101A]/98 backdrop-blur-2xl pt-24 pb-8 px-6 flex flex-col justify-between lg:hidden"
          >
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
              className="flex flex-col space-y-3"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 },
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-lg font-mono font-semibold transition-all ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </motion.a>
                );
              })}
            </motion.nav>

            <div className="pt-6 border-t border-white/[0.08] space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email</span>
                </a>
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Call</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/[0.04] text-slate-300 hover:text-cyan-400"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-[#07101A] font-bold text-xs font-mono shadow-md shadow-cyan-500/20"
                >
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
