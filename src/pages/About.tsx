import React from 'react';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-fintech-secondary border border-slate-200 mb-4">
        {t('pages.about.title')}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-fintech-primary sm:text-4xl">
        {t('pages.about.placeholder')}
      </h1>
      <p className="mt-3 text-sm text-fintech-muted max-w-md">
        Background & story placeholder.
      </p>
    </div>
  );
};

export default About;
