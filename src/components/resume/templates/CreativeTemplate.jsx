import React from 'react';
import { Mail, Phone, MapPin, Globe, Link2, GitFork } from 'lucide-react';
import { formatDateRange } from '../../../utils/resumeUtils';

export default function CreativeTemplate({ resume }) {
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
    accentColor = '#FFB5AB',
  } = resume;

  return (
    <div className="w-full bg-white text-[#1E1915] flex flex-col sm:flex-row min-h-full">
      {/* Left Sidebar (Warm Accent Bar) */}
      <div className="w-full sm:w-1/3 bg-[#FAF3EC] border-b sm:border-b-0 sm:border-r border-[#E8DFD3] p-6 sm:p-7 space-y-6 shrink-0">
        {/* Profile Details */}
        <div className="text-center sm:text-left">
          {personalInfo.showPhoto && personalInfo.photoUrl ? (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full mx-auto sm:mx-0 object-cover border-2 border-[#E39A7B] mb-3 shadow-xs"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#E39A7B]/20 text-[#E39A7B] font-bold text-xl flex items-center justify-center mx-auto sm:mx-0 mb-3">
              {(personalInfo.fullName || 'AJ')
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
          )}

          <h1 className="text-xl font-black text-[#14100C] leading-tight">
            {personalInfo.fullName || 'Alex Johnson'}
          </h1>
          <p className="text-xs font-semibold text-[#C87553] mt-1 uppercase tracking-wider">
            {personalInfo.jobTitle || 'Senior Full-Stack Developer'}
          </p>
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-xs text-[#52463D]">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#A0602F] border-b border-[#E8DFD3] pb-1">
            Contact
          </h2>
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C87553] shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C87553] shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C87553] shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#C87553] shrink-0" />
              <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Link2 className="w-3.5 h-3.5 text-[#C87553] shrink-0" />
              <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {sectionVisibility.skills !== false && skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#A0602F] border-b border-[#E8DFD3] pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-[#2B231D] border border-[#E0D4C5]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education in sidebar */}
        {sectionVisibility.education !== false && education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#A0602F] border-b border-[#E8DFD3] pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-[#14100C] text-xs">{edu.degree}</p>
                  <p className="text-[11px] text-[#52463D]">{edu.institution}</p>
                  <p className="text-[10px] text-[#7A6C60]">{formatDateRange(edu.startDate, edu.endDate, false)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in sidebar */}
        {sectionVisibility.languages !== false && languages.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#A0602F] border-b border-[#E8DFD3] pb-1">
              Languages
            </h2>
            <div className="space-y-1 text-xs text-[#52463D]">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-medium">{l.language}</span>
                  <span className="text-[#7A6C60]">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Column */}
      <div className="w-full sm:w-2/3 p-6 sm:p-8 space-y-6">
        {/* Summary */}
        {sectionVisibility.summary !== false && summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C87553] mb-2 flex items-center gap-2">
              <span>About Me</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <p className="text-xs text-[#3E352E] leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {sectionVisibility.experience !== false && experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C87553] mb-3 flex items-center gap-2">
              <span>Experience</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2 border-[#E39A7B]/40">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-xs text-[#14100C]">{exp.jobTitle}</span>
                    <span className="text-[11px] text-[#7A6C60]">
                      {formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}
                    </span>
                  </div>
                  <div className="text-xs text-[#52463D] font-medium mb-1">
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  <div className="text-xs text-[#3E352E] whitespace-pre-line leading-relaxed">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#C87553] mb-3 flex items-center gap-2">
              <span>Portfolio &amp; Projects</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </h2>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8DFD3]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-xs text-[#14100C]">{p.name}</span>
                    {p.technologies && <span className="text-[11px] text-[#A0602F]">{p.technologies}</span>}
                  </div>
                  <p className="text-xs text-[#3E352E] mt-1 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

