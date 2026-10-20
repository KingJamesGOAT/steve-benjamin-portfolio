import React, { useEffect } from 'react';
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

  useEffect(() => {
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
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto py-4">
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
      <section className="space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary">
          {t(project.titleKey)}
        </h1>

        <p className="text-base sm:text-lg text-fintech-secondary max-w-3xl leading-relaxed">
          {isCryptoHub ? (
            isFrench
              ? 'Projet personnel en bêta. Les données présentées dans cette démonstration sont simulées.'
              : 'Personal project in beta. Data shown in this demo is simulated.'
          ) : (
            t(project.descriptionKey)
          )}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-none bg-white border border-slate-200 text-slate-700 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Crypto Trade Hub: Product Walkthrough */}
      {isCryptoHub && (
        <div className="space-y-12 sm:space-y-16">
          {/* Section 1: Surveillance & Volume Pipeline Simulation */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {t('projects.cryptoDetail.section1.tag')}
                </span>
                <span className="text-[11px] font-mono text-electric font-semibold">
                  {t('projects.cryptoDetail.section1.badge')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
                {t('projects.cryptoDetail.section1.title')}
              </h2>
            </div>

            {/* Embedded Live Dark Simulation Component */}
            <div className="rounded-none border border-slate-800 shadow-xl overflow-hidden bg-slate-950">
              <MarketOverviewSim />
            </div>

            {/* Technical Explanation Card with Interactive Terms */}
            <div className="p-4 sm:p-5 rounded-none border border-slate-200 bg-white shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <p>
                  Ce pipeline de surveillance interroge en continu l'API Binance WebSocket sur plus de 200 paires de devises. 
                  Il filtre les actifs selon des critères stricts de{' '}
                  <GlossaryTerm
                    term="Liquidité de Marché"
                    definition={getGlossaryDef('market-liquidity', currentLang)}
                  />{' '}
                  (volume minimal &gt; 10M$ en{' '}
                  <GlossaryTerm
                    term="Contrat Perpétuel"
                    definition={getGlossaryDef('perpetual-contract', currentLang)}
                  />) et retient les actifs à plus fort momentum pour capturer les cassures de volatilité avec un{' '}
                  <GlossaryTerm
                    term="Glissement d'Exécution (Slippage)"
                    definition={getGlossaryDef('slippage', currentLang)}
                  />{' '}
                  moyen inférieur à 0,005 %.
                </p>
              ) : (
                <p>
                  This surveillance pipeline continuously queries Binance WebSocket streams across 200+ trading pairs. 
                  Assets are filtered against strict{' '}
                  <GlossaryTerm
                    term="Market Liquidity"
                    definition={getGlossaryDef('market-liquidity', currentLang)}
                  />{' '}
                  thresholds ($10M+ quote volume in{' '}
                  <GlossaryTerm
                    term="Perpetual Contracts"
                    definition={getGlossaryDef('perpetual-contract', currentLang)}
                  />) to capture high-momentum volatility breakouts with average{' '}
                  <GlossaryTerm
                    term="Execution Slippage"
                    definition={getGlossaryDef('slippage', currentLang)}
                  />{' '}
                  under 0.005%.
                </p>
              )}
            </div>
          </section>

          {/* Section 2: Dual-Regime Execution & Vector Allocations Simulation */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {t('projects.cryptoDetail.section2.tag')}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                  {t('projects.cryptoDetail.section2.badge')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
                {t('projects.cryptoDetail.section2.title')}
              </h2>
            </div>

            {/* Embedded Live Dark Simulation Component */}
            <div className="rounded-none border border-slate-800 shadow-xl overflow-hidden bg-slate-950">
              <PaperTradingSim />
            </div>

            {/* Technical Explanation Card with Interactive Terms */}
            <div className="p-4 sm:p-5 rounded-none border border-slate-200 bg-white shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <p>
                  Le moteur d'exécution autonome est orchestré par un filtre à double régime basé sur l'indicateur{' '}
                  <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} /> (14 périodes). En régime directionnel (ADX &gt; 25), le{' '}
                  <GlossaryTerm
                    term="Module Smart Momentum"
                    definition={getGlossaryDef('smart-momentum', currentLang)}
                  />{' '}
                  valide les cassures de{' '}
                  <GlossaryTerm
                    term="Canal de Donchian"
                    definition={getGlossaryDef('donchian-channel', currentLang)}
                  />{' '}
                  avec confirmation par l'{' '}
                  <GlossaryTerm term="EMA 20 Périodes" definition={getGlossaryDef('ema-20', currentLang)} />. En régime sans tendance, il bascule sur une grille de{' '}
                  <GlossaryTerm
                    term="Retour à la Moyenne"
                    definition={getGlossaryDef('mean-reversion', currentLang)}
                  />{' '}
                  calibrée sur les{' '}
                  <GlossaryTerm
                    term="Bandes de Bollinger"
                    definition={getGlossaryDef('bollinger-bands', currentLang)}
                  />. Les positions sont protégées par un{' '}
                  <GlossaryTerm
                    term="Stop-Loss Suiveur"
                    definition={getGlossaryDef('trailing-stop', currentLang)}
                  />{' '}
                  dynamique et dimensionnées selon le{' '}
                  <GlossaryTerm
                    term="Critère de Kelly"
                    definition={getGlossaryDef('kelly-criterion', currentLang)}
                  />{' '}
                  (risque max 2,0 %).
                </p>
              ) : (
                <p>
                  The autonomous execution engine operates on a dual-regime framework governed by the 14-period{' '}
                  <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} />. In trending regimes (ADX &gt; 25), the{' '}
                  <GlossaryTerm
                    term="Smart Momentum Module"
                    definition={getGlossaryDef('smart-momentum', currentLang)}
                  />{' '}
                  executes on 20-candle{' '}
                  <GlossaryTerm
                    term="Donchian Channel"
                    definition={getGlossaryDef('donchian-channel', currentLang)}
                  />{' '}
                  breakouts corroborated by the{' '}
                  <GlossaryTerm term="20-Period EMA" definition={getGlossaryDef('ema-20', currentLang)} />. In range-bound markets, it pivots to Dynamic Grid{' '}
                  <GlossaryTerm
                    term="Mean Reversion"
                    definition={getGlossaryDef('mean-reversion', currentLang)}
                  />{' '}
                  envelopes via{' '}
                  <GlossaryTerm
                    term="Bollinger Bands"
                    definition={getGlossaryDef('bollinger-bands', currentLang)}
                  />. Risk is sized via fractional{' '}
                  <GlossaryTerm
                    term="Kelly Criterion"
                    definition={getGlossaryDef('kelly-criterion', currentLang)}
                  />{' '}
                  capped at 2.0% with automated{' '}
                  <GlossaryTerm
                    term="Trailing Stop-Loss"
                    definition={getGlossaryDef('trailing-stop', currentLang)}
                  />{' '}
                  protection.
                </p>
              )}
            </div>
          </section>

          {/* Section 3: Automated AI Market Intelligence Simulation */}
          <section className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  {t('projects.cryptoDetail.section4.tag')}
                </span>
                <span className="text-[11px] font-mono text-purple-600 font-semibold">
                  {t('projects.cryptoDetail.section4.badge')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary pt-1">
                {t('projects.cryptoDetail.section4.title')}
              </h2>
            </div>

            {/* Embedded Live Dark Simulation Component */}
            <div className="rounded-none border border-slate-800 shadow-xl overflow-hidden bg-slate-950">
              <MarketIntelligenceSim />
            </div>

            {/* Technical Explanation Card with Interactive Terms */}
            <div className="p-4 sm:p-5 rounded-none border border-slate-200 bg-white shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <p>
                  Ce pipeline d'intelligence de marché ingère les flux d'actualités macroéconomiques et les déséquilibres de{' '}
                  <GlossaryTerm
                    term="Profondeur du Carnet d'Ordres"
                    definition={getGlossaryDef('orderbook-depth', currentLang)}
                  />{' '}
                  vers{' '}
                  <GlossaryTerm
                    term="Groq LLaMA 3.3 70B"
                    definition={getGlossaryDef('llama-groq', currentLang)}
                  />. Les invites système contraignent le modèle à produire un schéma JSON déterministe avec score de sentiment numérique (-1,0 à +1,0) et un briefing institutionnel synthétisé sans délai.
                </p>
              ) : (
                <p>
                  This market intelligence pipeline streams macroeconomic news headlines and{' '}
                  <GlossaryTerm
                    term="Orderbook Depth"
                    definition={getGlossaryDef('orderbook-depth', currentLang)}
                  />{' '}
                  imbalances into{' '}
                  <GlossaryTerm
                    term="Groq LLaMA 3.3 70B"
                    definition={getGlossaryDef('llama-groq', currentLang)}
                  />. System prompts constrain the model to output a deterministic JSON schema featuring normalized sentiment scores (-1.0 to +1.0) and instantaneous institutional briefs.
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

        {/* Right: Key Highlights */}
        <div className="md:col-span-5 rounded-none border border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-sm space-y-3">
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
            className="pt-10 sm:pt-12 border-t border-slate-200 grid grid-cols-3 items-center gap-2 sm:gap-4 font-mono select-none"
          >
            {/* Left: Previous Project */}
            {prevProject && (
              <Link
                to={`/projects/${prevProject.slug}`}
                className="group flex flex-col items-start text-left justify-self-start max-w-full"
              >
                <span className="text-[11px] sm:text-xs text-slate-400 group-hover:text-electric transition-colors">
                  {isFrench ? '← Précédent' : '← Previous'}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-fintech-primary group-hover:text-electric transition-colors line-clamp-2">
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
              className="justify-self-center text-center text-xs sm:text-sm font-medium text-slate-500 hover:text-electric transition-colors cursor-pointer py-1"
            >
              {isFrench ? 'Tous les Projets' : 'All Projects'}
            </button>

            {/* Right: Next Project */}
            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end text-right justify-self-end max-w-full"
              >
                <span className="text-[11px] sm:text-xs text-slate-400 group-hover:text-electric transition-colors">
                  {isFrench ? 'Suivant →' : 'Next →'}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-bold text-fintech-primary group-hover:text-electric transition-colors line-clamp-2">
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
