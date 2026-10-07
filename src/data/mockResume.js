// Initial mock resume data for Alex Johnson
export const initialResume = {
  id: "resume-default-01",
  title: "Software Developer Resume",
  template: "modern",
  accentColor: "#E39A7B", // Terracotta
  fontFamily: "sans", // sans, serif, mono
  spacing: "normal", // compact, normal, relaxed
  lastModified: new Date().toISOString(),
  score: 87,
  personalInfo: {
    fullName: "Alex Johnson",
    jobTitle: "Senior Full-Stack Developer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 382-9104",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    showPhoto: false,
  },
  summary:
    "Innovative Full-Stack Developer with 4+ years of experience engineering scalable web applications, RESTful microservices, and AI-assisted workflows. Proven track record of boosting user retention by 34% through responsive design and optimizing system latency by 45%. Passionate about clean code, modern frontend frameworks, and cloud architectures.",
  experience: [
    {
      id: "exp-1",
      jobTitle: "Senior Frontend Engineer",
      company: "Nexus Labs",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "",
      currentlyWorking: true,
      description:
        "• Spearheaded the migration of the flagship enterprise dashboard from legacy Angular to React & Vite, reducing load times by 48%.\n• Architected a unified design system adopted by 14 cross-functional product teams, slashing UI bug reports by 35%.\n• Integrated WebSocket streams and WebGL visualizations, enabling real-time metrics monitoring for over 500,000 active users.",
    },
    {
      id: "exp-2",
      jobTitle: "Full-Stack Software Engineer",
      company: "HyperCloud Systems",
      location: "Austin, TX",
      startDate: "2020-06",
      endDate: "2022-02",
      currentlyWorking: false,
      description:
        "• Developed high-throughput Node.js microservices processing 12M+ daily transactions with 99.98% uptime.\n• Implemented automated CI/CD pipelines on GitHub Actions, cutting release deployment cycles from 2 hours to 12 minutes.\n• Collaborated directly with UX designers to build accessible WCAG 2.1 AA compliant customer portals.",
    },
    {
      id: "exp-3",
      jobTitle: "Junior Web Developer",
      company: "CodeCraft Studios",
      location: "Remote",
      startDate: "2019-08",
      endDate: "2020-05",
      currentlyWorking: false,
      description:
        "• Built dynamic responsive web applications utilizing React, TypeScript, and Tailwind CSS for Series A startups.\n• Engineered PostgreSQL schema migrations and query optimizations that improved DB response time by 28%.",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "Dean's Honors List • Focus on Distributed Systems, Cloud Architecture, and Human-Computer Interaction.",
    },
  ],
  skills: [
    { id: "sk-1", name: "React / Next.js", level: "Expert", category: "Frontend" },
    { id: "sk-2", name: "JavaScript / TypeScript", level: "Expert", category: "Languages" },
    { id: "sk-3", name: "Tailwind CSS", level: "Expert", category: "Frontend" },
    { id: "sk-4", name: "Node.js / Express", level: "Advanced", category: "Backend" },
    { id: "sk-5", name: "PostgreSQL & MongoDB", level: "Advanced", category: "Databases" },
    { id: "sk-6", name: "Three.js / WebGL", level: "Intermediate", category: "Frontend" },
    { id: "sk-7", name: "Docker & Kubernetes", level: "Intermediate", category: "DevOps" },
    { id: "sk-8", name: "REST & GraphQL APIs", level: "Advanced", category: "Backend" },
    { id: "sk-9", name: "Git & CI/CD", level: "Advanced", category: "DevOps" },
    { id: "sk-10", name: "Jest / Vitest / Playwright", level: "Advanced", category: "Testing" },
  ],
  projects: [
    {
      id: "proj-1",
      name: "PulseAI – Intelligent Telemetry Monitor",
      technologies: "React, Node.js, WebSockets, Three.js, Redis",
      url: "https://pulseai.demo.app",
      github: "https://github.com/alexjohnson/pulseai",
      description:
        "Real-time Kubernetes monitoring suite with interactive 3D topology map and predictive anomaly detection. Adopted by 20+ open source teams.",
    },
    {
      id: "proj-2",
      name: "SwiftPay – Payment Gateway SDK",
      technologies: "TypeScript, Stripe API, Express, Tailwind",
      url: "https://swiftpay.dev",
      github: "https://github.com/alexjohnson/swiftpay",
      description:
        "Lightweight drop-in checkout component suite that reduced checkout abandonment by 18% in A/B testing across 5 e-commerce clients.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023-04",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta / Coursera",
      date: "2021-11",
      url: "",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place – Silicon Valley AI Hackathon 2023",
      description: "Built an autonomous document summarizer using vector embeddings in 48 hours among 180 teams.",
    },
  ],
  languages: [
    { id: "lang-1", language: "English", proficiency: "Native / Bilingual" },
    { id: "lang-2", language: "Spanish", proficiency: "Conversational" },
  ],
  interests: ["Generative UI", "Open Source Contributing", "Bouldering", "Espresso Brewing"],
  references: [
    {
      id: "ref-1",
      name: "Sarah Chen",
      role: "VP of Engineering at Nexus Labs",
      email: "sarah.chen@nexuslabs.example",
      phone: "+1 (555) 492-0193",
    },
  ],
  sectionVisibility: {
    personalInfo: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    achievements: true,
    languages: true,
    interests: true,
    references: false,
  },
};

// Initial list of saved resumes for My Resumes / Dashboard
export const initialSavedResumes = [
  {
    ...initialResume,
    id: "resume-default-01",
    title: "Software Developer Resume",
    template: "modern",
    score: 87,
    lastModified: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    ...initialResume,
    id: "resume-default-02",
    title: "Frontend Developer Resume",
    template: "developer",
    score: 91,
    accentColor: "#DBB06B", // Warm gold
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    ...initialResume,
    id: "resume-default-03",
    title: "Internship Resume",
    template: "minimal",
    score: 79,
    accentColor: "#FFB5AB", // Soft pink
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
  },
];
