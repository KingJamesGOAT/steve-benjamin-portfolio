import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, ArrowLeft, ArrowUpRight, Compass, FileText } from 'lucide-react';
import { getGlossaryEntries, type LocalizedGlossaryEntry } from '../../data/cryptoGlossary';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaletteItemType = 'nav' | 'project' | 'action' | 'glossary';

interface PaletteItem {
  id: string;
  type: PaletteItemType;
  title: string;
  subtitle: string;
  categoryLabel: string;
  keywords: string[];
  action: () => void;
  glossaryEntry?: LocalizedGlossaryEntry;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGlossary, setSelectedGlossary] = useState<LocalizedGlossaryEntry | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';
  const glossaryEntries = useMemo(() => getGlossaryEntries(currentLang), [currentLang]);

  // Master catalog of all available actions, navigations, projects, and glossary terms
  const allItems = useMemo<PaletteItem[]>(() => {
    const items: PaletteItem[] = [
      // 1. Navigation items
      {
        id: 'nav-projects',
        type: 'nav',
        title: isFrench ? 'Explorer les Projets' : 'Explore Projects',
        subtitle: isFrench ? 'Accéder à la section projets & études de cas' : 'Jump to projects & case studies section',
        categoryLabel: isFrench ? 'Navigation' : 'Navigation',
        keywords: ['projets', 'projects', 'cases', 'portfolio', 'travaux', 'work'],
        action: () => {
          navigate('/#projects');
          setTimeout(() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'nav-skills',
        type: 'nav',
        title: isFrench ? 'Compétences & Stack' : 'Skills & Tech Stack',
        subtitle: isFrench ? 'Bento grid technique & écosystème logiciel' : 'Technical bento grid & software ecosystem',
        categoryLabel: isFrench ? 'Navigation' : 'Navigation',
        keywords: ['competences', 'skills', 'stack', 'technique', 'react', 'typescript', 'figma'],
        action: () => {
          navigate('/#skills');
          setTimeout(() => {
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'nav-about',
        type: 'nav',
        title: isFrench ? 'À Propos & Parcours' : 'About & Experience',
        subtitle: isFrench ? 'Formation HEIG-VD, CFC électronique & leadership' : 'HEIG-VD education, electronics & leadership',
        categoryLabel: isFrench ? 'Navigation' : 'Navigation',
        keywords: ['about', 'propos', 'parcours', 'bio', 'formation', 'education', 'experience'],
        action: () => {
          navigate('/#about');
          setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'nav-bachelor',
        type: 'nav',
        title: isFrench ? 'Mandat de Bachelor 2027' : 'Bachelor Mandate 2027',
        subtitle: isFrench ? '14 semaines, CHF 0 de salaire, cadre NDA / HEIG-VD' : '14-week capstone, CHF 0 salary, NDA / HEIG-VD',
        categoryLabel: isFrench ? 'Mandat' : 'Mandate',
        keywords: ['bachelor', 'mandat', 'pitch', 'heig', 'heig-vd', 'stage', 'thesis', '2027'],
        action: () => {
          navigate('/bachelor-pitch');
          onClose();
        },
      },

      // 2. Case studies
      {
        id: 'project-crypto',
        type: 'project',
        title: 'Crypto Trade Hub',
        subtitle: isFrench ? 'Terminal quantitatif temps réel & Critère de Kelly' : 'Real-time quantitative terminal & Kelly risk engine',
        categoryLabel: isFrench ? 'Étude de cas' : 'Case Study',
        keywords: ['crypto', 'trading', 'terminal', 'binance', 'websocket', 'kelly', 'llama'],
        action: () => {
          navigate('/projects/crypto-trade-hub');
          onClose();
        },
      },
      {
        id: 'project-donnons',
        type: 'project',
        title: 'Donnons.ch (HUG)',
        subtitle: isFrench ? 'Plateforme don du sang, qualification & gamification' : 'HUG blood donation qualification & gamification platform',
        categoryLabel: isFrench ? 'Étude de cas' : 'Case Study',
        keywords: ['donnons', 'hug', 'sang', 'blood', 'don', 'vue', 'laravel', 'geneve'],
        action: () => {
          navigate('/projects/donnons-ch');
          onClose();
        },
      },
      {
        id: 'project-lexicon',
        type: 'project',
        title: isFrench ? 'Moteur Lexical & Frise' : 'Lexicon Engine & Timeline',
        subtitle: isFrench ? 'Recherche indexée < 10ms & chronologie réactive' : 'Sub-10ms indexed search & reactive chronology',
        categoryLabel: isFrench ? 'Étude de cas' : 'Case Study',
        keywords: ['lexique', 'lexicon', 'catholic', 'moteur', 'recherche', 'search', 'ontologie', 'frise'],
        action: () => {
          navigate('/projects/catholic-route');
          onClose();
        },
      },
      {
        id: 'project-marriage',
        type: 'project',
        title: isFrench ? 'Plateforme Événementielle' : 'Event Platform',
        subtitle: isFrench ? 'Flux RSVP mobile-first & synchronisation tableur' : 'Mobile-first RSVP flow & spreadsheet webhook sync',
        categoryLabel: isFrench ? 'Étude de cas' : 'Case Study',
        keywords: ['marriage', 'mariage', 'wedding', 'event', 'evenement', 'rsvp', 'excel'],
        action: () => {
          navigate('/projects/marriage-platform');
          onClose();
        },
      },

      // 3. Quick Actions
      {
        id: 'action-cv',
        type: 'action',
        title: isFrench ? 'Télécharger le CV (PDF)' : 'Download Resume (PDF)',
        subtitle: isFrench ? 'Curriculum Vitae Steve Benjamin' : 'Steve Benjamin Curriculum Vitae',
        categoryLabel: isFrench ? 'Action' : 'Action',
        keywords: ['cv', 'resume', 'pdf', 'curriculum', 'telecharger', 'download'],
        action: () => {
          const link = document.createElement('a');
          link.href = `${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`;
          link.download = 'CV_Steve_Benjamin.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          onClose();
        },
      },
      {
        id: 'action-email',
        type: 'action',
        title: isFrench ? 'Copier l\'adresse Email' : 'Copy Email Address',
        subtitle: 'sbstevebenjamin@gmail.com',
        categoryLabel: isFrench ? 'Action' : 'Action',
        keywords: ['email', 'mail', 'contact', 'copier', 'copy', 'adresse'],
        action: () => {
          navigator.clipboard.writeText('sbstevebenjamin@gmail.com');
          setActionFeedback(isFrench ? '✓ Email copié dans le presse-papier !' : '✓ Email copied to clipboard!');
          setTimeout(() => {
            setActionFeedback(null);
            onClose();
          }, 700);
        },
      },
      {
        id: 'action-linkedin',
        type: 'action',
        title: isFrench ? 'Ouvrir LinkedIn' : 'Open LinkedIn Profile',
        subtitle: 'linkedin.com/in/sb-steve-benjamin',
        categoryLabel: isFrench ? 'Action' : 'Action',
        keywords: ['linkedin', 'reseau', 'profil', 'profile', 'social'],
        action: () => {
          window.open('https://www.linkedin.com/in/sb-steve-benjamin/', '_blank');
          onClose();
        },
      },
      {
        id: 'action-lang',
        type: 'action',
        title: isFrench ? 'Switch to English' : 'Passer en Français',
        subtitle: isFrench ? 'Changer la langue du portfolio en anglais' : 'Toggle portfolio language to French',
        categoryLabel: isFrench ? 'Action' : 'Action',
        keywords: ['langue', 'language', 'anglais', 'english', 'francais', 'french', 'fr', 'en'],
        action: () => {
          const nextLang = isFrench ? 'en' : 'fr';
          i18n.changeLanguage(nextLang);
          onClose();
        },
      },
    ];

    // 4. Glossary items
    glossaryEntries.forEach((entry) => {
      items.push({
        id: `glossary-${entry.id}`,
        type: 'glossary',
        title: entry.term,
        subtitle: entry.shortDef,
        categoryLabel: entry.category,
        keywords: [entry.term.toLowerCase(), entry.category.toLowerCase(), ...entry.shortDef.toLowerCase().split(/\s+/)],
        action: () => {
          setSelectedGlossary(entry);
        },
        glossaryEntry: entry,
      });
    });

    return items;
  }, [isFrench, navigate, onClose, i18n, glossaryEntries]);

  // Filter items: 0 items when query is empty; EXACTLY TOP 3 closest matches when typing
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matches = allItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const subMatch = item.subtitle.toLowerCase().includes(q);
      const catMatch = item.categoryLabel.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((k) => k.includes(q));
      return titleMatch || subMatch || catMatch || keywordMatch;
    });

    // Ranking algorithm: prioritize exact & prefix matches on title and keywords
    matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      const aStarts = aTitle.startsWith(q);
      const bStarts = bTitle.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aKeyStarts = a.keywords.some((k) => k.startsWith(q));
      const bKeyStarts = b.keywords.some((k) => k.startsWith(q));
      if (aKeyStarts && !bKeyStarts) return -1;
      if (!aKeyStarts && bKeyStarts) return 1;

      return aTitle.localeCompare(bTitle);
    });

    // Strict constraint: at most 3 items to preserve minimalist Swiss aesthetic
    return matches.slice(0, 3);
  }, [allItems, query]);

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
      setActionFeedback(null);
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
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, selectedGlossary, onClose]);

  const renderItemIcon = (type: PaletteItemType) => {
    switch (type) {
      case 'nav':
        return <Compass className="w-3.5 h-3.5 text-slate-500" />;
      case 'project':
        return <ArrowUpRight className="w-3.5 h-3.5 text-electric" />;
      case 'action':
        return <FileText className="w-3.5 h-3.5 text-emerald-600" />;
      case 'glossary':
        return <BookOpen className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

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
            {/* If a glossary term is selected, show concise explanation */}
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
                    <span className="w-2 h-2 bg-electric inline-block" />
                    <h3 className="font-mono text-sm sm:text-base font-bold text-fintech-primary uppercase tracking-wider">
                      {selectedGlossary.term}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                    {selectedGlossary.category}
                  </span>
                </div>

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
                        ? 'Rechercher un projet, une action ou un terme...'
                        : 'Search a project, action, or term...'
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

                {/* Optional Feedback Banner */}
                {actionFeedback && (
                  <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs font-mono text-emerald-700 text-center">
                    {actionFeedback}
                  </div>
                )}

                {/* Content Area: Empty State or Max 3 Logical Results */}
                <div className="p-2">
                  {!query.trim() ? (
                    <div className="py-8 text-center space-y-1 text-slate-400 font-mono text-xs">
                      <p>
                        {isFrench
                          ? 'Tapez pour chercher (ex. Projets, CV, Donnons, Contact, ADX)...'
                          : 'Type to search (e.g. Projects, CV, Donnons, Contact, ADX)...'}
                      </p>
                    </div>
                  ) : filteredItems.length === 0 ? (
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
                              onClick={item.action}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-xs font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-electric-light text-electric'
                                  : 'text-fintech-secondary hover:bg-slate-50 hover:text-fintech-primary'
                              }`}
                            >
                              <div className="flex items-center space-x-3 text-left min-w-0 pr-2">
                                <span className={isSelected ? 'text-electric' : 'text-slate-400'}>
                                  {renderItemIcon(item.type)}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold truncate text-fintech-primary">
                                    {item.title}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-normal truncate">
                                    {item.subtitle}
                                  </div>
                                </div>
                              </div>

                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 border border-slate-200 shrink-0">
                                {item.categoryLabel}
                              </span>
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
