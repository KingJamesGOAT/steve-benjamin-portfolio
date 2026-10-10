import React from 'react';
import { useTranslation } from 'react-i18next';

interface AboutProps {
  id?: string;
}

export const About: React.FC<AboutProps> = ({ id = 'about' }) => {
  const { t } = useTranslation();

  const education = [
    {
      period: t('about.education.heig.period'),
      title: t('about.education.heig.title'),
      institution: t('about.education.heig.institution'),
      details: null,
    },
    {
      period: t('about.education.occa.period'),
      title: t('about.education.occa.title'),
      institution: t('about.education.occa.institution'),
      details: t('about.education.occa.details'),
    },
    {
      period: t('about.education.etml.period'),
      title: t('about.education.etml.title'),
      institution: t('about.education.etml.institution'),
      details: null,
    },
    {
      period: t('about.education.cpnv.period'),
      title: t('about.education.cpnv.title'),
      institution: t('about.education.cpnv.institution'),
      details: null,
    },
  ];

  const experience = [
    {
      org: t('about.experience.appapp.org'),
      description: t('about.experience.appapp.description'),
    },
    {
      org: t('about.experience.glgb.org'),
      description: t('about.experience.glgb.description'),
    },
    {
      org: t('about.experience.ficf.org'),
      description: t('about.experience.ficf.description'),
    },
  ];

  return (
    <section id={id} className="scroll-mt-24 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
            {t('about.badge')}
          </span>
          <span className="text-xs font-mono text-slate-500">
            {t('about.location')}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
          {t('about.title')}
        </h2>

        <p className="text-base sm:text-lg text-fintech-secondary max-w-3xl leading-relaxed">
          {t('about.summary')}
        </p>
      </div>

      {/* Education */}
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
                    {item.title}
                  </h4>
                  <span className="font-mono text-xs text-slate-500">
                    {item.institution}
                  </span>
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

      {/* Experience and Leadership */}
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
              <div className="md:col-span-3 font-mono text-xs sm:text-sm font-semibold text-fintech-primary">
                {item.org}
              </div>
              <div className="md:col-span-9">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          {t('about.linksTitle')}
        </h3>

        <div className="border-t border-b border-slate-200 divide-y divide-slate-200">
          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-3 font-mono text-xs sm:text-sm text-slate-500">
              {t('about.links.linkedinLabel')}
            </div>
            <div className="md:col-span-9">
              <a
                href="https://www.linkedin.com/in/steve-benjamin/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm text-fintech-primary hover:text-electric underline underline-offset-4 decoration-slate-300 hover:decoration-electric transition-colors"
              >
                {t('about.links.linkedinText')}
              </a>
            </div>
          </div>

          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline">
            <div className="md:col-span-3 font-mono text-xs sm:text-sm text-slate-500">
              {t('about.links.cvLabel')}
            </div>
            <div className="md:col-span-9">
              <a
                href={`${import.meta.env.BASE_URL}CV_Steve_Benjamin.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="font-mono text-xs sm:text-sm text-fintech-primary hover:text-electric underline underline-offset-4 decoration-slate-300 hover:decoration-electric transition-colors"
              >
                {t('about.links.cvText')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
