import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, ExternalLink } from 'lucide-react';
import type { CommandPaletteItem } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: (CommandPaletteItem & { icon: React.ReactNode; isRoute?: boolean })[] = [
    // Main Section Anchors
    {
      id: 'home',
      titleKey: 'nav.home',
      subtitleKey: 'home.tagline',
      path: '#home',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    {
      id: 'projects',
      titleKey: 'nav.projects',
      subtitleKey: 'projects.title',
      path: '#projects',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    {
      id: 'about',
      titleKey: 'nav.about',
      subtitleKey: 'about.title',
      path: '#about',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    {
      id: 'bachelorPitch',
      titleKey: 'nav.bachelorPitch',
      subtitleKey: 'bachelorPitch.title',
      path: '#bachelor-pitch',
      category: 'navigation',
      icon: <span className="font-mono text-xs text-slate-400">#</span>,
    },
    // Project Detail Routes
    {
      id: 'project-crypto',
      titleKey: 'projects.crypto.title',
      subtitleKey: 'projects.crypto.tag',
      path: '/projects/crypto-trade-hub',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      id: 'project-donnons',
      titleKey: 'projects.donnons.title',
      subtitleKey: 'projects.donnons.tag',
      path: '/projects/donnons-ch',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      id: 'project-catholic',
      titleKey: 'projects.catholicRoute.title',
      subtitleKey: 'projects.catholicRoute.tag',
      path: '/projects/catholic-route',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-blue-500" />,
    },
    {
      id: 'project-marriage',
      titleKey: 'projects.marriage.title',
      subtitleKey: 'projects.marriage.tag',
      path: '/projects/marriage-platform',
      category: 'action',
      isRoute: true,
      icon: <ExternalLink className="w-3.5 h-3.5 text-amber-500" />,
    },
  ];

  // Filter items based on search query
  const filteredItems = items.filter((item) => {
    const title = t(item.titleKey).toLowerCase();
    const sub = item.subtitleKey ? t(item.subtitleKey).toLowerCase() : '';
    const q = query.toLowerCase().trim();
    return title.includes(q) || sub.includes(q) || item.path.includes(q);
  });

  // Focus input whenever palette is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation (Arrow keys, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (item: (typeof items)[0]) => {
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
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-md"
          />

          {/* Modal Container with Sharp Minimalist FinTech Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-sm bg-white border border-slate-200 shadow-2xl z-10"
          >
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
                className="w-full bg-transparent text-sm text-fintech-primary placeholder-slate-400 outline-none focus:ring-1 focus:ring-electric rounded-sm px-2 py-1.5 transition-shadow"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-fintech-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <div className="hidden sm:flex items-center space-x-1">
                  <kbd className="px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded-sm">
                    Ctrl K
                  </kbd>
                  <kbd className="px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-sm">
                    ESC
                  </kbd>
                </div>
              )}
            </div>

            {/* List of Navigation Links */}
            <div className="max-h-80 overflow-y-auto p-2">
              <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                {t('cmdPalette.quickNavigation')}
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 font-mono">
                  {t('cmdPalette.noResults')} "{query}"
                </div>
              ) : (
                <ul className="space-y-1">
                  {filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-electric-light text-electric'
                              : 'text-fintech-secondary hover:bg-slate-50 hover:text-fintech-primary'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className={isSelected ? 'text-electric' : 'text-slate-400'}>
                              {item.icon}
                            </span>
                            <span className="text-sm font-medium">{t(item.titleKey)}</span>
                          </div>

                          <div className="flex items-center space-x-2 text-slate-400">
                            <span className="font-mono text-[11px] opacity-70">{item.path}</span>
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
              <span className="hidden sm:inline">Enter to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
