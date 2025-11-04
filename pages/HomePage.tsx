
import React, { useState } from 'react';
import type { LinkItem, AlertItem } from '../types.ts';
import { IMPORTANT_LINKS } from '../constants.ts';
import { ExclamationTriangleIcon, XMarkIcon } from '../components/icons.tsx';

const LinkCard: React.FC<{ item: LinkItem }> = ({ item }) => (
    <a 
        href={item.href} 
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md border border-gray-200/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
    >
        <div className={`p-3 rounded-full bg-slate-100 mb-3`}>
            <item.icon className={`h-7 w-7 ${item.color} group-hover:animate-wiggle-fun`} />
        </div>
        <span className="text-center font-semibold text-sm text-brand-navy">
            {item.title}
        </span>
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

      <h2 className="text-3xl font-bold text-brand-navy mb-2">HCSS Quick Links</h2>
      <p className="text-gray-600 mb-8">Access important resources and portals.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {IMPORTANT_LINKS.map((link) => (
          <LinkCard key={link.title} item={link} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;