import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import OpeningScreen      from './components/OpeningScreen'
import BackgroundMusic    from './components/BackgroundMusic'
import HeroSection        from './components/sections/HeroSection'
import EventGallerySection   from './components/sections/EventGallerySection'
import VenueDresscodeSection from './components/sections/VenueDresscodeSection'
import RSVPSection        from './components/sections/RSVPSection'
import GuestbookSection   from './components/sections/GuestbookSection'
import BalineseOrnament   from './components/BalineseOrnament'
import useScrollAnimation from './hooks/useScrollAnimation'
import eventData from './data/event.json'
import { GAS_URL } from './config'
import './index.css'

/* Footer */
function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <img src="/logo/Logo Dengan Buaya (1).png" alt={eventData.restaurantName} className="footer-logo" />
      <p className="footer-note">
        © {new Date().getFullYear()} — {eventData.years}th Anniversary Digital Invitation
      </p>
    </footer>
  )
}

/* Video Background */
function VideoBackground() {
  return (
    <div className="video-background-container" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background-native"
      >
        <source src="/video/video untuk undangan (1).mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  );
}

/* Main content — hook runs here so IntersectionObserver sees the DOM elements */
function MainContent({ guestId, guestInfo, wishes }) {
  useScrollAnimation()
  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <HeroSection />
      <EventGallerySection />
      <VenueDresscodeSection />
      <RSVPSection guestId={guestId} guestInfo={guestInfo} />
      <GuestbookSection wishes={wishes} />
      <SiteFooter />
    </main>
  )
}

/* Page Component */
function InvitationPage() {
  const [showContent, setShowContent] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  
  const [searchParams] = useSearchParams()
  const guestId = searchParams.get('id')
  const guestNameParam = searchParams.get('to')
  
  // State for data fetched from GAS
  const [guestInfo, setGuestInfo] = useState(null)
  const [wishes, setWishes] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        if (GAS_URL.includes('REPLACE_THIS')) {
          return // Mock data or skip if URL is invalid
        }

        // Fetch guest info if ID is present
        if (guestId) {
          const guestRes = await fetch(`${GAS_URL}?action=getGuest&id=${guestId}`)
          const guestData = await guestRes.json()
          if (guestData.status === 'success') {
            setGuestInfo(guestData)
          }
        }

        // Fetch wishes
        const wishesRes = await fetch(`${GAS_URL}?action=getWishes`)
        const wishesData = await wishesRes.json()
        if (wishesData.status === 'success') {
          setWishes(wishesData.data)
        }
      } catch (err) {
        console.error("Failed to fetch initial data", err)
      }
    }
    
    fetchData()
  }, [guestId])

  const handleOpen = () => {
    setIsOpened(true)
    // Wait for curtain panels to finish sliding before showing content
    setTimeout(() => setShowContent(true), 900)
  }

  // Use the name from the URL immediately so there's no loading delay.
  // If not in URL, fallback to the one from GAS, or 'Honored Guest'.
  const displayName = guestNameParam || (guestInfo ? guestInfo.name : 'Honored Guest')

  return (
    <>
      <VideoBackground />

      {/* Opening Screen (Wax Seal) */}
      {!showContent && <OpeningScreen onOpen={handleOpen} guestName={displayName} />}

      {/* Invitation content */}
      {showContent && (
        <>
          <BalineseOrnament position="left" />
          <BalineseOrnament position="right" />
          <MainContent guestId={guestId} guestInfo={guestInfo} wishes={wishes} />
        </>
      )}

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


