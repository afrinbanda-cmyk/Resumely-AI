import React from 'react';
import { Terminal, GitFork, Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { formatDateRange } from '../../../utils/resumeUtils';

export default function DeveloperTemplate({ resume }) {
  const {
    personalInfo = {},
    summary,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    sectionVisibility = {},
    accentColor = '#E39A7B',
  } = resume;

  return (
    <div className="w-full bg-white text-[#1C1815] p-8 sm:p-10 font-mono text-[12.5px] leading-relaxed">
      {/* Dev Terminal Header */}
      <div className="bg-[#FAF6F0] border border-[#E5DACD] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DACD]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFB5AB]" />
            <div className="w-3 h-3 rounded-full bg-[#DBB06B]" />
            <div className="w-3 h-3 rounded-full bg-[#A8D5BA]" />
            <span className="text-[11px] text-[#7A6C60] ml-2 flex items-center gap-1 font-mono">
              <Terminal className="w-3 h-3 text-[#E39A7B]" /> dev://resume.config.json
            </span>
          </div>
          <span className="text-[10px] text-[#8C7D70] font-mono">v4.2.0</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#14100C]">
              {personalInfo.fullName || 'Alex Johnson'}
            </h1>
            <p className="text-xs font-semibold mt-0.5" style={{ color: accentColor }}>
              $ role --title &quot;{personalInfo.jobTitle || 'Senior Full-Stack Developer'}&quot;
            </p>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#5A4E44]">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#8C7D70]" /> {personalInfo.email}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3 text-[#8C7D70]" /> {personalInfo.github.replace(/^https?:\/\//, '')}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#8C7D70]" /> {personalInfo.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 font-sans">
        {/* Summary */}
        {sectionVisibility.summary !== false && summary && (
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs font-bold text-[#14100C]">
              <span className="text-[#E39A7B]">&gt;</span>
              <span className="uppercase tracking-wider">SUMMARY</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </div>
            <p className="text-xs text-[#3E352E] leading-relaxed font-mono">{summary}</p>
          </div>
        )}

        {/* Technical Skills - High Priority for Dev */}
        {sectionVisibility.skills !== false && skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#14100C]">
              <span className="text-[#E39A7B]">&gt;</span>
              <span className="uppercase tracking-wider">TECH_STACK &amp; SKILLS</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#FAF6F0] text-[#2B231D] border border-[#DFD3C5]"
                >
                  <span className="text-[#E39A7B] font-bold">#</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {sectionVisibility.experience !== false && experience.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs font-bold text-[#14100C]">
              <span className="text-[#E39A7B]">&gt;</span>
              <span className="uppercase tracking-wider">EXPERIENCE</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </div>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="font-bold text-xs text-[#14100C]">{exp.jobTitle} @ {exp.company}</span>
                    <span className="text-[11px] text-[#7A6C60]">
                      [{formatDateRange(exp.startDate, exp.endDate, exp.currentlyWorking)}]
                    </span>
                  </div>
                  {exp.location && <div className="text-[11px] text-[#7A6C60] mb-1 font-mono">{exp.location}</div>}
                  <div className="text-xs text-[#382E26] whitespace-pre-line leading-relaxed font-mono pl-2 border-l-2 border-[#E5DACD]">
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
            <div className="flex items-center gap-2 mb-2.5 font-mono text-xs font-bold text-[#14100C]">
              <span className="text-[#E39A7B]">&gt;</span>
              <span className="uppercase tracking-wider">FEATURED_PROJECTS</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((p) => (
                <div key={p.id} className="p-2.5 rounded-lg bg-[#FAF6F0]/70 border border-[#E5DACD]">
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="font-bold text-xs text-[#14100C]">{p.name}</span>
                    {p.url && (
                      <span className="text-[10px] text-[#E39A7B] flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" /> preview
                      </span>
                    )}
                  </div>
                  {p.technologies && (
                    <div className="text-[11px] font-mono text-[#7A6C60] my-0.5">
                      stack: [{p.technologies}]
                    </div>
                  )}
                  <p className="text-xs text-[#3E352E] font-mono">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certs */}
        {sectionVisibility.education !== false && education.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#14100C]">
              <span className="text-[#E39A7B]">&gt;</span>
              <span className="uppercase tracking-wider">EDUCATION</span>
              <span className="flex-1 h-px bg-[#EAE2D8]" />
            </div>
            {education.map((edu) => (
              <div key={edu.id} className="font-mono text-xs">
                <span className="font-bold text-[#14100C]">{edu.degree}</span>
                <span className="text-[#685B50]"> — {edu.institution} ({formatDateRange(edu.startDate, edu.endDate, false)})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

