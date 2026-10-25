export type Capability = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

export type Experience = {
  role: string;
  company: string;
  meta: string;
  period: string;
  description: string;
};

export type HighlightMetric = {
  value: string;
  label: string;
};

export type Highlight = {
  title: string;
  category: string;
  summary: string;
  focus: string;
  bullets: string[];
  metrics: HighlightMetric[];
};

export const portfolioData = {
  meta: {
    initials: "SK",
    name: "Salman Khan",
    title: "Full-Stack Developer",
    subtitle: "Full-Stack Developer | AI/ML Enthusiast",
    email: "salmanmuslimkhan@gmail.com",
    phone: "+91 8938359076",
    phoneHref: "tel:+918938359076",
    emailHref: "mailto:salmanmuslimkhan@gmail.com",
    location: "Mumbai, India",
    locationHref: "https://www.google.com/maps/search/Mumbai+India",
    linkedinHref: "https://linkedin.com/in/salman-khan-03a45a290",
    githubHref: "https://github.com/salmaaaaannn",
    resumePath: "/Salman-Khan-Resume.pdf",
  },
  landing: {
    greeting: "Hi, I'm",
    firstName: "SALMAN",
    lastName: "KHAN",
    lead: "Full-Stack Developer &",
    accentPrimary: "AI / ML",
    accentSecondary: "ENTHUSIAST",
    basePrimary: "FULL-STACK",
    baseSecondary: "ENGINEER",
  },
  about:
    "I am an MCA student and full-stack developer based in Mumbai, India, passionate about building modern web applications, scalable distributed backends, and practical AI/ML solutions. With hands-on internship experience at Entwicklera and three first-place hackathon victories, I focus on turning complex problem statements into elegant, high-performance software with clean code and sub-second latency.",
  capabilities: [
    {
      title: "FULL-STACK DEV",
      subtitle: "Component Architecture, Next.js & TypeScript",
      description:
        "I build production-grade web applications using React, Next.js, and TypeScript, backed by robust asynchronous APIs in Node.js and FastAPI with clean state management and fluid responsiveness.",
      tags: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "FastAPI",
      ],
    },
    {
      title: "AI / ML & VISION",
      subtitle: "Document OCR, Pose Tracking & Risk Screening",
      description:
        "I develop applied machine learning workflows — from Tesseract OCR and MediaPipe computer vision to predictive screening pipelines and RAG-driven models that run efficiently on production backends.",
      tags: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "scikit-learn",
        "Computer Vision",
        "MediaPipe",
        "Tesseract OCR",
      ],
    },
    {
      title: "BACKEND & APIS",
      subtitle: "High-Throughput Services & Real-Time WebSockets",
      description:
        "I architect resilient RESTful microservices, WebSocket channels, and token-based authentication workflows designed for high throughput, data integrity, and low latency.",
      tags: [
        "FastAPI",
        "Node.js",
        "Express.js",
        "REST APIs",
        "WebSockets",
        "Prisma",
        "ASP.NET",
      ],
    },
    {
      title: "DATA & DEVOPS",
      subtitle: "Polyglot Persistence, Containerization & CI",
      description:
        "I design optimized schemas across MongoDB, PostgreSQL, and MySQL, with Redis caching, Docker containerization, Postman automated testing, and Nginx deployment setups.",
      tags: [
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Docker",
        "Nginx",
        "Git & GitHub",
      ],
    },
  ] as Capability[],
  experience: [
    {
      role: "Software Developer Intern",
      company: "Entwicklera",
      meta: "Mumbai, India",
      period: "Apr 2025 – Jun 2025",
      description:
        "Architected and built full-stack web applications using React, Next.js, Node.js, and FastAPI. Engineered scalable backend REST APIs, designed schema structures across MongoDB and MySQL, developed AI/ML-assisted OCR document extraction pipelines and intelligent screening modules, and optimized client-side rendering with strict TypeScript type-safety.",
    },
    {
      role: "Hackathon Lead Developer",
      company: "3× First-Place Champion",
      meta: "Mumbai, India",
      period: "2026",
      description:
        "Won 1st Place across three prestigious college hackathons: Jai Hind College (Aetherscan), KC College (AI Fitness Tracker), and Kirti College (The Medium). Architected and deployed functional, AI-powered MVPs within rapid 24-48 hour competitive sprints.",
    },
    {
      role: "B.Sc. in Information Technology",
      company: "University of Mumbai",
      meta: "Mumbai, India",
      period: "2022 – 2025",
      description:
        "Graduated with core foundations in Data Structures & Algorithms, Object-Oriented Software Engineering, Relational Database Management Systems, Computer Networks, and Full-Stack Web Technologies.",
    },
  ] as Experience[],
  highlights: [
    {
      title: "NURA-AI Platform",
      category: "AI/ML · Healthcare Screening",
      summary:
        "An automated clinical screening web platform combining a Next.js frontend, asynchronous FastAPI microservices, and Tesseract OCR for digitized lab report parsing and biomarker risk evaluation.",
      focus:
        "Next.js, FastAPI, Python, Tesseract OCR, scikit-learn, Biomarker Risk Modeling, Asynchronous APIs.",
      bullets: [
        "High-precision OCR document extraction digitizing medical reports and unstructured diagnostic panels into structured schemas.",
        "Asynchronous FastAPI validation engine performing clinical sanity checks and biomarker normalization.",
        "Machine learning screening models evaluating biomarker health risk indicators for rapid triage assistance.",
      ],
      metrics: [
        { value: "OCR", label: "Tesseract pipeline" },
        { value: "FastAPI", label: "Async microservices" },
        { value: "ML", label: "Biomarker screening" },
        { value: "< 1s", label: "Report triage latency" },
      ],
    },
    {
      title: "MetaCity Digital Twin",
      category: "3D Simulation · IoT & Smart Cities",
      summary:
        "Interactive 3D urban digital twin simulating real-time smart city dynamics, traffic bottlenecks, environmental microclimates, and municipal infrastructure telemetry.",
      focus:
        "Three.js, WebGL, React, Node.js, Python, Predictive AI, Real-Time Sensor Telemetry.",
      bullets: [
        "Interactive 3D cityscape spatial rendering with sensor telemetry overlays and dynamic camera controls.",
        "Predictive AI modules analyzing traffic bottlenecks and microclimate temperature variance in real time.",
        "High-throughput event-driven data ingestion pipeline simulating hundreds of concurrent municipal IoT sensors.",
      ],
      metrics: [
        { value: "Three.js", label: "3D WebGL engine" },
        { value: "Real-Time", label: "IoT sensor telemetry" },
        { value: "Predictive", label: "AI traffic modeling" },
        { value: "60 FPS", label: "Smooth rendering" },
      ],
    },
    {
      title: "NK IMPEX E-Commerce",
      category: "Full-Stack · Conversational AI",
      summary:
        "Live production e-commerce platform integrated with an intelligent conversational AI shopping assistant that guides buyers through personalized product recommendations and checkout.",
      focus:
        "Next.js, Node.js, MongoDB, NLP Assistant, Stripe API, Dynamic Filtering, Tailwind CSS.",
      bullets: [
        "Intelligent conversational shopping assistant providing context-aware recommendations and instant product Q&A.",
        "High-performance catalog search with multi-attribute faceted filtering and real-time inventory synchronization.",
        "End-to-end checkout workflow with secure payments, order state management, and automated notifications.",
      ],
      metrics: [
        { value: "Live", label: "Production platform" },
        { value: "AI Assistant", label: "Conversational NLP" },
        { value: "MongoDB", label: "Dynamic catalog" },
        { value: "Stripe", label: "Secure checkout" },
      ],
    },
    {
      title: "AI Fitness Tracker",
      category: "Computer Vision · 1st Place Hackathon",
      summary:
        "Real-time computer vision fitness tracking application that analyzes exercise biomechanics, detects posture deviations, and counts repetitions automatically with zero wearable hardware.",
      focus:
        "Python, MediaPipe, OpenCV, React, Tailwind CSS, Real-Time Inference, Biomechanical Analysis.",
      bullets: [
        "Awarded 1st Place at KC College Hackathon 2026 for breakthrough real-time computer vision health innovation.",
        "Real-time skeletal landmark tracking calculating joint angles and adherence to biomechanical form standards.",
        "Instant visual and audio feedback loop alerting users to postural misalignment during solo workouts.",
      ],
      metrics: [
        { value: "1st Place", label: "KC College Hackathon" },
        { value: "MediaPipe", label: "Pose landmark model" },
        { value: "Real-Time", label: "Auto rep counting" },
        { value: "< 50ms", label: "Inference latency" },
      ],
    },
    {
      title: "2D Metaverse Workspace",
      category: "Multiplayer · Real-Time Systems",
      summary:
        "Multiplayer 2D virtual workspace bringing spatial presence, avatar movement, and spontaneous proximity-based collaboration to distributed engineering teams.",
      focus:
        "Phaser 3, React, Node.js, WebSockets, Colyseus, Spatial Presence, Interactive Audio.",
      bullets: [
        "2D game physics engine powered by Phaser 3 embedded seamlessly into a modular React application shell.",
        "Low-latency authoritative WebSocket state synchronization for fluid multiplayer avatar movement.",
        "Proximity-triggered collaboration zones enabling spontaneous team communication and screen sharing.",
      ],
      metrics: [
        { value: "Phaser 3", label: "2D physics engine" },
        { value: "WebSockets", label: "Multiplayer sync" },
        { value: "Spatial", label: "Proximity audio/chat" },
        { value: "< 35ms", label: "Sync roundtrip" },
      ],
    },
  ] as Highlight[],
  education: [
    "Master of Computer Applications (MCA) — University of Mumbai (2025–2028, Currently Pursuing)",
    "B.Sc. in Information Technology — University of Mumbai (Graduated)",
  ],
  certifications: [
    "Computer Science & Web Programming — HarvardX / edX",
    "Machine Learning & Deep Learning Specialization — DeepLearning.AI",
    "Python for Data Science & AI — IBM",
    "Front-End & Back-End Developer Professional Certificate — Meta",
  ],
  research: {
    title: "Triple Hackathon Champion (3× 1st Place)",
    publication:
      "Jai Hind College (Aetherscan) · KC College (AI Fitness Tracker) · Kirti College (The Medium)",
    href: "https://github.com/salmaaaaannn",
  },
  toolLabels: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "Docker",
    "PyTorch",
    "Tailwind",
  ],
  loaderLabels: [
    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "MCA Student",
    "Hackathon Winner",
  ],
  closingStatement:
    "Engineering modern full-stack systems, practical AI/ML architectures, and immersive interactive web experiences.",
};
