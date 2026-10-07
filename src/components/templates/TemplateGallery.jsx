import React, { useState } from 'react';
import { resumeTemplates } from '../../data/templates';
import TemplateCard from './TemplateCard';
import Modal from '../common/Modal';
import ResumePreview from '../resume/ResumePreview';
import Button from '../common/Button';
import { Check, Sparkles } from 'lucide-react';

export default function TemplateGallery({
  activeTemplateId,
  onSelectTemplate,
  sampleResume,
}) {
  const [previewModalTemplate, setPreviewModalTemplate] = useState(null);

  const previewResume = sampleResume
    ? { ...sampleResume, template: previewModalTemplate?.id || 'modern' }
    : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumeTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isActive={activeTemplateId === template.id}
            onSelect={onSelectTemplate}
            onPreview={(t) => setPreviewModalTemplate(t)}
          />
        ))}
      </div>

      {/* Full Preview Modal */}
      {previewModalTemplate && (
        <Modal
          isOpen={!!previewModalTemplate}
          onClose={() => setPreviewModalTemplate(null)}
          title={`${previewModalTemplate.name} Template Preview`}
          subtitle={previewModalTemplate.tagline}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD3] dark:border-[#352C25]">
              <div className="flex items-center gap-2 text-xs text-[#73675F] dark:text-[#BAADA0]">
                <span>Category: <strong className="text-[#231B15] dark:text-[#FAF5EE]">{previewModalTemplate.category}</strong></span>
                <span>•</span>
                <span>Font: <strong className="text-[#231B15] dark:text-[#FAF5EE]">{previewModalTemplate.font}</strong></span>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  onSelectTemplate(previewModalTemplate.id);
                  setPreviewModalTemplate(null);
                }}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                Use This Template
              </Button>
            </div>

            {/* Live A4 Sheet Preview inside modal */}
            <div className="max-h-[68vh] overflow-y-auto p-4 bg-[#F5EFE6] dark:bg-[#14110E] rounded-xl flex justify-center">
              <ResumePreview resume={previewResume} scale={0.85} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
