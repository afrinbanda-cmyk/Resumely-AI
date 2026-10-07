import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useResume } from '../hooks/useResume';
import TemplateGallery from '../components/templates/TemplateGallery';
import Button from '../components/common/Button';

export default function Templates() {
  const { currentResume, setTemplate } = useResume();
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleSelectTemplate = (templateId) => {
    setTemplate(templateId);
    setSelectedNotification(templateId);
    setTimeout(() => {
      setSelectedNotification(null);
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3] dark:border-[#352C25]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E39A7B]/15 text-[#C87553] dark:text-[#F3AB8F] text-xs font-bold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" /> 6 Recruiter-Approved Formats
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#231B15] dark:text-[#FAF5EE] tracking-tight">
            Professional Resume Templates
          </h1>
          <p className="text-sm text-[#73675F] dark:text-[#BAADA0] mt-1">
            Pick a layout that aligns with your role. You can switch templates anytime without losing any content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/builder')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Open in Builder
          </Button>
        </div>
      </div>

      {/* Template Selection Toast notification */}
      {selectedNotification && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              Template switched to &quot;{selectedNotification}&quot;! Your live resume has been updated.
            </span>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/builder')}
            className="text-xs"
          >
            Go to Editor
          </Button>
        </div>
      )}

      {/* Template Gallery with 6 distinct templates */}
      <TemplateGallery
        activeTemplateId={currentResume.template}
        onSelectTemplate={handleSelectTemplate}
        sampleResume={currentResume}
      />
    </div>
  );
}
