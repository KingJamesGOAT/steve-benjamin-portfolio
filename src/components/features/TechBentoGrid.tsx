import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BentoTile {
  id: string;
  colSpan: string;
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
      className={`group ${tile.colSpan} h-24 sm:h-32 md:h-38 perspective-1000 select-none cursor-pointer`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-in-out preserve-3d will-change-transform group-hover-rotate-x-180 ${
          flipped ? 'rotate-x-180' : ''
        }`}
      >
        {/* 1. FRONT FACE (DEFAULT) */}
        <div className="absolute inset-0 w-full h-full backface-hidden border border-slate-800 bg-[#0A0D14] overflow-hidden select-none transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(0,82,255,0.18)]">
          {/* FAINT BACKGROUND WATERMARK CODE */}
          <div className="absolute inset-0 p-2 sm:p-3 font-mono text-[9px] sm:text-[10.5px] leading-relaxed text-slate-300 opacity-15 pointer-events-none overflow-hidden select-none">
            {tile.codeSnippet}
          </div>

          {/* FRONT CONTENT (CENTERED TITLE & BADGES) */}
          <div className="absolute inset-0 p-2 sm:p-4 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 z-10 pointer-events-none">
            <h3 className="text-xs sm:text-sm md:text-base font-bold font-mono tracking-tight text-white leading-tight text-center max-w-[95%]">
              {isFrench ? tile.titleFr : tile.titleEn}
            </h3>

            {/* Badges centered under the title (2 on mobile, up to 3 on desktop) */}
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
              {tile.tools.slice(0, 2).map((tool) => (
                <span
                  key={tool}
                  className="px-1.5 py-0.2 sm:py-0.5 text-[8.5px] sm:text-[10px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. BACK FACE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-x-180 bg-electric border border-blue-400/40 p-2.5 sm:p-4 flex flex-col items-center justify-center text-center overflow-hidden">
          <p className="text-[11px] sm:text-xs md:text-sm text-white font-mono font-medium leading-relaxed max-w-[95%] select-text">
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
    // ROW 1: [2 COLS] [1 COL] [1 COL] = 4 COLS
    {
      id: 'frontend',
      colSpan: 'col-span-2 md:col-span-2',
      tagEn: 'React 18 // TypeScript',
      tagFr: 'React 18 // TypeScript',
      titleEn: 'Frontend Architecture',
      titleFr: 'Architecture Frontend',
      descEn: 'Modular, type-safe web apps with sub-millisecond rendering.',
      descFr: 'Apps web modulaires, typées et ultra-réactives.',
      tools: ['React 18', 'TypeScript', 'Vite', 'Tailwind'],
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
    {
      id: 'ui-ux',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'Figma // UI Systems',
      tagFr: 'Figma // Systèmes UI',
      titleEn: 'UI/UX & Prototyping',
      titleFr: 'Design UI/UX & Prototypes',
      descEn: 'Interactive Figma prototypes and ergonomic user flows.',
      descFr: 'Prototypes Figma interactifs et parcours utilisateurs fluides.',
      tools: ['Figma', 'Wireframes', 'UX Testing'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">const</span> <span className="text-[#F59E0B]">LayoutSpec</span> = {'{'}</div>
          <div className="pl-3">grid: <span className="text-[#34D399]">'12-col'</span>, gutter: <span className="text-[#F43F5E]">24</span>,</div>
          <div className="pl-3">breakpoint: <span className="text-[#34D399]">'1280px'</span>,</div>
          <div>{'}'};</div>
        </div>
      ),
    },
    {
      id: 'design-tokens',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'CSS3 // Variables',
      tagFr: 'CSS3 // Variables',
      titleEn: 'Design Systems & Tokens',
      titleFr: 'Design Systems & Tokens',
      descEn: 'Scalable design tokens and WCAG-compliant UI systems.',
      descFr: 'Design tokens scalables et systèmes UI conformes WCAG.',
      tools: ['Tailwind CSS', 'CSS Variables', 'WCAG 2.1'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">:root</span> {'{'}</div>
          <div className="pl-3"><span className="text-[#60A5FA]">--electric</span>: <span className="text-[#34D399]">#0052FF</span>;</div>
          <div className="pl-3"><span className="text-[#60A5FA]">--bg-dark</span>: <span className="text-[#34D399]">#0A0D14</span>;</div>
          <div>{'}'}</div>
        </div>
      ),
    },

    // ROW 2: [1 COL] [2 COLS] [1 COL] = 4 COLS
    {
      id: 'state-machine',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'Zustand // State Flow',
      tagFr: 'Zustand // Flux d\'État',
      titleEn: 'Reactive State Machine',
      titleFr: 'Machine à États Réactive',
      descEn: 'Predictable atomic state stores with zero re-render lag.',
      descFr: 'Stores atomiques prédictibles sans re-rendus superflus.',
      tools: ['Zustand', 'Context API', 'State Machine'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">const</span> useStore = <span className="text-[#60A5FA]">create</span>((set) =&gt; ({'{'}</div>
          <div className="pl-3">tick: <span className="text-[#F43F5E]">0</span>,</div>
          <div className="pl-3">sync: (v) =&gt; <span className="text-[#60A5FA]">set</span>({'{'} tick: v {'}'}),</div>
          <div>{'}'}));</div>
        </div>
      ),
    },
    {
      id: 'embedded-c',
      colSpan: 'col-span-2 md:col-span-2',
      tagEn: 'C99 // ARM Cortex',
      tagFr: 'C99 // ARM Cortex',
      titleEn: 'Embedded Hardware & C',
      titleFr: 'Systèmes Embarqués & C',
      descEn: 'Low-level firmware, DMA registers, and SPI/UART protocols.',
      descFr: 'Firmware bas niveau, registres DMA et protocoles SPI/UART.',
      tools: ['C99', 'ARM Cortex', 'DMA', 'SPI / UART'],
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] whitespace-nowrap leading-relaxed overflow-hidden">
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
    {
      id: 'websockets',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'WS // Binary Stream',
      tagFr: 'WS // Flux Binaire',
      titleEn: 'Real-Time WebSockets',
      titleFr: 'WebSockets Temps Réel',
      descEn: 'Full-duplex live telemetry and low-latency binary streams.',
      descFr: 'Télémétrie temps réel et flux binaires à faible latence.',
      tools: ['WebSockets', 'ArrayBuffer', 'TCP Streaming'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div>ws.onmessage = (<span className="text-slate-300">e</span>) =&gt; {'{'}</div>
          <div className="pl-3"><span className="text-[#38BDF8]">const</span> buf = <span className="text-[#60A5FA]">decode</span>(e.data);</div>
          <div className="pl-3"><span className="text-[#60A5FA]">dispatch</span>(sync(buf));</div>
          <div>{'}'};</div>
        </div>
      ),
    },

    // ROW 3: [1 COL] [1 COL] [1 COL] [1 COL] = 4 COLS
    {
      id: 'dataviz',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'D3.js // SVG & Canvas',
      tagFr: 'D3.js // SVG & Canvas',
      titleEn: 'Data Visualization',
      titleFr: 'Visualisation de Données',
      descEn: 'Interactive, high-density charts and real-time dashboards.',
      descFr: 'Graphiques interactifs haute densité et dashboards temps réel.',
      tools: ['D3.js', 'Recharts', 'SVG / Canvas'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">const</span> x = <span className="text-[#60A5FA]">scaleTime</span>().domain([t0, t1]);</div>
          <div className="pl-3"><span className="text-[#38BDF8]">const</span> y = <span className="text-[#60A5FA]">scaleLinear</span>().domain([min, max]);</div>
          <div><span className="text-[#38BDF8]">return</span> line().x(d =&gt; x(d.t));</div>
        </div>
      ),
    },
    {
      id: 'api-architecture',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'REST // OpenAPI',
      tagFr: 'REST // OpenAPI',
      titleEn: 'API Architecture & REST',
      titleFr: 'Architecture API & REST',
      descEn: 'Typed API contracts, resilient HTTP pipelines, and caching.',
      descFr: 'Contrats d\'API typés, requêtes résilientes et mise en cache.',
      tools: ['REST APIs', 'OpenAPI', 'Fetch API'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">async function</span> <span className="text-[#F59E0B]">queryApi</span>&lt;<span className="text-[#A78BFA]">T</span>&gt;(url: <span className="text-[#A78BFA]">string</span>) {'{'}</div>
          <div className="pl-3"><span className="text-[#38BDF8]">const</span> res = <span className="text-[#38BDF8]">await</span> <span className="text-[#60A5FA]">fetch</span>(url);</div>
          <div className="pl-3"><span className="text-[#38BDF8]">return</span> res.json() <span className="text-[#38BDF8]">as</span> <span className="text-[#A78BFA]">Promise&lt;T&gt;</span>;</div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'build-perf',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'Vite // Rollup Core',
      tagFr: 'Vite // Moteur Rollup',
      titleEn: 'Build & Performance',
      titleFr: 'Compilation & Performance',
      descEn: 'Fast Vite bundling, tree-shaking, and optimized asset delivery.',
      descFr: 'Bundling Vite rapide, tree-shaking et distribution optimisée.',
      tools: ['Vite', 'Rollup', 'Code Splitting'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">export default</span> <span className="text-[#60A5FA]">defineConfig</span>({'{'}</div>
          <div className="pl-3">build: {'{'} target: <span className="text-[#34D399]">'esnext'</span> {'}'},</div>
          <div className="pl-3">plugins: [<span className="text-[#60A5FA]">react</span>()],</div>
          <div>{'}'});</div>
        </div>
      ),
    },
    {
      id: 'agile-management',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      tagEn: 'Agile // Project Delivery',
      tagFr: 'Agile // Gestion de Projet',
      titleEn: 'Project Integration & Agile',
      titleFr: 'Gestion de Projet & Agile',
      descEn: 'Sprint leadership, technical roadmapping, and delivery.',
      descFr: 'Pilotage de sprints, roadmaps techniques et livraison.',
      tools: ['Agile / Scrum', 'Git Flow', 'Roadmapping'],
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">interface</span> <span className="text-[#F59E0B]">SprintRelease</span> {'{'}</div>
          <div className="pl-3">milestone: <span className="text-[#34D399]">'v1.0.0'</span>,</div>
          <div className="pl-3">qaCheck: <span className="text-[#F43F5E]">true</span>,</div>
          <div>{'}'}</div>
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

      {/* Asymmetric 10-Tile Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 select-none">
        {tiles.map((tile) => (
          <BentoTileCard key={tile.id} tile={tile} isFrench={isFrench} />
        ))}
      </div>
    </div>
  );
};

export default TechBentoGrid;
