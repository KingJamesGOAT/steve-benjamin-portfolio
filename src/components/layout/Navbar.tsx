import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

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

  const currentLang = i18n.language?.toUpperCase().slice(0, 2) === 'FR' ? 'FR' : 'EN';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
            className="h-9 sm:h-10 w-auto max-h-10 object-contain"
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
                className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-none text-fintech-secondary hover:text-fintech-primary hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Clean FinTech EN / FR Language Toggle */}
          <button
            onClick={toggleLanguage}
            type="button"
            className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-mono font-medium rounded-none border border-slate-200 text-fintech-secondary hover:text-electric hover:border-electric transition-colors bg-white hover:bg-slate-50"
            title="Toggle EN / FR"
            aria-label="Toggle language"
          >
            <span>{currentLang}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
