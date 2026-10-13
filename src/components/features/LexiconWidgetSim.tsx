import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Sparkles, Clock, BookOpen } from 'lucide-react';

interface TermData {
  id: string;
  name: { en: string; fr: string };
  category: { en: string; fr: string };
  definition: { en: string; fr: string };
  related: { en: string[]; fr: string[] };
}

interface TimelineEvent {
  id: string;
  year: number;
  label: { en: string; fr: string };
  desc: { en: string; fr: string };
}

const SAMPLE_TERMS: TermData[] = [
  {
    id: 'ontology',
    name: { en: 'Ontology', fr: 'Ontologie' },
    category: { en: 'Metaphysics & Formal Logic', fr: 'Métaphysique & Logique Formelle' },
    definition: {
      en: 'The philosophical and logical study of the fundamental nature of being, existence, reality, and structural categories of entities.',
      fr: 'La branche philosophique et logique étudiant la nature fondamentale de l\'être, de l\'existence et les catégories universelles du réel.',
    },
    related: {
      en: ['Epistemology', 'Teleology', 'Causality'],
      fr: ['Épistémologie', 'Téléologie', 'Causalité'],
    },
  },
  {
    id: 'epistemology',
    name: { en: 'Epistemology', fr: 'Épistémologie' },
    category: { en: 'Philosophy of Science', fr: 'Philosophie des Sciences' },
    definition: {
      en: 'The critical investigation into knowledge, cognitive validity, justification criteria, and rational methods of scientific truth.',
      fr: 'L\'étude critique des sciences et de la connaissance, examinant les critères de validité et la justification rationnelle de la vérité.',
    },
    related: {
      en: ['Ontology', 'Empiricism', 'Axiom'],
      fr: ['Ontologie', 'Empirisme', 'Axiome'],
    },
  },
  {
    id: 'causality',
    name: { en: 'Causality', fr: 'Causalité' },
    category: { en: 'Theoretical Physics & Logic', fr: 'Physique Théorique & Logique' },
    definition: {
      en: 'The invariant principle stating that no physical effect can precede its cause, preserving spacetime ordering and deterministic chains.',
      fr: 'Le principe fondamental stipulant que tout état physique subséquent résulte d\'interactions antérieures respectant l\'ordre causal.',
    },
    related: {
      en: ['Determinism', 'Entropy', 'Ontology'],
      fr: ['Déterminisme', 'Entropie', 'Ontologie'],
    },
  },
  {
    id: 'entropy',
    name: { en: 'Entropy', fr: 'Entropie' },
    category: { en: 'Thermodynamics & Information', fr: 'Thermodynamique & Information' },
    definition: {
      en: 'A foundational physical quantity measuring microscopic degeneracy, state irreversibility, and informational uncertainty in closed systems.',
      fr: 'Grandeur physique fondamentale mesurant le désordre microscopique, l\'irréversibilité et la dispersion d\'énergie d\'un système.',
    },
    related: {
      en: ['Causality', 'Determinism', 'Thermodynamics'],
      fr: ['Causalité', 'Déterminisme', 'Thermodynamique'],
    },
  },
  {
    id: 'axiom',
    name: { en: 'Axiom', fr: 'Axiome' },
    category: { en: 'Mathematical Logic', fr: 'Logique Mathématique' },
    definition: {
      en: 'A foundational proposition accepted without formal proof, serving as the necessary premise for deductive logical derivation.',
      fr: 'Énoncé premier posé comme vrai a priori, servant de base indémontrable mais nécessaire à la construction d\'un système formel.',
    },
    related: {
      en: ['Epistemology', 'Syllogism', 'Deduction'],
      fr: ['Épistémologie', 'Syllogisme', 'Déduction'],
    },
  },
];

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'nicaea',
    year: 325,
    label: { en: 'Council of Nicaea', fr: 'Concile de Nicée' },
    desc: {
      en: 'Codification of formal philosophical vocabulary (homoousios) to harmonize metaphysical semantics.',
      fr: 'Codification du vocabulaire philosophique formel (homoousios) pour unifier la sémantique métaphysique.',
    },
  },
  {
    id: 'aquinas',
    year: 1265,
    label: { en: 'Thomas Aquinas', fr: 'Thomas d\'Aquin' },
    desc: {
      en: 'Systematic integration of Aristotelian formal logic with medieval scholastic epistemology.',
      fr: 'Intégration systématique de la logique aristotélicienne et de l\'épistémologie scolastique.',
    },
  },
  {
    id: 'descartes',
    year: 1637,
    label: { en: 'Descartes (Discourse)', fr: 'Descartes (Discours)' },
    desc: {
      en: 'Publication of Discourse on the Method, establishing modern rational doubt and formal deduction.',
      fr: 'Parution du Discours de la méthode, posant les bases du doute rationnel et de la déduction formelle.',
    },
  },
  {
    id: 'quantum',
    year: 1927,
    label: { en: 'Copenhagen Solvay', fr: 'Congrès Solvay' },
    desc: {
      en: 'Fifth Solvay conference debating quantum causality, physical determinism, and epistemic limits.',
      fr: 'Cinquième congrès Solvay débattant de la causalité quantique, du déterminisme et des limites épistémiques.',
    },
  },
];

export const LexiconWidgetSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const [activeTab, setActiveTab] = useState<'smartText' | 'timeline'>('smartText');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTermId, setActiveTermId] = useState<string>('ontology');
  const [hoveredTermId, setHoveredTermId] = useState<string | null>(null);
  const [activeTimelineId, setActiveTimelineId] = useState<string>('nicaea');

  // Currently displayed term (hover takes transient priority over selected)
  const currentTermId = hoveredTermId || activeTermId;
  const currentTerm = SAMPLE_TERMS.find((t) => t.id === currentTermId) || SAMPLE_TERMS[0];

  // Filtered terms when user types in search
  const filteredTerms = searchQuery.trim()
    ? SAMPLE_TERMS.filter((t) => {
        const q = searchQuery.toLowerCase();
        const nameMatch =
          t.name.fr.toLowerCase().includes(q) || t.name.en.toLowerCase().includes(q);
        const catMatch =
          t.category.fr.toLowerCase().includes(q) || t.category.en.toLowerCase().includes(q);
        return nameMatch || catMatch;
      })
    : [];

  const activeEvent =
    TIMELINE_EVENTS.find((e) => e.id === activeTimelineId) || TIMELINE_EVENTS[0];

  const handleSelectRelated = (relatedName: string) => {
    const match = SAMPLE_TERMS.find(
      (t) =>
        t.name.en.toLowerCase() === relatedName.toLowerCase() ||
        t.name.fr.toLowerCase() === relatedName.toLowerCase()
    );
    if (match) {
      setActiveTermId(match.id);
      setHoveredTermId(match.id);
    }
  };

  return (
    <div className="bg-[#05050a] border border-white/10 p-3 sm:p-4 space-y-3 font-mono text-xs rounded-none select-none text-slate-300">
      {/* Top Header / Mode Switcher */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center space-x-1.5 text-[11px] text-blue-400 font-semibold tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span className="uppercase">{isFrench ? 'Moteur Lexique' : 'Lexicon Engine'}</span>
          <span className="text-slate-500 font-normal hidden sm:inline">// 5 000+ {isFrench ? 'termes' : 'terms'}</span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-1 text-[10px]">
          <button
            type="button"
            onClick={() => setActiveTab('smartText')}
            className={`px-2 py-0.5 transition-colors border ${
              activeTab === 'smartText'
                ? 'bg-blue-600/30 text-blue-300 border-blue-500/50 font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            {isFrench ? 'SmartText' : 'SmartText'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-2 py-0.5 transition-colors border ${
              activeTab === 'timeline'
                ? 'bg-blue-600/30 text-blue-300 border-blue-500/50 font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>{isFrench ? 'Frise' : 'Timeline'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Search Bar */}
      <div className="relative">
        <div className="flex items-center bg-black/70 border border-white/15 px-2.5 py-1.5 focus-within:border-blue-500/80 transition-colors">
          <Search className="w-3.5 h-3.5 text-blue-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isFrench
                ? 'Rechercher un terme (ex: Ontologie, Entropie)...'
                : 'Search term (e.g. Ontology, Entropy)...'
            }
            className="w-full bg-transparent text-[11px] text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white p-0.5 transition-colors"
              title="Clear"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Live Search Autocomplete Results Dropdown */}
        {searchQuery.trim() !== '' && (
          <div className="mt-1.5 p-1.5 bg-[#0b0c14] border border-blue-500/40 divide-y divide-white/5 shadow-lg">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => {
                    setActiveTermId(term.id);
                    setHoveredTermId(term.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-2 py-1 text-[11px] hover:bg-blue-900/30 flex items-center justify-between group transition-colors"
                >
                  <span className="text-blue-300 font-semibold group-hover:text-blue-200">
                    {isFrench ? term.name.fr : term.name.en}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">
                    {isFrench ? term.category.fr : term.category.en}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-2 py-1 text-[10px] text-slate-500 italic">
                {isFrench ? 'Aucun terme correspondant trouvé' : 'No matching term found'}
              </div>
            )}
          </div>
        )}
      </div>

      {activeTab === 'smartText' ? (
        <>
          {/* SmartText Sample Context with Clickable/Hoverable Blue Words */}
          <div className="text-[11px] text-slate-300 font-sans leading-relaxed bg-black/40 p-2.5 border border-white/5">
            <span className="text-slate-400 font-mono text-[10px] block pb-1">
              {isFrench ? 'SURVOLEZ OU CLIQUEZ SUR LES TERMES BLEUS :' : 'HOVER OR CLICK ON BLUE WORDS :'}
            </span>
            {isFrench ? (
              <span>
                Définitions formelles comme{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('ontology')}
                  onClick={() => setActiveTermId('ontology')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'ontology' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Ontologie
                </button>
                ,{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('epistemology')}
                  onClick={() => setActiveTermId('epistemology')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'epistemology' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Épistémologie
                </button>
                ,{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('entropy')}
                  onClick={() => setActiveTermId('entropy')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'entropy' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Entropie
                </button>{' '}
                et{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('causality')}
                  onClick={() => setActiveTermId('causality')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'causality' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Causalité
                </button>
                .
              </span>
            ) : (
              <span>
                Formal definitions including{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('ontology')}
                  onClick={() => setActiveTermId('ontology')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'ontology' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Ontology
                </button>
                ,{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('epistemology')}
                  onClick={() => setActiveTermId('epistemology')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'epistemology' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Epistemology
                </button>
                ,{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('entropy')}
                  onClick={() => setActiveTermId('entropy')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'entropy' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Entropy
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onMouseEnter={() => setHoveredTermId('causality')}
                  onClick={() => setActiveTermId('causality')}
                  className={`text-blue-400 font-semibold cursor-pointer underline decoration-blue-500/60 decoration-dotted underline-offset-2 hover:text-blue-200 transition-colors px-1 py-0.5 rounded-xs ${
                    currentTermId === 'causality' ? 'bg-blue-600/30 text-blue-200 font-bold ring-1 ring-blue-500/50' : ''
                  }`}
                >
                  Causality
                </button>
                .
              </span>
            )}
          </div>

          {/* Interactive SmartText Live Definition Card */}
          <div className="bg-[#0b0c16] border border-blue-500/40 p-3 space-y-2 relative transition-all duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>{isFrench ? currentTerm.name.fr : currentTerm.name.en}</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 bg-blue-950/70 border border-blue-500/40 text-blue-300">
                  {isFrench ? currentTerm.category.fr : currentTerm.category.en}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {isFrench ? currentTerm.definition.fr : currentTerm.definition.en}
            </p>

            {/* Clickable Related Concepts Tags */}
            <div className="pt-1.5 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">
                {isFrench ? 'Notions liées :' : 'Related :'}
              </span>
              {(isFrench ? currentTerm.related.fr : currentTerm.related.en).map((rel) => (
                <button
                  key={rel}
                  type="button"
                  onClick={() => handleSelectRelated(rel)}
                  className="px-1.5 py-0.5 bg-black/60 border border-white/10 text-blue-300 hover:border-blue-400 hover:text-white transition-colors"
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Timeline Mode */
        <div className="space-y-3 pt-1">
          {/* Timeline Nodes */}
          <div className="grid grid-cols-4 gap-1.5">
            {TIMELINE_EVENTS.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setActiveTimelineId(event.id)}
                className={`p-2 text-left border transition-all ${
                  activeTimelineId === event.id
                    ? 'bg-blue-950/60 border-blue-400 text-white shadow-xs'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-blue-400">
                  {event.year} AD
                </div>
                <div className="text-[10px] font-sans truncate font-medium pt-0.5">
                  {isFrench ? event.label.fr : event.label.en}
                </div>
              </button>
            ))}
          </div>

          {/* Active Timeline Event Detail Box */}
          <div className="bg-[#0b0c16] border border-blue-500/40 p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">
                {activeEvent.year} AD — {isFrench ? activeEvent.label.fr : activeEvent.label.en}
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-blue-950/70 border border-blue-500/40 text-blue-300">
                {isFrench ? 'Événement historique' : 'Milestone'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {isFrench ? activeEvent.desc.fr : activeEvent.desc.en}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LexiconWidgetSim;
