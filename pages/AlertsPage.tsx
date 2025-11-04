
import React from 'react';
import type { AlertItem, AlertSeverity } from '../types.ts';
import { ExclamationTriangleIcon, BellIcon } from '../components/icons.tsx';

const severityStyles: Record<AlertSeverity, { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string; borderColor: string; order: number; }> = {
  Critical: {
    icon: ExclamationTriangleIcon,
    color: 'text-brand-burgundy',
    borderColor: 'border-brand-burgundy',
    order: 1,
  },
  Warning: {
    icon: ExclamationTriangleIcon,
    color: 'text-amber-500',
    borderColor: 'border-amber-500',
    order: 2,
  },
  Info: {
    icon: BellIcon,
    color: 'text-sky-500',
    borderColor: 'border-sky-500',
    order: 3,
  },
};

const AlertCard: React.FC<{ item: AlertItem }> = ({ item }) => {
  const { icon: Icon, color, borderColor } = severityStyles[item.severity];

  return (
    <div className={`bg-white rounded-lg shadow-md p-3 border-l-4 ${borderColor}`}>
        <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 flex-shrink-0 ${color}`} />
                <h3 className={`font-bold text-lg ${color}`}>{item.title}</h3>
            </div>
            <p className="text-xs text-gray-500 flex-shrink-0 ml-4">{item.date}</p>
        </div>
        <p className="text-gray-700 text-sm pl-9">{item.message}</p>
    </div>
  );
};

interface AlertsPageProps {
  alerts: AlertItem[];
  isLoading: boolean;
  error: string | null;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ alerts, isLoading, error }) => {

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading alerts...</p>;
    }
    
    // For a cleaner UI, show "No active alerts" if there's an error or if the list is empty.
    if (error || alerts.length === 0) {
      return <p className="text-center text-gray-500">No active alerts.</p>;
    }
    
    const sortedAlerts = [...alerts].sort((a, b) => {
        return severityStyles[a.severity].order - severityStyles[b.severity].order;
    });
    
    return (
      <div className="space-y-3">
        {sortedAlerts.map(alert => <AlertCard key={alert.id} item={alert} />)}
      </div>
    );
  }


  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-navy mb-2">School Alerts</h2>
      <p className="text-gray-600 mb-8">The latest official announcements and updates.</p>
      
      <div className="text-left">
        {renderContent()}
      </div>
    </div>
  );
};

export default AlertsPage;