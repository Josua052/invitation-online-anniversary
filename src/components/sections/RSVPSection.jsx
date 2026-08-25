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
import QRCode from 'react-qr-code'
import { GAS_URL } from '../../config'

const INITIAL_STATE = {
  guests: 1,
  attending: null, // true | false | null
  message: '',
}

export default function RSVPSection({ guestId, guestInfo }) {
  const isAlreadyRSVP = guestInfo && guestInfo.rsvpStatus
  
  const [form, setForm] = useState(() => {
    if (isAlreadyRSVP) {
      return {
        guests: guestInfo.guests || 1,
        attending: guestInfo.rsvpStatus.startsWith('Hadir'), // startsWith agar 'Tidak Hadir' terdeteksi benar
        message: guestInfo.message || '',
      }
    }
    return INITIAL_STATE
  })
  const [submitted, setSubmitted]   = useState(!!isAlreadyRSVP)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')

  const { fields, confirmation } = rsvpData

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi: harus ada ?id= di URL agar bisa submit ke spreadsheet
    if (!guestId) {
      setError('Link undangan Anda tidak memiliki ID. Pastikan Anda membuka link yang benar dari panitia.')
      return
    }

    if (form.attending === null) {
      setError('Please confirm your attendance.')
      return
    }
    setError('')
    setLoading(true)

    // Deadline konfirmasi: 27 Agustus 2026 hingga pukul 23:59 WIB (berlaku telat mulai 28 Agustus 00:00 WIB)
    const deadline = new Date('2026-08-28T00:00:00+07:00')
    const now = new Date()
    const isLate = now >= deadline

    let statusText
    if (form.attending) {
      statusText = isLate ? 'Hadir, Telat Konfirmasi' : 'Hadir'
    } else {
      statusText = isLate ? 'Tidak Hadir, Telat Konfirmasi' : 'Tidak Hadir'
    }

    const payload = {
      id: guestId,
      statusKehadiran: statusText,
      jumlahTamu: form.guests,
      message: form.message
    }

    try {
      // Jika URL placeholder, simulasi sukses (mode development)
      if (GAS_URL.includes('REPLACE_THIS')) {
        await new Promise(resolve => setTimeout(resolve, 1200))
        setLoading(false)
        setSubmitted(true)
        return
      }

      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      console.log('GAS Result:', result)

      if (result.status === 'error') {
        // Pesan error spesifik agar mudah dimengerti
        if (result.message && result.message.includes('ID tidak ditemukan')) {
          throw new Error(`Kode undangan "${guestId}" tidak ditemukan di sistem. Hubungi panitia.`)
        }
        throw new Error(result.message)
      }

      setLoading(false)
      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting RSVP:', err)
      // Jika CORS / network error
      const msg = err.message.includes('fetch')
        ? 'Gagal terhubung ke server. Periksa koneksi internet Anda.'
        : err.message
      setError(msg)
      setLoading(false)
    }
  }

  const incrementGuests = () => setForm((f) => ({ ...f, guests: Math.min(f.guests + 1, 2) }))
  const decrementGuests = () => setForm((f) => ({ ...f, guests: Math.max(f.guests - 1, 1) }))

  return (
    <section id="rsvp" className="section rsvp-section" aria-label="Formulir RSVP">
      <div className="section-inner">

        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
          <p className="section-label">Attendance Confirmation</p>
          <h2 className="section-title">RSVP</h2>
          <GoldDivider />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We look forward to celebrating with you. Please RSVP by{' '}
            <strong style={{ color: 'var(--brass)' }}>27 August 2026</strong>.
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

              <div className="confirm-summary" aria-label="Your RSVP Summary">
                <p><strong>Name:</strong> {guestInfo ? guestInfo.name : 'Guest'}</p>
                <p><strong>Guests:</strong> {form.guests} person(s)</p>
                <p><strong>Attendance:</strong> {form.attending ? '✓ Attending' : '✕ Not Attending'}</p>
                {form.message && (
                  <p><strong>Message:</strong> {form.message}</p>
                )}
              </div>

              {form.attending && guestId && (
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <p style={{ marginBottom: '1rem', color: 'var(--brass)', fontWeight: 'bold' }}>Please show this Ticket (QR Code) upon arrival at the venue:</p>
                  <div style={{ background: 'white', padding: '16px', display: 'inline-block', borderRadius: '8px' }}>
                    <QRCode value={`${GAS_URL}?action=scan&id=${guestId}`} size={150} />
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '1rem', color: 'rgba(244,236,221,0.6)' }}>Please screenshot this screen.</p>
                </div>
              )}

              {form.attending && !guestId && (
                <a
                  id="rsvp-calendar-btn"
                  href={confirmation.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-calendar"
                  aria-label="Add event to Google Calendar"
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
              aria-label="Attendance confirmation form"
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
                    aria-label="Decrease number of guests"
                    disabled={form.guests <= 1}
                  >
                    <IconMinus size={18} stroke={2} />
                  </button>
                  <span
                    className="stepper-value"
                    aria-live="polite"
                    aria-label={`${form.guests} person(s)`}
                  >
                    {form.guests}
                  </span>
                  <button
                    id="guest-increment-btn"
                    type="button"
                    className="stepper-btn"
                    onClick={incrementGuests}
                    aria-label="Increase number of guests"
                    disabled={form.guests >= 2}
                  >
                    <IconPlus size={18} stroke={2} />
                  </button>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(201, 162, 75, 0.7)', marginTop: '8px', textAlign: 'center' }}>
                  * Maximum 2 guests per invitation
                </p>
              </div>

              {/* Attendance */}
              <div className="form-group">
                <span className="form-label" id="attend-label">Attendance Confirmation</span>
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
