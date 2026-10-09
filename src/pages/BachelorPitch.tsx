import React from 'react';
import { useTranslation } from 'react-i18next';

export const BachelorPitch: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-electric-light text-electric border border-electric/20 mb-4">
        {t('pages.bachelorPitch.title')}
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-fintech-primary sm:text-4xl">
        {t('pages.bachelorPitch.placeholder')}
      </h1>
      <p className="mt-3 text-sm text-fintech-muted max-w-md">
        2027 FinTech Bachelor Thesis Pitch placeholder.
      </p>
    </div>
  );
};

export default BachelorPitch;
