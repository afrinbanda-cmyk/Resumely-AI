import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Zap,
  Palette,
  Eye,
  Download,
  BarChart3,
  ShieldCheck,
  Star,
  Quote,
  ChevronRight,
  Sliders,
  Check,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import HeroScene from '../components/three/HeroScene';
import ResumePreview from '../components/resume/ResumePreview';
import { initialResume } from '../data/mockResume';
import { resumeTemplates } from '../data/templates';
import Logo from '../components/common/Logo';

export default function Landing() {
  const navigate = useNavigate();

  const stats = [
    { value: '10K+', label: 'Resumes Created' },
    { value: '95%', label: 'ATS Screening Rate' },
    { value: '4.9/5', label: 'User Satisfaction Rating' },
    { value: '6+', label: 'Executive & Tech Templates' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Resume Assistant',
      description: 'Instant bullet rewrites, quantifiable metric suggestions, and grammar polishing tailored for senior recruiters.',
      color: '#E39A7B',
    },
    {
      icon: ShieldCheck,
      title: 'ATS Optimization',
      description: 'Tested against Greenhouse, Workday, and Lever algorithms so your credentials never get lost in automated filters.',
      color: '#DBB06B',
    },
    {
      icon: Palette,
      title: 'Professional Templates',
      description: '6 distinct, bespoke styles designed by senior recruiters and product designers—from Minimal to Developer.',
      color: '#FFB5AB',
    },
    {
      icon: Eye,
      title: 'Real-Time A4 Preview',
      description: 'Zero lag. Every keystroke updates a 1:1 true-to-print A4 document preview instantly right beside your editor.',
      color: '#E39A7B',
    },
    {
      icon: BarChart3,
      title: 'Instant Resume Score',
      description: 'Deep audit of your action verbs, measurable impact, tech keywords, and structural balance out of 100.',
      color: '#DBB06B',
    },
    {
      icon: Download,
      title: 'One-Click Vector PDF Export',
      description: 'High-resolution client-side PDF generation formatted for both physical printing and digital job applications.',
      color: '#FFD3AC',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Build',
      desc: 'Enter your experience, education, projects, and skills with structured forms and zero formatting friction.',
    },
    {
      num: '02',
      title: 'Improve',
      desc: 'Let our AI coach detect missing keywords, inject quantifiable metrics, and boost your resume score to 90+.',
    },
    {
      num: '03',
      title: 'Apply',
      desc: 'Download a clean, ATS-compliant PDF in one click and land interviews at top tech companies and startups.',
    },
  ];

  const testimonials = [
    {
      name: 'Maya Lin',
      role: 'Staff Frontend Engineer at Stripe',
      quote:
        'Resumely AI completely changed how I presented my accomplishments. The AI suggestions added hard numbers I had forgotten to include, and I landed 4 senior interviews in two weeks.',
      rating: 5,
    },
    {
      name: 'David O’Connor',
      role: 'Product Lead at Figma',
      quote:
        'The Developer template is by far the cleanest technical resume I have ever used. Recruiters specifically commented on the clarity of my stack and project breakdowns.',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Engineering Graduate at UC Berkeley',
      quote:
        'As a student competing with thousands of applicants, Resumely helped me format my internship and coursework so it actually passed Greenhouse screening filters.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] dark:bg-[#14110E] text-[#231B15] dark:text-[#FAF5EE] overflow-x-hidden selection:bg-[#E39A7B]/30">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Three.js interactive 3D background */}
        <HeroScene subtle={false} />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] dark:bg-[#261E18] border border-[#E39A7B]/40 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#E39A7B] animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-[#C87553] dark:text-[#F3AB8F]">
                ✦ AI-Powered Resume Builder
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#1E1712] dark:text-[#FAF6F0]">
              Build a Resume That <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E39A7B] via-[#DBB06B] to-[#E39A7B]">
                Gets You Noticed.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#73675F] dark:text-[#BAADA0] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Create a professional, ATS-friendly resume with AI-powered guidance, beautiful modern templates, and intelligent suggestions tailored for modern tech roles.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link to="/builder" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  leftIcon={<Sparkles className="w-4 h-4 text-[#FFD3AC]" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto text-base px-7 py-3.5 shadow-lg shadow-[#E39A7B]/25"
                >
                  Build My Resume
                </Button>
              </Link>

              <a href="#templates" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto text-base px-6 py-3.5"
                >
                  Explore Templates
                </Button>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#73675F] dark:text-[#BAADA0]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Instant PDF download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>95% ATS pass rate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Live A4 Preview & Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Decorative subtle backdrop halo */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFD3AC]/30 via-[#FFB5AB]/25 to-[#DBB06B]/20 blur-3xl -z-10" />

            {/* Document wrapper */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] transform hover:scale-[1.01] transition-transform duration-300">
              {/* Scaled live preview */}
              <div className="rounded-2xl overflow-hidden border border-[#E8DFD3] dark:border-[#382F27] shadow-[0_20px_50px_rgba(35,27,21,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-white">
                <ResumePreview resume={initialResume} scale={0.52} className="h-[480px] sm:h-[530px]" />
              </div>

              {/* Floating Badge 1: ATS Score */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] rounded-2xl p-3 shadow-xl flex items-center gap-2.5 animate-bounce duration-1000">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  92%
                </div>
                <div>
                  <p className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">ATS Score 92%</p>
                  <p className="text-[10px] text-[#73675F] dark:text-[#BAADA0]">High Interview Likelihood</p>
                </div>
              </div>

              {/* Floating Badge 2: AI Suggestions */}
              <div className="absolute top-1/3 -right-4 sm:-right-8 bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] rounded-2xl p-3 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E39A7B]/20 border border-[#E39A7B]/40 flex items-center justify-center text-[#E39A7B]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">AI Suggestions</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">3 Quantified Tweaks Ready</p>
                </div>
              </div>

              {/* Floating Badge 3: Modern Template */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] rounded-2xl p-2.5 px-3.5 shadow-xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DBB06B] animate-ping" />
                <span className="text-xs font-semibold text-[#231B15] dark:text-[#FAF5EE]">
                  Modern Template • Clean A4
                </span>
              </div>

              {/* Floating Badge 4: Ready Indicator */}
              <div className="absolute -bottom-3 -right-2 sm:-right-4 bg-[#DBB06B] text-[#231B15] rounded-xl px-3 py-1.5 shadow-lg text-xs font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Resume Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 border-y border-[#E8DFD3]/80 dark:border-[#352C25]/80 bg-[#FAF6F0] dark:bg-[#181410]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E39A7B] to-[#DBB06B]">
                    {s.value}
                  </span>
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#73675F] dark:text-[#BAADA0]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E39A7B]">
            Engineered for Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
            Every Feature Designed to Get You Hired
          </h2>
          <p className="text-base text-[#73675F] dark:text-[#BAADA0]">
            Resumely AI combines intelligent resume coaching with flawless design standards so you stand out across every application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group relative p-7 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] hover:border-[#E39A7B]/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${f.color}25`, color: f.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[#73675F] dark:text-[#BAADA0] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-[#FAF6F0] dark:bg-[#181410] border-y border-[#E8DFD3]/80 dark:border-[#352C25]/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DBB06B]">
              Streamlined Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231B15] dark:text-[#FAF5EE]">
              How Resumely AI Works
            </h2>
            <p className="text-base text-[#73675F] dark:text-[#BAADA0]">
              From blank page to interview-ready resume in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs space-y-4"
              >
                <span className="text-4xl font-black text-[#E39A7B]/30 tracking-tight">
                  {st.num}
                </span>
                <h3 className="text-xl font-bold text-[#231B15] dark:text-[#FAF5EE]">
                  {st.title}
                </h3>
                <p className="text-sm text-[#73675F] dark:text-[#BAADA0] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEMPLATES SHOWCASE */}
      <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E39A7B]">
              6 Tailored Formats
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] mt-1">
              Templates Built for Every Career Stage
            </h2>
          </div>
          <Link to="/templates">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Templates
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeTemplates.slice(0, 6).map((t) => (
            <div
              key={t.id}
              className="group p-5 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] hover:border-[#E39A7B] transition-all hover:shadow-xl"
            >
              <div className={`h-48 rounded-xl bg-gradient-to-br ${t.previewBg} p-4 flex items-center justify-center border border-[#E8DFD3]/60 mb-4 overflow-hidden relative`}>
                <div className="w-3/4 h-full bg-white shadow-md rounded-t p-2 text-[4px] border border-[#E8DFD3]/60 space-y-1 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="h-1.5 w-12 rounded-xs" style={{ backgroundColor: t.accent }} />
                  <div className="h-1 w-full bg-[#EAE2D8] rounded-xs" />
                  <div className="h-1 w-2/3 bg-[#EAE2D8] rounded-xs" />
                  <div className="h-1 w-4/5 bg-[#EAE2D8] rounded-xs" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <h4 className="text-base font-bold text-[#231B15] dark:text-[#FAF5EE]">{t.name}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#C87553] uppercase">
                  {t.category}
                </span>
              </div>
              <p className="text-xs text-[#73675F] dark:text-[#BAADA0] mb-3">{t.tagline}</p>
              <Link to="/builder">
                <Button variant="ghost" size="sm" className="w-full text-xs" rightIcon={<ArrowRight className="w-3 h-3" />}>
                  Use {t.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-[#FAF6F0] dark:bg-[#181410] border-y border-[#E8DFD3]/80 dark:border-[#352C25]/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DBB06B]">
              Loved by Candidates
            </span>
            <h2 className="text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE]">
              Engineers &amp; Designers Who Landed Offers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-500 gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A3F36] dark:text-[#BAADA0] leading-relaxed italic mb-6">
                    &quot;{t.quote}&quot;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80">
                  <p className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">{t.name}</p>
                  <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FFF5EC] via-[#FAF0E6] to-[#F6E8DA] dark:from-[#261E18] dark:via-[#1F1914] dark:to-[#171310] border border-[#E39A7B]/40 p-10 sm:p-16 shadow-2xl space-y-6 overflow-hidden">
          {/* Subtle warm glow background element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#DBB06B]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#E39A7B]/25 rounded-full blur-3xl pointer-events-none" />

          <span className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E39A7B]/20 text-[#C87553] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Start Free Today
          </span>

          <h2 className="relative z-10 text-3xl sm:text-5xl font-black text-[#1E1712] dark:text-[#FAF6F0] tracking-tight">
            Ready to Land Your Dream Role?
          </h2>

          <p className="relative z-10 text-base sm:text-lg text-[#73675F] dark:text-[#BAADA0] max-w-xl mx-auto leading-relaxed">
            Join thousands of professionals crafting recruiter-approved resumes with Resumely AI.
          </p>

          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/builder">
              <Button
                size="lg"
                variant="primary"
                leftIcon={<Sparkles className="w-4 h-4 text-[#FFD3AC]" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-base px-8 py-4 shadow-xl"
              >
                Build My Resume Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-[#E8DFD3] dark:border-[#352C25] bg-white dark:bg-[#16120E] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="md" to="/" />
          <p className="text-xs text-[#73675F] dark:text-[#BAADA0]">
            © {new Date().getFullYear()} Resumely AI. All rights reserved. High-impact resume builder with pure client-side intelligence.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#73675F] dark:text-[#BAADA0]">
            <Link to="/templates" className="hover:text-[#E39A7B]">Templates</Link>
            <Link to="/builder" className="hover:text-[#E39A7B]">Builder</Link>
            <Link to="/ai-analysis" className="hover:text-[#E39A7B]">AI Score</Link>
            <Link to="/settings" className="hover:text-[#E39A7B]">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
