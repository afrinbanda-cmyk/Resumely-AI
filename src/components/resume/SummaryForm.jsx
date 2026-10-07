import React, { useState } from 'react';
import { Sparkles, Wand2, Check, RefreshCw } from 'lucide-react';
import Button from '../common/Button';
import { mockAISuggestions } from '../../data/mockAI';

export default function SummaryForm({ summary = '', onChange, onOpenAiModal }) {
  const [isImproving, setIsImproving] = useState(false);
  const [showAiPicker, setShowAiPicker] = useState(false);

  const handleImproveWithAi = () => {
    setIsImproving(true);
    setTimeout(() => {
      setIsImproving(false);
      setShowAiPicker(true);
    }, 700);
  };

  const handleApplyAiVersion = (content) => {
    onChange(content);
    setShowAiPicker(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#73675F] dark:text-[#BAADA0]">
          Professional Summary / Objective
        </label>
        <button
          type="button"
          onClick={handleImproveWithAi}
          disabled={isImproving}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#E39A7B]/15 text-[#C87553] dark:text-[#F3AB8F] hover:bg-[#E39A7B]/25 transition-all cursor-pointer"
        >
          {isImproving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-[#E39A7B]" />
          )}
          <span>{isImproving ? 'Analyzing with AI...' : 'Improve with AI'}</span>
        </button>
      </div>

      <textarea
        rows={5}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a concise overview of your background, core technical specialties, and biggest accomplishments..."
        className="w-full p-3.5 rounded-xl text-sm leading-relaxed bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all resize-y"
      />

      {/* AI Suggestions Quick Picker */}
      {showAiPicker && (
        <div className="p-4 rounded-xl bg-[#FAF6F0] dark:bg-[#28211B] border border-[#E39A7B]/30 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-[#E39A7B]" />
              <span className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">
                AI Suggested Enhancements
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAiPicker(false)}
              className="text-xs text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15]"
            >
              Dismiss
            </button>
          </div>

          <div className="space-y-2">
            {mockAISuggestions.summary.map((sug) => (
              <div
                key={sug.id}
                className="p-3 rounded-lg bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#352C25] hover:border-[#E39A7B] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#14100C] dark:text-[#FAF5EE]">{sug.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E39A7B]/15 text-[#C87553] font-medium">
                    {sug.tag}
                  </span>
                </div>
                <p className="text-xs text-[#52463D] dark:text-[#BAADA0] leading-relaxed mb-2.5">
                  {sug.content}
                </p>
                <button
                  type="button"
                  onClick={() => handleApplyAiVersion(sug.content)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-md bg-[#E39A7B] text-white hover:bg-[#D48464] transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Apply this version
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
