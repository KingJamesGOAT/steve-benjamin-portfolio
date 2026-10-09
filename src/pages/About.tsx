import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Cpu,
  MapPin,
  FileDown,
  Users,
  Heart,
  Globe2,
  Dribbble,
  Timer,
  Music,
  CheckCircle,
  Binary,
} from 'lucide-react';
import GlossaryTerm from '../components/features/GlossaryTerm';

export const About: React.FC = () => {
  const { t } = useTranslation();

  const languages = [
    { code: 'EN', name: t('about.section3.en'), level: t('about.section3.enLevel'), tag: 'C2 / Native' },
    { code: 'FR', name: t('about.section3.fr'), level: t('about.section3.frLevel'), tag: 'C2 / Native' },
    { code: 'DE', name: t('about.section3.de'), level: t('about.section3.deLevel'), tag: 'B2' },
    { code: 'TA', name: t('about.section3.ta'), level: t('about.section3.taLevel'), tag: 'B2' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 max-w-4xl mx-auto">
      {/* Profile Header */}
      <section className="space-y-4 pb-8 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <MapPin className="w-3.5 h-3.5 text-electric" />
            <span>{t('about.location')}</span>
          </div>

          {/* Download CV CTA */}
          <a
            href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg border border-slate-200 bg-white hover:border-electric hover:text-electric transition-colors shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV_Steve_Benjamin.pdf</span>
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
          {t('about.title')}
        </h1>

        <p className="text-base sm:text-lg text-fintech-secondary leading-relaxed font-normal">
          {t('about.summary')}
        </p>
      </section>

      {/* Section 1: The Bridge from Electronics to Media Engineering */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            {t('about.section1.badge')}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2.5">
            <Cpu className="w-6 h-6 text-electric flex-shrink-0" />
            <span>{t('about.section1.title')}</span>
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <p className="text-sm sm:text-base text-fintech-secondary leading-relaxed">
            {t('about.section1.p1')}{' '}
            <GlossaryTerm
              term={t('about.section1.cfcTerm')}
              definition={t('about.section1.cfcDef')}
            />{' '}
            {t('about.section1.p1Cont')}{' '}
            <GlossaryTerm
              term={t('about.section1.cpnvTerm')}
              definition={t('about.section1.cpnvDef')}
            />
            {t('about.section1.p1End')}
          </p>

          <p className="text-sm sm:text-base text-fintech-secondary leading-relaxed">
            {t('about.section1.p2')}{' '}
            <GlossaryTerm
              term={t('about.section1.heigvdTerm')}
              definition={t('about.section1.heigvdDef')}
            />
            {t('about.section1.p2End')}
          </p>

          {/* Duality Pillar Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-700">
                <Binary className="w-4 h-4 text-slate-500" />
                <span>Electronics Foundation (CPNV)</span>
              </div>
              <p className="text-xs text-slate-500 leading-normal">
                Deterministic circuits, low-level constraints, embedded signals, and zero-error tolerance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-electric-light/40 border border-electric/20 space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-electric">
                <Cpu className="w-4 h-4 text-electric" />
                <span>Media & Software (HEIG-VD)</span>
              </div>
              <p className="text-xs text-slate-600 leading-normal">
                Scalable full-stack systems, real-time UI data streams, sub-second latency, and UX excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Leadership and Impact */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            {t('about.section2.badge')}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2.5">
            <Users className="w-6 h-6 text-electric flex-shrink-0" />
            <span>{t('about.section2.title')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: GLGB */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-lg bg-electric-light text-electric">
                  <Users className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-fintech-primary">
                  {t('about.section2.glgbTitle')}
                </h3>
              </div>
              <p className="text-sm text-fintech-secondary leading-relaxed">
                {t('about.section2.glgbDesc')}{' '}
                <GlossaryTerm
                  term={t('about.section2.glgbTerm')}
                  definition={t('about.section2.glgbDef')}
                />
                {t('about.section2.glgbEnd')}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-xs font-mono text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Team Coordination & Vision Communication</span>
            </div>
          </div>

          {/* Card 2: FICF */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                  <Heart className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-fintech-primary">
                  {t('about.section2.ficfTitle')}
                </h3>
              </div>
              <p className="text-sm text-fintech-secondary leading-relaxed">
                {t('about.section2.ficfDesc')}{' '}
                <GlossaryTerm
                  term={t('about.section2.ficfTerm')}
                  definition={t('about.section2.ficfDef')}
                />
                {t('about.section2.ficfEnd')}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center space-x-2 text-xs font-mono text-slate-500">
              <CheckCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Medical Camps & Multilingual Translation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Languages */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            {t('about.section3.badge')}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2.5">
            <Globe2 className="w-6 h-6 text-electric flex-shrink-0" />
            <span>{t('about.section3.title')}</span>
          </h2>
          <p className="text-sm text-fintech-secondary">
            {t('about.section3.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-electric transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {lang.code}
                </span>
                <span className="text-[11px] font-mono text-electric font-semibold">
                  {lang.tag}
                </span>
              </div>
              <div className="font-semibold text-sm text-fintech-primary">
                {lang.name}
              </div>
              <div className="text-xs text-slate-500">
                {lang.level}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Hobbies */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            {t('about.section4.badge')}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-fintech-primary flex items-center space-x-2.5">
            <Dribbble className="w-6 h-6 text-electric flex-shrink-0" />
            <span>{t('about.section4.title')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hobby 1: Basketball */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="p-2 w-fit rounded-lg bg-orange-50 text-orange-600">
              <Dribbble className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-fintech-primary">
              {t('about.section4.bballTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.section4.bballDesc')}
            </p>
          </div>

          {/* Hobby 2: Running */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="p-2 w-fit rounded-lg bg-emerald-50 text-emerald-600">
              <Timer className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-fintech-primary">
              {t('about.section4.runningTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.section4.runningDesc')}
            </p>
          </div>

          {/* Hobby 3: Music Production */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="p-2 w-fit rounded-lg bg-purple-50 text-purple-600">
              <Music className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-fintech-primary">
              {t('about.section4.musicTitle')}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t('about.section4.musicDesc')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
