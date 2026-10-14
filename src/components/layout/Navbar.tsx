import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFrench = Boolean(i18n.language?.toLowerCase().startsWith('fr'));

  // 4 Featured Projects with curiosity-inducing, clean titles
  const projectsList = [
    {
      slug: 'crypto-trade-hub',
      title: isFrench ? 'Trading Terminal (WebSockets)' : 'Crypto Terminal (WebSockets)',
      subtitle: isFrench ? 'Temps réel · LLaMA 3.3 · Kelly' : 'Real-time · LLaMA 3.3 · Kelly',
      badge: '< 50ms',
    },
    {
      slug: 'donnons-ch',
      title: isFrench ? 'Donnons.ch · Mandat HUG' : 'Donnons.ch · HUG Mandate',
      subtitle: isFrench ? 'Vue.js 3 · Laravel · Note 6.0' : 'Vue.js 3 · Laravel · Grade 6.0',
      badge: isFrench ? 'Note 6.0' : 'Grade 6.0',
    },
    {
      slug: 'catholic-route',
      title: isFrench ? 'Moteur de Recherche Instantané' : 'Instant Search Engine',
      subtitle: isFrench ? 'Index < 10ms · Frise SVG' : 'Index < 10ms · SVG Timeline',
      badge: '< 10ms',
    },
    {
      slug: 'marriage-platform',
      title: isFrench ? 'Plateforme RSVP Serverless' : 'Serverless RSVP Platform',
      subtitle: isFrench ? 'Sync Excel Webhook · Magic Link' : 'Excel Webhook Sync · Magic Link',
      badge: 'Serverless',
    },
  ];

  // Detect scroll offset for sticky navbar blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section as user scrolls through the page
  useEffect(() => {
    if (location.pathname === '/bachelor-pitch') {
      setActiveSection('bachelor-pitch');
      return;
    }
    if (location.pathname.startsWith('/projects')) {
      setActiveSection('projects');
      return;
    }

    const sectionIds = ['bachelor-pitch', 'about', 'projects'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [location.pathname]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#projects-dropdown-container')) {
        setIsProjectsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { targetId: 'projects', label: t('nav.projects'), isDropdown: true },
    { targetId: 'about', label: t('nav.about'), isDropdown: false },
    { targetId: 'bachelor-pitch', label: t('nav.bachelorPitch'), isDropdown: false },
  ];

  const handleNavClick = (targetId: string) => {
    setIsProjectsOpen(false);
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

  const handleMouseEnterProjects = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProjectsOpen(true);
  };

  const handleMouseLeaveProjects = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProjectsOpen(false);
    }, 160);
  };

  const handleProjectSelect = (slug: string) => {
    setIsProjectsOpen(false);
    navigate(`/projects/${slug}`);
  };

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
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;

              if (link.isDropdown) {
                return (
                  <div
                    key={link.targetId}
                    id="projects-dropdown-container"
                    className="relative"
                    onMouseEnter={handleMouseEnterProjects}
                    onMouseLeave={handleMouseLeaveProjects}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        handleNavClick('projects');
                      }}
                      className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm transition-colors cursor-pointer inline-flex items-center gap-1 select-none ${
                        isActive
                          ? 'text-electric font-semibold'
                          : 'text-fintech-secondary hover:text-electric font-medium'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isProjectsOpen ? 'rotate-180 text-electric' : 'opacity-60'
                        }`}
                      />
                    </button>

                    {/* Clean Dropdown Popover */}
                    {isProjectsOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 w-72 sm:w-80 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                        onMouseEnter={handleMouseEnterProjects}
                        onMouseLeave={handleMouseLeaveProjects}
                      >
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                          <span>{isFrench ? 'Projets Majeurs' : 'Featured Case Studies'}</span>
                          <span className="text-slate-400 font-mono">4</span>
                        </div>

                        <div className="space-y-0.5 pt-1">
                          {projectsList.map((p) => (
                            <button
                              key={p.slug}
                              type="button"
                              onClick={() => handleProjectSelect(p.slug)}
                              className="w-full text-left p-2.5 hover:bg-slate-50/80 transition-colors group flex items-start justify-between gap-2 cursor-pointer border border-transparent hover:border-slate-200/60"
                            >
                              <div className="space-y-0.5">
                                <div className="text-xs font-semibold text-slate-800 group-hover:text-electric transition-colors">
                                  {p.title}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono">
                                  {p.subtitle}
                                </div>
                              </div>
                              <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200/80 group-hover:border-electric/30 group-hover:text-electric transition-colors">
                                {p.badge}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="pt-1.5 border-t border-slate-100 mt-1">
                          <button
                            type="button"
                            onClick={() => handleNavClick('projects')}
                            className="w-full text-center py-1.5 text-[11px] font-mono text-electric hover:underline cursor-pointer block"
                          >
                            {isFrench ? 'Voir la vue d\'ensemble (4 projets) →' : 'View all 4 case studies →'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.targetId}
                  type="button"
                  onClick={() => handleNavClick(link.targetId)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm transition-colors cursor-pointer select-none ${
                    isActive
                      ? 'text-electric font-semibold'
                      : 'text-fintech-secondary hover:text-electric font-medium'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
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
