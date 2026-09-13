"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress, BackToTop } from "@/components/ScrollProgress";
import { CursorWave } from "@/components/CursorWave";
import { ScrollWaveWrapper } from "@/components/ScrollWaveWrapper";
import { BackgroundWaveLayer } from "@/components/BackgroundWaveLayer";
import { WaveDivider } from "@/components/WaveDivider";
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
    <main className="relative min-h-screen bg-[#0a0d12] text-slate-100 overflow-x-hidden selection:bg-teal-500/20 selection:text-teal-300">
      {/* Liquid Cursor Wave Effect */}
      <CursorWave />

      {/* Dedicated background wave and parallax layer (isolated behind straight content) */}
      <BackgroundWaveLayer />

      {/* Top Thin Scroll Progress Bar */}
      <ScrollProgress />

      {/* Jitter-Inspired Fluid Liquid Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Velocity-Aware Scroll Wave Wrapper */}
      <ScrollWaveWrapper>
        {/* Hero Section */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* Wave Transition 1 */}
        <WaveDivider />

        {/* Developer Bento Grid */}
        <BentoGrid />

        {/* About Developer Profile */}
        <About />

        {/* Wave Transition 2 */}
        <WaveDivider flip />

        {/* Projects Section (Flagship NURA AI + Case Studies) */}
        <ProjectsGrid />

        {/* Wave Transition 3 */}
        <WaveDivider />

        {/* Engineering Stack with Magnetic Skill Cards */}
        <TechStack />

        {/* Experience Timeline with Scroll-Drawn Line & Marker */}
        <ExperienceTimeline />

        {/* Education & Certifications */}
        <EducationCertifications />

        {/* Achievements: 3x Hackathon Winner */}
        <Achievements />

        {/* GitHub Activity & Open Source Matrix */}
        <GithubSection />

        {/* Wave Transition 4 */}
        <WaveDivider flip />

        {/* Resume Call-to-Action */}
        <ResumeCTA onOpenResume={() => setResumeModalOpen(true)} />

        {/* Contact Section with Slow Fluid Wave */}
        <Contact />

        {/* Footer */}
        <Footer onOpenResume={() => setResumeModalOpen(true)} />
      </ScrollWaveWrapper>

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
