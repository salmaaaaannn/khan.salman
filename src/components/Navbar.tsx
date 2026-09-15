"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  // Optimized passive scroll listener using requestAnimationFrame to prevent forced reflows
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const sections = navLinks.map((l) => l.href.substring(1));
          const scrollPos = window.scrollY + 220;

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection((prev) => (prev !== sections[i] ? sections[i] : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(href.slice(1));
    if (target) {
      const navbarOffset = window.innerWidth >= 1024 ? 88 : 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.history.replaceState(null, "", href);
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    }
  };

  const cleanPhone = PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "");
  const shellClasses = isDark
    ? "bg-[#07101A]/90 border-slate-200/10 shadow-cyan-950/20"
    : "bg-white/90 border-slate-200/80 shadow-slate-200/40";
  const navPillClasses = isDark
    ? "bg-[#0B1620]/80 border-white/[0.08]"
    : "bg-slate-100/90 border-slate-200";
  const navItemClasses = isDark
    ? "text-slate-400 hover:text-slate-200"
    : "text-slate-600 hover:text-slate-900";
  const desktopActionClasses = isDark
    ? "text-slate-400 hover:text-cyan-400 hover:bg-white/5 border-white/[0.08]"
    : "text-slate-600 hover:text-cyan-600 hover:bg-slate-100 border-slate-200";
  const mobileShellClasses = isDark
    ? "bg-[#07101A]/98 border-white/[0.08]"
    : "bg-white/95 border-slate-200";
  const mobileActionClasses = isDark
    ? "bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/5"
    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200";
  const mobileMenuTextClasses = isDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-slate-700 hover:text-slate-950 hover:bg-slate-100";

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl" />
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 isolate transition-all duration-300 ease-out backdrop-blur-xl ${shellClasses} ${
          scrolled
            ? "h-14 sm:h-16 border-b shadow-sm"
            : "h-14 sm:h-16 lg:h-20 lg:bg-transparent lg:border-transparent lg:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-[#07101A] font-bold font-mono text-xs shadow-md shadow-cyan-500/20 transition-transform shrink-0"
            >
              {PORTFOLIO_DATA.personal.initials}
            </motion.div>
            <span className={`font-bold tracking-tight text-sm sm:text-base font-mono uppercase transition-colors truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none ${
              isDark ? "text-white group-hover:text-cyan-400" : "text-slate-900 group-hover:text-cyan-600"
            }`}>
              SALMAN KHAN
            </span>
          </a>

          {/* Desktop Navigation Links with Fluid Liquid Pill Indicator */}
          <nav
            onMouseLeave={() => setHoveredSection(null)}
            className={`hidden lg:flex items-center p-1 rounded-full border backdrop-blur-md relative ${navPillClasses}`}
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
                      ? isDark
                        ? "text-[#07101A] font-bold"
                        : "text-[#07101A] font-bold"
                      : isHovered
                      ? isDark
                        ? "text-white"
                        : "text-slate-900"
                      : navItemClasses
                  }`}
                >
                  <span className="relative z-10 block transition-transform duration-200 group-hover:-translate-y-0.5">
                    {link.name}
                  </span>

                  {/* Active Liquid Sliding Pill */}
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

                  {/* Hover Floating Aura */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="liquidHoverPill"
                      className="absolute inset-0 rounded-full bg-slate-200/60 dark:bg-white/10"
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

          {/* Desktop Right Action Icons & Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Contact Icons */}
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className={`p-2 rounded-lg transition-colors border ${desktopActionClasses}`}
              title={`Email: ${PORTFOLIO_DATA.personal.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className={`p-2 rounded-lg transition-colors border ${desktopActionClasses}`}
              title={`Call: ${PORTFOLIO_DATA.personal.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* CMD + K Shortcut Button */}
            <button
              onClick={onOpenCommandPalette}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors ${desktopActionClasses}`}
              title="Open Command Palette (Cmd + K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>⌘K</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium transition-all hover:border-cyan-500/50"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Resume</span>
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile Right Bar (Controls stay cleanly inside the navbar, min 44px touch targets) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 lg:hidden">
            <button
              onClick={onOpenCommandPalette}
              className={`hidden sm:flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border text-xs font-mono transition-colors ${desktopActionClasses}`}
              aria-label="Open Command Palette"
            >
              <Command className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${desktopActionClasses}`}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Dropdown & Backdrop (Clean Overlay with zero content overlap) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop: Clicking outside immediately closes menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Dropdown Menu Panel: Placed directly below the 64px header, scrollable, high z-index */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed top-[3.5rem] left-0 right-0 z-40 backdrop-blur-2xl border-b shadow-2xl p-3.5 sm:p-5 lg:hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto ${mobileShellClasses}`}
            >
              <motion.nav
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="flex flex-col space-y-1.5"
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -12 },
                      }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`min-h-[42px] flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-mono font-semibold transition-all ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-700 border border-cyan-500/30"
                          : mobileMenuTextClasses
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </motion.a>
                  );
                })}

                {/* 8. Resume Item in Menu List */}
                <motion.button
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -12 },
                  }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="min-h-[42px] flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-mono font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all text-left"
                >
                  <span className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Resume</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </motion.button>
              </motion.nav>

              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-white/[0.08] space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className={`min-h-[40px] flex items-center justify-center space-x-2 py-2 rounded-lg border transition-colors ${mobileActionClasses}`}
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Email</span>
                  </a>
                  <a
                    href={`tel:${cleanPhone}`}
                    className={`min-h-[40px] flex items-center justify-center space-x-2 py-2 rounded-lg border transition-colors ${mobileActionClasses}`}
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Call</span>
                  </a>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <a
                      href={PORTFOLIO_DATA.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border transition-colors ${mobileActionClasses}`}
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={PORTFOLIO_DATA.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border transition-colors ${mobileActionClasses}`}
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="min-h-[40px] px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 text-[#07101A] font-bold text-[11px] font-mono shadow-md shadow-cyan-500/20 active:scale-95 transition-transform"
                  >
                    View Resume
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
