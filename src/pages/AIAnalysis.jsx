import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Check,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Download,
  RefreshCw,
  BarChart3,
  Shield,
  FileText,
  Zap,
  Target,
} from 'lucide-react';
import Button from '../components/common/Button';
import ResumeScoreGauge from '../components/ai/ResumeScoreGauge';
import { useResume } from '../hooks/useResume';
import { mockAnalysisReport } from '../data/mockAI';

// Animated progress bar component
function ProgressBar({ score, color = '#E39A7B', animated = true }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(score);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="w-full h-2 rounded-full bg-[#EAE2D8] dark:bg-[#382F27] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  );
}

// Category icon mapper
const categoryIcons = {
  'ATS Compatibility': Shield,
  'Content Quality': FileText,
  'Formatting & Structure': BarChart3,
  'Skills Alignment': Zap,
  'Impact & Quantification': Target,
};

export default function AIAnalysis() {
  const { currentResume } = useResume();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showFixSuggestion, setShowFixSuggestion] = useState(null);
  const [appliedFixes, setAppliedFixes] = useState([]);

  // Simulate AI analysis loading
  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const report = {
    ...mockAnalysisReport,
    score: currentResume?.score || mockAnalysisReport.score,
  };

  const scoreLabel =
    report.score >= 90
      ? 'Exceptional — Top Tier'
      : report.score >= 80
      ? 'Excellent — Ready to Apply'
      : report.score >= 70
      ? 'Good — Minor Improvements Needed'
      : 'Fair — Needs Significant Work';

  const handleFixWithAI = (impId) => {
    setShowFixSuggestion(showFixSuggestion === impId ? null : impId);
  };

  const handleApplyFix = (impId) => {
    setAppliedFixes((prev) => [...prev, impId]);
    setShowFixSuggestion(null);
  };

  // Loading skeleton state
  if (isAnalyzing) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
        <div className="text-center py-16 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E39A7B]/15 text-[#E39A7B] flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#231B15] dark:text-[#FAF5EE]">
              Running AI Resume Analysis...
            </h2>
            <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-2">
              Evaluating ATS compatibility, content quality, skills alignment, and impact metrics.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {['Scanning keywords', 'Checking ATS', 'Analyzing impact', 'Scoring content'].map((label, i) => (
              <div
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF0E6] dark:bg-[#28201A] text-[#C87553] dark:text-[#F3AB8F] border border-[#E39A7B]/30 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="w-48 h-2 bg-[#EAE2D8] dark:bg-[#382F27] rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#E39A7B] to-[#DBB06B] rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3] dark:border-[#352C25]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E39A7B]/15 text-[#C87553] dark:text-[#F3AB8F] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Intelligent Resume Audit
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
            AI Resume Analysis
          </h1>
          <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-1">
            See how ready your resume is for your next senior application.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setIsAnalyzing(true);
              setTimeout(() => setIsAnalyzing(false), 1200);
            }}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Re-analyze
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/builder')}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#FFD3AC]" />}
          >
            Fix with AI
          </Button>
        </div>
      </div>

      {/* Overall Score Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FFF5EC] to-[#FAF0E5] dark:from-[#261E18] dark:to-[#1E1712] border border-[#E39A7B]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8">
        <ResumeScoreGauge score={report.score} size={168} />

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
              {report.score} / 100
            </h2>
            <p className="text-sm font-semibold text-[#C87553] dark:text-[#F3AB8F] mt-0.5">
              {scoreLabel}
            </p>
          </div>
          <p className="text-xs text-[#73675F] dark:text-[#BAADA0] max-w-sm leading-relaxed">
            Your resume scores in the{' '}
            <strong className="text-[#231B15] dark:text-[#FAF5EE]">top 12%</strong> of
            candidates for senior engineering positions. Three targeted improvements will push
            it above the 92% threshold for automatic shortlisting.
          </p>

          {/* Score context badges */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25">
              ✓ ATS Parseable
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#DBB06B]/20 text-[#A67E33] dark:text-[#E8C283] border border-[#DBB06B]/35">
              ✓ Strong Technical Stack
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFB5AB]/25 text-rose-700 dark:text-rose-400 border border-rose-400/30">
              ⚠ 3 Improvements Available
            </span>
          </div>
        </div>
      </div>

      {/* Category Scores */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE]">
          Category Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.categories.map((cat, i) => {
            const Icon = categoryIcons[cat.name] || BarChart3;
            const barColor =
              cat.score >= 90 ? '#22C55E' : cat.score >= 80 ? '#E39A7B' : '#DBB06B';

            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] dark:bg-[#28201A] flex items-center justify-center text-[#E39A7B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-[#231B15] dark:text-[#FAF5EE]">
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-base font-extrabold"
                      style={{ color: barColor }}
                    >
                      {cat.score}%
                    </span>
                    <span className="text-[11px] font-medium text-[#73675F] dark:text-[#BAADA0] px-2 py-0.5 rounded-full bg-[#FAF0E6] dark:bg-[#28201A]">
                      {cat.status}
                    </span>
                  </div>
                </div>
                <ProgressBar score={cat.score} color={barColor} />
                <p className="text-xs text-[#73675F] dark:text-[#BAADA0] leading-relaxed">
                  {cat.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's Working */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE] flex items-center gap-2">
          <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> What&apos;s Working
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {report.strengths.map((str, i) => (
            <div
              key={str.id}
              className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#231B15] dark:text-[#FAF5EE]">
                  {str.title}
                </p>
                <p className="text-xs text-[#73675F] dark:text-[#BAADA0] mt-0.5 leading-relaxed">
                  {str.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Needs Improvement */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" /> Needs Improvement
        </h2>
        <div className="space-y-3">
          {report.improvements.map((imp) => {
            const isApplied = appliedFixes.includes(imp.id);
            const isShowingFix = showFixSuggestion === imp.id;

            return (
              <div key={imp.id} className="space-y-2">
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isApplied
                      ? 'bg-emerald-500/8 border-emerald-500/25'
                      : 'bg-white dark:bg-[#1E1A16] border-[#E8DFD3] dark:border-[#382F27]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
                        {isApplied ? (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <p className="text-sm font-semibold text-[#231B15] dark:text-[#FAF5EE]">
                            {imp.title}
                          </p>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              imp.severity === 'high'
                                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                                : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {imp.severity} priority
                          </span>
                          <span className="text-[10px] text-[#73675F] dark:text-[#BAADA0] px-2 py-0.5 rounded-full bg-[#FAF0E6] dark:bg-[#28201A]">
                            {imp.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#73675F] dark:text-[#BAADA0] leading-relaxed">
                          {imp.description}
                        </p>
                      </div>
                    </div>

                    {!isApplied && (
                      <Button
                        size="sm"
                        variant="gold"
                        onClick={() => handleFixWithAI(imp.id)}
                        leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                        className="text-xs shrink-0"
                      >
                        Fix with AI
                      </Button>
                    )}
                    {isApplied && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                        <Check className="w-3.5 h-3.5" /> Applied
                      </span>
                    )}
                  </div>
                </div>

                {/* AI Fix Suggestion Inline Panel */}
                {isShowingFix && !isApplied && (
                  <div className="ml-4 p-4 rounded-2xl bg-[#FAF6F0] dark:bg-[#261E18] border border-[#DBB06B]/40 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#DBB06B]" />
                      <span className="text-xs font-bold text-[#A67E33] dark:text-[#E8C283] uppercase tracking-wider">
                        AI Suggested Fix
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] text-xs text-[#3A322C] dark:text-[#BAADA0] leading-relaxed font-mono">
                      {imp.suggestedFix}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleApplyFix(imp.id)}
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                        className="text-xs"
                      >
                        Apply Fix
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowFixSuggestion(null)}
                        className="text-xs"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FFF5EC] to-[#FAF0E5] dark:from-[#261E18] dark:to-[#1E1712] border border-[#E39A7B]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE]">
            Ready to apply the 3 improvements and boost your score?
          </p>
          <p className="text-xs text-[#73675F] dark:text-[#BAADA0] mt-1">
            Apply all AI suggestions in the Resume Builder to reach 94+.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/builder')}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Open Builder
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/builder')}
            leftIcon={<Sparkles className="w-4 h-4 text-[#FFD3AC]" />}
          >
            Auto-Apply All Fixes
          </Button>
        </div>
      </div>
    </div>
  );
}
