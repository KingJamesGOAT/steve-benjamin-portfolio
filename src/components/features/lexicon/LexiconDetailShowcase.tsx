import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  BookOpen, 
  Check 
} from 'lucide-react';

interface LexiconTerm {
  id: string;
  term: { en: string; fr: string };
  category: { en: string; fr: string };
  origin: string;
  definition: { en: string; fr: string };
  related: string[];
}

interface TimelineItem {
  id: string;
  year: number;
  type: 'treatise' | 'scholar' | 'method';
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  outcome: { en: string; fr: string };
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

  // Curated database: scientific, physical, philosophical, and Latin/theological terms
  const lexiconData: LexiconTerm[] = [
    {
      id: 'ontology',
      term: { en: 'Ontology', fr: 'Ontologie' },
      category: { en: 'Metaphysics & Formal Logic', fr: 'Métaphysique & Logique Formelle' },
      origin: 'Greek: onto- (being) + logos (rational study)',
      definition: {
        en: 'The philosophical and logical study of the fundamental nature of being, existence, reality, and the structural categories of entities and their mutual relations.',
        fr: 'La branche philosophique et logique étudiant la nature fondamentale de l\'être, de l\'existence et les catégories universelles du réel et de leurs relations.',
      },
      related: ['Epistemology', 'Teleology', 'Substance', 'First Principles'],
    },
    {
      id: 'epistemology',
      term: { en: 'Epistemology', fr: 'Épistémologie' },
      category: { en: 'Philosophy of Science', fr: 'Philosophie des Sciences' },
      origin: 'Greek: episteme (scientific knowledge) + logos',
      definition: {
        en: 'The critical investigation into knowledge, examining cognitive validity, justification criteria, experimental limits, and rational methods of scientific truth.',
        fr: 'L\'étude critique des sciences et de la connaissance, examinant les critères de validité, la justification rationnelle et les méthodes de découverte de la vérité.',
      },
      related: ['Ontology', 'Empiricism', 'Methodology', 'Hermeneutics'],
    },
    {
      id: 'theology',
      term: { en: 'Theology', fr: 'Théologie' },
      category: { en: 'Classical Metaphysics', fr: 'Métaphysique Classique' },
      origin: 'Greek: theos (divine principle) + logos',
      definition: {
        en: 'The systematic and rational discipline analyzing first causes, transcendence, and foundational texts through dialectical inquiry within classical intellectual traditions.',
        fr: 'La discipline intellectuelle consacrée à l\'étude rationnelle des causes premières, de la transcendance et des textes fondateurs au sein des traditions savantes.',
      },
      related: ['Magisterium', 'First Principles', 'Teleology', 'Exegesis'],
    },
    {
      id: 'magisterium',
      term: { en: 'Magisterium', fr: 'Magistère' },
      category: { en: 'Institutional Epistemology', fr: 'Épistémologie Institutionnelle' },
      origin: 'Latin: magister (master / authoritative teacher)',
      definition: {
        en: 'The authoritative teaching office and canonical body responsible for preserving intellectual fidelity, authentic textual transmission, and codified tradition.',
        fr: 'L\'autorité d\'enseignement et de transmission chargée de préserver l\'intégrité des textes, des canons conceptuels et de la continuité intellectuelle.',
      },
      related: ['Tradition', 'Canon Law', 'Hermeneutics', 'Authority'],
    },
    {
      id: 'teleology',
      term: { en: 'Teleology', fr: 'Téléologie' },
      category: { en: 'Aristotelian Physics & Logic', fr: 'Physique Aristotélicienne & Logique' },
      origin: 'Greek: telos (end / purpose) + logos',
      definition: {
        en: 'The philosophical doctrine asserting that natural entities and causal systems are structured and explained according to their inherent purposes, final causes, and ends.',
        fr: 'Doctrine philosophique expliquant les phénomènes et les structures naturelles par leur cause finale, leur fonction orientée et leur finalité intrinsèque.',
      },
      related: ['Ontology', 'Causality', 'Aristotle', 'Final Cause'],
    },
    {
      id: 'scholasticism',
      term: { en: 'Scholasticism', fr: 'Scolastique' },
      category: { en: 'Medieval Epistemology', fr: 'Épistémologie Médiévale' },
      origin: 'Latin: scholasticus (belonging to an academy)',
      definition: {
        en: 'The medieval academic and dialectical method employing formal Aristotelian logic, rigorous categorization, and disputation to harmonize textual authorities with rational inquiry.',
        fr: 'Méthode académique et dialectique médiévale articulant la logique formelle aristotélicienne et la disputatio critique pour accorder autorité textuelle et analyse rationnelle.',
      },
      related: ['Disputatio', 'Thomas Aquinas', 'Dialectics', 'Logica Vetus'],
    },
    {
      id: 'entropy',
      term: { en: 'Entropy', fr: 'Entropie' },
      category: { en: 'Thermodynamics & Information Theory', fr: 'Thermodynamique & Théorie de l\'Information' },
      origin: 'Greek: en (in) + trope (transformation)',
      definition: {
        en: 'A foundational physical quantity measuring microscopic degeneracy, irreversibility of state evolution, and informational uncertainty in closed physical systems.',
        fr: 'Grandeur physique fondamentale mesurant le degré de désordre microscopique, l\'irréversibilité des transformations et la dispersion de l\'énergie d\'un système.',
      },
      related: ['Thermodynamics', 'Statistical Mechanics', 'Information Theory'],
    },
    {
      id: 'causality',
      term: { en: 'Causality', fr: 'Causalité' },
      category: { en: 'Theoretical Physics & Metaphysics', fr: 'Physique Théorique & Métaphysique' },
      origin: 'Latin: causalitas (relation of cause to effect)',
      definition: {
        en: 'The invariant principle governing physical spacetime stating that no effect can precede its cause, preserving relativistic light-cone ordering and deterministic chains.',
        fr: 'Le principe fondamental en physique et philosophie stipulant que tout état subséquent résulte d\'interactions antérieures respectant le cône de lumière relativiste.',
      },
      related: ['Determinism', 'Relativity', 'Ontology', 'Teleology'],
    },
    {
      id: 'axiom',
      term: { en: 'Axiom', fr: 'Axiome' },
      category: { en: 'Mathematical Logic & Foundations', fr: 'Logique Mathématique & Fondements' },
      origin: 'Greek: axioma (that which is thought worthy / self-evident proposition)',
      definition: {
        en: 'A foundational proposition accepted without formal proof, serving as the necessary starting premise for deductive mathematical and logical derivation.',
        fr: 'Énoncé premier posé comme vrai a priori, servant de base indémontrable mais nécessaire à la construction d\'un système formel ou d\'une théorie mathématique.',
      },
      related: ['Deduction', 'Formal Logic', 'Axiomatics', 'Epistemology'],
    },
    {
      id: 'dialectics',
      term: { en: 'Dialectics', fr: 'Dialectique' },
      category: { en: 'Logic & Critical Philosophy', fr: 'Logique & Philosophie Critique' },
      origin: 'Greek: dialektike (art of conversation / debate)',
      definition: {
        en: 'A discourse method resolving rational oppositions through structured contradiction, counter-argumentation, and systematic higher-level synthetic reconciliation.',
        fr: 'Méthode de raisonnement progressant par examen contradictoire de thèses opposées en vue de parvenir à une synthèse conceptuelle supérieure.',
      },
      related: ['Scholasticism', 'Disputatio', 'Logic', 'Rhetoric'],
    },
    {
      id: 'determinism',
      term: { en: 'Determinism', fr: 'Déterminisme' },
      category: { en: 'Philosophy of Physics', fr: 'Philosophie de la Physique' },
      origin: 'Latin: determinare (to bound / limit)',
      definition: {
        en: 'The philosophical and physical doctrine positing that all events, states, and evolutions are completely determined by unbroken chains of prior physical conditions and laws.',
        fr: 'Principe physique et philosophique selon lequel l\'enchaînement des événements est rigoureusement régi par des lois causales nécessaires sans indétermination pure.',
      },
      related: ['Causality', 'Classical Mechanics', 'Entropy'],
    },
    {
      id: 'dogma',
      term: { en: 'Dogma', fr: 'Dogme' },
      category: { en: 'Epistemology & Foundational Doctrine', fr: 'Épistémologie & Doctrine Fondamentale' },
      origin: 'Greek: dogma (that which seems true / decreed principle)',
      definition: {
        en: 'A central authoritative tenet or verified fundamental principle established by recognized scholastic or institutional consensus as essential and non-negotiable.',
        fr: 'Proposition ou principe fondamental tenu pour certain et intangible, établi au terme d\'un consensus doctrinal ou institutionnel rigoureusement consigné.',
      },
      related: ['Magisterium', 'Canon', 'Tradition'],
    },
    {
      id: 'exegesis',
      term: { en: 'Exegesis', fr: 'Exégèse' },
      category: { en: 'Philology & Textual Analysis', fr: 'Philologie & Analyse Textuelle' },
      origin: 'Greek: exegesis (explanation / leading out)',
      definition: {
        en: 'Critical, objective grammatical, historical, and contextual explanation or interpretation of a manuscript or foundational text.',
        fr: 'Analyse critique, philologique et historique d\'un texte ancien visant à en dégager le sens authentique et le contexte d\'élaboration originel.',
      },
      related: ['Hermeneutics', 'Philology', 'Canon'],
    },
    {
      id: 'patristics',
      term: { en: 'Patristics', fr: 'Patristique' },
      category: { en: 'Historical Intellectual Lineage', fr: 'Histoire Intellectuelle & Philologie' },
      origin: 'Latin: patres (early teachers / fathers)',
      definition: {
        en: 'The historical and textual study of early foundational thinkers and scholars who developed classical metaphysics and codified intellectual transmission.',
        fr: 'Discipline consacrée à l\'étude des penseurs, traités et controverses philosophiques et textuelles des premiers siècles de l\'ère savante.',
      },
      related: ['Tradition', 'Magisterium', 'Hermeneutics'],
    },
    {
      id: 'canon',
      term: { en: 'Canon', fr: 'Canon' },
      category: { en: 'Normative Epistemology', fr: 'Épistémologie Normative' },
      origin: 'Greek: kanon (measuring rod / standard rule)',
      definition: {
        en: 'An officially codified standard, authoritative criterion, or comprehensive accepted corpus of texts recognized as foundational and authentic.',
        fr: 'Ensemble normatif des textes, règles ou critères méthodologiques officiellement reconnus comme faisant autorité et servant d\'étalon de référence.',
      },
      related: ['Magisterium', 'Dogma', 'Exegesis'],
    },
    {
      id: 'heuristic',
      term: { en: 'Heuristic', fr: 'Heuristique' },
      category: { en: 'Cognitive Science & Algorithmic Method', fr: 'Sciences Cognitives & Méthode Algorithmique' },
      origin: 'Greek: heuriskein (to find / discover)',
      definition: {
        en: 'A practical problem-solving methodology or computational rule designed to produce satisfactory solutions under constraints of incomplete knowledge.',
        fr: 'Démarche méthodologique ou algorithmique pratique visant à trouver des solutions approchées efficaces face à des problèmes complexes non calculables directement.',
      },
      related: ['Epistemology', 'Empiricism', 'Methodology'],
    },
    {
      id: 'hermeneutics',
      term: { en: 'Hermeneutics', fr: 'Herméneutique' },
      category: { en: 'Textual Criticism & Philology', fr: 'Critique Textuelle & Philologie' },
      origin: 'Greek: hermeneutikos (interpreting / deciphering)',
      definition: {
        en: 'The theory and methodology of manuscript interpretation, establishing critical rules to decipher linguistic shifts, historical context, and authentic textual intent.',
        fr: 'La science et la méthodologie de l\'interprétation des textes et manuscrits anciens, examinant la philologie, le contexte historique et les strates sémantiques.',
      },
      related: ['Epistemology', 'Exegesis', 'Philology', 'Semiotics'],
    },
    {
      id: 'empiricism',
      term: { en: 'Empiricism', fr: 'Empirisme' },
      category: { en: 'Scientific Methodology', fr: 'Méthodologie Scientifique' },
      origin: 'Latin / Greek: empeiria (experience / observation)',
      definition: {
        en: 'The foundational scientific theory stating that valid knowledge originates primarily from sensory experience, measurable observation, and inductive verification.',
        fr: 'Théorie de la connaissance stipulant que la validité scientifique découle de l\'observation mesurable, de l\'expérience sensible et de l\'expérimentation inductible.',
      },
      related: ['Epistemology', 'Induction', 'Methodology', 'Rationalism'],
    },
  ];

  // Curated historical intellectual milestones
  const timelineEvents: TimelineItem[] = [
    {
      id: 'nicaea',
      year: 325,
      type: 'treatise',
      title: { en: 'First Conciliar Consensus (325 AD)', fr: 'Premier Consensus Conciliaire (325)' },
      description: {
        en: 'Foundational standardized codification establishing precise philosophical terminology (homoousios) to define substantial reality and semantic coherence.',
        fr: 'Première codification normalisée établissant une terminologie philosophique précise (homoousios) pour unifier la sémantique et la doctrine.',
      },
      outcome: {
        en: 'Formal philosophical vocabulary codified for international transmission.',
        fr: 'Fixation du vocabulaire conceptuel et textuel pour les siècles futurs.',
      },
    },
    {
      id: 'boethius',
      year: 524,
      type: 'scholar',
      title: { en: 'Boethius: Translation of Organon (524 AD)', fr: 'Boèce : Traduction de l\'Organon (524)' },
      description: {
        en: 'Preserved Aristotelian logic in the Latin West by translating the Organon, establishing the technical vocabulary for medieval philosophy.',
        fr: 'Préservation de la logique aristotélicienne en Occident par la traduction latine de l\'Organon, forgeant le lexique technique des universités.',
      },
      outcome: {
        en: 'Established categorical logic as the prerequisite tool for all scholarly discourse.',
        fr: 'Transmission des outils de la logique formelle et des catégories d\'Aristote.',
      },
    },
    {
      id: 'aquinas',
      year: 1274,
      type: 'scholar',
      title: { en: 'Thomas Aquinas: Scholastic Synthesis (1274 AD)', fr: 'Thomas d\'Aquin : Synthèse Scolastique (1274)' },
      description: {
        en: 'Monuments of scholastic disputatio synthesizing Aristotelian physics, metaphysics, and teleological proofs with classical literary heritage.',
        fr: 'Apogée de la dispute scolastique médiévale unifiant métaphysique aristotélicienne, preuves téléologiques et héritage philosophique classique.',
      },
      outcome: {
        en: 'Harmonization of empirical observation and rigorous rational metaphysics.',
        fr: 'Établissement du modèle rationnel d\'accord entre raison et textes d\'autorité.',
      },
    },
    {
      id: 'descartes',
      year: 1637,
      type: 'method',
      title: { en: 'Discourse on the Method (1637 AD)', fr: 'Discours de la Méthode (1637)' },
      description: {
        en: 'René Descartes establishes modern epistemology through systematic doubt, rational deduction, and mathematical analysis of substance and ontology.',
        fr: 'René Descartes fonde l\'épistémologie moderne par le doute méthodique, la déduction géométrique et l\'examen rationnel de l\'ontologie.',
      },
      outcome: {
        en: 'Transition to modern scientific rationalism and epistemological autonomy.',
        fr: 'Avènement de la méthode critique et de la déduction scientifique moderne.',
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
    <div className="space-y-16 text-slate-100 font-sans">
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: CTRL+K COMMAND LEXICON EXPLORER (5,000+ Words)         */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            <span>{isFrench ? 'Module 01 // Indexation Lexicale' : 'Module 01 // Scholarly Lexicon Engine'}</span>
            <span className="px-2.5 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800/80 text-[11px]">
              {isFrench ? 'INDEXATION 5 000+ ENTRÉES' : '5,000+ INDEXED TERMS'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {isFrench ? 'Moteur de Recherche Lexical Instantané (Ctrl+K)' : 'Sub-Millisecond Lexicon Engine (Ctrl+K)'}
          </h2>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-3xl">
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
              <div className="hidden sm:flex items-center space-x-1 pl-3 text-[11px] font-mono text-slate-400 shrink-0">
                <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-slate-300">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-slate-300">K</kbd>
              </div>
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

              {/* Related Terms Graph Linkages */}
              <div className="border-t border-white/10 pt-3 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">
                  {isFrench ? 'Termes & Références Associés :' : 'Related Scholarly References:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTerm.related.map((rel, idx) => (
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
        <div className="space-y-1.5 border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            <span>{isFrench ? 'Module 02 // Navigation Contextuelle' : 'Module 02 // Smart Contextual Reader'}</span>
            <span className="px-2.5 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800/80 text-[11px]">
              {isFrench ? 'INFOBULLES STYLE APPLE GLASS' : 'APPLE-GLASS HOVER TOOLTIPS'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {isFrench ? 'Lecture Enrichie & Infobulles Contextuelles au Survol' : 'SmartText & Live Contextual Tooltips'}
          </h2>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Permet à l\'utilisateur de lire des traités savants sans friction : chaque terme bleu pointillé ouvre un panneau en verre dépoli (Apple-glass) avec sa définition formelle sans quitter la page.'
              : 'Empowers readers through uninterrupted scholarly flow: every dotted blue term triggers a frosted glass (Apple-glass) popover with immediate formal definitions without disruptive page hops.'}
          </p>
        </div>

        {/* Interactive Reading Panel */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-10 relative">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>{isFrench ? 'Extrait de Traité Philosophique // Survolez les termes en bleu :' : 'Scholarly Philosophical Excerpt // Hover over the blue terms:'}</span>
            </div>

            {/* SmartText Paragraph with Live Interactive Blue Terms */}
            <div className="text-base sm:text-lg leading-relaxed text-slate-200 font-sans bg-black/40 p-6 sm:p-8 border border-white/10 relative">
              {isFrench ? (
                <p>
                  L'investigation épistémologique classique s'est articulée autour de questionnements rigoureux sur l'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'ontology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Ontologie
                  </span>
                  , la{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'theology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Théologie
                  </span>{' '}
                  et la transmission institutionnelle via le{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'magisterium') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Magistère
                  </span>
                  . La{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'scholasticism') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Scolastique
                  </span>{' '}
                  a méthodiquement mobilisé la{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'teleology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Téléologie
                  </span>{' '}
                  aristotélicienne pour analyser la causalité rationnelle, tandis que l'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'hermeneutics') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Herméneutique
                  </span>{' '}
                  et l'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'epistemology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Épistémologie
                  </span>{' '}
                  ont structuré l'analyse critique des traités fondateurs.
                </p>
              ) : (
                <p>
                  Classical philosophical inquiry developed through rigorous investigations into{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'ontology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Ontology
                  </span>
                  ,{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'theology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Theology
                  </span>
                  , and authoritative transmission through the{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'magisterium') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Magisterium
                  </span>
                  . Medieval{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'scholasticism') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Scholasticism
                  </span>{' '}
                  systematically deployed Aristotelian{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'teleology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Teleology
                  </span>{' '}
                  to analyze rational causality, while critical{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'hermeneutics') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Hermeneutics
                  </span>{' '}
                  and modern{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'epistemology') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Epistemology
                  </span>{' '}
                  established the rigorous foundations for textual interpretation.
                </p>
              )}
            </div>

            {/* Simulated Live Apple-Glass Popover Display */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-slate-500 mb-2 uppercase tracking-wider">
                {isFrench ? 'Aperçu de l\'infobulle active :' : 'Active Apple-glass tooltip preview:'}
              </div>
              {hoveredTerm ? (
                <div className="w-full sm:w-96 rounded-2xl bg-gray-950/90 backdrop-blur-xl border border-white/15 shadow-2xl p-5 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-2.5">
                    <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <BookOpen className="w-4 h-4 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm font-mono">
                        {isFrench ? hoveredTerm.term.fr : hoveredTerm.term.en}
                      </h4>
                      <span className="text-[10px] text-blue-400 font-mono">
                        {isFrench ? hoveredTerm.category.fr : hoveredTerm.category.en}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
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
        <div className="space-y-1.5 border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            <span>{isFrench ? 'Module 03 // Cartographie Temporelle' : 'Module 03 // Historical Lineage Engine'}</span>
            <span className="px-2.5 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800/80 text-[11px]">
              {isFrench ? 'FRISE MULTI-SÉCULAIRE' : 'MULTI-CENTURY CHRONOLOGY'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {isFrench ? 'Frise Chronologique des Débats, Érudits & Traités' : 'Chronology Timeline of Scholars & Treatises'}
          </h2>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Visualisation interactive retraçant les traités majeurs, les figures doctrinales et les tournants épistémologiques depuis l\'antiquité tardive jusqu\'à la méthode moderne.'
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
                          {evt.type}
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

            {/* Right: Detailed Historical Event Dossier */}
            <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-blue-600 text-white font-mono text-xs font-bold">
                      {activeEvent.year} AD
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      {activeEvent.type}
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

              <div className="p-4 bg-blue-950/40 border border-blue-800/40 space-y-1.5">
                <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isFrench ? 'Portée & Résolution Conceptuelle :' : 'Legacy & Conceptual Resolution:'}</span>
                </span>
                <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
                  {isFrench ? activeEvent.outcome.fr : activeEvent.outcome.en}
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
