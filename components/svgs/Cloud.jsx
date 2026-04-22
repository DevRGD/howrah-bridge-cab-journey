export default function Cloud({ id, opacity, flip, breathDelay }) {
  return (
    <>
      <style>
        {`
          @keyframes cloudBreathe {
            0%, 100% { transform: scale(1, 1); }
            50% { transform: scale(1.05, 0.95); }
          }
        `}
      </style>
      <svg
        width="280"
        height="180"
        viewBox="-20 -20 280 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: opacity,
          transform: `scaleX(${flip})`,
        }}
      >
        <defs>
          <linearGradient id={`cloudGrad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <filter id={`cloudSoft-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        <g
          style={{
            animation: `cloudBreathe 10s infinite ease-in-out ${breathDelay}s`,
            transformOrigin: '130px 90px',
          }}
        >
          <path
            fill={`url(#cloudGrad-${id})`}
            filter={`url(#cloudSoft-${id})`}
            d="M60 100 C30 100 15 80 25 60 C30 40 60 30 80 45 C95 20 140 25 155 50 C180 45 195 65 185 85 C190 100 170 100 150 100 Z"
          />
        </g>
      </svg>
    </>
  );
}
