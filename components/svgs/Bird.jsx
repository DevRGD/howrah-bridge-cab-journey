export default function Bird({ flapDelay }) {
  return (
    <>
      <style>
        {`
          @keyframes flapWing {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(-0.5); }
          }
        `}
      </style>
      <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
        <g
          style={{
            animation: `flapWing 0.6s infinite ease-in-out`,
            animationDelay: `${flapDelay}s`,
            transformOrigin: '32px 32px',
          }}
        >
          <path
            d="M32 35 C16 15 4 25 4 28 C16 38 32 40 32 40 C32 40 48 38 60 28 C48 25 48 15 32 35 Z"
            fill="#ffffff"
            fillOpacity="0.8"
          />
        </g>
        <path d="M28 38 C32 48 36 38 36 30 C36 22 32 22 28 30 C28 38 28 38 28 38 Z" fill="#ffffff" fillOpacity="0.8" />
      </svg>
    </>
  );
}
