"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);

  const cleanPhone = PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) {
      errs.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const openMailto = () => {
    const subject = encodeURIComponent(formData.subject || "Inquiry from Portfolio");
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Slow Fluid Background Wave SVG */}
      <motion.div
        animate={{ x: [-25, 25, -25] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 -right-20 pointer-events-none opacity-20 text-cyan-600/20"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 320" fill="none" className="w-[120%] h-auto">
          <path
            fill="currentColor"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,165.3C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </motion.div>

      {/* Header with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center sm:text-left relative z-10"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC] tracking-tight">
          Let&apos;s build something useful.
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-2xl">
          Interested in discussing full-stack development, AI/ML integration, or collaborative engineering opportunities? Reach out directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: Coordinates & Dedicated Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="rounded-3xl bg-[#0B1620]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#F8FAFC] tracking-tight">
              Direct Coordinates
            </h3>

            {/* Email Card with Mailto & Copy */}
            <div className="p-4 rounded-2xl bg-[#07101A]/80 border border-white/10 space-y-2 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                  Email Address
                </span>
                <AnimatePresence>
                  {copiedType === "email" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-sm sm:text-base text-white font-mono font-medium truncate mr-2 hover:text-cyan-400 transition-colors"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, "email")}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedType === "email" ? (
                    <Check className="w-4 h-4 text-cyan-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Phone Card with Tel & Copy */}
            <div className="p-4 rounded-2xl bg-[#07101A]/80 border border-white/10 space-y-2 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                  Phone Number
                </span>
                <AnimatePresence>
                  {copiedType === "phone" && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={`tel:${cleanPhone}`}
                  className="text-sm sm:text-base text-white font-mono font-medium truncate mr-2 hover:text-cyan-400 transition-colors"
                >
                  {PORTFOLIO_DATA.personal.phone}
                </a>
                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, "phone")}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                  title="Copy phone to clipboard"
                >
                  {copiedType === "phone" ? (
                    <Check className="w-4 h-4 text-cyan-300" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Dedicated "Email Me" & "Call Me" CTAs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="btn-shimmer inline-flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-95 text-slate-950 font-semibold text-xs font-mono transition-all duration-200 shadow-cyan-soft"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me</span>
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-cyan-500/30 text-slate-200 hover:text-white font-medium text-xs font-mono transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Me</span>
              </a>
            </div>

            {/* Location */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Base Location
              </span>
              <div className="flex items-center text-sm sm:text-base text-white font-medium">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Networks
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 text-xs font-mono text-slate-300 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 text-xs font-mono text-slate-300 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="rounded-3xl bg-[#0B1620]/90 border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/20">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Message Staged Successfully
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-cyan-300">{formData.name}</span>. This frontend demonstrates a responsive form interface. You can also launch your default email client directly.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={openMailto}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-95 text-[#07101A] font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Launch in Default Email App</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. John Smith"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07101A]/90 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
                        errors.name
                          ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                          : "border-white/[0.08] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#07101A]/90 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                          : "border-white/[0.08] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Full-Stack / AI Project Inquiry"
                    className={`w-full px-4 py-3 rounded-xl bg-[#07101A]/90 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all ${
                      errors.subject
                        ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                        : "border-white/[0.08] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#07101A]/90 border text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all resize-none ${
                      errors.message
                        ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                        : "border-white/[0.08] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-[0.99] text-[#07101A] font-bold font-mono text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
