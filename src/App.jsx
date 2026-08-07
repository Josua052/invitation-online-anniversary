import { useState } from 'react'
import OpeningScreen      from './components/OpeningScreen'
import AudioPlayer        from './components/AudioPlayer'
import HeroSection        from './components/sections/HeroSection'
import EventGallerySection   from './components/sections/EventGallerySection'
import VenueDresscodeSection from './components/sections/VenueDresscodeSection'
import RSVPSection        from './components/sections/RSVPSection'
import useScrollAnimation from './hooks/useScrollAnimation'
import eventData from './data/event.json'
import './index.css'

/* Footer */
function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <p className="footer-name">{eventData.restaurantName}</p>
      <p className="footer-note">
        © {new Date().getFullYear()} — Undangan Digital Anniversary ke-{eventData.years} Tahun
      </p>
    </footer>
  )
}

/* Main content — hook runs here so IntersectionObserver sees the DOM elements */
function MainContent() {
  useScrollAnimation()
  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <HeroSection />
      <EventGallerySection />
      <VenueDresscodeSection />
      <RSVPSection />
      <SiteFooter />
    </main>
  )
}

/* Root App */
export default function App() {
  const [showContent, setShowContent] = useState(false)

  const handleOpen = () => {
    // Wait for curtain panels to finish sliding before showing content
    setTimeout(() => setShowContent(true), 900)
  }

  return (
    <>
      {/* Opening screen — kept in DOM until content is ready */}
      {!showContent && <OpeningScreen onOpen={handleOpen} />}

      {/* Invitation content */}
      {showContent && <MainContent />}

      {/* Floating audio player */}
      {showContent && <AudioPlayer />}

      {/* Spinner keyframe for RSVP submit */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

