import React, { useState } from 'react';
import { Plus, X, Sparkles, Check } from 'lucide-react';
import { mockAISuggestions } from '../../data/mockAI';

export default function SkillsForm({ skills = [], onAddSkill, onRemoveSkill }) {
  const [skillInput, setSkillInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Frontend');
  const [showAiRecommendations, setShowAiRecommendations] = useState(false);

  const categories = ['Frontend', 'Backend', 'Languages', 'Databases', 'DevOps', 'General'];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput.trim()) {
        onAddSkill(skillInput.trim(), selectedCategory);
        setSkillInput('');
      }
    }
  };

  const handleAddClick = () => {
    if (skillInput.trim()) {
      onAddSkill(skillInput.trim(), selectedCategory);
      setSkillInput('');
    }
  };

  const handleAddAiSkill = (sug) => {
    onAddSkill(sug.name, sug.category || 'General');
  };

  const existingSkillNames = new Set(skills.map((s) => s.name.toLowerCase()));

  return (
    <div className="space-y-4">
      {/* Skill Input Row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type skill & press Enter (e.g. Next.js, Docker)"
            className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 outline-hidden"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] outline-hidden cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleAddClick}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#E39A7B] text-white hover:bg-[#D48464] transition-all cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Active Skills Chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#73675F] dark:text-[#BAADA0]">
            Current Skills ({skills.length})
          </span>
          <button
            type="button"
            onClick={() => setShowAiRecommendations(!showAiRecommendations)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#DBB06B] hover:text-[#C49852] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DBB06B]" />
            <span>{showAiRecommendations ? 'Hide AI Suggestions' : 'AI Suggested Skills'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 p-3 min-h-[70px] rounded-xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]">
          {skills.length === 0 ? (
            <p className="text-xs text-[#9E9187] self-center">No skills added yet. Type a skill above to start.</p>
          ) : (
            skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#FAF6F0] dark:bg-[#28211B] text-[#231B15] dark:text-[#FAF5EE] border border-[#E8DFD3] dark:border-[#3A3026] group hover:border-[#E39A7B]"
              >
                <span>{skill.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveSkill(skill.id)}
                  className="p-0.5 rounded text-[#9E9187] hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                  title="Remove skill"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* AI Skills Recommendations Drawer */}
      {showAiRecommendations && (
        <div className="p-3.5 rounded-xl bg-[#FAF6F0] dark:bg-[#261E18] border border-[#DBB06B]/40 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#A67E33] dark:text-[#E8C283] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> High-Demand ATS Keywords for your profile
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {mockAISuggestions.skillsSuggestions.map((sug, idx) => {
              const isAdded = existingSkillNames.has(sug.name.toLowerCase());
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAdded}
                  onClick={() => handleAddAiSkill(sug)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-white dark:bg-[#1E1A16] text-[#231B15] dark:text-[#FAF5EE] border border-[#E8DFD3] hover:border-[#DBB06B] hover:text-[#DBB06B]'
                  }`}
                >
                  {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  <span>{sug.name}</span>
                  <span className="text-[10px] text-[#9E9187] ml-0.5">({sug.category})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
