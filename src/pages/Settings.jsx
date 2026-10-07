import React, { useState } from 'react';
import {
  User,
  Palette,
  FileText,
  Sparkles,
  Download,
  Moon,
  Sun,
  Monitor,
  Check,
  ToggleLeft,
  ToggleRight,
  ChevronRight,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResume } from '../hooks/useResume';
import { resumeTemplates, colorPalette, fontFamilies } from '../data/templates';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

function SettingRow({ icon: Icon, label, description, children }) {
  return (
    <div className="flex items-start sm:items-center justify-between gap-4 py-4 border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80 last:border-0">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-[#FAF0E6] dark:bg-[#28201A] flex items-center justify-center text-[#E39A7B] shrink-0 mt-0.5">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-[#231B15] dark:text-[#FAF5EE]">{label}</p>
          {description && (
            <p className="text-xs text-[#73675F] dark:text-[#BAADA0] mt-0.5 max-w-xs leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80 flex items-center gap-2.5">
        {Icon && <Icon className="w-4 h-4 text-[#E39A7B]" />}
        <h2 className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE] uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="px-6">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E39A7B]/40 ${
        checked ? 'bg-[#E39A7B]' : 'bg-[#E8DFD3] dark:bg-[#382F27]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const { theme, setTheme, isDark } = useTheme();
  const { currentResume, setTemplate, setAccentColor, setFontFamily, savedResumes } = useResume();
  const [prefs, setPrefs] = useLocalStorage('resumely_preferences', {
    aiSuggestions: true,
    autoAnalysis: true,
    pdfQuality: 'high',
    showPhoto: false,
    showReferences: false,
    defaultTemplate: 'modern',
    defaultFont: 'sans',
    defaultAccent: '#E39A7B',
  });
  const [clearDataModal, setClearDataModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const updatePref = (key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleClearAllData = () => {
    localStorage.removeItem('resumely_saved_resumes');
    localStorage.removeItem('resumely_current_resume');
    localStorage.removeItem('resumely_preferences');
    localStorage.removeItem('resumely_theme');
    setClearDataModal(false);
    window.location.reload();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3] dark:border-[#352C25]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
            Settings
          </h1>
          <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-1">
            Customize your Resumely AI experience and export preferences.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          leftIcon={saveSuccess ? <Check className="w-4 h-4" /> : undefined}
        >
          {saveSuccess ? 'Preferences Saved ✓' : 'Save Preferences'}
        </Button>
      </div>

      {/* 1. Profile */}
      <SectionCard title="Profile" icon={User}>
        <SettingRow
          icon={User}
          label="Demo Profile"
          description="This is a demo account. No real authentication is required in this prototype."
        >
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27]">
            <div className="w-9 h-9 rounded-full bg-[#E39A7B]/20 text-[#E39A7B] font-bold flex items-center justify-center text-sm shrink-0">
              AJ
            </div>
            <div>
              <p className="text-xs font-bold text-[#231B15] dark:text-[#FAF5EE]">Alex Johnson</p>
              <p className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">Student • Demo User</p>
            </div>
          </div>
        </SettingRow>
        <SettingRow
          label="Total Resumes Created"
          description="Resumes saved in your local browser storage."
        >
          <span className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE] px-3 py-1 rounded-xl bg-[#FAF0E6] dark:bg-[#28201A] border border-[#E39A7B]/30">
            {savedResumes.length}
          </span>
        </SettingRow>
      </SectionCard>

      {/* 2. Appearance */}
      <SectionCard title="Appearance" icon={Palette}>
        <SettingRow
          icon={Palette}
          label="Color Theme"
          description="Choose your preferred visual appearance. System follows your OS setting."
        >
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27]">
            {[
              { id: 'light', icon: Sun, label: 'Light' },
              { id: 'dark', icon: Moon, label: 'Dark' },
              { id: 'system', icon: Monitor, label: 'System' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  (opt.id === 'system' ? false : theme === opt.id)
                    ? 'bg-white dark:bg-[#1E1A16] text-[#E39A7B] shadow-xs'
                    : 'text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE]'
                }`}
              >
                <opt.icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            ))}
          </div>
        </SettingRow>
      </SectionCard>

      {/* 3. Resume Preferences */}
      <SectionCard title="Resume Defaults" icon={FileText}>
        <SettingRow
          label="Default Template"
          description="Applied automatically when you create a new resume."
        >
          <select
            value={prefs.defaultTemplate}
            onChange={(e) => {
              updatePref('defaultTemplate', e.target.value);
              setTemplate(e.target.value);
            }}
            className="px-3 py-1.5 rounded-xl text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] cursor-pointer outline-none"
          >
            {resumeTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </SettingRow>

        <SettingRow
          label="Default Accent Color"
          description="Sets the accent color for new resume templates."
        >
          <div className="flex items-center gap-2">
            {colorPalette.map((cp) => (
              <button
                key={cp.value}
                type="button"
                onClick={() => {
                  updatePref('defaultAccent', cp.value);
                  setAccentColor(cp.value);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                  prefs.defaultAccent === cp.value
                    ? 'scale-110 border-[#231B15] dark:border-[#FAF5EE]'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: cp.value }}
                title={cp.name}
              />
            ))}
          </div>
        </SettingRow>

        <SettingRow
          label="Default Font Family"
          description="Controls typography style for new resumes."
        >
          <div className="flex gap-1.5">
            {fontFamilies.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  updatePref('defaultFont', f.id);
                  setFontFamily(f.id);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                  prefs.defaultFont === f.id
                    ? 'border-[#E39A7B] bg-[#E39A7B]/15 text-[#C87553]'
                    : 'border-[#E8DFD3] dark:border-[#382F27] text-[#73675F] dark:text-[#BAADA0] hover:border-[#E39A7B]/40'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </SettingRow>
      </SectionCard>

      {/* 4. AI Preferences */}
      <SectionCard title="AI Preferences" icon={Sparkles}>
        <SettingRow
          icon={Sparkles}
          label="AI Suggestions"
          description="Show inline AI improvement suggestions while editing your resume sections."
        >
          <Toggle
            checked={prefs.aiSuggestions}
            onChange={(val) => updatePref('aiSuggestions', val)}
          />
        </SettingRow>
        <SettingRow
          label="Auto-Analyze on Save"
          description="Automatically run an AI score audit each time your resume is autosaved."
        >
          <Toggle
            checked={prefs.autoAnalysis}
            onChange={(val) => updatePref('autoAnalysis', val)}
          />
        </SettingRow>
      </SectionCard>

      {/* 5. Export Preferences */}
      <SectionCard title="PDF Export" icon={Download}>
        <SettingRow
          icon={Download}
          label="PDF Quality"
          description="Higher quality produces larger file size but sharper print output."
        >
          <select
            value={prefs.pdfQuality}
            onChange={(e) => updatePref('pdfQuality', e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-[#FAF8F3] dark:bg-[#28221D] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] cursor-pointer outline-none"
          >
            <option value="standard">Standard (72 DPI)</option>
            <option value="high">High (144 DPI)</option>
            <option value="print">Print-Ready (300 DPI)</option>
          </select>
        </SettingRow>
        <SettingRow
          label="Include Profile Photo"
          description="Show profile headshot in PDF exports when a photo is uploaded."
        >
          <Toggle
            checked={prefs.showPhoto}
            onChange={(val) => updatePref('showPhoto', val)}
          />
        </SettingRow>
        <SettingRow
          label="Include References Section"
          description="Show the References section in PDF output."
        >
          <Toggle
            checked={prefs.showReferences}
            onChange={(val) => updatePref('showReferences', val)}
          />
        </SettingRow>
      </SectionCard>

      {/* 6. Danger Zone */}
      <SectionCard title="Data & Privacy" icon={AlertTriangle}>
        <SettingRow
          icon={Trash2}
          label="Clear All Local Data"
          description="Permanently remove all resumes, settings, and preferences from this browser. This cannot be undone."
        >
          <Button
            variant="danger"
            size="sm"
            onClick={() => setClearDataModal(true)}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear All Data
          </Button>
        </SettingRow>
      </SectionCard>

      {/* Clear Data Confirmation Modal */}
      <Modal
        isOpen={clearDataModal}
        onClose={() => setClearDataModal(false)}
        title="Clear All Local Data"
        subtitle="This will permanently delete all your resumes and settings. This action cannot be undone."
        maxWidth="max-w-sm"
      >
        <div className="flex justify-end gap-2.5 pt-4">
          <Button variant="ghost" size="sm" onClick={() => setClearDataModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearAllData}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Clear Everything
          </Button>
        </div>
      </Modal>
    </div>
  );
}
