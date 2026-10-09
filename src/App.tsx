import React from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import BachelorPitch from './pages/BachelorPitch';

export const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/bachelor-pitch', label: t('nav.bachelorPitch') },
  ];

  return (
    <div className="min-h-screen bg-white text-fintech-primary flex flex-col font-sans selection:bg-electric-light selection:text-electric">
      {/* Sleek Minimalist FinTech Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-sm font-semibold tracking-tight">
            <span className="w-2.5 h-2.5 rounded-full bg-electric inline-block"></span>
            <span className="text-fintech-primary">Steve Benjamin</span>
            <span className="text-xs text-fintech-muted font-normal hidden sm:inline">| Media Engineering</span>
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <nav className="flex items-center space-x-1 sm:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-electric bg-electric-light/80'
                        : 'text-fintech-secondary hover:text-fintech-primary hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-2.5 py-1 text-xs font-mono font-medium rounded border border-slate-200 text-fintech-secondary hover:text-electric hover:border-electric transition-colors"
              title="Toggle EN / FR"
            >
              {i18n.language?.toUpperCase().slice(0, 2) === 'FR' ? 'FR' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/bachelor-pitch" element={<BachelorPitch />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Subtle Minimal Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-fintech-muted">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Steve Benjamin — Bussigny, Switzerland</span>
          <span className="font-mono text-[11px] text-slate-400">Light FinTech Architecture • React 18 & Vite</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
