import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="px-4 pt-4">
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          borderRadius: '28px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background:
            'linear-gradient(135deg, rgba(13,36,62,0.98), rgba(23,58,94,0.94))',
          boxShadow: '0 14px 40px rgba(13,36,62,0.22)',
          border: '1px solid rgba(255,255,255,0.16)',
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '18px',
            background: 'rgba(255,255,255,0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
            flexShrink: 0,
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
              color: 'white',
              fontSize: '22px',
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            HCSS Hub
          </div>

          <div
            style={{
              color: 'rgba(255,255,255,0.72)',
              fontSize: '11px',
              marginTop: '4px',
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
