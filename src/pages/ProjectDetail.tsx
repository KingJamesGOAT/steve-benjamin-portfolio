import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import MarketOverviewSim from '../components/features/crypto/MarketOverviewSim';
import PaperTradingSim from '../components/features/crypto/PaperTradingSim';
import MarketIntelligenceSim from '../components/features/crypto/MarketIntelligenceSim';
import DonnonsDetailShowcase from '../components/features/donnons/DonnonsDetailShowcase';
import LexiconDetailShowcase from '../components/features/lexicon/LexiconDetailShowcase';
import MarriageDetailShowcase from '../components/features/marriage/MarriageDetailShowcase';
import GlossaryTerm from '../components/features/GlossaryTerm';
import { getGlossaryDef } from '../data/cryptoGlossary';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';

  const project = PROJECTS_DATA.find((p) => p.slug === projectId);
  const isCryptoHub = projectId === 'crypto-trade-hub';
  const isDonnons = projectId === 'donnons-ch';
  const isLexicon = projectId === 'catholic-route';
  const isMarriage = projectId === 'marriage-platform';
  const [activeCryptoTab, setActiveCryptoTab] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    setActiveCryptoTab(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-fintech-primary">
          {isFrench ? 'Projet introuvable' : 'Project Not Found'}
        </h1>
        <p className="text-sm text-slate-500">
          {isFrench
            ? 'L\'étude de cas demandée n\'a pas pu être localisée.'
            : 'The requested project case study could not be located.'}
        </p>
        <Link
          to="/#projects"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-none bg-electric text-white text-xs font-semibold hover:bg-electric-hover transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('projectDetail.backToProjects')}</span>
        </Link>
      </div>
    );
  }

  const currentSpecs = isFrench && project.specsFr ? project.specsFr : project.specs;
  const currentFeatures = isFrench && project.featuresFr ? project.featuresFr : project.features;

  return (
    <div className="space-y-8 sm:space-y-16 max-w-5xl mx-auto py-2 sm:py-4">
      {/* Back Navigation Bar */}
      <div>
        <button
          type="button"
          onClick={() => {
            navigate('/#projects');
            // Give react-router time to render landing before scrolling
            setTimeout(() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-none border border-slate-200 bg-white text-xs font-mono text-slate-600 hover:text-electric hover:border-electric transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('projectDetail.backToProjects')}</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="space-y-3 sm:space-y-4 border-b border-slate-200 pb-5 sm:pb-8">
        <h1 className="text-2xl sm:text-5xl font-bold tracking-tight text-fintech-primary">
          {t(project.titleKey)}
        </h1>

        <p className="text-xs sm:text-lg text-fintech-secondary max-w-3xl leading-snug sm:leading-relaxed">
          {isCryptoHub ? (
            <>
              <span className="sm:hidden">
                {isFrench
                  ? "Application web personnelle que j'ai conçue et codée pour suivre les prix crypto en direct, simuler des trades sans risque et résumer l'actualité par IA (bêta)."
                  : 'Personal web app I designed and built to track live crypto prices, test strategies with virtual capital, and summarize market news with AI (beta).'}
              </span>
              <span className="hidden sm:inline">
                {isFrench
                  ? "Une application web personnelle que j'ai conçue et développée de A à Z pour suivre les prix crypto en direct, tester des stratégies de trading avec un capital virtuel et observer l'impact de l'actualité sur le marché. Actuellement en bêta (connectée aux flux Binance en direct)."
                  : 'A personal web application I designed and built from scratch to track live crypto prices, test trading strategies with virtual capital, and see how market news impacts price movements. Currently in beta (connected to live Binance market data).'}
              </span>
            </>
          ) : isDonnons ? (
            <>
              <span className="sm:hidden">
                {isFrench
                  ? "Plateforme réalisée pour les HUG à la HEIG-VD. J'ai travaillé sur l'interface, le calculateur de vies sauvées, le quiz spatial et le panneau d'administration."
                  : 'Platform built for the HUG at HEIG-VD. I worked on the UI, the lives-saved calculator, the space eligibility quiz, and the admin panel.'}
              </span>
              <span className="hidden sm:inline">{t(project.descriptionKey)}</span>
            </>
          ) : isLexicon ? (
            <>
              <span className="sm:hidden">
                {isFrench
                  ? "Dictionnaire et frise chronologique que j'ai développés pour rechercher plus de 5 000 termes et lire leurs définitions au toucher."
                  : 'Interactive dictionary and timeline I built to search 5,000+ scientific and philosophical terms and read definitions on tap.'}
              </span>
              <span className="hidden sm:inline">{t(project.descriptionKey)}</span>
            </>
          ) : isMarriage ? (
            <>
              <span className="sm:hidden">
                {isFrench
                  ? "Site événementiel sur mesure que j'ai conçu et codé pour confirmer sa présence sur mobile en quelques secondes, synchronisé vers Excel."
                  : "Custom event site I designed and built so guests can RSVP on their phone in seconds, with automatic sync to the organizers' Excel sheet."}
              </span>
              <span className="hidden sm:inline">{t(project.descriptionKey)}</span>
            </>
          ) : (
            <span>{t(project.descriptionKey)}</span>
          )}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono font-medium rounded-none bg-white border border-slate-200 text-slate-700 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Crypto Trade Hub: Product Walkthrough */}
      {isCryptoHub && (
        <div className="space-y-6 sm:space-y-16">
          {/* Mobile Module Tab Switcher (Prevents huge vertical scroll on mobile) */}
          <div className="sm:hidden grid grid-cols-3 gap-1.5 font-mono text-[11px]">
            {[
              { idx: 0 as const, label: isFrench ? '01 · Scanner' : '01 · Scanner' },
              { idx: 1 as const, label: isFrench ? '02 · Exécution' : '02 · Execution' },
              { idx: 2 as const, label: isFrench ? '03 · Flux IA' : '03 · AI Feed' },
            ].map((tab) => (
              <button
                key={tab.idx}
                type="button"
                onClick={() => setActiveCryptoTab(tab.idx)}
                className={`py-2 px-2 border text-center font-semibold transition-colors ${
                  activeCryptoTab === tab.idx
                    ? 'bg-electric border-electric text-white'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section 1: Surveillance & Volume Pipeline Simulation */}
          <section className={`${activeCryptoTab === 0 ? 'block' : 'hidden sm:block'} space-y-3 sm:space-y-4`}>
            <div className="space-y-1">
              <div className="hidden sm:flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {t('projects.cryptoDetail.section1.tag')}
                </span>
                <span className="text-[11px] font-mono text-electric font-semibold">
                  {t('projects.cryptoDetail.section1.badge')}
                </span>
              </div>
              <h2 className="text-base sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
                {t('projects.cryptoDetail.section1.title')}
              </h2>
              <p className="sm:hidden text-xs text-slate-600 leading-snug pt-0.5">
                {isFrench
                  ? "J'ai créé ce scanner pour filtrer plus de 200 paires Binance (volume > 10 M$) et afficher les plus fortes variations en direct."
                  : 'I built this scanner to filter 200+ Binance pairs ($10M+ daily volume) and highlight the top movers in real time.'}
              </p>
            </div>

            {/* Embedded Live Dark Simulation Component */}
            <div className="rounded-none border border-slate-800 shadow-xl overflow-hidden bg-slate-950">
              <MarketOverviewSim />
            </div>

            {/* Technical Explanation Card with Interactive Terms (Desktop only) */}
            <div className="hidden sm:block p-4 sm:p-5 rounded-none border border-slate-200 bg-white shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <p>
                  J'ai créé ce scanner pour surveiller plus de 200 paires crypto sur Binance en même temps. Au lieu d'afficher des actifs peu liquides, il filtre selon la{' '}
                  <GlossaryTerm
                    term="Liquidité de Marché"
                    definition={getGlossaryDef('market-liquidity', currentLang)}
                  />{' '}
                  (au moins 10 M$ de volume quotidien en{' '}
                  <GlossaryTerm
                    term="Contrat Perpétuel"
                    definition={getGlossaryDef('perpetual-contract', currentLang)}
                  />) et met en avant les plus fortes variations pour repérer immédiatement les tendances actives avec un{' '}
                  <GlossaryTerm
                    term="Glissement d'Exécution (Slippage)"
                    definition={getGlossaryDef('slippage', currentLang)}
                  />{' '}
                  minimal.
                </p>
              ) : (
                <p>
                  I built this scanner to watch over 200 crypto pairs on Binance at once. Instead of showing noisy coins, it filters for strong{' '}
                  <GlossaryTerm
                    term="Market Liquidity"
                    definition={getGlossaryDef('market-liquidity', currentLang)}
                  />{' '}
                  (at least $10M in daily volume across{' '}
                  <GlossaryTerm
                    term="Perpetual Contracts"
                    definition={getGlossaryDef('perpetual-contract', currentLang)}
                  />) and highlights the top movers so you can spot active trends immediately with minimal{' '}
                  <GlossaryTerm
                    term="Execution Slippage"
                    definition={getGlossaryDef('slippage', currentLang)}
                  />.
                </p>
              )}
            </div>
          </section>

          {/* Section 2: Dual-Regime Execution & Vector Allocations Simulation */}
          <section className={`${activeCryptoTab === 1 ? 'block' : 'hidden sm:block'} space-y-3 sm:space-y-4`}>
            <div className="space-y-1">
              <div className="hidden sm:flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {t('projects.cryptoDetail.section2.tag')}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                  {t('projects.cryptoDetail.section2.badge')}
                </span>
              </div>
              <h2 className="text-base sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
                {t('projects.cryptoDetail.section2.title')}
              </h2>
              <p className="sm:hidden text-xs text-slate-600 leading-snug pt-0.5">
                {isFrench
                  ? "J'ai développé ce simulateur de trading virtuel avec calcul de Kelly pour ne jamais risquer plus de 2 % du portefeuille par trade."
                  : 'I built this virtual trading engine with a Kelly risk calculator so no single trade ever risks more than 2% of the portfolio.'}
              </p>
            </div>

            {/* Embedded Live Dark Simulation Component */}
            <div className="rounded-none border border-slate-800 shadow-xl overflow-hidden bg-slate-950">
              <PaperTradingSim />
            </div>

            {/* Technical Explanation Card with Interactive Terms (Desktop only) */}
            <div className="hidden sm:block p-4 sm:p-5 rounded-none border border-slate-200 bg-white shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <p>
                  Pour tester des stratégies sans risquer d'argent réel, j'ai développé ce simulateur de trading virtuel. Il détecte si le marché est en tendance via l'indicateur{' '}
                  <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} /> pour suivre l'élan avec l'{' '}
                  <GlossaryTerm term="EMA 20 Périodes" definition={getGlossaryDef('ema-20', currentLang)} />, ou s'il est calme pour acheter et vendre dans les{' '}
                  <GlossaryTerm
                    term="Bandes de Bollinger"
                    definition={getGlossaryDef('bollinger-bands', currentLang)}
                  />. J'ai aussi codé le{' '}
                  <GlossaryTerm
                    term="Critère de Kelly"
                    definition={getGlossaryDef('kelly-criterion', currentLang)}
                  />{' '}
                  et un{' '}
                  <GlossaryTerm
                    term="Stop-Loss Suiveur"
                    definition={getGlossaryDef('trailing-stop', currentLang)}
                  />{' '}
                  pour calculer automatiquement la taille des positions et ne jamais risquer plus de 2 % du portefeuille sur un trade.
                </p>
              ) : (
                <p>
                  To test trading ideas without risking real money, I built this virtual trading engine. It checks whether the market is trending using the{' '}
                  <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} /> indicator and the{' '}
                  <GlossaryTerm term="20-Period EMA" definition={getGlossaryDef('ema-20', currentLang)} />, or flat using{' '}
                  <GlossaryTerm
                    term="Bollinger Bands"
                    definition={getGlossaryDef('bollinger-bands', currentLang)}
                  />. I also coded the{' '}
                  <GlossaryTerm
                    term="Kelly Criterion"
                    definition={getGlossaryDef('kelly-criterion', currentLang)}
                  />{' '}
                  formula and a{' '}
                  <GlossaryTerm
                    term="Trailing Stop-Loss"
                    definition={getGlossaryDef('trailing-stop', currentLang)}
                  />{' '}
                  to automatically size positions so a single trade never risks more than 2% of the portfolio.
                </p>
              )}
            </div>
          </section>

          {/* Section 3: Automated AI Market Intelligence Simulation */}
          <section className={`${activeCryptoTab === 2 ? 'block' : 'hidden sm:block'} space-y-3 sm:space-y-4`}>
            <div className="space-y-1">
              <div className="hidden sm:flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {t('projects.cryptoDetail.section4.tag')}
                </span>
                <span className="text-[11px] font-mono text-purple-600 font-semibold">
                  {t('projects.cryptoDetail.section4.badge')}
                </span>
              </div>
              <h2 className="text-base sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
                {t('projects.cryptoDetail.section4.title')}
              </h2>
              <p className="sm:hidden text-xs text-slate-600 leading-snug pt-0.5">
                {isFrench
                  ? "J'ai connecté le modèle LLaMA 3.3 pour lire les titres financiers, noter l'humeur du marché (-1,0 à +1,0) et rédiger un résumé."
                  : 'I connected Groq LLaMA 3.3 to read financial headlines, score market mood (-1.0 to +1.0), and write a short daily summary.'}
              </p>
            </div>

            {/* Embedded Live Dark Simulation Component */}
            <div className="rounded-none border border-slate-800 shadow-xl overflow-hidden bg-slate-950">
              <MarketIntelligenceSim />
            </div>

            {/* Technical Explanation Card with Interactive Terms (Desktop only) */}
            <div className="hidden sm:block p-4 sm:p-5 rounded-none border border-slate-200 bg-white shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <p>
                  Plutôt que de lire des dizaines d'articles chaque matin, j'ai connecté le modèle{' '}
                  <GlossaryTerm
                    term="Groq LLaMA 3.3 70B"
                    definition={getGlossaryDef('llama-groq', currentLang)}
                  />{' '}
                  et les données de{' '}
                  <GlossaryTerm
                    term="Profondeur du Carnet d'Ordres"
                    definition={getGlossaryDef('orderbook-depth', currentLang)}
                  />{' '}
                  pour analyser les derniers titres financiers, noter l'humeur du marché de -1,0 (baissier) à +1,0 (haussier) et rédiger un court résumé quotidien.
                </p>
              ) : (
                <p>
                  Instead of reading dozens of articles every morning, I connected the{' '}
                  <GlossaryTerm
                    term="Groq LLaMA 3.3 70B"
                    definition={getGlossaryDef('llama-groq', currentLang)}
                  />{' '}
                  model alongside{' '}
                  <GlossaryTerm
                    term="Orderbook Depth"
                    definition={getGlossaryDef('orderbook-depth', currentLang)}
                  />{' '}
                  data to read the latest financial headlines, score the overall market mood from -1.0 (bearish) to +1.0 (bullish), and write a short daily summary.
                </p>
              )}
            </div>
          </section>
        </div>
      )}
      
      {/* Donnons.ch Complete Showcase Deep Dive */}
      {isDonnons && (
        <DonnonsDetailShowcase />
      )}

      {/* Lexicon & Chronology Engine Deep Dive */}
      {isLexicon && (
        <LexiconDetailShowcase />
      )}

      {/* Private Event Platform Showcase Deep Dive */}
      {isMarriage && (
        <MarriageDetailShowcase />
      )}

      {/* Specifications & Key Highlights Grid (Concise, shorter, zero duplicate text) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 pt-2 border-t border-slate-200">
        {/* Left: Specs Box */}
        <div className="md:col-span-7 rounded-none border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
            <span>{t('projectDetail.specifications')}</span>
            <span className="text-slate-400">{t('projects.cryptoDetail.heigStandards')}</span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono">
            <div>
              <dt className="text-slate-400 uppercase tracking-wider text-[11px]">{t('projectDetail.mandate')}</dt>
              <dd className="font-semibold text-fintech-primary mt-0.5 text-xs sm:text-sm">{currentSpecs.mandate}</dd>
            </div>
            <div>
              <dt className="text-slate-400 uppercase tracking-wider text-[11px]">{t('projectDetail.role')}</dt>
              <dd className="font-semibold text-fintech-primary mt-0.5 text-xs sm:text-sm">{currentSpecs.role}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-400 uppercase tracking-wider text-[11px]">{t('projectDetail.architectureOverview')}</dt>
              <dd className="font-semibold text-fintech-primary mt-0.5 text-xs sm:text-sm">{currentSpecs.architecture}</dd>
            </div>
            {currentSpecs.evaluation && (
              <div className="sm:col-span-2">
                <dt className="text-slate-400 uppercase tracking-wider text-[11px]">{t('projectDetail.evaluation')}</dt>
                <dd className="font-semibold text-emerald-600 mt-0.5 text-xs sm:text-sm">{currentSpecs.evaluation}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Right: Key Highlights (Desktop/Tablet only for clean mobile) */}
        <div className="hidden md:block md:col-span-5 rounded-none border border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 pb-2">
            <span>{t('projectDetail.keyHighlights')}</span>
            <span className="text-emerald-600 font-semibold">{t('projects.cryptoDetail.verified')}</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-700 leading-relaxed font-sans">
            {currentFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-electric rounded-none flex-shrink-0 mt-1.5 inline-block" />
                <span className="font-medium text-slate-800">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Project Pagination Navigation Bar */}
      {(() => {
        const currentIndex = PROJECTS_DATA.findIndex((p) => p.slug === projectId);
        const prevProject =
          currentIndex > 0
            ? PROJECTS_DATA[currentIndex - 1]
            : PROJECTS_DATA[PROJECTS_DATA.length - 1];
        const nextProject =
          currentIndex >= 0 && currentIndex < PROJECTS_DATA.length - 1
            ? PROJECTS_DATA[currentIndex + 1]
            : PROJECTS_DATA[0];

        const renderTitle = (proj: typeof prevProject) => {
          if (proj.slug === 'marriage-platform') {
            return isFrench ? (
              <>
                <span className="block">Plateforme Événementielle</span>
                <span className="block">Privée</span>
              </>
            ) : (
              <>
                <span className="block">Private Event &</span>
                <span className="block">RSVP Platform</span>
              </>
            );
          }
          return t(proj.titleKey);
        };

        return (
          <nav
            aria-label="Project Pagination"
            className="pt-6 sm:pt-12 border-t border-slate-200 grid grid-cols-3 items-center gap-2 sm:gap-4 font-mono select-none"
          >
            {/* Left: Previous Project */}
            {prevProject && (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left justify-self-stretch sm:justify-self-start py-2 px-2 sm:p-0 border sm:border-0 border-slate-200 bg-white sm:bg-transparent hover:border-electric transition-colors"
              >
                <span className="text-xs font-semibold sm:font-normal text-slate-700 sm:text-slate-400 group-hover:text-electric transition-colors">
                  {isFrench ? '← Précédent' : '← Previous'}
                </span>
                <span className="hidden sm:block text-sm md:text-base font-bold text-fintech-primary group-hover:text-electric transition-colors line-clamp-2">
                  {renderTitle(prevProject)}
                </span>
              </Link>
            )}

            {/* Center: All Projects */}
            <button
              type="button"
              onClick={() => {
                navigate('/#projects');
                setTimeout(() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="justify-self-stretch sm:justify-self-center text-center text-xs sm:text-sm font-semibold sm:font-medium text-slate-700 sm:text-slate-500 hover:text-electric transition-colors cursor-pointer py-2 px-2 sm:py-1 border sm:border-0 border-slate-200 bg-slate-50 sm:bg-transparent"
            >
              {isFrench ? 'Tous' : 'All Projects'}
            </button>

            {/* Right: Next Project */}
            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-center sm:items-end text-center sm:text-right justify-self-stretch sm:justify-self-end py-2 px-2 sm:p-0 border sm:border-0 border-slate-200 bg-white sm:bg-transparent hover:border-electric transition-colors"
              >
                <span className="text-xs font-semibold sm:font-normal text-slate-700 sm:text-slate-400 group-hover:text-electric transition-colors">
                  {isFrench ? 'Suivant →' : 'Next →'}
                </span>
                <span className="hidden sm:block text-sm md:text-base font-bold text-fintech-primary group-hover:text-electric transition-colors line-clamp-2">
                  {renderTitle(nextProject)}
                </span>
              </Link>
            )}
          </nav>
        );
      })()}
    </div>
  );
};

export default ProjectDetail;
