
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeIcon, NewspaperIcon, IdentificationIcon, BriefcaseIcon, BookOpenIcon, BellIcon, SparklesIcon, Bars3Icon } from './icons.tsx';

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

    const isMoreMenuActive = moreNavItems.some(item => location.pathname === item.to);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-t-lg z-10 border-t border-gray-200">
      <div className="flex justify-around max-w-4xl mx-auto">
        {mainNavItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 ${
                isActive 
                  ? 'text-brand-burgundy' 
                  : 'text-gray-500 hover:text-brand-navy'
              }`
            }
          >
            <Icon className="h-6 w-6 mb-1 group-hover:animate-bounce-short" />
            <span className={`text-xs font-medium ${"isActive ? 'font-bold' : ''"}`}>{label}</span>
          </NavLink>
        ))}

        <div className="relative w-full">
            <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                className={`group flex flex-col items-center justify-center w-full h-full pt-2 pb-1 transition-all duration-200 ${
                    isMoreMenuActive
                      ? 'text-brand-burgundy' 
                      : 'text-gray-500 hover:text-brand-navy'
                  }`}
            >
                <Bars3Icon className="h-6 w-6 mb-1 group-hover:animate-bounce-short" />
                <span className={`text-xs font-medium ${isMoreMenuActive ? 'font-bold' : ''}`}>More</span>
            </button>
            {isMenuOpen && (
                <div 
                    ref={menuRef} 
                    className="absolute bottom-full right-0 mb-3 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 p-2 origin-bottom-right animate-fade-in-up"
                >
                    <div className="space-y-1">
                        {moreNavItems.map(({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                `flex items-center w-full text-left p-2 rounded-md transition-colors ${
                                    isActive
                                    ? 'bg-brand-burgundy text-white'
                                    : 'text-gray-700 hover:bg-slate-100 hover:text-brand-navy'
                                }`
                                }
                            >
                                <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                                <span className="font-medium text-sm">{label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;