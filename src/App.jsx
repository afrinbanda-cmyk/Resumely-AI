import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { ResumeProvider } from './hooks/useResume';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import Templates from './pages/Templates';
import MyResumes from './pages/MyResumes';
import AIAnalysis from './pages/AIAnalysis';
import Settings from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            {/* Public pages (no sidebar) */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Application pages (with sidebar layout) */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder" element={<ResumeBuilder />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/my-resumes" element={<MyResumes />} />
              <Route path="/ai-analysis" element={<AIAnalysis />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ResumeProvider>
    </ThemeProvider>
  );
}
