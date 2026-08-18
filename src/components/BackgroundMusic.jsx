import { useEffect, useRef } from 'react'

export default function BackgroundMusic({ isPlaying }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!('mediaSession' in navigator)) return

    // Set dummy metadata so browser doesn't show its own controls
    navigator.mediaSession.metadata = new MediaMetadata({
      title: ' ',
      artist: ' ',
      album: ' ',
    })

    // Register no-op handlers — tells browser "I handle this" → hides OS/browser control bar
    const noop = () => {}
    navigator.mediaSession.setActionHandler('play', noop)
    navigator.mediaSession.setActionHandler('pause', noop)
    navigator.mediaSession.setActionHandler('stop', noop)
    navigator.mediaSession.setActionHandler('previoustrack', noop)
    navigator.mediaSession.setActionHandler('nexttrack', noop)
    navigator.mediaSession.setActionHandler('seekbackward', noop)
    navigator.mediaSession.setActionHandler('seekforward', noop)

    navigator.mediaSession.playbackState = 'playing'

    return () => {
      navigator.mediaSession.metadata = null
      navigator.mediaSession.playbackState = 'none'
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying])

  return (
    <audio
      ref={audioRef}
      src="/bg music/Balinese Harmony _ Ethnic Indonesian Gamelan Background Music.mp3"
      loop
      disableRemotePlayback
      x-webkit-airplay="deny"
      style={{ display: 'none' }}
    />
  )
}
