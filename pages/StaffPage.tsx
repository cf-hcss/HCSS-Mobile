import React from 'react';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '../components/icons.tsx';

interface StaffLink {
  title: string;
  subtitle: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const staffFloatStyle = `
  @keyframes staffFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-staff-card {
      animation: none !important;
    }
  }
`;

const staffLinks: StaffLink[] = [
  {
    title: 'PowerSchool for Teachers',
    subtitle: 'Access the teacher portal.',
    href: 'https://hcss.powerschool.com/teachers',
    icon: UserGroupIcon,
  },
  {
    title: 'Faculty Intranet',
    subtitle: 'Internal resources and documents.',
    href: 'https://sites.google.com/a/hampdencharter.org/hcss-it-department-sample',
    icon: DocumentTextIcon,
  },
  {
    title: 'Education Pulse',
    subtitle: 'Platform for educational insights.',
    href: 'https://educationpulse.org/',
    icon: ChartBarIcon,
  },
];

const StaffLinkCard: React.FC<{
  item: StaffLink;
  index: number;
}> = ({ item, index }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="floating-staff-card"
    style={{
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '210px',
      minHeight: '155px',
      padding: '22px 16px',
      borderRadius: '26px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '14px',
      animation: 'staffFloat 4.8s ease-in-out infinite',
      animationDelay: `${index * 0.35}s`,
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,252,0.92))',
      border: '1px solid rgba(13,36,62,0.08)',
      boxShadow:
        '0 12px 30px rgba(13,36,62,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
      boxSizing: 'border-box',
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
      <item.icon
        style={{
          width: '27px',
          height: '27px',
          color: '#881c1c',
        }}
      />
    </div>

    <div style={{ textAlign: 'center' }}>
      <h3
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 800,
          color: '#0d243e',
          lineHeight: 1.25,
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: '6px 0 0',
          fontSize: '12px',
          color: '#64748b',
          lineHeight: 1.4,
        }}
      >
        {item.subtitle}
      </p>
    </div>

    <div
      style={{
        position: 'absolute',
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        right: '-24px',
        bottom: '-28px',
        background:
          'radial-gradient(circle, rgba(136,28,28,0.12), transparent 70%)',
        pointerEvents: 'none',
      }}
    />
  </a>
);

const StaffPage: React.FC = () => {
  return (
    <>
      <style>{staffFloatStyle}</style>

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
            Staff Access
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
            Staff Resources
          </h1>

          <p
            style={{
              marginTop: '10px',
              color: '#64748b',
              fontSize: '15px',
            }}
          >
            Essential tools for HCSS staff in one place.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(150px, 210px))',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {staffLinks.map((item, index) => (
            <StaffLinkCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StaffPage;
