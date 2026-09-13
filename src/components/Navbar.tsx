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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cleanPhone = PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "h-16 bg-white/90 dark:bg-[#07101A]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-cyan-950/20"
            : "h-16 bg-white/90 dark:bg-[#07101A]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] lg:h-20 lg:bg-transparent lg:border-transparent lg:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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
            <span className="font-bold tracking-tight text-slate-900 dark:text-white text-sm sm:text-base font-mono uppercase group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
              SALMAN KHAN
            </span>
          </a>

          {/* Desktop Navigation Links with Fluid Liquid Pill Indicator */}
          <nav
            onMouseLeave={() => setHoveredSection(null)}
            className="hidden lg:flex items-center p-1 rounded-full bg-slate-100/90 dark:bg-[#0B1620]/80 border border-slate-200 dark:border-white/[0.08] backdrop-blur-md relative"
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
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
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
              className="p-2 rounded-lg text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title={`Email: ${PORTFOLIO_DATA.personal.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="p-2 rounded-lg text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title={`Call: ${PORTFOLIO_DATA.personal.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* CMD + K Shortcut Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.08] text-slate-700 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300 text-xs font-mono transition-colors"
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
            {/* Command Palette Button for small tablets, hidden on narrow mobile to keep 44px spacing */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs font-mono"
              aria-label="Open Command Palette"
            >
              <Command className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </button>

            <ThemeToggle />

            {/* Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5" />
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
              className="fixed inset-0 z-40 bg-black/60 dark:bg-black/80 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />

            {/* Dropdown Menu Panel: Placed directly below the 64px header, scrollable, high z-index */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 left-0 right-0 z-40 bg-white/95 dark:bg-[#07101A]/98 backdrop-blur-2xl border-b border-slate-200 dark:border-white/[0.08] shadow-2xl p-5 sm:p-6 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <motion.nav
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="flex flex-col space-y-2"
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                      transition={{ duration: 0.25 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`min-h-[48px] flex items-center justify-between px-4 py-3 rounded-xl text-base font-mono font-semibold transition-all ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
                          : "text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </motion.a>
                  );
                })}
              </motion.nav>

              <div className="pt-5 mt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-3.5">
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="min-h-[44px] flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Email</span>
                  </a>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="min-h-[44px] flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 transition-colors"
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
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={PORTFOLIO_DATA.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
                    className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-[#07101A] font-bold text-xs font-mono shadow-md shadow-cyan-500/20 active:scale-95 transition-transform"
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
