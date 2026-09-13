"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Home,
  User,
  FolderGit2,
  Briefcase,
  Layers,
  Award,
  Mail,
  FileText,
  Github,
  Linkedin,
  Sun,
  Moon,
  Copy,
  Check,
  CornerDownLeft,
} from "lucide-react";
import { useTheme } from "next-themes";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Actions" | "Links";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      category: "Navigation",
      icon: Home,
      action: () => scrollToSection("home"),
      shortcut: "H",
    },
    {
      id: "about",
      label: "Go to About",
      category: "Navigation",
      icon: User,
      action: () => scrollToSection("about"),
      shortcut: "A",
    },
    {
      id: "projects",
      label: "Go to Projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollToSection("projects"),
      shortcut: "P",
    },
    {
      id: "experience",
      label: "Go to Experience",
      category: "Navigation",
      icon: Briefcase,
      action: () => scrollToSection("experience"),
      shortcut: "E",
    },
    {
      id: "skills",
      label: "Go to Skills",
      category: "Navigation",
      icon: Layers,
      action: () => scrollToSection("skills"),
      shortcut: "S",
    },
    {
      id: "achievements",
      label: "Go to Achievements",
      category: "Navigation",
      icon: Award,
      action: () => scrollToSection("achievements"),
      shortcut: "T",
    },
    {
      id: "contact",
      label: "Go to Contact",
      category: "Navigation",
      icon: Mail,
      action: () => scrollToSection("contact"),
      shortcut: "C",
    },
    {
      id: "resume",
      label: "View Resume",
      category: "Actions",
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
      shortcut: "R",
    },
    {
      id: "copy-email",
      label: copiedEmail ? "Email Copied!" : "Copy Email Address",
      category: "Actions",
      icon: copiedEmail ? Check : Copy,
      action: copyEmail,
    },
    {
      id: "theme",
      label: `Toggle Theme (Currently ${theme === "light" ? "Light" : "Dark"})`,
      category: "Actions",
      icon: theme === "light" ? Moon : Sun,
      action: () => {
        setTheme(theme === "light" ? "dark" : "light");
      },
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      category: "Links",
      icon: Github,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.github, "_blank");
        onClose();
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile",
      category: "Links",
      icon: Linkedin,
      action: () => {
        window.open(PORTFOLIO_DATA.personal.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearch("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Global keydown listeners for Escape, Arrow keys, Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1017] dark:bg-[#0c1017] border border-white/10 shadow-2xl overflow-hidden z-10 transition-all">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-4 h-4 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-cyan-400" : "text-slate-400"
                      }`}
                    />
                    <span className="font-medium">{cmd.label}</span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                      {cmd.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {cmd.shortcut && (
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span>developer cmd+k</span>
        </div>
      </div>
    </div>
  );
}
