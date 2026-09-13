"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress, BackToTop } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { EducationCertifications } from "@/components/EducationCertifications";
import { Achievements } from "@/components/Achievements";
import { GithubSection } from "@/components/GithubSection";
import { ResumeCTA } from "@/components/ResumeCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ResumeModal } from "@/components/ResumeModal";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Global CMD+K / CTRL+K keydown handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#07090e] bg-grid-pattern overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Top Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Hero Section with Interactive Terminal */}
      <Hero onOpenResume={() => setResumeModalOpen(true)} />

      {/* Developer Dashboard / Connected Bento Grid */}
      <BentoGrid />

      {/* Projects Section: VITALS (Featured AI Healthcare) + Metaverse 2D + Event Mgmt + Fitness Tracker + Eathers */}
      <ProjectsGrid />

      {/* Engineering Stack categorized with interactive cards */}
      <TechStack />

      {/* About Section structured as developer profile */}
      <About />

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Education & Certifications */}
      <EducationCertifications />

      {/* Achievements: 3x Hackathon Winner */}
      <Achievements />

      {/* GitHub Activity & Repositories */}
      <GithubSection />

      {/* Resume Call-to-Action */}
      <ResumeCTA onOpenResume={() => setResumeModalOpen(true)} />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer onOpenResume={() => setResumeModalOpen(true)} />

      {/* Floating Back-to-Top Button */}
      <BackToTop />

      {/* Global Command Palette (Cmd + K / Ctrl + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* High-Resolution Resume Modal with Print/Download */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </main>
  );
}
