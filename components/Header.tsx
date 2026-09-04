import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '16px 16px 0' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderRadius: '28px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'linear-gradient(135deg, #0d243e, #173a5e)',
          boxShadow: '0 14px 40px rgba(13,36,62,0.25)',
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '18px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/hcss-logo.png"
            alt="HCSS Logo"
            style={{
              width: '44px',
              height: '44px',
              objectFit: 'contain',
            }}
          />
        </div>

        <div>
          <div
            style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 700,
            }}
          >
            HCSS Hub
          </div>

          <div
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '11px',
            }}
          >
            Hampden Charter School of Science
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
