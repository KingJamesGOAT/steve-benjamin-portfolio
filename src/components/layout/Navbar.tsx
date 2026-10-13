import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
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

  const isFrench = Boolean(i18n.language?.toLowerCase().startsWith('fr'));

  return (
    <header
      className={`sticky z-40 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'top-2 sm:top-3 px-4 sm:px-6 pointer-events-none'
          : 'top-0 px-0 bg-white border-b border-slate-200/80 pointer-events-auto'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'pointer-events-auto h-13 sm:h-14 px-4 sm:px-6 border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-xs'
            : 'h-16 px-4 sm:px-6 bg-transparent'
        }`}
      >
        {/* Brand Logo */}
        <Link
          to="/#home"
          onClick={() => handleNavClick('home')}
          className="group flex items-center transition-opacity hover:opacity-85 focus:outline-none"
          aria-label="Steve Benjamin"
        >
          <img
            src={`${import.meta.env.BASE_URL}Logo.png`}
            alt="Steve Benjamin"
            className={`w-auto object-contain transition-all duration-300 ${
              isScrolled ? 'h-8 sm:h-8.5 max-h-8.5' : 'h-9 sm:h-10 max-h-10'
            }`}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('/Logo.png')) return;
              target.src = `${import.meta.env.BASE_URL}Logo.png`;
            }}
          />
        </Link>

        {/* Navigation & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.targetId}
                type="button"
                onClick={() => handleNavClick(link.targetId)}
                className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-none text-fintech-secondary hover:text-fintech-primary hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Unified Single-Container Search & Ctrl K Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              type="button"
              className="hidden md:inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono border border-slate-200 rounded-none hover:border-electric hover:text-electric transition-colors bg-white text-slate-500 hover:bg-slate-50 cursor-pointer"
              title={t('cmdPalette.placeholder')}
              aria-label="Search Glossary (Ctrl K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-electric" />
              <span className="font-medium text-[11px]">Ctrl K</span>
            </button>
          )}

          {/* Interactive FinTech EN / FR Language Toggle Switch */}
          <div
            onClick={toggleLanguage}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleLanguage();
              }
            }}
            className="inline-flex items-center p-0.5 border border-slate-200 bg-slate-100/90 rounded-none cursor-pointer select-none text-[11px] font-mono transition-colors hover:border-slate-300"
            title={isFrench ? 'Passer en anglais (Switch to English)' : 'Passer en français (Switch to French)'}
            aria-label="Toggle language between FR and EN"
          >
            <span
              className={`px-2 py-0.5 transition-all font-semibold ${
                isFrench
                  ? 'bg-white text-electric shadow-xs border border-slate-200/80'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              FR
            </span>
            <span
              className={`px-2 py-0.5 transition-all font-semibold ${
                !isFrench
                  ? 'bg-white text-electric shadow-xs border border-slate-200/80'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              EN
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
