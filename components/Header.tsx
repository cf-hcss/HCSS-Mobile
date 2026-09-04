import React from 'react';

const Header: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes floatText {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes floatHub {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-6px) rotate(2deg);
          }
        }

        .hcss-floating-title {
          animation: floatText 3s ease-in-out infinite;
        }

        .hcss-floating-hub {
          animation: floatHub 3.4s ease-in-out infinite;
        }
      `}</style>

      <header
        style={{
          width: '100%',
          padding: '18px 16px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          }}
        >
          <img
            src="/hcss-logo.png"
            alt="HCSS Logo"
            style={{
              width: '55px',
              height: '55px',
              objectFit: 'contain',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              className="hcss-floating-title"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(28px, 5vw, 38px)',
                fontWeight: 900,
                letterSpacing: '-1.5px',
                color: '#0d243e',
              }}
            >
              HCSS
            </span>

            <span
              className="hcss-floating-hub"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(29px, 5vw, 40px)',
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#881c1c',
              }}
            >
              Hub
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
