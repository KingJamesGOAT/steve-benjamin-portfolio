import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Activity, Terminal, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import MarketOverviewSim from '../components/features/crypto/MarketOverviewSim';
import PaperTradingSim from '../components/features/crypto/PaperTradingSim';
import MarketIntelligenceSim from '../components/features/crypto/MarketIntelligenceSim';

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
          {t(project.descriptionKey)}
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
                  Dual-tier filtering queries Binance 24h ticker endpoints, eliminating low-liquidity noise and tracking top momentum gainers in real time.
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-600 uppercase">
                  <Layers className="w-3.5 h-3.5" />
                  <span>DUAL-REGIME ENGINE</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  ADX indicator gates execution: directional Donchian breakouts during trends and dynamic Bollinger limit laddering during range consolidation.
                </div>
              </div>

              <div className="p-5 border border-slate-200 bg-white shadow-sm rounded-none space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-purple-600 uppercase">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>GROQ LLM SYNTHESIS</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-sans">
                  Scheduled workers ingest social sentiment and macroeconomic telemetry into Groq LLaMA 3.3 70B, producing structured daily market briefings.
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

            {/* Technical Explanation Card */}
            <div className="p-6 rounded-none border border-slate-200 bg-white space-y-3 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t('projects.cryptoDetail.section1.p1')}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t('projects.cryptoDetail.section1.p2')}
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

            {/* Technical Explanation Card */}
            <div className="p-6 rounded-none border border-slate-200 bg-white space-y-3 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t('projects.cryptoDetail.section2.p1')}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t('projects.cryptoDetail.section2.p2')}
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

            {/* Technical Explanation Card */}
            <div className="p-6 rounded-none border border-slate-200 bg-white space-y-3 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t('projects.cryptoDetail.section4.p1')}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t('projects.cryptoDetail.section4.p2')}
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
