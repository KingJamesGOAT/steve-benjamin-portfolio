import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  FileDown,
  Building2,
  Clock,
  ShieldCheck,
  Code2,
  Layout,
  BarChart3,
  Calendar,
} from 'lucide-react';

import GlossaryTerm from '../components/features/GlossaryTerm';
import { getGlossaryDef } from '../data/cryptoGlossary';

export const BachelorPitch: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const isFrench = currentLang === 'fr';

  // Ensure scroll is at the top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 max-w-4xl mx-auto">
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

      {/* Hero Header */}
      <section className="border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 text-xs font-mono font-medium bg-blue-50 text-electric border border-blue-200">
            <span className="w-1.5 h-1.5 bg-electric inline-block" />
            <span>{t('bachelorPitch.tag')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.title')}
          </h1>

          <p className="text-base text-fintech-secondary leading-relaxed max-w-2xl">
            {t('bachelorPitch.heroDesc')}
          </p>
        </div>

        {/* Action & Document Downloads */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <a
            href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027%20-%20Mandate%20Discussion"
            className="inline-flex items-center space-x-2 px-5 py-3 bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors uppercase tracking-wider"
          >
            <span>{t('bachelorPitch.ctaContact')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`${import.meta.env.BASE_URL}HEIG-VD-Guide_TB-filiere-IM-2026-27.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center space-x-2 px-4 py-3 border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-700 text-xs font-semibold transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4 text-electric" />
            <span>{t('bachelorPitch.ctaGuide')}</span>
          </a>

          <a
            href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center space-x-2 px-4 py-3 border border-slate-200 bg-white hover:border-slate-300 text-slate-600 text-xs font-mono transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4 text-slate-400" />
            <span>{t('bachelorPitch.ctaResume')}</span>
          </a>
        </div>
      </section>

      {/* 3 Key Modalities for Companies */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            {t('bachelorPitch.conditions.tag')}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.conditions.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {isFrench ? '01 / Rémunération' : '01 / Remuneration'}
              </span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.costTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.conditions.costDesc')}
            </p>
          </div>

          <div className="p-5 border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {isFrench ? '02 / Cadre Juridique & PI' : '02 / Legal & IP'}
              </span>
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            </div>
            <h3 className="text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.confidentialityTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFrench ? (
                <>
                  Le projet peut être classé strictement{' '}
                  <GlossaryTerm
                    term="confidentiel (NDA)"
                    definition={getGlossaryDef('nda', 'fr')}
                  />{' '}
                  sur simple demande de l'entreprise (seuls le titre et le résumé restent publics). La{' '}
                  <GlossaryTerm
                    term="propriété intellectuelle"
                    definition={getGlossaryDef('ip-transfer', 'fr')}
                  />{' '}
                  est convenue d'entente.
                </>
              ) : (
                <>
                  Projects can be held strictly{' '}
                  <GlossaryTerm
                    term="confidential (NDA)"
                    definition={getGlossaryDef('nda', 'en')}
                  />{' '}
                  upon request (only title and abstract made public).{' '}
                  <GlossaryTerm
                    term="IP terms"
                    definition={getGlossaryDef('ip-transfer', 'en')}
                  />{' '}
                  are arranged directly with the company.
                </>
              )}
            </p>
          </div>

          <div className="p-5 border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {isFrench ? '03 / Calendrier' : '03 / Schedule'}
              </span>
              <Clock className="w-4 h-4 text-electric" />
            </div>
            <h3 className="text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.conditions.durationTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.conditions.durationDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3 Practical Engineering Scopes */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            {t('bachelorPitch.scope.tag')}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.scope.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-electric">
              <Code2 className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold">{isFrench ? 'Axe 01' : 'Track 01'}</span>
            </div>
            <h3 className="text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.scope.track1Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.scope.track1Desc')}
            </p>
          </div>

          <div className="p-5 border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-emerald-700">
              <Layout className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold">{isFrench ? 'Axe 02' : 'Track 02'}</span>
            </div>
            <h3 className="text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.scope.track2Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.scope.track2Desc')}
            </p>
          </div>

          <div className="p-5 border border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center space-x-2 text-purple-700">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold">{isFrench ? 'Axe 03' : 'Track 03'}</span>
            </div>
            <h3 className="text-sm font-bold text-fintech-primary">
              {t('bachelorPitch.scope.track3Title')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('bachelorPitch.scope.track3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Roadmap */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-electric flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{t('bachelorPitch.timeline.tag')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.timeline.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border border-slate-200 bg-white p-5 sm:p-6 shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="space-y-1 pb-3 sm:pb-0 sm:pr-3">
            <div className="font-mono text-[11px] text-electric font-semibold">{t('bachelorPitch.timeline.step1Dates')}</div>
            <h4 className="text-xs font-bold text-fintech-primary">{t('bachelorPitch.timeline.step1Title')}</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isFrench ? (
                <>
                  Échanges initiaux pour définir le{' '}
                  <GlossaryTerm
                    term="cahier des charges"
                    definition={getGlossaryDef('project-specifications', 'fr')}
                  />{' '}
                  et les contours du projet.
                </>
              ) : (
                <>
                  Initial discussions to define{' '}
                  <GlossaryTerm
                    term="project specifications"
                    definition={getGlossaryDef('project-specifications', 'en')}
                  />{' '}
                  and project scope.
                </>
              )}
            </p>
          </div>

          <div className="space-y-1 py-3 sm:py-0 sm:px-3">
            <div className="font-mono text-[11px] text-electric font-semibold">{t('bachelorPitch.timeline.step2Dates')}</div>
            <h4 className="text-xs font-bold text-fintech-primary">{t('bachelorPitch.timeline.step2Title')}</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.step2Desc')}</p>
          </div>

          <div className="space-y-1 py-3 sm:py-0 sm:px-3">
            <div className="font-mono text-[11px] text-electric font-semibold">{t('bachelorPitch.timeline.step3Dates')}</div>
            <h4 className="text-xs font-bold text-fintech-primary">{t('bachelorPitch.timeline.step3Title')}</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.step3Desc')}</p>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-3">
            <div className="font-mono text-[11px] text-electric font-semibold">{t('bachelorPitch.timeline.step4Dates')}</div>
            <h4 className="text-xs font-bold text-fintech-primary">{t('bachelorPitch.timeline.step4Title')}</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">{t('bachelorPitch.timeline.step4Desc')}</p>
          </div>
        </div>
      </section>

      {/* Direct Contact Card */}
      <section className="border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-fintech-primary">
              {t('bachelorPitch.contact.title')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {t('bachelorPitch.contact.desc')}
            </p>
          </div>

          <a
            href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027"
            className="inline-flex items-center space-x-2 px-5 py-3 bg-fintech-primary hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto shrink-0"
          >
            <span>sbstevebenjamin@gmail.com</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-slate-200 text-xs font-mono text-slate-600">
          <div>
            <span className="text-slate-400 uppercase text-[10px] block">Institution</span>
            <span className="font-semibold text-fintech-primary">{t('bachelorPitch.contact.institution')}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] block">{isFrench ? 'Localisation' : 'Location'}</span>
            <span className="font-semibold text-fintech-primary">{t('bachelorPitch.contact.location')}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] block">{isFrench ? 'Guide Officiel' : 'Official Guide'}</span>
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
