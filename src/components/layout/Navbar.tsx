import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { targetId: 'home', label: t('nav.home') },
    { targetId: 'projects', label: t('nav.projects') },
    { targetId: 'about', label: t('nav.about') },
    { targetId: 'bachelor-pitch', label: t('nav.bachelorPitch') },
  ];

  const handleNavClick = (targetId: string) => {
    if (location.pathname === '/' || location.pathname === '') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const currentLang = i18n.language?.toUpperCase().slice(0, 2) === 'FR' ? 'FR' : 'EN';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Minimalist Brand / Logo */}
        <Link
          to="/#home"
          onClick={() => handleNavClick('home')}
          className="group flex items-center space-x-2.5 text-sm font-semibold tracking-tight transition-opacity hover:opacity-90"
        >
          <span className="w-2.5 h-2.5 rounded-[2px] bg-electric inline-block" />
          <span className="text-fintech-primary font-medium tracking-tight">
            {t('nav.name')}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-normal uppercase tracking-wider text-fintech-subtle border-l border-slate-200 pl-2">
            {t('nav.role')}
          </span>
        </Link>

        {/* Navigation & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.targetId}
                type="button"
                onClick={() => handleNavClick(link.targetId)}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md text-fintech-secondary hover:text-fintech-primary hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Command Palette Trigger with Explicit "Ctrl K" */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              type="button"
              className="hidden md:inline-flex items-center space-x-2 px-2.5 py-1 text-xs text-fintech-muted border border-slate-200 rounded-md hover:border-electric hover:text-electric transition-colors bg-surface-subtle"
              title={t('cmdPalette.placeholder')}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-fintech-secondary font-medium">
                Ctrl K
              </span>
            </button>
          )}

          {/* Clean FinTech EN / FR Language Toggle */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-slate-200 text-fintech-secondary hover:text-electric hover:border-electric transition-colors bg-white hover:bg-slate-50"
            title="Toggle EN / FR"
            aria-label="Toggle language"
          >
            <Globe className="w-3 h-3 text-fintech-subtle" />
            <span>{currentLang}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
