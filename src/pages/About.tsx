import React from 'react';
import { useTranslation } from 'react-i18next';

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
      period: '2023',
      title: 'OCCA, Oxford',
      institution: 'Oxford',
      details: isFrench ? 'Philosophie, éthique, sciences' : 'Philosophy, ethics, science',
    },
    {
      period: '2021-2022',
      title: isFrench ? 'Maturité Professionnelle' : 'Professional Maturity',
      institution: 'ETML',
      details: null,
    },
    {
      period: '2017-2021',
      title: isFrench ? 'CFC Électronique' : 'CFC Electronics',
      institution: 'CPNV',
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
    <section id={id} className="scroll-mt-24 space-y-12">
      {/* Header with Profile Photo on the Right */}
      <div className="border-b border-slate-200 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Title, Bio & Quick Highlights */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
              {t('about.title')}
            </h2>

            <p className="text-base sm:text-lg text-fintech-secondary leading-relaxed text-justify">
              {t('about.summary')}
            </p>

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
              <a
                href="mailto:sbstevebenjamin@gmail.com"
                className="inline-flex items-center space-x-1.5 text-slate-700 hover:text-electric transition-colors"
              >
                <span>sbstevebenjamin@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Structured Profile Picture Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-[260px] sm:max-w-[280px] border border-slate-200 bg-white p-3 shadow-md shadow-slate-900/5">
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
              <div className="pt-2.5 px-0.5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="font-semibold text-slate-700">Steve Benjamin</span>
                <span className="text-slate-400">{t('about.facts.ageCaption')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Timeline Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          {t('about.educationTitle')}
        </h3>

        <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
          {education.map((item, index) => (
            <div
              key={index}
              className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
            >
              <div className="md:col-span-3 font-mono text-xs sm:text-sm text-slate-500 tabular-nums">
                {item.period}
              </div>
              <div className="md:col-span-9 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-semibold text-fintech-primary">
                    {item.title} ({item.institution})
                  </h4>
                </div>
                {item.details && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience and Leadership Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          {t('about.experienceTitle')}
        </h3>

        <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
          {experience.map((item, index) => (
            <div
              key={index}
              className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
            >
              <div className="md:col-span-3 font-mono text-xs sm:text-sm text-slate-500 tabular-nums">
                {item.period}
              </div>
              <div className="md:col-span-9 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-semibold text-fintech-primary">
                    {item.role}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-0.5">
                  <span className="font-semibold text-slate-800">{item.org}</span>
                  <span className="mx-2 text-slate-400">·</span>
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
