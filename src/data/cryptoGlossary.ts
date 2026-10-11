export interface GlossaryEntry {
  id: string;
  term: string;
  category: 'Quantitative Strategy' | 'Risk Management' | 'Market Infrastructure' | 'AI & Analytics';
  shortDef: string;
  line1: string;
  line2: string;
  line3: string;
}

export const CRYPTO_GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: 'donchian-channel',
    term: 'Donchian Channel',
    category: 'Quantitative Strategy',
    shortDef: 'A trend-following volatility indicator plotting the highest high and lowest low over N periods.',
    line1: 'Measures market extremes by tracking the highest price and lowest price over a defined lookback window (typically 20 periods).',
    line2: 'When price crosses above the upper band on abnormal volume, an automated momentum breakout long entry is confirmed.',
    line3: 'Eliminates emotional guessing by enforcing objective mathematical bounds on price breakouts.',
  },
  {
    id: 'kelly-criterion',
    term: 'Kelly Criterion',
    category: 'Risk Management',
    shortDef: 'A mathematical formula determining the optimal fraction of capital to allocate per trade.',
    line1: 'Calculates the optimal trade position size based on win probability and reward-to-risk ratio to maximize long-term geometric capital growth.',
    line2: 'Institutional implementations utilize fractional Kelly (e.g. 0.25x to 0.5x, capped at 2.0% risk) to prevent catastrophic portfolio drawdown.',
    line3: 'Ensures that high-conviction trades receive proportionally larger allocations while low-edge trades are strictly minimized.',
  },
  {
    id: 'adx',
    term: 'ADX (Average Directional Index)',
    category: 'Quantitative Strategy',
    shortDef: 'A momentum indicator quantifying the absolute strength of a market trend without regard to direction.',
    line1: 'Measures whether an asset is actively trending or trapped in choppy consolidation, evaluated on a 0 to 100 numerical scale.',
    line2: 'Readings above 25.0 validate a robust trending regime, prompting the engine to prioritize breakout momentum over mean reversion.',
    line3: 'Readings below 20.0 indicate ranging chop, triggering dynamic grid limit ladders to capture small oscillations.',
  },
  {
    id: 'ema-20',
    term: '20-Period EMA',
    category: 'Quantitative Strategy',
    shortDef: 'Exponential Moving Average giving higher statistical weight to recent price ticks.',
    line1: 'Calculates a smoothed trendline that responds faster to recent price fluctuations than a simple moving average (SMA).',
    line2: 'Acts as dynamic support during upward momentum phases and provides a quantitative benchmark for trailing stop adjustments.',
    line3: 'A healthy bull trend consistently remains above the ascending 20-EMA without severe structural breakdown.',
  },
  {
    id: 'trailing-stop',
    term: 'Trailing Stop-Loss',
    category: 'Risk Management',
    shortDef: 'An automated protective order that ratchets upward as market price advances.',
    line1: 'Locks in unrealized paper profits by automatically raising the protective liquidation floor as price ascends.',
    line2: 'Maintains a constant percentage or indicator buffer beneath the mark price, never adjusting downward under any market condition.',
    line3: 'Guarantees that a winning breakout cannot turn into a portfolio loss when market structure eventually reverses.',
  },
  {
    id: 'perpetual-contract',
    term: 'Perpetual Contract (Perp)',
    category: 'Market Infrastructure',
    shortDef: 'A derivative contract without an expiration date, tethered to index spot prices via funding rates.',
    line1: 'Allows market participants to hold directional long or short positions indefinitely without rolling over quarterly futures contracts.',
    line2: 'Anchored to spot market prices through periodic funding payments exchanged between long and short contract holders.',
    line3: 'Provides deep institutional liquidity and flexible leverage for algorithmic execution across major cryptocurrencies.',
  },
  {
    id: 'orderbook-depth',
    term: 'Orderbook Depth',
    category: 'Market Infrastructure',
    shortDef: 'The aggregate volume of resting limit buy and sell bids at various price intervals.',
    line1: 'Measures market liquidity and the resilience of an asset to absorb large market orders without substantial price slippage.',
    line2: 'High bid density acts as structural price support, while thin orderbooks indicate vulnerability to volatility spikes.',
    line3: 'Real-time WebSocket streaming continuously monitors depth imbalances to anticipate aggressive institutional accumulation.',
  },
  {
    id: 'mean-reversion',
    term: 'Mean Reversion',
    category: 'Quantitative Strategy',
    shortDef: 'A mathematical theory suggesting asset prices and historical returns eventually return to their long-term average.',
    line1: 'Assumes that extreme price deviations from moving averages or statistical envelopes will eventually snap back toward the mean.',
    line2: 'Executed via dynamic limit order ladders placed near Bollinger Bands when the market ADX confirms a low-trend regime.',
    line3: 'Captures consistent yield in sideways consolidating markets while avoiding trend exhaustion traps.',
  },
  {
    id: 'slippage',
    term: 'Execution Slippage',
    category: 'Market Infrastructure',
    shortDef: 'The difference between the expected price of a trade and the price at which the order is actually executed.',
    line1: 'Occurs during periods of extreme volatility or when order sizes exceed immediate top-of-book market liquidity.',
    line2: 'Algorithmic smart routing minimizes slippage by staggering fills across sub-second execution intervals.',
    line3: 'Maintaining sub-0.005% average slippage is critical for institutional quantitative profitability.',
  },
  {
    id: 'llama-groq',
    term: 'Groq LLaMA 3.3 70B Synthesis',
    category: 'AI & Analytics',
    shortDef: 'Ultra-low latency natural language processing generating structured daily financial market briefings.',
    line1: 'Processes macroeconomic news releases, regulatory developments, and social narrative momentum through Groq LPU hardware.',
    line2: 'Transforms unstructured multi-source text into normalized numerical sentiment vectors (-1.0 to +1.0) and structured briefings.',
    line3: 'Acts as an automated intelligence governor, vetting technical breakout setups against broader macroeconomic market conditions.',
  },
  {
    id: 'pnl',
    term: 'PnL (Profit and Loss)',
    category: 'Risk Management',
    shortDef: 'The net financial gain or loss realized or open across trading vectors.',
    line1: 'Distinguishes between unrealized (floating mark-to-market paper gains) and realized (closed capital) returns.',
    line2: 'Calculated in real time from WebSocket price ticks against entry execution benchmarks.',
    line3: 'Provides fundamental telemetry for calculating algorithmic Sharpe ratios and calibrating Kelly allocation fractions.',
  },
  {
    id: 'volatility-regime',
    term: 'Volatility Regime',
    category: 'Quantitative Strategy',
    shortDef: 'The prevailing statistical state of market price fluctuations (compressed vs expanded).',
    line1: 'Classifies current market behavior into distinct operational states using Average True Range (ATR) and Bollinger Band width.',
    line2: 'Low-volatility compression regimes precede major breakout surges; high-volatility regimes require tighter risk caps.',
    line3: 'Strategy parameters automatically modulate order sizing and profit targets according to the active regime.',
  },
];
