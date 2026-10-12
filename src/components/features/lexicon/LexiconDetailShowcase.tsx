import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  BookOpen 
} from 'lucide-react';

interface LexiconTerm {
  id: string;
  term: { en: string; fr: string };
  category: { en: string; fr: string };
  definition: { en: string; fr: string };
  related: { en: string[]; fr: string[] };
}

interface TimelineItem {
  id: string;
  year: number;
  type: { en: string; fr: string };
  title: { en: string; fr: string };
  description: { en: string; fr: string };
}

export const LexiconDetailShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // 1. Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string>('ontology');

  // 2. SmartText Hovered Term
  const [hoveredTerm, setHoveredTerm] = useState<LexiconTerm | null>(null);

  // 3. Timeline Active Event
  const [selectedEventId, setSelectedEventId] = useState<string>('nicaea');

  // Curated database: scientific, physical, philosophical, and epistemological terms (zero religious terms)
  const lexiconData: LexiconTerm[] = [
    {
      id: 'ontology',
      term: { en: 'Ontology', fr: 'Ontologie' },
      category: { en: 'Metaphysics & Formal Logic', fr: 'Métaphysique & Logique Formelle' },
      definition: {
        en: 'The philosophical and logical study of the fundamental nature of being, existence, reality, and the structural categories of entities and their mutual relations.',
        fr: 'La branche philosophique et logique étudiant la nature fondamentale de l\'être, de l\'existence et les catégories universelles du réel et de leurs relations.',
      },
      related: {
        en: ['Epistemology', 'Teleology', 'Substance', 'First Principles'],
        fr: ['Épistémologie', 'Téléologie', 'Substance', 'Premiers Principes'],
      },
    },
    {
      id: 'epistemology',
      term: { en: 'Epistemology', fr: 'Épistémologie' },
      category: { en: 'Philosophy of Science', fr: 'Philosophie des Sciences' },
      definition: {
        en: 'The critical investigation into knowledge, examining cognitive validity, justification criteria, experimental limits, and rational methods of scientific truth.',
        fr: 'L\'étude critique des sciences et de la connaissance, examinant les critères de validité, la justification rationnelle et les méthodes de découverte de la vérité.',
      },
      related: {
        en: ['Ontology', 'Empiricism', 'Methodology', 'Hermeneutics'],
        fr: ['Ontologie', 'Empirisme', 'Méthodologie', 'Herméneutique'],
      },
    },
    {
      id: 'entropy',
      term: { en: 'Entropy', fr: 'Entropie' },
      category: { en: 'Thermodynamics & Information Theory', fr: 'Thermodynamique & Théorie de l\'Information' },
      definition: {
        en: 'A foundational physical quantity measuring microscopic degeneracy, irreversibility of state evolution, and informational uncertainty in closed physical systems.',
        fr: 'Grandeur physique fondamentale mesurant le degré de désordre microscopique, l\'irréversibilité des transformations et la dispersion de l\'énergie d\'un système.',
      },
      related: {
        en: ['Thermodynamics', 'Statistical Mechanics', 'Information Theory'],
        fr: ['Thermodynamique', 'Mécanique Statistique', 'Théorie de l\'Information'],
      },
    },
    {
      id: 'causality',
      term: { en: 'Causality', fr: 'Causalité' },
      category: { en: 'Theoretical Physics & Metaphysics', fr: 'Physique Théorique & Métaphysique' },
      definition: {
        en: 'The invariant principle governing physical spacetime stating that no effect can precede its cause, preserving relativistic light-cone ordering and deterministic chains.',
        fr: 'Le principe fondamental en physique et philosophie stipulant que tout état subséquent résulte d\'interactions antérieures respectant le cône de lumière relativiste.',
      },
      related: {
        en: ['Determinism', 'Relativity', 'Ontology', 'Teleology'],
        fr: ['Déterminisme', 'Relativité', 'Ontologie', 'Téléologie'],
      },
    },
    {
      id: 'axiom',
      term: { en: 'Axiom', fr: 'Axiome' },
      category: { en: 'Mathematical Logic & Foundations', fr: 'Logique Mathématique & Fondements' },
      definition: {
        en: 'A foundational proposition accepted without formal proof, serving as the necessary starting premise for deductive mathematical and logical derivation.',
        fr: 'Énoncé premier posé comme vrai a priori, servant de base indémontrable mais nécessaire à la construction d\'un système formel ou d\'une théorie mathématique.',
      },
      related: {
        en: ['Deduction', 'Formal Logic', 'Axiomatics', 'Epistemology'],
        fr: ['Déduction', 'Logique Formelle', 'Axiomatique', 'Épistémologie'],
      },
    },
    {
      id: 'dialectics',
      term: { en: 'Dialectics', fr: 'Dialectique' },
      category: { en: 'Logic & Critical Philosophy', fr: 'Logique & Philosophie Critique' },
      definition: {
        en: 'A discourse method resolving rational oppositions through structured contradiction, counter-argumentation, and systematic higher-level synthetic reconciliation.',
        fr: 'Méthode de raisonnement progressant par examen contradictoire de thèses opposées en vue de parvenir à une synthèse conceptuelle supérieure.',
      },
      related: {
        en: ['Scholasticism', 'Logic', 'Rhetoric', 'Methodology'],
        fr: ['Scolastique', 'Logique', 'Rhétorique', 'Méthodologie'],
      },
    },
    {
      id: 'determinism',
      term: { en: 'Determinism', fr: 'Déterminisme' },
      category: { en: 'Philosophy of Physics', fr: 'Philosophie de la Physique' },
      definition: {
        en: 'The philosophical and physical doctrine positing that all events, states, and evolutions are completely determined by unbroken chains of prior physical conditions and laws.',
        fr: 'Principe physique et philosophique selon lequel l\'enchaînement des événements est rigoureusement régi par des lois causales nécessaires sans indétermination pure.',
      },
      related: {
        en: ['Causality', 'Classical Mechanics', 'Entropy'],
        fr: ['Causalité', 'Mécanique Classique', 'Entropie'],
      },
    },
    {
      id: 'teleology',
      term: { en: 'Teleology', fr: 'Téléologie' },
      category: { en: 'Aristotelian Physics & Logic', fr: 'Physique Aristotélicienne & Logique' },
      definition: {
        en: 'The philosophical doctrine asserting that natural entities and causal systems are structured and explained according to their inherent purposes, final causes, and ends.',
        fr: 'Doctrine philosophique expliquant les phénomènes et les structures naturelles par leur cause finale, leur fonction orientée et leur finalité intrinsèque.',
      },
      related: {
        en: ['Ontology', 'Causality', 'Aristotle', 'Final Cause'],
        fr: ['Ontologie', 'Causalité', 'Aristote', 'Cause Finale'],
      },
    },
    {
      id: 'scholasticism',
      term: { en: 'Scholasticism', fr: 'Scolastique' },
      category: { en: 'Medieval Epistemology', fr: 'Épistémologie Médiévale' },
      definition: {
        en: 'The academic and dialectical method employing formal Aristotelian logic, rigorous categorization, and disputation to harmonize textual authorities with rational inquiry.',
        fr: 'Méthode académique et dialectique médiévale articulant la logique formelle aristotélicienne et la dispute critique pour accorder autorité textuelle et analyse rationnelle.',
      },
      related: {
        en: ['Dialectics', 'Thomas Aquinas', 'Formal Logic'],
        fr: ['Dialectique', 'Thomas d\'Aquin', 'Logique Formelle'],
      },
    },
    {
      id: 'heuristic',
      term: { en: 'Heuristic', fr: 'Heuristique' },
      category: { en: 'Cognitive Science & Algorithmic Method', fr: 'Sciences Cognitives & Méthode Algorithmique' },
      definition: {
        en: 'A practical problem-solving methodology or computational rule designed to produce satisfactory solutions under constraints of incomplete knowledge.',
        fr: 'Démarche méthodologique ou algorithmique pratique visant à trouver des solutions approchées efficaces face à des problèmes complexes non calculables directement.',
      },
      related: {
        en: ['Epistemology', 'Empiricism', 'Methodology'],
        fr: ['Épistémologie', 'Empirisme', 'Méthodologie'],
      },
    },
    {
      id: 'hermeneutics',
      term: { en: 'Hermeneutics', fr: 'Herméneutique' },
      category: { en: 'Textual Criticism & Philology', fr: 'Critique Textuelle & Philologie' },
      definition: {
        en: 'The theory and methodology of manuscript interpretation, establishing critical rules to decipher linguistic shifts, historical context, and authentic textual intent.',
        fr: 'La science et la méthodologie de l\'interprétation des textes et manuscrits anciens, examinant la philologie, le contexte historique et les strates sémantiques.',
      },
      related: {
        en: ['Epistemology', 'Philology', 'Semiotics'],
        fr: ['Épistémologie', 'Philologie', 'Sémiotique'],
      },
    },
    {
      id: 'empiricism',
      term: { en: 'Empiricism', fr: 'Empirisme' },
      category: { en: 'Scientific Methodology', fr: 'Méthodologie Scientifique' },
      definition: {
        en: 'The foundational scientific theory stating that valid knowledge originates primarily from sensory experience, measurable observation, and inductive verification.',
        fr: 'Théorie de la connaissance stipulant que la validité scientifique découle de l\'observation mesurable, de l\'expérience sensible et de l\'expérimentation inductible.',
      },
      related: {
        en: ['Epistemology', 'Induction', 'Methodology', 'Rationalism'],
        fr: ['Épistémologie', 'Induction', 'Méthodologie', 'Rationalisme'],
      },
    },
    {
      id: 'syllogism',
      term: { en: 'Syllogism', fr: 'Syllogisme' },
      category: { en: 'Deductive Logic', fr: 'Logique Déductive' },
      definition: {
        en: 'A formal logical scheme wherein a conclusion is necessarily inferred from two asserted premises (major and minor) sharing a common middle term.',
        fr: 'Forme de raisonnement logique déductif par lequel une conclusion découle nécessairement de la conjonction de deux prémisses (majeure et mineure).',
      },
      related: {
        en: ['Formal Logic', 'Axiom', 'Deduction'],
        fr: ['Logique Formelle', 'Axiome', 'Déduction'],
      },
    },
    {
      id: 'relativity',
      term: { en: 'Relativity', fr: 'Relativité' },
      category: { en: 'Theoretical Physics', fr: 'Physique Théorique' },
      definition: {
        en: 'The geometric theory of spacetime describing how physical observations depend on reference frames, establishing the invariance of light speed and gravitational curvature.',
        fr: 'Théorie géométrique de l\'espace-temps démontrant que les lois physiques sont invariantes par changement de référentiel et reliant la gravitation à la courbure métrique.',
      },
      related: {
        en: ['Causality', 'Spacetime', 'Determinism'],
        fr: ['Causalité', 'Espace-Temps', 'Déterminisme'],
      },
    },
  ];

  // Curated historical intellectual milestones
  const timelineEvents: TimelineItem[] = [
    {
      id: 'nicaea',
      year: 325,
      type: { en: 'Treatise', fr: 'Traité' },
      title: { en: 'First Formal Consensus (325 AD)', fr: 'Premier Consensus Formel (325)' },
      description: {
        en: 'Foundational standardized codification establishing precise philosophical terminology (homoousios) to define substantial reality and semantic coherence.',
        fr: 'Première codification normalisée établissant une terminologie philosophique précise (homoousios) pour unifier la sémantique et la doctrine.',
      },
    },
    {
      id: 'boethius',
      year: 524,
      type: { en: 'Scholar', fr: 'Érudit' },
      title: { en: 'Boethius: Translation of Organon (524 AD)', fr: 'Boèce : Traduction de l\'Organon (524)' },
      description: {
        en: 'Preserved Aristotelian logic in the Latin West by translating the Organon, establishing the technical vocabulary for medieval philosophy.',
        fr: 'Préservation de la logique aristotélicienne en Occident par la traduction latine de l\'Organon, forgeant le lexique technique des universités.',
      },
    },
    {
      id: 'aquinas',
      year: 1274,
      type: { en: 'Scholar', fr: 'Érudit' },
      title: { en: 'Thomas Aquinas: Scholastic Synthesis (1274 AD)', fr: 'Thomas d\'Aquin : Synthèse Scolastique (1274)' },
      description: {
        en: 'Monuments of scholastic disputatio synthesizing Aristotelian physics, metaphysics, and teleological proofs with classical literary heritage.',
        fr: 'Apogée de la dispute scolastique médiévale unifiant métaphysique aristotélicienne, preuves téléologiques et héritage philosophique classique.',
      },
    },
    {
      id: 'descartes',
      year: 1637,
      type: { en: 'Method', fr: 'Méthode' },
      title: { en: 'Discourse on the Method (1637 AD)', fr: 'Discours de la Méthode (1637)' },
      description: {
        en: 'René Descartes establishes modern epistemology through systematic doubt, rational deduction, and mathematical analysis of substance and ontology.',
        fr: 'René Descartes fonde l\'épistémologie moderne par le doute méthodique, la déduction géométrique et l\'examen rationnel de l\'ontologie.',
      },
    },
  ];

  // Filtering lexicon
  const filteredLexicon = lexiconData.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      item.term.en.toLowerCase().includes(query) ||
      item.term.fr.toLowerCase().includes(query) ||
      item.definition.en.toLowerCase().includes(query) ||
      item.definition.fr.toLowerCase().includes(query) ||
      item.category.en.toLowerCase().includes(query) ||
      item.category.fr.toLowerCase().includes(query)
    );
  });

  const activeTerm = lexiconData.find((t) => t.id === selectedTermId) || lexiconData[0];

  const activeEvent = timelineEvents.find((e) => e.id === selectedEventId) || timelineEvents[0];

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('lexicon-search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-16 text-slate-900 font-sans">
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: CTRL+K COMMAND LEXICON EXPLORER (5,000+ Words)         */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            <span>{isFrench ? 'Module 01 // Indexation' : 'Module 01 // Indexation'}</span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">
              {isFrench ? 'INDEXATION 5 000+ ENTRÉES' : '5,000+ INDEXED TERMS'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? 'Moteur Lexical (Ctrl+K)' : 'Lexicon Engine (Ctrl+K)'}
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Conçu pour indexer plus de 5 000 termes philosophiques, épistémologiques et scientifiques. Recherche instantanée avec raccourci global Ctrl+K, sélection sur Entrée et graphe sémantique.'
              : 'Engineered to index over 5,000 philosophical, epistemological, and scientific terms. Features instant fuzzy search with global Ctrl+K, Enter-to-select, and semantic linkages.'}
          </p>
        </div>

        {/* The Obsidian Search Terminal Card */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          {/* Ambient Subtle Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-blue-600/5 blur-3xl pointer-events-none" />

          {/* Search Trigger Bar */}
          <div className="relative">
            <div className="relative flex items-center bg-black/60 border border-white/15 px-4 py-3 shadow-inner group focus-within:border-blue-500 transition-colors">
              <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0 group-focus-within:text-blue-400 transition-colors" />
              <input
                id="lexicon-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredLexicon.length > 0) {
                    e.preventDefault();
                    setSelectedTermId(filteredLexicon[0].id);
                  }
                }}
                placeholder={isFrench ? 'Rechercher un terme' : 'Search a term'}
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Interactive Two-Column Result Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Left: Term List */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 p-2 max-h-[380px] overflow-y-auto divide-y divide-white/5 space-y-1">
              {filteredLexicon.length > 0 ? (
                filteredLexicon.map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => setSelectedTermId(term.id)}
                    className={`w-full text-left p-3 transition-colors flex items-center justify-between group ${
                      selectedTermId === term.id
                        ? 'bg-blue-950/60 border-l-2 border-blue-400 text-white'
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-sm font-bold group-hover:text-blue-300 transition-colors">
                      {isFrench ? term.term.fr : term.term.en}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-xs font-mono text-slate-500">
                  {isFrench ? 'Aucun terme trouvé' : 'No matching terms found'}
                </div>
              )}
            </div>

            {/* Right: Detailed Definition Inspector Card */}
            <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 p-5 sm:p-7 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-2xl font-bold font-mono text-white">
                    {isFrench ? activeTerm.term.fr : activeTerm.term.en}
                  </h3>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans pt-1">
                  {isFrench ? activeTerm.definition.fr : activeTerm.definition.en}
                </p>
              </div>

              {/* Related Terms Graph Linkages - 100% Translated in French & English */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                  {isFrench ? 'Termes & Références Associés :' : 'Related Scholarly References:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(isFrench ? activeTerm.related.fr : activeTerm.related.en).map((rel, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-black/60 border border-white/15 text-[11px] font-mono text-blue-200"
                    >
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: SMARTTEXT READER & BLUE HOVER TOOLTIPS                 */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            <span>{isFrench ? 'Module 02 // Navigation' : 'Module 02 // Navigation'}</span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">
              {isFrench ? 'INFOBULLES STYLE APPLE GLASS' : 'APPLE-GLASS HOVER TOOLTIPS'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? 'Lecture Enrichie & Infobulles' : 'SmartText & Live Tooltips'}
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Permet à l\'utilisateur de lire des traités savants sans friction : chaque terme bleu pointillé ouvre un panneau en verre dépoli (Apple-glass) avec sa définition formelle sans quitter la page.'
              : 'Empowers readers through uninterrupted scholarly flow: every dotted blue term triggers a frosted glass (Apple-glass) popover with immediate formal definitions without disruptive page hops.'}
          </p>
        </div>

        {/* Interactive Reading Panel */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-10 relative">
          <div className="max-w-4xl space-y-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>{isFrench ? 'Traité Épistémologique & Physique // Survolez les termes en bleu :' : 'Epistemological & Physics Treatise // Hover over the blue terms:'}</span>
            </div>

            {/* SmartText Paragraph with Live Interactive Blue Terms (100% Scientific & Physical) */}
            <div className="text-base sm:text-lg leading-relaxed text-slate-200 font-sans bg-black/40 p-6 sm:p-8 border border-white/15 relative">
              {isFrench ? (
                <p>
                  La formulation des théories scientifiques modernes repose sur des principes fondamentaux d'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'ontology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Ontologie
                  </span>{' '}
                  et d'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'epistemology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Épistémologie
                  </span>
                  . Afin de modéliser l'évolution thermodynamique des systèmes physiques, l'analyse de l'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'entropy') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Entropie
                  </span>{' '}
                  et la loi invariante de{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'causality') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Causalité
                  </span>{' '}
                  s'articulent avec la déduction rigoureuse issue de chaque{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'axiom') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Axiome
                  </span>
                  , tandis que l'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'empiricism') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Empirisme
                  </span>{' '}
                  méthodique valide les modèles théoriques par la confrontation directe aux mesures expérimentales.
                </p>
              ) : (
                <p>
                  The formulation of modern scientific theories rests upon foundational principles of{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'ontology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Ontology
                  </span>{' '}
                  and{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'epistemology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Epistemology
                  </span>
                  . To model the thermodynamic evolution of physical systems, the analysis of{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'entropy') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Entropy
                  </span>{' '}
                  and the invariant law of{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'causality') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Causality
                  </span>{' '}
                  operate alongside rigorous deduction from each fundamental{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'axiom') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Axiom
                  </span>
                  , while methodical{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'empiricism') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Empiricism
                  </span>{' '}
                  validates theoretical frameworks through direct experimental verification.
                </p>
              )}
            </div>

            {/* Simulated Live Apple-Glass Popover Display - WIDE HORIZONTAL CONTAINER */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-500 mb-2 uppercase tracking-wider">
                {isFrench ? 'Aperçu de l\'infobulle active :' : 'Active Apple-glass tooltip preview:'}
              </div>
              {hoveredTerm ? (
                <div className="w-full max-w-3xl rounded-2xl bg-gray-950/95 backdrop-blur-xl border border-white/15 shadow-2xl p-6 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <BookOpen className="w-4 h-4 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base font-mono">
                        {isFrench ? hoveredTerm.term.fr : hoveredTerm.term.en}
                      </h4>
                      <span className="text-[11px] text-blue-400 font-mono">
                        {isFrench ? hoveredTerm.category.fr : hoveredTerm.category.en}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {isFrench ? hoveredTerm.definition.fr : hoveredTerm.definition.en}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-white/[0.02] border border-dashed border-white/10 text-xs font-mono text-slate-500 text-center">
                  {isFrench
                    ? 'Passez votre curseur sur un mot souligné en bleu ci-dessus pour déclencher l\'infobulle.'
                    : 'Hover over any blue dotted term above to reveal the live Apple-glass definition tooltip.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: MULTI-CENTURY CHRONOLOGY TIMELINE                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            <span>{isFrench ? 'Module 03 // Cartographie' : 'Module 03 // Cartographie'}</span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[11px]">
              {isFrench ? 'FRISE MULTI-SÉCULAIRE' : 'MULTI-CENTURY CHRONOLOGY'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {isFrench ? 'Frise Chronologique' : 'Chronology Timeline'}
          </h2>
          <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Visualisation interactive retraçant les traités majeurs, les figures savantes et les tournants épistémologiques depuis l\'antiquité tardive jusqu\'à la méthode moderne.'
              : 'Interactive chronological visualization charting landmark intellectual assemblies, scholastic scholars, and foundational treatises from late antiquity to modern epistemology.'}
          </p>
        </div>

        {/* Timeline Interactive Component */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Timeline Grid: Event Buttons & Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Chronological Scrubber */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                {isFrench ? 'Sélectionner un jalon historique :' : 'Select historical milestone:'}
              </span>
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {timelineEvents.map((evt) => (
                  <button
                    key={evt.id}
                    type="button"
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`w-full text-left p-3.5 border transition-all flex items-center justify-between ${
                      selectedEventId === evt.id
                        ? 'bg-blue-950/70 border-blue-400 text-white shadow-lg'
                        : 'bg-black/40 border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 font-mono text-xs font-bold border border-blue-500/30">
                          {evt.year} AD
                        </span>
                        <span className="text-xs font-mono uppercase text-slate-400">
                          {isFrench ? evt.type.fr : evt.type.en}
                        </span>
                      </div>
                      <div className="font-mono text-sm font-bold text-white pt-0.5">
                        {isFrench ? evt.title.fr : evt.title.en}
                      </div>
                    </div>
                    <span className="text-blue-400 text-xs font-mono">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Detailed Historical Event Dossier (Concise, no outcome box) */}
            <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-600 text-white font-mono text-xs font-bold">
                      {activeEvent.year} AD
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      {isFrench ? activeEvent.type.fr : activeEvent.type.en}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-white pt-1">
                    {isFrench ? activeEvent.title.fr : activeEvent.title.en}
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {isFrench ? 'Contexte & Débats Doctrinals :' : 'Historical Context & Debates:'}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {isFrench ? activeEvent.description.fr : activeEvent.description.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LexiconDetailShowcase;
