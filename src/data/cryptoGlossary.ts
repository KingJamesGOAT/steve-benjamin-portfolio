export interface GlossaryEntryContent {
  term: string;
  category: string;
  shortDef: string;
  line1: string;
  line2: string;
  line3: string;
}

export interface BilingualGlossaryItem {
  id: string;
  en: GlossaryEntryContent;
  fr: GlossaryEntryContent;
}

export interface LocalizedGlossaryEntry extends GlossaryEntryContent {
  id: string;
}

// Deprecated compatibility interface matching previous structure
export interface GlossaryEntry {
  id: string;
  term: string;
  category: string;
  shortDef: string;
  line1: string;
  line2: string;
  line3: string;
}

export const BILINGUAL_GLOSSARY_DATA: BilingualGlossaryItem[] = [
  {
    id: 'donchian-channel',
    en: {
      term: 'Donchian Channel',
      category: 'Quantitative Strategy',
      shortDef: 'A trend-following volatility indicator plotting the highest high and lowest low over N periods.',
      line1: 'Measures market extremes by tracking the highest price and lowest price over a defined lookback window (typically 20 periods).',
      line2: 'When price crosses above the upper band on abnormal volume, an automated momentum breakout long entry is confirmed.',
      line3: 'Eliminates emotional guessing by enforcing objective mathematical bounds on price breakouts.',
    },
    fr: {
      term: 'Canal de Donchian',
      category: 'Stratégie Quantitative',
      shortDef: 'Indicateur de volatilité de suivi de tendance traçant les plus hauts et plus bas sur N périodes.',
      line1: 'Mesure les extrêmes du marché en suivant le cours le plus haut et le plus bas sur une fenêtre d\'observation définie (généralement 20 périodes).',
      line2: 'Lorsque le cours dépasse la borne supérieure sur volume anormal, une cassure momentum haussière est confirmée par le système.',
      line3: 'Élimine les conjectures émotionnelles en imposant des bornes mathématiques objectives sur les franchissements de prix.',
    },
  },
  {
    id: 'kelly-criterion',
    en: {
      term: 'Kelly Criterion',
      category: 'Risk Management',
      shortDef: 'A mathematical formula determining the optimal fraction of capital to allocate per trade.',
      line1: 'Calculates the optimal trade position size based on win probability and reward-to-risk ratio to maximize long-term geometric capital growth.',
      line2: 'Institutional implementations utilize fractional Kelly (e.g. 0.25x to 0.5x, capped at 2.0% risk) to prevent catastrophic portfolio drawdown.',
      line3: 'Ensures that high-conviction trades receive proportionally larger allocations while low-edge trades are strictly minimized.',
    },
    fr: {
      term: 'Critère de Kelly',
      category: 'Gestion du Risque',
      shortDef: 'Formule mathématique déterminant la fraction optimale de capital à allouer par transaction.',
      line1: 'Calcule la taille optimale de position selon la probabilité de gain et le ratio risque/rendement pour maximiser la croissance géométrique du capital.',
      line2: 'Les déploiements institutionnels appliquent un Kelly fractionnaire (ex: 0,25x à 0,5x, plafonné à 2,0 % de risque) pour éliminer le risque de ruine.',
      line3: 'Garantit que les opportunités à forte conviction reçoivent une allocation supérieure tandis que les signaux marginaux sont minimisés.',
    },
  },
  {
    id: 'adx',
    en: {
      term: 'ADX (Average Directional Index)',
      category: 'Quantitative Strategy',
      shortDef: 'A momentum indicator quantifying the absolute strength of a market trend without regard to direction.',
      line1: 'Measures whether an asset is actively trending or trapped in choppy consolidation, evaluated on a 0 to 100 numerical scale.',
      line2: 'Readings above 25.0 validate a robust trending regime, prompting the engine to prioritize breakout momentum over mean reversion.',
      line3: 'Readings below 20.0 indicate ranging chop, triggering dynamic grid limit ladders to capture small oscillations.',
    },
    fr: {
      term: 'ADX (Average Directional Index)',
      category: 'Stratégie Quantitative',
      shortDef: 'Indicateur de momentum mesurant la force absolue d\'une tendance sans considération de direction.',
      line1: 'Évalue si un actif est en phase de tendance active ou en consolidation hachée, quantifié sur une échelle de 0 à 100.',
      line2: 'Une valeur supérieure à 25,0 valide un régime directionnel solide, incitant le moteur à privilégier le momentum de cassure.',
      line3: 'Une valeur inférieure à 20,0 signale un marché sans tendance, déclenchant des grilles d\'ordres limites pour capturer les micro-oscillations.',
    },
  },
  {
    id: 'ema-20',
    en: {
      term: '20-Period EMA',
      category: 'Quantitative Strategy',
      shortDef: 'Exponential Moving Average giving higher statistical weight to recent price ticks.',
      line1: 'Calculates a smoothed trendline that responds faster to recent price fluctuations than a simple moving average (SMA).',
      line2: 'Acts as dynamic support during upward momentum phases and provides a quantitative benchmark for trailing stop adjustments.',
      line3: 'A healthy bull trend consistently remains above the ascending 20-EMA without severe structural breakdown.',
    },
    fr: {
      term: 'EMA 20 Périodes',
      category: 'Stratégie Quantitative',
      shortDef: 'Moyenne mobile exponentielle accordant une pondération statistique accrue aux variations récentes.',
      line1: 'Calcule une courbe de tendance lissée réagissant plus rapidement aux fluctuations de cours récentes qu\'une moyenne mobile simple (SMA).',
      line2: 'Sert de support dynamique en phase de momentum haussier et de référence quantitative pour ajuster les stops suiveurs.',
      line3: 'Une tendance haussière saine se maintient durablement au-dessus de l\'EMA 20 ascendante sans rupture structurelle brutale.',
    },
  },
  {
    id: 'trailing-stop',
    en: {
      term: 'Trailing Stop-Loss',
      category: 'Risk Management',
      shortDef: 'An automated protective order that ratchets upward as market price advances.',
      line1: 'Locks in unrealized paper profits by automatically raising the protective liquidation floor as price ascends.',
      line2: 'Maintains a constant percentage or indicator buffer beneath the mark price, never adjusting downward under any market condition.',
      line3: 'Guarantees that a winning breakout cannot turn into a portfolio loss when market structure eventually reverses.',
    },
    fr: {
      term: 'Stop-Loss Suiveur',
      category: 'Gestion du Risque',
      shortDef: 'Ordre de protection automatisé qui s\'ajuste à la hausse à mesure que le cours progresse.',
      line1: 'Verrouille les gains latents en relevant automatiquement le seuil de protection lorsque le prix augmente.',
      line2: 'Conserve un écart constant en pourcentage ou basé sur la volatilité sous le cours, sans jamais redescendre quelles que soient les fluctuations.',
      line3: 'Garantit qu\'une cassure gagnante ne se transforme jamais en perte de portefeuille lors d\'un retournement de marché.',
    },
  },
  {
    id: 'perpetual-contract',
    en: {
      term: 'Perpetual Contract (Perp)',
      category: 'Market Infrastructure',
      shortDef: 'A derivative contract without an expiration date, tethered to index spot prices via funding rates.',
      line1: 'Allows market participants to hold directional long or short positions indefinitely without rolling over quarterly futures contracts.',
      line2: 'Anchored to spot market prices through periodic funding payments exchanged between long and short contract holders.',
      line3: 'Provides deep institutional liquidity and flexible leverage for algorithmic execution across major cryptocurrencies.',
    },
    fr: {
      term: 'Contrat Perpétuel (Perp)',
      category: 'Infrastructure de Marché',
      shortDef: 'Contrat dérivé sans date d\'échéance, indexé sur le cours spot via des taux de financement (funding rates).',
      line1: 'Permet aux acteurs de marché de maintenir des positions longues ou courtes indéfiniment sans roulement de contrats trimestriels.',
      line2: 'Amarré aux prix du marché spot via des paiements périodiques de financement échangés entre acheteurs et vendeurs.',
      line3: 'Offre une profondeur de liquidité institutionnelle et un effet de levier calibré pour l\'exécution algorithmique sur les cryptomonnaies majeures.',
    },
  },
  {
    id: 'orderbook-depth',
    en: {
      term: 'Orderbook Depth',
      category: 'Market Infrastructure',
      shortDef: 'The aggregate volume of resting limit buy and sell bids at various price intervals.',
      line1: 'Measures market liquidity and the resilience of an asset to absorb large market orders without substantial price slippage.',
      line2: 'High bid density acts as structural price support, while thin orderbooks indicate vulnerability to volatility spikes.',
      line3: 'Real-time WebSocket streaming continuously monitors depth imbalances to anticipate aggressive institutional accumulation.',
    },
    fr: {
      term: 'Profondeur du Carnet d\'Ordres',
      category: 'Infrastructure de Marché',
      shortDef: 'Volume cumulé des ordres limites d\'achat et de vente disposés à différents échelons de cours.',
      line1: 'Mesure la liquidité de marché et la résilience d\'un actif à absorber des ordres importants sans subir de glissement excessif.',
      line2: 'Une forte densité d\'ordres acheteurs constitue un support structurel, tandis qu\'un carnet clairsemé augmente la vulnérabilité à la volatilité.',
      line3: 'Le streaming continu WebSocket surveille les déséquilibres de profondeur pour anticiper l\'accumulation institutionnelle.',
    },
  },
  {
    id: 'mean-reversion',
    en: {
      term: 'Mean Reversion',
      category: 'Quantitative Strategy',
      shortDef: 'A mathematical theory suggesting asset prices and historical returns eventually return to their long-term average.',
      line1: 'Assumes that extreme price deviations from moving averages or statistical envelopes will eventually snap back toward the mean.',
      line2: 'Executed via dynamic limit order ladders placed near Bollinger Bands when the market ADX confirms a low-trend regime.',
      line3: 'Captures consistent yield in sideways consolidating markets while avoiding trend exhaustion traps.',
    },
    fr: {
      term: 'Retour à la Moyenne',
      category: 'Stratégie Quantitative',
      shortDef: 'Théorie mathématique postulant que les cours et rendements finissent par converger vers leur moyenne historique.',
      line1: 'Repose sur le principe que les écarts extrêmes par rapport aux moyennes mobiles ou enveloppes statistiques tendent à se résorber.',
      line2: 'Exécuté via des grilles d\'ordres limites dynamiques proches des bandes de Bollinger quand l\'ADX confirme l\'absence de tendance forte.',
      line3: 'Génère un rendement régulier dans les marchés latéraux tout en évitant les pièges d\'épuisement de tendance.',
    },
  },
  {
    id: 'bollinger-bands',
    en: {
      term: 'Bollinger Bands',
      category: 'Quantitative Strategy',
      shortDef: 'A statistical volatility indicator consisting of a moving average and two standard deviation envelopes.',
      line1: 'Measures volatility expansion and contraction by placing upper and lower bands 2 standard deviations away from a 20-period moving average.',
      line2: 'Band contraction (squeeze) signals impending explosive breakout momentum, while touches of outer bands define overextended envelopes.',
      line3: 'Provides dynamic boundary limits for automated grid laddering during range-bound market conditions.',
    },
    fr: {
      term: 'Bandes de Bollinger',
      category: 'Stratégie Quantitative',
      shortDef: 'Indicateur de volatilité statistique composé d\'une moyenne mobile et de deux bandes d\'écart-type.',
      line1: 'Mesure la contraction et l\'expansion de la volatilité en disposant des bandes à 2 écarts-types d\'une moyenne mobile à 20 périodes.',
      line2: 'Le resserrement des bandes signale l\'imminence d\'une cassure explosive, tandis que les contacts avec les bornes délimitent les zones de sur-extension.',
      line3: 'Fournit des bornes dynamiques pour le placement automatique d\'ordres limites lors de phases de consolidation.',
    },
  },
  {
    id: 'websocket-stream',
    en: {
      term: 'Binance WebSocket Stream',
      category: 'Market Infrastructure',
      shortDef: 'Full-duplex, low-latency TCP communication protocol streaming real-time exchange ticks and orderbook diffs.',
      line1: 'Eliminates HTTP polling overhead by maintaining a persistent bidirectional connection directly to exchange matching engines.',
      line2: 'Delivers sub-millisecond price ticks, trade executions, and 24-hour aggregate ticker statistics without client-side lag.',
      line3: 'Enables deterministic state synchronization for algorithmic paper trading engines and quantitative charts.',
    },
    fr: {
      term: 'Flux Binance WebSocket Stream',
      category: 'Infrastructure de Marché',
      shortDef: 'Protocole TCP bidirectionnel ultra-faible latence diffusant les ticks d\'échange et variations du carnet d\'ordres en temps réel.',
      line1: 'Élimine la surcharge des requêtes HTTP en maintenant une connexion persistante directe avec les moteurs d\'appariement de l\'exchange.',
      line2: 'Délivre des ticks de cours sub-milliseconde, des exécutions d\'ordres et les statistiques 24h agrégées sans décalage côté client.',
      line3: 'Permet une synchronisation déterministe de l\'état pour les moteurs de simulation et les graphiques quantitatifs.',
    },
  },
  {
    id: 'macd',
    en: {
      term: 'MACD (Moving Average Convergence Divergence)',
      category: 'Quantitative Strategy',
      shortDef: 'A trend-following momentum indicator displaying the relationship between two moving averages.',
      line1: 'Subtracts the 26-period EMA from the 12-period EMA to reveal directional momentum velocity and acceleration.',
      line2: 'A bullish signal crossover occurs when the fast MACD line crosses above the 9-period signal line, confirming breakout conviction.',
      line3: 'Histogram divergence signals potential trend exhaustion, allowing the risk engine to tighten trailing stop thresholds.',
    },
    fr: {
      term: 'MACD (Moving Average Convergence Divergence)',
      category: 'Stratégie Quantitative',
      shortDef: 'Indicateur de momentum de suivi de tendance illustrant la relation entre deux moyennes mobiles exponentielles.',
      line1: 'Soustrait l\'EMA 26 périodes de l\'EMA 12 périodes pour révéler la vélocité et l\'accélération du momentum directionnel.',
      line2: 'Un signal d\'achat se déclenche lorsque la ligne rapide MACD croise à la hausse la ligne de signal à 9 périodes, confirmant la dynamique.',
      line3: 'Les divergences sur l\'histogramme anticipent l\'épuisement de la tendance, permettant au moteur de risque de resserrer les stops de protection.',
    },
  },
  {
    id: 'rsi',
    en: {
      term: 'RSI (Relative Strength Index)',
      category: 'Quantitative Strategy',
      shortDef: 'A bounded momentum oscillator measuring the speed and magnitude of recent price changes.',
      line1: 'Evaluates momentum velocity on a 0 to 100 index scale, traditionally marking levels above 70 as overbought and below 30 as oversold.',
      line2: 'During strong trending regimes, RSI equilibrium shifts upward into a 45 to 80 continuation band rather than immediate reversal.',
      line3: 'Acts as a confirmation filter preventing new long entries when price momentum reaches extreme exhaustion spikes.',
    },
    fr: {
      term: 'RSI (Relative Strength Index)',
      category: 'Stratégie Quantitative',
      shortDef: 'Oscillateur borné mesurant la vitesse et l\'ampleur des variations récentes de cours pour évaluer le surachat ou la survente.',
      line1: 'Évalue la vélocité du momentum sur une échelle de 0 à 100, identifiant traditionnellement les zones au-dessus de 70 comme surachetées et sous 30 comme survendues.',
      line2: 'En régime de tendance forte, la zone d\'équilibre du RSI s\'élève entre 45 et 80, traduisant une continuation plutôt qu\'un retournement immédiat.',
      line3: 'Fait office de filtre de confirmation évitant les prises de position longues lorsque le momentum atteint des niveaux d\'épuisement extrême.',
    },
  },
  {
    id: 'smart-momentum',
    en: {
      term: 'Smart Momentum Module',
      category: 'Quantitative Strategy',
      shortDef: 'Automated quantitative breakout engine combining Donchian channels with abnormal volume verification.',
      line1: 'Monitors 20-period price highs and validates breakouts only when trading volume exceeds 2.0x the 20-period moving average.',
      line2: 'Prevents low-liquidity whipsaws by verifying cross-broker orderbook bid density before authorizing automated order execution.',
      line3: 'Seamlessly coordinates with the Kelly Criterion risk governor to establish dynamic trailing stops upon fill confirmation.',
    },
    fr: {
      term: 'Module Smart Momentum',
      category: 'Stratégie Quantitative',
      shortDef: 'Moteur de cassure quantitative automatisé combinant canaux de Donchian et validation par volume anormal.',
      line1: 'Surveille les sommets de prix sur 20 périodes et ne valide les cassures que lorsque le volume dépasse 2,0x sa moyenne mobile.',
      line2: 'Prévient les faux signaux dans les phases peu liquides en vérifiant la densité d\'achat du carnet d\'ordres avant d\'autoriser l\'ordre.',
      line3: 'Se synchronise instantanément avec le critère de Kelly pour calibrer des stops suiveurs dynamiques dès confirmation d\'exécution.',
    },
  },
  {
    id: 'market-liquidity',
    en: {
      term: 'Market Liquidity',
      category: 'Market Infrastructure',
      shortDef: 'The ease with which a digital asset can be rapidly bought or sold without causing a significant price change.',
      line1: 'Determined by the aggregate depth of resting limit orders, 24-hour trading volume, and active market maker participation.',
      line2: 'The platform enforces strict $10,000,000 minimum quote volume filters across 300+ trading pairs to exclude illiquid tokens.',
      line3: 'High liquidity guarantees that simulated and live orders execute with minimal spread cost and deterministic slippage.',
    },
    fr: {
      term: 'Liquidité de Marché',
      category: 'Infrastructure de Marché',
      shortDef: 'Facilité avec laquelle un actif peut être acheté ou vendu rapidement sans provoquer de variation majeure de cours.',
      line1: 'Déterminée par la profondeur cumulée des ordres limites, le volume d\'échange sur 24 heures et la participation des teneurs de marché.',
      line2: 'La plateforme applique des filtres stricts de volume minimal de 10 000 000 $ sur plus de 300 paires pour exclure les jetons illiquides.',
      line3: 'Une liquidité élevée garantit l\'exécution des ordres avec un spread minimal et un glissement (slippage) parfaitement maîtrisé.',
    },
  },
  {
    id: 'funding-rate',
    en: {
      term: 'Funding Rate',
      category: 'Market Infrastructure',
      shortDef: 'Periodic payments exchanged between long and short perpetual contract holders to balance futures with spot.',
      line1: 'Prevents perpetual derivative prices from diverging permanently from the underlying index spot benchmark price.',
      line2: 'When funding is positive, long position holders pay shorts, reflecting dominant bullish market sentiment and leverage demand.',
      line3: 'Extreme funding rate imbalances act as a contrarian indicator of crowded positioning and potential liquidation cascades.',
    },
    fr: {
      term: 'Taux de Financement (Funding Rate)',
      category: 'Infrastructure de Marché',
      shortDef: 'Paiements réguliers échangés entre acheteurs et vendeurs de contrats perpétuels pour aligner le cours dérivé sur le cours spot.',
      line1: 'Empêche le cours des contrats perpétuels de diverger durablement du prix de référence au comptant de l\'indice sous-jacent.',
      line2: 'Quand le taux est positif, les positions longues paient les courtes, reflétant un sentiment haussier dominant et une forte demande de levier.',
      line3: 'Les déséquilibres extrêmes de taux de financement constituent un signal contrarien de positionnement encombré et de risque de liquidation en cascade.',
    },
  },
  {
    id: 'tradingview',
    en: {
      term: 'TradingView Engine',
      category: 'Market Infrastructure',
      shortDef: 'Hardware-accelerated financial visualization engine supporting multi-timeframe financial analysis.',
      line1: 'Renders sub-millisecond candlestick charts with customized institutional indicator overlays and interactive drawing tools.',
      line2: 'Utilizes HTML5 Canvas and WebGL acceleration to maintain 60 FPS rendering under rapid sub-second WebSocket data streams.',
      line3: 'Provides institutional chart density and deep historical inspection for quantitative analysis across market cycles.',
    },
    fr: {
      term: 'Moteur Graphique TradingView',
      category: 'Infrastructure de Marché',
      shortDef: 'Moteur de visualisation financière accéléré par matériel prenant en charge l\'analyse multi-unités de temps.',
      line1: 'Affiche des graphiques en chandeliers japonais instantanés avec indicateurs institutionnels personnalisés et outils de tracé interactifs.',
      line2: 'Exploite l\'accélération HTML5 Canvas et WebGL pour maintenir un taux de rafraîchissement à 60 FPS sous des flux WebSocket intensifs.',
      line3: 'Offre une densité visuelle professionnelle et une inspection historique approfondie pour l\'analyse quantitative à travers les cycles de marché.',
    },
  },
  {
    id: 'cross-arbitrage',
    en: {
      term: 'Cross-Broker Arbitrage',
      category: 'Quantitative Strategy',
      shortDef: 'Exploiting micro price discrepancies of the same asset across distinct exchange orderbooks.',
      line1: 'Monitors sub-second price variations between major exchange matching engines (e.g. Binance, Coinbase, Bybit).',
      line2: 'Identifies temporary liquidity dislocations to confirm whether a price movement is systemic or isolated to a single broker.',
      line3: 'Enforces uniform pricing integrity across the platform surveillance pipeline before validating trade execution triggers.',
    },
    fr: {
      term: 'Arbitrage Multi-Courtiers',
      category: 'Stratégie Quantitative',
      shortDef: 'Exploitation des micro-écarts de cours d\'un même actif entre les carnets d\'ordres de différentes plateformes.',
      line1: 'Surveille les variations de cours sub-seconde entre les moteurs d\'appariement des principales bourses (Binance, Coinbase, Bybit).',
      line2: 'Identifie les anomalies temporaires de liquidité pour vérifier si un mouvement de prix est systémique ou propre à une seule plateforme.',
      line3: 'Garantit la cohérence des prix dans le pipeline de surveillance avant de valider tout déclencheur d\'ordre.',
    },
  },
  {
    id: 'slippage',
    en: {
      term: 'Execution Slippage',
      category: 'Market Infrastructure',
      shortDef: 'The difference between the expected price of a trade and the price at which the order is actually executed.',
      line1: 'Occurs during periods of extreme volatility or when order sizes exceed immediate top-of-book market liquidity.',
      line2: 'Algorithmic smart routing minimizes slippage by staggering fills across sub-second execution intervals.',
      line3: 'Maintaining sub-0.005% average slippage is critical for institutional quantitative profitability.',
    },
    fr: {
      term: 'Glissement d\'Exécution (Slippage)',
      category: 'Infrastructure de Marché',
      shortDef: 'Différence entre le prix attendu lors de l\'envoi d\'un ordre et le cours auquel l\'ordre est réellement exécuté.',
      line1: 'Survient lors de phases de forte volatilité ou lorsque la taille de l\'ordre excède la liquidité disponible au sommet du carnet.',
      line2: 'Le routage algorithmique intelligent réduit le slippage en échelonnant les exécutions sur des intervalles sub-seconde.',
      line3: 'Maintenir un slippage moyen inférieur à 0,005 % est indispensable à la rentabilité des stratégies quantitatives institutionnelles.',
    },
  },
  {
    id: 'llama-groq',
    en: {
      term: 'Groq LLaMA 3.3 70B Synthesis',
      category: 'AI & Analytics',
      shortDef: 'Ultra-low latency natural language processing generating structured daily financial market briefings.',
      line1: 'Processes macroeconomic news releases, regulatory developments, and social narrative momentum through Groq LPU hardware.',
      line2: 'Transforms unstructured multi-source text into normalized numerical sentiment vectors (-1.0 to +1.0) and structured briefings.',
      line3: 'Acts as an automated intelligence governor, vetting technical breakout setups against broader macroeconomic market conditions.',
    },
    fr: {
      term: 'Synthèse Groq LLaMA 3.3 70B',
      category: 'IA & Analytique',
      shortDef: 'Traitement du langage naturel ultra-rapide générant des synthèses quotidiennes structurées des marchés financiers.',
      line1: 'Traite les actualités macroéconomiques, annonces réglementaires et dynamiques sociales via le matériel dédié Groq LPU.',
      line2: 'Convertit les textes multi-sources non structurés en vecteurs numériques normalisés (-1,0 à +1,0) et synthèses structurées.',
      line3: 'Agit comme filtre décisionnel automatisé, confrontant les signaux techniques aux conditions macroéconomiques globales.',
    },
  },
  {
    id: 'pnl',
    en: {
      term: 'PnL (Profit and Loss)',
      category: 'Risk Management',
      shortDef: 'The net financial gain or loss realized or open across trading vectors.',
      line1: 'Distinguishes between unrealized (floating mark-to-market paper gains) and realized (closed capital) returns.',
      line2: 'Calculated in real time from WebSocket price ticks against entry execution benchmarks.',
      line3: 'Provides fundamental telemetry for calculating algorithmic Sharpe ratios and calibrating Kelly allocation fractions.',
    },
    fr: {
      term: 'PnL (Gains et Pertes)',
      category: 'Gestion du Risque',
      shortDef: 'Résultat financier net réalisé ou latent enregistré sur l\'ensemble des positions de trading.',
      line1: 'Distingue les gains latents (évaluation mark-to-market en cours) des gains réalisés (positions clôturées en capital).',
      line2: 'Calculé en temps réel à partir des ticks de prix WebSocket par rapport aux cours moyens d\'exécution des positions.',
      line3: 'Fournit la télémétrie essentielle pour calculer le ratio de Sharpe algorithmique et ajuster le dimensionnement de Kelly.',
    },
  },
  {
    id: 'volatility-regime',
    en: {
      term: 'Volatility Regime',
      category: 'Quantitative Strategy',
      shortDef: 'The prevailing statistical state of market price fluctuations (compressed vs expanded).',
      line1: 'Classifies current market behavior into distinct operational states using Average True Range (ATR) and Bollinger Band width.',
      line2: 'Low-volatility compression regimes precede major breakout surges; high-volatility regimes require tighter risk caps.',
      line3: 'Strategy parameters automatically modulate order sizing and profit targets according to the active regime.',
    },
    fr: {
      term: 'Régime de Volatilité',
      category: 'Stratégie Quantitative',
      shortDef: 'État statistique dominant des fluctuations de cours d\'un actif (compression vs expansion).',
      line1: 'Catégorise le comportement du marché selon des états opérationnels distincts via l\'Average True Range (ATR) et la largeur des bandes de Bollinger.',
      line2: 'Les phases de compression à faible volatilité précèdent les fortes cassures ; les régimes de haute volatilité imposent un contrôle du risque resserré.',
      line3: 'Les paramètres stratégiques adaptent automatiquement la taille des ordres et les objectifs de prise de bénéfices selon le régime actif.',
    },
  },
];

/**
 * Normalizes input language string to 'en' or 'fr'.
 */
function normalizeLang(lang?: string): 'en' | 'fr' {
  if (!lang) return 'en';
  return lang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

/**
 * Returns localized glossary entries for a given language.
 */
export function getGlossaryEntries(lang: string = 'en'): LocalizedGlossaryEntry[] {
  const l = normalizeLang(lang);
  return BILINGUAL_GLOSSARY_DATA.map((item) => ({
    id: item.id,
    ...item[l],
  }));
}

/**
 * Returns a localized 3-line structured definition for hover tooltips.
 */
export function getGlossaryDef(id: string, lang: string = 'en'): string {
  const l = normalizeLang(lang);
  const entry = BILINGUAL_GLOSSARY_DATA.find((e) => e.id === id);
  if (!entry) return '';
  const c = entry[l];
  return `${c.line1} ${c.line2} ${c.line3}`;
}

/**
 * Returns a single localized glossary item by ID.
 */
export function getGlossaryItem(id: string, lang: string = 'en'): LocalizedGlossaryEntry | undefined {
  const l = normalizeLang(lang);
  const entry = BILINGUAL_GLOSSARY_DATA.find((e) => e.id === id);
  if (!entry) return undefined;
  return {
    id: entry.id,
    ...entry[l],
  };
}

// Deprecated export for backwards compatibility
export const CRYPTO_GLOSSARY_ENTRIES: GlossaryEntry[] = getGlossaryEntries('en');
