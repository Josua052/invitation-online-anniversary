import { IconMapPin, IconExternalLink, IconMap, IconLayout } from '@tabler/icons-react'
import GoldDivider from '../GoldDivider'
import venueData     from '../../data/venue.json'
import dresscodeData from '../../data/dresscode.json'

export default function VenueDresscodeSection() {

  return (
    <section id="venue" className="section venue-dresscode-section" aria-label="Venue dan dresscode">
      <div className="section-inner">
        <div className="venue-dresscode-grid">

          {/* ── Venue ── */}
          <div className="reveal">
            <p className="section-label">Lokasi Acara</p>
            <GoldDivider />

            <div className="venue-card">
              <h2 className="venue-name">{venueData.name}</h2>
              <p className="venue-address">
                <IconMapPin size={15} stroke={1.5} style={{ display: 'inline', marginRight: 6, color: 'var(--brass)', verticalAlign: 'middle' }} aria-hidden="true" />
                {venueData.address}
              </p>
              <p className="venue-notes">{venueData.notes}</p>

              {/* Map display */}
              <div id="venue-map-view" className="venue-map-container" role="tabpanel">
                <iframe
                  src={venueData.mapsEmbed}
                  title="Peta lokasi venue"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Google Maps button */}
              <a
                id="venue-maps-btn"
                href={venueData.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maps"
                aria-label="Buka di Google Maps (tab baru)"
              >
                <IconExternalLink size={18} stroke={1.5} aria-hidden="true" />
                Buka di Google Maps
              </a>
            </div>
          </div>

          {/* ── Dresscode ── */}
          <div className="reveal reveal-delay-2">
            <p className="section-label">Dresscode</p>
            <GoldDivider />

            <div className="dresscode-card">
              <h2 className="section-title" style={{ fontSize: '26px', marginBottom: '8px' }}>
                {dresscodeData.title}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--ivory-dim)', marginBottom: '4px' }}>
                {dresscodeData.description}
              </p>
              <p style={{ fontSize: '14px', color: 'var(--taupe)', marginBottom: '0' }}>
                {dresscodeData.subdescription}
              </p>

              {/* Color swatches */}
              <div className="dresscode-swatches" role="list" aria-label="Palet warna dresscode">
                {dresscodeData.swatches.map((swatch) => (
                  <div
                    key={swatch.name}
                    className="dresscode-swatch"
                    role="listitem"
                    title={swatch.name}
                  >
                    <div
                      className="swatch-circle"
                      style={{ backgroundColor: swatch.hex }}
                      aria-label={`Warna ${swatch.name}: ${swatch.hex}`}
                    />
                    <span className="swatch-name">{swatch.name}</span>
                  </div>
                ))}
              </div>

              {/* Notes */}
              <div className="dresscode-notes" role="note">
                {dresscodeData.notes}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
