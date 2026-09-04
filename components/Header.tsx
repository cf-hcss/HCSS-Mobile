import React from 'react';

const Header: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes floatHeader {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes bubbleOne {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -12px) scale(1.12); }
        }

        @keyframes bubbleTwo {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-14px, 10px) scale(0.92); }
        }

        @keyframes letterFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-2deg); }
        }

        @keyframes hubFloat {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(3px) rotate(2deg); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .65; transform: scale(1.15); }
        }

        .hcss-living-header {
          animation: floatHeader 6s ease-in-out infinite;
        }

        .hcss-logo-living {
          animation: logoFloat 4s ease-in-out infinite;
        }

        .hcss-title-letter {
          display: inline-block;
          animation: letterFloat 3.2s ease-in-out infinite;
        }

        .hcss-title-letter:nth-child(2) { animation-delay: .15s; }
        .hcss-title-letter:nth-child(3) { animation-delay: .3s; }
        .hcss-title-letter:nth-child(4) { animation-delay: .45s; }

        .hcss-hub-word {
          display: inline-block;
          animation: hubFloat 3.7s ease-in-out infinite;
        }

        .bubble-one {
          animation: bubbleOne 7s ease-in-out infinite;
        }

        .bubble-two {
          animation: bubbleTwo 8s ease-in-out infinite;
        }

        .glow-orb {
          animation: glowPulse 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hcss-living-header,
          .hcss-logo-living,
          .hcss-title-letter,
          .hcss-hub-word,
          .bubble-one,
          .bubble-two,
          .glow-orb {
            animation: none !important;
          }
        }
      `}</style>

      <header
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '16px',
        }}
      >
        <div
          className="hcss-living-header"
          style={{
            width: 'calc(100% - 8px)',
            maxWidth: '760px',
            minHeight: '94px',
            margin: '0 auto',

            position: 'relative',
            overflow: 'hidden',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: '32px',

            background:
              'linear-gradient(135deg, #07172c 0%, #102f52 48%, #17223f 100%)',

            border: '1px solid rgba(255,255,255,.16)',

            boxShadow:
              '0 20px 55px rgba(8,24,48,.25), inset 0 1px 0 rgba(255,255,255,.15)',
          }}
        >
          {/* floating bubble */}
          <div
            className="bubble-one"
            style={{
              position: 'absolute',
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              right: '-30px',
              top: '-45px',

              background:
                'radial-gradient(circle at 30% 30%, rgba(255,90,120,.55), rgba(136,28,28,.08) 70%)',

              filter: 'blur(3px)',
            }}
          />

          {/* floating bubble */}
          <div
            className="bubble-two"
            style={{
              position: 'absolute',
              width: '85px',
              height: '85px',
              borderRadius: '50%',
              left: '-24px',
              bottom: '-35px',

              background:
                'radial-gradient(circle at 35% 35%, rgba(98,149,255,.45), rgba(19,57,99,.05) 72%)',

              filter: 'blur(2px)',
            }}
          />

          {/* center glow */}
          <div
            className="glow-orb"
            style={{
              position: 'absolute',
              width: '170px',
              height: '70px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',

              background:
                'radial-gradient(circle, rgba(255,255,255,.14), transparent 70%)',

              filter: 'blur(18px)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 3,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              gap: '16px',

              padding: '15px 22px',
            }}
          >
            {/* logo */}
            <div
              className="hcss-logo-living"
              style={{
                width: '62px',
                height: '62px',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                flexShrink: 0,

                borderRadius: '21px',

                background:
                  'linear-gradient(145deg, #ffffff, #edf2fa)',

                boxShadow:
                  '0 10px 30px rgba(0,0,0,.28), 0 0 24px rgba(255,255,255,.12)',

                border: '1px solid rgba(255,255,255,.85)',
              }}
            >
              <img
                src="/hcss-logo.png"
                alt="HCSS Logo"
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* animated title */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(24px, 5vw, 34px)',
                    fontWeight: 900,
                    letterSpacing: '-1.5px',
                    lineHeight: 1,
                    textShadow:
                      '0 5px 18px rgba(0,0,0,.28)',
                  }}
                >
                  <span className="hcss-title-letter">H</span>
                  <span className="hcss-title-letter">C</span>
                  <span className="hcss-title-letter">S</span>
                  <span className="hcss-title-letter">S</span>
                </div>

                <span
                  className="hcss-hub-word"
                  style={{
                    color: '#ff9ea9',
                    fontSize: 'clamp(25px, 5vw, 35px)',
                    fontWeight: 700,
                    fontStyle: 'italic',
                    letterSpacing: '-1px',

                    textShadow:
                      '0 5px 20px rgba(255,70,100,.3)',
                  }}
                >
                  Hub
                </span>
              </div>

              <div
                style={{
                  marginTop: '7px',

                  color: 'rgba(255,255,255,.66)',

                  fontSize: 'clamp(8px, 1.8vw, 10px)',
                  fontWeight: 600,

                  letterSpacing: '1.3px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Hampden Charter School of Science
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
