import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Calendar,
  Building,
  MapPin,
  Briefcase,
} from 'lucide-react';
import Button from '../common/Button';
import { mockAISuggestions } from '../../data/mockAI';

export default function ExperienceForm({
  experience = [],
  onAdd,
  onUpdate,
  onRemove,
  onDuplicate,
  onMove,
}) {
  const [activeAiTargetId, setActiveAiTargetId] = useState(null);

  const handleApplyBullet = (expId, bulletText) => {
    const item = experience.find((e) => e.id === expId);
    if (!item) return;
    const current = item.description || '';
    const updated = current ? `${current}\n${bulletText}` : bulletText;
    onUpdate(expId, { description: updated });
    setActiveAiTargetId(null);
  };

  return (
    <div className="space-y-4">
      {experience.map((exp, index) => (
        <div
          key={exp.id}
          className="p-4 rounded-xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] space-y-3.5 transition-all shadow-xs"
        >
          {/* Header Bar with Action Controls */}
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80">
            <span className="text-xs font-bold text-[#E39A7B] uppercase tracking-wider">
              Role #{index + 1}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onMove(index, 'up')}
                disabled={index === 0}
                className="p-1 rounded text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] disabled:opacity-30 cursor-pointer"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onMove(index, 'down')}
                disabled={index === experience.length - 1}
                className="p-1 rounded text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] disabled:opacity-30 cursor-pointer"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDuplicate(exp.id)}
                className="p-1 rounded text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F] cursor-pointer"
                title="Duplicate role"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onRemove(exp.id)}
                className="p-1 rounded text-rose-500 hover:bg-rose-500/15 cursor-pointer"
                title="Delete role"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={exp.jobTitle || ''}
                onChange={(e) => onUpdate(exp.id, { jobTitle: e.target.value })}
                placeholder="Senior Frontend Engineer"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Company *
              </label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => onUpdate(exp.id, { company: e.target.value })}
                placeholder="Google / Acme Corp"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Location
              </label>
              <input
                type="text"
                value={exp.location || ''}
                onChange={(e) => onUpdate(exp.id, { location: e.target.value })}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Start Date (YYYY-MM)
              </label>
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => onUpdate(exp.id, { startDate: e.target.value })}
                placeholder="2022-03"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                End Date (YYYY-MM)
              </label>
              <input
                type="text"
                disabled={exp.currentlyWorking}
                value={exp.currentlyWorking ? '' : exp.endDate || ''}
                onChange={(e) => onUpdate(exp.id, { endDate: e.target.value })}
                placeholder="Present"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] disabled:opacity-50"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!exp.currentlyWorking}
              onChange={(e) => onUpdate(exp.id, { currentlyWorking: e.target.checked })}
              className="w-3.5 h-3.5 rounded text-[#E39A7B] focus:ring-[#E39A7B]"
            />
            <span className="text-xs text-[#73675F] dark:text-[#BAADA0]">I currently work here</span>
          </label>

          {/* Description & AI Bullets */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0]">
                Responsibilities &amp; Achievements (Bullet points)
              </label>
              <button
                type="button"
                onClick={() =>
                  setActiveAiTargetId(activeAiTargetId === exp.id ? null : exp.id)
                }
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E39A7B] hover:text-[#C87553] cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#DBB06B]" />
                <span>AI Bullet Suggestions</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={exp.description || ''}
              onChange={(e) => onUpdate(exp.id, { description: e.target.value })}
              placeholder="• Spearheaded feature development resulting in 30% performance boost..."
              className="w-full p-2.5 rounded-lg text-xs leading-relaxed bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 outline-hidden"
            />
          </div>

          {/* AI Bullet Suggestions Drawer */}
          {activeAiTargetId === exp.id && (
            <div className="p-3 rounded-lg bg-[#FAF6F0] dark:bg-[#261F1A] border border-[#E39A7B]/40 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E39A7B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Quantified High-Impact Bullets
                </span>
                <button
                  type="button"
                  onClick={() => setActiveAiTargetId(null)}
                  className="text-[11px] text-[#73675F] hover:text-[#231B15]"
                >
                  Close
                </button>
              </div>

              <div className="space-y-1.5">
                {mockAISuggestions.bulletPoints.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] flex items-start justify-between gap-2 text-xs"
                  >
                    <p className="text-[#3E352E] dark:text-[#BAADA0] leading-snug">{b}</p>
                    <button
                      type="button"
                      onClick={() => handleApplyBullet(exp.id, b)}
                      className="shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E39A7B]/15 text-[#C87553] hover:bg-[#E39A7B] hover:text-white transition-all cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={onAdd}
        leftIcon={<Plus className="w-4 h-4 text-[#E39A7B]" />}
        className="w-full py-2.5 border-dashed"
      >
        + Add Another Experience
      </Button>
    </div>
  );
}
