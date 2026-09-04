import React from 'react';
import {
  InstagramIcon,
  NewspaperIcon,
  CalendarIcon,
} from '../components/icons.tsx';

interface UpdateLink {
  title: string;
  subtitle: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const newsAndEventsLinks: UpdateLink[] = [
  {
    title: 'High School News',
    subtitle: 'Latest updates from the high school.',
    href: 'https://east.hampdencharter.org/category/school-life/',
    icon: NewspaperIcon,
  },
  {
    title: 'Middle School News',
    subtitle: 'Latest updates from the middle school.',
    href: 'https://west.hampdencharter.org/category/school-life/',
    icon: NewspaperIcon,
  },
  {
    title: 'High School Events',
    subtitle: 'View the high school activity calendar.',
    href: 'https://east.hampdencharter.org/activity-calendar/',
    icon: CalendarIcon,
  },
  {
    title: 'Middle School Events',
    subtitle: 'View the middle school activity calendar.',
    href: 'https://west.hampdencharter.org/activity-calendar/',
    icon: CalendarIcon,
  },
];

const socialLinks: UpdateLink[] = [
  {
    title: 'High School Instagram',
    subtitle: 'Follow @hampdencharter',
    href: 'https://www.instagram.com/hampdencharter',
    icon: InstagramIcon,
  },
  {
    title: 'Middle School Instagram',
    subtitle: 'Follow @hcss_ms',
    href: 'https://www.instagram.com/hcss_ms',
    icon: InstagramIcon,
  },
];

const UpdateCard: React.FC<{ item: UpdateLink }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px',
      borderRadius: '26px',
      minHeight: '145px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,252,0.92))',
      border: '1px solid rgba(13,36,62,0.08)',
      boxShadow:
        '0 12px 30px rgba(13,36,62,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
    }}
  >
    <div
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(145deg, rgba(136,28,28,0.10), rgba(13,36,62,0.06))',
      }}
    >
      <item.icon
        style={{
          width: '26px',
          height: '26px',
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
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: '5px 0 0',
          fontSize: '12px',
          color: '#64748b',
          lineHeight: 1.4,
        }}
      >
        {item.subtitle}
      </p>
    </div>
  </a>
);

const UpdatesPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '20px 16px 110px',
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
          Stay Connected
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
          HCSS Updates
        </h1>

        <p
          style={{
            marginTop: '10px',
            color: '#64748b',
            fontSize: '15px',
          }}
        >
          News, events, and social updates in one place.
        </p>
      </div>

      <section style={{ marginBottom: '32px' }}>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#0d243e',
            marginBottom: '14px',
          }}
        >
          News & Events
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
          }}
        >
          {newsAndEventsLinks.map((item) => (
            <UpdateCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: '18px',
            fontWeight: 800,
            color: '#0d243e',
            marginBottom: '14px',
          }}
        >
          Follow Us
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
          }}
        >
          {socialLinks.map((item) => (
            <UpdateCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default UpdatesPage;
