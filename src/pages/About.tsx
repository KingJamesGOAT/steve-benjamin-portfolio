import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
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

  const certifications = [
    {
      group: t('about.certifications.groupFintech'),
      items: [
        {
          period: t('about.certifications.dukeDefi.period'),
          title: t('about.certifications.dukeDefi.title'),
          issuer: t('about.certifications.dukeDefi.issuer'),
          description: t('about.certifications.dukeDefi.description'),
          link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/Z0YWQ005UI0C',
        },
      ],
    },
    {
      group: t('about.certifications.groupAiDev'),
      items: [
        {
          period: t('about.certifications.claudeApi.period'),
          title: t('about.certifications.claudeApi.title'),
          issuer: t('about.certifications.claudeApi.issuer'),
          description: t('about.certifications.claudeApi.description'),
          link: 'https://academy.claude.com/verify/7b1fc8d9d4a19f6bb8e7d4b1a2ffa71b',
        },
        {
          period: t('about.certifications.claudeCode.period'),
          title: t('about.certifications.claudeCode.title'),
          issuer: t('about.certifications.claudeCode.issuer'),
          description: t('about.certifications.claudeCode.description'),
          link: 'https://academy.claude.com/verify/b22cbb90ce16cac2143dde13da2749bd',
        },
      ],
    },
    {
      group: t('about.certifications.groupLeadership'),
      items: [
        {
          period: t('about.certifications.nationBuilding.period'),
          title: t('about.certifications.nationBuilding.title'),
          issuer: t('about.certifications.nationBuilding.issuer'),
          description: t('about.certifications.nationBuilding.description'),
          link: null,
        },
      ],
    },
  ];

  return (
    <section id={id} className="scroll-mt-24 space-y-8 sm:space-y-12">
      {/* Header with Profile Photo */}
      <div className="border-b border-slate-200 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Title + Circular Mobile Avatar, Bio & Quick Highlights */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Title Row with Circular Avatar on Mobile */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-fintech-primary">
                {t('about.title')}
              </h2>

              {/* Small Circular Face Avatar on Mobile/Tablet (Right of About) */}
              <div className="lg:hidden shrink-0 flex items-center gap-2.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-xs">
                  <img
                    src={`${import.meta.env.BASE_URL}profile.jpg`}
                    alt="Steve Benjamin"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/profile.jpg')) {
                        target.src = '/profile.jpg';
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-lg text-fintech-secondary leading-relaxed text-justify">
              {t('about.summary')}
            </p>

            {/* Non-clickable Editorial Language Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-electric pl-3 py-0.5 font-mono text-xs sm:text-sm select-none">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                {isFrench ? 'Langues :' : 'Languages:'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <span className="font-bold text-slate-900">EN</span>
                <span className="text-slate-500">({t('about.languages.native')})</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <span className="font-bold text-slate-900">FR</span>
                <span className="text-slate-500">({t('about.languages.native')})</span>
              </span>
            </div>

            {/* Clean Direct Links Row (Structured grid on mobile, inline row on desktop) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 pt-1 font-mono text-xs">
              <a
                href="https://www.linkedin.com/in/sb-steve-benjamin/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start space-x-1.5 py-2 px-3 sm:p-0 border sm:border-0 border-slate-200 bg-white sm:bg-transparent text-slate-700 hover:text-electric hover:border-electric transition-colors font-semibold sm:font-normal"
              >
                <span>LinkedIn ↗</span>
              </a>
              <span className="hidden sm:inline text-slate-300">·</span>
              <a
                href={`${import.meta.env.BASE_URL}${isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf'}`}
                target="_blank"
                rel="noopener noreferrer"
                download={isFrench ? 'CV_Steve_Benjamin.pdf' : 'EnglishSteveBenjaminCV.pdf'}
                className="inline-flex items-center justify-center sm:justify-start space-x-1.5 py-2 px-3 sm:p-0 border sm:border-0 border-slate-200 bg-white sm:bg-transparent text-slate-700 hover:text-electric hover:border-electric transition-colors font-semibold sm:font-normal"
              >
                <span>CV (PDF) ↗</span>
              </a>
              <span className="hidden sm:inline text-slate-300">·</span>
              <div className="col-span-2 sm:col-span-1">
                <CopyEmailButton className="w-full sm:w-auto justify-center sm:justify-start py-2 px-3 sm:p-0 border sm:border-0 border-slate-200 bg-white sm:bg-transparent text-slate-700 hover:text-electric text-xs" />
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Structured Profile Picture Frame (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-4 justify-end pt-0">
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
              className="py-2.5 sm:py-4 grid grid-cols-1 md:grid-cols-12 gap-0.5 md:gap-6 items-baseline"
            >
              <div className="md:col-span-3 font-mono text-[11px] sm:text-sm text-slate-400 sm:text-slate-500 tabular-nums">
                {item.period}
              </div>
              <div className="md:col-span-9 space-y-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <h4 className="text-xs sm:text-base font-semibold text-fintech-primary">
                    {item.role} <span className="sm:hidden font-normal text-slate-500">· {item.org}</span>
                  </h4>
                </div>
                <p className="hidden sm:block text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">{item.org}</span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div id="certifications" className="space-y-3 sm:space-y-6 scroll-mt-24">
        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          {t('about.certificationsTitle')}
        </h3>

        <div className="border-t sm:border-t-0 border-slate-200 divide-y divide-slate-100 sm:divide-y-0 sm:space-y-6">
          {certifications.map((group, groupIndex) => (
            <div key={groupIndex} className="sm:space-y-3">
              <h4 className="hidden sm:block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {group.group}
              </h4>

              <div className="sm:border-t sm:border-b sm:border-slate-200 divide-y divide-slate-100">
                {group.items.map((item, index) => (
                  <div
                    key={index}
                    className="py-2.5 sm:py-4 grid grid-cols-1 md:grid-cols-12 gap-0.5 md:gap-6 items-baseline"
                  >
                    <div className="md:col-span-3 font-mono text-[11px] sm:text-sm text-slate-400 sm:text-slate-500 tabular-nums">
                      {item.period}
                    </div>
                    <div className="md:col-span-9 space-y-0.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-xs sm:text-base font-semibold text-fintech-primary">
                          {item.title} <span className="font-normal text-slate-500">({item.issuer})</span>
                        </h4>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 font-mono text-[11px] sm:text-xs text-electric sm:text-slate-700 hover:text-electric transition-colors shrink-0"
                          >
                            <span>{t('about.certifications.verify')}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="hidden sm:block text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
