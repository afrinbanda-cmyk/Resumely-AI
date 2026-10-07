import React from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Link2, GitFork, Image } from 'lucide-react';

export default function PersonalInfoForm({ personalInfo = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Johnson"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            Professional Title *
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.jobTitle || ''}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g. Senior Full-Stack Developer"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={personalInfo.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex@example.com"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            Phone
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={personalInfo.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            LinkedIn URL
          </label>
          <div className="relative">
            <Link2 className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            GitHub URL
          </label>
          <div className="relative">
            <GitFork className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#73675F] dark:text-[#BAADA0] mb-1">
            Portfolio / Website
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-[#9E9187] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalInfo.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://portfolio.dev"
              className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE] focus:ring-2 focus:ring-[#E39A7B]/30 focus:border-[#E39A7B] outline-hidden transition-all"
            />
          </div>
        </div>
      </div>

      {/* Optional Photo Toggle */}
      <div className="pt-2 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!personalInfo.showPhoto}
            onChange={(e) => handleChange('showPhoto', e.target.checked)}
            className="w-4 h-4 rounded text-[#E39A7B] focus:ring-[#E39A7B] border-[#E8DFD3] dark:border-[#382F27]"
          />
          <span className="text-xs font-medium text-[#73675F] dark:text-[#BAADA0]">Include profile headshot</span>
        </label>

        {personalInfo.showPhoto && (
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={personalInfo.photoUrl || ''}
              onChange={(e) => handleChange('photoUrl', e.target.value)}
              placeholder="Image URL (https://...)"
              className="w-full px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-[#201C18] border border-[#E8DFD3] dark:border-[#382F27] text-[#231B15] dark:text-[#FAF5EE]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

