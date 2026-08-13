import { IconChevronDown } from '@tabler/icons-react'
import Countdown from '../Countdown'
import eventData from '../../data/event.json'

/* ── Balinese SVG Ornaments ── */
function LotusOrnament({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Center lotus */}
      <ellipse cx="100" cy="50" rx="8" ry="12" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7"/>
      <path d="M100 38 Q92 30 88 20 Q96 26 100 38Z" fill="currentColor" opacity="0.5"/>
      <path d="M100 38 Q108 30 112 20 Q104 26 100 38Z" fill="currentColor" opacity="0.5"/>
      <path d="M100 38 Q85 34 78 28 Q90 32 100 38Z" fill="currentColor" opacity="0.4"/>
      <path d="M100 38 Q115 34 122 28 Q110 32 100 38Z" fill="currentColor" opacity="0.4"/>
      {/* Left swirl */}
      <path d="M88 50 Q70 48 58 40 Q62 52 72 56 Q58 58 48 52" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
      <circle cx="48" cy="52" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
      <path d="M58 44 Q50 38 44 32" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      {/* Right swirl */}
      <path d="M112 50 Q130 48 142 40 Q138 52 128 56 Q142 58 152 52" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
      <circle cx="152" cy="52" r="2.5" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
      <path d="M142 44 Q150 38 156 32" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      {/* Diamond accents */}
      <polygon points="100,10 102,14 100,18 98,14" fill="currentColor" opacity="0.8"/>
      <polygon points="68,22 70,25 68,28 66,25" fill="currentColor" opacity="0.5"/>
      <polygon points="132,22 134,25 132,28 130,25" fill="currentColor" opacity="0.5"/>
    </svg>
  )
}

function PepatraanBorder({ flip }) {
  return (
    <svg
      viewBox="0 0 400 24"
      className="papatran-border"
      style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Repeating patra motif */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <g key={i} transform={`translate(${i * 50}, 0)`}>
          <path d="M0 12 Q12 4 25 12 Q38 20 50 12" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
          <circle cx="25" cy="12" r="1.5" fill="currentColor" opacity="0.7"/>
          <path d="M25 8 Q25 4 29 2 Q25 5 21 2 Q25 4 25 8Z" fill="currentColor" opacity="0.5"/>
        </g>
      ))}
      {/* End caps */}
      <polygon points="0,8 3,12 0,16" fill="currentColor" opacity="0.8"/>
      <polygon points="400,8 397,12 400,16" fill="currentColor" opacity="0.8"/>
    </svg>
  )
}

/* ── Floating Petals ── */
function FloatingPetals() {
  const petals = [
    { left: '8%', delay: '0s', dur: '8s', size: 8 },
    { left: '18%', delay: '1.5s', dur: '11s', size: 6 },
    { left: '32%', delay: '3s', dur: '9s', size: 10 },
    { left: '52%', delay: '0.5s', dur: '13s', size: 7 },
    { left: '66%', delay: '2s', dur: '10s', size: 9 },
    { left: '78%', delay: '4s', dur: '8s', size: 6 },
    { left: '90%', delay: '1s', dur: '12s', size: 8 },
  ]
  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.dur,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}

/* ── Gold Dust Particles ── */
function GoldDust() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${(i * 0.4).toFixed(1)}s`,
    dur: `${3 + Math.random() * 4}s`,
    size: Math.random() > 0.5 ? 2 : 3,
  }))
  return (
    <div className="gold-dust" aria-hidden="true">
      {particles.map((p, i) => (
        <div key={i} className="dust-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur, width: p.size, height: p.size }} />
      ))}
    </div>
  )
}

export default function HeroSection() {
  return (
    <section id="hero" className="section hero-section" aria-label="Sambutan utama">

      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Candle glow ambient */}
      <div className="candle-glow" aria-hidden="true" />

      {/* Floating rose petals */}
      <FloatingPetals />

      {/* Gold dust sparkles */}
      <GoldDust />

      {/* Main content */}
      <div className="hero-content">

        {/* Top decorative Balinese border */}
        <PepatraanBorder flip={false} />



        {/* Restaurant Logo */}
        <div className="hero-logo-wrapper">
          <img 
          src="/poster/Poster57 Anniversary_opt.webp" 
          alt="Made's Warung Poster" 
          className="hero-logo-img"
        />
        </div>


        {/* Countdown */}
        <div className="hero-countdown-wrapper">
          <Countdown />
        </div>

      </div>

      {/* Scroll hint */}
      <a href="#acara" className="hero-scroll-hint" aria-label="Scroll down">
        <span>Scroll down</span>
        <IconChevronDown size={16} stroke={2} />
      </a>

    </section>
  )
}
