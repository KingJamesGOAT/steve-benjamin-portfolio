import React from 'react';
import { useTranslation } from 'react-i18next';
import CryptoIcon from './CryptoIcon';

export const MarketIntelligenceSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] rounded-none p-4 sm:p-6 space-y-5 text-slate-200 font-sans shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E2638] pb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-2.5 h-2.5 bg-purple-400 rounded-none shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
          <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-100">
            {isFrench
              ? 'FLUX D\'INTELLIGENCE ÉCONOMIQUE & ACTUALITÉS IA'
              : 'AI MARKET INTELLIGENCE & NEWS FEED'}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2.5 py-0.5 rounded-none">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-none" />
          <span>LLAMA 3.3 VIA GROQ API</span>
        </div>
      </div>

      {/* Top Macro & Sentiment Ribbon (Compact & Clean) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
        {/* Global Sentiment */}
        <div className="bg-[#111622] border border-[#1E2638] p-3 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
            {isFrench ? 'Sentiment Global IA' : 'AI Global Sentiment'}
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-emerald-400">+20%</span>
            <span className="text-xs text-emerald-500 font-semibold">
              {isFrench ? 'Biais Haussier' : 'Bullish Bias'}
            </span>
          </div>
          <div className="w-full h-1 bg-[#1E2638] overflow-hidden mt-1">
            <div className="h-full bg-emerald-400" style={{ width: '70%' }} />
          </div>
        </div>

        {/* BTC Dominance */}
        <div className="bg-[#111622] border border-[#1E2638] p-3 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
            {isFrench ? 'Dominance Bitcoin' : 'BTC Dominance'}
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-slate-100">57.52%</span>
            <span className="text-[11px] text-slate-400">{isFrench ? 'Stable' : 'Holding'}</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {isFrench ? 'Seuil de rotation altcoin surveillé' : 'Altcoin rotation threshold active'}
          </div>
        </div>

        {/* 24h Global Volume */}
        <div className="bg-[#111622] border border-[#1E2638] p-3 space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
            {isFrench ? 'Volume Mondial 24h' : '24h Global Volume'}
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-slate-100">$102.94B</span>
            <span className="text-[11px] text-emerald-400 font-semibold">+4.2%</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {isFrench ? 'Flux agrégé CoinGecko API' : 'Aggregated CoinGecko API feed'}
          </div>
        </div>
      </div>

      {/* Main Single News Report with Market Impact */}
      <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 sm:p-5 space-y-3.5 font-mono">
        {/* News Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-blue-950/70 border border-blue-800 text-blue-400 text-[10px] px-2 py-0.5 font-bold uppercase">
              {isFrench ? 'DÉPÊCHE RÉGULATION & BANQUES' : 'BREAKING · BANKING REGULATION'}
            </span>
            <span className="text-slate-400 text-[11px]">Reuters Crypto / CryptoCompare API</span>
          </div>
          <span className="text-[10px] text-slate-500">
            {isFrench ? 'HORODATAGE : 09:45 UTC' : 'TIMESTAMP: 09:45 UTC'}
          </span>
        </div>

        {/* Main Headline / Title */}
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
            {isFrench
              ? 'La Réserve Fédérale maintient ses taux directeurs et autorise les banques commerciales américaines à déployer des services de garde pour les actifs numériques.'
              : 'Federal Reserve maintains benchmark rate; major US commercial banks approved to deploy digital asset custody infrastructure.'}
          </h4>
        </div>

        {/* Impact Box (Synthesized by Groq LLaMA 3.3) */}
        <div className="bg-[#0B0E14] border-l-2 border-emerald-400 border-t border-r border-b border-[#1E2638] p-3.5 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              {isFrench
                ? 'IMPACT DE MARCHÉ : FORTEMENT HAUSSIER (+2,4% VOLATILITÉ)'
                : 'MARKET IMPACT: HIGHLY BULLISH (+2.4% VOLATILITY)'}
            </span>
            <span className="text-[10px] text-slate-400 bg-[#161F30] px-2 py-0.5 border border-[#273756]">
              {isFrench ? 'SYNTHÈSE LLaMA 3.3' : 'LLAMA 3.3 SYNTHESIS'}
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
            {isFrench
              ? 'Afflux net de liquidités institutionnelles détecté sur les carnets d\'ordres perpétuels. Les volumes acheteurs franchissent l\'EMA-20 de 2,2x sur BTC, ETH et SOL, confirmant le régime de continuation de tendance (ADX > 25.0).'
              : 'Net institutional liquidity inflow detected on perpetual orderbooks. Buy-side volume clears the 20-period EMA by 2.2x across BTC, ETH, and SOL, confirming the trend-continuation regime (ADX > 25.0).'}
          </p>

          {/* Affected Vectors with Genuine Logos */}
          <div className="pt-2 border-t border-[#1E2638]/70 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-slate-400 uppercase">
              {isFrench ? 'Vecteurs Impactés :' : 'Impacted Vectors:'}
            </span>
            <div className="flex items-center space-x-1.5 bg-[#141C2B] border border-[#223048] px-2 py-0.5 text-[11px]">
              <CryptoIcon symbol="BTC" size={16} />
              <span className="font-bold text-slate-100">BTC</span>
              <span className="text-emerald-400 font-semibold">+2.4%</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#141C2B] border border-[#223048] px-2 py-0.5 text-[11px]">
              <CryptoIcon symbol="ETH" size={16} />
              <span className="font-bold text-slate-100">ETH</span>
              <span className="text-emerald-400 font-semibold">+3.1%</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#141C2B] border border-[#223048] px-2 py-0.5 text-[11px]">
              <CryptoIcon symbol="SOL" size={16} />
              <span className="font-bold text-slate-100">SOL</span>
              <span className="text-emerald-400 font-semibold">+4.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligenceSim;
