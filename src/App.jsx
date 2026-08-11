import { useState, useEffect } from 'react'
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
      <p className="footer-name">{eventData.restaurantName}</p>
      <p className="footer-note">
        © {new Date().getFullYear()} — Undangan Digital Anniversary ke-{eventData.years} Tahun
      </p>
    </footer>
  )
}

/* Video Background */
function VideoBackground() {
  const driveId = eventData.backgroundDriveId;
  const youtubeId = eventData.backgroundYoutubeId;
  const ytFormat = eventData.youtubeVideoFormat || 'horizontal';
  const ytClass = `youtube-bg ${ytFormat === 'vertical' ? 'youtube-vertical' : ''}`;

  if (youtubeId) {
    return (
      <div className="video-background-container" aria-hidden="true">
        <iframe
          className={ytClass}
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${youtubeId}&playsinline=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Background Video"
        ></iframe>
        <div className="video-overlay" />
      </div>
    );
  }

  const videoSrc = driveId 
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : "/video/video untuk undangan.mp4";

  return (
    <div className="video-background-container" aria-hidden="true">
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="video-background"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="video-overlay" />
    </div>
  )
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
  // If not in URL, fallback to the one from GAS, or 'Tamu Undangan'.
  const displayName = guestNameParam || (guestInfo ? guestInfo.name : 'Tamu Undangan')

  return (
    <>
      {/* Opening screen — kept in DOM until content is ready */}
      {!showContent && <OpeningScreen onOpen={handleOpen} guestName={displayName} />}

      {/* Invitation content */}
      {showContent && (
        <>
          <VideoBackground />
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


