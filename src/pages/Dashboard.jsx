import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  FileText,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  Copy,
  Trash2,
  Edit3,
  ExternalLink,
  Flame,
} from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useResume } from '../hooks/useResume';
import { resumeTemplates } from '../data/templates';

export default function Dashboard() {
  const {
    savedResumes,
    loadResume,
    duplicateResume,
    deleteResume,
    createNewResume,
  } = useResume();
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('modern');
  const [newResumeTitle, setNewResumeTitle] = useState('My Next Resume');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Computed stats
  const totalResumes = savedResumes.length;
  const avgScore =
    totalResumes > 0
      ? Math.round(savedResumes.reduce((acc, r) => acc + (r.score || 85), 0) / totalResumes)
      : 85;
  const applicationsReady = savedResumes.filter((r) => (r.score || 0) >= 85).length;
  const aiSuggestionsCount = 12;

  const handleEditResume = (id) => {
    loadResume(id);
    navigate('/builder');
  };

  const handleConfirmCreate = () => {
    const created = createNewResume(selectedTemplateId, newResumeTitle || 'Untitled Resume');
    setCreateModalOpen(false);
    navigate('/builder');
  };

  const handleDelete = (id) => {
    deleteResume(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3] dark:border-[#352C25]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
            Good morning, Alex 👋
          </h1>
          <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-1">
            Let&apos;s make your next application stronger.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/ai-analysis">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Sparkles className="w-4 h-4 text-[#DBB06B]" />}
            >
              Run AI Audit
            </Button>
          </Link>
          <Button
            variant="primary"
            size="md"
            onClick={() => setCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create New Resume
          </Button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#73675F] dark:text-[#BAADA0] mb-2">
            <span className="text-xs font-semibold">Total Resumes</span>
            <FileText className="w-4 h-4 text-[#E39A7B]" />
          </div>
          <p className="text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE]">
            {totalResumes}
          </p>
          <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">Synced locally in browser</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#73675F] dark:text-[#BAADA0] mb-2">
            <span className="text-xs font-semibold">Average Resume Score</span>
            <BarChart3 className="w-4 h-4 text-[#DBB06B]" />
          </div>
          <p className="text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE]">
            {avgScore}%
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Top 8% of applicants</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#73675F] dark:text-[#BAADA0] mb-2">
            <span className="text-xs font-semibold">Applications Ready</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE]">
            {applicationsReady}
          </p>
          <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">High ATS passing rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#73675F] dark:text-[#BAADA0] mb-2">
            <span className="text-xs font-semibold">AI Suggestions</span>
            <Sparkles className="w-4 h-4 text-[#E39A7B]" />
          </div>
          <p className="text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE]">
            {aiSuggestionsCount}
          </p>
          <p className="text-[11px] text-[#C87553] dark:text-[#F3AB8F] font-medium">Keywords &amp; bullets ready</p>
        </div>
      </div>

      {/* Recent Resumes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE] flex items-center gap-2">
            <span>Recent Resumes</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#C87553] font-semibold">
              {savedResumes.length}
            </span>
          </h2>
          <Link
            to="/my-resumes"
            className="text-xs font-semibold text-[#E39A7B] hover:text-[#C87553] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedResumes.map((resume) => {
            const templateMeta = resumeTemplates.find((t) => t.id === resume.template) || resumeTemplates[0];
            return (
              <div
                key={resume.id}
                className="group rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] p-5 shadow-xs hover:border-[#E39A7B]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-[#231B15] dark:text-[#FAF5EE] group-hover:text-[#E39A7B] transition-colors">
                        {resume.title}
                      </h3>
                      <p className="text-xs text-[#73675F] dark:text-[#BAADA0] mt-0.5">
                        Template: <span className="font-semibold text-[#231B15] dark:text-[#FAF5EE]">{templateMeta.name}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0">
                      <span>{resume.score || 85}%</span>
                    </div>
                  </div>

                  {/* Template miniature preview ribbon */}
                  <div className={`h-24 rounded-xl bg-gradient-to-r ${templateMeta.previewBg} p-2.5 flex items-center justify-between border border-[#E8DFD3]/60 mb-3`}>
                    <div className="w-2/3 h-full bg-white shadow-xs rounded p-2 text-[4px] space-y-1">
                      <div className="h-1.5 w-12 rounded-xs" style={{ backgroundColor: resume.accentColor || templateMeta.accent }} />
                      <div className="h-1 w-full bg-[#EAE2D8] rounded-xs" />
                      <div className="h-1 w-3/4 bg-[#EAE2D8] rounded-xs" />
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[#73675F] dark:text-[#BAADA0]">
                        {templateMeta.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#73675F] dark:text-[#BAADA0] mb-4">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Edited {new Date(resume.lastModified || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => duplicateResume(resume.id)}
                      className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F]"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(resume.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleEditResume(resume.id)}
                    leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    Edit Resume
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Create New Resume */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Resume"
        subtitle="Choose a title and starting template for your resume"
        maxWidth="max-w-xl"
      >
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
              Resume Title
            </label>
            <input
              type="text"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-2">
              Select Starting Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
              {resumeTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedTemplateId === t.id
                      ? 'border-[#E39A7B] bg-[#E39A7B]/10 ring-2 ring-[#E39A7B]/30'
                      : 'border-[#E8DFD3] dark:border-[#382F27] hover:border-[#E39A7B]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">{t.name}</span>
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                  </div>
                  <p className="text-[10px] text-[#73675F] dark:text-[#BAADA0] line-clamp-1">{t.category}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-[#E8DFD3] dark:border-[#352C25]">
            <Button variant="ghost" size="sm" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmCreate}>
              Start Building
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Resume"
        subtitle="Are you sure you want to delete this resume? This cannot be undone."
        maxWidth="max-w-md"
      >
        <div className="flex justify-end gap-2.5 pt-4">
          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
            Keep It
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(deleteConfirmId)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
