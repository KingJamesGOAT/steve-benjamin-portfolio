import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import CommandPalette from '../features/CommandPalette';
import useCtrlK from '../../hooks/useCtrlK';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const { isOpen, close, open } = useCtrlK();

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

      {/* Sleek Minimalist FinTech Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-xs text-fintech-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-[2px] bg-emerald-500 inline-block" />
            <span>{t('footer.rights')}</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={open}
              className="text-slate-400 hover:text-electric transition-colors font-mono text-[11px] inline-flex items-center gap-1.5"
            >
              <span>{t('nav.search')}</span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                Ctrl K
              </kbd>
            </button>
            <span className="text-slate-300">•</span>
            <span className="font-mono text-[11px] text-slate-400">
              {t('footer.tagline')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
