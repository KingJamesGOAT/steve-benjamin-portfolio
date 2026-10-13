import React from 'react';
import { useTranslation } from 'react-i18next';

interface AppItem {
  id: string;
  name: string;
  category: string;
  categoryFr: string;
  svg: (colorClass: string) => React.ReactNode;
}

export const APP_ITEMS: AppItem[] = [
  {
    id: 'figma',
    name: 'Figma',
    category: 'UI/UX Design',
    categoryFr: 'Design UI/UX',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm0-8c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm8-4h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zm0 8h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V8z" />
      </svg>
    ),
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Code Editor',
    categoryFr: 'Éditeur de Code',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.583 2.046a1.368 1.368 0 0 0-1.127.242L7.337 9.535 3.321 6.47a.91.91 0 0 0-1.077-.015.912.912 0 0 0-.374.776v9.537c0 .324.144.628.389.789.246.161.564.18.826.049l3.856-2.951 8.948 7.078c.319.252.738.358 1.144.292a1.368 1.368 0 0 0 1.036-.786l4.699-9.398a1.367 1.367 0 0 0-.007-1.229L17.583 2.046zm.139 4.398l-7.394 5.556 7.394 5.556V6.444zM3.684 8.791l2.42 1.846-2.42 1.854V8.791z" />
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity & Docs',
    categoryFr: 'Documentation & Wiki',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.458-.82c1.196-.094 1.58.374 1.31 1.401l-1.97 7.755c-.233.934-.653 1.214-1.4 1.261l-11.458.841c-1.12.093-1.493-.42-1.306-1.4l1.938-7.659c.28-1.074.28-1.261-.999-1.849L4.46 4.208zm3.842 2.756l-1.399 5.586h2.158l.42-1.68h3.32l-.42 1.68h2.158l1.399-5.586h-2.158l-.42 1.68h-3.32l.42-1.68H8.301z" />
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    category: 'Image Editing',
    categoryFr: 'Traitement d\'Image',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm5.6 14.4h2.1v-3.7h2.2c2.4 0 3.8-1.3 3.8-3.4 0-2.2-1.5-3.3-3.9-3.3H5.6v10.4zm2.1-5.4V8.7h1.9c1.3 0 2 .6 2 1.6s-.7 1.7-2 1.7H7.7zm7.6 5.5c1.4 0 2.5-.5 3.3-1.4l-1.2-1.1c-.6.6-1.3.9-2 .9-.9 0-1.5-.5-1.5-1.2 0-1.8 3.5-1.2 3.5-3.8 0-1.5-1.2-2.5-3-2.5-1.2 0-2.2.4-3 1.1l1 1.2c.6-.5 1.3-.7 1.9-.7.8 0 1.3.4 1.3 1 0 1.8-3.5 1.2-3.5 3.8 0 1.6 1.3 2.7 3.2 2.7z" />
      </svg>
    ),
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    category: 'Vector Graphics',
    categoryFr: 'Graphisme Vectoriel',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm5.3 14.4h2.2l.8-2.6h3.4l.8 2.6h2.3l-3.7-10.4H8.9L5.3 17.4zm3.6-4.3l1.1-3.7 1.1 3.7H8.9zm8.5-5.9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm-1.1 10.2h2.2v-7.6h-2.2v7.6z" />
      </svg>
    ),
  },
  {
    id: 'indesign',
    name: 'InDesign',
    category: 'Page Layout & Print',
    categoryFr: 'Mise en Page Éditoriale',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm6.2 14.4h2.2v-10.4H6.2v10.4zm7.6.2c3 0 5-2.1 5-5.3 0-3.3-2-5.3-5-5.3h-2.6v10.6h2.6zm-.4-8.8c1.7 0 2.8 1.4 2.8 3.5 0 2.2-1.1 3.5-2.8 3.5h-.4V8.8h.4z" />
      </svg>
    ),
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'Agile Management',
    categoryFr: 'Gestion Agile',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.53 2c0 5.264 4.267 9.531 9.532 9.531h.938V2h-10.47zm-5.602 5.568C5.928 12.832 10.195 17.1 15.46 17.1h.938V7.568H5.928zM.326 13.136c0 5.265 4.267 9.532 9.532 9.532h.938v-9.532H.326z" />
      </svg>
    ),
  },
  {
    id: 'miro',
    name: 'Miro',
    category: 'Collaborative Whiteboard',
    categoryFr: 'Tableau Collaboratif',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 2.2L12.3 8.7l2.8 2.8 6.5-6.5-2.8-2.8zM12 9l-6.5 6.5 2.8 2.8L14.8 11.8 12 9zM5.2 15.8L2.4 18.6l2.8 2.8 2.8-2.8-2.8-2.8zM21.6 8.4l-2.8-2.8-6.5 6.5 2.8 2.8 6.5-6.5z" />
      </svg>
    ),
  },
  {
    id: 'tradingview',
    name: 'TradingView',
    category: 'Financial Analytics',
    categoryFr: 'Analyse Financière',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 6.5l-6.3 6.3-3.4-3.4L3 18.7V22h18V6.5zM2 17.3l8.3-8.3 3.4 3.4L18.7 7H14V4h8v8h-3V7.2l-5 5-3.4-3.4L3.8 16 2 17.3z" />
      </svg>
    ),
  },
  {
    id: 'tally',
    name: 'Tally',
    category: 'Forms & Data Capture',
    categoryFr: 'Formulaires & Enquêtes',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h3v16H4V4zm5 0h3v16H9V4zm5 0h3v16h-3V4zm5 0h3v16h-3V4zM2 18.5l20-13 1.5 2.3-20 13L2 18.5z" />
      </svg>
    ),
  },
  {
    id: 'office',
    name: 'Office 365',
    category: 'Productivity Suite',
    categoryFr: 'Suite Bureautique',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 5.5l-8-3.5a1 1 0 0 0-.8 0l-10 4.5A1 1 0 0 0 2 7.4v9.2a1 1 0 0 0 .7.9l10 4.5a1 1 0 0 0 .8 0l8-3.5a1 1 0 0 0 .5-.9V6.4a1 1 0 0 0-.5-.9zM12 4.1l6.4 2.8-3.9 1.8-6.4-2.8L12 4.1zm-8 4.2l6.5 2.8v8.6L4 16.9V8.3zm8.5 11.4v-8.6l3.5-1.6v8.6l-3.5 1.6zm7.5-3.7l-2.5 1.1V8.6l2.5-1.1v8.5z" />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'CMS & Web Publishing',
    categoryFr: 'CMS & Édition Web',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312L4.5 10.3l3.6 9.9c1.22.5 2.53.8 3.9.8s2.68-.3 3.9-.8l3.6-9.9-3.856 11.012C19.364 19.855 22 16.237 22 12c0-5.523-4.477-10-10-10zm0 1.5c4.687 0 8.5 3.813 8.5 8.5 0 1.68-.49 3.244-1.332 4.56L15.9 8.2c.4-.04.8-.08.8-.08.4 0 .4-.6 0-.6h-3.4c-.4 0-.4.6 0 .6 0 0 .4.04.8.08L12.5 13l-2.2-6.4c.4-.04.8-.08.8-.08.4 0 .4-.6 0-.6H7.7c-.4 0-.4.6 0 .6 0 0 .4.04.8.08L5.2 16.56A8.47 8.47 0 0 1 3.5 12c0-4.687 3.813-8.5 8.5-8.5z" />
      </svg>
    ),
  },
  {
    id: 'fl-studio',
    name: 'FL Studio',
    category: 'Audio Engineering',
    categoryFr: 'Production Audio & MAO',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 4.5c.8 0 1.5.7 1.5 1.5S11.8 9.5 11 9.5 9.5 8.8 9.5 8 10.2 6.5 11 6.5zm5.5 11c-1.8 1.4-4.2 1.8-6.4 1-2.2-.8-3.8-2.6-4.3-4.8-.5-2.2.2-4.5 1.9-6 1.7-1.4 4.1-1.8 6.3-1 2.2.8 3.8 2.6 4.3 4.8.5 2.2-.2 4.6-1.8 6z" />
      </svg>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Graphic Design',
    categoryFr: 'Création Graphique',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 14.8c-2.8 0-4.8-1.9-4.8-4.8 0-2.9 2-4.8 4.8-4.8 1.5 0 2.8.6 3.6 1.6l-1.3 1.2c-.6-.7-1.4-1.1-2.3-1.1-1.7 0-3 1.3-3 3.1s1.3 3.1 3 3.1c.9 0 1.7-.4 2.3-1.1l1.3 1.2c-.8 1-2.1 1.6-3.6 1.6z" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Version Control',
    categoryFr: 'Gestion de Versions',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 10.9L13.1 2.4a2.4 2.4 0 0 0-3.4 0L8 4.1l3.5 3.5a2.4 2.4 0 0 1 3.1 3.1l3.4 3.4a2.4 2.4 0 0 1 .6 2.3l3-1.5a2.4 2.4 0 0 0 0-4zM6.9 5.2L2.4 9.7a2.4 2.4 0 0 0 0 3.4l8.5 8.5a2.4 2.4 0 0 0 3.4 0l1.7-1.7-3.4-3.4a2.4 2.4 0 0 1-2.6-.5 2.4 2.4 0 0 1-.5-2.6L6.9 5.2z" />
      </svg>
    ),
  },
];

export const AppCarousel: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // Duplicate items array once for seamless infinite continuous loop
  const marqueeItems = [...APP_ITEMS, ...APP_ITEMS];

  return (
    <div className="space-y-2 pt-2 border-t border-slate-100">
      {/* Micro Section Header */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
        <span className="uppercase tracking-wider font-semibold text-slate-500">
          {isFrench ? '// Écosystème & Outillage Logiciel' : '// Software & Tooling Ecosystem'}
        </span>
        <span className="hidden sm:inline-block text-[10px] text-slate-400">
          {isFrench ? 'Survoler pour ralentir' : 'Hover to slow down'}
        </span>
      </div>

      {/* Marquee Track Container with hover slowdown */}
      <div className="relative w-full overflow-hidden marquee-hover-slow py-1 border border-slate-200/60 bg-slate-50/50">
        {/* Left & Right Subtle Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        <div className="animate-marquee-infinite flex items-center space-x-2.5 sm:space-x-3.5">
          {marqueeItems.map((app, index) => (
            <div
              key={`${app.id}-${index}`}
              className="flex items-center space-x-2 px-3 py-1.5 sm:px-3.5 sm:py-2 border border-slate-200/90 bg-white hover:border-electric hover:shadow-xs transition-all cursor-default select-none group flex-shrink-0"
              title={`${app.name} — ${isFrench ? app.categoryFr : app.category}`}
            >
              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0052FF] flex-shrink-0 group-hover:scale-110 transition-transform">
                {app.svg('w-full h-full object-contain')}
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-mono text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight whitespace-nowrap">
                  {app.name}
                </span>
                <span className="hidden md:inline-block font-mono text-[9.5px] text-slate-400 whitespace-nowrap">
                  {isFrench ? app.categoryFr : app.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppCarousel;
