import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import CryptoWidgetSim from '../components/features/CryptoWidgetSim';
import DonnonsWidgetSim from '../components/features/DonnonsWidgetSim';

export const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Page Header */}
      <section className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
          {t('projects.title')}
        </h1>
        <p className="text-base text-fintech-secondary max-w-2xl leading-relaxed">
          {t('projects.subtitle')}
        </p>
      </section>

      {/* Primary Project 1: Crypto Trade Hub with Live Simulation */}
      <section className="rounded-none border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
              {t('projects.crypto.title')}
            </h2>

            <Link
              to="/projects/crypto-trade-hub"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-none bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{t('projects.viewDeepDive')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-fintech-secondary leading-relaxed">
            {t('projects.crypto.description')}
          </p>
        </div>

        {/* Live Simulation Embed */}
        <div className="border border-slate-800 rounded-none overflow-hidden bg-slate-950">
          <CryptoWidgetSim />
        </div>
      </section>

      {/* Primary Project 2: Donnons.ch */}
      <section className="rounded-none border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
              {t('projects.donnons.title')}
            </h2>

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

        {/* Live Simulation Embed */}
        <div className="w-full">
          <DonnonsWidgetSim />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-none bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              {t('projects.donnons.gradeLabel')}
            </span>
            <div className="text-lg font-bold font-mono text-fintech-primary">
              {t('projects.donnons.gradeValue')}
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              {t('projects.showcase.maxDistinction')}
            </p>
          </div>

          <div className="p-3.5 rounded-none bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              {t('projects.showcase.clientMandate')}
            </span>
            <div className="text-base font-bold font-mono text-fintech-primary truncate">
              Hôpitaux de Genève (HUG)
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              {isFrench ? 'Résorption du taux de rejet de 30%' : 'Eliminating the 30% deferral rate'}
            </p>
          </div>

          <div className="p-3.5 rounded-none bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              {t('projects.showcase.archStack')}
            </span>
            <div className="text-base font-bold font-mono text-slate-700">
              Vue.js 3, MySQL, Laravel, Tailwind
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              {isFrench ? 'Architecture full-stack & Design Néo-brutaliste' : 'Full-stack Architecture & Neo-brutalist Design'}
            </p>
          </div>
        </div>
      </section>

      {/* Smaller Showcase Grid: Lexicon Engine & Marriage Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Showcase: Lexicon Engine */}
        <section className="rounded-none border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-[11px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
              {t('projects.catholicRoute.tag')}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
              {t('projects.catholicRoute.title')}
            </h3>
            <p className="text-sm text-fintech-secondary leading-relaxed">
              {t('projects.catholicRoute.description')}
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-electric inline-block" />
                <span>{t('projects.catholicRoute.feature1')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-electric inline-block" />
                <span>{t('projects.catholicRoute.feature2')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-electric inline-block" />
                <span>{t('projects.catholicRoute.feature3')}</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">{t('projects.showcase.uxUiComponents')}</span>
            <Link
              to="/projects/catholic-route"
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
            >
              <span>{t('projects.viewDeepDive')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Showcase: Marriage Website */}
        <section className="rounded-none border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-[11px] font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
              {t('projects.marriage.tag')}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
              {t('projects.marriage.title')}
            </h3>
            <p className="text-sm text-fintech-secondary leading-relaxed">
              {t('projects.marriage.description')}
            </p>

            <ul className="space-y-2 pt-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-amber-500 inline-block" />
                <span>{t('projects.marriage.feature1')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-amber-500 inline-block" />
                <span>{t('projects.marriage.feature2')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-none bg-amber-500 inline-block" />
                <span>{t('projects.marriage.feature3')}</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">{t('projects.showcase.rsvpEngine')}</span>
            <Link
              to="/projects/marriage-platform"
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
            >
              <span>{t('projects.viewDeepDive')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;
