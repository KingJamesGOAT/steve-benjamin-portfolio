import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, Compass, FileText, Info } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaletteItemType = 'nav' | 'project' | 'action' | 'fact';

interface PaletteItem {
  id: string;
  type: PaletteItemType;
  title: string;
  subtitle: string;
  categoryLabel: string;
  keywords: string[];
  action: () => void;
}

// Unicode NFD normalization to strip accents and diacritics
const normalize = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// Stop words to filter out from multi-word questions (French & English)
const STOP_WORDS = new Set([
  'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'en', 'et', 'a', 'au', 'aux',
  'est', 'il', 'son', 'sa', 'ses', 'ce', 'cet', 'cette', 'que', 'qui', 'quoi', 'quel', 'quelle', 'quels', 'quelles',
  'the', 'a', 'an', 'in', 'on', 'at', 'and', 'or', 'is', 'it', 'he', 'his', 'her', 'what', 'where', 'how', 'who', 'does', 'did'
]);

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';

  // Lock background body scroll when the palette is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isOpen]);

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
        keywords: [
          'competences', 'skills', 'stack', 'technique', 'react', 'typescript', 'figma',
          'technologies', 'outils', 'tools', 'quelle stack', 'what stack'
        ],
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
        title: isFrench ? 'À Propos & Biographie' : 'About & Biography',
        subtitle: isFrench ? 'Profil personnel, vision & philosophie d\'ingénierie' : 'Personal profile, engineering vision & philosophy',
        categoryLabel: isFrench ? 'Navigation' : 'Navigation',
        keywords: ['about', 'propos', 'bio', 'biographie', 'presentation', 'profil', 'profile'],
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
        title: isFrench ? 'Mandat de Bachelor (Printemps 2027)' : 'Bachelor Mandate (Spring 2027)',
        subtitle: isFrench
          ? 'Étudiant HEIG-VD en fin de cursus · Recherche mandat entreprise de 14 sem. (Avr – Août 2027)'
          : 'Final-year HEIG-VD student · Seeking 14-week corporate thesis mandate (Apr – Aug 2027)',
        categoryLabel: isFrench ? 'Mandat' : 'Mandate',
        keywords: [
          'bachelor', 'mandat', 'pitch', 'heig', 'heig-vd', 'stage', 'thesis', '2027',
          'disponible', 'disponibilite', 'available', 'availability', 'when available',
          'quand', 'recherche', 'embauche', 'internship', 'travail de bachelor', 'etudiant', 'student'
        ],
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
          const cvFile = isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf';
          link.href = `${import.meta.env.BASE_URL}${cvFile}`;
          link.download = cvFile;
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
        keywords: [
          'email', 'mail', 'contact', 'copier', 'copy', 'adresse',
          'how to contact', 'comment contacter', 'ecrire', 'write', 'joindre', 'reach'
        ],
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

      // 4. Smart Facts (Questions & Direct Answers)
      {
        id: 'fact-age',
        type: 'fact',
        title: isFrench ? 'Steve Benjamin (24 ans)' : 'Steve Benjamin (24 y/o)',
        subtitle: isFrench
          ? '24 ans (né en 2002) · Basé à Bussigny (Vaud, Suisse)'
          : '24 years old (born 2002) · Based in Bussigny (Vaud, Switzerland)',
        categoryLabel: 'Info',
        keywords: [
          'age', 'old', 'how old', 'quel age', 'naissance', 'birthday', '24 ans',
          'qui est', 'who is', 'steve'
        ],
        action: () => {
          navigate('/#about');
          setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'fact-studies',
        type: 'fact',
        title: isFrench ? 'BSc Ingénierie des Médias @ HEIG-VD' : 'BSc Media Engineering @ HEIG-VD',
        subtitle: isFrench
          ? 'Cursus d\'ingénieur 2023–2027 · Yverdon-les-Bains (Vaud)'
          : 'Engineering degree 2023–2027 · Yverdon-les-Bains (Vaud)',
        categoryLabel: isFrench ? 'Formation' : 'Education',
        keywords: [
          'etudes', 'formation', 'ecole', 'school', 'study', 'studies', 'where study',
          'ou etudie', 'quelles etudes', 'what did he study', 'diplome', 'degree',
          'universite', 'university', 'yverdon', 'ingenieur'
        ],
        action: () => {
          navigate('/#about');
          setTimeout(() => {
            document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'fact-background',
        type: 'fact',
        title: isFrench ? 'CFC Électronicien, Maturité TASV & Oxford' : 'Electronics CFC, TASV Maturity & Oxford',
        subtitle: isFrench
          ? '9 ans de pratique du code · CPNV Yverdon, ETML Lausanne & 6 mois à Oxford'
          : '9 yrs coding experience · CPNV Yverdon, ETML Lausanne & 6 months at Oxford',
        categoryLabel: isFrench ? 'Parcours' : 'Background',
        keywords: [
          'parcours', 'background', 'code', '9 ans', 'cpnv', 'etml', 'cfc',
          'electronicien', 'electronics', 'tasv', 'oxford', 'maturite', 'histoire', 'electronique'
        ],
        action: () => {
          navigate('/#about');
          setTimeout(() => {
            document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'fact-location',
        type: 'fact',
        title: isFrench ? 'Localisation : Bussigny (Vaud, Suisse)' : 'Location: Bussigny (Vaud, Switzerland)',
        subtitle: isFrench
          ? 'Basé à Bussigny · Mobile sur l\'arc lémanique / Suisse romande et en télétravail'
          : 'Based in Bussigny · Mobile across Western Switzerland & remote',
        categoryLabel: 'Info',
        keywords: [
          'ou habite', 'where live', 'where based', 'localisation', 'location',
          'ville', 'city', 'bussigny', 'vaud', 'suisse', 'switzerland', 'lausanne',
          'remote', 'teletravail', 'adresse', 'residence', 'live', 'habite'
        ],
        action: () => {
          navigate('/#about');
          setTimeout(() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
      {
        id: 'fact-experience',
        type: 'fact',
        title: isFrench ? 'Ingénieur Solutions @ AppApp SARL' : 'Solutions Engineer @ AppApp SARL',
        subtitle: isFrench
          ? 'En poste depuis 2023 · Responsable technique GLGB & engagement FICF'
          : 'Employed since 2023 · Technical lead at GLGB & volunteer at FICF',
        categoryLabel: isFrench ? 'Expérience' : 'Experience',
        keywords: [
          'travail', 'job', 'poste', 'role', 'entreprise', 'appapp', 'where work',
          'ou travaille', 'experience actuelle', 'glgb', 'ficf', 'occupation', 'work', 'working', 'travaille'
        ],
        action: () => {
          navigate('/#about');
          setTimeout(() => {
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          onClose();
        },
      },
    ];

    return items;
  }, [isFrench, navigate, onClose, i18n]);

  // Robust search ranking: Accent-normalized, prefix-progressive, stop-word filtered, strictly capped at 3
  const filteredItems = useMemo(() => {
    const rawQ = query.trim();
    const q = normalize(rawQ);
    if (!q) return [];

    const queryWords = q
      .split(/[\s,.'’\-?]+/)
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

    const scoredItems = allItems
      .map((item) => {
        let score = 0;
        const titleNorm = normalize(item.title);
        const subNorm = normalize(item.subtitle);
        const catNorm = normalize(item.categoryLabel);
        const keywordsNorm = item.keywords.map(normalize);

        // 1. Direct whole-query match on Title, Category or Keywords
        if (titleNorm === q) score += 120;
        else if (titleNorm.startsWith(q)) score += 60;
        else if (titleNorm.includes(q)) score += 35;

        if (catNorm === q) score += 90;
        else if (catNorm.startsWith(q)) score += 50;
        else if (catNorm.includes(q)) score += 25;

        if (subNorm.includes(q)) score += 15;

        // Direct keyword match
        for (const k of keywordsNorm) {
          if (k === q) {
            score += 100;
          } else if (k.startsWith(q)) {
            score += 55;
          } else if (k.includes(q)) {
            score += 30;
          } else if (q.includes(k) && k.length >= 3) {
            score += 70 + k.length;
          }
        }

        // 2. Query words match (meaningful words after stop words)
        for (const qw of queryWords) {
          if (titleNorm.includes(qw)) score += 25;
          if (catNorm.includes(qw)) score += 20;
          if (subNorm.includes(qw)) score += 10;
          for (const k of keywordsNorm) {
            if (k === qw || k.startsWith(qw)) {
              score += 30;
              break;
            } else if (k.includes(qw)) {
              score += 15;
              break;
            }
          }
        }

        return { item, score };
      })
      .filter(({ score }) => score > 0);

    // Sort by highest score first, then alphabetical tie-breaker
    scoredItems.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

    // Strict constraint: at most 3 items to preserve minimalist Swiss aesthetic
    return scoredItems.slice(0, 3).map(({ item }) => item);
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
      setActionFeedback(null);
    }
  }, [isOpen]);

  // Handle keyboard navigation (Arrow keys, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  const renderItemIcon = (type: PaletteItemType) => {
    switch (type) {
      case 'nav':
        return <Compass className="w-3.5 h-3.5 text-slate-500" />;
      case 'project':
        return <ArrowUpRight className="w-3.5 h-3.5 text-electric" />;
      case 'action':
        return <FileText className="w-3.5 h-3.5 text-emerald-600" />;
      case 'fact':
        return <Info className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
          onWheel={(e) => e.stopPropagation()}
        >
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
                    ? 'Rechercher un projet, poser une question ou un mot-clé...'
                    : 'Search a project, ask a question, or a keyword...'
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
                      ? 'Tapez pour chercher (ex. Parcours, Études, Âge, Projets, CV)...'
                      : 'Type to search (e.g. Background, Studies, Age, Projects, CV)...'}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
