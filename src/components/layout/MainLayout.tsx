import React from 'react';
import Navbar from './Navbar';
import CommandPalette from '../features/CommandPalette';
import useCtrlK from '../../hooks/useCtrlK';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isOpen, close } = useCtrlK();

  return (
    <div className="min-h-screen bg-white text-fintech-primary flex flex-col font-sans selection:bg-electric-light selection:text-electric">
      {/* Global Navbar */}
      <Navbar />

      {/* Global Command Palette */}
      <CommandPalette isOpen={isOpen} onClose={close} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </main>

      {/* Minimalist Centered Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500 font-mono text-center">
        <p>© 2026 Steve Benjamin</p>
      </footer>
    </div>
  );
};

export default MainLayout;
