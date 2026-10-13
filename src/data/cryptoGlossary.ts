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
  // Healthcare & Systems Engineering (Donnons.ch)
  {
    id: 'donor-deferral',
    en: {
      term: 'Donor Deferral (30% Rate)',
      category: 'Healthcare Engineering',
      shortDef: 'The proportion of voluntary corporate blood donors turned away on-site due to clinical criteria.',
      line1: 'Measures the friction where willing donors travel to collection points but face deferral due to unrecognized medical criteria.',
      line2: 'Involves strict Swiss Transfusion SRC regulations spanning recent travel, dental care, iron deficiency, or medications.',
      line3: 'Donnons.ch resolves this by pre-qualifying volunteers upstream through playful interactive triage.',
    },
    fr: {
      term: 'Différentiel de Rejet (30%)',
      category: 'Ingénierie Santé',
      shortDef: 'Proportion de donneurs volontaires ajournés sur place en entreprise pour motifs médicaux.',
      line1: 'Désigne la déperdition où des volontaires se déplacent sur le lieu de collecte mais sont refusés pour des critères cliniques ignorés.',
      line2: 'Englobe les directives strictes de Transfusion Suisse CRS : voyages récents, soins dentaires, anémie ou prises médicamenteuses.',
      line3: 'Donnons.ch résorbe ce différentiel en qualifiant l\'éligibilité en amont de façon anonyme et ludique.',
    },
  },
  {
    id: 'onedoc-sync',
    en: {
      term: 'OneDoc Synchronization',
      category: 'Healthcare Engineering',
      shortDef: 'Automated integration bridging volunteer registrations with Swiss clinical scheduling systems.',
      line1: 'Orchestrates bi-directional data flow between web platforms and Geneva University Hospitals (HUG) booking pipelines.',
      line2: 'Prevents donor bottlenecking by leveling throughput across appointment slots during mobile blood drives.',
      line3: 'Ensures real-time schedule alignment without manual administrative interventions or scheduling conflicts.',
    },
    fr: {
      term: 'Synchronisation OneDoc',
      category: 'Ingénierie Santé',
      shortDef: 'Protocole d\'intégration reliant les inscriptions de donneurs aux plannings cliniques suisses.',
      line1: 'Orchestre les flux de données bidirectionnels entre la plateforme web et les créneaux des Hôpitaux Universitaires de Genève (HUG).',
      line2: 'Évite l\'engorgement des collectes mobiles en lissant la cadence des rendez-vous des donneurs en entreprise.',
      line3: 'Garantit l\'alignement en temps réel des plannings médicaux sans ressaisie administrative manuelle.',
    },
  },
  {
    id: 'label-cts',
    en: {
      term: 'Label CTS Accreditation',
      category: 'Healthcare Engineering',
      shortDef: 'Official distinction awarded by Geneva University Hospitals certifying corporate blood drive sponsorship.',
      line1: 'Recognizes partner companies achieving verified employee participation milestones in mobile blood donation campaigns.',
      line2: 'Drives corporate social responsibility (CSR) engagement through tiered Gold, Silver, and Bronze recognition.',
      line3: 'Translates employee turnout into measurable public health metrics and community impact forecasting.',
    },
    fr: {
      term: 'Label CTS (Centre de Transfusion)',
      category: 'Ingénierie Santé',
      shortDef: 'Distinction officielle des HUG certifiant l\'engagement citoyen des entreprises partenaires.',
      line1: 'Reconnaît les entreprises partenaires atteignant des seuils certifiés de mobilisation salariale lors des collectes de sang.',
      line2: 'Valorise l\'engagement RSE par des échelons d\'accréditation Or, Argent et Bronze selon la fidélité et la participation.',
      line3: 'Traduit la participation en métriques d\'impact sanitaire direct pour la collectivité genevoise.',
    },
  },
  // Serverless & Web Architecture (Private Event Platform)
  {
    id: 'serverless-architecture',
    en: {
      term: 'Serverless Architecture',
      category: 'Cloud Architecture',
      shortDef: 'Cloud execution paradigm executing backend functions on demand with zero dedicated servers.',
      line1: 'Eliminates ongoing server maintenance costs and idle database instances by executing logic purely via event triggers.',
      line2: 'Enables high scalability during event RSVP spikes without paying monthly server or database hosting fees.',
      line3: 'Google Apps Script serves as a zero-cost serverless middleware bridging web forms with cloud spreadsheets.',
    },
    fr: {
      term: 'Architecture Serverless',
      category: 'Architecture Cloud',
      shortDef: 'Modèle d\'exécution cloud exécutant des fonctions à la demande sans serveur dédié.',
      line1: 'Supprime les coûts d\'hébergement fixes et les bases de données inactives en exécutant le code uniquement sur événement.',
      line2: 'Absorbe les pics de fréquentation des inscriptions sans nécessiter de maintenance d\'infrastructure permanente.',
      line3: 'Google Apps Script assure le rôle de middleware serverless gratuit reliant formulaires web et tableurs cloud.',
    },
  },
  {
    id: 'no-cors-mode',
    en: {
      term: 'no-cors Request Mode',
      category: 'Web Protocols',
      shortDef: 'Fetch policy enabling asynchronous cross-origin payloads while bypassing browser CORS constraints.',
      line1: 'Dispatches opaque POST requests to third-party endpoints without requiring strict Cross-Origin preflight headers.',
      line2: 'Guarantees reliable RSVP submission across strict mobile browsers (Safari iOS, Chrome Mobile) with zero rejection.',
      line3: 'Enables atomic data logging directly into spreadsheet backends without exposing server credentials.',
    },
    fr: {
      term: 'Mode no-cors',
      category: 'Protocoles Web',
      shortDef: 'Politique fetch autorisant l\'envoi de requêtes cross-origin en contournant les restrictions CORS du navigateur.',
      line1: 'Expédie des requêtes POST opaques vers des endpoints tiers sans nécessiter de négociations d\'en-têtes pré-vol stricts.',
      line2: 'Garantit la transmission fiable des réponses sur navigateurs mobiles stricts (Safari iOS, Chrome) sans blocage.',
      line3: 'Permet l\'enregistrement atomique des données directement dans un tableur distant sans exposer d\'identifiants serveurs.',
    },
  },
  {
    id: 'magic-link',
    en: {
      term: 'Magic Link Access Control',
      category: 'Security & Access',
      shortDef: 'Tokenized URL query parameter granting private role access without password authentication.',
      line1: 'Embeds cryptographically unique tokens into invitation links to conditionally unlock restricted event options.',
      line2: 'Eliminates user registration friction by granting immediate access based on the verified incoming URL.',
      line3: 'Enables fine-grained permission control (e.g. dinner vs cocktail reception access) with 100% intake accuracy.',
    },
    fr: {
      term: 'Contrôle d\'Accès Magic Link',
      category: 'Sécurité & Accès',
      shortDef: 'Jeton sécurisé en paramètre d\'URL déverrouillant des droits privés sans saisie de mot de passe.',
      line1: 'Intègre des jetons cryptographiques uniques dans les liens d\'invitation pour déverrouiller des options privées.',
      line2: 'Supprime la friction de création de compte en accordant les droits d\'accès dès l\'ouverture de la page.',
      line3: 'Gère les permissions granulaires (accès dîner vs apéritif) avec une précision absolue des inscriptions.',
    },
  },
  {
    id: 'atomic-insert',
    en: {
      term: 'Atomic Row Append',
      category: 'Data Engineering',
      shortDef: 'An indivisible database write operation ensuring data integrity across concurrent submissions.',
      line1: 'Prevents race conditions when multiple invitees submit their RSVPs simultaneously within milliseconds.',
      line2: 'Appends each record sequentially as a single unbroken transaction without risk of row overwrite.',
      line3: 'Ensures 100% headcount accuracy for catering and venue planning directly within spreadsheet data structures.',
    },
    fr: {
      term: 'Insertion Atomique',
      category: 'Ingénierie des Données',
      shortDef: 'Opération d\'écriture indivisible garantissant l\'intégrité des données lors d\'envois simultanés.',
      line1: 'Empêche les collisions de données lorsque plusieurs invités valident leur formulaire à la même milliseconde.',
      line2: 'Ajoute chaque ligne de manière séquentielle et inaltérable sans risque d\'écrasement de données concurrentes.',
      line3: 'Garantit une exactitude totale du décompte des convives pour les traiteurs directement dans le tableur.',
    },
  },
  // Digital Humanities & Epistemology (Lexicon Platform)
  {
    id: 'ontology',
    en: {
      term: 'Ontology',
      category: 'Epistemology & Logic',
      shortDef: 'The philosophical and logical study of being, existence, and the structural categories of reality.',
      line1: 'Investigates what entities fundamentally exist and how they are classified into hierarchical metaphysical types.',
      line2: 'Provides formal conceptual foundations for knowledge graphs, semantic webs, and categorical reasoning systems.',
      line3: 'Structures lexical databases by defining essential properties, relations, and taxonomies across human thought.',
    },
    fr: {
      term: 'Ontologie',
      category: 'Épistémologie & Logique',
      shortDef: 'Étude philosophique et formelle de la nature de l\'être, de l\'existence et des catégories du réel.',
      line1: 'Examine quelles entités existent fondamentalement et comment elles se structurent en catégories métaphysiques.',
      line2: 'Constitue le socle formel des graphes de connaissances, du web sémantique et des systèmes de raisonnement.',
      line3: 'Structure les moteurs lexicaux en établissant les propriétés essentielles et les relations conceptuelles du savoir.',
    },
  },
  {
    id: 'epistemology',
    en: {
      term: 'Epistemology',
      category: 'Philosophy of Science',
      shortDef: 'The critical investigation into the nature, validity, scope, and justification of human knowledge.',
      line1: 'Examines criteria distinguishing justified true belief from mere opinion, speculation, or cognitive bias.',
      line2: 'Establishes the rational foundation of the scientific method through empirical verification and deductive rigor.',
      line3: 'Guides academic lexicography by tracing how foundational concepts evolve and gain formal scientific acceptance.',
    },
    fr: {
      term: 'Épistémologie',
      category: 'Philosophie des Sciences',
      shortDef: 'Étude critique de la nature, de la validité, de la portée et de la justification de la connaissance.',
      line1: 'Examine les critères rationnels distinguant la croyance vraie et justifiée de la simple opinion ou de la spéculation.',
      line2: 'Fonde la démarche scientifique moderne par l\'expérimentation empirique et la déduction formelle rigoureuse.',
      line3: 'Guide la lexicographie savante en retraçant l\'évolution et la validation des concepts à travers l\'histoire.',
    },
  },
  {
    id: 'entropy',
    en: {
      term: 'Entropy',
      category: 'Thermodynamics & Information',
      shortDef: 'A fundamental measure of microscopic disorder, state irreversibility, and informational uncertainty.',
      line1: 'Governs the thermodynamic arrow of time, stating that isolated physical systems naturally evolve toward maximal disorder.',
      line2: 'In information theory (Shannon entropy), quantifies the expected surprise or average information contained in a message.',
      line3: 'Bridges physics and computer science by describing irreversible transformations and data compression limits.',
    },
    fr: {
      term: 'Entropie',
      category: 'Thermodynamique & Information',
      shortDef: 'Mesure fondamentale du désordre microscopique, de l\'irréversibilité et de l\'incertitude informationnelle.',
      line1: 'Régule la flèche du temps thermodynamique : tout système physique isolé évolue spontanément vers un désordre maximal.',
      line2: 'En théorie de l\'information (entropie de Shannon), quantifie la quantité moyenne d\'information transmise par un message.',
      line3: 'Relie la physique à l\'informatique en formalisant les limites de compression et les processus irréversibles.',
    },
  },
  {
    id: 'causality',
    en: {
      term: 'Causality',
      category: 'Theoretical Physics & Logic',
      shortDef: 'The invariant principle stating that no physical effect can precede its antecedent cause.',
      line1: 'Preserves relativistic spacetime ordering by restricting signal propagation to speeds at or below the speed of light.',
      line2: 'Underpins deterministic logic and chronological reasoning, preventing paradoxes in physical systems.',
      line3: 'Serves as the structural spine of historical timelines and causal relationship graphs in digital archives.',
    },
    fr: {
      term: 'Causalité',
      category: 'Physique Théorique & Logique',
      shortDef: 'Principe universel stipulant qu\'aucun effet physique ne peut précéder sa cause antérieure.',
      line1: 'Préserve la structure de l\'espace-temps relativiste en limitant la propagation des signaux à la vitesse de la lumière.',
      line2: 'Fonde la logique déterministe et le raisonnement chronologique, empêchant les paradoxes dans les systèmes physiques.',
      line3: 'Structure la frise historique et les graphes de filiation intellectuelle dans les bases de données savantes.',
    },
  },
  {
    id: 'scholasticism',
    en: {
      term: 'Scholasticism',
      category: 'Medieval Epistemology',
      shortDef: 'Medieval academic method synthesizing formal Aristotelian logic with rigorous textual disputation.',
      line1: 'Developed structured debate techniques (disputatio) to resolve conceptual contradictions within authoritative texts.',
      line2: 'Forged the standardized academic vocabulary that laid the groundwork for modern European university education.',
      line3: 'Demonstrates historical rigor in terminology by categorizing nuances of essence, substance, and logical predicates.',
    },
    fr: {
      term: 'Scolastique',
      category: 'Épistémologie Médiévale',
      shortDef: 'Méthode universitaire médiévale articulant logique aristotélicienne et dispute contradictoire rigoureuse.',
      line1: 'Développe la technique formelle de la disputatio pour résoudre les contradictions apparentes des grands traités.',
      line2: 'Forge le vocabulaire académique rigoureux qui a servi de socle aux premières universités européennes.',
      line3: 'Illustre la précision terminologique par la catégorisation fine de l\'essence, de la substance et des prédicats logiques.',
    },
  },
  // Bachelor Modalities, IP & Academic Framework (Bachelor Pitch)
  {
    id: 'nda',
    en: {
      term: 'Non-Disclosure Agreement (NDA)',
      category: 'Legal & Intellectual Property',
      shortDef: 'A legally binding bilateral contract ensuring trade secrets and project data remain strictly confidential.',
      line1: 'Guarantees complete protection of proprietary algorithms, client business data, and unreleased source code.',
      line2: 'Enables secure engineering collaboration with external companies during academic bachelor thesis mandates.',
      line3: 'Includes strict non-use covenants, proprietary trade secret protections, and institutional HEIG-VD compliance.',
    },
    fr: {
      term: 'Accord de Confidentialité (NDA)',
      category: 'Droit & Propriété Intellectuelle',
      shortDef: 'Contrat juridique bilatéral protégeant le secret industriel et les données sensibles du projet.',
      line1: 'Garantit la protection intégrale des algorithmes propriétaires, données métiers et codes sources non publiés.',
      line2: 'Permet une collaboration en entreprise en toute sécurité juridique dans le cadre d\'un travail de Bachelor.',
      line3: 'Intègre des clauses strictes de non-divulgation conformes aux standards académiques et industriels de la HEIG-VD.',
    },
  },
  {
    id: 'ip-transfer',
    en: {
      term: 'Intellectual Property Assignment',
      category: 'Legal & Intellectual Property',
      shortDef: 'Complete contractual cession transferring software copyrights and assets to the commissioning company.',
      line1: 'Transfers all economic rights, repository source code, and deployment artifacts directly to the client upon completion.',
      line2: 'Ensures the partner enterprise retains 100% unencumbered commercial exploitation and licensing freedom.',
      line3: 'The academic institution preserves only the right of pedagogical evaluation without claiming software ownership.',
    },
    fr: {
      term: 'Cession de Propriété Intellectuelle',
      category: 'Droit & Propriété Intellectuelle',
      shortDef: 'Transfert contractuel intégral des droits d\'auteur et codes sources vers l\'entreprise mandataire.',
      line1: 'Transfère l\'ensemble des droits patrimoniaux, dépôts de code et livrables directement au partenaire dès la clôture.',
      line2: 'Garantit à l\'entreprise une pleine liberté d\'exploitation commerciale, d\'évolution et de valorisation industrielle.',
      line3: 'L\'école (HEIG-VD) ne conserve aucun droit patrimonial sur le logiciel, intervenant uniquement pour l\'évaluation.',
    },
  },
  {
    id: 'project-specifications',
    en: {
      term: 'Project Specifications (Cahier des Charges)',
      category: 'Engineering Management',
      shortDef: 'Formal engineering contract stipulating functional requirements, technical scope, and acceptance criteria.',
      line1: 'Defines deliverables, architectural milestones, performance thresholds, and quality assurance criteria.',
      line2: 'Acts as the contractual boundary preventing scope creep throughout the 16-week engineering execution window.',
      line3: 'Co-signed by the enterprise mentor, the academic professor, and the student engineer prior to development.',
    },
    fr: {
      term: 'Cahier des Charges Formel',
      category: 'Ingénierie & Gestion de Projet',
      shortDef: 'Document contractuel fixant les exigences fonctionnelles, le périmètre technique et les critères de validation.',
      line1: 'Définit les livrables, jalons d\'architecture, seuils de performance et critères d\'assurance qualité.',
      line2: 'Sert de référence contractuelle pour prévenir les dérives de périmètre sur l\'ensemble des 16 semaines du Bachelor.',
      line3: 'Co-signé par l\'entreprise mandataire, le professeur répondant et l\'ingénieur étudiant avant le début des travaux.',
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
 * Returns a localized concise 2-4 lines definition for hover tooltips and dialogs.
 */
export function getGlossaryDef(id: string, lang: string = 'en'): string {
  const l = normalizeLang(lang);
  const entry = BILINGUAL_GLOSSARY_DATA.find((e) => e.id === id);
  if (!entry) return '';
  const c = entry[l];
  return `${c.shortDef} ${c.line1}`;
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
