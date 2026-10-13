import React from 'react';

interface AppItem {
  id: string;
  name: string;
  svg: (colorClass: string) => React.ReactNode;
}

export const APP_ITEMS: AppItem[] = [
  {
    id: 'figma',
    name: 'Figma',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm0-8c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm8-4h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zm0 8h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V8z" />
      </svg>
    ),
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.458-.82c1.196-.094 1.58.374 1.31 1.401l-1.97 7.755c-.233.934-.653 1.214-1.4 1.261l-11.458.841c-1.12.093-1.493-.42-1.306-1.4l1.938-7.659c.28-1.074.28-1.261-.999-1.849L4.46 4.208zm3.842 2.756l-1.399 5.586h2.158l.42-1.68h3.32l-.42 1.68h2.158l1.399-5.586h-2.158l-.42 1.68h-3.32l.42-1.68H8.301z" />
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm5.6 14.4h2.1v-3.7h2.2c2.4 0 3.8-1.3 3.8-3.4 0-2.2-1.5-3.3-3.9-3.3H5.6v10.4zm2.1-5.4V8.7h1.9c1.3 0 2 .6 2 1.6s-.7 1.7-2 1.7H7.7zm7.6 5.5c1.4 0 2.5-.5 3.3-1.4l-1.2-1.1c-.6.6-1.3.9-2 .9-.9 0-1.5-.5-1.5-1.2 0-1.8 3.5-1.2 3.5-3.8 0-1.5-1.2-2.5-3-2.5-1.2 0-2.2.4-3 1.1l1 1.2c.6-.5 1.3-.7 1.9-.7.8 0 1.3.4 1.3 1 0 1.8-3.5 1.2-3.5 3.8 0 1.6 1.3 2.7 3.2 2.7z" />
      </svg>
    ),
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm5.3 14.4h2.2l.8-2.6h3.4l.8 2.6h2.3l-3.7-10.4H8.9L5.3 17.4zm3.6-4.3l1.1-3.7 1.1 3.7H8.9zm8.5-5.9a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm-1.1 10.2h2.2v-7.6h-2.2v7.6z" />
      </svg>
    ),
  },
  {
    id: 'indesign',
    name: 'Adobe InDesign',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3zm6.2 14.4h2.2v-10.4H6.2v10.4zm7.6.2c3 0 5-2.1 5-5.3 0-3.3-2-5.3-5-5.3h-2.6v10.6h2.6zm-.4-8.8c1.7 0 2.8 1.4 2.8 3.5 0 2.2-1.1 3.5-2.8 3.5h-.4V8.8h.4z" />
      </svg>
    ),
  },
  {
    id: 'jira',
    name: 'Jira',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.53 2c0 5.264 4.267 9.531 9.532 9.531h.938V2h-10.47zm-5.602 5.568C5.928 12.832 10.195 17.1 15.46 17.1h.938V7.568H5.928zM.326 13.136c0 5.265 4.267 9.532 9.532 9.532h.938v-9.532H.326z" />
      </svg>
    ),
  },
  {
    id: 'miro',
    name: 'Miro',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 2.2L12.3 8.7l2.8 2.8 6.5-6.5-2.8-2.8zM12 9l-6.5 6.5 2.8 2.8L14.8 11.8 12 9zM5.2 15.8L2.4 18.6l2.8 2.8 2.8-2.8-2.8-2.8zM21.6 8.4l-2.8-2.8-6.5 6.5 2.8 2.8 6.5-6.5z" />
      </svg>
    ),
  },
  {
    id: 'tradingview',
    name: 'TradingView',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.75 6.469h-4.328v11.062h4.328V6.47zM14.156 2.719H9.828v14.812h4.328V2.72zM6.562 10.219H2.234v7.313h4.328V10.22z" />
      </svg>
    ),
  },
  {
    id: 'tally',
    name: 'Tally',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 4h2.5v16H3V4zm5 0h2.5v16H8V4zm5 0h2.5v16H13V4zm5 0h2.5v16H18V4zM1.5 19.2l20-14.4 1.5 2.1-20 14.4-1.5-2.1z" />
      </svg>
    ),
  },
  {
    id: 'office',
    name: 'Microsoft 365 / Office',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 5.5l-8-3.5a1 1 0 0 0-.8 0l-10 4.5A1 1 0 0 0 2 7.4v9.2a1 1 0 0 0 .7.9l10 4.5a1 1 0 0 0 .8 0l8-3.5a1 1 0 0 0 .5-.9V6.4a1 1 0 0 0-.5-.9zM12 4.1l6.4 2.8-3.9 1.8-6.4-2.8L12 4.1zm-8 4.2l6.5 2.8v8.6L4 16.9V8.3zm8.5 11.4v-8.6l3.5-1.6v8.6l-3.5 1.6zm7.5-3.7l-2.5 1.1V8.6l2.5-1.1v8.5z" />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312L4.5 10.3l3.6 9.9c1.22.5 2.53.8 3.9.8s2.68-.3 3.9-.8l3.6-9.9-3.856 11.012C19.364 19.855 22 16.237 22 12c0-5.523-4.477-10-10-10zm0 1.5c4.687 0 8.5 3.813 8.5 8.5 0 1.68-.49 3.244-1.332 4.56L15.9 8.2c.4-.04.8-.08.8-.08.4 0 .4-.6 0-.6h-3.4c-.4 0-.4.6 0 .6 0 0 .4.04.8.08L12.5 13l-2.2-6.4c.4-.04.8-.08.8-.08.4 0 .4-.6 0-.6H7.7c-.4 0-.4.6 0 .6 0 0 .4.04.8.08L5.2 16.56A8.47 8.47 0 0 1 3.5 12c0-4.687 3.813-8.5 8.5-8.5z" />
      </svg>
    ),
  },
  {
    id: 'fl-studio',
    name: 'FL Studio',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.633.003c-.237.008-.475.053-.695.148-1.748.749-2.645 2.652-2.186 4.545l.08.318C7.57 6.136 5.86 8.35 5.568 11.236c-.443 4.385 2.576 8.36 6.83 9.083 4.417.75 8.324-2.19 9.043-6.666.697-4.341-2.08-8.293-6.223-9.155.035-.558-.088-1.135-.39-1.63C14.28 1.95 13.578.01 12.633.003zM12.9 6.8c2.9.64 4.8 3.4 4.3 6.4-.5 3.1-3.2 5.2-6.3 4.6-2.9-.64-4.8-3.4-4.3-6.4.5-3.1 3.2-5.2 6.3-4.6z" />
      </svg>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.012 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75zm1.602 14.153c-2.457.17-4.48-1.55-4.48-4.04 0-2.482 2.05-4.316 4.606-4.316 1.83 0 3.125.962 3.58 2.074l-1.637.766c-.34-.73-.978-1.12-1.943-1.12-1.574 0-2.658 1.15-2.658 2.65 0 1.55 1.15 2.57 2.658 2.57 1.022 0 1.77-.442 2.158-1.155l1.638.748c-.646 1.19-2.022 1.823-3.922 1.823z" />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    svg: (cls) => (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 10.9L13.1 2.4a2.4 2.4 0 0 0-3.4 0L8 4.1l3.5 3.5a2.4 2.4 0 0 1 3.1 3.1l3.4 3.4a2.4 2.4 0 0 1 .6 2.3l3-1.5a2.4 2.4 0 0 0 0-4zM6.9 5.2L2.4 9.7a2.4 2.4 0 0 0 0 3.4l8.5 8.5a2.4 2.4 0 0 0 3.4 0l1.7-1.7-3.4-3.4a2.4 2.4 0 0 1-2.6-.5 2.4 2.4 0 0 1-.5-2.6L6.9 5.2z" />
      </svg>
    ),
  },
];

export const AppCarousel: React.FC = () => {
  // Duplicate array once for continuous infinite loop
  const marqueeItems = [...APP_ITEMS, ...APP_ITEMS];

  return (
    <div className="w-full pt-1">
      {/* Marquee Track Container with hover slowdown */}
      <div className="relative w-full overflow-hidden marquee-hover-slow py-2 border border-slate-200/60 bg-slate-50/40">
        {/* Left & Right Subtle Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        <div className="animate-marquee-infinite flex items-center space-x-3 sm:space-x-4">
          {marqueeItems.map((app, index) => (
            <div
              key={`${app.id}-${index}`}
              className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center border border-slate-200/90 bg-white hover:border-electric hover:shadow-xs transition-all cursor-default select-none group flex-shrink-0"
              title={app.name}
            >
              <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#0052FF] flex items-center justify-center group-hover:scale-115 transition-transform">
                {app.svg('w-full h-full object-contain')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppCarousel;
