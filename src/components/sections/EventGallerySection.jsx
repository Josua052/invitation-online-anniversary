import { useState } from 'react'
import {
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'
import GoldDivider from '../GoldDivider'
import eventData  from '../../data/event.json'
import galleryData from '../../data/gallery.json'
import venueData  from '../../data/venue.json'

export default function EventGallerySection() {
  const [current, setCurrent] = useState(0)
  const total = galleryData.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  return (
    <section id="acara" className="section event-gallery-section" aria-label="Tentang acara dan galeri">
      <div className="section-inner">
        <div className="event-gallery-grid">

          {/* ── Left: Event Info ── */}
          <div>
            <p className="section-label reveal">Tentang Acara</p>
            <h2 className="section-title reveal reveal-delay-1">
              {eventData.welcomeTitle}
            </h2>

            <GoldDivider />

            <p className="section-subtitle reveal reveal-delay-2">
              {eventData.welcomeMessage}
            </p>

            <ul className="event-details-list" aria-label="Detail acara">

              <li className="event-detail-item reveal reveal-delay-2">
                <div className="event-detail-icon" aria-hidden="true">
                  <IconCalendarEvent size={20} stroke={1.5} />
                </div>
                <div className="event-detail-content">
                  <strong>Tanggal</strong>
                  <span>{eventData.date}</span>
                </div>
              </li>

              <li className="event-detail-item reveal reveal-delay-3">
                <div className="event-detail-icon" aria-hidden="true">
                  <IconClock size={20} stroke={1.5} />
                </div>
                <div className="event-detail-content">
                  <strong>Waktu</strong>
                  <span>{eventData.time}</span>
                </div>
              </li>

              <li className="event-detail-item reveal reveal-delay-4">
                <div className="event-detail-icon" aria-hidden="true">
                  <IconMapPin size={20} stroke={1.5} />
                </div>
                <div className="event-detail-content">
                  <strong>Tempat</strong>
                  <span>{venueData.name}</span>
                </div>
              </li>

            </ul>
          </div>

          {/* ── Right: Gallery Carousel ── */}
          <div className="reveal reveal-delay-2" aria-label="Galeri foto">
            <div className="gallery-carousel" role="region" aria-label="Carousel galeri foto">

              {/* Slides track */}
              <div
                className="gallery-track"
                style={{ transform: `translateX(-${current * 100}%)` }}
                aria-live="polite"
              >
                {galleryData.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="gallery-slide"
                    aria-hidden={idx !== current}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="gallery-slide-caption">{photo.caption}</div>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <button
                id="gallery-prev-btn"
                className="gallery-arrow gallery-arrow-prev"
                onClick={prev}
                aria-label="Foto sebelumnya"
              >
                <IconChevronLeft size={20} stroke={2} />
              </button>
              <button
                id="gallery-next-btn"
                className="gallery-arrow gallery-arrow-next"
                onClick={next}
                aria-label="Foto berikutnya"
              >
                <IconChevronRight size={20} stroke={2} />
              </button>

              {/* Dot indicators */}
              <div className="gallery-dots" role="tablist" aria-label="Pilih foto">
                {galleryData.map((_, idx) => (
                  <button
                    key={idx}
                    id={`gallery-dot-${idx}`}
                    className={`gallery-dot ${idx === current ? 'active' : ''}`}
                    onClick={() => setCurrent(idx)}
                    role="tab"
                    aria-selected={idx === current}
                    aria-label={`Foto ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
