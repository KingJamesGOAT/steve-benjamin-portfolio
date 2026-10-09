import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BachelorPitch from './pages/BachelorPitch';

export const App: React.FC = () => {
  return (
    <MainLayout>
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
