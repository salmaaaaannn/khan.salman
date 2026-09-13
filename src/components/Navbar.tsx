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
} from "lucide-react";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export function Navbar({ onOpenCommandPalette, onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0d12]/92 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-slate-950 font-bold font-mono text-xs shadow-teal-subtle group-hover:scale-105 transition-transform duration-200">
              {PORTFOLIO_DATA.personal.initials}
            </div>
            <span className="font-semibold text-white group-hover:text-teal-400 transition-colors tracking-tight text-sm sm:text-base">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </a>

          {/* Desktop Navigation Links with animated active indicator */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "text-teal-400 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-teal-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right actions: Command Palette hint, Socials, Resume, ThemeToggle */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Contact Icons */}
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="p-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-white/5 transition-colors"
              title={`Email: ${PORTFOLIO_DATA.personal.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="p-2 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-white/5 transition-colors"
              title={`Call: ${PORTFOLIO_DATA.personal.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* CMD + K Shortcut Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-teal-300 text-xs font-mono transition-colors"
              title="Open Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-teal-400" />
              <span>⌘K</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-medium transition-all hover:border-teal-500/50"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Resume</span>
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-teal-300 text-xs font-mono"
              aria-label="Open Command Palette"
            >
              <Command className="w-4 h-4 text-teal-400" />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Smooth Framer Motion Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-[#0c1017]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-2 pb-6 space-y-4 overflow-hidden"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-teal-400 bg-teal-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Direct Contact Details in Mobile Drawer */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="flex items-center space-x-2 text-slate-300 hover:text-teal-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center space-x-2 text-slate-300 hover:text-teal-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>{PORTFOLIO_DATA.personal.phone}</span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-teal-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-teal-600 text-slate-950 font-semibold text-xs shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
