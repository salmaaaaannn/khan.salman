# Salman Khan — Senior Full-Stack & AI/ML Developer Portfolio

A modern, production-quality developer portfolio website built for **Salman Khan** (Full-Stack Developer & AI/ML Developer based in Mumbai, India).

The design blends a **Modern SaaS Dashboard**, **Developer Terminal / IDE**, **AI/ML Product Interface**, and **Bento Grid Portfolio** with a dark-first aesthetic.

---

## Key Features

- **Hero & Interactive Terminal Card**:
  - Live developer shell showing verified information (`whoami`, `role`, `stack`, `status`).
  - Interactive prompt allowing visitors to execute commands: `help`, `contact`, `projects`, `clear`.
- **Centerpiece: VITALS (AI Healthcare Screening Platform)**:
  - Occupies prominent 65% desktop width at the top of the Projects section.
  - Interactive 5-stage clinical screening pipeline:
    `Patient/Document` ➔ `OCR Extraction (Tesseract)` ➔ `Backend Validation (FastAPI)` ➔ `AI Screening` ➔ `Healthcare Insights`
  - Real-time stage inspection console simulating clinical inputs and model risk inferences.
- **Projects Showcase**:
  - **METAVERSE 2D**: Real-time virtual workspace with an interactive mini-presence simulator demonstrating player movement and Colyseus WebSocket room connections.
  - **AI EVENT MANAGEMENT SYSTEM**: Smart session scheduling and recommendation engine preview.
  - **AI FITNESS TRACKER**: Real-time pose landmark computer vision analysis and metric telemetry.
  - **EATHERS**: Full-stack REST API and MongoDB schema integration.
- **Developer Bento Grid**:
  - 6 connected glassmorphism cards highlighting Current Role, Primary Stack, AI Focus, Backend Engine, Polyglot Data Persistence, and 3× Hackathon Winner achievement.
- **Engineering Stack**:
  - Categorized into Frontend, Backend, Databases, AI / ML, and Tools.
  - Interactive cards with capability descriptions (no unverified percentages).
- **About Developer Profile**:
  - Structured into WHO I AM, WHAT I BUILD, and CURRENT FOCUS.
- **Professional Timeline & Credentials**:
  - Connected vertical timeline for work experience.
  - Academic degree and professional certifications.
- **Honors & Recognition**:
  - Prominent showcase of "Three-time Hackathon Winner" with custom visual badging.
- **Command Palette (`Cmd + K` / `Ctrl + K`)**:
  - Accessible developer command palette for quick navigation, actions, and theme toggling.
- **Curriculum Vitae Modal**:
  - In-browser clean resume sheet with 1-click Print/PDF save functionality.
- **Contact Section & Form**:
  - Direct coordinates (Location: Mumbai, India, Email, LinkedIn, GitHub).
  - Validated contact form with staging status and email client fallback.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theming**: Next-Themes (Dark-first default, light mode toggle)
- **Deployment**: Production-ready static site generation (`npm run build`)

---

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the portfolio.

To create an optimized production build:

```bash
npm run build
npm run start
```
