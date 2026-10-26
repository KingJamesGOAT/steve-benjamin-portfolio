import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const BachelorPitch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="space-y-10 sm:space-y-12 max-w-4xl mx-auto">
      {/* Back link */}
      <div>
        <Link
          to="/#bachelor-pitch"
          className="inline-flex items-center text-xs font-mono text-slate-500 hover:text-electric transition-colors"
        >
          {isFrench ? '← Retour au Portfolio' : '← Back to Portfolio'}
        </Link>
      </div>

      {/* Hero Header */}
      <section className="border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            {isFrench ? 'HEIG-VD · Ingénierie des Médias 2027' : 'HEIG-VD · Media Engineering 2027'}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.title')}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            {t('bachelorPitch.heroDesc')}
          </p>
        </div>

        {/* Action & Document Downloads */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <a
            href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027%20-%20Mandate%20Discussion"
            className="px-5 py-2.5 bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider"
          >
            {t('bachelorPitch.ctaContact')} ↗
          </a>

          <a
            href={`${import.meta.env.BASE_URL}${isFrench ? 'HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf' : "HEIG-VD - IM - Bachelor's Thesis Guide for Companies - 2026-27.pdf"}`}
            target="_blank"
            rel="noopener noreferrer"
            download={isFrench ? 'HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf' : "HEIG-VD - IM - Bachelor's Thesis Guide for Companies - 2026-27.pdf"}
            className="px-4 py-2.5 border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm"
          >
            {t('bachelorPitch.ctaGuide')} ↗
          </a>

          <a
            href={`${import.meta.env.BASE_URL}${isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf'}`}
            target="_blank"
            rel="noopener noreferrer"
            download={isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf'}
            className="px-4 py-2.5 border border-slate-200 bg-white hover:border-slate-300 text-slate-600 text-xs font-mono transition-colors shadow-sm"
          >
            {t('bachelorPitch.ctaResume')} ↗
          </a>
        </div>
      </section>

      {/* 01 / Conditions */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-fintech-primary">
          {t('bachelorPitch.conditions.tag')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 01 / Rémunération */}
          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              {t('bachelorPitch.conditions.costLabel')}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.costTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.conditions.costDesc')}
            </p>
          </div>

          {/* 02 / Encadrement */}
          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              {t('bachelorPitch.conditions.supervisionLabel')}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.supervisionTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.conditions.supervisionDesc')}
            </p>
          </div>

          {/* 03 / Confidentialité */}
          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              {t('bachelorPitch.conditions.confidentialityLabel')}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.confidentialityTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.conditions.confidentialityDesc')}
            </p>
          </div>

          {/* 04 / Durée */}
          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              {t('bachelorPitch.conditions.durationLabel')}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.durationTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.conditions.durationDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 02 / Deliverables */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-fintech-primary">
          {t('bachelorPitch.scope.tag')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-electric block">
              {isFrench ? 'Axe 01' : 'Track 01'}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.scope.track1Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.scope.track1Desc')}
            </p>
          </div>

          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-electric block">
              {isFrench ? 'Axe 02' : 'Track 02'}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.scope.track2Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.scope.track2Desc')}
            </p>
          </div>

          <div className="p-4 border border-slate-200 bg-white shadow-sm space-y-1.5">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-electric block">
              {isFrench ? 'Axe 03' : 'Track 03'}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.scope.track3Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.scope.track3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 03 / Timeline Roadmap */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-fintech-primary">
          {t('bachelorPitch.timeline.tag')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border border-slate-200 bg-white p-4 sm:p-5 shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="space-y-1 pb-3 sm:pb-0 sm:pr-3">
            <div className="font-mono text-[11px] text-electric font-semibold">
              {t('bachelorPitch.timeline.step1Dates')}
            </div>
            <h3 className="text-xs font-bold text-fintech-primary">
              {t('bachelorPitch.timeline.step1Title')}
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t('bachelorPitch.timeline.step1Desc')}
            </p>
          </div>

          <div className="space-y-1 py-3 sm:py-0 sm:px-3">
            <div className="font-mono text-[11px] text-electric font-semibold">
              {t('bachelorPitch.timeline.step2Dates')}
            </div>
            <h3 className="text-xs font-bold text-fintech-primary">
              {t('bachelorPitch.timeline.step2Title')}
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t('bachelorPitch.timeline.step2Desc')}
            </p>
          </div>

          <div className="space-y-1 py-3 sm:py-0 sm:px-3">
            <div className="font-mono text-[11px] text-electric font-semibold">
              {t('bachelorPitch.timeline.step3Dates')}
            </div>
            <h3 className="text-xs font-bold text-fintech-primary">
              {t('bachelorPitch.timeline.step3Title')}
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t('bachelorPitch.timeline.step3Desc')}
            </p>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-3">
            <div className="font-mono text-[11px] text-electric font-semibold">
              {t('bachelorPitch.timeline.step4Dates')}
            </div>
            <h3 className="text-xs font-bold text-fintech-primary">
              {t('bachelorPitch.timeline.step4Title')}
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t('bachelorPitch.timeline.step4Desc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BachelorPitch;
