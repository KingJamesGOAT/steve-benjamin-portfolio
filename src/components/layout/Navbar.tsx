import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFrench = Boolean(i18n.language?.toLowerCase().startsWith('fr'));

  // 4 Featured Projects with clean, skill-oriented titles
  const projectsList = [
    {
      slug: 'crypto-trade-hub',
      title: isFrench ? 'Terminal Quantitatif (WebSockets)' : 'Quantitative Trading Terminal',
    },
    {
      slug: 'donnons-ch',
      title: isFrench ? 'Plateforme Web Full-Stack (HUG)' : 'Full-Stack Web Platform (HUG)',
    },
    {
      slug: 'catholic-route',
      title: isFrench ? 'Moteur de Recherche Sémantique' : 'Semantic Search Engine',
    },
    {
      slug: 'marriage-platform',
      title: isFrench ? 'Architecture Serverless & Webhooks' : 'Serverless & Webhook Architecture',
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

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
    if (location.hash === '#bachelor-pitch') {
      setActiveSection('bachelor-pitch');
    }

    const sectionIds = ['bachelor-pitch', 'about', 'projects', 'skills'];
    const handleScrollSpy = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 140;
      if (isAtBottom) {
        setActiveSection('bachelor-pitch');
        return;
      }

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
  }, [location.pathname, location.hash]);

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
    { targetId: 'skills', label: t('nav.skills'), isDropdown: false },
    { targetId: 'projects', label: t('nav.projects'), isDropdown: true },
    { targetId: 'about', label: t('nav.about'), isDropdown: false },
    { targetId: 'bachelor-pitch', label: t('nav.bachelorPitch'), isDropdown: false },
  ];

  const handleNavClick = (targetId: string) => {
    setIsProjectsOpen(false);
    setIsMobileMenuOpen(false);
    setActiveSection(targetId);
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
    setIsMobileMenuOpen(false);
    navigate(`/projects/${slug}`);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out bg-white border-b border-slate-200 ${
        isScrolled
          ? 'md:top-3 md:px-6 md:bg-transparent md:border-b-0 md:pointer-events-none'
          : 'px-0 pointer-events-auto'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-300 ease-in-out h-16 px-4 sm:px-6 ${
          isScrolled
            ? 'md:pointer-events-auto md:h-14 md:border md:border-slate-200/80 md:bg-white/95 md:backdrop-blur-md md:shadow-xs'
            : 'bg-white md:bg-transparent'
        }`}
      >
        {/* Brand Logo (Home link) */}
        <Link
          to="/#home"
          onClick={() => handleNavClick('home')}
          className="group flex items-center transition-opacity hover:opacity-85 focus:outline-none"
          aria-label="Steve Benjamin"
        >
          <img
            src={`${import.meta.env.BASE_URL}Logo.png`}
            alt="Steve Benjamin"
            className={`w-auto object-contain transition-all duration-300 h-9 ${
              isScrolled ? 'md:h-8.5 md:max-h-8.5' : 'md:h-10 md:max-h-10'
            }`}
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('/Logo.png')) return;
              target.src = `${import.meta.env.BASE_URL}Logo.png`;
            }}
          />
        </Link>

        {/* Desktop Navigation & Controls (Visible on md and above) */}
        <div className="hidden md:flex items-center space-x-2.5 lg:space-x-4">
          <nav className="flex items-center space-x-0.5 lg:space-x-2">
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
                      onClick={() => handleNavClick('projects')}
                      className={`px-2 lg:px-3 py-1.5 text-xs lg:text-sm whitespace-nowrap transition-colors cursor-pointer inline-flex items-center gap-1 select-none ${
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
                        className="absolute top-full left-0 mt-1 w-64 sm:w-72 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                        onMouseEnter={handleMouseEnterProjects}
                        onMouseLeave={handleMouseLeaveProjects}
                      >
                        <div className="space-y-0.5">
                          {projectsList.map((p) => (
                            <button
                              key={p.slug}
                              type="button"
                              onClick={() => handleProjectSelect(p.slug)}
                              className="w-full text-left px-3 py-2 text-xs font-mono font-medium text-slate-700 hover:text-electric hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group"
                            >
                              <span>{p.title}</span>
                              <span className="text-slate-300 group-hover:text-electric text-[10px] transition-colors">→</span>
                            </button>
                          ))}
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
                  className={`px-2 lg:px-3 py-1.5 text-xs lg:text-sm whitespace-nowrap transition-colors cursor-pointer select-none ${
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

          <div className="h-4 w-[1px] bg-slate-200" />

          {/* Single-Container Search & Ctrl K Trigger */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              type="button"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono border border-slate-200 rounded-none hover:border-electric hover:text-electric transition-colors bg-white text-slate-500 hover:bg-slate-50 cursor-pointer"
              title={t('cmdPalette.placeholder')}
              aria-label="Search Glossary (Ctrl K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-electric" />
              <span className="font-medium text-[11px]">Ctrl K</span>
            </button>
          )}

          {/* Desktop Language Switch */}
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

        {/* Mobile Header Controls: ONLY Language Switch + Hamburger (Strict Minimalist) */}
        <div className="flex md:hidden items-center space-x-2.5">
          {/* Mobile Language Switch */}
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
            className="inline-flex items-center p-0.5 border border-slate-200 bg-slate-100 rounded-none cursor-pointer select-none text-xs font-mono transition-colors"
            title={isFrench ? 'Switch to English' : 'Passer en français'}
            aria-label="Toggle language"
          >
            <span
              className={`px-2 py-1 transition-all font-bold ${
                isFrench
                  ? 'bg-white text-electric shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              FR
            </span>
            <span
              className={`px-2 py-1 transition-all font-bold ${
                !isFrench
                  ? 'bg-white text-electric shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              EN
            </span>
          </div>

          {/* Minimal Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center border border-slate-200 bg-white text-slate-900 hover:text-electric transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Solid Opaque Menu (Zero glass/blur, 4 core links only) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 z-50 bg-white md:hidden flex flex-col p-6 border-t border-slate-200 overflow-y-auto pointer-events-auto"
          style={{ backgroundColor: '#ffffff' }}
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileProjectsOpen(false);
          }}
        >
          <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
            <div className="divide-y divide-slate-200 border-b border-slate-200 font-sans">
              {/* 1. Compétences */}
              <button
                type="button"
                onClick={() => {
                  handleNavClick('skills');
                  setIsMobileProjectsOpen(false);
                }}
                className="w-full text-left py-4 text-lg font-bold text-slate-900 hover:text-electric transition-colors flex items-center justify-between"
              >
                <span>{t('nav.skills')}</span>
              </button>

              {/* 2. Projets (with collapsible list of 4 projects) */}
              <div>
                <div className="flex items-center justify-between py-4">
                  <button
                    type="button"
                    onClick={() => {
                      handleNavClick('projects');
                      setIsMobileProjectsOpen(false);
                    }}
                    className="text-lg font-bold text-slate-900 hover:text-electric transition-colors"
                  >
                    {t('nav.projects')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMobileProjectsOpen((prev) => !prev)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200 bg-slate-50 text-xs font-mono font-semibold text-slate-700 hover:text-electric transition-colors"
                    aria-label="Toggle projects list"
                  >
                    <span>{projectsList.length}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileProjectsOpen ? 'rotate-180 text-electric' : ''
                      }`}
                    />
                  </button>
                </div>

                {isMobileProjectsOpen && (
                  <div className="mb-4 pl-3 space-y-1.5 border-l-2 border-electric bg-slate-50/70 p-2">
                    {projectsList.map((p) => (
                      <button
                        key={p.slug}
                        type="button"
                        onClick={() => {
                          handleProjectSelect(p.slug);
                          setIsMobileProjectsOpen(false);
                        }}
                        className="w-full text-left py-2.5 px-2 text-xs font-mono font-semibold text-slate-800 hover:text-electric transition-colors flex items-center justify-between"
                      >
                        <span className="truncate pr-2">{p.title}</span>
                        <span className="text-electric text-xs shrink-0">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. À Propos */}
              <button
                type="button"
                onClick={() => {
                  handleNavClick('about');
                  setIsMobileProjectsOpen(false);
                }}
                className="w-full text-left py-4 text-lg font-bold text-slate-900 hover:text-electric transition-colors flex items-center justify-between"
              >
                <span>{t('nav.about')}</span>
              </button>

              {/* 4. Pitch Bachelor */}
              <button
                type="button"
                onClick={() => {
                  handleNavClick('bachelor-pitch');
                  setIsMobileProjectsOpen(false);
                }}
                className="w-full text-left py-4 text-lg font-bold text-slate-900 hover:text-electric transition-colors flex items-center justify-between"
              >
                <span>{t('nav.bachelorPitch')}</span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5">
                  2027
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
