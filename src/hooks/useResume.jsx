import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { initialResume, initialSavedResumes } from '../data/mockResume';
import { calculateResumeScore, generateResumeId } from '../utils/resumeUtils';

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  // Load saved resumes list
  const [savedResumes, setSavedResumes] = useState(() => {
    try {
      const saved = localStorage.getItem('resumely_saved_resumes');
      return saved ? JSON.parse(saved) : initialSavedResumes;
    } catch {
      return initialSavedResumes;
    }
  });

  // Load current active resume
  const [currentResume, setCurrentResume] = useState(() => {
    try {
      const saved = localStorage.getItem('resumely_current_resume');
      return saved ? JSON.parse(saved) : initialResume;
    } catch {
      return initialResume;
    }
  });

  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving'
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const autosaveTimeoutRef = useRef(null);

  // Sync savedResumes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('resumely_saved_resumes', JSON.stringify(savedResumes));
    } catch (err) {
      console.warn('Failed to save resumes list', err);
    }
  }, [savedResumes]);

  // Sync currentResume to localStorage & auto-save to savedResumes list
  useEffect(() => {
    try {
      localStorage.setItem('resumely_current_resume', JSON.stringify(currentResume));
    } catch (err) {
      console.warn('Failed to save active resume', err);
    }

    setSaveStatus('saving');
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);

    autosaveTimeoutRef.current = setTimeout(() => {
      // Calculate updated score
      const updatedScore = calculateResumeScore(currentResume);
      const updatedResume = {
        ...currentResume,
        score: updatedScore,
        lastModified: new Date().toISOString(),
      };

      // Update in savedResumes list if it exists
      setSavedResumes(prev => {
        const index = prev.findIndex(r => r.id === updatedResume.id);
        if (index >= 0) {
          const next = [...prev];
          next[index] = updatedResume;
          return next;
        }
        return [updatedResume, ...prev];
      });

      setSaveStatus('saved');
    }, 600);

    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    };
  }, [currentResume]);

  // Helper to push history
  const pushState = useCallback((newResume) => {
    setUndoStack(prev => [...prev.slice(-20), currentResume]);
    setRedoStack([]);
    setCurrentResume(newResume);
  }, [currentResume]);

  // General field updater
  const updateResume = useCallback((updater) => {
    setCurrentResume(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      setUndoStack(u => [...u.slice(-20), prev]);
      setRedoStack([]);
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, prev.length - 1));
    setRedoStack(prev => [...prev, currentResume]);
    setCurrentResume(previous);
  }, [undoStack, currentResume]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, prev.length - 1));
    setUndoStack(prev => [...prev, currentResume]);
    setCurrentResume(next);
  }, [redoStack, currentResume]);

  // Field-specific updaters
  const updatePersonalInfo = useCallback((fields) => {
    updateResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...fields },
    }));
  }, [updateResume]);

  const updateSummary = useCallback((summary) => {
    updateResume(prev => ({ ...prev, summary }));
  }, [updateResume]);

  const setTemplate = useCallback((templateId) => {
    updateResume(prev => ({ ...prev, template: templateId }));
  }, [updateResume]);

  const setAccentColor = useCallback((accentColor) => {
    updateResume(prev => ({ ...prev, accentColor }));
  }, [updateResume]);

  const setFontFamily = useCallback((fontFamily) => {
    updateResume(prev => ({ ...prev, fontFamily }));
  }, [updateResume]);

  // Experience actions
  const addExperience = useCallback(() => {
    const newExp = {
      id: `exp-${Date.now()}`,
      jobTitle: "Software Engineer",
      company: "Company Name",
      location: "City, State",
      startDate: "2023-01",
      endDate: "",
      currentlyWorking: true,
      description: "• Engineered scalable features and improved key user metrics.",
    };
    updateResume(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
  }, [updateResume]);

  const updateExperience = useCallback((id, data) => {
    updateResume(prev => ({
      ...prev,
      experience: prev.experience.map(item => item.id === id ? { ...item, ...data } : item),
    }));
  }, [updateResume]);

  const removeExperience = useCallback((id) => {
    updateResume(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id),
    }));
  }, [updateResume]);

  const duplicateExperience = useCallback((id) => {
    updateResume(prev => {
      const item = prev.experience.find(e => e.id === id);
      if (!item) return prev;
      const clone = { ...item, id: `exp-${Date.now()}`, jobTitle: `${item.jobTitle} (Copy)` };
      const index = prev.experience.findIndex(e => e.id === id);
      const newExps = [...prev.experience];
      newExps.splice(index + 1, 0, clone);
      return { ...prev, experience: newExps };
    });
  }, [updateResume]);

  const moveExperience = useCallback((index, direction) => {
    updateResume(prev => {
      const exps = [...prev.experience];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= exps.length) return prev;
      const temp = exps[index];
      exps[index] = exps[target];
      exps[target] = temp;
      return { ...prev, experience: exps };
    });
  }, [updateResume]);

  // Education actions
  const addEducation = useCallback(() => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "B.S. in Computer Science",
      institution: "University Name",
      location: "City, State",
      startDate: "2019-09",
      endDate: "2023-05",
      description: "Relevant Coursework: Algorithms, Data Structures, Web Systems.",
    };
    updateResume(prev => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  }, [updateResume]);

  const updateEducation = useCallback((id, data) => {
    updateResume(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, ...data } : item),
    }));
  }, [updateResume]);

  const removeEducation = useCallback((id) => {
    updateResume(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id),
    }));
  }, [updateResume]);

  // Skills actions
  const addSkill = useCallback((name, category = "General") => {
    if (!name || !name.trim()) return;
    const newSkill = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: name.trim(),
      level: "Intermediate",
      category,
    };
    updateResume(prev => ({
      ...prev,
      skills: [...(prev.skills || []), newSkill],
    }));
  }, [updateResume]);

  const removeSkill = useCallback((id) => {
    updateResume(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id),
    }));
  }, [updateResume]);

  // Projects actions
  const addProject = useCallback(() => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: "New Project",
      technologies: "React, Node.js, Tailwind CSS",
      url: "https://example.com",
      github: "https://github.com/example",
      description: "Designed and implemented full-featured responsive web application.",
    };
    updateResume(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj],
    }));
  }, [updateResume]);

  const updateProject = useCallback((id, data) => {
    updateResume(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, ...data } : p),
    }));
  }, [updateResume]);

  const removeProject = useCallback((id) => {
    updateResume(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== id),
    }));
  }, [updateResume]);

  // Certifications actions
  const addCertification = useCallback(() => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: "Professional Certification",
      issuer: "Credential Authority",
      date: "2023-01",
      url: "",
    };
    updateResume(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert],
    }));
  }, [updateResume]);

  const updateCertification = useCallback((id, data) => {
    updateResume(prev => ({
      ...prev,
      certifications: (prev.certifications || []).map(c => c.id === id ? { ...c, ...data } : c),
    }));
  }, [updateResume]);

  const removeCertification = useCallback((id) => {
    updateResume(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter(c => c.id !== id),
    }));
  }, [updateResume]);

  // Section visibility toggle
  const toggleSection = useCallback((sectionKey) => {
    updateResume(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionKey]: !prev.sectionVisibility?.[sectionKey],
      },
    }));
  }, [updateResume]);

  // Manage all Resumes in account
  const createNewResume = useCallback((templateId = "modern", title = "Untitled Resume") => {
    const newResume = {
      ...initialResume,
      id: generateResumeId(),
      title,
      template: templateId,
      lastModified: new Date().toISOString(),
      score: 75,
    };
    setSavedResumes(prev => [newResume, ...prev]);
    setCurrentResume(newResume);
    return newResume;
  }, []);

  const duplicateResume = useCallback((id) => {
    const target = savedResumes.find(r => r.id === id) || currentResume;
    const duplicated = {
      ...target,
      id: generateResumeId(),
      title: `${target.title} (Copy)`,
      lastModified: new Date().toISOString(),
    };
    setSavedResumes(prev => [duplicated, ...prev]);
    return duplicated;
  }, [savedResumes, currentResume]);

  const deleteResume = useCallback((id) => {
    setSavedResumes(prev => {
      const remaining = prev.filter(r => r.id !== id);
      if (currentResume.id === id) {
        if (remaining.length > 0) {
          setCurrentResume(remaining[0]);
        } else {
          const fresh = { ...initialResume, id: generateResumeId(), title: "My Resume" };
          setCurrentResume(fresh);
          return [fresh];
        }
      }
      return remaining;
    });
  }, [currentResume.id]);

  const loadResume = useCallback((id) => {
    const found = savedResumes.find(r => r.id === id);
    if (found) {
      setCurrentResume(found);
      setUndoStack([]);
      setRedoStack([]);
      return true;
    }
    return false;
  }, [savedResumes]);

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        savedResumes,
        saveStatus,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
        undo,
        redo,
        updateResume,
        updatePersonalInfo,
        updateSummary,
        setTemplate,
        setAccentColor,
        setFontFamily,
        addExperience,
        updateExperience,
        removeExperience,
        duplicateExperience,
        moveExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        toggleSection,
        createNewResume,
        duplicateResume,
        deleteResume,
        loadResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
