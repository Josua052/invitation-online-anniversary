import { useState, useCallback, useMemo } from 'react'
import eventData from '../data/event.json'

/* Static particles — generated once outside component to avoid re-creation */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.17) % 100}%`,
  size: `${2 + (i % 4)}px`,
  duration: `${10 + (i % 8) * 1.5}s`,
  delay: `${(i * 0.7) % 8}s`,
  opacity: 0.12 + (i % 5) * 0.05,
}))

export default function OpeningScreen({ onOpen }) {
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

  return (
    <div className={`opening-screen ${phase}`} aria-label="Layar pembuka undangan">

      {/* Floating gold particles */}
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

      {/* Split curtain panels */}
      <div className="panel panel-top"    aria-hidden="true" />
      <div className="panel panel-bottom" aria-hidden="true" />

      {/* Center content */}
      <div className="opening-center">

        {/* Top ornament */}
        <div className="opening-ornament" aria-hidden="true">
          <span className="ornament-line" />
          <span>✦</span>
          <span className="ornament-line" />
        </div>

        {/* Restaurant name — faint backdrop */}
        <p className="restaurant-name-bg" aria-hidden="true">
          {eventData.restaurantName}
        </p>

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
          {/* Outer decorative rings */}
          <div className="seal-ring seal-ring-outer" aria-hidden="true" />
          <div className="seal-ring seal-ring-mid"   aria-hidden="true" />

          {/* Main seal disc */}
          <div className="wax-seal" aria-hidden="true">
            <span className="seal-fleur">❧</span>
            <span className="seal-initials">{eventData.sealInitials}</span>
            <div className="seal-line" />
          </div>
        </div>

        {/* CTA text */}
        <p className="open-cta" aria-label={eventData.openingCta}>
          {eventData.openingCta}
        </p>

        {/* Bottom ornament */}
        <div className="opening-ornament" aria-hidden="true">
          <span className="ornament-line" />
          <span>✦</span>
          <span className="ornament-line" />
        </div>

      </div>
    </div>
  )
}
