import React, { forwardRef } from 'react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import DeveloperTemplate from './templates/DeveloperTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

const ResumePreview = forwardRef(function ResumePreview(
  { resume, scale = 1, className = '', isPrint = false },
  ref
) {
  if (!resume) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center p-8 bg-white dark:bg-[#1E1A16] rounded-2xl border border-dashed border-[#E8DFD3] dark:border-[#382F27] text-center">
        <p className="text-sm font-semibold text-[#73675F] dark:text-[#BAADA0]">No resume data found</p>
        <p className="text-xs text-[#9E9187] mt-1">Start editing on the left to see your live preview.</p>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (resume.template) {
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      case 'developer':
        return <DeveloperTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'executive':
        return <ExecutiveTemplate resume={resume} />;
      case 'modern':
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <div
      className={`transition-transform duration-200 origin-top flex justify-center ${className}`}
      style={{
        transform: isPrint ? 'none' : `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      {/* Real A4 Paper Document with realistic shadow & print boundaries */}
      <div
        ref={ref}
        id="resume-a4-document"
        className="resume-a4-page bg-white text-[#1C1714] shadow-[0_12px_40px_rgba(35,27,21,0.14)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.55)] border border-[#E8DFD3]/70 overflow-hidden print:border-none print:shadow-none print:m-0"
        style={{
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
});

export default ResumePreview;
