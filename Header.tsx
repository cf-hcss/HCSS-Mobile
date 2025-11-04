import React from 'react';
import { HCSS_LOGO_BASE64 } from '../assets.ts';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center space-x-3">
          <img src={HCSS_LOGO_BASE64} alt="HCSS Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-xl font-bold text-brand-navy">HCSS Hub</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;