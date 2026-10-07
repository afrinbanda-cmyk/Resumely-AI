export const resumeTemplates = [
  {
    id: "modern",
    name: "Modern",
    tagline: "Clean, contemporary design with subtle accent borders and crisp typography.",
    category: "Most Popular",
    bestFor: "Software engineers, tech leads, tech roles & startups",
    accent: "#E39A7B", // Terracotta
    previewBg: "from-[#FFF4ED] to-[#FAF7F2] dark:from-[#261E1A] dark:to-[#1C1714]",
    font: "sans",
    headerStyle: "accent-bar",
    features: ["Balanced 2-column or unified layout", "Skill tags with pill styling", "Metrics highlights"],
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Ultra-clean Scandinavian whitespace with focused editorial elegance.",
    category: "ATS Optimized",
    bestFor: "Designers, writers, researchers & product managers",
    accent: "#231B15",
    previewBg: "from-[#F9F6F0] to-[#F3EDE2] dark:from-[#221D19] dark:to-[#171310]",
    font: "sans",
    headerStyle: "minimalist",
    features: ["Distraction-free layout", "Generous whitespace", "Highest machine readability"],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Classic corporate elegance with refined serif headings and formal section dividers.",
    category: "Corporate",
    bestFor: "Finance, consulting, healthcare, legal & traditional corporate",
    accent: "#DBB06B", // Warm gold
    previewBg: "from-[#FAF6EE] to-[#F5ECE0] dark:from-[#26211A] dark:to-[#1B1612]",
    font: "serif",
    headerStyle: "classic-center",
    features: ["Serif typography hierarchy", "Formal section borders", "Authoritative structure"],
  },
  {
    id: "developer",
    name: "Developer",
    tagline: "Code-inspired layout with tech tags, monospaced accents, and GitHub highlights.",
    category: "Technical",
    bestFor: "Full-stack devs, DevOps, backend engineers & data scientists",
    accent: "#E39A7B",
    previewBg: "from-[#FFF5ED] to-[#F8F1E7] dark:from-[#281F19] dark:to-[#1A1410]",
    font: "mono",
    headerStyle: "code-header",
    features: ["Terminal-inspired badges", "Live repository links", "Tech stack breakdown"],
  },
  {
    id: "creative",
    name: "Creative",
    tagline: "Warm terracotta sidebar accent, personality-forward typography, and portfolio showcase.",
    category: "Creative",
    bestFor: "UI/UX designers, marketing leads, creative directors & architects",
    accent: "#FFB5AB", // Soft pink
    previewBg: "from-[#FFF1EE] to-[#FBE7E3] dark:from-[#2A1D1A] dark:to-[#1C1412]",
    font: "sans",
    headerStyle: "split-sidebar",
    features: ["Distinctive colored sidebar", "Visual skill gauges", "Portfolio project cards"],
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "Prestigious dual-tone leadership format featuring warm gold accents and executive summary.",
    category: "Leadership",
    bestFor: "VPs, Directors, C-level executives & senior managers",
    accent: "#DBB06B",
    previewBg: "from-[#FCF8EE] to-[#F6EDE0] dark:from-[#292218] dark:to-[#1C1710]",
    font: "serif",
    headerStyle: "executive-banner",
    features: ["Executive core competencies grid", "Career trajectory highlights", "Prestigious gold trim"],
  },
];

export const colorPalette = [
  { name: "Terracotta", value: "#E39A7B", desc: "Signature warm brand accent" },
  { name: "Warm Gold", value: "#DBB06B", desc: "Premium executive tone" },
  { name: "Peach Glow", value: "#FFD3AC", desc: "Soft subtle warmth" },
  { name: "Rose Pink", value: "#FFB5AB", desc: "Modern creative highlight" },
  { name: "Charcoal Dark", value: "#2B241F", desc: "Classic high contrast" },
  { name: "Sienna Amber", value: "#C87D55", desc: "Deep earthy warm accent" },
];

export const fontFamilies = [
  { id: "sans", name: "Modern Sans", fontClass: "font-sans", sample: "Inter / Clean & Modern" },
  { id: "serif", name: "Classic Serif", fontClass: "font-serif", sample: "Merriweather / Elegant & Trustworthy" },
  { id: "mono", name: "Technical Mono", fontClass: "font-mono", sample: "JetBrains / Engineering & Code" },
];
