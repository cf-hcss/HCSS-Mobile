import React from 'react';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  PrinterIcon,
} from '../components/icons.tsx';

const contactFloatStyle = `
  @keyframes contactFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-contact-card {
      animation: none !important;
    }
  }
`;

const highSchoolContact = {
  name: 'High School (East)',
  address: '511 Main Street, Chicopee, MA 01020',
  phone: '(413) 593-9700',
  fax: '(413) 593-9701',
  email: 'info@hampdencharter.org',
};

const middleSchoolContact = {
  name: 'Middle School (West)',
  address: '20 Johnson Road, West Springfield, MA 01089',
  phone: '(413) 732-2200',
  fax: '(413) 732-2201',
  email: 'info-ms@hampdencharter.org',
};

interface ContactCardProps {
  contact: typeof highSchoolContact;
  index: number;
}

const ContactRow: React.FC<{
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}> = ({ icon: Icon, children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 0',
    }}
  >
    <div
      style={{
        width: '42px',
        height: '42px',
        flexShrink: 0,
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(145deg, rgba(136,28,28,0.10), rgba(13,36,62,0.06))',
      }}
    >
      <Icon
        style={{
          width: '21px',
          height: '21px',
          color: '#881c1c',
        }}
      />
    </div>

    <div
      style={{
        color: '#475569',
        fontSize: '13px',
        lineHeight: 1.45,
        wordBreak: 'break-word',
      }}
    >
      {children}
    </div>
  </div>
);

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  index,
}) => (
  <div
    className="floating-contact-card"
    style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '28px',
      padding: '22px',
      animation: 'contactFloat 4.8s ease-in-out infinite',
      animationDelay: `${index * 0.35}s`,
      background:
        'linear-gradient(145deg, rgba(255,255,255,0.97), rgba(246,248,252,0.93))',
      border: '1px solid rgba(13,36,62,0.08)',
      boxShadow:
        '0 14px 34px rgba(13,36,62,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
    }}
  >
    <div
      style={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#881c1c',
          marginBottom: '6px',
        }}
      >
        School Office
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: 900,
          color: '#0d243e',
          letterSpacing: '-0.5px',
        }}
      >
        {contact.name}
      </h3>

      <div
        style={{
          marginTop: '14px',
        }}
      >
        <ContactRow icon={MapPinIcon}>
          {contact.address}
        </ContactRow>

        <ContactRow icon={PhoneIcon}>
          <a
            href={`tel:${contact.phone.replace(/\D/g, '')}`}
            style={{
              color: '#0d243e',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            {contact.phone}
          </a>
        </ContactRow>

        <ContactRow icon={PrinterIcon}>
          {contact.fax}
        </ContactRow>

        <ContactRow icon={EnvelopeIcon}>
          <a
            href={`mailto:${contact.email}`}
            style={{
              color: '#0d243e',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            {contact.email}
          </a>
        </ContactRow>
      </div>
    </div>

    <div
      style={{
        position: 'absolute',
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        right: '-42px',
        bottom: '-50px',
        background:
          'radial-gradient(circle, rgba(136,28,28,0.12), transparent 70%)',
        pointerEvents: 'none',
      }}
    />
  </div>
);

const ContactPage: React.FC = () => {
  return (
    <>
      <style>{contactFloatStyle}</style>

      <div
        style={{
          maxWidth: '900px',
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
            Get In Touch
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
            Contact HCSS
          </h1>

          <p
            style={{
              marginTop: '10px',
              color: '#64748b',
              fontSize: '15px',
            }}
          >
            Reach the school office that you need.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
          }}
        >
          <ContactCard contact={highSchoolContact} index={0} />
          <ContactCard contact={middleSchoolContact} index={1} />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
