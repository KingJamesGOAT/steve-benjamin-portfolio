import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
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

  const currentLang = i18n.language?.toUpperCase().slice(0, 2) === 'FR' ? 'FR' : 'EN';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Minimalist Brand / Logo */}
        <Link
          to="/"
          className="group flex items-center space-x-2.5 text-sm font-semibold tracking-tight transition-opacity hover:opacity-90"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric"></span>
          </span>
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
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-150 ${
                    isActive
                      ? 'text-electric bg-electric-light font-semibold shadow-sm'
                      : 'text-fintech-secondary hover:text-fintech-primary hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Command Palette Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              type="button"
              className="hidden md:inline-flex items-center space-x-2 px-2.5 py-1 text-xs text-fintech-muted border border-slate-200 rounded-md hover:border-electric hover:text-electric transition-colors bg-surface-subtle"
              title={t('cmdPalette.placeholder')}
            >
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200 text-fintech-secondary">
                ⌘K
              </span>
            </button>
          )}

          {/* Clean FinTech EN / FR Language Toggle */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded border border-slate-200 text-fintech-secondary hover:text-electric hover:border-electric transition-colors bg-white hover:bg-slate-50"
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
