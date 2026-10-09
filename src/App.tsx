import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BachelorPitch from './pages/BachelorPitch';

export const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/bachelor-pitch" element={<BachelorPitch />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
