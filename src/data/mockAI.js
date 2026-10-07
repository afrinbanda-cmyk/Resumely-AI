export const mockAISuggestions = {
  summary: [
    {
      id: "sum-1",
      title: "Impact-Driven Executive Tone",
      content:
        "Results-oriented Senior Software Engineer with 4+ years of expertise in architecting high-scale distributed systems and responsive React architectures. Spearheaded microservice and frontend modernizations serving 500,000+ active users while reducing latency by 45%. Recognized for driving developer velocity, cross-team design systems, and rigorous automated testing standards.",
      tag: "High ATS Impact",
      field: "summary",
    },
    {
      id: "sum-2",
      title: "Technical & Full-Stack Focused",
      content:
        "Full-Stack Software Engineer specializing in modern JavaScript/TypeScript, React, Node.js, and cloud containerization. Proven history of delivering high-throughput systems processing 12M+ daily events at 99.98% reliability. Adept at translating ambiguous business goals into resilient, modular software architecture.",
      tag: "Tech Alignment",
      field: "summary",
    },
    {
      id: "sum-3",
      title: "Growth & Startup Focused",
      content:
        "Product-minded Full-Stack Developer with hands-on experience in rapid prototyping and high-velocity shipping across Series A & enterprise SaaS platforms. Cut deployment cycles by 90% and elevated user retention by 34% by coupling cutting-edge UI engineering with robust PostgreSQL & Node backends.",
      tag: "Startup Velocity",
      field: "summary",
    },
  ],
  experience: [
    {
      id: "exp-fix-1",
      targetExpId: "exp-1",
      title: "Add Quantifiable Metrics to Nexus Labs",
      original: "Spearheaded the migration of the flagship enterprise dashboard from legacy Angular to React & Vite, reducing load times by 48%.",
      improved:
        "Spearheaded architectural migration from legacy Angular to React 19 & Vite for 500k+ MAU flagship platform; cut first contentful paint by 48% and slashed cloud compute overhead by $35,000 annually.",
      actionType: "experience_bullet",
    },
    {
      id: "exp-fix-2",
      targetExpId: "exp-2",
      title: "Quantify Latency & Scale for HyperCloud Systems",
      original: "Developed high-throughput Node.js microservices processing 12M+ daily transactions with 99.98% uptime.",
      improved:
        "Architected and deployed resilient event-driven Node.js & Redis microservices executing 12M+ daily financial transactions with 99.98% SLA and p99 latency under 45ms.",
      actionType: "experience_bullet",
    },
  ],
  bulletPoints: [
    "• Architected automated unit and end-to-end test suites achieving 94% code coverage, virtually eliminating regression incidents across 6 bi-weekly release cycles.",
    "• Mentored 5 junior engineers through bi-weekly 1:1 code reviews and technical deep dives, accelerating onboarding time by 3 weeks.",
    "• Spearheaded zero-downtime database migration for 4.2M customer records using zero-lock partitioning strategies.",
    "• Orchestrated Kubernetes cluster autoscaling policies that reduced off-peak cloud expenditures by 28%.",
  ],
  skillsSuggestions: [
    { name: "TypeScript", category: "Languages", reason: "Standard requirement in 88% of senior frontend roles" },
    { name: "Next.js (App Router)", category: "Frontend", reason: "High keyword frequency in modern React job postings" },
    { name: "Redis & Caching", category: "Databases", reason: "Pairs well with your high-throughput Node.js experience" },
    { name: "CI/CD (GitHub Actions)", category: "DevOps", reason: "Boosts automated delivery credentials for ATS screening" },
    { name: "GraphQL & Apollo", category: "Backend", reason: "Complements your RESTful API background" },
  ],
  atsKeywords: [
    { keyword: "Event-Driven Architecture", status: "missing", weight: "high" },
    { keyword: "Unit Testing (Vitest/Jest)", status: "found", weight: "high" },
    { keyword: "CI/CD Automation", status: "found", weight: "medium" },
    { keyword: "Agile / Scrum Sprint Leadership", status: "missing", weight: "medium" },
    { keyword: "Microservices Scalability", status: "found", weight: "high" },
  ],
};

export const mockAnalysisReport = {
  score: 87,
  scoreLabel: "Excellent — Ready to Apply",
  categories: [
    {
      name: "ATS Compatibility",
      score: 92,
      status: "Exceptional",
      details: "Standard fonts, clean headings, and high parsing fidelity across Greenhouse, Lever, and Workday.",
    },
    {
      name: "Content Quality",
      score: 86,
      status: "Strong",
      details: "Strong active action verbs ('Spearheaded', 'Architected', 'Engineered') with clear role scoping.",
    },
    {
      name: "Formatting & Structure",
      score: 90,
      status: "Excellent",
      details: "Proper reverse chronological sequencing, clear section demarcations, and consistent date formatting.",
    },
    {
      name: "Skills Alignment",
      score: 81,
      status: "Good",
      details: "Good core stack representation, but missing 2 trending high-demand technical keywords.",
    },
    {
      name: "Impact & Quantification",
      score: 85,
      status: "Very Strong",
      details: "7 out of 9 bullet points contain hard quantifiable metrics (percentages, transaction volumes, dollars).",
    },
  ],
  strengths: [
    {
      id: "str-1",
      title: "Strong Technical Skills Breadth",
      description: "Well-categorized frontend, backend, database, and cloud infrastructure technologies matching senior standards.",
    },
    {
      id: "str-2",
      title: "High Quantified Impact in Experience",
      description: "Bullet points effectively leverage percentages (48% reduction, 35% fewer bugs) and concrete numbers (12M+ txns).",
    },
    {
      id: "str-3",
      title: "Clean ATS-Friendly Hierarchy",
      description: "Standard section headers (Experience, Education, Skills) ensure 99% parsability by enterprise screening algorithms.",
    },
    {
      id: "str-4",
      title: "Professional Summary Focus",
      description: "Summary directly targets years of experience, core technical specialties, and primary business value delivered.",
    },
  ],
  improvements: [
    {
      id: "imp-1",
      title: "Add Measurable Achievements to Early Roles",
      category: "Impact",
      severity: "medium",
      description: "Your Junior Web Developer position lists tasks rather than measurable outcomes or business impact.",
      aiAction: "add_junior_metrics",
      suggestedFix: "• Engineered PostgreSQL schema migrations and query optimizations that improved DB response time by 28% and saved 15 dev-hours monthly.",
    },
    {
      id: "imp-2",
      title: "Enhance Professional Summary with Leadership Keywords",
      category: "Content Quality",
      severity: "high",
      description: "Elevate your summary from technical contributor to technical leader with phrases like 'cross-functional mentorship'.",
      aiAction: "apply_leadership_summary",
      suggestedFix: "Innovative Full-Stack Engineering Lead with 4+ years spearheading scalable architectures, mentoring junior talent, and cutting cloud latency by 45%.",
    },
    {
      id: "imp-3",
      title: "Add Role-Specific High-Demand Keywords",
      category: "Skills",
      severity: "medium",
      description: "Missing 'TypeScript' and 'Next.js App Router' which appear in over 75% of modern senior React job descriptions.",
      aiAction: "add_keywords",
      suggestedFix: "Add 'TypeScript', 'Next.js', and 'GraphQL' to your frontend and languages skills list.",
    },
  ],
};
