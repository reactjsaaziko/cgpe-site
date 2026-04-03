import React from 'react';

export const FloatingParticles = ({ count = 6 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full sp-float-particle"
        style={{
          backgroundColor: 'rgba(184,116,51,0.22)',
          width: `${4 + (i % 3) * 3}px`,
          height: `${4 + (i % 3) * 3}px`,
          left: `${10 + (i * 13) % 80}%`,
          top: `${10 + (i * 17) % 80}%`,
          animationDelay: `${i * 1.3}s`,
          animationDuration: `${6 + (i % 4)}s`,
        }}
      />
    ))}
  </div>
);

export const FloatingFlowers = ({ count = 5, className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute sp-float-particle"
        style={{
          left: `${5 + (i * 19) % 90}%`,
          top: `${5 + (i * 23) % 90}%`,
          animationDelay: `${i * 0.8}s`,
          fontSize: '18px',
          opacity: 0.18,
        }}
      >
        ✿
      </div>
    ))}
  </div>
);

export const FloatingDiyas = ({ count = 4 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="absolute sp-float-particle"
        style={{
          left: `${8 + (i * 22) % 84}%`,
          top: `${8 + (i * 27) % 84}%`,
          animationDelay: `${i * 1.1}s`,
          fontSize: '22px',
          opacity: 0.25,
          filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.5))',
        }}
      >
        🪔
      </div>
    ))}
  </div>
);

export const MandalaSVG = ({ className = '', size = 300 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    className={`sp-spin-slow ${className}`}
    style={{ opacity: 0.06, pointerEvents: 'none' }}
  >
    {[0, 30, 60, 90, 120, 150].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 100 100)`}>
        <ellipse cx="100" cy="55" rx="8" ry="20" fill="currentColor" />
        <ellipse cx="100" cy="145" rx="8" ry="20" fill="currentColor" />
      </g>
    ))}
    <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

export const OmSymbol = ({ className = '' }) => (
  <span className={`sp-om-symbol ${className}`}>ॐ</span>
);

export const PulsingOm = ({ className = '' }) => (
  <span className={`sp-pulsing-om ${className}`}>ॐ</span>
);

export const DiyaIcon = ({ size = 20, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🪔</span>
);

export const BellIcon = ({ size = 20, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🔔</span>
);

export const IncenseIcon = ({ size = 20, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🕯️</span>
);

export const PeacockFeatherIcon = ({ size = 40, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🦚</span>
);

export const ConchIcon = ({ size = 40, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🐚</span>
);

export const LotusIcon = ({ size = 30, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🪷</span>
);

export const MarigoldIcon = ({ size = 30, className = '' }) => (
  <span className={className} style={{ fontSize: size }}>🌼</span>
);

export const GangaDivider = ({ className = '' }) => (
  <div className={`sp-ganga-divider ${className}`}>
    <span className="sp-ganga-icon">〰</span>
  </div>
);

export const SanskritShloka = ({ text, translation }) => (
  <div className="sp-shloka">
    <p className="sp-shloka-text">{text}</p>
    {translation && <p className="sp-shloka-translation">{translation}</p>}
  </div>
);

export const CornerFlourish = ({ position = 'top-left', className = '' }) => {
  const posStyle = {
    'top-left': { top: 16, left: 16 },
    'top-right': { top: 16, right: 16 },
    'bottom-left': { bottom: 16, left: 16 },
    'bottom-right': { bottom: 16, right: 16 },
  }[position] || { top: 16, left: 16 };

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ ...posStyle, color: 'hsl(42,55%,42%)', opacity: 0.25, fontSize: '1.5rem' }}
    >
      ✦
    </div>
  );
};
