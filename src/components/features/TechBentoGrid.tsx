import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BentoTile {
  id: string;
  colSpan: string;
  titleEn: string;
  titleFr: string;
  tagEn: string;
  tagFr: string;
  signature: string;
  codeSnippet: React.ReactNode;
}

const BentoTileCard: React.FC<{ tile: BentoTile; isFrench: boolean }> = ({ tile, isFrench }) => {
  const [pos, setPos] = useState<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        active: true,
      });
    }
  };

  const handleLeave = () => {
    setPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleLeave}
      onTouchEnd={handleLeave}
      className={`relative ${tile.colSpan} h-36 sm:h-40 border border-slate-800/80 bg-[#0A0D14] overflow-hidden select-none rounded-none cursor-default`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 1. SURFACE LAYER (CENTERED & PROMINENT) */}
      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col items-center justify-center text-center z-10 pointer-events-none space-y-1 sm:space-y-1.5">
        <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-slate-400">
          {isFrench ? tile.tagFr : tile.tagEn}
        </span>
        <h3 className="text-sm sm:text-base md:text-lg font-bold font-mono tracking-tight text-slate-100">
          {isFrench ? tile.titleFr : tile.titleEn}
        </h3>
      </div>

      {/* 2. ILLUMINATED CODE LAYER (MASKED BY 152PX SPOTLIGHT: 10% SMALLER, NO PLUS) */}
      <div
        className="absolute inset-0 p-3.5 sm:p-4 z-20 flex flex-col justify-center bg-[#070A0F] font-mono text-xs pointer-events-none transition-opacity duration-150"
        style={{
          opacity: pos.active ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 76px at ${pos.x}px ${pos.y}px, black 66px, transparent 76px)`,
          maskImage: `radial-gradient(circle 76px at ${pos.x}px ${pos.y}px, black 66px, transparent 76px)`,
        }}
      >
        <div className="text-[11px] leading-snug text-slate-200">
          {tile.codeSnippet}
        </div>
      </div>

      {/* 3. LIGHT CIRCLE CIRCUMFERENCE (152PX DIAMETER: 10% SMALLER) */}
      {pos.active && (
        <div
          className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/80 shadow-[0_0_15px_rgba(0,82,255,0.45)] transition-opacity duration-100"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: '152px',
            height: '152px',
          }}
        />
      )}
    </div>
  );
};

export const TechBentoGrid: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = Boolean(i18n.language?.startsWith('fr'));

  // 10 Curated Bento Topics with Asymmetric Column Spans
  const tiles: BentoTile[] = [
    // ROW 1: [2 COLS] [1 COL] [1 COL] = 4 COLS
    {
      id: 'frontend',
      colSpan: 'col-span-1 sm:col-span-2 md:col-span-2',
      titleEn: 'Frontend Architecture',
      titleFr: 'Architecture Frontend',
      tagEn: 'React 18 // Vite Engine',
      tagFr: 'React 18 // Moteur Vite',
      signature: '// 60 FPS REACTIVE',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] whitespace-nowrap leading-relaxed overflow-hidden">
          <div>
            <span className="text-[#38BDF8]">export const</span>{' '}
            <span className="text-[#F59E0B]">TelemetryCanvas</span>
            <span className="text-slate-400">:</span>{' '}
            <span className="text-[#A78BFA]">React.FC&lt;StreamProps&gt;</span>{' '}
            <span className="text-slate-400">=</span>{' '}
            <span className="text-slate-300">({'{'} endpoint, hz = </span>
            <span className="text-[#F43F5E]">60</span>
            <span className="text-slate-300"> {'}'}) =&gt; {'{'}</span>
          </div>
          <div className="pl-3">
            <span className="text-[#38BDF8]">const</span>{' '}
            <span className="text-slate-300">{'{'} stream, ping {'}'}</span>{' '}
            <span className="text-slate-400">=</span>{' '}
            <span className="text-[#60A5FA]">useBinaryStream</span>
            <span className="text-slate-300">&lt;</span>
            <span className="text-[#A78BFA]">MarketFeed</span>
            <span className="text-slate-300">&gt;(endpoint, {'{'} autoSync: </span>
            <span className="text-[#F43F5E]">true</span>
            <span className="text-slate-300"> {'}'});</span>
          </div>
          <div className="pl-3">
            <span className="text-[#38BDF8]">return</span>{' '}
            <span className="text-slate-300">&lt;</span>
            <span className="text-[#38BDF8]">RenderEngine</span>{' '}
            <span className="text-slate-300">buffer=</span>
            <span className="text-slate-300">{'{'}stream.data{'}'}</span>{' '}
            <span className="text-slate-300">fps=</span>
            <span className="text-slate-300">{'{'}hz{'}'}</span>{' '}
            <span className="text-slate-300">latency=</span>
            <span className="text-slate-300">{'{'}ping{'}'}</span>{' '}
            <span className="text-slate-300">/&gt;;</span>
          </div>
          <div>
            <span className="text-slate-300">{'}'};</span>
          </div>
        </div>
      ),
    },
    {
      id: 'typescript',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'TypeScript Runtime',
      titleFr: 'Runtime TypeScript',
      tagEn: 'Strict TS 5.7 // V8',
      tagFr: 'TS 5.7 Strict // V8',
      signature: '// 0 ANY',
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">interface</span> <span className="text-[#F59E0B]">Packet</span> {'{'}</div>
          <div className="pl-3">seq: <span className="text-[#A78BFA]">number</span>;</div>
          <div className="pl-3">payload: <span className="text-[#A78BFA]">ArrayBuffer</span>;</div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'ui-tokens',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'UI Design Tokens',
      titleFr: 'Tokens Design UI',
      tagEn: 'CSS3 // Variables',
      tagFr: 'CSS3 // Variables',
      signature: '// DESIGN_SYS',
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
      titleEn: 'State Machine',
      titleFr: 'Machine à États',
      tagEn: 'Zustand // Reactive',
      tagFr: 'Zustand // Réactif',
      signature: '// STORE_READY',
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
      id: 'hardware',
      colSpan: 'col-span-1 sm:col-span-2 md:col-span-2',
      titleEn: 'Hardware Bridge',
      titleFr: 'Passerelle Hardware',
      tagEn: 'CFC Electronics // C99',
      tagFr: 'CFC Électronique // C99',
      signature: '// 115.2 KBPS DMA',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] whitespace-nowrap leading-relaxed overflow-hidden">
          <div>
            <span className="text-[#38BDF8]">void</span>{' '}
            <span className="text-[#F59E0B]">UART_Bridge_Init</span>
            <span className="text-slate-300">(</span>
            <span className="text-[#A78BFA]">USART_TypeDef</span>{' '}
            <span className="text-slate-300">*USARTx, </span>
            <span className="text-[#A78BFA]">uint32_t</span>{' '}
            <span className="text-slate-300">baudrate, </span>
            <span className="text-[#A78BFA]">uint8_t</span>{' '}
            <span className="text-slate-300">dma_channel) {'{'}</span>
          </div>
          <div className="pl-3">
            <span className="text-slate-300">USARTx-&gt;BRR = </span>
            <span className="text-[#60A5FA]">SystemCoreClock</span>
            <span className="text-slate-300"> / baudrate; </span>
            <span className="text-slate-500">// Configure hardware baudrate divider</span>
          </div>
          <div className="pl-3">
            <span className="text-slate-300">USARTx-&gt;CR1 |= </span>
            <span className="text-[#60A5FA]">USART_CR1_UE</span>
            <span className="text-slate-300"> | </span>
            <span className="text-[#60A5FA]">USART_CR1_TE</span>
            <span className="text-slate-300"> | </span>
            <span className="text-[#60A5FA]">USART_CR1_RE</span>
            <span className="text-slate-300">; </span>
            <span className="text-slate-500">// Enable TX/RX transceiver circuits</span>
          </div>
          <div>
            <span className="text-slate-300">{'}'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'websockets',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'Real-Time WebSockets',
      titleFr: 'WebSockets Temps Réel',
      tagEn: 'WS // Binary Stream',
      tagFr: 'WS // Flux Binaire',
      signature: '// &lt; 15MS',
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
      id: 'semantic-dom',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'Semantic Web & A11y',
      titleFr: 'DOM Sémantique & A11y',
      tagEn: 'HTML5 // WCAG 2.1',
      tagFr: 'HTML5 // WCAG 2.1',
      signature: '// WCAG_AAA',
      codeSnippet: (
        <div className="space-y-0.5">
          <div>&lt;<span className="text-[#38BDF8]">article</span> <span className="text-slate-300">role</span>=<span className="text-[#34D399]">"feed"</span>&gt;</div>
          <div className="pl-3">&lt;<span className="text-[#38BDF8]">header</span> class=<span className="text-[#34D399]">"hud"</span> /&gt;</div>
          <div className="pl-3">&lt;<span className="text-[#38BDF8]">main</span> aria-live=<span className="text-[#34D399]">"polite"</span> /&gt;</div>
          <div>&lt;/<span className="text-[#38BDF8]">article</span>&gt;</div>
        </div>
      ),
    },
    {
      id: 'api-architecture',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'REST & API Engine',
      titleFr: 'Moteur API & REST',
      tagEn: 'HTTP/2 // OpenAPI',
      tagFr: 'HTTP/2 // OpenAPI',
      signature: '// TYPE_FETCH',
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
      id: 'spi-bus',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'Microcontroller Bus',
      titleFr: 'Bus Microcontrôleur',
      tagEn: 'ARM Cortex // SPI',
      tagFr: 'ARM Cortex // SPI',
      signature: '// DMA_LINKED',
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">uint8_t</span> <span className="text-[#F59E0B]">SPI_TxRx</span>(<span className="text-[#A78BFA]">uint8_t</span> b) {'{'}</div>
          <div className="pl-3">SPI1-&gt;DR = b;</div>
          <div className="pl-3"><span className="text-[#38BDF8]">while</span> (!(SPI1-&gt;SR &amp; SPI_SR_RXNE));</div>
          <div className="pl-3"><span className="text-[#38BDF8]">return</span> SPI1-&gt;DR;</div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'build-perf',
      colSpan: 'col-span-1 sm:col-span-1 md:col-span-1',
      titleEn: 'Build & Performance',
      titleFr: 'Compilation & Performance',
      tagEn: 'Vite // Rollup Core',
      tagFr: 'Vite // Moteur Rollup',
      signature: '// CHUNKS_OPT',
      codeSnippet: (
        <div className="space-y-0.5">
          <div><span className="text-[#38BDF8]">export default</span> <span className="text-[#60A5FA]">defineConfig</span>({'{'}</div>
          <div className="pl-3">build: {'{'} target: <span className="text-[#34D399]">'esnext'</span> {'}'},</div>
          <div className="pl-3">plugins: [<span className="text-[#60A5FA]">react</span>()],</div>
          <div>{'}'});</div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3 pt-6 border-t border-slate-100">
      {/* Clean Skills Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 pb-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-fintech-primary">
          {isFrench ? 'Compétences' : 'Skills'}
        </h2>
        <span className="text-xs font-mono text-slate-500">
          {isFrench ? 'Survolez pour inspecter le code' : 'Hover to inspect code'}
        </span>
      </div>

      {/* Asymmetric 10-Tile Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 select-none">
        {tiles.map((tile) => (
          <BentoTileCard key={tile.id} tile={tile} isFrench={isFrench} />
        ))}
      </div>
    </div>
  );
};

export default TechBentoGrid;
