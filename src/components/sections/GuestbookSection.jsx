import React from 'react';
import GoldDivider from '../GoldDivider';

export default function GuestbookSection({ wishes }) {
  return (
    <section id="guestbook" className="section guestbook-section" aria-label="Buku Tamu">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
          <p className="section-label">Pesan & Doa</p>
          <h2 className="section-title">Buku Tamu</h2>
          <GoldDivider />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Terima kasih atas doa dan harapan baik Anda untuk perayaan ini.
          </p>
        </div>

        <div className="guestbook-container reveal reveal-delay-1">
          {wishes && wishes.length > 0 ? (
            <div className="wishes-list">
              {wishes.map((wish, index) => (
                <div key={index} className="wish-card">
                  <h4 className="wish-name">{wish.name}</h4>
                  <p className="wish-message">"{wish.message}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="wishes-empty">
              <p>Belum ada pesan yang masuk. Jadilah yang pertama memberikan doa!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
