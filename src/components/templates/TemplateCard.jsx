import React from 'react';
import { Check, Eye, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function TemplateCard({
  template,
  isActive = false,
  onSelect,
  onPreview,
}) {
  return (
    <div
      className={`group relative rounded-2xl bg-white dark:bg-[#1E1A16] border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl ${
        isActive
          ? 'border-[#E39A7B] ring-2 ring-[#E39A7B]/30 shadow-md'
          : 'border-[#E8DFD3] dark:border-[#382F27] hover:border-[#E39A7B]/60'
      }`}
    >
      {/* Category / Active Badge */}
      <div className="absolute top-3 left-3 z-10 flex gap-1.5">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
          {template.category}
        </span>
        {isActive && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-[#E39A7B] text-white flex items-center gap-1 shadow-xs">
            <Check className="w-3 h-3" /> Active
          </span>
        )}
      </div>

      {/* Miniature Visual Representation */}
      <div
        className={`relative h-56 w-full bg-gradient-to-br ${template.previewBg} p-4 flex flex-col justify-between overflow-hidden border-b border-[#E8DFD3] dark:border-[#352C25]`}
      >
        {/* Abstract mini paper sheet */}
        <div className="w-4/5 mx-auto h-full bg-white shadow-md rounded-t-lg p-3 text-[5px] flex flex-col gap-1.5 border border-[#E8DFD3]/60 transform transition-transform group-hover:scale-105 duration-300">
          {/* Header representation */}
          <div className="flex justify-between items-center pb-1 border-b border-[#EAE2D8]">
            <div className="w-16 h-2 rounded-xs" style={{ backgroundColor: template.accent }} />
            <div className="w-8 h-1 bg-[#D0C6B8] rounded-xs" />
          </div>
          {/* Lines */}
          <div className="space-y-1">
            <div className="w-full h-1 bg-[#E8E0D5] rounded-xs" />
            <div className="w-5/6 h-1 bg-[#E8E0D5] rounded-xs" />
            <div className="w-4/6 h-1 bg-[#E8E0D5] rounded-xs" />
          </div>
          <div className="pt-1 border-t border-[#EAE2D8] space-y-1">
            <div className="w-12 h-1.5 rounded-xs" style={{ backgroundColor: template.accent }} />
            <div className="w-full h-1 bg-[#E8E0D5] rounded-xs" />
            <div className="w-3/4 h-1 bg-[#E8E0D5] rounded-xs" />
          </div>
        </div>

        {/* Hover overlay with action buttons */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onPreview(template)}
            leftIcon={<Eye className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Preview
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onSelect(template.id)}
            leftIcon={<Check className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Use Template
          </Button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-[#231B15] dark:text-[#FAF5EE]">
              {template.name}
            </h4>
            <div
              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: template.accent }}
              title={`Accent: ${template.accent}`}
            />
          </div>
          <p className="text-xs text-[#73675F] dark:text-[#BAADA0] leading-relaxed line-clamp-2 mb-2">
            {template.tagline}
          </p>
          <div className="text-[11px] font-medium text-[#C87553] dark:text-[#F3AB8F]">
            Best for: {template.bestFor}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onPreview(template)}
            className="text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] dark:hover:text-[#FAF5EE] cursor-pointer"
          >
            Full Preview
          </button>
          <Button
            size="sm"
            variant={isActive ? 'secondary' : 'primary'}
            onClick={() => onSelect(template.id)}
            className="text-xs"
          >
            {isActive ? 'Current' : 'Select'}
          </Button>
        </div>
      </div>
    </div>
  );
}
