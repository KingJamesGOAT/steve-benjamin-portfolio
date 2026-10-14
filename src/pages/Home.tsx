import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileDown, ExternalLink, ChevronDown } from 'lucide-react';
import TechBentoGrid from '../components/features/TechBentoGrid';
import CryptoWidgetSim from '../components/features/CryptoWidgetSim';
import DonnonsWidgetSim from '../components/features/DonnonsWidgetSim';
import LexiconWidgetSim from '../components/features/LexiconWidgetSim';
import MarriageWidgetSim from '../components/features/MarriageWidgetSim';
import RotatingTitle from '../components/features/RotatingTitle';
import About from './About';
import DeveloperHeroCard from '../components/features/DeveloperHeroCard';
import IntroAnimation from '../components/features/IntroAnimation';
import AppCarousel from '../components/features/AppCarousel';
import CopyEmailButton from '../components/core/CopyEmailButton';

export const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';

  // Smooth scroll to hash anchor on mount or hash change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [location.hash]);

  const rawTitles = t('home.heroTitles', { returnObjects: true });
  const heroTitles: string[] = Array.isArray(rawTitles)
    ? (rawTitles as string[])
    : isFrench
    ? [
        'Ingénieur des Médias',
        'Développeur Full-Stack',
        'Architecte Web & UI/UX',
      ]
    : [
        'Media Engineer',
        'Full-Stack Developer',
        'Web & UI/UX Architect',
      ];

  return (
    <>
      {/* Cinematic Intro Reveal Animation */}
      <IntroAnimation />

      <div className="space-y-32 sm:space-y-40">
        {/* SECTION 1: HERO VIEWPORT (FULL-VIEWPORT COVERAGE) */}
        <section
          id="home"
          className="min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-9.5rem)] flex flex-col justify-between scroll-mt-24"
        >
          {/* Two-Column FinTech Hero Grid */}
          <div className="my-auto py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Oversized Typography & CTAs */}
            <div className="lg:col-span-7 space-y-8">
              {/* Hero Headline & Subtitle */}
              <div className="space-y-4">
                {/* Availability Badge */}
                <div>
                  <Link
                    to="/bachelor-pitch"
                    className="group inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono border border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100/60 transition-colors shadow-2xs"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>{isFrench ? 'Dispo · Mandat Bachelor 2027' : 'Available · Bachelor Mandate 2027'}</span>
                    <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform text-[10px]">→</span>
                  </Link>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-[4.75rem] font-black tracking-tight text-fintech-primary leading-[0.95]">
                  <span className="block">Steve</span>
                  <span className="block">Benjamin</span>
                </h1>

                <div className="text-xl sm:text-2xl font-normal text-fintech-secondary tracking-tight min-h-[2.5rem] flex flex-wrap items-baseline gap-x-2">
                  <span className="text-fintech-secondary font-medium">
                    {t('home.heroPrefix', isFrench ? 'Votre' : 'Your')}
                  </span>
                  <RotatingTitle
                    titles={heroTitles}
                    intervalMs={5000}
                    className="text-electric font-bold"
                  />
                </div>

                <p className="text-base sm:text-lg text-fintech-secondary max-w-xl leading-relaxed font-normal">
                  {t('home.description')}
                </p>
              </div>

              {/* Strict Rectangular FinTech Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider"
                >
                  <span>{t('home.ctaCaseStudies')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-none border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm uppercase tracking-wider"
                >
                  <FileDown className="w-3.5 h-3.5 text-electric" />
                  <span>CV (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Developer Telemetry Terminal */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <DeveloperHeroCard />
            </div>
          </div>

          {/* Clean Scroll Indicator to Skills */}
          <div className="flex flex-col items-center justify-center pt-4 pb-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('skills');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group flex flex-col items-center space-y-1.5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer select-none focus:outline-hidden"
              aria-label={isFrench ? 'Voir les compétences techniques' : 'Scroll to technical skills'}
            >
              <span className="text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {isFrench ? 'Compétences' : 'Skills'}
              </span>
              <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 bg-white shadow-2xs flex items-center justify-center transition-all duration-200 group-hover:shadow-xs">
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 group-hover:translate-y-0.5 animate-bounce" />
              </div>
            </button>
          </div>
        </section>

        {/* SECTION 1.5: TECHNICAL SKILLS & SOFTWARE ECOSYSTEM */}
        <section id="skills" className="scroll-mt-20 pt-2 space-y-4">
          <TechBentoGrid />
          <AppCarousel />
        </section>

      {/* SECTION 2: PROJECTS */}
      <section id="projects" className="scroll-mt-24 space-y-12">
        <div className="space-y-2 border-b border-slate-200/80 pb-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
            {t('projects.title')}
          </h2>
          <p className="text-sm sm:text-base text-fintech-secondary max-w-2xl leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Primary Project 1: Crypto Trade Hub */}
        <div className="rounded-none border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.crypto.title')}
                </h3>
                {/* 3 High-Impact Metric Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '< 50ms Latence Ticks' : '< 50ms Tick Latency'}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Modèle de Risque Kelly' : 'Kelly Risk Engine'}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    LLaMA 3.3 AI
                  </span>
                </div>
              </div>

              <Link
                to="/projects/crypto-trade-hub"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
              {isFrench
                ? 'Terminal de trading quantitatif temps réel connectant les flux Binance WebSockets, avec dimensionnement autonome des ordres selon le Critère de Kelly et synthèses LLaMA 3.3.'
                : 'Real-time quantitative trading terminal streaming live Binance WebSockets with automated Kelly-sized risk management and automated LLaMA 3.3 summaries.'}
            </p>
          </div>

          {/* Full-Width Layout: Live Terminal Widget + Key Specifications Placed Underneath */}
          <div className="space-y-5">
            {/* Full-Width Quantitative Terminal Widget */}
            <div className="w-full border border-slate-800 rounded-none overflow-hidden bg-slate-950 shadow-xl">
              <CryptoWidgetSim />
            </div>

            {/* Architectural Highlights: 3 Crisp Data Points */}
            <div className="rounded-none border border-slate-200 bg-slate-50/80 p-4 sm:p-5 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs text-slate-600">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                    {isFrench ? 'FLUX TEMPS RÉEL' : 'REAL-TIME DATA'}
                  </span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                    Binance WebSockets
                  </span>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isFrench
                      ? 'Streaming bidirectionnel full-duplex de ticks crypto sans rechargement de page.'
                      : 'Full-duplex tick streaming delivering live price movements with zero page reload.'}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                    {isFrench ? 'GESTION DU RISQUE' : 'QUANTITATIVE RISK'}
                  </span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                    {isFrench ? 'Critère de Kelly & ADX' : 'Kelly Criterion & ADX'}
                  </span>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isFrench
                      ? 'Détection de tendance automatique et plafonnement strict de la perte maximale à 2%.'
                      : 'Automated regime detection with strict 2% downside capital protection formula.'}
                  </p>
                </div>

                <div className="space-y-1 border-t md:border-t-0 md:border-l md:pl-6 border-slate-200">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                    {isFrench ? 'STACK PRODUCTION' : 'PRODUCTION STACK'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-slate-700">
                    <span className="px-2 py-0.5 bg-white border border-slate-200">React 18</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">TypeScript</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">WebSockets</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">LLaMA 3.3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Project 2: Donnons.ch */}
        <div className="rounded-none border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.donnons.title')}
                </h3>
                {/* 3 High-Impact Metric Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {isFrench ? 'Note 6.0 / 6.0 HUG & HEIG-VD' : 'Grade 6.0 / 6.0 HUG & HEIG-VD'}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '-30% Rejets sur Place' : '-30% On-Site Deferrals'}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    Vue 3 · Laravel API
                  </span>
                </div>
              </div>

              <Link
                to="/projects/donnons-ch"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
              {isFrench
                ? 'Plateforme primée développée pour les Hôpitaux Universitaires de Genève (HUG) : qualification anonyme des donneurs en entreprise pour résorber le taux de rejet de 30%.'
                : 'Award-winning blood donation platform engineered for Geneva University Hospitals (HUG) to pre-qualify corporate volunteers and eliminate the 30% on-site deferral bottleneck.'}
            </p>
          </div>

          {/* Full-Width Donnons.ch Simulator + Key Specifications Placed Underneath */}
          <div className="space-y-5">
            {/* Full-Width Interactive Widget */}
            <div className="w-full">
              <DonnonsWidgetSim />
            </div>

            {/* Architectural Highlights: 3 Crisp Data Points */}
            <div className="rounded-none border border-slate-200 bg-slate-50/80 p-4 sm:p-5 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs text-slate-600">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                    {isFrench ? 'DÉFI INSTITUTIONNEL' : 'INSTITUTIONAL CHALLENGE'}
                  </span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                    {isFrench ? 'Mandat HUG & HEIG-VD' : 'HUG & HEIG-VD Mandate'}
                  </span>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isFrench
                      ? '30% des volontaires étaient refusés sur place par manque d\'information. Donnons.ch pré-qualifie l\'éligibilité en amont.'
                      : '30% of willing corporate donors were deferred at collection points. Donnons.ch pre-screens eligibility playfully.'}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                    {isFrench ? 'ENGAGEMENT & IMPACT' : 'GAMIFICATION & CSR'}
                  </span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                    {isFrench ? 'Roby Mascotte & Label CTS' : 'Roby Mascot & CTS Label'}
                  </span>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {isFrench
                      ? 'Quiz médical interactif, projection de vies sauvées en direct et reconnaissance RSE d\'entreprise.'
                      : 'Interactive quiz, real-time lives-saved impact calculation, and corporate employer CSR engagement.'}
                  </p>
                </div>

                <div className="space-y-1 border-t md:border-t-0 md:border-l md:pl-6 border-slate-200">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                    {isFrench ? 'STACK PRODUCTION' : 'PRODUCTION STACK'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-slate-700">
                    <span className="px-2 py-0.5 bg-white border border-slate-200">Vue.js 3</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">MySQL</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">Laravel REST</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Showcases: Lexicon Engine & Marriage Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.catholicRoute.title')}
                </h3>
                {/* 3 Metric Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '< 10ms Recherche' : '< 10ms Search Index'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '50+ Nœuds Sémantiques' : '50+ Semantic Nodes'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Frise Réactive' : 'Reactive Timeline'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {isFrench
                  ? 'Moteur de recherche instantané (< 10ms) et frise chronologique pour explorer des définitions'
                  : 'Instant search engine (< 10ms) and interactive timeline for exploring definitions'}
              </p>

              {/* Interactive Lexicon & Chronology Simulation Widget */}
              <LexiconWidgetSim />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                React 18 · TypeScript · SVG
              </span>
              <Link
                to="/projects/catholic-route"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.marriage.title')}
                </h3>
                {/* 3 Metric Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '100% Mobile First' : '100% Mobile-First UX'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Sync Webhook Excel' : 'Excel Webhook Sync'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Zéro Lag 60 FPS' : 'Zero-Lag 60 FPS'}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {isFrench
                  ? 'Plateforme événementielle mobile-first intégrant un flux de RSVP interactif avec synchronisation temps réel vers tableur Excel.'
                  : 'Mobile-first event platform engineered with interactive RSVP guest intake and real-time webhook spreadsheet synchronization.'}
              </p>

              {/* Interactive Wedding Preview Widget */}
              <MarriageWidgetSim />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                React 18 · LocalStorage · Serverless
              </span>
              <Link
                to="/projects/marriage-platform"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <About id="about" />

      {/* SECTION 4: BACHELOR PITCH */}
      <section id="bachelor-pitch" className="scroll-mt-24">
        <div className="rounded-none border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
              {t('bachelorPitch.title')}
            </h2>

            <p className="text-sm sm:text-base text-fintech-secondary max-w-2xl leading-relaxed">
              {t('bachelorPitch.subtitle')}
            </p>
          </div>

          {/* 3 Key Institutional Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-1">
            <div className="p-4 sm:p-5 border border-slate-200 bg-slate-50/70 flex items-center justify-center text-center shadow-xs">
              <span className="text-sm sm:text-base font-bold text-fintech-primary tracking-tight">
                {isFrench ? '14 Semaines Dédiées' : '14 Dedicated Weeks'}
              </span>
            </div>

            <div className="p-4 sm:p-5 border border-slate-200 bg-slate-50/70 flex items-center justify-center text-center shadow-xs">
              <span className="text-sm sm:text-base font-bold text-fintech-primary tracking-tight">
                {isFrench ? 'CHF 0 de Salaire Obligatoire' : 'CHF 0 Mandatory Salary'}
              </span>
            </div>

            <div className="p-4 sm:p-5 border border-slate-200 bg-slate-50/70 flex items-center justify-center text-center shadow-xs">
              <span className="text-sm sm:text-base font-bold text-fintech-primary tracking-tight">
                {isFrench ? 'Confidentialité & NDA Garantis' : 'Strict NDA & IP Transfer'}
              </span>
            </div>
          </div>

          {/* Actions & Document Access */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <Link
              to="/bachelor-pitch"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider"
            >
              <span>{t('bachelorPitch.ctaExplore')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`${import.meta.env.BASE_URL}HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-none border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4 text-electric" />
              <span>{t('bachelorPitch.ctaGuide')}</span>
            </a>

            <CopyEmailButton className="px-5 py-3 rounded-none border border-slate-200 bg-white hover:border-slate-300 text-slate-700 text-xs shadow-sm" />
          </div>
        </div>
      </section>
    </div>
  </>
);
};

export default Home;
