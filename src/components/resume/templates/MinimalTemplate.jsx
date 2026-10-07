import React from 'react';
import { formatDateRange } from '../../../utils/resumeUtils';

export default function MinimalTemplate({ resume }) {
  const {
    personalInfo = {},
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    languages = [],
    sectionVisibility = {},
    accentColor = '#231B15',
    fontFamily = 'sans',
  } = resume;

  const fontClass =
    fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  return (
    <div className={`w-full bg-white text-[#201B17] p-8 sm:p-11 ${fontClass} text-[13px] leading-relaxed`}>
      {/* Centered Minimal Header */}
      <div className="text-center pb-6 mb-7 border-b border-[#E8E2D9]">
        <h1 className="text-3xl font-light tracking-wide text-[#14110E]">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-sm font-medium tracking-widest text-[#73675F] uppercase mt-1">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-3 text-xs text-[#73675F]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.linkedin && (
            <span>• {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {sectionVisibility.summary !== false && summary && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#73675F] mb-1.5">
              Profile
            </h2>
            <p className="text-xs text-[#3E352E] leading-relaxed font-light">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {sectionVisibility.experience !== false && experience.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#73675F] mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-xs text-[#14110E]">{exp.jobTitle}</span>
                    <span className="text-[11px] text-[#88786C]">
                      {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                    </span>
                  </div>
                  <div className="text-xs text-[#524840] italic mb-1">{exp.company} {exp.location ? `, ${exp.location}` : ''}</div>
                  <div className="text-xs text-[#3E352E] whitespace-pre-line leading-relaxed font-light">
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
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#73675F] mb-2.5">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <p className="font-semibold text-xs text-[#14110E]">{edu.degree}</p>
                    <p className="text-xs text-[#63554A] font-light">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
                  </div>
                  <span className="text-[11px] text-[#88786C]">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {sectionVisibility.projects !== false && projects.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#73675F] mb-2.5">
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-xs text-[#14110E]">{p.name}</span>
                    {p.technologies && <span className="text-[11px] text-[#88786C]">{p.technologies}</span>}
                  </div>
                  <p className="text-xs text-[#3E352E] font-light leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {sectionVisibility.skills !== false && skills.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#73675F] mb-1.5">
              Skills
            </h2>
            <p className="text-xs text-[#3E352E] leading-relaxed">
              {skills.map((s) => s.name).join('  •  ')}
            </p>
          </div>
        )}

        {/* Certifications & Languages */}
        {sectionVisibility.certifications !== false && certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#73675F] mb-1.5">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-x-4 text-xs text-[#3E352E]">
              {certifications.map((c) => (
                <span key={c.id}>
                  {c.name} ({c.issuer})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
