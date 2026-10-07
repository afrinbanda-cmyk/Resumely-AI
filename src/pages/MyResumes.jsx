import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  FileText,
  Edit3,
  Copy,
  Trash2,
  Download,
  Clock,
  BarChart3,
  Search,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useResume } from '../hooks/useResume';
import { resumeTemplates } from '../data/templates';
import { exportResumeToPDF } from '../utils/pdfExport';
import ResumePreview from '../components/resume/ResumePreview';

export default function MyResumes() {
  const { savedResumes, loadResume, duplicateResume, deleteResume, createNewResume } = useResume();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isExportingId, setIsExportingId] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('My New Resume');
  const [newTemplateId, setNewTemplateId] = useState('modern');

  const filteredResumes = savedResumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditResume = (id) => {
    loadResume(id);
    navigate('/builder');
  };

  const handleDownloadResume = async (resume) => {
    // We need a DOM element to export. Since we don't have one mounted,
    // we'll navigate to builder with the resume loaded instead.
    loadResume(resume.id);
    navigate('/builder');
  };

  const handleConfirmCreate = () => {
    createNewResume(newTemplateId, newTitle || 'Untitled Resume');
    setCreateModalOpen(false);
    navigate('/builder');
  };

  const handleDelete = (id) => {
    deleteResume(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-20 md:pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3] dark:border-[#352C25]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
            My Resumes
          </h1>
          <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-1">
            {savedResumes.length} resume{savedResumes.length !== 1 ? 's' : ''} saved locally
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          + Create New Resume
        </Button>
      </div>

      {/* Search & View Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resumes by title..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27]">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-[#E39A7B]/20 text-[#E39A7B]' : 'text-[#73675F] dark:text-[#BAADA0]'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-[#E39A7B]/20 text-[#E39A7B]' : 'text-[#73675F] dark:text-[#BAADA0]'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredResumes.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF0E6] dark:bg-[#28201A] flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-[#E39A7B]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#231B15] dark:text-[#FAF5EE]">
              {searchQuery ? 'No matching resumes' : 'No resumes yet'}
            </h3>
            <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-1 max-w-xs mx-auto">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search.`
                : 'Create your first professional resume and let AI guide you.'}
            </p>
          </div>
          {!searchQuery && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCreateModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create First Resume
            </Button>
          )}
        </div>
      )}

      {/* Grid View */}
      {filteredResumes.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredResumes.map((resume) => {
            const templateMeta =
              resumeTemplates.find((t) => t.id === resume.template) || resumeTemplates[0];
            const score = resume.score || 85;
            const scoreColor =
              score >= 90 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                : score >= 75 ? 'text-[#E39A7B] bg-[#E39A7B]/10 border-[#E39A7B]/25'
                : 'text-amber-600 bg-amber-500/10 border-amber-500/25';

            return (
              <div
                key={resume.id}
                className="group rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#E39A7B]/50 transition-all duration-300 flex flex-col"
              >
                {/* Mini A4 Thumbnail */}
                <div
                  className={`relative h-44 bg-gradient-to-br ${templateMeta.previewBg} p-3 flex items-center justify-center border-b border-[#E8DFD3]/60 dark:border-[#352C25]/60 cursor-pointer overflow-hidden`}
                  onClick={() => handleEditResume(resume.id)}
                >
                  <div className="w-24 h-32 bg-white shadow-md rounded-sm p-1.5 text-[3px] leading-tight border border-[#E8DFD3]/60 transform group-hover:scale-105 transition-transform duration-300 space-y-0.5">
                    <div className="h-1 w-10 rounded-xs mb-0.5" style={{ backgroundColor: resume.accentColor || templateMeta.accent }} />
                    <div className="h-px w-full bg-[#E8E0D5]" />
                    <div className="h-px w-full bg-[#E8E0D5]" />
                    <div className="h-px w-3/4 bg-[#E8E0D5]" />
                    <div className="h-0.5 w-8 mt-0.5" style={{ backgroundColor: resume.accentColor || templateMeta.accent }} />
                    <div className="h-px w-full bg-[#E8E0D5]" />
                    <div className="h-px w-5/6 bg-[#E8E0D5]" />
                    <div className="h-px w-full bg-[#E8E0D5]" />
                    <div className="h-0.5 w-8 mt-0.5" style={{ backgroundColor: resume.accentColor || templateMeta.accent }} />
                    <div className="h-px w-full bg-[#E8E0D5]" />
                    <div className="h-px w-2/3 bg-[#E8E0D5]" />
                    <div className="h-px w-3/4 bg-[#E8E0D5]" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-white font-semibold bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> Open Editor
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE] leading-tight line-clamp-2">
                        {resume.title}
                      </h3>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${scoreColor}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#73675F] dark:text-[#BAADA0]">
                      <span className="font-medium">{templateMeta.name}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{new Date(resume.lastModified || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center justify-between gap-1 pt-3 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => duplicateResume(resume.id)}
                        className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#FAF0E6] dark:hover:bg-[#28201A] hover:text-[#E39A7B] cursor-pointer transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadResume(resume)}
                        className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#FAF0E6] dark:hover:bg-[#28201A] hover:text-[#DBB06B] cursor-pointer transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(resume.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleEditResume(resume.id)}
                      leftIcon={<Edit3 className="w-3 h-3" />}
                      className="text-xs"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {filteredResumes.length > 0 && viewMode === 'list' && (
        <div className="space-y-3">
          {filteredResumes.map((resume) => {
            const templateMeta =
              resumeTemplates.find((t) => t.id === resume.template) || resumeTemplates[0];
            const score = resume.score || 85;
            const scoreColor =
              score >= 90 ? 'text-emerald-600 dark:text-emerald-400'
                : score >= 75 ? 'text-[#E39A7B]'
                : 'text-amber-600';

            return (
              <div
                key={resume.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs hover:border-[#E39A7B]/50 transition-all group"
              >
                {/* Mini thumbnail strip */}
                <div
                  className={`w-10 h-14 rounded bg-gradient-to-br ${templateMeta.previewBg} border border-[#E8DFD3]/60 shrink-0 flex items-center justify-center`}
                >
                  <div className="w-7 h-10 bg-white shadow-xs rounded-xs p-0.5 space-y-px">
                    <div className="h-px w-full rounded-xs" style={{ backgroundColor: resume.accentColor || templateMeta.accent }} />
                    <div className="h-px w-full bg-[#E8E0D5] rounded-xs" />
                    <div className="h-px w-3/4 bg-[#E8E0D5] rounded-xs" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE] truncate">
                    {resume.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#73675F] dark:text-[#BAADA0] mt-0.5">
                    <span>{templateMeta.name}</span>
                    <span>•</span>
                    <span>Edited {new Date(resume.lastModified || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>

                <span className={`text-sm font-extrabold ${scoreColor} shrink-0`}>
                  {score}%
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => duplicateResume(resume.id)}
                    className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#FAF0E6] dark:hover:bg-[#28201A] cursor-pointer"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadResume(resume)}
                    className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#FAF0E6] dark:hover:bg-[#28201A] cursor-pointer"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(resume.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Button size="sm" variant="primary" onClick={() => handleEditResume(resume.id)} className="text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Resume"
        subtitle="Choose a title and starting template"
        maxWidth="max-w-xl"
      >
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
              Resume Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Software Engineer at Google"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-2">
              Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {resumeTemplates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setNewTemplateId(t.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    newTemplateId === t.id
                      ? 'border-[#E39A7B] bg-[#E39A7B]/10 ring-2 ring-[#E39A7B]/25'
                      : 'border-[#E8DFD3] dark:border-[#382F27] hover:border-[#E39A7B]/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.accent }} />
                    <span className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">{t.name}</span>
                  </div>
                  <p className="text-[10px] text-[#73675F] dark:text-[#BAADA0]">{t.category}</p>
                </button>
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

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Resume"
        subtitle="This action cannot be undone. All resume data will be permanently removed."
        maxWidth="max-w-sm"
      >
        <div className="flex justify-end gap-2.5">
          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
            Keep Resume
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(deleteConfirmId)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Permanently Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
