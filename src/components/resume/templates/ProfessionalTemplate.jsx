import React from 'react';
import { formatDateRange } from '../../../utils/resumeUtils';

export default function ProfessionalTemplate({ resume }) {
  const {
    personalInfo = {},
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    sectionVisibility = {},
    accentColor = '#DBB06B',
  } = resume;

  return (
    <div className="w-full bg-white text-[#211C18] p-8 sm:p-11 font-serif text-[13px] leading-relaxed">
      {/* Top Formal Header */}
      <div className="text-center pb-5 mb-5 border-b-2 border-[#1E1915]">
        <h1 className="text-3xl font-bold tracking-tight text-[#14100C]">
          {personalInfo.fullName || 'Alex Johnson'}
        </h1>
        <p className="text-sm font-semibold tracking-wider text-[#63554A] uppercase mt-1">
          {personalInfo.jobTitle || 'Senior Full-Stack Developer'}
        </p>

        {/* Contact info bar */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2.5 text-xs text-[#52463D] font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
          {personalInfo.linkedin && (
            <span>| {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
          {personalInfo.website && (
            <span>| {personalInfo.website.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Summary */}
        {sectionVisibility.summary !== false && summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#14100C] border-b border-[#D6CBC0] pb-1 mb-2">
              Executive Profile
            </h2>
            <p className="text-xs text-[#2E2722] leading-normal font-sans">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {sectionVisibility.experience !== false && experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#14100C] border-b border-[#D6CBC0] pb-1 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#14100C]">{exp.company}</span>
                    <span className="text-xs font-sans text-[#6B5D52]">
                      {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs text-[#4E4137] italic mb-1.5">
                    <span>{exp.jobTitle}</span>
                    {exp.location && <span className="font-sans not-italic text-[#6B5D52]">{exp.location}</span>}
                  </div>
                  <div className="text-xs text-[#2E2722] font-sans whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {sectionVisibility.education !== false && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#14100C] border-b border-[#D6CBC0] pb-1 mb-2.5">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-xs text-[#14100C]">{edu.institution}</span>
                    <span className="text-xs text-[#4E4137] font-sans"> — {edu.degree}</span>
                    {edu.description && <p className="text-[11px] text-[#6B5D52] font-sans mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-xs font-sans text-[#6B5D52]">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {sectionVisibility.skills !== false && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#14100C] border-b border-[#D6CBC0] pb-1 mb-2">
              Areas of Expertise
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4 text-xs font-sans text-[#2E2722]">
              {skills.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects / Certifications */}
        {sectionVisibility.projects !== false && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#14100C] border-b border-[#D6CBC0] pb-1 mb-2">
              Key Projects
            </h2>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-xs text-[#14100C]">{p.name}</span>
                    {p.technologies && <span className="text-[11px] font-sans text-[#6B5D52]">{p.technologies}</span>}
                  </div>
                  <p className="text-xs text-[#2E2722] font-sans leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
