import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Activity, Terminal, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import MarketOverviewSim from '../components/features/crypto/MarketOverviewSim';
import PaperTradingSim from '../components/features/crypto/PaperTradingSim';
import MarketIntelligenceSim from '../components/features/crypto/MarketIntelligenceSim';
import GlossaryTerm from '../components/features/GlossaryTerm';
import { CRYPTO_GLOSSARY_ENTRIES } from '../data/cryptoGlossary';

const getGlossaryDef = (id: string): string => {
  const item = CRYPTO_GLOSSARY_ENTRIES.find((g) => g.id === id);
  return item ? `${item.line1} ${item.line2}` : '';
};

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const project = PROJECTS_DATA.find((p) => p.slug === projectId);
  const isCryptoHub = projectId === 'crypto-trade-hub';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-fintech-primary">Project Not Found</h1>
        <p className="text-sm text-slate-500">The requested project case study could not be located.</p>
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
      <section className="space-y-5 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-none text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200">
            {t(project.tagKey)}
          </span>

          {project.statusBadgeKey && (
            <span className="inline-flex items-center space-x-1.5 text-xs font-mono text-electric bg-electric-light px-2.5 py-1 rounded-none border border-electric/30">
              <span className="w-1.5 h-1.5 rounded-none bg-electric" />
              <span>{t(project.statusBadgeKey)}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary">
          {t(project.titleKey)}
        </h1>

        <p className="text-base sm:text-lg text-fintech-secondary max-w-3xl leading-relaxed">
          {isCryptoHub ? (
            <span>
              Autonomous quantitative trading terminal engineered with{' '}
              <GlossaryTerm
                term="Binance WebSocket Stream"
                definition={getGlossaryDef('websocket-stream')}
              />{' '}
              ingestion, a dual-regime execution core governed by{' '}
              <GlossaryTerm term="ADX" definition={getGlossaryDef('adx')} />, fractional{' '}
              <GlossaryTerm
                term="Kelly Criterion"
                definition={getGlossaryDef('kelly-criterion')}
              />{' '}
              capital sizing, and automated macroeconomic sentiment synthesis via{' '}
              <GlossaryTerm
                term="Groq LLaMA 3.3 70B"
                definition={getGlossaryDef('llama-groq')}
              />.
            </span>
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

      {/* Crypto Trade Hub: Institutional Multi-Section Product Walkthrough */}
      {isCryptoHub && (
        <div className="space-y-20 sm:space-y-28">
          {/* Institutional Closed-Beta Disclaimer */}
          <div className="border border-slate-300 bg-slate-50 p-4 sm:p-5 rounded-none space-y-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="px-1.5 py-0.5 bg-slate-200 text-slate-800 font-mono text-[10px] font-bold uppercase rounded-none">
                {t('projects.cryptoDetail.disclaimerLabel')}
              </span>
              <span className="text-xs font-mono text-slate-600 font-semibold uppercase tracking-wider">
                {t('projects.cryptoDetail.disclaimerBadge')}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-mono leading-relaxed">
              {t('projects.cryptoDetail.disclaimer')}
            </p>
          </div>

          {/* Section 1: Hero Overview & Architecture Summary */}
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
                SYSTEM ARCHITECTURE & PHILOSOPHY
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
                  <span>300+ PAIR INGESTION</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  Dual-tier filtering queries{' '}
                  <GlossaryTerm
                    term="Binance WebSocket Stream"
                    definition={getGlossaryDef('websocket-stream')}
                  />{' '}
                  endpoints, enforcing{' '}
                  <GlossaryTerm
                    term="Market Liquidity"
                    definition={getGlossaryDef('market-liquidity')}
                  />{' '}
                  criteria ($10M+ quote volume) to eliminate illiquid noise and track breakout gainers.
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-600 uppercase">
                  <Layers className="w-3.5 h-3.5" />
                  <span>DUAL-REGIME ENGINE</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  <GlossaryTerm term="ADX" definition={getGlossaryDef('adx')} /> indicator gates
                  execution: directional{' '}
                  <GlossaryTerm
                    term="Donchian Channel"
                    definition={getGlossaryDef('donchian-channel')}
                  />{' '}
                  breakouts during trends and dynamic{' '}
                  <GlossaryTerm
                    term="Bollinger Bands"
                    definition={getGlossaryDef('bollinger-bands')}
                  />{' '}
                  laddering during{' '}
                  <GlossaryTerm
                    term="Mean Reversion"
                    definition={getGlossaryDef('mean-reversion')}
                  />.
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-purple-600 uppercase">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>GROQ LLM SYNTHESIS</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  Scheduled workers ingest social sentiment and{' '}
                  <GlossaryTerm
                    term="Orderbook Depth"
                    definition={getGlossaryDef('orderbook-depth')}
                  />{' '}
                  into{' '}
                  <GlossaryTerm
                    term="Groq LLaMA 3.3 70B"
                    definition={getGlossaryDef('llama-groq')}
                  />, producing structured daily market briefings.
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
              <p>
                The market scanning subsystem establishes a dual-tier surveillance pipeline. The
                primary tier continuously tracks an eleven-token blue-chip basket (BTC, ETH, SOL,
                BNB, XRP, ADA, DOGE, AVAX, SUI, TRX, and LINK) to maintain baseline{' '}
                <GlossaryTerm
                  term="Market Liquidity"
                  definition={getGlossaryDef('market-liquidity')}
                />{' '}
                metrics. Concurrently, a secondary dynamic scanner queries the Binance 24-hour ticker
                endpoint, filtering over 300 trading pairs with stringent liquidity criteria: enforcing
                strict USDT{' '}
                <GlossaryTerm
                  term="Perpetual Contract"
                  definition={getGlossaryDef('perpetual-contract')}
                />{' '}
                pairing, requiring a minimum $10,000,000 quote volume threshold, and eliminating
                leveraged tokens to prevent non-volatile noise.
              </p>
              <p>
                The dynamic scanner ranks candidates by absolute volatility and selects the top 5
                momentum gainers to monitor real-time breakouts across market cycles with sub-0.005%{' '}
                <GlossaryTerm
                  term="Execution Slippage"
                  definition={getGlossaryDef('slippage')}
                />.
              </p>
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
              <p>
                The core strategy engine operates on an autonomous dual-regime framework governed by
                the 14-period{' '}
                <GlossaryTerm term="ADX" definition={getGlossaryDef('adx')} />. When ADX exceeds 25.0,
                the engine activates the{' '}
                <GlossaryTerm
                  term="Smart Momentum Module"
                  definition={getGlossaryDef('smart-momentum')}
                />, identifying 20-candle{' '}
                <GlossaryTerm
                  term="Donchian Channel"
                  definition={getGlossaryDef('donchian-channel')}
                />{' '}
                breakouts corroborated by a 2.0x volume surge above the{' '}
                <GlossaryTerm term="20-Period EMA" definition={getGlossaryDef('ema-20')} />. In
                low-trend regimes (ADX below 25.0), execution transitions into Dynamic Grid{' '}
                <GlossaryTerm
                  term="Mean Reversion"
                  definition={getGlossaryDef('mean-reversion')}
                />, placing limit ladders within calibrated{' '}
                <GlossaryTerm
                  term="Bollinger Bands"
                  definition={getGlossaryDef('bollinger-bands')}
                />{' '}
                envelopes.
              </p>
              <p>
                Capital allocations adhere to fractional{' '}
                <GlossaryTerm
                  term="Kelly Criterion"
                  definition={getGlossaryDef('kelly-criterion')}
                />{' '}
                sizing capped at 2.0% maximum portfolio risk per vector. The paper trading state
                machine coordinates continuous{' '}
                <GlossaryTerm
                  term="Trailing Stop-Loss"
                  definition={getGlossaryDef('trailing-stop')}
                />{' '}
                adjustments, dynamic profit targets, and deterministic stop-loss executions with
                real-time{' '}
                <GlossaryTerm term="PnL" definition={getGlossaryDef('pnl')} /> synchronization.
              </p>
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
              <p>
                To eliminate emotional bias and manual disclosure analysis, the platform integrates an
                automated AI intelligence pipeline executed via scheduled background workers. The
                pipeline ingests top macroeconomic news headlines alongside CoinGecko global telemetry,
                including Bitcoin market dominance percentages, 24-hour global trading volume, and{' '}
                <GlossaryTerm
                  term="Orderbook Depth"
                  definition={getGlossaryDef('orderbook-depth')}
                />{' '}
                imbalances.
              </p>
              <p>
                This consolidated dataset is formatted into a strict institutional context and processed
                through{' '}
                <GlossaryTerm
                  term="Groq LLaMA 3.3 70B"
                  definition={getGlossaryDef('llama-groq')}
                />. The model is constrained via system prompts to return deterministic JSON schemas
                containing normalized numerical sentiment scores (-1.0 extreme bear to +1.0 extreme
                bull), concise dashboard summaries, and an institutional Bloomberg-style daily market
                digest dispatched directly to communication channels.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* Specifications & Key Highlights Grid (Text-driven, zero decorative icons) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-200">
        {/* Left: Specs Box */}
        <div className="md:col-span-7 rounded-none border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
            <span>{t('projectDetail.specifications')}</span>
            <span className="text-slate-400">HEIG-VD STANDARDS</span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <dt className="text-slate-400 uppercase tracking-wider">{t('projectDetail.mandate')}</dt>
              <dd className="font-semibold text-fintech-primary mt-1 text-sm">{project.specs.mandate}</dd>
            </div>
            <div>
              <dt className="text-slate-400 uppercase tracking-wider">{t('projectDetail.role')}</dt>
              <dd className="font-semibold text-fintech-primary mt-1 text-sm">{project.specs.role}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-400 uppercase tracking-wider">{t('projectDetail.architectureOverview')}</dt>
              <dd className="font-semibold text-fintech-primary mt-1 text-sm">{project.specs.architecture}</dd>
            </div>
            {project.specs.evaluation && (
              <div className="sm:col-span-2">
                <dt className="text-slate-400 uppercase tracking-wider">{t('projectDetail.evaluation')}</dt>
                <dd className="font-semibold text-emerald-600 mt-1 text-sm">{project.specs.evaluation}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Right: Key Highlights */}
        <div className="md:col-span-5 rounded-none border border-slate-200 bg-slate-50 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 pb-2">
            <span>{t('projectDetail.keyHighlights')}</span>
            <span className="text-emerald-600 font-semibold">VERIFIED</span>
          </div>

          <ul className="space-y-3 text-xs text-slate-700 leading-relaxed font-sans">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2.5">
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
