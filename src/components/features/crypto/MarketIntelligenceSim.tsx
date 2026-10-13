import React, { useState } from 'react';
import { Activity, Terminal, TrendingUp, Shield, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type IndicatorKey = 'rsi' | 'adx' | 'kelly';

export const MarketIntelligenceSim: React.FC = () => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language?.startsWith('fr');

  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorKey>('adx');

  const indicatorDetails: Record<
    IndicatorKey,
    { name: string; value: string; status: string; description: string }
  > = {
    rsi: {
      name: isFrench ? 'RSI (14 PÉRIODES)' : 'RSI (14-PERIOD)',
      value: '54.2',
      status: isFrench ? 'ÉQUILIBRE NEUTRE' : 'NEUTRAL EQUILIBRIUM',
      description: isFrench
        ? 'L\'oscillateur de momentum évolue dans une zone d\'équilibre saine (45.0 - 65.0). Ni épuisement extrême ni rejet de surachat détecté sur les paires surveillées.'
        : 'Momentum oscillator is operating within the healthy equilibrium band (45.0 - 65.0). Neither extreme exhaustion nor overbought rejection detected across major surveillance pairs.',
    },
    adx: {
      name: isFrench ? 'ADX (14 PÉRIODES DIRECTIONNEL)' : 'ADX (14-PERIOD DIRECTIONAL)',
      value: '26.8',
      status: isFrench ? 'RÉGIME DIRECTIONNEL CONFIRMÉ' : 'TRENDING REGIME CONFIRMED',
      description: isFrench
        ? 'Seuil ADX > 25.0 validé. La structure du marché a basculé d\'un range vers un momentum directionnel. La grille dynamique se désactive au profit du module Smart Momentum.'
        : 'ADX > 25.0 threshold validated. Market structure has shifted from range-bound chop into directional trend momentum. Dynamic Grid switches off; Smart Momentum module takes execution priority.',
    },
    kelly: {
      name: isFrench ? 'RÉGIME DE VOLATILITÉ & TAILLE' : 'VOLATILITY & SIZING REGIME',
      value: '1.25x ACTIVE',
      status: isFrench ? 'FRACTION CRITÈRE DE KELLY' : 'KELLY CRITERION FRACTION',
      description: isFrench
        ? 'Fraction de Kelly calibrée dynamiquement sur le taux de réussite à 30 jours (58.4%) et le ratio de gain (1.82). Risque baissier maximal plafonné à 2.0% des capitaux propres.'
        : 'Fractional Kelly criterion dynamically calibrated against 30-day win rate (58.4%) and payoff ratio (1.82). Maximum downside exposure per trade capped at 2.0% of portfolio equity.',
    },
  };

  return (
    <div className="bg-[#0B0E14] border border-[#1E2638] rounded-none p-4 sm:p-6 space-y-6 text-slate-200 font-sans shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E2638] pb-4">
        <div className="flex items-center space-x-2.5">
          <Terminal className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-100">
            {isFrench ? 'INTELLIGENCE DE MARCHÉ IA & SYNTHÈSE' : 'AI MARKET INTELLIGENCE & SYNTHESIS'}
          </h3>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 bg-purple-950/40 border border-purple-800/40 px-2 py-0.5 rounded-none">
          <span className="w-1.5 h-1.5 bg-purple-400 rounded-none" />
          <span>LLAMA 3.3 70B VIA GROQ</span>
        </div>
      </div>

      {/* Top Section: Sentiment & Active Narratives */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Global Sentiment */}
        <div className="md:col-span-5 bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{isFrench ? 'Sentiment Global' : 'Global Sentiment'}</span>
            <span className="text-[10px] text-slate-500">
              {isFrench ? 'SCORE AGRÉGÉ' : 'AGGREGATED SCORE'}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-mono font-bold text-emerald-400 tracking-tight">
              +20%
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-500 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              {isFrench ? 'Biais Haussier' : 'Bullish Bias'}
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 leading-relaxed border-t border-[#1E2638] pt-2">
            {isFrench
              ? 'Calculé à partir des volumes de l\'API X (Twitter), de la vélocité des actualités CryptoCompare et des ratios bid/ask du carnet d\'ordres.'
              : 'Derived from X (Twitter) API volume surges, CryptoCompare news velocity, and orderbook bid/ask ratios.'}
          </div>
        </div>

        {/* Active Narrative Tags */}
        <div className="md:col-span-7 bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            {isFrench ? 'Métadonnées des Narratifs Actifs' : 'Active Narrative Metadata'}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {['#Altseason', '#L2 Scaling', '#DeFi 2.0', '#RWA Tokenization'].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono font-semibold bg-[#161F30] border border-[#273756] text-purple-300 rounded-none"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-[11px] font-mono text-slate-500 pt-1">
            {isFrench
              ? 'Tags de clusters automatisés extraits par analyse de sentiment en langage naturel.'
              : 'Automated cluster tags extracted from natural language sentiment embeddings.'}
          </div>
        </div>
      </div>

      {/* Daily Strategist Brief Block */}
      <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isFrench
                ? 'BRIEF QUOTIDIEN DU STRATÈGE (Synthèse Automatisée)'
                : 'DAILY STRATEGIST BRIEF (Automated Synthesis)'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {isFrench ? 'HORODATAGE : 08:00 UTC' : 'TIMESTAMP: 08:00 UTC'}
          </span>
        </div>

        <div className="bg-[#0B0E14] border border-[#1E2638] p-4 text-xs font-mono text-slate-300 leading-relaxed rounded-none">
          {isFrench
            ? 'La structure du marché indique une tendance haussière modérée avec une dominance du BTC à 57.52% et un volume mondial 24h consolidant autour de 102.94B$. Le module Smart Momentum détecte des cassures de canaux Donchian à 20 périodes sur SOL et LINK accompagnées d\'un volume en hausse de 2.0x. La grille dynamique de retour à la moyenne maintient ses échelons de limites sur les paires sans tendance. L\'agrégation du sentiment reste nettement positive avec une rotation macro anticipée vers les altcoins.'
            : 'Market structure indicates a moderate bull trend with BTC dominance holding at 57.52% and global 24h volume consolidating near $102.94B. Smart Momentum module detects 20-candle Donchian breakouts on SOL and LINK with 2.0x volume surges. Dynamic Grid Mean Reversion continues active limit laddering on ranging pairs. Sentiment aggregation from X (Twitter) API and news feeds remains net positive with macro altcoin rotation anticipated.'}
        </div>
      </div>

      {/* Interactive Indicator Status Telemetry */}
      <div className="bg-[#111622] border border-[#1E2638] rounded-none p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-2.5">
          <div className="flex items-center space-x-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {isFrench
                ? 'TÉLÉMÉTRIE ALGORITHMIQUE & FILTRES DE RÉGIME'
                : 'ALGORITHMIC TELEMETRY & REGIME FILTERS'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {isFrench ? 'CHOISIR UNE MÉTRIQUE À INSPECTER' : 'SELECT METRIC TO INSPECT'}
          </span>
        </div>

        {/* 3 Clickable Telemetry Metric Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <button
            type="button"
            onClick={() => setSelectedIndicator('rsi')}
            className={`p-3 text-left border rounded-none transition-colors ${
              selectedIndicator === 'rsi'
                ? 'bg-[#192338] border-blue-500/80 text-white'
                : 'bg-[#0B0E14] border-[#1E2638] text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-400 uppercase">RSI (14)</div>
            <div className="text-lg font-bold text-slate-100 mt-1">54.2</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {isFrench ? 'Bande Neutre' : 'Neutral Band'}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedIndicator('adx')}
            className={`p-3 text-left border rounded-none transition-colors ${
              selectedIndicator === 'adx'
                ? 'bg-[#192338] border-blue-500/80 text-white'
                : 'bg-[#0B0E14] border-[#1E2638] text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-400 uppercase">ADX (14)</div>
            <div className="text-lg font-bold text-emerald-400 mt-1">26.8</div>
            <div className="text-[10px] text-emerald-500 mt-0.5">
              {isFrench ? 'Régime Tendance' : 'Trending Regime'}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedIndicator('kelly')}
            className={`p-3 text-left border rounded-none transition-colors ${
              selectedIndicator === 'kelly'
                ? 'bg-[#192338] border-blue-500/80 text-white'
                : 'bg-[#0B0E14] border-[#1E2638] text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="text-[10px] text-slate-400 uppercase">
              {isFrench ? 'Régime Volatilité' : 'Volatility Regime'}
            </div>
            <div className="text-lg font-bold text-purple-400 mt-1">1.25x Active</div>
            <div className="text-[10px] text-purple-400 mt-0.5">
              {isFrench ? 'Critère de Kelly' : 'Kelly Criterion'}
            </div>
          </button>
        </div>

        {/* Deep Telemetry Readout */}
        <div className="bg-[#0B0E14] border border-[#1E2638] p-4 text-xs font-mono space-y-1.5 rounded-none">
          <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-slate-200">
              {indicatorDetails[selectedIndicator].name}:
            </span>
            <span className="text-blue-400 font-semibold">
              {indicatorDetails[selectedIndicator].status}
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed pt-1">
            {indicatorDetails[selectedIndicator].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligenceSim;
