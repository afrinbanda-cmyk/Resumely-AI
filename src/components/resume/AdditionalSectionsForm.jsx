import React, { useState } from 'react';
import { Plus, Trash2, Award, Trophy, Languages, Heart, Users } from 'lucide-react';
import Button from '../common/Button';

export default function AdditionalSectionsForm({
  resume,
  onUpdateResume,
  onAddCertification,
  onUpdateCertification,
  onRemoveCertification,
}) {
  const {
    certifications = [],
    achievements = [],
    languages = [],
    interests = [],
    references = [],
  } = resume;

  const [newAchievement, setNewAchievement] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newLang, setNewLang] = useState({ language: '', proficiency: 'Conversational' });

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    const item = {
      id: `ach-${Date.now()}`,
      title: newAchievement.trim(),
      description: '',
    };
    onUpdateResume((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), item],
    }));
    setNewAchievement('');
  };

  const handleRemoveAchievement = (id) => {
    onUpdateResume((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((a) => a.id !== id),
    }));
  };

  const handleAddLanguage = () => {
    if (!newLang.language.trim()) return;
    const item = {
      id: `lang-${Date.now()}`,
      language: newLang.language.trim(),
      proficiency: newLang.proficiency,
    };
    onUpdateResume((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), item],
    }));
    setNewLang({ language: '', proficiency: 'Conversational' });
  };

  const handleRemoveLanguage = (id) => {
    onUpdateResume((prev) => ({
      ...prev,
      languages: (prev.languages || []).filter((l) => l.id !== id),
    }));
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    onUpdateResume((prev) => ({
      ...prev,
      interests: [...(prev.interests || []), newInterest.trim()],
    }));
    setNewInterest('');
  };

  const handleRemoveInterest = (index) => {
    onUpdateResume((prev) => ({
      ...prev,
      interests: (prev.interests || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Certifications */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#E8DFD3] dark:border-[#352C25]">
          <h4 className="text-xs font-bold text-[#E39A7B] uppercase flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Certifications ({certifications.length})
          </h4>
          <button
            type="button"
            onClick={onAddCertification}
            className="text-xs font-semibold text-[#E39A7B] hover:text-[#C87553] cursor-pointer"
          >
            + Add
          </button>
        </div>

        {certifications.map((c) => (
          <div
            key={c.id}
            className="p-3 rounded-lg bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs"
          >
            <input
              type="text"
              value={c.name || ''}
              onChange={(e) => onUpdateCertification(c.id, { name: e.target.value })}
              placeholder="Certification Title"
              className="px-2.5 py-1.5 rounded bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27]"
            />
            <input
              type="text"
              value={c.issuer || ''}
              onChange={(e) => onUpdateCertification(c.id, { issuer: e.target.value })}
              placeholder="Issuing Authority (e.g. AWS)"
              className="px-2.5 py-1.5 rounded bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27]"
            />
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={c.date || ''}
                onChange={(e) => onUpdateCertification(c.id, { date: e.target.value })}
                placeholder="2023-04"
                className="flex-1 px-2.5 py-1.5 rounded bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27]"
              />
              <button
                type="button"
                onClick={() => onRemoveCertification(c.id)}
                className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                title="Remove certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Languages */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#E39A7B] uppercase flex items-center gap-1.5 pb-1 border-b border-[#E8DFD3] dark:border-[#352C25]">
          <Languages className="w-4 h-4" /> Languages
        </h4>

        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <span
              key={l.id}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]"
            >
              <span className="font-medium text-[#231B15] dark:text-[#FAF5EE]">{l.language}</span>
              <span className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">({l.proficiency})</span>
              <button
                type="button"
                onClick={() => handleRemoveLanguage(l.id)}
                className="text-[#9E9187] hover:text-rose-500 ml-1 cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newLang.language}
            onChange={(e) => setNewLang({ ...newLang, language: e.target.value })}
            placeholder="Language (e.g. Spanish, German)"
            className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]"
          />
          <select
            value={newLang.proficiency}
            onChange={(e) => setNewLang({ ...newLang, proficiency: e.target.value })}
            className="px-2 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]"
          >
            <option>Native / Bilingual</option>
            <option>Fluent</option>
            <option>Professional</option>
            <option>Conversational</option>
            <option>Basic</option>
          </select>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E39A7B] text-white cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* 3. Achievements */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#E39A7B] uppercase flex items-center gap-1.5 pb-1 border-b border-[#E8DFD3] dark:border-[#352C25]">
          <Trophy className="w-4 h-4" /> Honors &amp; Awards
        </h4>

        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-2.5 rounded-lg bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] flex items-center justify-between text-xs"
          >
            <p className="font-medium text-[#231B15] dark:text-[#FAF5EE]">{ach.title}</p>
            <button
              type="button"
              onClick={() => handleRemoveAchievement(ach.id)}
              className="text-rose-500 hover:text-rose-700 ml-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        <div className="flex gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="e.g. 1st Place – Silicon Valley Hackathon 2023"
            className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]"
          />
          <button
            type="button"
            onClick={handleAddAchievement}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E39A7B] text-white cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* 4. Interests */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-[#E39A7B] uppercase flex items-center gap-1.5 pb-1 border-b border-[#E8DFD3] dark:border-[#352C25]">
          <Heart className="w-4 h-4" /> Personal Interests
        </h4>

        <div className="flex flex-wrap gap-1.5">
          {interests.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveInterest(idx)}
                className="text-[#9E9187] hover:text-rose-500 ml-1 cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="e.g. Open Source, Bouldering, Generative AI"
            className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]"
          />
          <button
            type="button"
            onClick={handleAddInterest}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E39A7B] text-white cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
