import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BentoTile {
  id: string;
  tagEn?: string;
  tagFr?: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  tools: string[];
  codeSnippet: React.ReactNode;
}

const BentoTileCard: React.FC<{ tile: BentoTile; isFrench: boolean }> = ({ tile, isFrench }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((prev) => !prev)}
      onMouseLeave={() => setFlipped(false)}
      className="group h-32 sm:h-36 md:h-40 perspective-1000 select-none cursor-pointer"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-in-out preserve-3d will-change-transform group-hover-rotate-x-180 ${
          flipped ? 'rotate-x-180' : ''
        }`}
      >
        {/* 1. FRONT FACE (DEFAULT) */}
        <div className="absolute inset-0 w-full h-full backface-hidden border border-slate-800 bg-[#0A0D14] overflow-hidden select-none transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(0,82,255,0.18)]">
          {/* FAINT BACKGROUND WATERMARK CODE */}
          <div className="absolute inset-0 p-2 sm:p-3 font-mono text-[9px] sm:text-[10px] leading-relaxed text-slate-300 opacity-10 pointer-events-none overflow-hidden select-none">
            {tile.codeSnippet}
          </div>

          {/* FRONT CONTENT (CENTERED TITLE & BADGES) */}
          <div className="absolute inset-0 p-3 sm:p-4 flex flex-col items-center justify-center text-center gap-2 z-10 pointer-events-none">
            <h3 className="text-sm sm:text-base md:text-lg font-bold font-mono tracking-tight text-white leading-tight text-center max-w-[95%]">
              {isFrench ? tile.titleFr : tile.titleEn}
            </h3>

            {/* Badges centered under the title */}
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
              {tile.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. BACK FACE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-x-180 bg-electric border border-blue-400/40 p-3 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden">
          <p className="text-xs sm:text-sm text-white font-mono font-medium leading-relaxed max-w-[95%] select-text">
            {isFrench ? tile.descFr : tile.descEn}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TechBentoGrid: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  const tiles: BentoTile[] = [
    // PILLAR 1: FRONTEND
    {
      id: 'frontend',
      tagEn: 'React 18 // TypeScript',
      tagFr: 'React 18 // TypeScript',
      titleEn: 'Frontend Architecture',
      titleFr: 'Architecture Frontend',
      descEn: 'Modular, type-safe web applications with ultra-responsive rendering.',
      descFr: 'Applications web modulaires, typées et ultra-réactives.',
      tools: ['React 18', 'TypeScript', 'Tailwind', 'Vite'],
      codeSnippet: (
        <div className="space-y-1 whitespace-nowrap">
          <div>
            <span className="text-[#38BDF8]">export const</span>{' '}
            <span className="text-[#F59E0B]">TelemetryCanvas</span>
            <span className="text-slate-400">:</span>{' '}
            <span className="text-[#A78BFA]">React.FC&lt;Props&gt;</span>{' '}
            <span className="text-slate-400">=</span>{' '}
            <span className="text-slate-300">({'{'} endpoint, hz = </span>
            <span className="text-[#F43F5E]">60</span>
            <span className="text-slate-300"> {'}'}) =&gt; {'{'}</span>
          </div>
          <div className="pl-3">
            <span className="text-[#38BDF8]">const</span>{' '}
            <span className="text-slate-300">{'{'} stream {'}'}</span>{' '}
            <span className="text-slate-400">=</span>{' '}
            <span className="text-[#60A5FA]">useBinaryStream</span>
            <span className="text-slate-300">(endpoint);</span>
          </div>
          <div className="pl-3">
            <span className="text-[#38BDF8]">return</span>{' '}
            <span className="text-slate-300">&lt;</span>
            <span className="text-[#38BDF8]">Canvas</span>{' '}
            <span className="text-slate-300">data=</span>
            <span className="text-slate-300">{'{'}stream.data{'}'}</span>{' '}
            <span className="text-slate-300">/&gt;;</span>
          </div>
          <div><span className="text-slate-300">{'}'};</span></div>
        </div>
      ),
    },

    // PILLAR 2: UI/UX & PRODUCT DESIGN
    {
      id: 'ui-ux',
      tagEn: 'Figma // Design Systems',
      tagFr: 'Figma // Design Systems',
      titleEn: 'UI/UX & Product Design',
      titleFr: 'Design UI/UX & Produit',
      descEn: 'Interactive prototypes, user ergonomics, and WCAG design systems.',
      descFr: 'Prototypes interactifs, ergonomie et design systems conformes WCAG.',
      tools: ['Figma', 'Ergonomie', 'Design Systems', 'WCAG'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">const</span> <span className="text-[#F59E0B]">DesignTokenSystem</span> = {'{'}</div>
          <div className="pl-3">grid: <span className="text-[#34D399]">'12-col'</span>, gutter: <span className="text-[#F43F5E]">24</span>,</div>
          <div className="pl-3">contrast: <span className="text-[#34D399]">'WCAG-AAA'</span>, token: <span className="text-[#60A5FA]">--electric</span>,</div>
          <div>{'}'};</div>
        </div>
      ),
    },

    // PILLAR 3: DIGITAL MARKETING & ANALYTICS
    {
      id: 'marketing-analytics',
      tagEn: 'SEO // Growth Analytics',
      tagFr: 'SEO // Analyse de Données',
      titleEn: 'Digital Marketing & Analytics',
      titleFr: 'Marketing Digital & Analytics',
      descEn: 'Search engine optimization, Google Analytics 4, and user acquisition funnels.',
      descFr: 'Optimisation SEO/SEA, Google Analytics 4 et tunnels d\'acquisition.',
      tools: ['SEO / Core Web Vitals', 'GA4 & Funnels', 'Stratégie & CRO'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">window</span>.<span className="text-[#60A5FA]">gtag</span>(<span className="text-[#34D399]">'event'</span>, <span className="text-[#34D399]">'conversion'</span>, {'{'}</div>
          <div className="pl-3">funnel: <span className="text-[#34D399]">'corporate_intake'</span>, step: <span className="text-[#F43F5E]">3</span>,</div>
          <div className="pl-3">cro_uplift: <span className="text-[#F43F5E]">0.32</span>, organic: <span className="text-[#F43F5E]">true</span>,</div>
          <div>{'}'});</div>
        </div>
      ),
    },

    // PILLAR 4: DATA VIZ & TELEMETRY
    {
      id: 'dataviz-telemetry',
      tagEn: 'D3.js // WebSockets',
      tagFr: 'D3.js // WebSockets',
      titleEn: 'Data Visualization & Telemetry',
      titleFr: 'Visualisation de Données & Flux',
      descEn: 'High-density financial charts, real-time WebSocket feeds, and dashboards.',
      descFr: 'Graphiques haute densité, flux WebSockets temps réel et dashboards.',
      tools: ['D3.js', 'WebSockets', 'Recharts', 'Live Feeds'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">const</span> ws = <span className="text-[#38BDF8]">new</span> <span className="text-[#60A5FA]">WebSocket</span>(streamUrl);</div>
          <div className="pl-3">ws.onmessage = (e) =&gt; chart.<span className="text-[#60A5FA]">update</span>(<span className="text-[#60A5FA]">decode</span>(e.data));</div>
          <div className="pl-3"><span className="text-[#38BDF8]">const</span> scale = <span className="text-[#60A5FA]">scaleTime</span>().range([<span className="text-[#F43F5E]">0</span>, width]);</div>
        </div>
      ),
    },

    // PILLAR 5: API ARCHITECTURE & SERVICES
    {
      id: 'api-architecture',
      tagEn: 'REST // OpenAPI',
      tagFr: 'REST // OpenAPI',
      titleEn: 'API Architecture & Services',
      titleFr: 'Architecture API & Services',
      descEn: 'Typed API contracts, resilient HTTP pipelines, and database modeling.',
      descFr: 'Contrats d\'API typés, requêtes résilientes et modélisation de bases de données.',
      tools: ['REST APIs', 'OpenAPI', 'MySQL / Laravel'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">async function</span> <span className="text-[#F59E0B]">queryApi</span>&lt;<span className="text-[#A78BFA]">T</span>&gt;(url: <span className="text-[#A78BFA]">string</span>) {'{'}</div>
          <div className="pl-3"><span className="text-[#38BDF8]">const</span> res = <span className="text-[#38BDF8]">await</span> <span className="text-[#60A5FA]">fetch</span>(url);</div>
          <div className="pl-3"><span className="text-[#38BDF8]">return</span> res.json() <span className="text-[#38BDF8]">as</span> <span className="text-[#A78BFA]">Promise&lt;T&gt;</span>;</div>
          <div>{'}'}</div>
        </div>
      ),
    },

    // PILLAR 6: EMBEDDED SYSTEMS & C
    {
      id: 'embedded-c',
      tagEn: 'C99 // ARM Cortex',
      tagFr: 'C99 // ARM Cortex',
      titleEn: 'Embedded Systems & C',
      titleFr: 'Systèmes Embarqués & C',
      descEn: 'Low-level firmware, DMA registers, and SPI/UART communication protocols.',
      descFr: 'Firmware bas niveau, registres DMA et protocoles de communication SPI/UART.',
      tools: ['C99', 'ARM Cortex', 'DMA', 'SPI / UART'],
      codeSnippet: (
        <div className="space-y-1 font-mono text-[10.5px] whitespace-nowrap leading-relaxed overflow-hidden">
          <div>
            <span className="text-[#38BDF8]">void</span>{' '}
            <span className="text-[#F59E0B]">UART_Bridge_Init</span>
            <span className="text-slate-300">(</span>
            <span className="text-[#A78BFA]">USART_TypeDef</span>{' '}
            <span className="text-slate-300">*USARTx, </span>
            <span className="text-[#A78BFA]">uint32_t</span>{' '}
            <span className="text-slate-300">baudrate) {'{'}</span>
          </div>
          <div className="pl-3">
            <span className="text-slate-300">USARTx-&gt;BRR = SystemCoreClock / baudrate;</span>
          </div>
          <div className="pl-3">
            <span className="text-slate-300">USARTx-&gt;CR1 |= USART_CR1_UE | USART_CR1_TE;</span>
          </div>
          <div><span className="text-slate-300">{'}'}</span></div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2 pt-3 border-t border-slate-100">
      {/* Clean Skills Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-0.5">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-fintech-primary">
          {isFrench ? 'Compétences Techniques' : 'Technical Skills'}
        </h2>
        <span className="text-[11px] font-mono text-slate-500">
          {isFrench
            ? 'Survolez pour en savoir plus'
            : 'Hover to view details'}
        </span>
      </div>

      {/* Balanced 6-Pillar Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 select-none">
        {tiles.map((tile) => (
          <BentoTileCard key={tile.id} tile={tile} isFrench={isFrench} />
        ))}
      </div>
    </div>
  );
};

export default TechBentoGrid;
