import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, ArrowLeft } from 'lucide-react';
import { getGlossaryEntries, type LocalizedGlossaryEntry } from '../../data/cryptoGlossary';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGlossary, setSelectedGlossary] = useState<LocalizedGlossaryEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';
  const glossaryEntries = getGlossaryEntries(currentLang);

  // Filter glossary items based on query (returns top 3 matches when searching)
  const filteredItems = query.trim()
    ? glossaryEntries
        .filter((entry) => {
          const q = query.toLowerCase().trim();
          const term = entry.term.toLowerCase();
          const def = entry.shortDef.toLowerCase();
          const cat = entry.category.toLowerCase();
          return term.includes(q) || def.includes(q) || cat.includes(q);
        })
        .slice(0, 3)
    : glossaryEntries.slice(0, 6);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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
          setSelectedGlossary(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, selectedGlossary, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="relative w-full max-w-xl overflow-hidden rounded-none bg-white border border-slate-200 shadow-2xl z-10"
          >
            {/* If a glossary term is selected, show its clean 2-3 line explanation (no grey box, no bullets) */}
            {selectedGlossary ? (
              <div className="p-6 space-y-4 font-sans text-left">
                {/* Term Header */}
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

                {/* Main Definition (Normal clean text, no grey container) */}
                <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                  {selectedGlossary.shortDef}
                </p>

                {/* Clear 2-3 explanatory lines without bullet points or numbering */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pt-1">
                  <p>{selectedGlossary.line1}</p>
                  <p>{selectedGlossary.line2}</p>
                  {selectedGlossary.line3 && <p>{selectedGlossary.line3}</p>}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedGlossary(null)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-electric text-xs font-mono font-semibold text-slate-700 transition-colors rounded-none cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t('cmdPalette.backToSearch')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-600 transition-colors rounded-none cursor-pointer"
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
                    placeholder={isFrench ? 'Rechercher un terme du glossaire...' : 'Search glossary term...'}
                    className="w-full bg-transparent text-sm text-fintech-primary placeholder-slate-400 outline-none focus:ring-1 focus:ring-electric rounded-none px-2 py-1.5 transition-shadow font-mono"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="p-1 text-slate-400 hover:text-fintech-primary transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* List of Glossary Items */}
                <div className="max-h-80 overflow-y-auto p-2">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>
                      {query
                        ? t('cmdPalette.matchingResults').toUpperCase()
                        : isFrench
                        ? 'TERMES DU GLOSSAIRE'
                        : 'GLOSSARY TERMS'}
                    </span>
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
                      {filteredItems.map((entry, index) => {
                        const isSelected = index === selectedIndex;

                        return (
                          <li key={entry.id}>
                            <button
                              type="button"
                              onClick={() => setSelectedGlossary(entry)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-xs font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-electric-light text-electric'
                                  : 'text-fintech-secondary hover:bg-slate-50 hover:text-fintech-primary'
                              }`}
                            >
                              <div className="flex items-center space-x-3 text-left">
                                <span className={isSelected ? 'text-electric' : 'text-blue-500'}>
                                  <BookOpen className="w-3.5 h-3.5" />
                                </span>
                                <div>
                                  <div className="text-sm font-medium">
                                    {entry.term}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-normal line-clamp-1">
                                    {entry.shortDef}
                                  </div>
                                </div>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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
