export default function BalineseOrnament({ position }) {
  const isLeft = position === 'left';
  
  return (
    <div className={`balinese-ornament ${position}`} aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="sulur-motif" x="0" y="0" width="40" height="120" patternUnits="userSpaceOnUse">
            {/* Main curved vine (ukiran sulur) */}
            <path 
              d="M 20 0 C 40 30, 0 30, 20 60 C 40 90, 0 90, 20 120" 
              fill="transparent" 
              stroke="var(--brass)" 
              strokeWidth="1.5" 
            />
            {/* Decorative stylized leaves */}
            <path 
              d="M 20 15 Q 35 25 20 35 Q 15 25 20 15" 
              fill="var(--brass-dim)" 
              stroke="var(--champagne)" 
              strokeWidth="0.5" 
            />
            <path 
              d="M 20 45 Q 5 55 20 65 Q 25 55 20 45" 
              fill="var(--brass-dim)" 
              stroke="var(--champagne)" 
              strokeWidth="0.5" 
            />
            <path 
              d="M 20 75 Q 35 85 20 95 Q 15 85 20 75" 
              fill="var(--brass-dim)" 
              stroke="var(--champagne)" 
              strokeWidth="0.5" 
            />
            <path 
              d="M 20 105 Q 5 115 20 125 Q 25 115 20 105" 
              fill="var(--brass-dim)" 
              stroke="var(--champagne)" 
              strokeWidth="0.5" 
            />
            {/* Gold accents / dots */}
            <circle cx="22" cy="30" r="1.5" fill="var(--champagne)" />
            <circle cx="18" cy="60" r="1.5" fill="var(--champagne)" />
            <circle cx="22" cy="90" r="1.5" fill="var(--champagne)" />
            <circle cx="18" cy="120" r="1.5" fill="var(--champagne)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#sulur-motif)" />
      </svg>
    </div>
  )
}
