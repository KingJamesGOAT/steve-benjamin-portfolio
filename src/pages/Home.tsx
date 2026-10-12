import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileDown, ExternalLink } from 'lucide-react';
import TechBentoGrid from '../components/features/TechBentoGrid';
import CryptoWidgetSim from '../components/features/CryptoWidgetSim';
import DonnonsWidgetSim from '../components/features/DonnonsWidgetSim';
import RotatingTitle from '../components/features/RotatingTitle';
import GlossaryTerm from '../components/features/GlossaryTerm';
import About from './About';
import DeveloperHeroCard from '../components/features/DeveloperHeroCard';

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
        'Ingénierie Logicielle & Full-Stack',
        'Design UX/UI & Architecture Web',
        'Gestion de Projet Digital',
      ]
    : [
        'Software Engineering',
        'UX/UI & Web Architecture',
        'Digital Product Management',
      ];

  return (
    <div className="space-y-32 sm:space-y-40">
      {/* SECTION 1: HERO & PHYSICS CANVAS */}
      <section id="home" className="scroll-mt-24 space-y-16 sm:space-y-24">
        {/* Two-Column FinTech Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Oversized Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Hero Headline & Subtitle */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-fintech-primary leading-[0.98]">
                Steve Benjamin
              </h1>

              <div className="text-xl sm:text-2xl font-normal text-fintech-secondary tracking-tight min-h-[2.5rem] flex flex-wrap items-baseline gap-x-2">
                <span className="text-fintech-secondary font-medium">
                  {t('home.heroPrefix', isFrench ? 'Expert en' : 'Expert in')}
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
                href="#bachelor-pitch"
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-none border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors shadow-sm uppercase tracking-wider"
              >
                <span>{t('home.ctaPitch')}</span>
              </a>

              <a
                href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-none border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-500 text-xs font-mono transition-colors shadow-sm"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Developer Telemetry Terminal */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <DeveloperHeroCard />
          </div>
        </div>

        {/* Centerpiece Tech Stack Bento Grid */}
        <TechBentoGrid />
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
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                {t('projects.crypto.title')}
              </h3>

              <Link
                to="/projects/crypto-trade-hub"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm sm:text-base text-fintech-secondary leading-relaxed">
              {isFrench
                ? 'Terminal de trading quantitatif conçu pour surveiller les paires de cryptomonnaies en temps réel, exécuter des allocations simulées et générer des synthèses de marché automatisées.'
                : 'Quantitative trading terminal engineered to monitor cryptocurrency pairs in real time, execute simulated allocations, and generate automated market summaries.'}
            </p>
          </div>

          {/* Full-Width Layout: Live Terminal Widget + Key Specifications Placed Underneath */}
          <div className="space-y-5">
            {/* Full-Width Quantitative Terminal Widget */}
            <div className="w-full border border-slate-800 rounded-none overflow-hidden bg-slate-950 shadow-xl">
              <CryptoWidgetSim />
            </div>

            {/* Architectural Context: Key Specifications (Under Graph across Full Width) */}
            <div className="rounded-none border border-slate-200 bg-slate-50/80 p-5 sm:p-6 space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-600 font-bold">
                  {isFrench ? 'Spécifications Clés' : 'Key Specifications'}
                </span>
                <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                  {isFrench ? 'TEMPS RÉEL' : 'REAL-TIME'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                    {isFrench ? 'Flux de Marché en Direct' : 'Live Market Feed'}
                  </span>
                  <p className="text-slate-500 pt-0.5 text-xs">
                    {isFrench ? (
                      <>
                        Reçoit les cours et volumes instantanément via{' '}
                        <GlossaryTerm
                          term="WebSockets Binance"
                          definition="Connexion réseau temps réel bidirectionnelle délivrant les variations de prix en quelques millisecondes sans recharger la page."
                        />{' '}
                        sans aucune latence.
                      </>
                    ) : (
                      <>
                        Streams live cryptocurrency prices and volume directly from{' '}
                        <GlossaryTerm
                          term="Binance WebSockets"
                          definition="Full-duplex network connection streaming live crypto price ticks with zero page reloads."
                        />{' '}
                        with sub-millisecond responsiveness.
                      </>
                    )}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                    {isFrench ? 'Stratégie & Gestion du Risque' : 'Automated Strategy & Risk'}
                  </span>
                  <p className="text-slate-500 pt-0.5 text-xs">
                    {isFrench ? (
                      <>
                        Utilise l'
                        <GlossaryTerm
                          term="Indicateur ADX"
                          definition="Average Directional Index : mesure la force de la tendance pour basculer automatiquement entre suivi de tendance et grille de retour à la moyenne."
                        />{' '}
                        pour détecter les tendances, et calcule la taille sécurisée des ordres via le{' '}
                        <GlossaryTerm
                          term="Critère de Kelly"
                          definition="Formule mathématique de gestion du risque optimisant la taille des positions tout en plafonnant strictement la perte maximale à 2%."
                        />
                        .
                      </>
                    ) : (
                      <>
                        Uses the{' '}
                        <GlossaryTerm
                          term="ADX Indicator"
                          definition="Average Directional Index: measures trend strength to switch automatically between momentum breakouts and range trading."
                        />{' '}
                        to detect market trends, and calculates safe order sizes using the{' '}
                        <GlossaryTerm
                          term="Kelly Criterion"
                          definition="A mathematical risk model that determines optimal position sizing to maximize growth while strictly capping downside loss to 2%."
                        />
                        .
                      </>
                    )}
                  </p>
                </div>

                <div className="space-y-2 border-t md:border-t-0 md:border-l md:pl-6 border-slate-200">
                  <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                    {isFrench ? 'Stack Technique' : 'Architecture Stack'}
                  </span>
                  <p className="text-slate-500 text-xs">
                    {isFrench
                      ? 'Architecture modulaire haute performance pour le traitement des données de trading temps réel.'
                      : 'High-performance modular architecture built for real-time streaming telemetry.'}
                  </p>
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
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                {t('projects.donnons.title')}
              </h3>

              <Link
                to="/projects/donnons-ch"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm sm:text-base text-fintech-secondary leading-relaxed">
              {t('projects.donnons.description')}
            </p>
          </div>

          {/* Full-Width Donnons.ch Simulator + Key Specifications Placed Underneath */}
          <div className="space-y-5">
            {/* Full-Width Interactive Widget */}
            <div className="w-full">
              <DonnonsWidgetSim />
            </div>

            {/* Architectural Context: Key Specifications (Under Widget across Full Width) */}
            <div className="rounded-none border border-slate-200 bg-slate-50/80 p-5 sm:p-6 space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-600 font-bold">
                  {isFrench ? 'Spécifications Clés' : 'Key Specifications'}
                </span>
                <span className="font-mono text-[10px] text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5">
                  {isFrench ? 'NOTE 6.0 / 6.0' : 'GRADE 6.0 / 6.0'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                    {isFrench ? 'Mandat Client Officiel' : 'Official Client Mandate'}
                  </span>
                  <p className="text-slate-500 pt-0.5 text-xs">
                    {isFrench
                      ? 'Développé pour les Hôpitaux Universitaires de Genève (HUG) pour digitaliser et démultiplier les collectes de sang en entreprise.'
                      : 'Commissioned by Geneva University Hospitals (HUG) to digitize and scale corporate blood collection drives.'}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                    {isFrench ? 'Gamification & Démystification' : 'Gamification & Eligibility UX'}
                  </span>
                  <p className="text-slate-500 pt-0.5 text-xs">
                    {isFrench
                      ? 'Quiz interactif bienveillant levant les freins psychologiques et simulateur d\'impact en direct pour engager les équipes.'
                      : 'Interactive frictionless eligibility quiz reducing medical apprehension paired with real-time impact simulation.'}
                  </p>
                </div>

                <div className="space-y-2 border-t md:border-t-0 md:border-l md:pl-6 border-slate-200">
                  <span className="font-semibold text-slate-800 block text-xs sm:text-sm">
                    {isFrench ? 'Stack Technique' : 'Architecture Stack'}
                  </span>
                  <p className="text-slate-500 text-xs">
                    {isFrench
                      ? 'Architecture moderne axée sur l\'accessibilité WCAG et la performance mobile.'
                      : 'Modern architecture prioritizing WCAG accessibility and mobile responsiveness.'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-mono text-slate-700">
                    <span className="px-2 py-0.5 bg-white border border-slate-200">Vue.js 3</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">Laravel REST</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">Tailwind CSS</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200">MySQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Showcases: Catholic Route & Marriage Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-none border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[11px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {t('projects.catholicRoute.tag')}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
                {t('projects.catholicRoute.title')}
              </h3>
              <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {t('projects.catholicRoute.description')}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">UX / UI Components</span>
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
              <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[11px] font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
                {t('projects.marriage.tag')}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
                {t('projects.marriage.title')}
              </h3>
              <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {t('projects.marriage.description')}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">RSVP State Engine</span>
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
      <section id="bachelor-pitch" className="scroll-mt-24 space-y-8">
        <div className="rounded-none border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-none text-xs font-mono font-medium bg-blue-50 text-electric border border-blue-200">
              <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
              <span>{t('bachelorPitch.tag')}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary">
              {t('bachelorPitch.title')}
            </h2>

            <p className="text-base sm:text-lg text-fintech-secondary max-w-3xl leading-relaxed">
              {t('bachelorPitch.subtitle')}
            </p>
          </div>

          {/* Quick Institutional Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">01 / Duration</div>
              <div className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.conditions.durationTitle')}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.conditions.durationDesc')}</p>
            </div>

            <div className="p-4 border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">02 / Financials</div>
              <div className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.conditions.costTitle')}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.conditions.costDesc')}</p>
            </div>

            <div className="p-4 border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">03 / Confidentiality</div>
              <div className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.conditions.confidentialityTitle')}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.conditions.confidentialityDesc')}</p>
            </div>
          </div>

          {/* Actions & Document Access */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4">
            <Link
              to="/bachelor-pitch"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider"
            >
              <span>{t('bachelorPitch.ctaExplore')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`${import.meta.env.BASE_URL}HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-none border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm"
            >
              <FileDown className="w-4 h-4 text-electric" />
              <span>{t('bachelorPitch.ctaGuide')}</span>
            </a>

            <a
              href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027"
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-none border border-slate-200 bg-white hover:border-slate-300 text-slate-700 text-xs font-mono transition-colors shadow-sm"
            >
              <span>sbstevebenjamin@gmail.com</span>
            </a>
          </div>

          <p className="text-xs font-mono text-slate-500">
            {t('bachelorPitch.ctaSubtitle')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
