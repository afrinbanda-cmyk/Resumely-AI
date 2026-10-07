import React from 'react';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';
import Button from '../common/Button';

export default function ProjectsForm({ projects = [], onAdd, onUpdate, onRemove }) {
  return (
    <div className="space-y-4">
      {projects.map((proj, index) => (
        <div
          key={proj.id}
          className="p-4 rounded-xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] space-y-3.5 shadow-xs"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80">
            <span className="text-xs font-bold text-[#E39A7B] uppercase tracking-wider flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4" /> Project #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => onRemove(proj.id)}
              className="p-1 rounded text-rose-500 hover:bg-rose-500/15 cursor-pointer"
              title="Delete project"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Project Name *
              </label>
              <input
                type="text"
                value={proj.name || ''}
                onChange={(e) => onUpdate(proj.id, { name: e.target.value })}
                placeholder="PulseAI – Real-Time Monitor"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Technologies Used
              </label>
              <input
                type="text"
                value={proj.technologies || ''}
                onChange={(e) => onUpdate(proj.id, { technologies: e.target.value })}
                placeholder="React, TypeScript, Three.js, Redis"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                Demo / Live URL
              </label>
              <input
                type="text"
                value={proj.url || ''}
                onChange={(e) => onUpdate(proj.id, { url: e.target.value })}
                placeholder="https://myproject.com"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={proj.github || ''}
                onChange={(e) => onUpdate(proj.id, { github: e.target.value })}
                placeholder="https://github.com/alex/myproject"
                className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
              Description &amp; Highlights
            </label>
            <textarea
              rows={3}
              value={proj.description || ''}
              onChange={(e) => onUpdate(proj.id, { description: e.target.value })}
              placeholder="Built an open-source Kubernetes telemetry dashboard that reduced troubleshooting time by 40%..."
              className="w-full p-2.5 rounded-lg text-xs leading-relaxed bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
            />
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        size="sm"
        onClick={onAdd}
        leftIcon={<Plus className="w-4 h-4 text-[#E39A7B]" />}
        className="w-full py-2.5 border-dashed"
      >
        + Add Another Project
      </Button>
    </div>
  );
}
