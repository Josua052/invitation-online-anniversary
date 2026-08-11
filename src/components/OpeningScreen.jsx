import { useState, useCallback, useMemo } from 'react'
import eventData from '../data/event.json'

/* Static gold dust particles — generated once outside component to avoid re-creation */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5) % 100}%`,
  size: `${2 + (i % 4)}px`,
  duration: `${11 + (i % 8) * 1.5}s`,
  delay: `${(i * 0.8) % 9}s`,
  opacity: 0.12 + (i % 5) * 0.05,
}))

/* Twinkling star sparkles scattered around the seal — distinct rhythm from the rising dust */
const SPARKLES = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  top: `${14 + ((i * 37) % 72)}%`,
  left: `${8 + ((i * 53) % 84)}%`,
  size: `${9 + (i % 3) * 4}px`,
  duration: `${2.6 + (i % 4) * 0.6}s`,
  delay: `${(i * 0.45) % 3}s`,
}))

/* Reusable corner flourish — a single hand-drawn motif, mirrored per corner via CSS transforms */
function CornerFlourish({ className }) {
  return (
    <svg
      className={`corner-flourish ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 26 L4 6 L24 6" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M4 26 C 4 16, 14 14, 16 22 C 17.5 28, 10 30, 8 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="4" cy="4" r="2.4" fill="currentColor" transform="rotate(45 4 4)" />
      <path d="M30 6 L36 6" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <path d="M4 32 L4 38" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
    </svg>
  )
}

export default function OpeningScreen({ onOpen, guestName }) {
  const [phase, setPhase] = useState('idle') // idle | cracking | opening

  const handleSealClick = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('cracking')
    setTimeout(() => setPhase('opening'), 650)
    setTimeout(() => onOpen(), 1450)
  }, [phase, onOpen])

  const sealClass = useMemo(() => {
    if (phase === 'cracking') return 'wax-seal-wrapper cracking'
    if (phase === 'opening')  return 'wax-seal-wrapper opening'
    return 'wax-seal-wrapper'
  }, [phase])

  const showBurst = phase === 'cracking' || phase === 'opening'

  return (
    <div className={`opening-screen ${phase}`} aria-label="Layar pembuka undangan">

      {/* Cinematic vignette + ambient wash, sits behind everything */}
      <div className="opening-vignette" aria-hidden="true" />

      {/* Floating gold dust */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          aria-hidden="true"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--p-opacity': p.opacity,
          }}
        />
      ))}

      {/* Twinkling sparkles */}
      {SPARKLES.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          aria-hidden="true"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        >
          ✦
        </span>
      ))}

      {/* Split curtain panels */}
      <div className="panel panel-top"    aria-hidden="true" />
      <div className="panel panel-bottom" aria-hidden="true" />

      {/* Light burst released the moment the seal is touched */}
      {showBurst && <div className="light-burst" aria-hidden="true" />}

      {/* Center content, framed like a printed invitation card */}
      <div className="opening-center">
        <div className="invitation-frame">
          <CornerFlourish className="corner-tl" />
          <CornerFlourish className="corner-tr" />
          <CornerFlourish className="corner-bl" />
          <CornerFlourish className="corner-br" />

          {/* Top ornament */}
          <div className="opening-ornament" aria-hidden="true">
            <span className="ornament-line" />
            <span className="ornament-glint">✦</span>
            <span className="ornament-line" />
          </div>

          {/* Guest Greeting */}
          <div className="guest-greeting">
            <p className="guest-honorific">Kepada Yth.</p>
            <p className="guest-title">Bapak/Ibu/Saudara/i</p>
            <h2 className="guest-name">{guestName}</h2>
          </div>

          {/* Wax Seal */}
          <div
            id="wax-seal-btn"
            className={sealClass}
            onClick={handleSealClick}
            role="button"
            tabIndex={0}
            aria-label="Buka undangan"
            onKeyDown={(e) => e.key === 'Enter' && handleSealClick()}
          >
            {/* Rotating gold aura behind everything */}
            <div className="seal-aura" aria-hidden="true" />

            {/* Outer decorative rings */}
            <div className="seal-ring seal-ring-outer" aria-hidden="true" />
            <div className="seal-ring seal-ring-mid"   aria-hidden="true" />

            {/* Main seal disc */}
            <div className="wax-seal" aria-hidden="true">
              <span className="seal-shine" />
              <span className="seal-fleur">❧</span>
              <span className="seal-initials">{eventData.sealInitials}</span>
              <div className="seal-line" />
            </div>
          </div>

          {/* CTA text */}
          <div className="open-cta-wrapper">
            <span className="cta-ripple" aria-hidden="true" />
            <span className="cta-ripple cta-ripple-delay" aria-hidden="true" />
            <p className="open-cta" aria-label={eventData.openingCta}>
              {eventData.openingCta}
            </p>
          </div>

          {/* Bottom ornament */}
          <div className="opening-ornament" aria-hidden="true">
            <span className="ornament-line" />
            <span className="ornament-glint">✦</span>
            <span className="ornament-line" />
          </div>
        </div>
      </div>
    </div>
  )
}