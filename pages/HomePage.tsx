
import React, { useState } from 'react';
import type { LinkItem, AlertItem } from '../types.ts';
import { IMPORTANT_LINKS } from '../constants.ts';
import { ExclamationTriangleIcon, XMarkIcon } from '../components/icons.tsx';

const cardFloatStyle = `
  @keyframes cardFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;

const LinkCard: React.FC<{ item: LinkItem }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '26px',
      padding: '22px 16px',
      minHeight: '150px',
      display: 'flex',
      animation: 'cardFloat 5s ease-in-out infinite',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '14px',
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,252,0.92))',
      border: '1px solid rgba(13,36,62,0.08)',
      boxShadow:
        '0 12px 30px rgba(13,36,62,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow =
        '0 18px 38px rgba(13,36,62,0.16)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow =
        '0 12px 30px rgba(13,36,62,0.10), inset 0 1px 0 rgba(255,255,255,0.9)';
    }}
  >
    <div
      style={{
        width: '58px',
        height: '58px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(145deg, rgba(136,28,28,0.10), rgba(13,36,62,0.06))',
        boxShadow: '0 8px 20px rgba(13,36,62,0.08)',
      }}
    >
      <item.icon className={`h-7 w-7 ${item.color}`} />
    </div>

    <span
      style={{
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '15px',
        color: '#0d243e',
        lineHeight: 1.25,
      }}
    >
      {item.title}
    </span>

    <div
      style={{
        position: 'absolute',
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        right: '-24px',
        bottom: '-28px',
        background:
          'radial-gradient(circle, rgba(136,28,28,0.12), transparent 70%)',
      }}
    />
  </a>
);

interface HomePageProps {
  alerts: AlertItem[];
  isLoading: boolean;
  error: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ alerts, isLoading, error }) => {
    const floatingCardStyle = {
    animation: 'cardFloat 5s ease-in-out infinite',
  };
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const latestCriticalAlert = alerts.find(alert => alert.severity === 'Critical');

  const renderAlert = () => {
    // For a cleaner homepage UI, we only show critical alerts.
    // Loading and error states are handled on the dedicated Alerts page.
    if (isLoading || error) {
      return null;
    }
    
   if (latestCriticalAlert && isBannerVisible) {
  return (
    <div <style>{cardFloatStyle}</style>
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        textAlign: 'left',
        padding: '18px 20px',
        marginBottom: '28px',
        borderRadius: '26px',
        color: '#ffffff',
        background:
          'linear-gradient(135deg, #741717 0%, #9b2424 55%, #6e1515 100%)',
        border: '1px solid rgba(255,255,255,0.16)',
        boxShadow:
          '0 16px 35px rgba(136,28,28,0.20), inset 0 1px 0 rgba(255,255,255,0.16)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            flexShrink: 0,
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          <ExclamationTriangleIcon className="h-7 w-7" />
        </div>

        <div>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              opacity: 0.7,
              marginBottom: '4px',
            }}
          >
            Important Alert
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: 'clamp(18px, 4vw, 23px)',
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            {latestCriticalAlert.title}
          </h3>

          <p
            style={{
              margin: '5px 0 0',
              fontSize: '14px',
              opacity: 0.9,
            }}
          >
            {latestCriticalAlert.message}
          </p>

          <p
            style={{
              margin: '5px 0 0',
              fontSize: '11px',
              opacity: 0.6,
            }}
          >
            {latestCriticalAlert.date}
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsBannerVisible(false)}
        aria-label="Dismiss alert"
        style={{
          width: '38px',
          height: '38px',
          flexShrink: 0,
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          background: 'rgba(255,255,255,0.12)',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <div
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          right: '-50px',
          top: '-80px',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.16), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
    return null;
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
      
      {renderAlert()}

    <div
  style={{
    textAlign: 'center',
    marginBottom: '28px',
    padding: '0 16px',
  }}
>
  <div
    style={{
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: '#881c1c',
      marginBottom: '6px',
    }}
  >
    Quick Access
  </div>

  <h1
    style={{
      margin: 0,
      fontSize: 'clamp(28px, 5vw, 44px)',
      fontWeight: 900,
      letterSpacing: '-1.5px',
      color: '#0d243e',
      lineHeight: 1.05,
    }}
  >
    Everything you need,
    <span
      style={{
        color: '#881c1c',
        fontStyle: 'italic',
        marginLeft: '8px',
      }}
    >
      fast.
    </span>
  </h1>

  <p
    style={{
      marginTop: '10px',
      marginBottom: 0,
      color: '#64748b',
      fontSize: '15px',
    }}
  >
    School resources in one place.
  </p>
</div>
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
  }}
>
        {IMPORTANT_LINKS.map((link) => (
          <LinkCard key={link.title} item={link} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
