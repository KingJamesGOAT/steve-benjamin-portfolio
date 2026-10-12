import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  FileDown,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layout,
  BarChart3,
  Calendar,
} from 'lucide-react';

export const BachelorPitch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  return (
    <div className="space-y-16 sm:space-y-24 max-w-5xl mx-auto">
      {/* Back link */}
      <div>
        <Link
          to="/#bachelor-pitch"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-electric transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isFrench ? 'Retour au Portfolio' : 'Back to Portfolio'}</span>
        </Link>
      </div>

      {/* Bachelor Pitch Hero */}
      <section className="relative overflow-hidden rounded-none border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-none text-xs font-mono font-medium bg-blue-50 text-electric border border-blue-200">
            <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
            <span>{t('bachelorPitch.tag')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary leading-tight">
            {t('bachelorPitch.title')}
          </h1>

          <p className="text-base sm:text-lg text-fintech-secondary leading-relaxed font-normal">
            {t('bachelorPitch.heroDesc')}
          </p>
        </div>

        {/* Immediate Document Downloads & Primary CTA */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4">
          <a
            href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027%20-%20Mandate%20Discussion"
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider"
          >
            <span>{t('bachelorPitch.ctaContact')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

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
            href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-none border border-slate-200 bg-white hover:border-slate-300 text-slate-700 text-xs font-mono transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4 text-slate-400" />
            <span>{t('bachelorPitch.ctaResume')}</span>
          </a>
        </div>
      </section>

      {/* SECTION 1: Academic Framework & Collaboration Modalities */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
            <span>{t('bachelorPitch.context.sectionTag')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.context.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-fintech-secondary max-w-2xl">
            {t('bachelorPitch.context.sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-none border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">01 / Duration & Roadmap</span>
              <Clock className="w-4 h-4 text-electric" />
            </div>
            <h3 className="text-base font-bold text-fintech-primary">
              {t('bachelorPitch.context.durationTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('bachelorPitch.context.durationDesc')}
            </p>
          </div>

          <div className="p-6 rounded-none border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">02 / Financial Model</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-base font-bold text-fintech-primary">
              {t('bachelorPitch.context.remunerationTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('bachelorPitch.context.remunerationDesc')}
            </p>
          </div>

          <div className="p-6 rounded-none border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">03 / Confidentiality & NDA</span>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-fintech-primary">
              {t('bachelorPitch.context.confidentialityTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('bachelorPitch.context.confidentialityDesc')}
            </p>
          </div>

          <div className="p-6 rounded-none border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">04 / Supervision & Autonomy</span>
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
            </div>
            <h3 className="text-base font-bold text-fintech-primary">
              {t('bachelorPitch.context.autonomyTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t('bachelorPitch.context.autonomyDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: 3 Core Intervention Tracks (Practical, Non-Slop) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
            <span>{t('bachelorPitch.tracks.sectionTag')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.tracks.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-fintech-secondary max-w-2xl">
            {t('bachelorPitch.tracks.sectionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Track 1: Modern Web Application Engineering */}
          <div className="rounded-none border border-slate-200 bg-white p-7 sm:p-9 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-none text-xs font-mono font-semibold bg-blue-50 text-electric border border-blue-200 flex items-center space-x-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Track 01</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{t('bachelorPitch.tracks.track1Scope')}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-fintech-primary">
                {t('bachelorPitch.tracks.track1Title')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-slate-50 p-4 rounded-none border border-slate-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    {isFrench ? 'Le Défi en Entreprise' : 'The Challenge'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('bachelorPitch.tracks.track1Problem')}
                  </p>
                </div>

                <div className="space-y-2 bg-electric-light/30 p-4 rounded-none border border-electric/20">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-electric">
                    {isFrench ? 'Approche & Solution' : 'Proposed Approach'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t('bachelorPitch.tracks.track1Solution')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-baseline space-x-2 text-xs font-mono text-slate-600">
              <span className="font-semibold text-fintech-primary shrink-0">
                {isFrench ? 'Livrables :' : 'Deliverables:'}
              </span>
              <span>{t('bachelorPitch.tracks.track1Deliverables')}</span>
            </div>
          </div>

          {/* Track 2: UX/UI Design & Product Systems */}
          <div className="rounded-none border border-slate-200 bg-white p-7 sm:p-9 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-none text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1.5">
                <Layout className="w-3.5 h-3.5" />
                <span>Track 02</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{t('bachelorPitch.tracks.track2Scope')}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-fintech-primary">
                {t('bachelorPitch.tracks.track2Title')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-slate-50 p-4 rounded-none border border-slate-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    {isFrench ? 'Le Défi en Entreprise' : 'The Challenge'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('bachelorPitch.tracks.track2Problem')}
                  </p>
                </div>

                <div className="space-y-2 bg-emerald-50/50 p-4 rounded-none border border-emerald-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-700">
                    {isFrench ? 'Approche & Solution' : 'Proposed Approach'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t('bachelorPitch.tracks.track2Solution')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-baseline space-x-2 text-xs font-mono text-slate-600">
              <span className="font-semibold text-fintech-primary shrink-0">
                {isFrench ? 'Livrables :' : 'Deliverables:'}
              </span>
              <span>{t('bachelorPitch.tracks.track2Deliverables')}</span>
            </div>
          </div>

          {/* Track 3: Data Dashboards & Interactive Visualization */}
          <div className="rounded-none border border-slate-200 bg-white p-7 sm:p-9 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <span className="px-3 py-1 rounded-none text-xs font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center space-x-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Track 03</span>
              </span>
              <span className="text-xs font-mono text-slate-400">{t('bachelorPitch.tracks.track3Scope')}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight text-fintech-primary">
                {t('bachelorPitch.tracks.track3Title')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 bg-slate-50 p-4 rounded-none border border-slate-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    {isFrench ? 'Le Défi en Entreprise' : 'The Challenge'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('bachelorPitch.tracks.track3Problem')}
                  </p>
                </div>

                <div className="space-y-2 bg-purple-50/50 p-4 rounded-none border border-purple-200/70">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-700">
                    {isFrench ? 'Approche & Solution' : 'Proposed Approach'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t('bachelorPitch.tracks.track3Solution')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-baseline space-x-2 text-xs font-mono text-slate-600">
              <span className="font-semibold text-fintech-primary shrink-0">
                {isFrench ? 'Livrables :' : 'Deliverables:'}
              </span>
              <span>{t('bachelorPitch.tracks.track3Deliverables')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Mandate Timeline (2026 - 2027) */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('bachelorPitch.timeline.sectionTag')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.timeline.sectionTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
            <div className="font-mono text-xs text-electric font-semibold">{t('bachelorPitch.timeline.phase1Dates')}</div>
            <h4 className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.timeline.phase1Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.phase1Desc')}</p>
          </div>

          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 py-4 md:py-0 md:px-4">
            <div className="font-mono text-xs text-electric font-semibold">{t('bachelorPitch.timeline.phase2Dates')}</div>
            <h4 className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.timeline.phase2Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.phase2Desc')}</p>
          </div>

          <div className="space-y-2 border-b md:border-b-0 md:border-r border-slate-200 py-4 md:py-0 md:px-4">
            <div className="font-mono text-xs text-electric font-semibold">{t('bachelorPitch.timeline.phase3Dates')}</div>
            <h4 className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.timeline.phase3Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.phase3Desc')}</p>
          </div>

          <div className="space-y-2 pt-4 md:pt-0 md:pl-4">
            <div className="font-mono text-xs text-electric font-semibold">{t('bachelorPitch.timeline.phase4Dates')}</div>
            <h4 className="text-sm font-bold text-fintech-primary">{t('bachelorPitch.timeline.phase4Title')}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.phase4Desc')}</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: References & Track Record */}
      <section className="rounded-none border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {t('bachelorPitch.references.sectionTag')}
        </div>
        <h3 className="text-lg font-bold text-fintech-primary">
          {t('bachelorPitch.references.sectionTitle')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {t('bachelorPitch.references.intro')}
        </p>
      </section>

      {/* SECTION 5: Contact & Initiation Card */}
      <section className="rounded-none border border-slate-200 bg-white p-8 sm:p-10 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-fintech-primary">
              {t('bachelorPitch.contact.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {t('bachelorPitch.contact.desc')}
            </p>
          </div>

          <a
            href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027"
            className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider self-start sm:self-auto shrink-0"
          >
            <span>sbstevebenjamin@gmail.com</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs font-mono">
          <div>
            <span className="text-slate-400 uppercase tracking-wider block text-[10px]">Institution</span>
            <span className="text-fintech-primary font-semibold">{t('bachelorPitch.contact.institution')}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase tracking-wider block text-[10px]">Location</span>
            <span className="text-fintech-primary font-semibold">{t('bachelorPitch.contact.location')}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase tracking-wider block text-[10px]">Official Guide</span>
            <a
              href={`${import.meta.env.BASE_URL}HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="text-electric hover:underline font-semibold inline-flex items-center space-x-1"
            >
              <span>Guide_TB_2026-27.pdf</span>
              <FileDown className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BachelorPitch;
