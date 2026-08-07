import { useState } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import OpeningScreen      from './components/OpeningScreen'
import BackgroundMusic    from './components/BackgroundMusic'
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
function MainContent({ guestName }) {
  useScrollAnimation()
  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <HeroSection />
      <EventGallerySection />
      <VenueDresscodeSection />
      <RSVPSection guestName={guestName} />
      <SiteFooter />
    </main>
  )
}

/* Page Component */
function InvitationPage() {
  const [showContent, setShowContent] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [searchParams] = useSearchParams()
  const guestName = searchParams.get('to') || 'Tamu Undangan'

  const handleOpen = () => {
    setIsOpened(true)
    // Wait for curtain panels to finish sliding before showing content
    setTimeout(() => setShowContent(true), 900)
  }

  return (
    <>
      {/* Opening screen — kept in DOM until content is ready */}
      {!showContent && <OpeningScreen onOpen={handleOpen} guestName={guestName} />}

      {/* Invitation content */}
      {showContent && <MainContent guestName={guestName} />}

      {/* Invisible auto-playing background music */}
      <BackgroundMusic isPlaying={isOpened} />

      {/* Spinner keyframe for RSVP submit */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

/* Root App */
export default function App() {
  return (
    <Routes>
      {/* Route yang spesifik disetel ke anniversary-restaurant */}
      <Route path="/anniversary-restaurant" element={<InvitationPage />} />
      <Route path="/anniversary-restaurant/*" element={<InvitationPage />} />
      {/* Fallback jika route tidak ditemukan */}
      <Route path="*" element={<InvitationPage />} />
    </Routes>
  )
}


