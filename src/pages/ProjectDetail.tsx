import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Activity, Terminal, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import MarketOverviewSim from '../components/features/crypto/MarketOverviewSim';
import PaperTradingSim from '../components/features/crypto/PaperTradingSim';
import MarketIntelligenceSim from '../components/features/crypto/MarketIntelligenceSim';
import DonnonsDetailShowcase from '../components/features/donnons/DonnonsDetailShowcase';
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
              ? 'Terminal de trading quantitatif conçu pour surveiller les paires de cryptomonnaies en temps réel, exécuter des allocations simulées et générer des synthèses de marché automatisées.'
              : 'Quantitative trading terminal engineered to monitor cryptocurrency pairs in real time, execute simulated allocations, and generate automated market summaries.'
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
        <div className="space-y-16 sm:space-y-24">
          {/* Simulation Note */}
          <div className="border border-slate-200 bg-slate-50 p-4 rounded-none">
            <p className="text-xs sm:text-sm text-slate-600 font-mono leading-relaxed">
              {isFrench
                ? 'Note : Les flux de données et les ordres affichés ci-dessous sont exécutés dans un environnement de simulation temps réel.'
                : 'Note: Market data streams and trade allocations shown below are executed in a simulated real-time environment.'}
            </p>
          </div>

          {/* Section 1: Hero Overview & Architecture Summary */}
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
                {t('projects.cryptoDetail.architectureTitle')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
                {t('projects.cryptoDetail.caseStudyTitle')}
              </h2>
              <p className="text-sm text-fintech-secondary max-w-3xl leading-relaxed">
                {t('projects.cryptoDetail.caseStudySubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-electric uppercase">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{t('projects.cryptoDetail.card1Tag')}</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isFrench ? (
                    <span>
                      Le filtrage à deux niveaux interroge les flux{' '}
                      <GlossaryTerm
                        term="Binance WebSocket Stream"
                        definition={getGlossaryDef('websocket-stream', currentLang)}
                      />{', '}
                      imposant des critères de{' '}
                      <GlossaryTerm
                        term="Liquidité de Marché"
                        definition={getGlossaryDef('market-liquidity', currentLang)}
                      />{' '}
                      (volume &gt; 10M$) pour éliminer le bruit illiquide et suivre les actifs à fort momentum.
                    </span>
                  ) : (
                    <span>
                      Dual-tier filtering queries{' '}
                      <GlossaryTerm
                        term="Binance WebSocket Stream"
                        definition={getGlossaryDef('websocket-stream', currentLang)}
                      />{' '}
                      endpoints, enforcing{' '}
                      <GlossaryTerm
                        term="Market Liquidity"
                        definition={getGlossaryDef('market-liquidity', currentLang)}
                      />{' '}
                      criteria ($10M+ quote volume) to eliminate illiquid noise and track breakout gainers.
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-600 uppercase">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t('projects.cryptoDetail.card2Tag')}</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isFrench ? (
                    <span>
                      L'indicateur{' '}
                      <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} /> régule
                      l'exécution : cassures directionnelles des{' '}
                      <GlossaryTerm
                        term="Canaux de Donchian"
                        definition={getGlossaryDef('donchian-channel', currentLang)}
                      />{' '}
                      en tendance et échelons dynamiques de{' '}
                      <GlossaryTerm
                        term="Bandes de Bollinger"
                        definition={getGlossaryDef('bollinger-bands', currentLang)}
                      />{' '}
                      en{' '}
                      <GlossaryTerm
                        term="Retour à la Moyenne"
                        definition={getGlossaryDef('mean-reversion', currentLang)}
                      />.
                    </span>
                  ) : (
                    <span>
                      <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} /> indicator gates
                      execution: directional{' '}
                      <GlossaryTerm
                        term="Donchian Channel"
                        definition={getGlossaryDef('donchian-channel', currentLang)}
                      />{' '}
                      breakouts during trends and dynamic{' '}
                      <GlossaryTerm
                        term="Bollinger Bands"
                        definition={getGlossaryDef('bollinger-bands', currentLang)}
                      />{' '}
                      laddering during{' '}
                      <GlossaryTerm
                        term="Mean Reversion"
                        definition={getGlossaryDef('mean-reversion', currentLang)}
                      />.
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-purple-600 uppercase">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{t('projects.cryptoDetail.card3Tag')}</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isFrench ? (
                    <span>
                      Des tâches planifiées ingèrent le sentiment social et la{' '}
                      <GlossaryTerm
                        term="Profondeur du Carnet d'Ordres"
                        definition={getGlossaryDef('orderbook-depth', currentLang)}
                      />{' '}
                      dans{' '}
                      <GlossaryTerm
                        term="Groq LLaMA 3.3 70B"
                        definition={getGlossaryDef('llama-groq', currentLang)}
                      />, produisant des synthèses de marché quotidiennes structurées.
                    </span>
                  ) : (
                    <span>
                      Scheduled workers ingest social sentiment and{' '}
                      <GlossaryTerm
                        term="Orderbook Depth"
                        definition={getGlossaryDef('orderbook-depth', currentLang)}
                      />{' '}
                      into{' '}
                      <GlossaryTerm
                        term="Groq LLaMA 3.3 70B"
                        definition={getGlossaryDef('llama-groq', currentLang)}
                      />, producing structured daily market briefings.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Surveillance & Volume Pipeline Simulation */}
          <section className="space-y-6">
            <div className="space-y-1.5">
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
            <div className="p-6 rounded-none border border-slate-200 bg-white space-y-3 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <>
                  <p>
                    Le sous-système de scan de marché met en place un pipeline de surveillance à deux niveaux. Le
                    premier niveau analyse en continu un panier de 11 cryptomonnaies majeures (BTC, ETH, SOL, BNB,
                    XRP, ADA, DOGE, AVAX, SUI, TRX et LINK) afin d'établir les métriques de{' '}
                    <GlossaryTerm
                      term="Liquidité de Marché"
                      definition={getGlossaryDef('market-liquidity', currentLang)}
                    />{' '}
                    de référence. Simultanément, un scanner dynamique interroge l'API Binance 24h ticker en
                    filtrant plus de 300 paires avec des règles de liquidité strictes : appairage USDT en{' '}
                    <GlossaryTerm
                      term="Contrat Perpétuel"
                      definition={getGlossaryDef('perpetual-contract', currentLang)}
                    />{' '}
                    obligatoire, volume minimal de 10 000 000 $ et exclusion des jetons à effet de levier pour
                    éliminer le bruit non volatil.
                  </p>
                  <p>
                    Le scanner dynamique classe les actifs par volatilité absolue et retient le top 5 des devises à
                    fort momentum pour capturer les cassures de marché en temps réel avec un{' '}
                    <GlossaryTerm
                      term="Glissement d'Exécution (Slippage)"
                      definition={getGlossaryDef('slippage', currentLang)}
                    />{' '}
                    moyen inférieur à 0,005 %.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    The market scanning subsystem establishes a dual-tier surveillance pipeline. The
                    primary tier continuously tracks an eleven-token blue-chip basket (BTC, ETH, SOL,
                    BNB, XRP, ADA, DOGE, AVAX, SUI, TRX, and LINK) to maintain baseline{' '}
                    <GlossaryTerm
                      term="Market Liquidity"
                      definition={getGlossaryDef('market-liquidity', currentLang)}
                    />{' '}
                    metrics. Concurrently, a secondary dynamic scanner queries the Binance 24-hour ticker
                    endpoint, filtering over 300 trading pairs with stringent liquidity criteria: enforcing
                    strict USDT{' '}
                    <GlossaryTerm
                      term="Perpetual Contract"
                      definition={getGlossaryDef('perpetual-contract', currentLang)}
                    />{' '}
                    pairing, requiring a minimum $10,000,000 quote volume threshold, and eliminating
                    leveraged tokens to prevent non-volatile noise.
                  </p>
                  <p>
                    The dynamic scanner ranks candidates by absolute volatility and selects the top 5
                    momentum gainers to monitor real-time breakouts across market cycles with sub-0.005%{' '}
                    <GlossaryTerm
                      term="Execution Slippage"
                      definition={getGlossaryDef('slippage', currentLang)}
                    />.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Section 3: Dual-Regime Execution & Vector Allocations Simulation */}
          <section className="space-y-6">
            <div className="space-y-1.5">
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
            <div className="p-6 rounded-none border border-slate-200 bg-white space-y-3 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <>
                  <p>
                    Le moteur stratégique repose sur un cadre autonome à double régime piloté par l'indicateur{' '}
                    <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} /> à 14 périodes. Quand
                    l'ADX dépasse 25,0, le moteur active le{' '}
                    <GlossaryTerm
                      term="Module Smart Momentum"
                      definition={getGlossaryDef('smart-momentum', currentLang)}
                    />, détectant les cassures du{' '}
                    <GlossaryTerm
                      term="Canal de Donchian"
                      definition={getGlossaryDef('donchian-channel', currentLang)}
                    />{' '}
                    à 20 bougies corroborées par une hausse de volume de 2,0x au-dessus de l'{' '}
                    <GlossaryTerm term="EMA 20 Périodes" definition={getGlossaryDef('ema-20', currentLang)} />. Dans
                    les régimes sans tendance marquée (ADX inférieur à 25,0), l'exécution bascule en grille
                    dynamique de{' '}
                    <GlossaryTerm
                      term="Retour à la Moyenne"
                      definition={getGlossaryDef('mean-reversion', currentLang)}
                    />, disposant des échelons d'ordres limites dans l'enveloppe des{' '}
                    <GlossaryTerm
                      term="Bandes de Bollinger"
                      definition={getGlossaryDef('bollinger-bands', currentLang)}
                    />.
                  </p>
                  <p>
                    Les allocations de capital respectent le dimensionnement fractionnaire du{' '}
                    <GlossaryTerm
                      term="Critère de Kelly"
                      definition={getGlossaryDef('kelly-criterion', currentLang)}
                    />{' '}
                    plafonné à 2,0 % de risque maximum par vecteur. La machine d'état coordonne les ajustements
                    continus du{' '}
                    <GlossaryTerm
                      term="Stop-Loss Suiveur"
                      definition={getGlossaryDef('trailing-stop', currentLang)}
                    />, le verrouillage des cibles de profit et la synchronisation en temps réel du{' '}
                    <GlossaryTerm term="PnL" definition={getGlossaryDef('pnl', currentLang)} />.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    The core strategy engine operates on an autonomous dual-regime framework governed by
                    the 14-period{' '}
                    <GlossaryTerm term="ADX" definition={getGlossaryDef('adx', currentLang)} />. When ADX exceeds 25.0,
                    the engine activates the{' '}
                    <GlossaryTerm
                      term="Smart Momentum Module"
                      definition={getGlossaryDef('smart-momentum', currentLang)}
                    />, identifying 20-candle{' '}
                    <GlossaryTerm
                      term="Donchian Channel"
                      definition={getGlossaryDef('donchian-channel', currentLang)}
                    />{' '}
                    breakouts corroborated by a 2.0x volume surge above the{' '}
                    <GlossaryTerm term="20-Period EMA" definition={getGlossaryDef('ema-20', currentLang)} />. In
                    low-trend regimes (ADX below 25.0), execution transitions into Dynamic Grid{' '}
                    <GlossaryTerm
                      term="Mean Reversion"
                      definition={getGlossaryDef('mean-reversion', currentLang)}
                    />, placing limit ladders within calibrated{' '}
                    <GlossaryTerm
                      term="Bollinger Bands"
                      definition={getGlossaryDef('bollinger-bands', currentLang)}
                    />{' '}
                    envelopes.
                  </p>
                  <p>
                    Capital allocations adhere to fractional{' '}
                    <GlossaryTerm
                      term="Kelly Criterion"
                      definition={getGlossaryDef('kelly-criterion', currentLang)}
                    />{' '}
                    sizing capped at 2.0% maximum portfolio risk per vector. The paper trading state
                    machine coordinates continuous{' '}
                    <GlossaryTerm
                      term="Trailing Stop-Loss"
                      definition={getGlossaryDef('trailing-stop', currentLang)}
                    />{' '}
                    adjustments, dynamic profit targets, and deterministic stop-loss executions with
                    real-time{' '}
                    <GlossaryTerm term="PnL" definition={getGlossaryDef('pnl', currentLang)} /> synchronization.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Section 4: Automated AI Market Intelligence Simulation */}
          <section className="space-y-6">
            <div className="space-y-1.5">
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
            <div className="p-6 rounded-none border border-slate-200 bg-white space-y-3 shadow-sm text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {isFrench ? (
                <>
                  <p>
                    Afin d'éliminer les biais émotionnels et le dépouillement manuel des informations, la
                    plateforme intègre un pipeline de renseignement automatisé géré par des tâches d'arrière-plan
                    planifiées. Le flux rassemble les principales actualités macroéconomiques et les données
                    globales de CoinGecko, incluant la dominance de Bitcoin, le volume d'échange mondial sur 24
                    heures et les déséquilibres de{' '}
                    <GlossaryTerm
                      term="Profondeur du Carnet d'Ordres"
                      definition={getGlossaryDef('orderbook-depth', currentLang)}
                    />.
                  </p>
                  <p>
                    Ces données consolidées sont formatées selon un contexte institutionnel strict et traitées par{' '}
                    <GlossaryTerm
                      term="Groq LLaMA 3.3 70B"
                      definition={getGlossaryDef('llama-groq', currentLang)}
                    />. Le modèle est contraint par des invites système de retourner un schéma JSON déterministe
                    comprenant un score de sentiment numérique (-1,0 à +1,0), un résumé synthétique pour le tableau
                    de bord et une note quotidienne au ton institutionnel type Bloomberg transmise directement aux
                    canaux de communication.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    To eliminate emotional bias and manual disclosure analysis, the platform integrates an
                    automated AI intelligence pipeline executed via scheduled background workers. The
                    pipeline ingests top macroeconomic news headlines alongside CoinGecko global telemetry,
                    including Bitcoin market dominance percentages, 24-hour global trading volume, and{' '}
                    <GlossaryTerm
                      term="Orderbook Depth"
                      definition={getGlossaryDef('orderbook-depth', currentLang)}
                    />{' '}
                    imbalances.
                  </p>
                  <p>
                    This consolidated dataset is formatted into a strict institutional context and processed
                    through{' '}
                    <GlossaryTerm
                      term="Groq LLaMA 3.3 70B"
                      definition={getGlossaryDef('llama-groq', currentLang)}
                    />. The model is constrained via system prompts to return deterministic JSON schemas
                    containing normalized numerical sentiment scores (-1.0 extreme bear to +1.0 extreme
                    bull), concise dashboard summaries, and an institutional Bloomberg-style daily market
                    digest dispatched directly to communication channels.
                  </p>
                </>
              )}
            </div>
          </section>
        </div>
      )}
      
      {/* Donnons.ch Complete Showcase Deep Dive */}
      {isDonnons && (
        <DonnonsDetailShowcase />
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
    </div>
  );
};

export default ProjectDetail;
