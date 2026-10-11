import React, { useState } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface XRaySliderProps {
  className?: string;
}

export const XRaySlider: React.FC<XRaySliderProps> = ({ className = '' }) => {
  const [pos, setPos] = useState<number>(50);

  return (
    <div
      className={`relative w-full h-[380px] sm:h-[400px] border border-slate-800 bg-[#0B0E14] select-none overflow-hidden shadow-2xl rounded-none ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* NATIVE ACCESSIBLE RANGE INPUT (Z-30 OVERLAY) */}
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Hardware to Software X-Ray Slider"
        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-ew-resize m-0 p-0"
      />

      {/* SOFTWARE LAYER (BOTTOM / AFTER) */}
      <div className="absolute inset-0 z-10 bg-[#0B0E14] p-5 font-mono flex flex-col justify-between overflow-hidden text-xs">
        {/* Software Layer Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#0052FF] rounded-none inline-block" />
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
              src/core/MediaEngineer.ts
            </span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-blue-950/60 text-blue-400 border border-blue-500/30 rounded-none">
            [ SW_LAYER: REACT_TS_ARCH ]
          </span>
        </div>

        {/* Code Block */}
        <div className="space-y-1.5 text-[11px] leading-relaxed my-auto py-2">
          <div className="text-slate-500 font-mono">// Full-Stack Systems & Media Engineering</div>
          <div>
            <span className="text-[#38BDF8]">interface</span>{' '}
            <span className="text-[#F59E0B]">MediaEngineer</span>{' '}
            <span className="text-slate-400">{'{'}</span>
          </div>
          <div className="pl-4">
            <span className="text-slate-300">stack</span>:{' '}
            <span className="text-[#34D399]">'React'</span> |{' '}
            <span className="text-[#34D399]">'TypeScript'</span> |{' '}
            <span className="text-[#34D399]">'Vite'</span>;
          </div>
          <div className="pl-4">
            <span className="text-slate-300">paradigm</span>:{' '}
            <span className="text-[#A78BFA]">'Systems Architecture'</span>;
          </div>
          <div className="pl-4">
            <span className="text-slate-300">runtime</span>: {'{'}
          </div>
          <div className="pl-8">
            <span className="text-slate-400">engine</span>:{' '}
            <span className="text-[#34D399]">'V8 / Node.js'</span>;
          </div>
          <div className="pl-8">
            <span className="text-slate-400">telemetry</span>:{' '}
            <span className="text-[#38BDF8]">WebSocket</span>;
          </div>
          <div className="pl-8">
            <span className="text-slate-400">latencyMs</span>:{' '}
            <span className="text-[#F43F5E]">&lt; 15</span>;
          </div>
          <div className="pl-4">{'}'};</div>
          <div className="pl-4">
            <span className="text-[#38BDF8]">compile</span>:{' '}
            (hw: <span className="text-[#F59E0B]">ElectronicsCFC</span>) =&gt;{' '}
            <span className="text-[#38BDF8]">FullStackArchitect</span>;
          </div>
          <div className="text-slate-400">{'}'}</div>
        </div>

        {/* Software Layer Footer Status Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none inline-block" />
            <span>0 ERRORS // TYPE-CHECK: PASS</span>
          </span>
          <span>UTF-8 // TS 5.7 // V8_CORE</span>
        </div>
      </div>

      {/* HARDWARE LAYER (TOP / BEFORE) - DYNAMICALLY CROPPED VIA INSET */}
      <div
        className="absolute inset-0 z-20 bg-slate-900 p-5 font-mono flex flex-col justify-between overflow-hidden text-xs border-r border-amber-500/40"
        style={{ clipPath: `inset(0 calc(100% - ${pos}%) 0 0)` }}
      >
        {/* PCB Background Circuit Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(#b45309 1px, transparent 1px),
              linear-gradient(to right, rgba(180, 83, 9, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(180, 83, 9, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 40px 40px, 40px 40px',
          }}
        />

        {/* Hardware Layer Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-2.5">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-amber-950/70 text-amber-400 border border-amber-500/40 rounded-none">
            [ HW_LAYER: ELECTRONICS_CFC ]
          </span>
          <span className="text-[11px] text-amber-400/80 uppercase tracking-wider font-mono">
            [ SCHEMATIC: REV_3.2 ]
          </span>
        </div>

        {/* PCB IC Schematic & Pinout */}
        <div className="relative z-10 my-auto py-2">
          <div className="border border-amber-500/40 bg-slate-950/90 p-3 rounded-none shadow-lg max-w-sm">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5 mb-2">
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                IC_01: STM32F4 // ARM CORTEX-M4
              </span>
              <span className="text-[9px] text-amber-500/70 font-mono">3.3V CMOS</span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-300 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P1:</span>
                <span>VDD (+3.3V)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P8:</span>
                <span>SPI_SCK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P2:</span>
                <span>VSS (GND)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P9:</span>
                <span>SPI_MOSI</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P3:</span>
                <span>OSC_IN (16M)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P10:</span>
                <span>UART_TX</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P4:</span>
                <span>NRST (RST)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-500/70">P11:</span>
                <span>UART_RX</span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-amber-500/20 flex items-center justify-between text-[9px] text-amber-400/80 font-mono">
              <span>TEST_BUS: I2C_400k // ADC: 12b</span>
              <span>R_PULLUP: 10k</span>
            </div>
          </div>
        </div>

        {/* Hardware Layer Footer Status Bar */}
        <div className="relative z-10 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] text-amber-400/80 font-mono">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-none inline-block" />
            <span>OSCILLOSCOPE: 100MHz // LOCKED</span>
          </span>
          <span>HARDWARE CFC // CPNV 2021</span>
        </div>
      </div>

      {/* SLIDER DIVIDER LINE & THUMB HANDLE */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none z-25 -ml-[1px]"
        style={{ left: `${pos}%` }}
      >
        {/* 2px Electric Blue Divider Line */}
        <div className="w-[2px] h-full bg-[#0052FF]" />

        {/* Rectangular Thumb */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-10 bg-[#0052FF] border border-blue-400 text-white flex items-center justify-center rounded-none shadow-[0_0_14px_rgba(0,82,255,0.7)]">
          <ChevronsLeftRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default XRaySlider;
