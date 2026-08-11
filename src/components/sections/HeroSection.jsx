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

        {/* Tagline label stacked */}
        <div className="hero-tagline-group">
          <p className="hero-tagline-text-large">Anniversary</p>
          <p className="hero-tagline-text-small">ke</p>
          <p className="hero-tagline-number">57</p>
        </div>

        {/* Restaurant Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 48px 0' }}>
          <img 
            src="/logo/Logo Dengan Buaya (1).png" 
            alt={eventData.restaurantName} 
            className="hero-restaurant-name"
            style={{ width: '100%', maxWidth: '400px', height: 'auto' }} 
          />
        </div>

        {/* Countdown */}
        <Countdown />

      </div>

      {/* Scroll hint */}
      <a href="#acara" className="hero-scroll-hint" aria-label="Gulir ke bawah">
        <span>Gulir ke bawah</span>
        <IconChevronDown size={16} stroke={2} />
      </a>

    </section>
  )
}
