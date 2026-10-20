import React from 'react';
import { useTranslation } from 'react-i18next';
import CopyEmailButton from '../components/core/CopyEmailButton';

interface AboutProps {
  id?: string;
}

export const About: React.FC<AboutProps> = ({ id = 'about' }) => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const education = [
    {
      period: isFrench ? '2023-Présent' : '2023-Present',
      title: isFrench ? 'BSc Ingénierie des Médias' : 'BSc Media Engineering',
      institution: 'HEIG-VD',
      details: null,
    },
    {
      period: isFrench ? '2023 (6 mois)' : '2023 (6 months)',
      title: 'OCCA, Oxford',
      institution: 'Oxford',
      details: isFrench ? 'Philosophie, éthique, sciences' : 'Philosophy, ethics, science',
    },
    {
      period: '2021-2022',
      title: isFrench ? 'Maturité Professionnelle TASV' : 'Professional Maturity TASV',
      institution: 'ETML Lausanne',
      details: null,
    },
    {
      period: '2017-2021',
      title: isFrench ? 'CFC Électronicien' : 'Electronics CFC',
      institution: 'CPNV Yverdon',
      details: null,
    },
  ];

  const experience = [
    {
      period: isFrench ? '2023 - Présent' : '2023 - Present',
      role: t('about.experience.appapp.role'),
      org: t('about.experience.appapp.org'),
      description: t('about.experience.appapp.description'),
    },
    {
      period: isFrench ? 'Déc. 2023 - Présent' : 'Dec. 2023 - Present',
      role: t('about.experience.glgb.role'),
      org: t('about.experience.glgb.org'),
      description: t('about.experience.glgb.description'),
    },
    {
      period: isFrench ? 'Déc. 2021 - Présent' : 'Dec. 2021 - Present',
      role: t('about.experience.ficf.role'),
      org: t('about.experience.ficf.org'),
      description: t('about.experience.ficf.description'),
    },
  ];

  return (
    <section id={id} className="scroll-mt-24 space-y-8 sm:space-y-12">
      {/* Header with Profile Photo */}
      <div className="border-b border-slate-200 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Title, Bio & Quick Highlights */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
              {t('about.title')}
            </h2>

            <p className="text-sm sm:text-lg text-fintech-secondary leading-relaxed text-justify">
              {t('about.summary')}
            </p>

            {/* Mother Tongue Highlight */}
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-slate-200 bg-slate-50/70 font-mono text-xs">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  {t('about.motherTongueLabel')}:
                </span>
                <span className="font-semibold text-slate-900">
                  {t('about.motherTongueValue')}
                </span>
              </span>
            </div>

            {/* Clean Direct Links Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
              <a
                href="https://www.linkedin.com/in/sb-steve-benjamin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-slate-700 hover:text-electric transition-colors"
              >
                <span>LinkedIn ↗</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center space-x-1.5 text-slate-700 hover:text-electric transition-colors"
              >
                <span>CV (PDF) ↗</span>
              </a>
              <span className="text-slate-300">·</span>
              <CopyEmailButton className="text-slate-700 hover:text-electric text-xs" />
            </div>
          </div>

          {/* Right Column: Clean, Structured Profile Picture Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end pt-2 lg:pt-0">
            <div className="w-full max-w-[200px] sm:max-w-[260px] border border-slate-200 bg-white p-2 sm:p-3 shadow-sm">
              <div className="overflow-hidden bg-slate-100 aspect-square relative">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="Steve Benjamin"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/profile.jpg')) {
                      target.src = '/profile.jpg';
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="pt-2 px-0.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500">
                <span className="font-semibold text-slate-700">Steve Benjamin</span>
                <span className="text-slate-400">{t('about.facts.ageCaption')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Timeline Grid */}
      <div id="education" className="space-y-3 sm:space-y-4 scroll-mt-24">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          {t('about.educationTitle')}
        </h3>

        <div className="border-t border-b border-slate-200 divide-y divide-slate-100">
          {education.map((item, index) => (
            <div
              key={index}
              className="py-2.5 sm:py-4 grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 items-baseline"
            >
              <div className="md:col-span-3 font-mono text-[11px] sm:text-sm text-slate-400 sm:text-slate-500 tabular-nums">
                {item.period}
              </div>
              <div className="md:col-span-9 space-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="text-xs sm:text-base font-semibold text-fintech-primary">
                    {item.title} <span className="font-normal text-slate-500">({item.institution})</span>
                  </h4>
                </div>
                {item.details && (
                  <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience and Leadership Grid */}
      <div id="experience" className="space-y-3 sm:space-y-4 scroll-mt-24">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          {t('about.experienceTitle')}
        </h3>

        <div className="border-t border-b border-slate-200 divide-y divide-slate-100">
          {experience.map((item, index) => (
            <div
              key={index}
              className="py-2.5 sm:py-4 grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 items-baseline"
            >
              <div className="md:col-span-3 font-mono text-[11px] sm:text-sm text-slate-400 sm:text-slate-500 tabular-nums">
                {item.period}
              </div>
              <div className="md:col-span-9 space-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="text-xs sm:text-base font-semibold text-fintech-primary">
                    {item.role}
                  </h4>
                </div>
                <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">{item.org}</span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
