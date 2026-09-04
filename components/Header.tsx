import React from 'react';

const Header: React.FC = () => {
  return (
    <header
      style={{
        width: '100%',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '760px',
          margin: '0 auto',
          boxSizing: 'border-box',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          padding: '15px 22px',
          borderRadius: '28px',

          background:
            'linear-gradient(135deg, #07182d 0%, #102e50 55%, #1b3f66 100%)',

          border: '1px solid rgba(255,255,255,0.15)',

          boxShadow:
            '0 16px 40px rgba(7,24,45,0.22), inset 0 1px 0 rgba(255,255,255,0.12)',

          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* subtle glow */}
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            right: '-60px',
            top: '-100px',
            borderRadius: '50%',
            background: 'rgba(136,28,28,0.30)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* logo */}
          <div
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '19px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              background:
                'linear-gradient(145deg, rgba(255,255,255,1), rgba(240,244,250,0.94))',

              border: '1px solid rgba(255,255,255,0.8)',

              boxShadow:
                '0 8px 22px rgba(0,0,0,0.25), 0 0 24px rgba(255,255,255,0.10)',
            }}
          >
            <img
              src="/hcss-logo.png"
              alt="HCSS Logo"
              style={{
                width: '47px',
                height: '47px',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* title */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '7px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: 800,
                  letterSpacing: '-0.8px',
                }}
              >
                HCSS
              </span>

              <span
                style={{
                  color: '#e8b7b7',
                  fontSize: '24px',
                  fontWeight: 500,
                  letterSpacing: '-0.8px',
                }}
              >
                Hub
              </span>
            </div>

            <div
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              Hampden Charter School of Science
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
