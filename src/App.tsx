import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BachelorPitch from './pages/BachelorPitch';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/bachelor-pitch" element={<BachelorPitch />} />
        {/* Redirects to single-page anchors */}
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
