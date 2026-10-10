import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal, Play, Pause, RefreshCw, Shield } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SIGNAL' | 'EXEC' | 'RISK';
  message: string;
}

export const CryptoDashboardSim: React.FC = () => {
  const { t } = useTranslation();

  // Simulation states
  const [btcPrice, setBtcPrice] = useState<number>(68420.50);
  const [priceChange, setPriceChange] = useState<number>(2.84);
  const [priceDelta, setPriceDelta] = useState<'UP' | 'DOWN' | 'FLAT'>('FLAT');
  const [isBotActive, setIsBotActive] = useState<boolean>(true);
  const [simMode, setSimMode] = useState<'PAPER' | 'LIVE'>('PAPER');
  const [rsi, setRsi] = useState<number>(31.4);
  const [adx, setAdx] = useState<number>(18.6);
  const [regime, setRegime] = useState<'RANGING' | 'TRENDING'>('RANGING');

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '10:48:02',
      level: 'INFO',
      message: 'System Boot: Dual-Regime Strategy Engine initialized in Paper Mode.',
    },
    {
      id: '2',
      timestamp: '10:48:15',
      level: 'INFO',
      message: 'Market Scanner: Ingested 11 Blue Chips + 5 Top Volume Momentum Candidates.',
    },
    {
      id: '3',
      timestamp: '10:48:29',
      level: 'RISK',
      message: 'Risk Engine: Maximum portfolio risk cap locked at 2.0% per trade (Kelly Criterion).',
    },
    {
      id: '4',
      timestamp: '10:48:42',
      level: 'SIGNAL',
      message: 'Dynamic Grid: ADX 18.6 < 25 (Ranging Regime). Mean-reversion trigger active.',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal on new logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Simulate real-time price fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 45;
      setBtcPrice((prev) => {
        const next = Math.max(10000, Number((prev + delta).toFixed(2)));
        setPriceDelta(delta > 0 ? 'UP' : 'DOWN');
        return next;
      });
      setPriceChange((prev) => Number((prev + delta * 0.0005).toFixed(2)));

      // Slight indicator drift
      setRsi((prev) => {
        const nextRsi = Number((prev + (Math.random() - 0.5) * 1.2).toFixed(1));
        return Math.min(85, Math.max(15, nextRsi));
      });
      setAdx((prev) => {
        const nextAdx = Number((prev + (Math.random() - 0.49) * 0.4).toFixed(1));
        return Math.min(60, Math.max(10, nextAdx));
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Update regime based on simulated ADX
  useEffect(() => {
    setRegime(adx >= 25 ? 'TRENDING' : 'RANGING');
  }, [adx]);

  // Simulate trading signals and bot logs
  useEffect(() => {
    if (!isBotActive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const rand = Math.random();

      let newLog: LogEntry;

      if (rand < 0.28) {
        // RSI Grid Signal
        const triggerRsi = (26 + Math.random() * 6).toFixed(1);
        newLog = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: timeStr,
          level: 'SIGNAL',
          message: `Dynamic Grid Trigger: BTCUSDT RSI ${triggerRsi} oversold below lower Bollinger Band.`,
        };
      } else if (rand < 0.52) {
        // Order Execution
        const side = Math.random() > 0.4 ? 'BUY' : 'SELL';
        const qty = (0.05 + Math.random() * 0.15).toFixed(3);
        const fillPrice = btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
        newLog = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: timeStr,
          level: 'EXEC',
          message: `Order Filled: ${side} ${qty} BTCUSDT @ $${fillPrice} | Ghost Limit Layer confirmed.`,
        };
      } else if (rand < 0.76) {
        // Risk & Trailing Stop update
        const emaPrice = (btcPrice * 0.988).toFixed(2);
        newLog = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: timeStr,
          level: 'RISK',
          message: `Trailing Stop Recalculated: 20-EMA floor placed at $${emaPrice} (Loss capped at 1.8%).`,
        };
      } else {
        // Market Scanner sweep
        const candidate = ['SOLUSDT', 'ETHUSDT', 'AVAXUSDT', 'LINKUSDT'][Math.floor(Math.random() * 4)];
        newLog = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: timeStr,
          level: 'INFO',
          message: `Scanner Sweep: ${candidate} volume surge detected (2.4x 20-MA). ADX: ${adx}.`,
        };
      }

      setLogs((prev) => [...prev.slice(-35), newLog]);
    }, 4200);

    return () => clearInterval(interval);
  }, [isBotActive, btcPrice, adx]);

  const handleManualScan = () => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: timeStr,
      level: 'INFO',
      message: `Manual Telemetry Sweep: Ingested live orderbook depth for 16 monitored pairs. Spread: 0.01%.`,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  return (
    <div className="border border-slate-200 bg-white rounded-none shadow-sm space-y-0 overflow-hidden">
      {/* Top Telemetry Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span
              className={`w-2 h-2 rounded-none inline-block ${
                isBotActive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span className="font-semibold text-slate-800">
              {isBotActive ? t('projects.cryptoDetail.sim.botActive') : t('projects.cryptoDetail.sim.botPaused')}
            </span>
          </div>

          <span className="text-slate-300">|</span>

          <span className="text-slate-500">
            {t('projects.cryptoDetail.sim.mode')}:{' '}
            <span className="font-semibold text-electric">
              {simMode === 'PAPER'
                ? t('projects.cryptoDetail.sim.paperMode')
                : t('projects.cryptoDetail.sim.liveMode')}
            </span>
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setSimMode(simMode === 'PAPER' ? 'LIVE' : 'PAPER')}
            className="px-2.5 py-1 text-[11px] font-mono border border-slate-200 bg-white hover:border-slate-300 text-slate-700 transition-colors rounded-none"
          >
            {simMode === 'PAPER' ? 'Switch Live Spec' : 'Switch Paper'}
          </button>

          <button
            type="button"
            onClick={() => setIsBotActive(!isBotActive)}
            className={`inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-mono border transition-colors rounded-none ${
              isBotActive
                ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {isBotActive ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleManualScan}
            title="Trigger Manual Scan"
            className="p-1 border border-slate-200 bg-white hover:border-electric text-slate-600 hover:text-electric transition-colors rounded-none"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200 border-b border-slate-200 bg-white">
        {/* Metric 1: BTC Price */}
        <div className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            BTC/USDT Live Feed
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl sm:text-2xl font-bold font-mono text-fintech-primary tracking-tight">
              ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-mono font-semibold ${
                priceChange >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {priceChange >= 0 ? `+${priceChange}%` : `${priceChange}%`}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Tick Status: {priceDelta === 'UP' ? 'BID UPTICK' : priceDelta === 'DOWN' ? 'ASK DOWNTICK' : 'NEUTRAL'}
          </span>
        </div>

        {/* Metric 2: Virtual Balance */}
        <div className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            {t('projects.cryptoDetail.sim.balance')}
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl sm:text-2xl font-bold font-mono text-fintech-primary tracking-tight">
              $10,248.50
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-600">+18.4%</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Initial: $10,000.00 USDT</span>
        </div>

        {/* Metric 3: Quantitative Indicators */}
        <div className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Indicators (15m)
          </span>
          <div className="flex items-center space-x-3 text-xs font-mono pt-1">
            <div>
              <span className="text-slate-400">RSI: </span>
              <span className={`font-semibold ${rsi < 35 ? 'text-emerald-600' : rsi > 65 ? 'text-rose-600' : 'text-slate-700'}`}>
                {rsi}
              </span>
            </div>
            <div>
              <span className="text-slate-400">ADX: </span>
              <span className="font-semibold text-slate-700">{adx}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block">
            Regime:{' '}
            <span className="font-semibold text-electric">
              {regime === 'TRENDING' ? 'Trending (Momentum)' : 'Ranging (Grid Reversion)'}
            </span>
          </span>
        </div>

        {/* Metric 4: Risk Sizing */}
        <div className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Risk & Circuit Breaker
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-xs font-mono font-semibold text-slate-700">Kelly Size: 2.0%</span>
            <span className="text-xs font-mono text-slate-400">Max DD: -4.8%</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-600 pt-1">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span>Circuit Breaker Armed (5% / 15%)</span>
          </div>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="bg-slate-900 text-slate-100 p-4 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-electric" />
            <span className="font-semibold text-slate-200">
              {t('projects.cryptoDetail.sim.terminalTitle')}
            </span>
            <span className="text-[10px] text-slate-500">[Sub-second WebSocket Simulation]</span>
          </div>

          <button
            type="button"
            onClick={() => setLogs([])}
            className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors uppercase"
          >
            {t('projects.cryptoDetail.sim.clearLogs')}
          </button>
        </div>

        <div className="h-56 overflow-y-auto space-y-1.5 pr-2 font-mono text-[11px] leading-relaxed selection:bg-slate-700">
          {logs.map((log) => {
            let levelColor = 'text-slate-400';
            if (log.level === 'SIGNAL') levelColor = 'text-amber-400 font-semibold';
            if (log.level === 'EXEC') levelColor = 'text-emerald-400 font-semibold';
            if (log.level === 'RISK') levelColor = 'text-rose-400 font-semibold';

            return (
              <div key={log.id} className="flex items-start space-x-2">
                <span className="text-slate-500 select-none">[{log.timestamp}]</span>
                <span className={`w-16 flex-shrink-0 select-none ${levelColor}`}>
                  [{log.level}]
                </span>
                <span className="text-slate-200 flex-1">{log.message}</span>
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboardSim;
