import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, FolderGit2, GraduationCap, User, ArrowRight, X } from 'lucide-react';
import type { CommandPaletteItem } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: (CommandPaletteItem & { icon: React.ReactNode })[] = [
    {
      id: 'home',
      titleKey: 'nav.home',
      subtitleKey: 'pages.home.title',
      path: '/',
      category: 'navigation',
      icon: <Home className="w-4 h-4 text-slate-500" />,
    },
    {
      id: 'projects',
      titleKey: 'nav.projects',
      subtitleKey: 'pages.projects.title',
      path: '/projects',
      category: 'navigation',
      icon: <FolderGit2 className="w-4 h-4 text-slate-500" />,
    },
    {
      id: 'bachelorPitch',
      titleKey: 'nav.bachelorPitch',
      subtitleKey: 'pages.bachelorPitch.title',
      path: '/bachelor-pitch',
      category: 'navigation',
      icon: <GraduationCap className="w-4 h-4 text-electric" />,
    },
    {
      id: 'about',
      titleKey: 'nav.about',
      subtitleKey: 'pages.about.title',
      path: '/about',
      category: 'navigation',
      icon: <User className="w-4 h-4 text-slate-500" />,
    },
  ];

  // Filter items based on query
  const filteredItems = items.filter((item) => {
    const title = t(item.titleKey).toLowerCase();
    const q = query.toLowerCase().trim();
    return title.includes(q) || item.path.toLowerCase().includes(q);
  });

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation inside the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredItems.length ? (prev + 1) % filteredItems.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white border border-slate-200 shadow-2xl z-10"
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
                className="w-full bg-transparent text-sm text-fintech-primary placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#0052FF] rounded-md px-2 py-1.5 transition-shadow"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-fintech-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
                  ESC
                </kbd>
              )}
            </div>

            {/* List of Navigation Links */}
            <div className="max-h-80 overflow-y-auto p-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {t('cmdPalette.quickNavigation')}
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
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
                          onClick={() => handleSelect(item.path)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
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

            {/* Subtle Footer hint */}
            <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{t('cmdPalette.hint')}</span>
              <span className="hidden sm:inline">↵ to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
