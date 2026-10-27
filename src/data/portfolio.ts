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
  filterTag: "ai-ml" | "fullstack" | "hackathon";
  summary: string;
  problem: string;
  solution: string;
  focus: string;
  techList: string[];
  bullets: string[];
  metrics: HighlightMetric[];
  projectUrl?: string;
  image: string;
  award?: string;
};

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "aiml"
  | "problem-solving"
  | "tools-api";

export type SkillItem = {
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  description: string;
  iconKey: string;
  status?: string;
};

export const portfolioData = {
  meta: {
    initials: "SK",
    name: "Salman Khan",
    title: "Senior Full-Stack & AI Engineer",
    subtitle: "Full-Stack Software Architect | Applied AI Specialist",
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
    greeting: "HI, I'M",
    firstName: "SALMAN",
    lastName: "KHAN",
    lead: "FULL-STACK DEVELOPER &",
    accentPrimary: "AI / ML",
    accentSecondary: "SOFTWARE",
    basePrimary: "ENTHUSIAST",
    baseSecondary: "ENGINEER",
  },
  stats: [
    {
      val: "3×",
      label: "1st Place Hackathon Champion",
      detail: "Jai Hind · KC College · Kirti College",
    },
    {
      val: "35+",
      label: "Open Source Repositories",
      detail: "Full-Stack & Python AI/ML Builds",
    },
    {
      val: "100%",
      label: "Type-Safe & Scalable Systems",
      detail: "React, Next.js, Node & FastAPI",
    },
  ],
  aboutGreeting: "Hey, I'm Salman Khan 👋",
  aboutParagraphs: [
    "I'm an MCA student and developer who enjoys turning ideas into real, useful digital experiences. I work across full-stack development and AI/ML, building everything from interactive web applications and real-time multiplayer environments to AI-powered platforms.",
    "What I enjoy most is the process of taking a problem, exploring different ways to solve it, and building something that actually works. I'm always curious about how things work behind the scenes, whether it's creating a smooth user experience, designing a scalable backend, or experimenting with AI to make applications smarter.",
    "I've worked on projects in healthcare, e-commerce, fitness, and virtual environments, and I've had the opportunity to showcase my work through college hackathons, where I achieved first-place finishes in three competitions.",
    "I'm constantly learning, experimenting with new technologies, and pushing myself to build better things. For me, development isn't just about writing code—it's about solving problems, learning through building, and creating experiences that people genuinely find useful.",
  ],
  about:
    "Hey, I'm Salman Khan 👋 I'm an MCA student and developer who enjoys turning ideas into real, useful digital experiences. I work across full-stack development and AI/ML, building everything from interactive web applications and real-time multiplayer environments to AI-powered platforms.",
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
      role: "Software Engineer",
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
      title: "2D Metaverse Workspace",
      category: "Multiplayer · Real-Time Systems",
      filterTag: "fullstack",
      summary:
        "Multiplayer 2D virtual workspace bringing spatial presence, avatar movement, and spontaneous proximity-based collaboration to distributed engineering teams.",
      problem:
        "Remote engineering teams suffer from collaboration fatigue and conversational friction due to isolated video calls and static Slack threads that eliminate spontaneous hallway discussions.",
      solution:
        "Engineered an interactive 2D spatial canvas with Phaser 3, React, and WebSocket state synchronization, providing directional proximity voice/chat zones and fluid avatar movement with sub-35ms roundtrips.",
      focus:
        "Phaser 3, React, Node.js, WebSockets, Colyseus, Spatial Presence, Interactive Audio.",
      techList: [
        "Phaser 3",
        "WebSockets",
        "React",
        "Node.js",
        "Colyseus",
        "Spatial Audio",
      ],
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
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/bond.png",
    },
    {
      title: "NURA-AI Platform",
      category: "AI/ML · Healthcare Screening",
      filterTag: "ai-ml",
      summary:
        "Automated clinical screening web platform combining a Next.js frontend, asynchronous FastAPI microservices, and Tesseract OCR for digitized lab report parsing and biomarker risk evaluation.",
      problem:
        "Clinical diagnostic lab reports are predominantly issued as unstructured physical paperwork or scanned PDFs, resulting in manual data entry delays and delayed critical biomarker anomaly detection.",
      solution:
        "Built an end-to-end clinical ingestion pipeline using Tesseract OCR for automated report extraction, connected to FastAPI async microservices and scikit-learn models for rapid biomarker risk grading under 1 second.",
      focus:
        "Next.js, FastAPI, Python, Tesseract OCR, scikit-learn, Biomarker Risk Modeling, Asynchronous APIs.",
      techList: [
        "Next.js",
        "FastAPI",
        "Python",
        "Tesseract OCR",
        "scikit-learn",
        "TypeScript",
        "Tailwind CSS",
      ],
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
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/preview1.png",
    },
    {
      title: "MetaCity Digital Twin",
      category: "3D Simulation · IoT & Smart Cities",
      filterTag: "ai-ml",
      summary:
        "Interactive 3D urban digital twin simulating real-time smart city dynamics, traffic bottlenecks, environmental microclimates, and municipal infrastructure telemetry.",
      problem:
        "Urban planning departments and traffic controllers lack unified, interactive 3D spatial platforms to visualize multi-sensor IoT telemetry and predict congestion bottlenecks prior to citywide gridlocks.",
      solution:
        "Developed a 60 FPS Three.js and WebGL interactive 3D spatial cityscape with React, streaming real-time sensor streams and running predictive AI models to calculate traffic dispersion in real time.",
      focus:
        "Three.js, WebGL, React, Node.js, Python, Predictive AI, Real-Time Sensor Telemetry.",
      techList: [
        "Three.js",
        "WebGL",
        "React",
        "Node.js",
        "Python",
        "Predictive AI",
        "IoT Telemetry",
      ],
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
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/sapphire.png",
    },
    {
      title: "NK IMPEX E-Commerce",
      category: "Full-Stack · Conversational AI",
      filterTag: "fullstack",
      summary:
        "Live production e-commerce platform integrated with an intelligent conversational AI shopping assistant that guides buyers through personalized product recommendations and checkout.",
      problem:
        "Online buyers in specialized industrial e-commerce encounter high search friction, complex multi-variant product specifications, and abandonment during manual browsing workflows.",
      solution:
        "Architected a Next.js full-stack storefront featuring an embedded conversational NLP agent, instant faceted MongoDB catalog search, and automated Stripe checkout flows with real-time stock sync.",
      focus:
        "Next.js, Node.js, MongoDB, NLP Assistant, Stripe API, Dynamic Filtering, Tailwind CSS.",
      techList: [
        "Next.js",
        "Node.js",
        "MongoDB",
        "Conversational NLP",
        "Stripe API",
        "Tailwind CSS",
      ],
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
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/radix.png",
    },
    {
      title: "AI Fitness Tracker",
      category: "Computer Vision · 1st Place Hackathon",
      filterTag: "hackathon",
      award: "1st Place · KC College Hackathon",
      summary:
        "Real-time computer vision fitness tracking application that analyzes exercise biomechanics, detects posture deviations, and counts repetitions automatically with zero wearable hardware.",
      problem:
        "Solo exercisers training at home have no access to biomechanical feedback, frequently performing exercises with incorrect spinal alignment and suffering repetitive stress injuries.",
      solution:
        "Implemented real-time 33-point skeletal landmark tracking via MediaPipe and OpenCV in Python with a React interface, computing joint angles under 50ms and providing live visual/auditory posture cues.",
      focus:
        "Python, MediaPipe, OpenCV, React, Tailwind CSS, Real-Time Inference, Biomechanical Analysis.",
      techList: [
        "MediaPipe",
        "OpenCV",
        "Python",
        "React",
        "Pose Estimation",
        "Tailwind CSS",
      ],
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
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/callhq.png",
    },
    {
      title: "Aetherscan Vulnerability Engine",
      category: "Web3 & Security · 1st Place Hackathon",
      filterTag: "hackathon",
      award: "1st Place · Jai Hind Hackathon",
      summary:
        "Automated smart contract security scanner engineered during a competitive hackathon sprint to detect reentrancy vulnerabilities, logic bugs, and bytecode gas inefficiencies.",
      problem:
        "Smart contract developers deploy code handling financial assets without accessible static analysis tooling, making vulnerabilities like reentrancy and integer overflows costly to audit manually.",
      solution:
        "Engineered an Abstract Syntax Tree (AST) static analysis scanner using Python and FastAPI, traversing bytecode graphs against OWASP security patterns with sub-2 second scan times.",
      focus:
        "Next.js, Python, AST Parsing, Solidity, FastAPI, Tailwind CSS, Static Analysis.",
      techList: [
        "Python",
        "FastAPI",
        "Solidity",
        "AST Parsing",
        "Next.js",
        "Security Scanning",
      ],
      bullets: [
        "Awarded 1st Place at Jai Hind College Hackathon 2026 for breakthrough automated smart contract analysis.",
        "Abstract syntax tree (AST) traversal engine flagging potential reentrancy vulnerabilities and gas inefficiencies.",
        "Interactive dashboard displaying vulnerability severity grading and line-by-line remediation code snippets.",
      ],
      metrics: [
        { value: "1st Place", label: "Jai Hind Hackathon" },
        { value: "AST Engine", label: "Static bytecode analysis" },
        { value: "< 2s", label: "Scan turnaround" },
        { value: "OWASP", label: "Smart contract rules" },
      ],
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/Solidx.png",
    },
    {
      title: "The Medium Platform",
      category: "NLP & Publishing · 1st Place Hackathon",
      filterTag: "hackathon",
      award: "1st Place · Kirti College Hackathon",
      summary:
        "Intelligent developer publishing platform with real-time NLP summarization, semantic concept tagging, and interactive in-browser code execution environments.",
      problem:
        "Engineering blogs and technical whitepapers are dense and time-consuming to consume, lacking interactive code validation and automated semantic executive summaries.",
      solution:
        "Engineered a full-stack publishing platform with React, Node.js, and Express featuring NLP automated executive summaries, Redis-backed sub-20ms reads, and an in-browser code execution sandbox.",
      focus:
        "React, Node.js, Express, NLP Pipelines, MongoDB, Redis, WebSockets.",
      techList: [
        "React",
        "Node.js",
        "Express",
        "NLP Summarizer",
        "MongoDB",
        "Redis Cache",
        "WebSockets",
      ],
      bullets: [
        "Awarded 1st Place at Kirti College Hackathon 2026 for next-generation developer publication platform.",
        "NLP-driven automated executive summaries and taxonomy tagging for complex technical engineering articles.",
        "Integrated in-browser code execution sandbox supporting interactive programming examples and execution.",
      ],
      metrics: [
        { value: "1st Place", label: "Kirti College Hackathon" },
        { value: "NLP", label: "Semantic taxonomy" },
        { value: "Sub-20ms", label: "Redis cache reads" },
        { value: "Real-Time", label: "WebSocket collaboration" },
      ],
      projectUrl: "https://github.com/salmaaaaannn",
      image: "/images/orrdr.png",
    },
  ] as Highlight[],
  engineeringSkills: [
    // Frontend
    {
      name: "React.js",
      category: "frontend",
      categoryLabel: "Frontend",
      description: "Component architecture, custom hooks, and reactive state management.",
      iconKey: "SiReact",
      status: "Core Stack",
    },
    {
      name: "Next.js",
      category: "frontend",
      categoryLabel: "Frontend",
      description: "Server-side rendering, App Router, SSG, and full-stack API routes.",
      iconKey: "SiNextdotjs",
      status: "Production",
    },
    {
      name: "TypeScript",
      category: "frontend",
      categoryLabel: "Frontend",
      description: "Strict static typing, generic interfaces, and robust enterprise code.",
      iconKey: "SiTypescript",
      status: "Core Stack",
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      categoryLabel: "Frontend",
      description: "Utility-first responsive layouts, custom design tokens, and fluid styling.",
      iconKey: "SiTailwindcss",
      status: "Active Stack",
    },
    {
      name: "Three.js",
      category: "frontend",
      categoryLabel: "Frontend",
      description: "3D scene graphs, custom WebGL shaders, camera animation, and lighting.",
      iconKey: "SiThreedotjs",
      status: "Interactive 3D",
    },

    // Backend
    {
      name: "Node.js",
      category: "backend",
      categoryLabel: "Backend",
      description: "Asynchronous runtime for concurrent microservices and API gateways.",
      iconKey: "SiNodedotjs",
      status: "Core Stack",
    },
    {
      name: "FastAPI",
      category: "backend",
      categoryLabel: "Backend",
      description: "High-performance Python async microservices with Pydantic validation.",
      iconKey: "SiFastapi",
      status: "Internship Verified",
    },
    {
      name: "Express.js",
      category: "backend",
      categoryLabel: "Backend",
      description: "RESTful endpoints, middleware chains, and token authentication.",
      iconKey: "SiExpress",
      status: "Active Stack",
    },
    {
      name: "WebSockets",
      category: "backend",
      categoryLabel: "Backend",
      description: "Low-latency bidirectional streaming for multiplayer and telemetry.",
      iconKey: "SiSocketdotio",
      status: "Production",
    },
    {
      name: "ASP.NET",
      category: "backend",
      categoryLabel: "Backend",
      description: "Enterprise C# backend architectures and structured web controllers.",
      iconKey: "SiDotnet",
      status: "Academic",
    },

    // Database
    {
      name: "MongoDB",
      category: "database",
      categoryLabel: "Database",
      description: "Flexible document schemas, aggregation pipelines, and indexing.",
      iconKey: "SiMongodb",
      status: "Active Stack",
    },
    {
      name: "PostgreSQL",
      category: "database",
      categoryLabel: "Database",
      description: "Relational data modeling, foreign keys, and ACID transactions.",
      iconKey: "SiPostgresql",
      status: "Core Stack",
    },
    {
      name: "MySQL",
      category: "database",
      categoryLabel: "Database",
      description: "Structured query optimization, normalized schemas, and joins.",
      iconKey: "SiMysql",
      status: "Internship Verified",
    },
    {
      name: "Redis",
      category: "database",
      categoryLabel: "Database",
      description: "In-memory caching, pub/sub channels, and sub-millisecond lookups.",
      iconKey: "SiRedis",
      status: "Production",
    },
    {
      name: "Prisma",
      category: "database",
      categoryLabel: "Database",
      description: "Type-safe ORM with automated migrations and client generation.",
      iconKey: "SiPrisma",
      status: "Active Stack",
    },

    // AI / ML
    {
      name: "Python",
      category: "aiml",
      categoryLabel: "AI / ML",
      description: "Primary language for data science, vision models, and AI pipelines.",
      iconKey: "SiPython",
      status: "Core Stack",
    },
    {
      name: "MediaPipe & OpenCV",
      category: "aiml",
      categoryLabel: "AI / ML",
      description: "Real-time 33-point skeletal pose estimation and computer vision.",
      iconKey: "SiOpencv",
      status: "1st Place Winner",
    },
    {
      name: "Tesseract OCR",
      category: "aiml",
      categoryLabel: "AI / ML",
      description: "Automated document text extraction and lab report parsing.",
      iconKey: "SiPython",
      status: "Internship Verified",
    },
    {
      name: "PyTorch",
      category: "aiml",
      categoryLabel: "AI / ML",
      description: "Neural network modeling, tensor manipulation, and deep learning.",
      iconKey: "SiPytorch",
      status: "Certified",
    },
    {
      name: "scikit-learn",
      category: "aiml",
      categoryLabel: "AI / ML",
      description: "Statistical modeling, classification, and biomarker risk analysis.",
      iconKey: "SiScikitlearn",
      status: "Internship Verified",
    },
    {
      name: "TensorFlow",
      category: "aiml",
      categoryLabel: "AI / ML",
      description: "Computational graphs, model training, and inference pipelines.",
      iconKey: "SiTensorflow",
      status: "Specialization",
    },

    // Programming & Problem Solving
    {
      name: "Data Structures & Algorithms",
      category: "problem-solving",
      categoryLabel: "Programming & Problem Solving",
      description: "Algorithmic optimization, tree/graph traversal, and space-time complexity.",
      iconKey: "MdAccountTree",
      status: "Core Foundation",
    },
    {
      name: "C / C++",
      category: "problem-solving",
      categoryLabel: "Programming & Problem Solving",
      description: "Memory management, pointer manipulation, and foundational algorithms.",
      iconKey: "SiCplusplus",
      status: "Core Foundation",
    },
    {
      name: "Java & OOP",
      category: "problem-solving",
      categoryLabel: "Programming & Problem Solving",
      description: "Object-oriented design patterns, encapsulation, and class hierarchies.",
      iconKey: "FaJava",
      status: "Academic",
    },

    // Tools & APIs
    {
      name: "Git & GitHub",
      category: "tools-api",
      categoryLabel: "Tools & APIs",
      description: "Version control, feature branching, code review, and 35+ repos.",
      iconKey: "SiGit",
      status: "Active Stack",
    },
    {
      name: "Docker",
      category: "tools-api",
      categoryLabel: "Tools & APIs",
      description: "Containerization, multi-stage Dockerfiles, and reproducible envs.",
      iconKey: "SiDocker",
      status: "DevOps",
    },
    {
      name: "Postman",
      category: "tools-api",
      categoryLabel: "Tools & APIs",
      description: "Automated API contract testing, endpoint mocking, and collection runners.",
      iconKey: "SiPostman",
      status: "Testing",
    },
    {
      name: "Nginx",
      category: "tools-api",
      categoryLabel: "Tools & APIs",
      description: "Reverse proxying, SSL termination, and static asset delivery.",
      iconKey: "SiNginx",
      status: "DevOps",
    },
    {
      name: "Stripe API",
      category: "tools-api",
      categoryLabel: "Tools & APIs",
      description: "Secure payment gateway integration and webhook event handling.",
      iconKey: "SiStripe",
      status: "Production",
    },
  ] as SkillItem[],
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
