import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface BentoTile {
  id: string;
  colSpan: string;
  titleEn: string;
  titleFr: string;
  tag: string;
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
      className={`relative ${tile.colSpan} h-40 sm:h-44 border border-slate-800/80 bg-[#0A0D14] overflow-hidden select-none rounded-none cursor-crosshair`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 1. DIM SURFACE LAYER (MINIMALIST & CLEAN) */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 pointer-events-none">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            {tile.tag}
          </span>
          <h3 className="text-sm sm:text-base font-bold font-mono tracking-tight text-slate-200">
            {isFrench ? tile.titleFr : tile.titleEn}
          </h3>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
          <span>// INSPECT</span>
          <span className="w-1.5 h-1.5 bg-slate-700 rounded-none inline-block" />
        </div>
      </div>

      {/* 2. ILLUMINATED CODE LAYER (MASKED BY MOUSE SPOTLIGHT) */}
      <div
        className="absolute inset-0 p-5 z-20 flex flex-col justify-center bg-[#070A0F] font-mono text-xs pointer-events-none transition-opacity duration-150"
        style={{
          opacity: pos.active ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 80px at ${pos.x}px ${pos.y}px, black 40px, transparent 80px)`,
          maskImage: `radial-gradient(circle 80px at ${pos.x}px ${pos.y}px, black 40px, transparent 80px)`,
        }}
      >
        <div className="text-[11px] leading-relaxed text-slate-200">
          {tile.codeSnippet}
        </div>
      </div>

      {/* 3. LIGHT CIRCLE CIRCUMFERENCE (CANDLE / SPOTLIGHT RING) */}
      {pos.active && (
        <div
          className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/70 shadow-[0_0_16px_rgba(0,82,255,0.45)] transition-opacity duration-100"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: '160px',
            height: '160px',
          }}
        />
      )}
    </div>
  );
};

export const TechBentoGrid: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const tiles: BentoTile[] = [
    {
      id: 'frontend',
      colSpan: 'md:col-span-2',
      titleEn: 'Frontend Architecture',
      titleFr: 'Architecture Frontend',
      tag: 'React 18 // Vite',
      codeSnippet: (
        <div className="space-y-1">
          <div className="text-slate-500">// Reactive telemetry canvas</div>
          <div>
            <span className="text-[#38BDF8]">export const</span>{' '}
            <span className="text-[#F59E0B]">EngineCore</span> = () =&gt; {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">const</span> {'{'} stream {'}'} = <span className="text-[#60A5FA]">useStream</span>();
          </div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">return</span> &lt;<span className="text-[#38BDF8]">Canvas</span> data={'{'}stream{'}'} /&gt;;
          </div>
          <div>{'}'};</div>
        </div>
      ),
    },
    {
      id: 'ui-ux',
      colSpan: 'md:col-span-1',
      titleEn: 'UI / UX Design Tokens',
      titleFr: 'Systèmes UI & UX',
      tag: 'Design Tokens // CSS3',
      codeSnippet: (
        <div className="space-y-1">
          <div className="text-slate-500">/* Institutional token scale */</div>
          <div>
            <span className="text-[#38BDF8]">:root</span> {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">--electric</span>: <span className="text-[#34D399]">#0052FF</span>;
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">--surface</span>: <span className="text-[#34D399]">#0B0E14</span>;
          </div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'javascript',
      colSpan: 'md:col-span-1',
      titleEn: 'TypeScript Runtime',
      titleFr: 'Runtime TypeScript',
      tag: 'Strict TS 5.7 // V8',
      codeSnippet: (
        <div className="space-y-1">
          <div className="text-slate-500">// Strict frame interface</div>
          <div>
            <span className="text-[#38BDF8]">interface</span>{' '}
            <span className="text-[#F59E0B]">Packet</span> {'{'}
          </div>
          <div className="pl-4">
            timestamp: <span className="text-[#A78BFA]">number</span>;
          </div>
          <div className="pl-4">
            latencyMs: <span className="text-[#A78BFA]">number</span>;
          </div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'hardware',
      colSpan: 'md:col-span-2',
      titleEn: 'Hardware & Embedded Bridge',
      titleFr: 'Passerelle Hardware & Embarqué',
      tag: 'CFC Electronics // STM32 C',
      codeSnippet: (
        <div className="space-y-1">
          <div className="text-slate-500">// Hardware serial telemetry</div>
          <div>
            <span className="text-[#38BDF8]">void</span>{' '}
            <span className="text-[#F59E0B]">USART_Bridge_Init</span>(<span className="text-[#A78BFA]">void</span>) {'{'}
          </div>
          <div className="pl-4">
            USART2-&gt;BRR = <span className="text-[#F43F5E]">0x0116</span>; <span className="text-slate-500">// 115.2k</span>
          </div>
          <div className="pl-4">
            USART2-&gt;CR1 |= <span className="text-[#60A5FA]">USART_CR1_UE</span>;
          </div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'semantic-html',
      colSpan: 'md:col-span-1',
      titleEn: 'Semantic DOM & A11y',
      titleFr: 'DOM Sémantique & A11y',
      tag: 'HTML5 // WCAG 2.1',
      codeSnippet: (
        <div className="space-y-1">
          <div className="text-slate-500">&lt;!-- Accessible feed --&gt;</div>
          <div>
            &lt;<span className="text-[#38BDF8]">article</span> <span className="text-slate-300">role</span>=<span className="text-[#34D399]">"feed"</span>&gt;
          </div>
          <div className="pl-4">
            &lt;<span className="text-[#38BDF8]">header</span> class=<span className="text-[#34D399]">"hud"</span> /&gt;
          </div>
          <div>&lt;/<span className="text-[#38BDF8]">article</span>&gt;</div>
        </div>
      ),
    },
    {
      id: 'network',
      colSpan: 'md:col-span-1',
      titleEn: 'Real-Time Pipeline',
      titleFr: 'Pipeline Temps Réel',
      tag: 'WebSocket // Binary Stream',
      codeSnippet: (
        <div className="space-y-1">
          <div className="text-slate-500">// Binary frame ingestion</div>
          <div>
            ws.onmessage = (<span className="text-slate-300">e</span>) =&gt; {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">const</span> data = <span className="text-[#60A5FA]">decode</span>(e.data);
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">dispatch</span>(sync(data));
          </div>
          <div>{'}'};</div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3 pt-6 border-t border-slate-100">
      {/* Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
          <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
          <span>{t('home.bento.badge')}</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {t('home.bento.hint')}
        </span>
      </div>

      {/* Bento Grid: Tight gap-2 spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 select-none">
        {tiles.map((tile) => (
          <BentoTileCard key={tile.id} tile={tile} isFrench={Boolean(isFrench)} />
        ))}
      </div>
    </div>
  );
};

export default TechBentoGrid;
