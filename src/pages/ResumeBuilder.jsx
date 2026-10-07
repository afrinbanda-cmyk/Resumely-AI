import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Save,
  Undo2,
  Redo2,
  Download,
  Sparkles,
  Palette,
  Eye,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  ChevronDown,
  FileCheck,
  Type,
  Layout,
  Layers,
} from 'lucide-react';
import { useResume } from '../hooks/useResume';
import ResumeEditor from '../components/resume/ResumeEditor';
import ResumePreview from '../components/resume/ResumePreview';
import AIAssistant from '../components/ai/AIAssistant';
import Button from '../components/common/Button';
import { exportResumeToPDF } from '../utils/pdfExport';
import { resumeTemplates, colorPalette, fontFamilies } from '../data/templates';

export default function ResumeBuilder() {
  const {
    currentResume,
    updateResume,
    saveStatus,
    canUndo,
    canRedo,
    undo,
    redo,
    updatePersonalInfo,
    updateSummary,
    setTemplate,
    setAccentColor,
    setFontFamily,
    addExperience,
    updateExperience,
    removeExperience,
    duplicateExperience,
    moveExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCertification,
    updateCertification,
    removeCertification,
    toggleSection,
  } = useResume();

  const navigate = useNavigate();
  const previewRef = useRef(null);

  const [scale, setScale] = useState(0.85);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  // Zoom controls
  const handleZoomIn = () => setScale((prev) => Math.min(1.2, +(prev + 0.1).toFixed(2)));
  const handleZoomOut = () => setScale((prev) => Math.max(0.5, +(prev - 0.1).toFixed(2)));
  const handleResetZoom = () => setScale(0.85);

  // PDF Export
  const handleDownloadPDF = async () => {
    if (!previewRef.current || isExporting) return;
    setIsExporting(true);
    setExportSuccess(false);

    try {
      const filename = `${currentResume.personalInfo?.fullName || 'Alex_Johnson'}_Resume.pdf`;
      await exportResumeToPDF(previewRef.current, filename);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('PDF Export Error:', err);
      alert('Unable to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const currentTemplate =
    resumeTemplates.find((t) => t.id === currentResume.template) || resumeTemplates[0];

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)]">
      {/* 1. TOP BUILDER TOOLBAR */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1A1612]/95 backdrop-blur-md border-b border-[#E8DFD3] dark:border-[#352C25] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        {/* Left: Editable Title & Autosave status */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={currentResume.title || 'Software Developer Resume'}
            onChange={(e) => updateResume({ title: e.target.value })}
            className="text-base font-bold text-[#231B15] dark:text-[#FAF5EE] bg-transparent hover:bg-[#FAF8F3] dark:hover:bg-[#28221D] px-2 py-1 rounded-lg border border-transparent hover:border-[#E8DFD3] focus:border-[#E39A7B] focus:ring-1 focus:ring-[#E39A7B] outline-hidden transition-all max-w-[240px] sm:max-w-[320px] truncate"
            title="Click to rename resume"
          />

          <div className="flex items-center gap-1.5 text-xs text-[#73675F] dark:text-[#BAADA0] select-none">
            {saveStatus === 'saving' ? (
              <span className="text-[#DBB06B] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DBB06B] animate-ping" /> Saving...
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved just now
              </span>
            )}
          </div>
        </div>

        {/* Center: History & Quick Template selector */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="hidden sm:flex items-center bg-[#FAF8F3] dark:bg-[#28221D] rounded-xl border border-[#E8DFD3] dark:border-[#382F27] p-0.5">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] hover:bg-white dark:hover:bg-[#1E1A16] disabled:opacity-30 cursor-pointer"
              title="Undo"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className="p-1.5 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] hover:bg-white dark:hover:bg-[#1E1A16] disabled:opacity-30 cursor-pointer"
              title="Redo"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Style Switcher (Template, Accent, Font) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStyleMenu(!showStyleMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] hover:border-[#E39A7B] cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#E39A7B]" />
              <span className="hidden sm:inline">Theme:</span>
              <span>{currentTemplate.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9E9187]" />
            </button>

            {/* Dropdown Menu */}
            {showStyleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] rounded-2xl shadow-2xl p-4 z-50 space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-[11px] font-bold text-[#73675F] dark:text-[#BAADA0] uppercase tracking-wider mb-2">
                    Template Format
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {resumeTemplates.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setTemplate(t.id);
                          setShowStyleMenu(false);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left flex items-center justify-between ${
                          currentResume.template === t.id
                            ? 'bg-[#E39A7B]/15 text-[#C87553] font-bold'
                            : 'hover:bg-[#FAF8F3] dark:hover:bg-[#28221D]'
                        }`}
                      >
                        <span>{t.name}</span>
                        {currentResume.template === t.id && <Check className="w-3 h-3 text-[#E39A7B]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#73675F] dark:text-[#BAADA0] uppercase tracking-wider mb-2">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorPalette.map((cp) => (
                      <button
                        key={cp.value}
                        type="button"
                        onClick={() => setAccentColor(cp.value)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          currentResume.accentColor === cp.value
                            ? 'scale-110 border-[#231B15] dark:border-white'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: cp.value }}
                        title={cp.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#73675F] dark:text-[#BAADA0] uppercase tracking-wider mb-2">
                    Typography Font
                  </label>
                  <div className="flex gap-2">
                    {fontFamilies.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFontFamily(f.id)}
                        className={`flex-1 py-1 px-2 rounded-lg text-xs border text-center ${
                          currentResume.fontFamily === f.id
                            ? 'border-[#E39A7B] bg-[#E39A7B]/15 font-bold'
                            : 'border-[#E8DFD3] dark:border-[#382F27]'
                        }`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Buttons & PDF Download */}
        <div className="flex items-center gap-2.5">
          <Link to="/ai-analysis">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<FileCheck className="w-3.5 h-3.5 text-[#DBB06B]" />}
              className="text-xs font-semibold"
            >
              <span className="hidden sm:inline">Score:</span> {currentResume.score || 87}%
            </Button>
          </Link>

          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsAiOpen(!isAiOpen)}
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            className="text-xs font-semibold"
          >
            AI Coach
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPDF}
            isLoading={isExporting}
            leftIcon={exportSuccess ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
            className="text-xs font-bold"
          >
            {isExporting ? 'Generating PDF...' : exportSuccess ? 'PDF Ready ✓' : 'Download PDF'}
          </Button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-[#E8DFD3] dark:border-[#352C25] bg-white dark:bg-[#1E1A16] px-4">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
            mobileTab === 'editor'
              ? 'border-[#E39A7B] text-[#E39A7B]'
              : 'border-transparent text-[#73675F] dark:text-[#BAADA0]'
          }`}
        >
          Form Editor
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-colors ${
            mobileTab === 'preview'
              ? 'border-[#E39A7B] text-[#E39A7B]'
              : 'border-transparent text-[#73675F] dark:text-[#BAADA0]'
          }`}
        >
          Live A4 Preview
        </button>
      </div>

      {/* 2. SPLIT-SCREEN MAIN WORKSPACE (40% Editor / 60% Preview) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: EDITOR (~40%) */}
        <div
          className={`w-full lg:w-[42%] xl:w-[40%] h-[calc(100vh-8.5rem)] overflow-y-auto p-4 sm:p-6 border-r border-[#E8DFD3] dark:border-[#352C25] ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumeEditor
            resume={currentResume}
            onUpdateResume={updateResume}
            onUpdatePersonalInfo={updatePersonalInfo}
            onUpdateSummary={updateSummary}
            onAddExperience={addExperience}
            onUpdateExperience={updateExperience}
            onRemoveExperience={removeExperience}
            onDuplicateExperience={duplicateExperience}
            onMoveExperience={moveExperience}
            onAddEducation={addEducation}
            onUpdateEducation={updateEducation}
            onRemoveEducation={removeEducation}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
            onAddProject={addProject}
            onUpdateProject={updateProject}
            onRemoveProject={removeProject}
            onAddCertification={addCertification}
            onUpdateCertification={updateCertification}
            onRemoveCertification={removeCertification}
            onToggleSection={toggleSection}
            onOpenAiAssistant={() => setIsAiOpen(true)}
          />
        </div>

        {/* RIGHT COLUMN: STICKY A4 PREVIEW (~60%) */}
        <div
          className={`w-full lg:w-[58%] xl:w-[60%] h-[calc(100vh-8.5rem)] overflow-y-auto bg-[#F4EEE5] dark:bg-[#120F0C] p-4 sm:p-8 flex flex-col items-center relative ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Floating Zoom and View Toolbar */}
          <div className="sticky top-0 z-20 mb-6 bg-white/90 dark:bg-[#1E1A16]/90 backdrop-blur-md rounded-2xl border border-[#E8DFD3] dark:border-[#382F27] px-4 py-2 flex items-center gap-3 shadow-md">
            <span className="text-xs font-semibold text-[#73675F] dark:text-[#BAADA0]">
              {Math.round(scale * 100)}%
            </span>

            <div className="flex items-center gap-1 border-x border-[#E8DFD3] dark:border-[#382F27] px-2">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#28221D] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 rounded-lg text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#28221D] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetZoom}
              className="text-xs text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE] cursor-pointer"
            >
              Fit
            </button>
          </div>

          {/* Actual Live A4 Sheet Preview */}
          <div className="w-full flex justify-center pb-16">
            <ResumePreview ref={previewRef} resume={currentResume} scale={scale} />
          </div>
        </div>
      </div>

      {/* AI Assistant Drawer */}
      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
