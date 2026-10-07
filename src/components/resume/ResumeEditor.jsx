import React, { useState } from 'react';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  FolderGit2,
  Layers,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import AdditionalSectionsForm from './AdditionalSectionsForm';

export default function ResumeEditor({
  resume,
  onUpdateResume,
  onUpdatePersonalInfo,
  onUpdateSummary,
  onAddExperience,
  onUpdateExperience,
  onRemoveExperience,
  onDuplicateExperience,
  onMoveExperience,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onAddSkill,
  onRemoveSkill,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
  onAddCertification,
  onUpdateCertification,
  onRemoveCertification,
  onToggleSection,
  onOpenAiAssistant,
}) {
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    more: false,
  });

  const toggleSectionOpen = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionCards = [
    {
      id: 'personalInfo',
      title: 'Personal Information',
      icon: User,
      count: resume.personalInfo?.fullName ? '1' : 'Incomplete',
      component: (
        <PersonalInfoForm
          personalInfo={resume.personalInfo}
          onChange={onUpdatePersonalInfo}
        />
      ),
    },
    {
      id: 'summary',
      title: 'Professional Summary',
      icon: FileText,
      count: resume.summary ? `${resume.summary.length} chars` : 'Empty',
      component: (
        <SummaryForm
          summary={resume.summary}
          onChange={onUpdateSummary}
          onOpenAiModal={onOpenAiAssistant}
        />
      ),
    },
    {
      id: 'experience',
      title: 'Work Experience',
      icon: Briefcase,
      count: `${resume.experience?.length || 0} entries`,
      component: (
        <ExperienceForm
          experience={resume.experience}
          onAdd={onAddExperience}
          onUpdate={onUpdateExperience}
          onRemove={onRemoveExperience}
          onDuplicate={onDuplicateExperience}
          onMove={onMoveExperience}
        />
      ),
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      count: `${resume.education?.length || 0} degrees`,
      component: (
        <EducationForm
          education={resume.education}
          onAdd={onAddEducation}
          onUpdate={onUpdateEducation}
          onRemove={onRemoveEducation}
        />
      ),
    },
    {
      id: 'skills',
      title: 'Skills & Competencies',
      icon: Code2,
      count: `${resume.skills?.length || 0} skills`,
      component: (
        <SkillsForm
          skills={resume.skills}
          onAddSkill={onAddSkill}
          onRemoveSkill={onRemoveSkill}
        />
      ),
    },
    {
      id: 'projects',
      title: 'Key Projects',
      icon: FolderGit2,
      count: `${resume.projects?.length || 0} projects`,
      component: (
        <ProjectsForm
          projects={resume.projects}
          onAdd={onAddProject}
          onUpdate={onUpdateProject}
          onRemove={onRemoveProject}
        />
      ),
    },
    {
      id: 'more',
      title: 'Additional Sections (Certs, Awards, Languages)',
      icon: Layers,
      count: `${(resume.certifications?.length || 0) + (resume.languages?.length || 0)} items`,
      component: (
        <AdditionalSectionsForm
          resume={resume}
          onUpdateResume={onUpdateResume}
          onAddCertification={onAddCertification}
          onUpdateCertification={onUpdateCertification}
          onRemoveCertification={onRemoveCertification}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4 pb-12">
      {sectionCards.map((section) => {
        const Icon = section.icon;
        const isOpen = openSections[section.id];
        const isVisible =
          section.id === 'more'
            ? true
            : resume.sectionVisibility?.[section.id] !== false;

        return (
          <div
            key={section.id}
            className="rounded-2xl bg-white dark:bg-[#1E1A16] border border-[#E8DFD3] dark:border-[#382F27] shadow-xs overflow-hidden transition-all"
          >
            {/* Collapsible Section Header */}
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FAF8F3] dark:hover:bg-[#28221D] transition-colors select-none">
              <div
                onClick={() => toggleSectionOpen(section.id)}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="p-2 rounded-xl bg-[#FAF6F0] dark:bg-[#2A231C] text-[#E39A7B] shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#231B15] dark:text-[#FAF5EE] truncate">
                    {section.title}
                  </h3>
                  <span className="text-[11px] text-[#73675F] dark:text-[#BAADA0]">
                    {section.count}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {section.id !== 'personalInfo' && section.id !== 'more' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSection(section.id);
                    }}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isVisible
                        ? 'text-[#73675F] dark:text-[#BAADA0] hover:text-[#231B15] hover:bg-[#F5EFE6]'
                        : 'text-amber-600 bg-amber-500/10'
                    }`}
                    title={isVisible ? 'Hide from resume preview' : 'Show on resume preview'}
                  >
                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => toggleSectionOpen(section.id)}
                  className="p-1 rounded text-[#73675F] dark:text-[#BAADA0]"
                >
                  {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Section Content Form */}
            {isOpen && (
              <div className="p-4 pt-1 border-t border-[#E8DFD3]/80 dark:border-[#352C25]/80 animate-in fade-in duration-150">
                {section.component}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
