import { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-08-28T00:00:00'); // Event date

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        menit: Math.floor((difference / 1000 / 60) % 60),
        detik: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hari: 0, jam: 0, menit: 0, detik: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container" aria-label="Hitung mundur menuju acara">
      <div className="countdown-item">
        <span className="countdown-value font-display">{timeLeft.hari}</span>
        <span className="countdown-label">Hari</span>
      </div>
      <span className="countdown-separator">:</span>
      <div className="countdown-item">
        <span className="countdown-value font-display">{String(timeLeft.jam).padStart(2, '0')}</span>
        <span className="countdown-label">Jam</span>
      </div>
      <span className="countdown-separator">:</span>
      <div className="countdown-item">
        <span className="countdown-value font-display">{String(timeLeft.menit).padStart(2, '0')}</span>
        <span className="countdown-label">Menit</span>
      </div>
      <span className="countdown-separator">:</span>
      <div className="countdown-item">
        <span className="countdown-value font-display">{String(timeLeft.detik).padStart(2, '0')}</span>
        <span className="countdown-label">Detik</span>
      </div>
    </div>
  );
}
