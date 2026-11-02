import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileDown, ExternalLink, ChevronDown, ArrowUpRight } from 'lucide-react';
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

      <div className="space-y-12 sm:space-y-28 lg:space-y-40">
        {/* SECTION 1: HERO VIEWPORT */}
        <section
          id="home"
          className="min-h-0 lg:min-h-[calc(100vh-9.5rem)] flex flex-col justify-between scroll-mt-20 sm:scroll-mt-24"
        >
          {/* Two-Column FinTech Hero Grid */}
          <div className="my-0 lg:my-auto pt-2 pb-2 sm:py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
            {/* Left Column: Oversized Typography & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-8">
              {/* Hero Headline & Subtitle */}
              <div className="space-y-3 sm:space-y-4">
                {/* Availability Badge */}
                <div>
                  <Link
                    to="/bachelor-pitch"
                    className="group max-w-full inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono border border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:border-emerald-400 hover:bg-emerald-100/60 transition-colors shadow-2xs"
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="truncate">{isFrench ? 'Dispo · Mandat de Bachelor HEIG-VD 2027' : 'Available · Bachelor Mandate HEIG-VD 2027'}</span>
                    <span className="text-emerald-500 group-hover:translate-x-0.5 transition-transform text-[10px] shrink-0">→</span>
                  </Link>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight text-fintech-primary leading-[1.0] sm:leading-[0.95]">
                  <span className="block">Steve</span>
                  <span className="block">Benjamin</span>
                </h1>

                <div className="text-lg sm:text-2xl font-normal text-fintech-secondary tracking-tight min-h-[2rem] sm:min-h-[2.5rem] flex flex-wrap items-baseline gap-x-2">
                  <span className="text-fintech-secondary font-medium">
                    {t('home.heroPrefix', isFrench ? 'Votre' : 'Your')}
                  </span>
                  <RotatingTitle
                    titles={heroTitles}
                    intervalMs={5000}
                    className="text-electric font-bold"
                  />
                </div>

                <p className="text-sm sm:text-lg text-fintech-secondary max-w-xl leading-relaxed font-normal">
                  {t('home.description')}
                </p>
              </div>

              {/* Strict Rectangular FinTech Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider text-center"
                >
                  <span>{t('home.ctaCaseStudies')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`${import.meta.env.BASE_URL}${isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf'}
                  className="hidden sm:inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-none border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm uppercase tracking-wider text-center"
                >
                  <FileDown className="w-3.5 h-3.5 text-electric" />
                  <span>CV (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Developer Telemetry Terminal (Desktop only) */}
            <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
              <DeveloperHeroCard />
            </div>
          </div>

          {/* Clean Scroll Indicator to Skills (Desktop only) */}
          <div className="hidden sm:flex flex-col items-center justify-center pt-4 pb-2">
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
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform duration-200 group-hover:translate-y-1" />
              </div>
            </button>
          </div>
        </section>

        {/* SECTION 1.5: TECHNICAL SKILLS & SOFTWARE ECOSYSTEM */}
        <section id="skills" className="scroll-mt-20 pt-2 space-y-6 sm:space-y-8">
          <TechBentoGrid />
          <AppCarousel />

          {/* Minimalist Certifications Strip */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              {isFrench ? 'Certifications' : 'Certifications'}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {/* Item 1: Duke DeFi (Nov 2026) */}
              <div className="border border-slate-200 bg-white p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="min-w-0 pr-1">
                  <h4
                    className="text-xs sm:text-[13px] font-semibold text-fintech-primary truncate"
                    title="Decentralized Finance (DeFi): The Future of Finance"
                  >
                    Decentralized Finance (DeFi)
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono">
                    Duke University
                  </p>
                </div>
                <a
                  href="https://www.coursera.org/account/accomplishments/specialization/certificate/Z0YWQ005UI0C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-0.5 font-mono text-[11px] text-electric hover:underline font-medium"
                >
                  <span>{t('about.certifications.verify')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Item 2: Claude API (Oct 2026) */}
              <div className="border border-slate-200 bg-white p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="min-w-0 pr-1">
                  <h4 className="text-xs sm:text-[13px] font-semibold text-fintech-primary truncate">
                    Building with the Claude API
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono">
                    Anthropic
                  </p>
                </div>
                <a
                  href="https://academy.claude.com/verify/7b1fc8d9d4a19f6bb8e7d4b1a2ffa71b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-0.5 font-mono text-[11px] text-electric hover:underline font-medium"
                >
                  <span>{t('about.certifications.verify')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Item 3: Claude Code (Oct 2026) */}
              <div className="border border-slate-200 bg-white p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="min-w-0 pr-1">
                  <h4 className="text-xs sm:text-[13px] font-semibold text-fintech-primary truncate">
                    Claude Code 101
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-mono">
                    Anthropic
                  </p>
                </div>
                <a
                  href="https://academy.claude.com/verify/b22cbb90ce16cac2143dde13da2749bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-0.5 font-mono text-[11px] text-electric hover:underline font-medium"
                >
                  <span>{t('about.certifications.verify')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Section dividing line under the badges/skills */}
          <div className="border-b border-slate-200/80 pt-2" />
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
        <div className="rounded-none border border-slate-200 bg-white p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.crypto.title')}
                </h3>
                {/* Clean Impact Metric Badges (2 on mobile, 3 on desktop) */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '< 50ms Latence' : '< 50ms Latency'}
                  </span>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Flux Binance' : 'Live Binance'}
                  </span>
                  <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Modèle Risque Kelly' : 'Kelly Risk Engine'}
                  </span>
                </div>
              </div>

              <Link
                to="/projects/crypto-trade-hub"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="hidden sm:block text-xs sm:text-sm text-fintech-secondary leading-relaxed">
              {isFrench
                ? "Terminal de trading quantitatif et de surveillance de marché conçu pour diffuser les flux Binance en temps réel, automatiser le dimensionnement des positions selon le critère de Kelly et synthétiser l'actualité macro par IA. (Projet personnel en bêta — démo sur données simulées)."
                : 'Quantitative trading and market surveillance terminal engineered to stream live Binance order flow, automate position sizing via the Kelly Criterion, and synthesize macro catalysts with AI. (Personal project in beta — demo uses simulated data).'}
            </p>
          </div>

          {/* Full-Width Layout: Live Terminal Widget + Key Specifications Placed Underneath */}
          <div className="space-y-4 sm:space-y-5">
            {/* Full-Width Quantitative Terminal Widget */}
            <div className="w-full border border-slate-800 rounded-none overflow-hidden bg-slate-950 shadow-xl">
              <CryptoWidgetSim />
            </div>

            {/* Architectural Highlights: Balanced 3-Column Strip with Concise Explanation (Desktop only) */}
            <div className="hidden md:grid md:grid-cols-3 divide-x divide-slate-200 border border-slate-200 bg-slate-50/70 font-sans">
              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                  {isFrench ? '01 · FLUX TEMPS RÉEL' : '01 · REAL-TIME STREAM'}
                </span>
                <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                  Binance WebSockets (&lt; 50ms)
                </span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {isFrench
                    ? "Pipeline WebSocket bidirectionnel diffusant en direct les cours multi-actifs, l'EMA 20 et les cassures de volatilité."
                    : 'Full-duplex WebSocket pipeline streaming live multi-asset prices, 20-EMA trends, and volatility breakouts.'}
                </p>
              </div>

              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                  {isFrench ? '02 · MOTEUR DE RISQUE' : '02 · RISK ENGINE'}
                </span>
                <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                  {isFrench ? 'Critère de Kelly (Max 2% / Trade)' : 'Fractional Kelly (2% Max Risk)'}
                </span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {isFrench
                    ? 'Calculateur automatique de taille de position ajustant les stop-loss et plafonnant la perte maximale à 2 % du capital.'
                    : 'Automated position-sizing engine that calculates stop-loss distances and caps downside risk at 2% of equity.'}
                </p>
              </div>

              <div className="p-4 space-y-1">
                <span className="font-mono text-[10px] tracking-wider uppercase text-slate-400 font-bold block">
                  {isFrench ? '03 · SENTIMENT IA & STACK' : '03 · AI SENTIMENT & STACK'}
                </span>
                <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                  Groq LLaMA 3.3 · React 18 · TS
                </span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {isFrench
                    ? "Analyse l'impact des catalyseurs macro en temps réel (-1,0 à +1,0) au sein d'une architecture React 18 typée."
                    : 'Scores breaking macro catalysts in real time (-1.0 to +1.0) inside a modular, type-safe React 18 architecture.'}
                </p>
              </div>
            </div>

            {/* Mobile Consistent Bottom-Right Case Study Footer */}
            <div className="sm:hidden pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                React 18 · WebSockets
              </span>
              <Link
                to="/projects/crypto-trade-hub"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Primary Project 2: Donnons.ch */}
        <div className="rounded-none border border-slate-200 bg-white p-4 sm:p-8 shadow-sm space-y-4 sm:space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.donnons.title')}
                </h3>
                {/* Metric Badges (2 on mobile, 3 on desktop) */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {isFrench ? 'Note 6.0 / 6.0' : 'Grade 6.0 / 6.0'}
                  </span>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Réduction des refus' : 'Reduced Deferrals'}
                  </span>
                  <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Qualification Anonyme' : 'Anonymous Screening'}
                  </span>
                </div>
              </div>

              <Link
                to="/projects/donnons-ch"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="hidden sm:block text-xs sm:text-sm text-fintech-secondary leading-relaxed">
              {isFrench
                ? 'Plateforme de don de sang réalisée pour les Hôpitaux Universitaires de Genève (HUG) à la HEIG-VD pour pré-qualifier les volontaires en entreprise et réduire les refus de donneurs sur place.'
                : 'Blood donation platform engineered for Geneva University Hospitals (HUG) at HEIG-VD to pre-qualify corporate volunteers and reduce on-site donor rejections.'}
            </p>
          </div>

          {/* Full-Width Donnons.ch Simulator */}
          <div className="space-y-4 sm:space-y-5">
            <div className="w-full">
              <DonnonsWidgetSim />
            </div>

            {/* Architectural Highlights: 3 Crisp Data Points (Desktop only) */}
            <div className="hidden md:block rounded-none border border-slate-200 bg-slate-50/80 p-4 sm:p-5 font-sans">
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
                      ? 'De nombreux volontaires étaient refusés sur place. Donnons.ch pré-qualifie l\'éligibilité en amont pour réduire les refus de donneurs sur place.'
                      : 'Many willing donors were deferred on-site. Donnons.ch pre-screens eligibility to reduce on-site donor rejections.'}
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

            {/* Mobile Consistent Bottom-Right Case Study Footer */}
            <div className="sm:hidden pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Vue.js 3 · Laravel REST
              </span>
              <Link
                to="/projects/donnons-ch"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Smaller Showcases: Lexicon Engine & Marriage Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-none border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.catholicRoute.title')}
                </h3>
                {/* Metric Badges (2 on mobile, 3 on desktop) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '< 10ms Recherche' : '< 10ms Search Index'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '50+ Nœuds Sémantiques' : '50+ Semantic Nodes'}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Frise Réactive' : 'Reactive Timeline'}
                  </span>
                </div>
              </div>

              <p className="hidden sm:block text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {isFrench
                  ? 'Indexation de concepts historiques et exploration visuelle par graphe sémantique.'
                  : 'Historical concept indexation and visual semantic exploration graph.'}
              </p>

              {/* Interactive Lexicon & Chronology Simulation Widget */}
              <LexiconWidgetSim />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                React 18 · TypeScript
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

          <div className="rounded-none border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-fintech-primary">
                  {t('projects.marriage.title')}
                </h3>
                {/* Metric Badges (2 on mobile, 3 on desktop) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? '100% Mobile First' : '100% Mobile-First UX'}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Sync Webhook Excel' : 'Excel Webhook Sync'}
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {isFrench ? 'Zéro Lag 60 FPS' : 'Zero-Lag 60 FPS'}
                  </span>
                </div>
              </div>

              <p className="hidden sm:block text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {isFrench
                  ? 'Plateforme événementielle mobile-first intégrant un flux de RSVP interactif avec synchronisation temps réel vers tableur Excel.'
                  : 'Mobile-first event platform engineered with interactive RSVP guest intake and real-time webhook spreadsheet synchronization.'}
              </p>

              {/* Interactive Wedding Preview Widget */}
              <MarriageWidgetSim />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                React 18 · Serverless
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
      <section id="bachelor-pitch" className="scroll-mt-20 sm:scroll-mt-24">
        <div className="rounded-none border border-slate-200 bg-white p-4 sm:p-10 shadow-sm space-y-3.5 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-3">
            <h2 className="text-xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
              {t('bachelorPitch.title')}
            </h2>

            <p className="hidden sm:block text-xs sm:text-base text-fintech-secondary max-w-2xl leading-relaxed">
              {t('bachelorPitch.subtitle')}
            </p>
          </div>

          {/* 3 Key Institutional Highlights (3 uniform, aligned blocks on mobile & desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 py-0.5 sm:py-1">
            <div className="py-2.5 px-3 sm:p-5 border border-slate-200 bg-slate-50/70 flex items-center justify-center text-center shadow-2xs sm:shadow-xs">
              <span className="text-xs sm:text-base font-bold font-mono sm:font-sans text-fintech-primary tracking-tight">
                {t('bachelorPitch.conditions.durationTitle')}
              </span>
            </div>

            <div className="py-2.5 px-3 sm:p-5 border border-slate-200 bg-slate-50/70 flex items-center justify-center text-center shadow-2xs sm:shadow-xs">
              <span className="text-xs sm:text-base font-bold font-mono sm:font-sans text-fintech-primary tracking-tight">
                {t('bachelorPitch.conditions.costTitle')}
              </span>
            </div>

            <div className="py-2.5 px-3 sm:p-5 border border-slate-200 bg-slate-50/70 flex items-center justify-center text-center shadow-2xs sm:shadow-xs">
              <span className="text-xs sm:text-base font-bold font-mono sm:font-sans text-fintech-primary tracking-tight">
                {t('bachelorPitch.conditions.confidentialityTitle')}
              </span>
            </div>
          </div>

          {/* Actions & Document Access */}
          <div className="pt-2 sm:pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <Link
              to="/bachelor-pitch"
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 sm:py-3 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider text-center"
            >
              <span>{t('bachelorPitch.ctaExplore')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`${import.meta.env.BASE_URL}${isFrench ? 'HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf' : "HEIG-VD - IM - Bachelor's Thesis Guide for Companies - 2026-27.pdf"}`}
              target="_blank"
              rel="noopener noreferrer"
              download={isFrench ? 'HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf' : "HEIG-VD - IM - Bachelor's Thesis Guide for Companies - 2026-27.pdf"}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 rounded-none border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm text-center"
            >
              <FileDown className="w-4 h-4 text-electric" />
              <span>{t('bachelorPitch.ctaGuide')}</span>
            </a>

            <div className="hidden sm:block">
              <CopyEmailButton
                subject="HEIG-VD Bachelor Project 2027"
                className="px-4 py-3 rounded-none border border-slate-200 bg-white hover:border-slate-300 text-slate-700 text-xs shadow-sm justify-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
);
};

export default Home;
