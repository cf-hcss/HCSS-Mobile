import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 px-4 pt-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 rounded-3xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl">
          
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <img
              src="/hcss-logo.png"
              alt="HCSS Logo"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-brand-navy">
              HCSS Hub
            </h1>

            <p className="text-xs text-gray-500">
              Hampden Charter School of Science
            </p>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
