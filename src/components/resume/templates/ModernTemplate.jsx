import React from 'react';
import { Mail, Phone, MapPin, Globe, Link2, GitFork, ExternalLink } from 'lucide-react';
import { formatDateRange } from '../../../utils/resumeUtils';

export default function ModernTemplate({ resume }) {
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
    interests = [],
    references = [],
    sectionVisibility = {},
    accentColor = '#E39A7B',
    fontFamily = 'sans',
  } = resume;

  const fontClass =
    fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  return (
    <div className={`w-full bg-white text-[#1C1714] p-8 sm:p-10 ${fontClass} text-[13px] leading-relaxed`}>
      {/* Top Header */}
      <div className="border-b-2 pb-6 mb-6" style={{ borderColor: accentColor }}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#14110E] uppercase">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-base font-semibold tracking-wide mt-1" style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Professional Title'}
            </p>

            {/* Contact details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-[#524840]">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#88786C]" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#88786C]" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#88786C]" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#88786C]" />
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#88786C]" />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5">
                  <GitFork className="w-3.5 h-3.5 text-[#88786C]" />
                  <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
            </div>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-xl object-cover border-2 shadow-xs shrink-0"
              style={{ borderColor: accentColor }}
            />
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-6">
        {/* Professional Summary */}
        {sectionVisibility.summary !== false && summary && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>Professional Summary</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <p className="text-[#3A322C] text-xs leading-normal">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {sectionVisibility.experience !== false && experience.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>Work Experience</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-[#1F1A16] text-[13px]">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-medium text-[#7A6C60] whitespace-nowrap">
                      {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5C5046] font-medium mb-1.5">
                    <span>{exp.company}</span>
                    {exp.location && <span>• {exp.location}</span>}
                  </div>
                  <div className="text-xs text-[#3E352E] whitespace-pre-line leading-relaxed pl-1">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {sectionVisibility.projects !== false && projects.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>Key Projects</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-[#1F1A16] text-[13px]">{proj.name}</span>
                    {proj.url && (
                      <span className="text-[11px] text-[#6E6054] flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" />
                        {proj.url.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <div className="text-[11px] font-semibold text-[#8B7A6C] mb-1">
                      Technologies: {proj.technologies}
                    </div>
                  )}
                  <p className="text-xs text-[#3E352E] leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {sectionVisibility.education !== false && education.length > 0 && (
          <div>
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>Education</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-[#1F1A16] text-[13px]">{edu.degree}</h3>
                    <p className="text-xs text-[#5C5046]">
                      {edu.institution} {edu.location ? `• ${edu.location}` : ''}
                    </p>
                    {edu.description && <p className="text-[11px] text-[#7A6C60] mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-[11px] font-medium text-[#7A6C60] whitespace-nowrap">
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
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <span>Skills & Competencies</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F4EDE5] text-[#2B231D] border border-[#E4D7CA]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sectionVisibility.certifications !== false && certifications.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: accentColor }}
              >
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs text-[#3E352E]">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-semibold text-[#1F1A16]">{c.name}</p>
                    <p className="text-[11px] text-[#7A6C60]">
                      {c.issuer} {c.date ? `• ${c.date}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sectionVisibility.languages !== false && languages.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: accentColor }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-2 text-xs text-[#3E352E]">
                {languages.map((l) => (
                  <span key={l.id} className="font-medium">
                    {l.language} <span className="text-[#88786C]">({l.proficiency})</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

