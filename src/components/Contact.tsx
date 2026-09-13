"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Copy,
  Check,
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
  const [copied, setCopied] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openMailto = () => {
    const subject = encodeURIComponent(formData.subject || "Inquiry from Portfolio");
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Let&apos;s build something useful.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
          Interested in discussing full-stack development, AI/ML integration, or collaborative engineering opportunities? Reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact Channels & Location */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#0c1017]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Contact Coordinates
            </h3>

            {/* Email with copy button */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Primary Email
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base text-white font-mono font-medium truncate mr-2">
                  {PORTFOLIO_DATA.personal.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                  title="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                Base Location
              </span>
              <div className="flex items-center text-sm sm:text-base text-white font-medium">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Professional Networks
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-indigo-500/30 text-xs font-mono text-slate-300 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-indigo-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-cyan-500/30 text-xs font-mono text-slate-300 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Response notice */}
            <div className="pt-2 text-xs font-mono text-slate-500 border-t border-white/5 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>Available for engineering inquiries</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#0c1017]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Message Staged Successfully
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. This frontend is currently operating in static showcase mode without an external live mail relay.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={openMailto}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Launch in Default Email App</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300"
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
                      placeholder="e.g. Sarah Connor"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                        errors.name
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500/50"
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
                      placeholder="e.g. sarah@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                        errors.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500/50"
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
                    placeholder="e.g. Engineering Project Inquiry"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                      errors.subject
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-500/50"
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
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/10 focus:border-cyan-500/50"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{errors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold font-mono text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                <p className="text-[11px] font-mono text-slate-500 text-center pt-1">
                  Protected with client-side form validation
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
