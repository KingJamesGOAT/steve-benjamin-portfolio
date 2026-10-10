import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, FileDown, ExternalLink } from 'lucide-react';
import PhysicsCanvas from '../components/features/PhysicsCanvas';
import CryptoWidgetSim from '../components/features/CryptoWidgetSim';
import About from './About';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Smooth scroll to hash anchor on mount or hash change
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [location.hash]);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* SECTION 1: HERO & PHYSICS CANVAS */}
      <section id="home" className="scroll-mt-24 space-y-12">
        <div className="space-y-6 max-w-4xl">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm text-xs font-mono font-medium bg-electric-light text-electric border border-electric/30">
            <span className="w-2 h-2 rounded-none bg-electric inline-block" />
            <span>{t('home.badge')}</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-fintech-primary leading-[1.08]">
              Steve Benjamin
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-electric leading-snug">
              {t('home.tagline')}
            </p>

            <p className="text-base sm:text-lg text-fintech-secondary max-w-2xl leading-relaxed font-normal">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Sleek Minimalist Rectangular Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#bachelor-pitch"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-sm bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{t('home.ctaPitch')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-sm border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
            >
              <span>{t('home.ctaProjects')}</span>
            </a>

            <a
              href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-sm border border-slate-200 bg-white hover:border-electric hover:text-electric text-slate-500 text-xs font-mono transition-colors shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
          </div>

          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-sm border border-slate-200 bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  {t('home.stats.duality.label')}
                </span>
                <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
              </div>
              <div className="text-xl font-bold font-mono text-fintech-primary">
                {t('home.stats.duality.value')}
              </div>
              <p className="text-xs text-slate-500">
                {t('home.stats.duality.desc')}
              </p>
            </div>

            <div className="p-4 rounded-sm border border-slate-200 bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  {t('home.stats.grade.label')}
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none inline-block" />
              </div>
              <div className="text-xl font-bold font-mono text-emerald-600">
                {t('home.stats.grade.value')}
              </div>
              <p className="text-xs text-slate-500">
                {t('home.stats.grade.desc')}
              </p>
            </div>

            <div className="p-4 rounded-sm border border-slate-200 bg-white shadow-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                  {t('home.stats.pitch.label')}
                </span>
                <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
              </div>
              <div className="text-xl font-bold font-mono text-fintech-primary">
                {t('home.stats.pitch.value')}
              </div>
              <p className="text-xs text-slate-500">
                {t('home.stats.pitch.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Centerpiece Physics Sandbox */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
                <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
                <span>{t('home.physicsBadge')}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {t('home.physicsHint')}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Matter.js 2D Physics
            </span>
          </div>

          <PhysicsCanvas />
        </div>
      </section>

      {/* SECTION 2: PROJECTS */}
      <section id="projects" className="scroll-mt-24 space-y-12">
        <div className="space-y-2 border-b border-slate-200/80 pb-6">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-sm text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
            <span>{t('projects.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
            {t('projects.title')}
          </h2>
          <p className="text-sm sm:text-base text-fintech-secondary max-w-2xl leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Primary Project 1: Crypto Trade Hub (With Embedded Interactive Live Sim) */}
        <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {t('projects.crypto.tag')}
              </span>
              <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-500" />
                <span>{t('projects.crypto.status')}</span>
              </span>
            </div>

            <Link
              to="/projects/crypto-trade-hub"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-sm bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{t('projects.viewDeepDive')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
              {t('projects.crypto.title')}
            </h3>
          </div>

          {/* Embedded Live Simulation Window */}
          <div className="border border-slate-200 rounded-sm overflow-hidden bg-slate-950">
            <CryptoWidgetSim />
          </div>

          {/* Sleek, Text-Only Architectural Description */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <p className="text-sm sm:text-base text-fintech-secondary leading-relaxed">
              {t('projects.crypto.description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {t('projects.crypto.pnlLabel')}
                </span>
                <div className="text-lg font-bold font-mono text-emerald-600">
                  {t('projects.crypto.pnlValue')}
                </div>
                <p className="text-[11px] font-mono text-slate-500">Autonomous Kelly Criterion Sizing</p>
              </div>

              <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Execution Core
                </span>
                <div className="text-lg font-bold font-mono text-fintech-primary">
                  ADX / MACD / RSI
                </div>
                <p className="text-[11px] font-mono text-slate-500">Trend Breakout & Mean Reversion</p>
              </div>

              <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  AI Intelligence
                </span>
                <div className="text-lg font-bold font-mono text-electric">
                  Groq LLaMA 3.3 70B
                </div>
                <p className="text-[11px] font-mono text-slate-500">Automated Sentiment & Briefings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Project 2: Donnons.ch (Clinical Typographic Grid) */}
        <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-[11px] font-mono font-medium bg-rose-50 text-rose-700 border border-rose-200">
                {t('projects.donnons.tag')}
              </span>
              <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
                <span className="w-1.5 h-1.5 rounded-none bg-rose-500" />
                <span>HUG Mandate</span>
              </span>
            </div>

            <Link
              to="/projects/donnons-ch"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-sm bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{t('projects.viewDeepDive')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fintech-primary">
              {t('projects.donnons.title')}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-fintech-secondary leading-relaxed">
              {t('projects.donnons.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                {t('projects.donnons.gradeLabel')}
              </span>
              <div className="text-lg font-bold font-mono text-fintech-primary">
                {t('projects.donnons.gradeValue')}
              </div>
              <p className="text-[11px] font-mono text-slate-500">Maximum Academic Distinction</p>
            </div>

            <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Client / Mandate
              </span>
              <div className="text-base font-bold font-mono text-fintech-primary truncate">
                Hôpitaux de Genève
              </div>
              <p className="text-[11px] font-mono text-slate-500">HUG Blood Transfusion Center</p>
            </div>

            <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Architecture Stack
              </span>
              <div className="text-base font-bold font-mono text-slate-700">
                Vue.js 3 • Laravel REST
              </div>
              <p className="text-[11px] font-mono text-slate-500">Tailwind CSS & Mobile Coordination</p>
            </div>
          </div>
        </div>

        {/* Smaller Showcases: Catholic Route & Marriage Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {t('projects.catholicRoute.tag')}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
                {t('projects.catholicRoute.title')}
              </h3>
              <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {t('projects.catholicRoute.description')}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">UX / UI Components</span>
              <Link
                to="/projects/catholic-route"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
                {t('projects.marriage.tag')}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-fintech-primary">
                {t('projects.marriage.title')}
              </h3>
              <p className="text-xs sm:text-sm text-fintech-secondary leading-relaxed">
                {t('projects.marriage.description')}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">RSVP State Engine</span>
              <Link
                to="/projects/marriage-platform"
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-electric hover:underline"
              >
                <span>{t('projects.viewDeepDive')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <About id="about" />

      {/* SECTION 4: BACHELOR PITCH */}
      <section id="bachelor-pitch" className="scroll-mt-24 space-y-8">
        <div className="rounded-sm border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm text-xs font-mono font-medium bg-electric-light text-electric border border-electric/30">
            <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
            <span>{t('bachelorPitch.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary">
            {t('bachelorPitch.title')}
          </h2>

          <p className="text-base sm:text-lg text-fintech-secondary max-w-3xl leading-relaxed">
            {t('bachelorPitch.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/bachelor-pitch"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-electric hover:bg-electric-hover text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <span>{t('bachelorPitch.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:sbstevebenjamin@gmail.com?subject=HEIG-VD%20Bachelor%20Project%202027"
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-sm border border-slate-200 bg-white hover:border-slate-300 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
            >
              <span>sbstevebenjamin@gmail.com</span>
            </a>
          </div>

          <p className="text-xs font-mono text-slate-500">
            {t('bachelorPitch.ctaSubtitle')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
