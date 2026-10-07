export function generateResumeId() {
  return `resume-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

export function calculateResumeScore(resume) {
  if (!resume) return 0;
  let score = 30; // base score

  // Personal Info checks (max 20)
  const p = resume.personalInfo || {};
  if (p.fullName && p.fullName.trim().length > 2) score += 5;
  if (p.jobTitle && p.jobTitle.trim().length > 2) score += 5;
  if (p.email && p.email.includes('@')) score += 4;
  if (p.phone && p.phone.trim().length > 5) score += 3;
  if (p.linkedin || p.github || p.website) score += 3;

  // Summary check (max 15)
  if (resume.summary && resume.summary.length > 50) {
    score += 10;
    if (resume.summary.length > 120) score += 5;
  }

  // Experience checks (max 20)
  const exps = resume.experience || [];
  if (exps.length > 0) score += 8;
  if (exps.length >= 2) score += 6;
  const hasMetrics = exps.some(e => e.description && /\d+%|\d+x|\$\d+|\d+\+|\d+M|\d+k/i.test(e.description));
  if (hasMetrics) score += 6;

  // Education (max 10)
  if (resume.education && resume.education.length > 0) score += 10;

  // Skills (max 10)
  const sk = resume.skills || [];
  if (sk.length >= 4) score += 5;
  if (sk.length >= 8) score += 5;

  // Projects / Certs (max 5)
  if ((resume.projects && resume.projects.length > 0) || (resume.certifications && resume.certifications.length > 0)) {
    score += 5;
  }

  return Math.min(100, Math.max(20, score));
}

export function formatDateRange(startDate, endDate, currentlyWorking) {
  const formatMonth = (val) => {
    if (!val) return '';
    try {
      const [year, month] = val.split('-');
      if (!year) return val;
      if (!month) return year;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(month, 10) - 1] || month} ${year}`;
    } catch {
      return val;
    }
  };

  const start = formatMonth(startDate);
  if (currentlyWorking) {
    return `${start || 'Present'} — Present`;
  }
  const end = formatMonth(endDate);
  if (!start && !end) return '';
  return `${start || ''} — ${end || 'Present'}`;
}
