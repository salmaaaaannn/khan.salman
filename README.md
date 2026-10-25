# Salman Khan — 3D Animated Developer Portfolio

A production-grade, 3D animated personal developer portfolio built with **React 18**, **TypeScript**, **Three.js**, **React Three Fiber**, **Rapier Physics**, and **GSAP ScrollTrigger/ScrollSmoother**.

Personalized for **Salman Khan** — Full-Stack Developer & AI/ML Enthusiast based in Mumbai, India. Designed with an **Apple-inspired dark glassmorphism** aesthetic (`#030305`, frosted smoky glass containers, subtle ice-blue accents `#38bdf8`, and refined silver typography) while preserving 100% of the interactive 3D character bone tracking, physics ballpit simulations, and smooth scroll timelines.

---

## 🌟 Key Highlights & Features

- **Interactive 3D Hero Scene**: Real-time 3D character loaded via `@react-three/fiber` and `@react-three/drei` with dynamic head/neck bone mouse-look tracking and responsive lighting.
- **Scroll-Driven GSAP Timelines**: Seamless camera dolly, pan, and character rotations synchronized to page scroll using GSAP `ScrollTrigger` and `ScrollSmoother`.
- **Apple Glassmorphism UI**: High-end liquid dark theme featuring `backdrop-filter: blur(18px) saturate(140%)`, translucent borders, delicate ambient lighting, and zero neon oversaturation.
- **Interactive 3D Tech Stack Ballpit**: Rigid-body physics engine powered by `@react-three/rapier` simulating draggable, bouncing spheres mapped with dynamic HTML5 canvas textures.
- **Project Showcase Carousel**: Interactive slider highlighting Salman's core engineering projects with animated progress bars, live metrics, and technical feature breakdowns.
- **Verified Resume Integration**: 100% authentic resume data including Salman's MCA studies, Entwicklera internship, 3× first-place hackathon championships, and downloadable PDF resume.
- **Custom Cursor & Fluid Transitions**: Velocity-sensitive custom cursor physics with smooth element hover states.

---

## 🛠️ Tech Stack

### Core Framework & Build Tooling
- **React 18** — Component-driven frontend architecture
- **TypeScript** — Strict type safety across all components and data models
- **Vite** — High-performance bundling and sub-second HMR

### 3D Graphics & Physics
- **Three.js** — Core WebGL 3D graphics rendering
- **@react-three/fiber** — Declarative React renderer for Three.js
- **@react-three/drei** — GLTF loaders, HDR environment maps, and camera helpers
- **@react-three/rapier** — High-performance physics engine for rigid-body tech stack simulations
- **N8AO** — Ambient occlusion post-processing for realistic depth and contact shadows

### Motion & Animation
- **GSAP (GreenSock)** — Industry-standard animation engine
- **GSAP ScrollTrigger** — Scroll-synchronized camera and layout choreography
- **GSAP ScrollSmoother** — Hardware-accelerated smooth scrolling
- **GSAP SplitText** — Kinetic typography line-by-line animations

---

## 📂 Project Structure

```text
.
├── public/
│   ├── models/
│   │   ├── character.glb         # Optimized 3D character mesh & skeleton
│   │   └── char_enviorment.hdr   # High dynamic range environment map
│   ├── draco/                    # Draco 3D geometry decompression decoders
│   ├── images/                   # Static previews and project graphics
│   └── Salman-Khan-Resume.pdf    # Verified downloadable PDF resume
├── src/
│   ├── components/
│   │   ├── Character/            # 3D Canvas, character rig & mouse tracking logic
│   │   ├── styles/               # Glassmorphism component stylesheets
│   │   ├── About.tsx             # Profile overview & MCA background
│   │   ├── Career.tsx            # Entwicklera experience & hackathon victories
│   │   ├── Contact.tsx           # Contact channels, education, certifications & social links
│   │   ├── Cursor.tsx            # Custom mouse cursor with difference blend mode
│   │   ├── Landing.tsx           # 3D Hero section with CTA actions
│   │   ├── MainContainer.tsx     # Root smooth scroll wrapper & responsive layout
│   │   ├── Navbar.tsx            # Smooth navigation header
│   │   ├── TechStack.tsx         # 3D Rapier physics interactive ballpit
│   │   ├── WhatIDo.tsx           # Technical capabilities & skillset tags
│   │   └── Work.tsx              # Featured project highlights carousel
│   ├── data/
│   │   └── portfolio.ts          # Centralized configuration & resume data
│   ├── context/                  # Loading and scene ready state management
│   ├── App.tsx                   # Main entry component
│   └── main.tsx                  # Vite application root
├── vercel.json                   # Vercel deployment and SPA routing rules
├── vite.config.ts                # Vite build and plugin configuration
└── package.json                  # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/salmaaaaannn/khan.salman.git
   cd khan.salman
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Production Build & Verification:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 👤 Profile & Verified Resume Details

| Category | Details |
| :--- | :--- |
| **Name** | Salman Khan |
| **Location** | Mumbai, India |
| **Email** | [salmanmuslimkhan@gmail.com](mailto:salmanmuslimkhan@gmail.com) |
| **Phone** | [+91 8938359076](tel:+918938359076) |
| **LinkedIn** | [linkedin.com/in/salman-khan-03a45a290](https://linkedin.com/in/salman-khan-03a45a290) |
| **GitHub** | [github.com/salmaaaaannn](https://github.com/salmaaaaannn) |
| **Education** | MCA (Master of Computer Applications) & B.Sc. IT — University of Mumbai |
| **Internship** | Software Developer Intern @ **Entwicklera** (Apr 2025 – Jun 2025) |
| **Hackathons** | 1st Place Jai Hind College (2026), 1st Place KC College (2026), 1st Place Kirti College (2026) |

---

## 🌐 Deployment to Vercel

The project includes `vercel.json` pre-configured for single-page application routing and clean caching:

1. Push your latest code to GitHub (`main` branch).
2. Connect your repository on [Vercel](https://vercel.com).
3. The build settings are auto-detected:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
