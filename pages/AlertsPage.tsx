import React from 'react';
import type { AlertItem, AlertSeverity } from '../types.ts';
import {
  ExclamationTriangleIcon,
  BellIcon,
} from '../components/icons.tsx';

const alertFloatStyle = `
  @keyframes alertFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-alert-card {
      animation: none !important;
    }
  }
`;

const severityStyles: Record<
  AlertSeverity,
  {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    accent: string;
    soft: string;
    glow: string;
    order: number;
    label: string;
  }
> = {
  Critical: {
    icon: ExclamationTriangleIcon,
    accent: '#881c1c',
    soft: 'rgba(136,28,28,0.10)',
    glow: 'rgba(136,28,28,0.12)',
    order: 1,
    label: 'Critical',
  },

  Warning: {
    icon: ExclamationTriangleIcon,
    accent: '#d97706',
    soft: 'rgba(217,119,6,0.10)',
    glow: 'rgba(217,119,6,0.12)',
    order: 2,
    label: 'Warning',
  },

  Info: {
    icon: BellIcon,
    accent: '#0369a1',
    soft: 'rgba(3,105,161,0.10)',
    glow: 'rgba(3,105,161,0.12)',
    order: 3,
    label: 'Information',
  },
};

const AlertCard: React.FC<{
  item: AlertItem;
  index: number;
}> = ({ item, index }) => {
  const style = severityStyles[item.severity];
  const Icon = style.icon;

  return (
    <div
      className="floating-alert-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '26px',
        padding: '20px',
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(246,248,252,0.94))',
        border: '1px solid rgba(13,36,62,0.08)',
        boxShadow:
          '0 12px 30px rgba(13,36,62,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
        animation: 'alertFloat 4.8s ease-in-out infinite',
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '15px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            flexShrink: 0,
            borderRadius: '19px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: style.soft,
            boxShadow: `0 8px 20px ${style.glow}`,
          }}
        >
          <Icon
            style={{
              width: '27px',
              height: '27px',
              color: style.accent,
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '6px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                fontWeight: 800,
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: style.accent,
              }}
            >
              {style.label}
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#64748b',
                whiteSpace: 'nowrap',
              }}
            >
              {item.date}
            </div>
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 800,
              color: '#0d243e',
              lineHeight: 1.2,
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              margin: '8px 0 0',
              fontSize: '14px',
              lineHeight: 1.5,
              color: '#475569',
            }}
          >
            {item.message}
          </p>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '95px',
          height: '95px',
          borderRadius: '50%',
          right: '-35px',
          bottom: '-42px',
          background: `radial-gradient(circle, ${style.glow}, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

interface AlertsPageProps {
  alerts: AlertItem[];
  isLoading: boolean;
  error: string | null;
}

const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  isLoading,
  error,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          style={{
            textAlign: 'center',
            padding: '36px 20px',
            borderRadius: '26px',
            background: 'rgba(255,255,255,0.65)',
            color: '#64748b',
          }}
        >
          Loading alerts...
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            textAlign: 'center',
            padding: '32px 20px',
            borderRadius: '26px',
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(13,36,62,0.08)',
            color: '#64748b',
          }}
        >
          Alerts are temporarily unavailable.
        </div>
      );
    }

    if (alerts.length === 0) {
      return (
        <div
          style={{
            textAlign: 'center',
            padding: '36px 20px',
            borderRadius: '26px',
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,252,0.92))',
            border: '1px solid rgba(13,36,62,0.08)',
            boxShadow:
              '0 12px 30px rgba(13,36,62,0.08)',
          }}
        >
          <div
            style={{
              width: '58px',
              height: '58px',
              margin: '0 auto 14px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(145deg, rgba(13,36,62,0.08), rgba(136,28,28,0.06))',
            }}
          >
            <BellIcon
              style={{
                width: '27px',
                height: '27px',
                color: '#0d243e',
              }}
            />
          </div>

          <div
            style={{
              fontSize: '17px',
              fontWeight: 800,
              color: '#0d243e',
            }}
          >
            No active alerts
          </div>

          <div
            style={{
              marginTop: '6px',
              fontSize: '13px',
              color: '#64748b',
            }}
          >
            Everything looks clear right now.
          </div>
        </div>
      );
    }

    const sortedAlerts = [...alerts].sort(
      (a, b) =>
        severityStyles[a.severity].order -
        severityStyles[b.severity].order
    );

    return (
      <div
        style={{
          display: 'grid',
          gap: '16px',
        }}
      >
        {sortedAlerts.map((alert, index) => (
          <AlertCard
            key={alert.id}
            item={alert}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <style>{alertFloatStyle}</style>

      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: '20px 16px 115px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '30px',
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
            School Status
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 5vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              color: '#0d243e',
            }}
          >
            School Alerts
          </h1>

          <p
            style={{
              marginTop: '10px',
              color: '#64748b',
              fontSize: '15px',
            }}
          >
            Official announcements, closings, delays, and updates.
          </p>
        </div>

        {renderContent()}
      </div>
    </>
  );
};

export default AlertsPage;
