import { useState } from 'react'
import {
  IconPlus,
  IconMinus,
  IconCheck,
  IconX,
  IconSend,
  IconCalendarPlus,
} from '@tabler/icons-react'
import GoldDivider from '../GoldDivider'
import rsvpData  from '../../data/rsvp.json'
import eventData from '../../data/event.json'

const INITIAL_STATE = {
  guests: 1,
  attending: null, // true | false | null
  message: '',
}

export default function RSVPSection({ guestName }) {
  const [form, setForm]             = useState(INITIAL_STATE)
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const { fields, confirmation } = rsvpData

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.attending === null) {
      setError('Mohon konfirmasi kehadiran Anda.')
      return
    }
    setError('')
    setLoading(true)

    // Check if late (>= Aug 26, 2026)
    const deadline = new Date('2026-08-26T00:00:00')
    const now = new Date()
    const isLate = now >= deadline

    let statusText = form.attending ? 'Hadir' : 'Tidak Bisa Hadir'
    if (isLate) {
      statusText += ' (Telat)'
    }

    const payload = {
      nama: guestName,
      statusKehadiran: statusText,
      jumlahTamu: form.guests,
      message: form.message
    }

    try {
      // API Endpoint URL (Google Apps Script)
      // PLEASE REPLACE WITH YOUR DEPLOYED GAS URL
      const GAS_URL = 'https://script.google.com/macros/s/AKfycbz65Lsl5WNwdamMg5VpDjd-mf_sXbYcfASHFMgh6rSdzKqtTgcTvx1K7ezV1Muxak4/exec' 
      
      // If URL is not valid or placeholder, simulate success
      if (GAS_URL.includes('REPLACE_THIS')) {
        await new Promise(resolve => setTimeout(resolve, 1200))
        setLoading(false)
        setSubmitted(true)
        return
      }

      const response = await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors', // Because GAS might block standard CORS without specific headers
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      // Since mode is no-cors, response is opaque. We assume success if no error thrown.
      setLoading(false)
      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      setError('Terjadi kesalahan saat mengirim RSVP. Silakan coba lagi.')
      setLoading(false)
    }
  }

  const incrementGuests = () => setForm((f) => ({ ...f, guests: Math.min(f.guests + 1, 10) }))
  const decrementGuests = () => setForm((f) => ({ ...f, guests: Math.max(f.guests - 1, 1) }))

  return (
    <section id="rsvp" className="section rsvp-section" aria-label="Formulir RSVP">
      <div className="section-inner">

        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
          <p className="section-label">Konfirmasi Kehadiran</p>
          <h2 className="section-title">RSVP</h2>
          <GoldDivider />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Kami sangat mengharapkan kehadiran Anda. Mohon konfirmasi paling lambat{' '}
            <strong style={{ color: 'var(--brass)' }}>13 September 2026</strong>.
          </p>
        </div>

        <div className="rsvp-card reveal reveal-delay-1">

          {submitted ? (
            /* ── Confirmation State ── */
            <div className="rsvp-confirmation" role="status" aria-live="polite">
              <div className="confirm-check-ring" aria-hidden="true">
                <IconCheck size={42} stroke={1.5} />
              </div>

              <h3 className="confirm-title">{confirmation.title}</h3>

              <p className="confirm-message">
                {form.attending ? confirmation.messageAttend : confirmation.messageNotAttend}
              </p>

              <GoldDivider />

              <div className="confirm-summary" aria-label="Ringkasan RSVP Anda">
                <p><strong>Nama:</strong> {guestName}</p>
                <p><strong>Jumlah Tamu:</strong> {form.guests} orang</p>
                <p><strong>Kehadiran:</strong> {form.attending ? '✓ Hadir' : '✕ Tidak Bisa Hadir'}</p>
                {form.message && (
                  <p><strong>Ucapan:</strong> {form.message}</p>
                )}
              </div>

              {form.attending && (
                <a
                  id="rsvp-calendar-btn"
                  href={confirmation.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-calendar"
                  aria-label="Tambahkan acara ke Google Calendar"
                >
                  <IconCalendarPlus size={18} stroke={1.5} aria-hidden="true" />
                  {confirmation.calendarLabel}
                </a>
              )}
            </div>

          ) : (
            /* ── RSVP Form ── */
            <form
              id="rsvp-form"
              className="rsvp-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Formulir konfirmasi kehadiran"
            >
              {/* Name (Removed from input, passed as hidden payload) */}

              {/* Guest count */}
              <div className="form-group">
                <label className="form-label" id="guest-label">
                  {fields.guestLabel}
                </label>
                <div className="guest-stepper" role="group" aria-labelledby="guest-label">
                  <button
                    id="guest-decrement-btn"
                    type="button"
                    className="stepper-btn"
                    onClick={decrementGuests}
                    aria-label="Kurangi jumlah tamu"
                    disabled={form.guests <= 1}
                  >
                    <IconMinus size={18} stroke={2} />
                  </button>
                  <span
                    className="stepper-value"
                    aria-live="polite"
                    aria-label={`${form.guests} orang`}
                  >
                    {form.guests}
                  </span>
                  <button
                    id="guest-increment-btn"
                    type="button"
                    className="stepper-btn"
                    onClick={incrementGuests}
                    aria-label="Tambah jumlah tamu"
                    disabled={form.guests >= 10}
                  >
                    <IconPlus size={18} stroke={2} />
                  </button>
                </div>
              </div>

              {/* Attendance */}
              <div className="form-group">
                <span className="form-label" id="attend-label">Konfirmasi Kehadiran</span>
                <div className="attend-buttons" role="group" aria-labelledby="attend-label">
                  <button
                    id="attend-yes-btn"
                    type="button"
                    className={`attend-btn attend-btn-yes ${form.attending === true ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, attending: true }))}
                    aria-pressed={form.attending === true}
                  >
                    <IconCheck size={18} stroke={2} aria-hidden="true" />
                    {fields.attendLabel}
                  </button>
                  <button
                    id="attend-no-btn"
                    type="button"
                    className={`attend-btn attend-btn-no ${form.attending === false ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, attending: false }))}
                    aria-pressed={form.attending === false}
                  >
                    <IconX size={18} stroke={2} aria-hidden="true" />
                    {fields.notAttendLabel}
                  </button>
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="rsvp-message" className="form-label">
                  {fields.messageLabel}
                </label>
                <textarea
                  id="rsvp-message"
                  className="form-input"
                  placeholder={fields.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={3}
                  aria-label={fields.messageLabel}
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  style={{ color: '#E07070', fontSize: '14px', marginTop: '-8px' }}
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                id="rsvp-submit-btn"
                type="submit"
                className="btn-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(244,236,221,0.3)', borderTopColor: 'var(--ivory)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} aria-hidden="true" />
                    {fields.submittingLabel}
                  </>
                ) : (
                  <>
                    <IconSend size={18} stroke={1.5} aria-hidden="true" />
                    {fields.submitLabel}
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}
