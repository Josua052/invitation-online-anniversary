import React from 'react';
import GoldDivider from '../GoldDivider';

export default function GuestbookSection({ wishes }) {
  return (
    <section id="guestbook" className="section guestbook-section" aria-label="Guestbook">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '40px' }} className="reveal">
          <p className="section-label">Messages & Wishes</p>
          <h2 className="section-title">Guestbook</h2>
          <GoldDivider />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Thank you for your wishes and blessings for this celebration.
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
              <p>No messages yet. Be the first to leave a wish!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
