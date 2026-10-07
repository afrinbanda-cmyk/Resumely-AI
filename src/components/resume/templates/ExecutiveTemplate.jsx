import React from 'react';
import { formatDateRange } from '../../../utils/resumeUtils';

export default function ExecutiveTemplate({ resume }) {
  const {
    personalInfo = {},
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    sectionVisibility = {},
    accentColor = '#DBB06B',
  } = resume;

  return (
    <div className="w-full bg-white text-[#211B17] p-8 sm:p-11 font-serif text-[13px] leading-relaxed">
      {/* Executive Banner Header */}
      <div className="border-b-4 border-[#DBB06B] pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14100C] uppercase">
              {personalInfo.fullName || 'Alex Johnson'}
            </h1>
            <p className="text-sm font-semibold tracking-widest text-[#9E7227] uppercase mt-1">
              {personalInfo.jobTitle || 'Executive Engineering Leader'}
            </p>
          </div>

          <div className="text-xs text-right sm:text-right font-sans text-[#54483E] space-y-0.5">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.linkedin && (
              <div className="text-[#9E7227]">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Executive Summary */}
        {sectionVisibility.summary !== false && summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9E7227] border-b border-[#E8DFD3] pb-1 mb-2">
              Executive Profile &amp; Value Proposition
            </h2>
            <p className="text-xs text-[#2E251E] leading-relaxed font-sans">{summary}</p>
          </div>
        )}

        {/* Executive Core Competencies Matrix */}
        {sectionVisibility.skills !== false && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9E7227] border-b border-[#E8DFD3] pb-1 mb-2.5">
              Core Competencies &amp; Strategic Capabilities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-sans text-xs">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-1.5 rounded bg-[#FAF6F0] border-l-2 border-[#DBB06B] text-[#241E19] font-medium"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Experience */}
        {sectionVisibility.experience !== false && experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9E7227] border-b border-[#E8DFD3] pb-1 mb-3">
              Leadership Experience &amp; Career Trajectory
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#14100C]">{exp.jobTitle}</span>
                    <span className="text-xs font-sans text-[#78695E]">
                      {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                    </span>
                  </div>
                  <div className="text-xs font-sans text-[#54483E] font-medium mb-1.5">
                    <span className="text-[#9E7227] font-semibold">{exp.company}</span>
                    {exp.location ? ` | ${exp.location}` : ''}
                  </div>
                  <div className="text-xs text-[#2E251E] font-sans whitespace-pre-line leading-relaxed pl-1">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Credentials */}
        {sectionVisibility.education !== false && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#9E7227] border-b border-[#E8DFD3] pb-1 mb-2">
              Education &amp; Credentials
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline font-sans text-xs">
                  <div>
                    <span className="font-bold text-[#14100C]">{edu.degree}</span>
                    <span className="text-[#54483E]"> — {edu.institution}</span>
                  </div>
                  <span className="text-[#78695E]">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
