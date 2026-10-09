import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  TrendingUp,
  LineChart,
  Bot,
  Mail,
  MapPin,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import GlossaryTerm from '../components/features/GlossaryTerm';

export const BachelorPitch: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 sm:space-y-24 max-w-5xl mx-auto">
      {/* Corporate FinTech Executive Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50/80 via-white to-white p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-electric-light text-electric border border-electric/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('bachelorPitch.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary leading-tight">
            {t('bachelorPitch.title')}
          </h1>

          <p className="text-base sm:text-lg text-fintech-secondary leading-relaxed font-normal">
            {t('bachelorPitch.subtitle')}
          </p>

          {/* Primary CTA & Trust Badges */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="mailto:sbstevebenjamin@gmail.com?subject=2027%20Bachelor%20Project%20Mandate%20-%20Steve%20Benjamin"
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-sm font-semibold shadow-lg shadow-electric/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{t('bachelorPitch.cta')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-sm font-semibold transition-colors"
              >
                <span>CV_Steve_Benjamin.pdf</span>
              </a>
            </div>

            <p className="text-xs font-mono text-slate-500">
              {t('bachelorPitch.ctaSubtitle')}
            </p>
          </div>

          {/* FinTech Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{t('bachelorPitch.trustBadges.rigor')}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{t('bachelorPitch.trustBadges.latency')}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{t('bachelorPitch.trustBadges.precision')}</span>
            </div>
          </div>
        </div>

        {/* Subtle background decorative grid */}
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-96 h-96 bg-electric/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 3 Core Proposals Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HEIG-VD 2027 Research Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-fintech-secondary max-w-2xl">
            {t('bachelorPitch.sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Proposal 1: UX/UI Optimization for Trading Terminals */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-blue-50 text-electric border border-blue-200">
                {t('bachelorPitch.proposal1.tag')}
              </span>
              <span className="text-xs font-mono text-slate-400">Track 01 / Frontend Core</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-electric flex-shrink-0" />
                <span>{t('bachelorPitch.proposal1.title')}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    The Industry Bottleneck
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('bachelorPitch.proposal1.problem')}
                  </p>
                </div>

                <div className="space-y-2 bg-electric-light/30 p-4 rounded-xl border border-electric/20">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-electric">
                    Proposed Architecture
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t('bachelorPitch.proposal1.solution')}
                  </p>
                </div>
              </div>
            </div>

            {/* Glossary Term Integrations */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                Technical Focus & Key Concepts:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Integration of high-frequency{' '}
                <GlossaryTerm
                  term={t('bachelorPitch.proposal1.wsTerm')}
                  definition={t('bachelorPitch.proposal1.wsDef')}
                />{' '}
                order books with advanced{' '}
                <GlossaryTerm
                  term={t('bachelorPitch.proposal1.domTerm')}
                  definition={t('bachelorPitch.proposal1.domDef')}
                />{' '}
                to eliminate GPU and CPU memory overhead.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-xs font-mono text-slate-600">
              <span className="font-semibold text-fintech-primary">Deliverable Scope:</span>
              <span>{t('bachelorPitch.proposal1.deliverables')}</span>
            </div>
          </div>

          {/* Proposal 2: Financial Data Visualization */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {t('bachelorPitch.proposal2.tag')}
              </span>
              <span className="text-xs font-mono text-slate-400">Track 02 / Quantitative UI</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-3">
                <LineChart className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <span>{t('bachelorPitch.proposal2.title')}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    The Industry Bottleneck
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('bachelorPitch.proposal2.problem')}
                  </p>
                </div>

                <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-700">
                    Proposed Architecture
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t('bachelorPitch.proposal2.solution')}{' '}
                    <GlossaryTerm
                      term={t('bachelorPitch.proposal2.d3Term')}
                      definition={t('bachelorPitch.proposal2.d3Def')}
                    />{' '}
                    {t('bachelorPitch.proposal2.and')}{' '}
                    <GlossaryTerm
                      term={t('bachelorPitch.proposal2.maplibreTerm')}
                      definition={t('bachelorPitch.proposal2.maplibreDef')}
                    />{' '}
                    {t('bachelorPitch.proposal2.solutionEnd')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-xs font-mono text-slate-600">
              <span className="font-semibold text-fintech-primary">Deliverable Scope:</span>
              <span>{t('bachelorPitch.proposal2.deliverables')}</span>
            </div>
          </div>

          {/* Proposal 3: Agentic AI Integration for Automated Market Analysis */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm hover:shadow-md transition-shadow space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                {t('bachelorPitch.proposal3.tag')}
              </span>
              <span className="text-xs font-mono text-slate-400">Track 03 / Autonomous AI</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-3">
                <Bot className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span>{t('bachelorPitch.proposal3.title')}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    The Industry Bottleneck
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('bachelorPitch.proposal3.problem')}
                  </p>
                </div>

                <div className="space-y-2 bg-purple-50/50 p-4 rounded-xl border border-purple-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-700">
                    Proposed Architecture
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t('bachelorPitch.proposal3.solution')}{' '}
                    <GlossaryTerm
                      term={t('bachelorPitch.proposal3.agenticAITerm')}
                      definition={t('bachelorPitch.proposal3.agenticAIDef')}
                    />{' '}
                    {t('bachelorPitch.proposal3.solutionEnd')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-xs font-mono text-slate-600">
              <span className="font-semibold text-fintech-primary">Deliverable Scope:</span>
              <span>{t('bachelorPitch.proposal3.deliverables')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Contact & Academic Details Card */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-fintech-primary">
              {t('bachelorPitch.contact.title')}
            </h3>
            <p className="text-xs sm:text-sm text-fintech-secondary">
              {t('bachelorPitch.contact.desc')}
            </p>
          </div>

          <a
            href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-fintech-primary text-white text-xs font-mono font-semibold hover:bg-slate-800 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Mail className="w-4 h-4 text-electric" />
            <span>sbstevebenjamin@gmail.com</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>{t('bachelorPitch.contact.institution')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{t('bachelorPitch.contact.location')}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BachelorPitch;
