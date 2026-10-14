import React from 'react';

interface CryptoIconProps {
  symbol: string;
  size?: number;
  className?: string;
}

export const CryptoIcon: React.FC<CryptoIconProps> = ({
  symbol,
  size = 24,
  className = '',
}) => {
  const cleanSymbol = (symbol || '').toUpperCase().trim();

  switch (cleanSymbol) {
    case 'BTC':
    case 'BITCOIN':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Bitcoin"
        >
          <circle cx="16" cy="16" r="16" fill="#F7931A" />
          <path
            fill="#FFF"
            fillRule="nonzero"
            d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
          />
        </svg>
      );

    case 'ETH':
    case 'ETHEREUM':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Ethereum"
        >
          <circle cx="16" cy="16" r="16" fill="#627EEA" />
          <g fill="#FFF" fillRule="nonzero">
            <path fillOpacity="0.602" d="M16.498 4v8.87l7.497 3.35z" />
            <path d="M16.498 4L9 16.22l7.498-3.35z" />
            <path fillOpacity="0.602" d="M16.498 21.968v6.027L24 17.616z" />
            <path d="M16.498 27.995v-6.028L9 17.616z" />
            <path fillOpacity="0.2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
            <path fillOpacity="0.602" d="M9 16.22l7.498 4.353v-7.701z" />
          </g>
        </svg>
      );

    case 'SOL':
    case 'SOLANA':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Solana"
        >
          <circle cx="16" cy="16" r="16" fill="#10141E" />
          <defs>
            <linearGradient id={`sol-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9945FF" />
              <stop offset="50%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#14F195" />
            </linearGradient>
          </defs>
          <path
            d="M9.925 19.687a.59.59 0 01.415-.17h14.366a.29.29 0 01.207.497l-2.838 2.815a.59.59 0 01-.415.171H7.294a.291.291 0 01-.207-.498l2.838-2.815zm0-10.517A.59.59 0 0110.34 9h14.366c.261 0 .392.314.207.498l-2.838 2.815a.59.59 0 01-.415.17H7.294a.291.291 0 01-.207-.497L9.925 9.17zm12.15 5.225a.59.59 0 00-.415-.17H7.294a.291.291 0 00-.207.498l2.838 2.815c.11.109.26.17.415.17h14.366a.291.291 0 00.207-.498l-2.838-2.815z"
            fill={`url(#sol-grad-${size})`}
          />
        </svg>
      );

    case 'USDT':
    case 'TETHER':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Tether"
        >
          <circle cx="16" cy="16" r="16" fill="#26A17B" />
          <path
            fill="#FFF"
            d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"
          />
        </svg>
      );

    case 'USDC':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="USD Coin"
        >
          <circle cx="16" cy="16" r="16" fill="#2775CA" />
          <g fill="#FFF">
            <path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z" />
            <path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z" />
          </g>
        </svg>
      );

    case 'XRP':
    case 'RIPPLE':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="XRP"
        >
          <circle cx="16" cy="16" r="16" fill="#23292F" />
          <path
            d="M23.07 8h2.89l-6.015 5.957a5.621 5.621 0 01-7.89 0L6.035 8H8.93l4.57 4.523a3.556 3.556 0 004.996 0L23.07 8zM8.895 24.563H6l6.055-5.993a5.621 5.621 0 017.89 0L26 24.562h-2.895L18.5 20a3.556 3.556 0 00-4.996 0l-4.61 4.563z"
            fill="#FFF"
          />
        </svg>
      );

    case 'TRX':
    case 'TRON':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="TRON"
        >
          <circle cx="16" cy="16" r="16" fill="#EF0027" />
          <path
            d="M21.932 9.913L7.5 7.257l7.595 19.112 10.583-12.894-3.746-3.562zm-.232 1.17l2.208 2.099-6.038 1.093 3.83-3.192zm-5.142 2.973l-6.364-5.278 10.402 1.914-4.038 3.364zm-.453.934l-1.038 8.58L9.472 9.487l6.633 5.502zm.96.455l6.687-1.21-7.67 9.343.983-8.133z"
            fill="#FFF"
          />
        </svg>
      );

    case 'LINK':
    case 'CHAINLINK':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Chainlink"
        >
          <circle cx="16" cy="16" r="16" fill="#2A5ADA" />
          <path
            d="M16 6l-1.799 1.055L9.3 9.945 7.5 11v10l1.799 1.055 4.947 2.89L16.045 26l1.799-1.055 4.857-2.89L24.5 21V11l-1.799-1.055-4.902-2.89L16 6zm-4.902 12.89v-5.78L16 10.22l4.902 2.89v5.78L16 21.78l-4.902-2.89z"
            fill="#FFF"
          />
        </svg>
      );

    case 'DOGE':
    case 'DOGECOIN':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Dogecoin"
        >
          <circle cx="16" cy="16" r="16" fill="#C3A634" />
          <path
            fill="#FFF"
            d="M13.248 14.61h4.314v2.286h-4.314v4.818h2.721c1.077 0 1.958-.145 2.644-.437.686-.291 1.224-.694 1.615-1.21a4.4 4.4 0 00.796-1.815 11.4 11.4 0 00.21-2.252 11.4 11.4 0 00-.21-2.252 4.396 4.396 0 00-.796-1.815c-.391-.516-.93-.919-1.615-1.21-.686-.292-1.567-.437-2.644-.437h-2.721v4.325zm-2.766 2.286H9v-2.285h1.482V8h6.549c1.21 0 2.257.21 3.142.627.885.419 1.607.99 2.168 1.715.56.724.977 1.572 1.25 2.543.273.971.409 2.01.409 3.115a11.47 11.47 0 01-.41 3.115c-.272.97-.689 1.819-1.25 2.543-.56.725-1.282 1.296-2.167 1.715-.885.418-1.933.627-3.142.627h-6.549v-7.104z"
          />
        </svg>
      );

    case 'BNB':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="BNB"
        >
          <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
          <path
            fill="#FFF"
            d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"
          />
        </svg>
      );

    case 'ADA':
    case 'CARDANO':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Cardano"
        >
          <circle cx="16" cy="16" r="16" fill="#0033AD" />
          <circle cx="16" cy="16" r="3.2" fill="#FFF" />
          <circle cx="16" cy="9.5" r="1.6" fill="#FFF" />
          <circle cx="16" cy="22.5" r="1.6" fill="#FFF" />
          <circle cx="9.5" cy="16" r="1.6" fill="#FFF" />
          <circle cx="22.5" cy="16" r="1.6" fill="#FFF" />
          <circle cx="11.4" cy="11.4" r="1.3" fill="#FFF" />
          <circle cx="20.6" cy="11.4" r="1.3" fill="#FFF" />
          <circle cx="11.4" cy="20.6" r="1.3" fill="#FFF" />
          <circle cx="20.6" cy="20.6" r="1.3" fill="#FFF" />
        </svg>
      );

    case 'AVAX':
    case 'AVALANCHE':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Avalanche"
        >
          <circle cx="16" cy="16" r="16" fill="#E84142" />
          <path
            d="M11.518 22.75H8.49c-.636 0-.95 0-1.142-.123A.77.77 0 017 22.025c-.012-.226.145-.503.46-1.055l7.472-13.193c.318-.56.48-.84.682-.944a.77.77 0 01.698 0c.203.104.364.384.682.944l1.536 2.686.008.014c.343.6.517.906.593 1.226a2.26 2.26 0 010 1.066c-.076.323-.249.63-.597 1.24l-3.926 6.95-.01.017c-.346.606-.52.913-.764 1.145a2.284 2.284 0 01-.93.54c-.319.089-.675.089-1.387.089zm7.643 0h4.336c.64 0 .962 0 1.154-.126a.768.768 0 00.348-.607c.011-.219-.142-.484-.443-1.005l-.032-.054-2.172-3.722-.025-.042c-.305-.517-.46-.778-.657-.879a.762.762 0 00-.693 0c-.2.104-.36.377-.678.925l-2.165 3.722-.007.013c-.317.548-.476.821-.464 1.046a.777.777 0 00.348.606c.188.123.51.123 1.15.123z"
            fill="#FFF"
          />
        </svg>
      );

    case 'SUI':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          className={`shrink-0 ${className}`}
          aria-label="Sui"
        >
          <circle cx="16" cy="16" r="16" fill="#1C82FF" />
          <path
            fill="#FFF"
            d="M16 6.5C14.2 9.8 10 16.5 10 20.2a6 6 0 0012 0c0-3.7-4.2-10.4-6-13.7zm0 17.5a3.8 3.8 0 01-3.8-3.8c0-1.8 1.9-5.1 3.8-7.8 1.9 2.7 3.8 6 3.8 7.8a3.8 3.8 0 01-3.8 3.8z"
          />
        </svg>
      );

    default:
      // Sleek fallback badge for novelty/meme tokens (e.g. TRUMP, STRK, HYPE, AERO, TIA)
      return (
        <div
          style={{ width: size, height: size }}
          className={`inline-flex items-center justify-center rounded-full bg-[#151D2C] border border-[#263750] font-mono font-bold text-[9px] text-slate-200 shrink-0 select-none ${className}`}
          title={cleanSymbol}
        >
          {cleanSymbol.slice(0, 3)}
        </div>
      );
  }
};

export default CryptoIcon;
