import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react';
import { getGlossaryEntries, type LocalizedGlossaryEntry } from '../../data/cryptoGlossary';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaletteEntry =
  | {
      type: 'nav';
      id: string;
      titleKey: string;
      subtitleKey?: string;
      path: string;
      category: 'navigation' | 'action';
      isRoute?: boolean;
      icon: React.ReactNode;
    }
  | {
      type: 'glossary';
      id: string;
      entry: LocalizedGlossaryEntry;
      icon: React.ReactNode;
    };

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGlossary, setSelectedGlossary] = useState<LocalizedGlossaryEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const glossaryEntries = getGlossaryEntries(currentLang);

  const navItems: PaletteEntry[] = [
    // Main Section Anchors
    {
      type: 'nav',
      id: 'home',
      titleKey: 'nav.home',
      subtitleKey: 'home.tagline',
      path: '#home',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    {
      type: 'nav',
      id: 'projects',
      titleKey: 'nav.projects',
      subtitleKey: 'projects.title',
      path: '#projects',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    {
      type: 'nav',
      id: 'about',
      titleKey: 'nav.about',
      subtitleKey: 'about.title',
      path: '#about',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    {
      type: 'nav',
      id: 'bachelorPitch',
      titleKey: 'nav.bachelorPitch',
      subtitleKey: 'bachelorPitch.title',
      path: '#bachelor-pitch',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    // Project Detail Routes
    {
      type: 'nav',
      id: 'project-crypto',
      titleKey: 'projects.crypto.title',
      subtitleKey: 'projects.crypto.tag',
      path: '/projects/crypto-trade-hub',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      type: 'nav',
      id: 'project-donnons',
      titleKey: 'projects.donnons.title',
      subtitleKey: 'projects.donnons.tag',
      path: '/projects/donnons-ch',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      type: 'nav',
      id: 'project-catholic',
      titleKey: 'projects.catholicRoute.title',
      subtitleKey: 'projects.catholicRoute.tag',
      path: '/projects/catholic-route',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-blue-500" />,
    },
    {
      type: 'nav',
      id: 'project-marriage',
      titleKey: 'projects.marriage.title',
      subtitleKey: 'projects.marriage.tag',
      path: '/projects/marriage-platform',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-amber-500" />,
    },
  ];

  const glossaryItems: PaletteEntry[] = glossaryEntries.map((entry) => ({
    type: 'glossary',
    id: `glossary-${entry.id}`,
    entry,
    icon: <BookOpen className="w-3.5 h-3.5 text-blue-500" />,
  }));

  const allItems: PaletteEntry[] = [...navItems, ...glossaryItems];

  // Filter items based on query
  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;

    if (item.type === 'nav') {
      const title = t(item.titleKey).toLowerCase();
      const sub = item.subtitleKey ? t(item.subtitleKey).toLowerCase() : '';
      return title.includes(q) || sub.includes(q) || item.path.includes(q);
    }

    if (item.type === 'glossary') {
      const term = item.entry.term.toLowerCase();
      const def = item.entry.shortDef.toLowerCase();
      const cat = item.entry.category.toLowerCase();
      return term.includes(q) || def.includes(q) || cat.includes(q);
    }

    return false;
  });

  // Focus input whenever palette is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setSelectedIndex(0);
      setSelectedGlossary(null);
    }
  }, [isOpen]);

  // Handle keyboard navigation (Arrow keys, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGlossary) {
        if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          setSelectedGlossary(null);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, selectedGlossary]);

  const handleSelect = (item: PaletteEntry) => {
    if (item.type === 'glossary') {
      setSelectedGlossary(item.entry);
      return;
    }

    onClose();
    if (item.isRoute) {
      navigate(item.path);
    } else {
      const targetId = item.path.replace('#', '');
      if (location.pathname === '/' || location.pathname === '') {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${targetId}`);
        }
      } else {
        navigate(`/#${targetId}`);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-md"
          />

          {/* Modal Container with Sharp Minimalist FinTech Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-xl overflow-hidden rounded-none bg-white border border-slate-200 shadow-2xl z-10"
          >
            {/* If a glossary term is selected, show its deep 3-line explanation */}
            {selectedGlossary ? (
              <div className="p-6 space-y-4 font-sans text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#0052FF] rounded-none inline-block" />
                    <h3 className="font-mono text-sm sm:text-base font-bold text-fintech-primary uppercase tracking-wider">
                      {selectedGlossary.term}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {selectedGlossary.category}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-mono bg-slate-50 p-3 border border-slate-200 leading-relaxed">
                  {selectedGlossary.shortDef}
                </div>

                {/* 3 Structured Explanation Lines */}
                <div className="space-y-2.5 pt-1 text-xs text-slate-600">
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[11px] font-bold text-electric shrink-0 mt-0.5">
                      01 /
                    </span>
                    <p className="leading-relaxed">{selectedGlossary.line1}</p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[11px] font-bold text-electric shrink-0 mt-0.5">
                      02 /
                    </span>
                    <p className="leading-relaxed">{selectedGlossary.line2}</p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <span className="font-mono text-[11px] font-bold text-electric shrink-0 mt-0.5">
                      03 /
                    </span>
                    <p className="leading-relaxed">{selectedGlossary.line3}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedGlossary(null)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-electric text-xs font-mono font-semibold text-slate-700 transition-colors rounded-none"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('cmdPalette.backToSearch')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-600 transition-colors rounded-none"
                  >
                    {t('cmdPalette.closeEsc')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Search Input Box */}
                <div className="relative flex items-center border-b border-slate-100 px-4 py-3">
                  <Search className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder={t('cmdPalette.placeholder')}
                    className="w-full bg-transparent text-sm text-fintech-primary placeholder-slate-400 outline-none focus:ring-1 focus:ring-electric rounded-none px-2 py-1.5 transition-shadow"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="p-1 text-slate-400 hover:text-fintech-primary transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* List of Navigation Links & Glossary Items */}
                <div className="max-h-80 overflow-y-auto p-2">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>{query ? t('cmdPalette.matchingResults').toUpperCase() : t('cmdPalette.quickNavigation')}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {filteredItems.length} {t('cmdPalette.itemsCount').toUpperCase()}
                    </span>
                  </div>

                  {filteredItems.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400 font-mono">
                      {t('cmdPalette.noResults')} "{query}"
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {filteredItems.map((item, index) => {
                        const isSelected = index === selectedIndex;
                        const isGlossary = item.type === 'glossary';

                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-xs font-medium transition-all ${
                                isSelected
                                  ? 'bg-electric-light text-electric'
                                  : 'text-fintech-secondary hover:bg-slate-50 hover:text-fintech-primary'
                              }`}
                            >
                              <div className="flex items-center space-x-3 text-left">
                                <span className={isSelected ? 'text-electric' : 'text-slate-400'}>
                                  {item.icon}
                                </span>
                                <div>
                                  <div className="text-sm font-medium">
                                    {isGlossary ? item.entry.term : t(item.titleKey)}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-normal line-clamp-1">
                                    {isGlossary
                                      ? item.entry.shortDef
                                      : item.subtitleKey && t(item.subtitleKey)}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 text-slate-400 shrink-0 ml-3">
                                <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 border border-slate-200">
                                  {isGlossary ? t('cmdPalette.glossaryTag') : item.path}
                                </span>
                                <ArrowRight
                                  className={`w-3.5 h-3.5 transition-transform ${
                                    isSelected ? 'translate-x-0.5 text-electric' : 'opacity-40'
                                  }`}
                                />
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Minimalist Clinical Footer Hint */}
                <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{t('cmdPalette.hint')}</span>
                  <span className="hidden sm:inline">{t('cmdPalette.inspectHint')}</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
