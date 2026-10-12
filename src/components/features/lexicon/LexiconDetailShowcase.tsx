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
  era: 'early' | 'patristic' | 'scholastic' | 'trent';
  type: 'council' | 'scholar' | 'writing';
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  outcome: { en: string; fr: string };
}

export const LexiconDetailShowcase: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // 1. Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermId, setSelectedTermId] = useState<string>('magisterium');

  // 2. SmartText Hovered Term
  const [hoveredTerm, setHoveredTerm] = useState<LexiconTerm | null>(null);

  // 3. Timeline Active Era
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedEventId, setSelectedEventId] = useState<string>('nicaea');

  // Curated database extracted from the 5,000+ words lexicon codebase
  const lexiconData: LexiconTerm[] = [
    {
      id: 'magisterium',
      term: { en: 'Magisterium', fr: 'Magistère' },
      category: { en: 'Ecclesiology', fr: 'Ecclésiologie' },
      origin: 'Latin: magister (teacher / master)',
      definition: {
        en: 'The authoritative teaching office and guidance of the Church, exercised through apostolic succession to safeguard and authentically interpret the deposit of faith.',
        fr: 'L\'autorité d\'enseignement et d\'interprétation authentique de la foi, exercée à travers la succession apostolique pour préserver la vérité doctrinale.',
      },
      related: ['Depositum Fidei', 'Apostolic Succession', 'Ex Cathedra'],
    },
    {
      id: 'hypostatic-union',
      term: { en: 'Hypostatic Union', fr: 'Union Hypostatique' },
      category: { en: 'Christology', fr: 'Christologie' },
      origin: 'Greek: hypostasis (individual reality / subsistence)',
      definition: {
        en: 'The theological formulation ratified at the Council of Chalcedon (451 AD) defining the ineffable union of complete divine and human natures in the single person of Jesus Christ.',
        fr: 'La formulation théologique ratifiée au concile de Chalcédoine (451) définissant l\'union ineffable des deux natures (divine et humaine) en une unique personne divine.',
      },
      related: ['Chalcedon', 'Homoousios', 'Theotokos'],
    },
    {
      id: 'patristics',
      term: { en: 'Patristics', fr: 'Patristique' },
      category: { en: 'Historical Theology', fr: 'Théologie Historique' },
      origin: 'Latin: pater (father)',
      definition: {
        en: 'The scholarly discipline examining the writings, theological development, and conciliar contributions of the early Church Fathers from the 1st through 8th centuries.',
        fr: 'La discipline d\'étude consacrée aux écrits, à l\'exégèse et aux décisions conciliaires des Pères de l\'Église du Ier au VIIIe siècle.',
      },
      related: ['Augustine', 'Athanasius', 'John Chrysostom'],
    },
    {
      id: 'scholasticism',
      term: { en: 'Scholasticism', fr: 'Scolastique' },
      category: { en: 'Philosophy & Theology', fr: 'Philosophie & Théologie' },
      origin: 'Latin: scholasticus (belonging to a school)',
      definition: {
        en: 'The medieval philosophical and pedagogical method emphasizing rigorous dialectical dispute and Aristotelian metaphysics to harmonize reason with divine revelation.',
        fr: 'Méthode philosophique et pédagogique médiévale articulant la disputatio dialectique et la métaphysique aristotélicienne pour accorder foi et raison.',
      },
      related: ['Thomas Aquinas', 'Summa Theologiae', 'Disputatio'],
    },
    {
      id: 'quinque-viae',
      term: { en: 'Quinque Viae', fr: 'Quinque Viae (Cinq Voies)' },
      category: { en: 'Philosophical Proofs', fr: 'Preuves Philosophiques' },
      origin: 'Latin: The Five Ways',
      definition: {
        en: 'The five philosophical demonstrations formulated by St. Thomas Aquinas in the Summa Theologiae establishing the rational intelligibility of God through cosmological causality.',
        fr: 'Les cinq démonstrations philosophiques rédigées par Thomas d\'Aquin dans la Somme Théologique établissant la rationalité de l\'existence de Dieu par la causalité cosmologique.',
      },
      related: ['Prime Mover', 'First Cause', 'Teleology'],
    },
    {
      id: 'theotokos',
      term: { en: 'Theotokos', fr: 'Théotokos' },
      category: { en: 'Mariology & Christology', fr: 'Mariologie & Christologie' },
      origin: 'Greek: Theos (God) + tiktein (to bring forth)',
      definition: {
        en: 'The solemn title promulgated at the Council of Ephesus (431 AD) affirming Mary as God-Bearer to dogmatically safeguard the complete divinity of her Son.',
        fr: 'Titre dogmatique promulgué au concile d\'Éphèse (431) désignant Marie comme Mère de Dieu, garantissant l\'indivisibilité de la personne divine du Christ.',
      },
      related: ['Ephesus', 'Nestorianism', 'Christotokos'],
    },
    {
      id: 'tradition',
      term: { en: 'Tradition (Paradosis)', fr: 'Tradition (Paradosis)' },
      category: { en: 'Fundamental Theology', fr: 'Théologie Fondamentale' },
      origin: 'Greek: paradosis (handing over / transmission)',
      definition: {
        en: 'The living continuity and transmission of apostolic faith, worship, and conciliar consensus across historical generations, existing alongside written Scripture.',
        fr: 'La transmission vivante et continue de la foi apostolique, de la liturgie et de la doctrine à travers les siècles, formant avec l\'Écriture un unique dépôt de la foi.',
      },
      related: ['Magisterium', 'Scripture', 'Rule of Faith'],
    },
    {
      id: 'ex-cathedra',
      term: { en: 'Ex Cathedra', fr: 'Ex Cathedra' },
      category: { en: 'Ecclesiology', fr: 'Ecclésiologie' },
      origin: 'Latin: from the chair',
      definition: {
        en: 'A Latin term denoting definitive, irreformable pronouncements on faith or morals proclaimed by the apostolic primacy in solemn conciliar or supreme definition.',
        fr: 'Locution latine signifiant « depuis la chaire », qualifiant une déclaration solennelle et définitive touchant la foi ou les mœurs émise en vertu de l\'autorité suprême.',
      },
      related: ['Papal Primacy', 'Infallibility', 'Dogma'],
    },
  ];

  // Curated multi-century timeline data based on timelineData.ts
  const timelineEvents: TimelineItem[] = [
    {
      id: 'nicaea',
      year: 325,
      era: 'early',
      type: 'council',
      title: { en: 'First Council of Nicaea', fr: 'Premier Concile de Nicée' },
      description: {
        en: 'Convened to resolve the Arian controversy. Formulated the Nicene Creed declaring the Son consubstantial (homoousios) with the Father.',
        fr: 'Réuni pour régler la crise arienne. Rédigea le Credo de Nicée affirmant le Fils consubstantiel (homoousios) au Père.',
      },
      outcome: {
        en: 'Definitive defeat of Arianism; standardized calculation method for Easter.',
        fr: 'Réfutation de l\'arianisme; fixation de la date de calcul de Pâques.',
      },
    },
    {
      id: 'constantinople',
      year: 381,
      era: 'early',
      type: 'council',
      title: { en: 'First Council of Constantinople', fr: 'Premier Concile de Constantinople' },
      description: {
        en: 'Affirmed the divinity and personhood of the Holy Spirit against the Pneumatomachians, expanding the Creed to its timeless liturgy form.',
        fr: 'Affirma la divinité du Saint-Esprit contre les pneumatomaques, complétant le Credo sous sa forme liturgique actuelle.',
      },
      outcome: {
        en: 'Niceno-Constantinopolitan Creed universally codified.',
        fr: 'Codification définitive du Credo de Nicée-Constantinople.',
      },
    },
    {
      id: 'ephesus',
      year: 431,
      era: 'patristic',
      type: 'council',
      title: { en: 'Council of Ephesus', fr: 'Concile d\'Éphèse' },
      description: {
        en: 'Led by St. Cyril of Alexandria against Nestorius. Dogmatically ratified the title Theotokos (God-Bearer).',
        fr: 'Présidé par Cyrille d\'Alexandrie contre Nestorius. Ratification dogmatique du titre de Théotokos.',
      },
      outcome: {
        en: 'Preserved the unified divinity and humanity of Christ from conception.',
        fr: 'Préservation de l\'unité personnelle du Verbe incarné.',
      },
    },
    {
      id: 'chalcedon',
      year: 451,
      era: 'patristic',
      type: 'council',
      title: { en: 'Council of Chalcedon', fr: 'Concile de Chalcédoine' },
      description: {
        en: 'Established the Chalcedonian Definition: Christ acknowledged in two natures, unconfusedly, unchangeably, indivisibly, inseparably.',
        fr: 'Établit la définition chalcédonienne : le Christ en deux natures, sans confusion, sans changement, sans division, sans séparation.',
      },
      outcome: {
        en: 'Cornerstone definition of Christian Christological orthodoxy.',
        fr: 'Fondation définitive de l\'orthodoxie christologique.',
      },
    },
    {
      id: 'aquinas',
      year: 1274,
      era: 'scholastic',
      type: 'scholar',
      title: { en: 'St. Thomas Aquinas (Summa Theologiae)', fr: 'St Thomas d\'Aquin (Somme Théologique)' },
      description: {
        en: 'Completed monumental synthesis of Aristotelian philosophical rigor with biblical revelation and patristic theology.',
        fr: 'Achèvement de la synthèse monumentale alliant rigueur aristotélicienne, révélation biblique et patristique.',
      },
      outcome: {
        en: 'Peak achievement of Western scholastic metaphysics and ethics.',
        fr: 'Apogée de la métaphysique et de la théologie rationnelle occidentale.',
      },
    },
    {
      id: 'trent',
      year: 1545,
      era: 'trent',
      type: 'council',
      title: { en: 'Council of Trent (1545-1563)', fr: 'Concile de Trente (1545-1563)' },
      description: {
        en: 'Comprehensive reform of ecclesiastical discipline, codification of the biblical canon (73 books), and clarification of justification.',
        fr: 'Réforme d\'ensemble de la discipline ecclésiale, codification du canon scripturaire (73 livres) et clarification de la doctrine de la justification.',
      },
      outcome: {
        en: 'Uniform liturgical standard and foundation of modern seminary education.',
        fr: 'Standardisation liturgique et fondation des séminaires modernes.',
      },
    },
  ];

  // Filtering lexicon
  const filteredLexicon = lexiconData.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      item.term.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.term.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.fr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const activeTerm = lexiconData.find((t) => t.id === selectedTermId) || lexiconData[0];

  // Filtering timeline
  const filteredEvents = timelineEvents.filter((item) => {
    if (selectedEra === 'all') return true;
    return item.era === selectedEra;
  });

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
              ? 'Conçu pour indexer plus de 5 000 termes théologiques, patristiques et philosophiques. Intègre une recherche floue avec raccourci global Ctrl+K, étymologies complètes et graphe sémantique.'
              : 'Engineered to index over 5,000 theological, patristic, and philosophical terms. Features instant client-side fuzzy querying with global Ctrl+K command shortcut, etymology tracing, and semantic term linkages.'}
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
                placeholder={
                  isFrench
                    ? 'Rechercher parmi plus de 5 000 termes (ex: Magistère, Hypostatique, Scolastique)...'
                    : 'Search across 5,000+ indexed terms (e.g., Magisterium, Hypostatic, Scholasticism)...'
                }
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 font-mono focus:outline-none"
              />
              <div className="hidden sm:flex items-center space-x-1 pl-3 text-[11px] font-mono text-slate-400 shrink-0">
                <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-slate-300">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-slate-300">K</kbd>
              </div>
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 text-[11px] font-mono">
              <span className="text-slate-500 mr-1">{isFrench ? 'Accès rapide :' : 'Quick query:'}</span>
              {lexiconData.slice(0, 6).map((term) => (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => {
                    setSelectedTermId(term.id);
                    setSearchQuery(isFrench ? term.term.fr : term.term.en);
                  }}
                  className={`px-2 py-0.5 border text-xs transition-colors ${
                    selectedTermId === term.id
                      ? 'bg-blue-600 text-white border-blue-400 font-bold'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:border-blue-500/50 hover:text-white'
                  }`}
                >
                  {isFrench ? term.term.fr : term.term.en}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Two-Column Result Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Left: Term List */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 p-2 max-h-[340px] overflow-y-auto divide-y divide-white/5 space-y-1">
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
                    <div className="space-y-0.5 pr-2">
                      <div className="font-mono text-sm font-bold group-hover:text-blue-300 transition-colors">
                        {isFrench ? term.term.fr : term.term.en}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {isFrench ? term.category.fr : term.category.en}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 text-slate-400">
                      {term.id}
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
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider block">
                      {isFrench ? activeTerm.category.fr : activeTerm.category.en}
                    </span>
                    <h3 className="text-2xl font-bold font-mono text-white">
                      {isFrench ? activeTerm.term.fr : activeTerm.term.en}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
                    {activeTerm.origin}
                  </span>
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
              ? 'Permet à l\'utilisateur de lire des textes complexes sans friction : chaque terme bleu pointillé ouvre un panneau en verre dépoli (Apple-glass) avec la définition doctrinale exacte sans quitter la page.'
              : 'Empowers readers through uninterrupted scholarly flow: every dotted blue term triggers a frosted glass (Apple-glass) popover with immediate authoritative definitions without disruptive page hops.'}
          </p>
        </div>

        {/* Interactive Reading Panel */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-10 relative">
          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>{isFrench ? 'Extrait de Traité Historique // Survolez les termes en bleu :' : 'Scholarly Text Excerpt // Hover over the blue terms:'}</span>
            </div>

            {/* SmartText Paragraph with Live Interactive Blue Terms */}
            <div className="text-base sm:text-lg leading-relaxed text-slate-200 font-sans bg-black/40 p-6 sm:p-8 border border-white/10 relative">
              {isFrench ? (
                <p>
                  Le développement doctrinal des premiers siècles s'est opéré par une dialectique patristique rigoureuse. Les définitions touchant au{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'magisterium') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Magistère
                  </span>{' '}
                  et à l'
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'hypostatic-union') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Union Hypostatique
                  </span>{' '}
                  ont été formellement codifiées face aux hérésies lors des assemblées conciliaires. Plus tard, la{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'scholasticism') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Scolastique
                  </span>{' '}
                  médiévale, illustrée par les célèbres{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'quinque-viae') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Quinque Viae
                  </span>{' '}
                  de Thomas d'Aquin, a articulé la rationalité métaphysique avec la révélation sacrée, tandis que le principe de{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'tradition') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Tradition
                  </span>{' '}
                  assurait la continuité vivante de la règle de foi.
                </p>
              ) : (
                <p>
                  The theological synthesis of classical antiquity evolved through rigorous patristic inquiry. Foundational definitions concerning the{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'magisterium') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Magisterium
                  </span>{' '}
                  and the{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'hypostatic-union') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Hypostatic Union
                  </span>{' '}
                  were dogmatically codified at early ecumenical assemblies. Medieval{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'scholasticism') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Scholasticism
                  </span>
                  , spearheading the monumental{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'quinque-viae') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Quinque Viae
                  </span>{' '}
                  of Thomas Aquinas, harmonized Aristotelian metaphysics with sacred revelation, while the apostolic principle of{' '}
                  <span
                    className="inline text-blue-400 underline decoration-blue-500/60 decoration-dotted decoration-2 underline-offset-4 hover:text-blue-300 hover:decoration-blue-400 cursor-help transition-colors font-medium relative group"
                    onMouseEnter={() => setHoveredTerm(lexiconData.find((t) => t.id === 'tradition') || null)}
                    onMouseLeave={() => setHoveredTerm(null)}
                  >
                    Tradition
                  </span>{' '}
                  preserved unbroken historical continuity.
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
                  <div className="text-[10px] text-slate-500 font-mono pt-1">
                    {hoveredTerm.origin}
                  </div>
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
      {/* SECTION 3: MULTI-CENTURY CHRONOLOGY & CONCILIAR TIMELINE          */}
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
            {isFrench ? 'Frise Chronologique des Conciles, Érudits & Écrits' : 'Chronology Timeline of Councils & Treatises'}
          </h2>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Visualisation interactive retraçant les conciles majeurs, les figures doctrinales et les traités fondateurs depuis le IVe siècle jusqu\'aux réformes modernes.'
              : 'Interactive chronological visualization charting landmark ecumenical councils, scholastic scholars, and foundational treatises from the 4th century to modern assemblies.'}
          </p>
        </div>

        {/* Timeline Interactive Component */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Era Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-slate-400 mr-2">{isFrench ? 'Période :' : 'Era:'}</span>
            {[
              { id: 'all', label: isFrench ? 'Tous les siècles' : 'All Centuries' },
              { id: 'early', label: isFrench ? 'Premiers Conciles (325-381)' : 'Early Councils (325-381)' },
              { id: 'patristic', label: isFrench ? 'Période Patristique (431-451)' : 'Patristic Era (431-451)' },
              { id: 'scholastic', label: isFrench ? 'Apogée Scolastique (1274)' : 'Scholastic Peak (1274)' },
              { id: 'trent', label: isFrench ? 'Concile de Trente (1545)' : 'Council of Trent (1545)' },
            ].map((era) => (
              <button
                key={era.id}
                type="button"
                onClick={() => setSelectedEra(era.id)}
                className={`px-3 py-1 border text-xs font-mono transition-colors ${
                  selectedEra === era.id
                    ? 'bg-blue-600 text-white border-blue-400 font-bold'
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Timeline Grid: Event Buttons & Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Chronological Scrubber */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                {isFrench ? 'Sélectionner un jalon historique :' : 'Select historical milestone:'}
              </span>
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {filteredEvents.map((evt) => (
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
                  <span>{isFrench ? 'Décision & Portée Dogmatique :' : 'Dogmatic Resolution & Legacy:'}</span>
                </span>
                <p className="text-xs text-blue-100/90 leading-relaxed font-sans">
                  {isFrench ? activeEvent.outcome.fr : activeEvent.outcome.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 4: DOCUMENTARY & LECTURE MEDIA PLAYER                     */}
      {/* ----------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            <span>{isFrench ? 'Module 04 // Intégration Audiovisuelle' : 'Module 04 // Documentary Lecture Media'}</span>
            <span className="px-2.5 py-0.5 bg-blue-950/80 text-blue-300 border border-blue-800/80 text-[11px]">
              {isFrench ? 'LECTEUR VIDÉO 16:9' : '16:9 EMBEDDED PLAYER'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {isFrench ? 'Conférences & Analyse Documentaire Intégrées' : 'Documentary Lectures & Textual Transmission'}
          </h2>
          <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-3xl">
            {isFrench
              ? 'Diffusion de contenus académiques et documentaires vidéo sur l\'histoire des manuscrits et la transmission des textes anciens avec chapitrage responsive.'
              : 'Scholarly video documentary and lecture embeds analyzing manuscript transmission, early council debates, and codicology with synchronized chapter bookmarks.'}
          </p>
        </div>

        {/* 16:9 Minimalist Video Player */}
        <div className="bg-[#05050a] border border-white/10 shadow-2xl p-6 sm:p-8 space-y-5">
          <div className="aspect-video w-full rounded-none overflow-hidden bg-black border border-white/15 shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/KOqJTRtbgtM"
              title="Historical & Manuscript Analysis"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Video Metadata & Chapters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">
                {isFrench ? 'Chapitre 01' : 'Chapter 01'}
              </span>
              <span className="text-white font-bold block">
                {isFrench ? 'Manuscrits & Textes Anciens' : 'Early Manuscripts & Patristic Sources'}
              </span>
              <span className="text-blue-400 text-[11px]">00:00 - 05:20</span>
            </div>

            <div className="p-3 bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">
                {isFrench ? 'Chapitre 02' : 'Chapter 02'}
              </span>
              <span className="text-white font-bold block">
                {isFrench ? 'Consensus Conciliaire' : 'Conciliar Consensus in Rome & Alexandria'}
              </span>
              <span className="text-blue-400 text-[11px]">05:21 - 12:45</span>
            </div>

            <div className="p-3 bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase">
                {isFrench ? 'Chapitre 03' : 'Chapter 03'}
              </span>
              <span className="text-white font-bold block">
                {isFrench ? 'Autorité & Continuité' : 'Ecclesiastical Authority & Reception'}
              </span>
              <span className="text-blue-400 text-[11px]">12:46 - 20:10</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LexiconDetailShowcase;
