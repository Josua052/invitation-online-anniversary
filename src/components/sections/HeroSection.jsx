import { IconCalendarEvent, IconClock, IconMapPin, IconChevronDown } from '@tabler/icons-react'
import GoldDivider from '../GoldDivider'
import Countdown from '../Countdown'
import eventData from '../../data/event.json'

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

        {/* Countdown */}
        <Countdown />

        {/* Tagline label */}
        <p className="hero-tagline">
          Undangan Anniversary
        </p>

        {/* Restaurant Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <img 
            src="/logo/Logo Dengan Buaya (1).png" 
            alt={eventData.restaurantName} 
            className="hero-restaurant-name"
            style={{ width: '100%', maxWidth: '400px', height: 'auto' }} 
          />
        </div>

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
      <a href="#acara" className="hero-scroll-hint" aria-label="Gulir ke bawah">
        <span>Gulir ke bawah</span>
        <IconChevronDown size={16} stroke={2} />
      </a>

    </section>
  )
}
