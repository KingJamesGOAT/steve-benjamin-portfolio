import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import CommandPalette from '../features/CommandPalette';
import useCtrlK from '../../hooks/useCtrlK';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isOpen, close, open } = useCtrlK();
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  return (
    <div className="min-h-screen bg-white text-fintech-primary flex flex-col font-sans selection:bg-electric-light selection:text-electric">
      {/* Global Navbar */}
      <Navbar onOpenCommandPalette={open} />

      {/* Global Command Palette */}
      <CommandPalette isOpen={isOpen} onClose={close} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>

      {/* Minimalist Footer with Back to Top */}
      <footer className="border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 Steve Benjamin</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-slate-400 hover:text-electric transition-colors cursor-pointer select-none inline-flex items-center space-x-1"
          >
            <span>{isFrench ? 'Haut de page ↑' : 'Back to top ↑'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
