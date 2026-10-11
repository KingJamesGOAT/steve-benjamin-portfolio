import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layers, Palette, Terminal, Cpu, FileCode, Radio, Code2, CheckCircle2 } from 'lucide-react';

interface BentoTile {
  id: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  colSpan: string;
  titleEn: string;
  titleFr: string;
  descEn: string;
  descFr: string;
  fileBreadcrumb: string;
  statusText: string;
  codeSnippet: React.ReactNode;
}

export const TechBentoGrid: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');
  const [activeTile, setActiveTile] = useState<string | null>(null);

  const tiles: BentoTile[] = [
    {
      id: 'frontend',
      badge: 'REACT 18 // VITE',
      icon: Layers,
      colSpan: 'md:col-span-2',
      titleEn: 'Frontend Architecture',
      titleFr: 'Architecture Frontend',
      descEn: 'Component composition, reactive state machines, and micro-frontend design patterns.',
      descFr: 'Composition de composants, machines à états réactives et patrons de micro-frontend.',
      fileBreadcrumb: 'src/core/EngineCanvas.tsx',
      statusText: 'COMPILE: PASS // 60 FPS',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div className="text-slate-500">// Reactive telemetry canvas engine</div>
          <div>
            <span className="text-[#38BDF8]">export const</span>{' '}
            <span className="text-[#F59E0B]">EngineCore</span>: <span className="text-[#A78BFA]">React.FC</span> = () =&gt; {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">const</span> {'{'} <span className="text-slate-200">stream</span> {'}'} ={' '}
            <span className="text-[#60A5FA]">useTelemetryStream</span>();
          </div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">return</span> &lt;<span className="text-[#38BDF8]">Canvas</span>{' '}
            <span className="text-slate-300">data</span>={'{'}<span className="text-slate-200">stream</span>{'}'}{' '}
            <span className="text-slate-300">fps</span>={<span className="text-[#F43F5E]">60</span>} /&gt;;
          </div>
          <div>{'}'};</div>
        </div>
      ),
    },
    {
      id: 'ui-ux',
      badge: 'TAILWIND // CSS3',
      icon: Palette,
      colSpan: 'md:col-span-1',
      titleEn: 'UI / UX Design Tokens',
      titleFr: 'Systèmes UI & UX',
      descEn: 'Design systems, glassmorphism, precise typography, and accessibility.',
      descFr: 'Systèmes de design, glassmorphisme, typographie rigoureuse et accessibilité.',
      fileBreadcrumb: 'src/tokens/fintech.css',
      statusText: 'TOKENS: SYNCED // WCAG AAA',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div className="text-slate-500">/* Institutional token scale */</div>
          <div>
            <span className="text-[#38BDF8]">:root</span> {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">--electric</span>: <span className="text-[#34D399]">#0052FF</span>;
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">--surface-dark</span>: <span className="text-[#34D399]">#0B0E14</span>;
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">--radius-sharp</span>: <span className="text-[#F43F5E]">0px</span>;
          </div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'javascript',
      badge: 'TS 5.7 // V8',
      icon: Terminal,
      colSpan: 'md:col-span-1',
      titleEn: 'TypeScript & JavaScript',
      titleFr: 'TypeScript & JavaScript',
      descEn: 'Strict typing, AST parsing, high-throughput asynchronous execution.',
      descFr: 'Typage strict, analyse AST et exécution asynchrone haute performance.',
      fileBreadcrumb: 'src/types/telemetry.ts',
      statusText: 'STRICT: TRUE // 0 ANY',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div className="text-slate-500">// Strict binary frame contract</div>
          <div>
            <span className="text-[#38BDF8]">interface</span>{' '}
            <span className="text-[#F59E0B]">TelemetryPacket</span> {'{'}
          </div>
          <div className="pl-4">
            <span className="text-slate-300">timestamp</span>: <span className="text-[#A78BFA]">number</span>;
          </div>
          <div className="pl-4">
            <span className="text-slate-300">latencyMs</span>: <span className="text-[#A78BFA]">number</span>;
          </div>
          <div className="pl-4">
            <span className="text-slate-300">checksum</span>: <span className="text-[#A78BFA]">string</span>;
          </div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'hardware',
      badge: 'CFC ELECTRONICS',
      icon: Cpu,
      colSpan: 'md:col-span-2',
      titleEn: 'Hardware & Embedded Bridge',
      titleFr: 'Passerelle Hardware & Embarqué',
      descEn: 'Bridging low-level C microcontroller firmware with modern web sockets.',
      descFr: 'Liaison entre microcontrôleurs en C bas niveau et websockets applicatifs.',
      fileBreadcrumb: 'firmware/stm32/usart_bridge.c',
      statusText: 'BAUD: 115200 // DMA_ACTIVE',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div className="text-slate-500">// Low-latency hardware serial stream</div>
          <div>
            <span className="text-[#38BDF8]">void</span>{' '}
            <span className="text-[#F59E0B]">USART_Bridge_Init</span>(<span className="text-[#A78BFA]">void</span>) {'{'}
          </div>
          <div className="pl-4">
            <span className="text-slate-200">USART2-&gt;BRR</span> = <span className="text-[#F43F5E]">0x0116</span>; <span className="text-slate-500">// 115.2k</span>
          </div>
          <div className="pl-4">
            <span className="text-slate-200">USART2-&gt;CR1</span> |= <span className="text-[#60A5FA]">USART_CR1_UE</span> | <span className="text-[#60A5FA]">USART_CR1_TE</span>;
          </div>
          <div className="pl-4">
            <span className="text-slate-200">DMA1_Stream6-&gt;CR</span> |= <span className="text-[#60A5FA]">DMA_SxCR_EN</span>;
          </div>
          <div>{'}'}</div>
        </div>
      ),
    },
    {
      id: 'semantic-html',
      badge: 'HTML5 // A11Y',
      icon: FileCode,
      colSpan: 'md:col-span-1',
      titleEn: 'Semantic Web & DOM',
      titleFr: 'Web Sémantique & DOM',
      descEn: 'Accessible DOM architecture, screen-reader parity, and zero layout shift.',
      descFr: 'Architecture DOM accessible, compatibilité lecteur d’écran et CLS nul.',
      fileBreadcrumb: 'src/views/feed.html',
      statusText: 'ARIA: VALIDATED // WCAG 2.1',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div className="text-slate-500">&lt;!-- Accessible institutional feed --&gt;</div>
          <div>
            &lt;<span className="text-[#38BDF8]">article</span> <span className="text-slate-300">role</span>=<span className="text-[#34D399]">"feed"</span>{' '}
            <span className="text-slate-300">aria-live</span>=<span className="text-[#34D399]">"polite"</span>&gt;
          </div>
          <div className="pl-4">
            &lt;<span className="text-[#38BDF8]">header</span> <span className="text-slate-300">class</span>=<span className="text-[#34D399]">"hud-header"</span> /&gt;
          </div>
          <div className="pl-4">
            &lt;<span className="text-[#38BDF8]">main</span> <span className="text-slate-300">id</span>=<span className="text-[#34D399]">"telemetry-stream"</span> /&gt;
          </div>
          <div>&lt;/<span className="text-[#38BDF8]">article</span>&gt;</div>
        </div>
      ),
    },
    {
      id: 'network',
      badge: 'WS // IPC',
      icon: Radio,
      colSpan: 'md:col-span-1',
      titleEn: 'Real-Time Pipeline',
      titleFr: 'Pipeline Temps Réel',
      descEn: 'Sub-15ms WebSocket pipeline, binary buffering, and telemetry synchronization.',
      descFr: 'Pipeline WebSocket sous 15ms, tampons binaires et synchronisation télémétrique.',
      fileBreadcrumb: 'src/services/socketClient.ts',
      statusText: 'LATENCY: 12ms // WEBSOCKET_OPEN',
      codeSnippet: (
        <div className="space-y-1 font-mono text-[11px] leading-relaxed">
          <div className="text-slate-500">// Low-latency real-time ingestion</div>
          <div>
            <span className="text-slate-200">ws.onmessage</span> = (<span className="text-slate-300">e</span>: <span className="text-[#A78BFA]">MessageEvent</span>) =&gt; {'{'}
          </div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">const</span> <span className="text-slate-200">frame</span> = <span className="text-[#60A5FA]">decodeBuffer</span>(<span className="text-slate-300">e.data</span>);
          </div>
          <div className="pl-4">
            <span className="text-[#60A5FA]">dispatch</span>(<span className="text-[#F59E0B]">syncHardwareState</span>(<span className="text-slate-200">frame</span>));
          </div>
          <div>{'}'};</div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 pt-6 border-t border-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-electric">
            <span className="w-1.5 h-1.5 bg-electric rounded-none inline-block" />
            <span>{t('home.bento.badge')}</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            {t('home.bento.hint')}
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          {t('home.bento.tag')}
        </span>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 select-none">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const isHovered = activeTile === tile.id;

          return (
            <div
              key={tile.id}
              onMouseEnter={() => setActiveTile(tile.id)}
              onMouseLeave={() => setActiveTile(null)}
              onClick={() => setActiveTile(activeTile === tile.id ? null : tile.id)}
              className={`relative ${tile.colSpan} min-h-[175px] sm:min-h-[190px] border transition-all duration-300 rounded-none cursor-pointer p-4 sm:p-5 flex flex-col justify-between overflow-hidden ${
                isHovered
                  ? 'border-blue-500 bg-[#0B0E14] shadow-[0_0_24px_rgba(0,82,255,0.18)]'
                  : 'border-slate-800 bg-[#0E121A] hover:border-slate-700'
              }`}
            >
              {/* Background ambient grid pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* DEFAULT SURFACE VIEW */}
              <div
                className={`relative z-10 flex flex-col justify-between h-full transition-opacity duration-200 ${
                  isHovered ? 'opacity-0 pointer-events-none hidden' : 'opacity-100 flex'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-slate-800/80 text-slate-300 border border-slate-700/80 rounded-none">
                      {tile.badge}
                    </span>
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white">
                    {isFrench ? tile.titleFr : tile.titleEn}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                    {isFrench ? tile.descFr : tile.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center space-x-1.5 text-blue-400">
                    <Code2 className="w-3 h-3 text-blue-400" />
                    <span className="uppercase tracking-wider">{t('home.bento.peekAction')}</span>
                  </span>
                  <span className="text-slate-600">// X-RAY</span>
                </div>
              </div>

              {/* X-RAY CODE VIEW (ACTIVATES ON HOVER / TOUCH) */}
              <div
                className={`relative z-10 flex flex-col justify-between h-full transition-opacity duration-200 ${
                  isHovered ? 'opacity-100 flex' : 'opacity-0 pointer-events-none hidden'
                }`}
              >
                {/* File Header */}
                <div className="flex items-center justify-between border-b border-slate-800/90 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#0052FF] rounded-none inline-block animate-pulse" />
                    <span className="text-[11px] font-mono text-slate-300">
                      {tile.fileBreadcrumb}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400 border border-blue-500/30 px-1.5 py-0.5 bg-blue-950/60 rounded-none">
                    INSPECTING
                  </span>
                </div>

                {/* Monospace Code Block */}
                <div className="my-auto py-2">
                  {tile.codeSnippet}
                </div>

                {/* Status Bar */}
                <div className="pt-2 border-t border-slate-800/90 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center space-x-1 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{tile.statusText}</span>
                  </span>
                  <span className="text-slate-500">ESC / LEAVE</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechBentoGrid;
