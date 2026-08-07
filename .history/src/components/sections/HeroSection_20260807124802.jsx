import { IconCalendarEvent, IconClock, IconMapPin, IconChevronDown } from '@tabler/icons-react'
import GoldDivider from '../GoldDivider'
import eventData from '../data/event.json'

export default function HeroSection() {
  return (
    <section id="hero" className="section hero-section" aria-label="Sambutan utama">

      {/* Background image */}
      <div
        className="hero-bg"
        style={{ backgroundImage: `url('${eventData.heroBackground}')` }}
        role="img"
        aria-label="Foto interior La Maison Dorée"
      />

      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Candle glow ambient light */}
      <div className="candle-glow" aria-hidden="true" />

      {/* Main content */}
      <div className="hero-content">

        {/* Tagline label */}
        <p className="hero-tagline">
          Undangan Anniversary
        </p>

        {/* Restaurant name */}
        <h1 className="hero-restaurant-name">
          {eventData.restaurantName}
        </h1>

        <GoldDivider />

        {/* Anniversary year display */}
        <div className="hero-year-block" aria-label={`${eventData.years} tahun anniversary`}>
          <div className="hero-year-line" aria-hidden="true" />
          <span className="hero-year-number font-display">
            {eventData.romanNumeral}
          </span>
          <div className="hero-year-line" aria-hidden="true" />
        </div>

        <p className="hero-year-label">
          {eventData.tagline}
        </p>

        <GoldDivider />

        {/* Event info row */}
        <div className="hero-info-row">
          <div className="hero-info-item">
            <IconCalendarEvent size={18} stroke={1.5} aria-hidden="true" />
            <span>{eventData.date}</span>
          </div>

          <span className="hero-separator" aria-hidden="true">◆</span>

          <div className="hero-info-item">
            <IconClock size={18} stroke={1.5} aria-hidden="true" />
            <span>{eventData.time}</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Gulir ke bawah</span>
        <IconChevronDown size={16} stroke={2} />
      </div>

    </section>
  )
}
