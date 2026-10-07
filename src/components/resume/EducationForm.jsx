import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import Button from '../common/Button';

export default function EducationForm({ education = [], onAdd, onUpdate, onRemove }) {
  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 rounded-xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] space-y-3.5 shadow-xs"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80">
            <span className="text-xs font-bold text-[#DBB06B] uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Degree #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => onRemove(edu.id)}
              className="p-1 rounded text-rose-500 hover:bg-rose-500/15 cursor-pointer"
              title="Delete degree"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Degree / Qualification *
              </label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => onUpdate(edu.id, { degree: e.target.value })}
                placeholder="B.S. in Computer Science"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Institution / University *
              </label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => onUpdate(edu.id, { institution: e.target.value })}
                placeholder="UC Berkeley"
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
                value={edu.location || ''}
                onChange={(e) => onUpdate(edu.id, { location: e.target.value })}
                placeholder="Berkeley, CA"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={edu.startDate || ''}
                onChange={(e) => onUpdate(edu.id, { startDate: e.target.value })}
                placeholder="2017-09"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                End Date (or Expected)
              </label>
              <input
                type="text"
                value={edu.endDate || ''}
                onChange={(e) => onUpdate(edu.id, { endDate: e.target.value })}
                placeholder="2021-05"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
              Honors, Minor, or Key Coursework
            </label>
            <input
              type="text"
              value={edu.description || ''}
              onChange={(e) => onUpdate(edu.id, { description: e.target.value })}
              placeholder="Dean's List • GPA 3.9 • Focus on Algorithms & Cloud Computing"
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
            />
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={onAdd}
        leftIcon={<Plus className="w-4 h-4 text-[#DBB06B]" />}
        className="w-full py-2.5 border-dashed"
      >
        + Add Another Degree / Education
      </Button>
    </div>
  );
}
