import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Sparkles,
  FileDown,
  Layers,
  Cpu,
  Award,
  Calendar,
} from 'lucide-react';
import PhysicsCanvas from '../components/features/PhysicsCanvas';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <section className="space-y-8 pt-4 sm:pt-8 max-w-4xl">
        {/* Availability Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-electric-light text-electric border border-electric/30">
          <span className="w-2 h-2 rounded-full bg-electric animate-pulse inline-block" />
          <span>{t('home.badge')}</span>
        </div>

        {/* Hero Title & Tagline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-fintech-primary leading-[1.1]">
            Steve Benjamin
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-electric leading-snug">
            {t('home.tagline')}
          </p>

          <p className="text-base sm:text-lg text-fintech-secondary max-w-2xl leading-relaxed font-normal">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <Link
            to="/bachelor-pitch"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-electric hover:bg-electric-hover text-white text-sm font-semibold shadow-lg shadow-electric/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{t('home.ctaPitch')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
          >
            <span>{t('home.ctaProjects')}</span>
          </Link>

          <a
            href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-500 text-sm font-mono transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span>CV (PDF)</span>
          </a>
        </div>

        {/* Key Metrics / Credential Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                {t('home.stats.duality.label')}
              </span>
              <Cpu className="w-4 h-4 text-electric" />
            </div>
            <div className="text-xl font-bold font-mono text-fintech-primary">
              {t('home.stats.duality.value')}
            </div>
            <p className="text-xs text-slate-500">
              {t('home.stats.duality.desc')}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                {t('home.stats.grade.label')}
              </span>
              <Award className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-600">
              {t('home.stats.grade.value')}
            </div>
            <p className="text-xs text-slate-500">
              {t('home.stats.grade.desc')}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                {t('home.stats.pitch.label')}
              </span>
              <Calendar className="w-4 h-4 text-electric" />
            </div>
            <div className="text-xl font-bold font-mono text-fintech-primary">
              {t('home.stats.pitch.value')}
            </div>
            <p className="text-xs text-slate-500">
              {t('home.stats.pitch.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Centerpiece: Antigravity 2D Physics Canvas */}
      <section className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
              <Layers className="w-3.5 h-3.5" />
              <span>{t('home.physicsBadge')}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              {t('home.physicsHint')}
            </p>
          </div>

          <span className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-electric" />
            <span>Matter.js Engine</span>
          </span>
        </div>

        {/* The Physics Canvas */}
        <PhysicsCanvas />
      </section>
    </div>
  );
};

export default Home;
