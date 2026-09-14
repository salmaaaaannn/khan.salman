export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  featured?: boolean;
  pipeline?: {
    step: number;
    name: string;
    description: string;
    icon: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
}

export interface TechItem {
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "AI / ML"
    | "Programming & Problem Solving"
    | "Tools & APIs";
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  status: "Graduated" | "Pursuing";
  expectedCompletion?: string;
  current?: boolean;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Salman Khan",
    initials: "SK",
    role: "Full-Stack Developer | AI/ML Developer",
    location: "Mumbai, India",
    headline: "Building modern full-stack applications and intelligent software solutions.",
    subheadline:
      "Full-stack developer focused on building scalable web applications, AI-powered products, real-time systems, and practical developer solutions.",
    email: "salmanmuslimkhan@gmail.com",
    phone: "+91 8928359076",
    github: "https://github.com/salmankhan",
    linkedin: "https://linkedin.com/in/salmankhan",
    terminal: {
      user: "salman",
      host: "portfolio",
      whoami: "Salman Khan",
      role: "Full-Stack Developer\nAI/ML Developer",
      stack: "React • Next.js • Node • Python\nFastAPI • MongoDB • MySQL",
      status: "Building intelligent systems",
    },
  },

  about: {
    whoIAm:
      "A full-stack developer with experience building web applications, real-time systems, AI-powered platforms, and practical software solutions.",
    whatIBuild: [
      "Full-stack web applications",
      "AI-powered applications",
      "Real-time multiplayer & collaborative systems",
      "Data-driven dashboards & analytics",
      "API-driven architectures & microservices",
    ],
    currentFocus: "Modern full-stack development + AI/ML integration.",
    corePrinciples: [
      { label: "Architecture", value: "Modular, scalable, and decoupled micro/monolith patterns" },
      { label: "Engineering", value: "Type-safe, testable, and maintainable TypeScript & Python" },
      { label: "AI Integration", value: "Purpose-driven models embedded cleanly into production APIs" },
      { label: "User Experience", value: "Responsive, accessible, sub-second latency interfaces" },
    ],
  },

  bentoCards: [
    {
      id: "role",
      title: "Current Role",
      value: "Full-Stack Developer / AI-ML Developer",
      tagline: "Architecture & Integration",
      detail:
        "Building end-to-end web applications paired with high-performance APIs and practical machine learning capabilities.",
      accent: "teal",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "stack",
      title: "Primary Stack",
      value: "React + Next.js + Node.js + Python",
      tagline: "Full-Stack Ecosystem",
      detail:
        "Component-driven React/Next.js frontends connected to resilient Node.js and Python microservices.",
      accent: "teal",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "ai",
      title: "AI Focus",
      value: "Machine Learning + AI-Powered Apps",
      tagline: "Applied Intelligence",
      detail:
        "Document OCR extraction, predictive health screening, and computer vision classification pipelines.",
      accent: "teal",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "backend",
      title: "Backend Engine",
      value: "Node.js + Express.js + FastAPI",
      tagline: "Asynchronous APIs",
      detail:
        "Designing high-throughput RESTful endpoints, request validation schemas, and real-time socket connections.",
      accent: "teal",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "database",
      title: "Data Persistence",
      value: "MongoDB + MySQL",
      tagline: "Polyglot Storage",
      detail:
        "Flexible document schemas in MongoDB coupled with relational integrity and transactional consistency in MySQL.",
      accent: "teal",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      id: "achievement",
      title: "Recognition",
      value: "3× Hackathon Winner",
      tagline: "Rapid Prototyping",
      detail:
        "Proven record of architecting, implementing, and delivering competitive solutions within 24-48 hour hackathons.",
      accent: "teal",
      colSpan: "col-span-12 md:col-span-12 lg:col-span-4",
    },
  ],

  featuredProject: {
    id: "nura-ai",
    title: "NURA AI",
    subtitle: "AI-Assisted Healthcare Screening Platform",
    description:
      "An AI-assisted healthcare screening web platform built using Next.js and FastAPI, with OCR/document extraction using Tesseract and AI/ML capabilities for healthcare screening and insights.",
    problem:
      "Clinical paperwork and patient reports require tedious manual transcription and delayed biomarker analysis, slowing triage in screening workflows.",
    solution:
      "An automated end-to-end clinical screening pipeline combining Next.js interactive UI, FastAPI asynchronous services, Tesseract OCR for document digitization, and AI/ML risk screening modules.",
    technologies: ["Next.js", "FastAPI", "Python", "Tesseract", "AI/ML"],
    featured: true,
    accentColor: "teal",
    pipeline: [
      {
        step: 1,
        name: "Healthcare Input",
        description: "Patient diagnostic panel & medical report upload via web interface",
        icon: "FileText",
      },
      {
        step: 2,
        name: "OCR",
        description: "High-precision text & numerical lab data extraction using Tesseract OCR",
        icon: "Scan",
      },
      {
        step: 3,
        name: "AI Processing",
        description: "FastAPI schema validation, clinical sanity checks, and feature normalization",
        icon: "ShieldCheck",
      },
      {
        step: 4,
        name: "Screening",
        description: "Machine Learning screening models evaluating biomarker health risk indicators",
        icon: "BrainCircuit",
      },
      {
        step: 5,
        name: "Insights",
        description: "Actionable summary reports, risk categorization, and doctor referral guidance",
        icon: "Activity",
      },
    ],
    githubUrl: "https://github.com/salmankhan/nura-ai",
    liveUrl: "#",
  } as Project,

  projects: [
    {
      id: "metaverse-2d",
      title: "METAVERSE 2D",
      subtitle: "Real-Time 2D Virtual Workspace",
      description:
        "A 2D virtual workspace built using Phaser, React, and Node.js with real-time player presence and movement.",
      problem:
        "Remote team environments often lack spatial presence and spontaneous interactions found in physical offices.",
      solution:
        "Engineered a multiplayer virtual environment utilizing Phaser game physics, Colyseus/WebSocket real-time state synchronization, and React UI overlays for low-latency player presence.",
      technologies: ["Phaser", "React", "Node.js", "Colyseus", "WebSockets"],
      accentColor: "teal",
      githubUrl: "https://github.com/salmankhan/metaverse-2d",
      liveUrl: "#",
    },
    {
      id: "ai-event-management",
      title: "AI EVENT MANAGEMENT SYSTEM",
      subtitle: "Intelligent Event Discovery & Operations",
      description:
        "An AI-assisted event management platform featuring Python/AI components, a responsive dashboard interface, and intelligent event discovery and recommendation functionality.",
      problem:
        "Event attendees struggle to find relevant technical sessions, while coordinators face challenges matching attendee interests and resource allocation.",
      solution:
        "Integrated AI recommendation algorithms to match attendee profiles with event tracks, coupled with a responsive administration dashboard for scheduling and attendee analytics.",
      technologies: ["Python", "FastAPI", "React", "Machine Learning", "MySQL"],
      accentColor: "teal",
      githubUrl: "https://github.com/salmankhan/ai-event-management",
      liveUrl: "#",
    },
    {
      id: "ai-fitness-tracker",
      title: "AI FITNESS TRACKER",
      subtitle: "Computer Vision & Personalized Health Analytics",
      description:
        "An AI/ML fitness tracking application combining computer vision pose analysis, fitness tracking, personalized health insights, and a modern web interface.",
      problem:
        "Solo workout training lacks form correction and automated repetition counting, leading to improper biomechanics.",
      solution:
        "Implemented real-time computer vision pose landmark detection to track form accuracy, count repetitions, and present personalized performance metrics on an intuitive dashboard.",
      technologies: ["AI/ML", "Computer Vision", "Python", "React", "Tailwind CSS"],
      accentColor: "teal",
      githubUrl: "https://github.com/salmankhan/ai-fitness-tracker",
      liveUrl: "#",
    },
    {
      id: "athers",
      title: "ATHERS",
      subtitle: "Full-Stack Web Application",
      description:
        "A full-stack application architected with React, Node.js, Express, and MongoDB, delivering robust API endpoints, structured data models, and an intuitive user interface.",
      problem:
        "Modern applications require scalable state management, authenticated transactions, and reliable database schema persistence.",
      solution:
        "Engineered a resilient full-stack architecture featuring RESTful API controllers, MongoDB persistence, token-based authentication, and a responsive frontend interface.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      accentColor: "teal",
      githubUrl: "https://github.com/salmankhan/eathers",
      liveUrl: "#",
    },
  ] as Project[],

  techStack: [
    // Frontend
    { name: "React", category: "Frontend", description: "Component-driven frontend architecture & reactive UI state", iconName: "Atom" },
    { name: "Next.js", category: "Frontend", description: "Server-side rendering, App Router, and static site generation", iconName: "Globe" },
    { name: "TypeScript", category: "Frontend", description: "Type-safe application engineering with strict compile-time checks", iconName: "Binary" },
    { name: "Tailwind CSS", category: "Frontend", description: "Utility-first modern design systems and fluid responsiveness", iconName: "Sparkles" },

    // Backend
    { name: "FastAPI", category: "Backend", description: "High-performance asynchronous Python web APIs with OpenAPI validation", iconName: "Zap" },
    { name: "Node.js", category: "Backend", description: "Event-driven asynchronous server-side runtime for scalable services", iconName: "Server" },
    { name: "Express.js", category: "Backend", description: "Minimalist server framework for RESTful routing & middleware", iconName: "Layers" },
    { name: "Python", category: "Backend", description: "Versatile backend programming and machine learning workflows", iconName: "Terminal" },

    // Database
    { name: "MongoDB", category: "Database", description: "NoSQL document persistence, aggregation pipelines, and collections", iconName: "Database" },
    { name: "MySQL", category: "Database", description: "Relational database schema design and SQL query optimization", iconName: "HardDrive" },

    // AI / ML
    { name: "Machine Learning", category: "AI / ML", description: "AI-powered application development and inference pipelines", iconName: "BrainCircuit" },
    { name: "Supervised Learning", category: "AI / ML", description: "Regression and classification modeling on tabular & clinical data", iconName: "TrendingUp" },
    { name: "Unsupervised Learning", category: "AI / ML", description: "Clustering, dimensionality reduction, and pattern discovery", iconName: "Network" },
    { name: "Computer Vision", category: "AI / ML", description: "Image preprocessing, landmark detection, and OCR document parsing", iconName: "Eye" },
    { name: "Python AI/ML Ecosystem", category: "AI / ML", description: "NumPy, Pandas, Scikit-Learn data science environment", iconName: "Cpu" },

    // Programming & Problem Solving
    { name: "Data Structures & Algorithms", category: "Programming & Problem Solving", description: "Algorithmic optimization, time/space complexity analysis", iconName: "Binary" },
    { name: "TypeScript", category: "Programming & Problem Solving", description: "Strict static typing and enterprise OOP/FP paradigms", iconName: "FileCode" },
    { name: "Python", category: "Programming & Problem Solving", description: "Data structures, scripting, and algorithmic problem solving", iconName: "Terminal" },
    { name: "JavaScript", category: "Programming & Problem Solving", description: "Modern ES6+ asynchronous web scripting & event loop", iconName: "Code" },

    // Tools & APIs
    { name: "REST APIs", category: "Tools & APIs", description: "RESTful resource design, HTTP semantics, and contract validation", iconName: "Share2" },
    { name: "Git", category: "Tools & APIs", description: "Distributed version control, branch workflows, and Git management", iconName: "GitBranch" },
    { name: "VS Code", category: "Tools & APIs", description: "Primary IDE configuration, debugging, and productivity workflows", iconName: "Code" },
    { name: "Postman", category: "Tools & APIs", description: "API endpoint testing, mocking, and automated assertions", iconName: "Send" },
    { name: "Figma", category: "Tools & APIs", description: "UI/UX wireframing, component tokens, and layout prototyping", iconName: "Figma" },
  ] as TechItem[],

  experience: [
    {
      role: "Software Developer",
      company: "Technology Services & Solutions",
      location: "Mumbai, India",
      period: "Present",
      responsibilities: [
        "Architecting and building full-stack web applications using React, Next.js, Node.js, and FastAPI.",
        "Developing scalable backend REST APIs, designing schema structures across MongoDB and MySQL, and integrating real-time communication modules.",
        "Engineering AI/ML-assisted features including OCR document extraction pipelines and intelligent screening algorithms.",
        "Ensuring code quality, implementing type-safe TypeScript interfaces, and optimizing client-side performance.",
      ],
      technologies: ["React", "Next.js", "Node.js", "FastAPI", "Python", "MongoDB", "MySQL", "TypeScript"],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "University of Mumbai",
      location: "Mumbai, India",
      status: "Pursuing",
      expectedCompletion: "2028",
      current: true,
    },
    {
      degree: "B.Sc. Information Technology (B.Sc.IT)",
      institution: "University of Mumbai",
      location: "Mumbai, India",
      status: "Graduated",
      current: false,
    },
  ] as EducationItem[],

  certifications: [
    {
      name: "Full-Stack Web Development & Machine Learning",
      provider: "Professional Technical Certification",
      date: "Verified",
    },
  ],

  achievements: [
    {
      title: "Three-time Hackathon Winner",
      badge: "3× Champion",
      description:
        "Recognized for architecting and executing high-impact full-stack and AI-driven solutions under competitive hackathon conditions, translating complex problem statements into functional MVPs within tight deadlines.",
      metrics: "3 Victories across Competitive Hackathons",
    },
  ],
};
