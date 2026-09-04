
import React, { useState } from 'react';
import type { LinkItem, AlertItem } from '../types.ts';
import { IMPORTANT_LINKS } from '../constants.ts';
import { ExclamationTriangleIcon, XMarkIcon } from '../components/icons.tsx';

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
        <div className="bg-brand-burgundy text-left text-white p-4 rounded-lg shadow-lg mb-6 flex items-start justify-between space-x-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-8 w-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg">{latestCriticalAlert.title}</h3>
              <p className="text-sm">{latestCriticalAlert.message}</p>
              <p className="text-xs opacity-80 mt-1">{latestCriticalAlert.date}</p>
            </div>
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Dismiss alert"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
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
