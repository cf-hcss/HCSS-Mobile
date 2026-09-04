import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  NewspaperIcon,
  IdentificationIcon,
  BriefcaseIcon,
  BookOpenIcon,
  BellIcon,
  SparklesIcon,
  Bars3Icon,
} from './icons.tsx';

interface NavItem {
  to: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const mainNavItems: NavItem[] = [
  { to: '/home', icon: HomeIcon, label: 'Home' },
  { to: '/updates', icon: NewspaperIcon, label: 'Updates' },
  { to: '/alerts', icon: BellIcon, label: 'Alerts' },
];

const moreNavItems: NavItem[] = [
  { to: '/staff', icon: BriefcaseIcon, label: 'Staff' },
  { to: '/contact', icon: IdentificationIcon, label: 'Contact' },
  { to: '/academics', icon: BookOpenIcon, label: 'HCSS Hub AI' },
  { to: '/entertainment', icon: SparklesIcon, label: 'Entertain' },
];

const BottomNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isMoreMenuActive = moreNavItems.some(
    (item) => location.pathname === item.to
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItemStyle = (isActive: boolean) => ({
    flex: 1,
    minWidth: 0,
    height: '62px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    color: isActive ? '#ffffff' : '#64748b',
    background: isActive
      ? 'linear-gradient(135deg, #7a1717, #a72b2b)'
      : 'transparent',
    boxShadow: isActive
      ? '0 10px 24px rgba(136,28,28,0.28)'
      : 'none',
    transform: isActive ? 'translateY(-5px)' : 'translateY(0)',
  });

  return (
    <nav
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: '14px',
        zIndex: 50,
        padding: '0 14px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto',
          padding: '8px',
          borderRadius: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255,255,255,0.88)',
          border: '1px solid rgba(255,255,255,0.85)',
          boxShadow:
            '0 18px 50px rgba(13,36,62,0.18), inset 0 1px 0 rgba(255,255,255,0.95)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          pointerEvents: 'auto',
        }}
      >
        {mainNavItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => navItemStyle(isActive)}
          >
            <Icon
              style={{
                width: '22px',
                height: '22px',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </NavLink>
        ))}

        <div
          ref={menuRef}
          style={{
            position: 'relative',
            flex: 1,
            minWidth: 0,
          }}
        >
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={{
              ...navItemStyle(isMoreMenuActive),
              width: '100%',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <Bars3Icon
              style={{
                width: '22px',
                height: '22px',
              }}
            />

            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              More
            </span>
          </button>

          {isMenuOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: '76px',
                width: '210px',
                padding: '10px',
                borderRadius: '22px',
                background: 'rgba(255,255,255,0.96)',
                border: '1px solid rgba(13,36,62,0.08)',
                boxShadow: '0 20px 45px rgba(13,36,62,0.20)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
            >
              {moreNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 12px',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    marginBottom: '4px',
                    color: isActive ? '#ffffff' : '#0d243e',
                    background: isActive
                      ? 'linear-gradient(135deg, #7a1717, #a72b2b)'
                      : 'transparent',
                    fontWeight: 700,
                    fontSize: '13px',
                  })}
                >
                  <Icon
                    style={{
                      width: '19px',
                      height: '19px',
                      flexShrink: 0,
                    }}
                  />

                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
