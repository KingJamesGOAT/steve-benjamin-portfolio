import React, { useState } from 'react';
import { Layers, Wallet, TrendingUp, Target, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CryptoIcon from './CryptoIcon';

interface Position {
  asset: string;
  size: string;
  invested: string;
  entry: string;
  mark: string;
  pnl: string;
  roi: string;
  isPositive: boolean;
  auditTitleEn: string;
  auditTitleFr: string;
  auditDetailsEn: string;
  auditDetailsFr: string;
}

interface ScoutMission {
  symbol: string;
  side: 'LONG' | 'SHORT';
  entry: string;
  mark: string;
  pnlPercent: string;
  pnlAmount: string;
  isPositive: boolean;
  stopLoss: string;
  takeProfit: string;
  progressPercent: number;
}

const POSITIONS_DATA: Position[] = [
  {
    asset: 'SOL',
    size: '22.5844',
    invested: '$2,451',
    entry: '$108.5400',
    mark: '$109.5100',
    pnl: '+$21.91',
    roi: '+0.89%',
    isPositive: true,
    auditTitleEn: 'DEFENSE REGIME: ACTIVE TRAILING FLOOR',
    auditTitleFr: 'RÉGIME DE DÉFENSE : TRAILING STOP ACTIF',
    auditDetailsEn: 'Position secured. Trailing stop anchored to 20-EMA on 15m candle. Risk allocation: 2.0% Kelly fraction.',
    auditDetailsFr: 'Position sécurisée. Trailing stop ancré sur EMA-20 en bougie 15m. Allocation de risque : fraction de Kelly à 2.0%.',
  },
  {
    asset: 'TRUMP',
    size: '1134.5805',
    invested: '$2,031',
    entry: '$1.7900',
    mark: '$1.7900',
    pnl: '$0.00',
    roi: '0.00%',
    isPositive: true,
    auditTitleEn: 'BREAKOUT ENTRY: AWAITING VOLATILITY EXPANSION',
    auditTitleFr: 'ENTRÉE SUR CASSURE : EN ATTENTE D\'EXPANSION DE VOLATILITÉ',
    auditDetailsEn: 'Limit ladder fill completed. Bollinger Band width compressed. Stop-loss hard locked at -2.5% deviation.',
    auditDetailsFr: 'Ordres limites exécutés. Compression de bande de Bollinger. Stop-loss verrouillé à -2.5% d\'écart.',
  },
  {
    asset: 'LINK',
    size: '193.2097',
    invested: '$2,483',
    entry: '$12.8500',
    mark: '$12.9740',
    pnl: '+$23.96',
    roi: '+0.96%',
    isPositive: true,
    auditTitleEn: 'MOMENTUM CONTINUATION: DONCHIAN 20 HIGH',
    auditTitleFr: 'CONTINUATION DE MOMENTUM : SOMMET CANAL DONCHIAN 20',
    auditDetailsEn: 'Volume breakout verified at 2.1x 20-period moving average. Dynamic profit target locked at $13.6210.',
    auditDetailsFr: 'Cassure de volume validée à 2.1x la moyenne mobile à 20 périodes. Prise de bénéfice dynamique verrouillée à 13.6210$.',
  },
  {
    asset: 'TRX',
    size: '10160.8352',
    invested: '$3,372',
    entry: '$0.3316',
    mark: '$0.3305',
    pnl: '-$11.19',
    roi: '-0.33%',
    isPositive: false,
    auditTitleEn: 'MEAN REVERSION GRID: SECONDARY RUNG BUFFER',
    auditTitleFr: 'GRILLE DE RETOUR À LA MOYENNE : TAMPON ÉCHELON SECONDAIRE',
    auditDetailsEn: 'Oscillator in oversold envelope. ADX at 19.4 indicates ranging regime. Position size normalized to grid spacing.',
    auditDetailsFr: 'Oscillateur en zone de survente. ADX à 19.4 indiquant un régime sans tendance. Taille d\'ordre normalisée au maillage de la grille.',
  },
];

const SCOUT_MISSIONS: ScoutMission[] = [
  {
    symbol: 'SOL',
    side: 'LONG',
    entry: '$108.5400',
    mark: '$109.5100',
    pnlPercent: '+0.86%',
    pnlAmount: '$21.00',
    isPositive: true,
    stopLoss: '$106.3692',
    takeProfit: '$115.0524',
    progressPercent: 62,
  },
  {
    symbol: 'TRUMP',
    side: 'LONG',
    entry: '$1.7900',
    mark: '$1.7900',
    pnlPercent: '+0.00%',
    pnlAmount: '$0.00',
    isPositive: true,
    stopLoss: '$1.8649',
    takeProfit: '$1.8974',
    progressPercent: 50,
  },
  {
    symbol: 'LINK',
    side: 'LONG',
    entry: '$12.8500',
    mark: '$12.9740',
    pnlPercent: '+0.84%',
    pnlAmount: '$20.87',
    isPositive: true,
    stopLoss: '$12.5930',
    takeProfit: '$13.6210',
    progressPercent: 58,
  },
];

export const PaperTradingSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const [isEngineActive, setIsEngineActive] = useState<boolean>(true);
  const [selectedAudit, setSelectedAudit] = useState<Position | null>(null);

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] rounded-none p-4 sm:p-6 space-y-6 text-slate-200 font-sans shadow-2xl relative">
      {/* 1. System Status Header Bar */}
      <div className="border-b border-[#1E2638] pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <div
                className={`w-2.5 h-2.5 rounded-none ${
                  isEngineActive
                    ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                    : 'bg-rose-500'
                }`}
              />
              <h3 className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-slate-100">
                {isFrench ? 'CENTRE DE COMMANDE VIRTUEL' : 'GHOST COMMAND CENTER'}
              </h3>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              {isFrench
                ? 'Simulation Haute Fréquence · Architecture Event-Driven'
                : 'High-Frequency Paper Simulation · Event-Driven Architecture'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`px-2.5 py-1 text-xs font-mono font-bold tracking-wider rounded-none border ${
                isEngineActive
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  : 'bg-rose-950/60 text-rose-400 border-rose-800/60'
              }`}
            >
              {isEngineActive
                ? isFrench
                  ? 'SYSTÈME EN LIGNE'
                  : 'SYSTEM ONLINE'
                : isFrench
                ? 'MOTEUR EN PAUSE'
                : 'ENGINE PAUSED'}
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Available Balance */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>{isFrench ? 'Solde Disponible' : 'Available Balance'}</span>
            <Wallet className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="text-2xl font-mono font-bold text-slate-100 tracking-tight">
            $27,321 <span className="text-xs font-normal text-slate-400">USDT</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            {isFrench ? 'Capital de Simulation Paper' : 'Paper Execution Capital'}
          </div>
        </div>

        {/* Global Open PnL */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <span>{isFrench ? 'P&L Latent Global' : 'Global Open PnL'}</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400 tracking-tight flex items-center space-x-1">
            <span>+$34.68</span>
            <span className="text-xs text-emerald-500 font-normal">(+0.34%)</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            {isFrench ? 'Cumul de 4 positions actives' : '4 Active Positions Aggregate'}
          </div>
        </div>

        {/* Engine Toggle Control */}
        <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 flex flex-col justify-between space-y-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            {isFrench ? 'État d\'Exécution' : 'Execution State'}
          </div>
          <button
            type="button"
            onClick={() => setIsEngineActive(!isEngineActive)}
            className={`w-full py-2.5 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-none transition-colors border ${
              isEngineActive
                ? 'bg-[#8F2D2D] hover:bg-[#A83737] text-white border-red-900/60'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700'
            }`}
          >
            {isEngineActive
              ? isFrench
                ? '[ ARRÊTER LE MOTEUR ]'
                : '[ STOP ENGINE ]'
              : isFrench
              ? '[ DÉMARRER LE MOTEUR ]'
              : '[ START ENGINE ]'}
          </button>
        </div>
      </div>

      {/* 2. Active Vector Allocations Table */}
      <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isFrench ? 'ALLOCATIONS DE VECTEURS ACTIVES' : 'ACTIVE VECTOR ALLOCATIONS'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {isFrench ? '4 POOLS ALLOUÉS' : '4 ALLOCATED POOLS'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#1E2638] text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2 font-normal">{isFrench ? 'Actif' : 'Asset'}</th>
                <th className="py-2.5 px-2 font-normal text-right">{isFrench ? 'Taille' : 'Size'}</th>
                <th className="py-2.5 px-2 font-normal text-right">{isFrench ? 'Investi' : 'Invested'}</th>
                <th className="py-2.5 px-2 font-normal text-right">{isFrench ? 'Entrée' : 'Entry'}</th>
                <th className="py-2.5 px-2 font-normal text-right">{isFrench ? 'Cours' : 'Mark'}</th>
                <th className="py-2.5 px-2 font-normal text-right">PnL</th>
                <th className="py-2.5 px-2 font-normal text-right">ROI</th>
                <th className="py-2.5 px-2 font-normal text-center">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2638]/60">
              {POSITIONS_DATA.map((pos) => (
                <tr
                  key={pos.asset}
                  className="hover:bg-[#161C2C] transition-colors text-slate-200"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <CryptoIcon symbol={pos.asset} size={20} />
                      <span className="font-bold text-slate-100 text-xs">
                        {pos.asset}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-300">{pos.size}</td>
                  <td className="py-3 px-2 text-right text-blue-300">{pos.invested}</td>
                  <td className="py-3 px-2 text-right text-slate-400">{pos.entry}</td>
                  <td className="py-3 px-2 text-right font-semibold text-slate-100">{pos.mark}</td>
                  <td
                    className={`py-3 px-2 text-right font-semibold ${
                      pos.isPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {pos.pnl}
                  </td>
                  <td
                    className={`py-3 px-2 text-right font-semibold ${
                      pos.isPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {pos.roi}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedAudit(pos)}
                      className="inline-flex items-center space-x-1 px-2 py-0.5 bg-[#161F30] hover:bg-[#1E2A42] border border-[#263554] text-[11px] text-slate-300 transition-colors rounded-none"
                    >
                      <Search className="w-3 h-3 text-slate-400" />
                      <span>Audit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Live Scout Missions Cards */}
      <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isFrench ? 'MISSIONS D\'EXPLORATION EN DIRECT' : 'LIVE SCOUT MISSIONS'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-none">
            {isFrench ? '3 ACTIVES' : '3 ACTIVE'}
          </span>
        </div>

        <div className="space-y-3">
          {SCOUT_MISSIONS.map((scout) => (
            <div
              key={scout.symbol}
              className="bg-[#0C101A] border border-[#1E2638] rounded-none p-3.5 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-2">
                  <CryptoIcon symbol={scout.symbol} size={20} />
                  <span className="font-bold text-slate-100 text-sm">{scout.symbol}</span>
                  <span className="bg-emerald-950/70 border border-emerald-800 text-emerald-400 text-[10px] px-1.5 py-0.2 rounded-none">
                    {scout.side}
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-[11px]">
                    {isFrench ? 'Entrée :' : 'Entry:'} {scout.entry}
                  </div>
                  <div
                    className={`font-semibold ${
                      scout.isPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {scout.pnlPercent} ({scout.pnlAmount})
                  </div>
                </div>
              </div>

              {/* Progress and Target Bound */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-rose-500">{scout.stopLoss}</span>
                  <span className="text-emerald-400">{scout.takeProfit}</span>
                </div>

                {/* Custom Progress Bar */}
                <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-none overflow-hidden relative">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${scout.progressPercent}%` }}
                  />
                </div>

                <div className="text-center text-[10px] font-mono text-slate-500 pt-0.5">
                  {isFrench ? 'Suivi en direct actif' : 'Live Tracking Active'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Modal / Floating Inspector */}
      {selectedAudit && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#111622] border border-[#1E2638] rounded-none max-w-lg w-full p-5 space-y-4 shadow-2xl font-mono">
            <div className="flex items-center justify-between border-b border-[#1E2638] pb-3">
              <div className="flex items-center space-x-2">
                <CryptoIcon symbol={selectedAudit.asset} size={18} />
                <span className="text-xs font-bold text-slate-100 tracking-wider">
                  {isFrench
                    ? `AUDIT TÉLÉMÉTRIQUE : ${selectedAudit.asset}`
                    : `TELEMETRY AUDIT: ${selectedAudit.asset}`}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAudit(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#0B0E14] border border-[#1E2638] p-3 space-y-1.5">
                <div className="text-[11px] text-emerald-400 font-bold uppercase">
                  {isFrench ? selectedAudit.auditTitleFr : selectedAudit.auditTitleEn}
                </div>
                <div className="text-slate-300 leading-relaxed">
                  {isFrench ? selectedAudit.auditDetailsFr : selectedAudit.auditDetailsEn}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#0B0E14] p-2 border border-[#1E2638]">
                  <span className="text-slate-500">
                    {isFrench ? 'REPÈRE D\'ENTRÉE :' : 'ENTRY BENCHMARK:'}
                  </span>
                  <div className="text-slate-200 font-bold">{selectedAudit.entry}</div>
                </div>
                <div className="bg-[#0B0E14] p-2 border border-[#1E2638]">
                  <span className="text-slate-500">
                    {isFrench ? 'COURS ACTUEL :' : 'CURRENT MARK:'}
                  </span>
                  <div className="text-slate-200 font-bold">{selectedAudit.mark}</div>
                </div>
                <div className="bg-[#0B0E14] p-2 border border-[#1E2638]">
                  <span className="text-slate-500">
                    {isFrench ? 'P&L NON RÉALISÉ :' : 'UNREALIZED PNL:'}
                  </span>
                  <div
                    className={`font-bold ${
                      selectedAudit.isPositive ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {selectedAudit.pnl}
                  </div>
                </div>
                <div className="bg-[#0B0E14] p-2 border border-[#1E2638]">
                  <span className="text-slate-500">
                    {isFrench ? 'ALLOCATION DE KELLY :' : 'KELLY ALLOCATION:'}
                  </span>
                  <div className="text-slate-200 font-bold">{selectedAudit.invested}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedAudit(null)}
                className="px-4 py-1.5 bg-[#1E2638] hover:bg-[#28334C] text-xs text-slate-200 font-bold rounded-none"
              >
                {isFrench ? 'FERMER L\'AUDIT' : 'CLOSE AUDIT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperTradingSim;
