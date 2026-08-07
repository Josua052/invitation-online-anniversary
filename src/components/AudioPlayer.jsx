import { useState, useRef, useEffect } from 'react'
import { IconMusic, IconMusicOff } from '@tabler/icons-react'
import musicData from '../data/music.json'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = musicData.initialVolume
    audio.loop   = musicData.loop

    const handleCanPlay = () => setReady(true)
    audio.addEventListener('canplay', handleCanPlay)

    return () => audio.removeEventListener('canplay', handleCanPlay)
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={musicData.url} preload="auto" />

      <div className="audio-player" role="region" aria-label="Pemutar musik latar">
        <button
          id="audio-toggle-btn"
          className={`audio-toggle-btn ${playing ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={playing ? 'Hentikan musik' : 'Putar musik latar'}
          title={playing ? 'Hentikan musik' : 'Putar musik latar'}
        >
          {playing
            ? <IconMusic size={20} stroke={1.5} />
            : <IconMusicOff size={20} stroke={1.5} />
          }
        </button>

        {playing && (
          <div className="audio-waves" aria-hidden="true">
            <span className="audio-wave-bar" style={{ height: '8px' }} />
            <span className="audio-wave-bar" style={{ height: '14px' }} />
            <span className="audio-wave-bar" style={{ height: '6px' }} />
            <span className="audio-wave-bar" style={{ height: '16px' }} />
          </div>
        )}

        <span className="audio-label">
          {playing ? musicData.title : 'Putar Musik'}
        </span>
      </div>
    </>
  )
}
