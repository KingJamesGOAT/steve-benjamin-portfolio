import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const glossaryEntries = useMemo(() => getGlossaryEntries(currentLang), [currentLang]);

  // Filter glossary items: 0 items when query is empty; top 3 closest matches when typing
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matches = glossaryEntries.filter((entry) => {
      const term = entry.term.toLowerCase();
      const def = entry.shortDef.toLowerCase();
      const cat = entry.category.toLowerCase();
      return term.includes(q) || def.includes(q) || cat.includes(q);
    });

    // Closest match ranking
    matches.sort((a, b) => {
      const aTerm = a.term.toLowerCase();
      const bTerm = b.term.toLowerCase();
      const aStarts = aTerm.startsWith(q);
      const bStarts = bTerm.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aWordStarts = aTerm.split(/\s+/).some((w) => w.startsWith(q));
      const bWordStarts = bTerm.split(/\s+/).some((w) => w.startsWith(q));
      if (aWordStarts && !bWordStarts) return -1;
      if (!aWordStarts && bWordStarts) return 1;

      return aTerm.localeCompare(bTerm);
    });

    return matches.slice(0, 3);
  }, [glossaryEntries, query]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input whenever palette is opened and reset query
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
        if (filteredItems.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredItems.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
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
            {/* If a glossary term is selected, show its clean 2-4 lines concise explanation */}
            {selectedGlossary ? (
              <div className="p-6 space-y-4 font-sans text-left">
                {/* Term Header with Back Icon Button on the left */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedGlossary(null)}
                      className="p-1 -ml-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title={isFrench ? 'Retour à la recherche' : 'Back to search'}
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="w-2 h-2 bg-[#0052FF] rounded-none inline-block" />
                    <h3 className="font-mono text-sm sm:text-base font-bold text-fintech-primary uppercase tracking-wider">
                      {selectedGlossary.term}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {selectedGlossary.category}
                  </span>
                </div>

                {/* Concise Definition (2-4 lines max, fluent paragraph, zero bullets) */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1">
                  {selectedGlossary.shortDef} {selectedGlossary.line1}
                </p>
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
                    placeholder={
                      isFrench
                        ? 'Rechercher un terme (ex. ADX, Ontologie, Serverless)...'
                        : 'Search term (e.g. ADX, Ontology, Serverless)...'
                    }
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

                {/* Content Area */}
                <div className="p-2">
                  {!query.trim() ? (
                    <div className="py-10 text-center space-y-1 text-slate-400 font-mono text-xs">
                      <p>
                        {isFrench
                          ? 'Tapez une lettre pour explorer les termes du glossaire...'
                          : 'Type a letter to explore glossary terms...'}
                      </p>
                    </div>
                  ) : filteredItems.length === 0 ? (
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
