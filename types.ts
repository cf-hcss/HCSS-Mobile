
import type React from 'react';

export interface LinkItem {
  title: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}

export type AlertSeverity = 'Critical' | 'Warning' | 'Info';

export interface AlertItem {
  id: number;
  severity: AlertSeverity;
  title: string;
  message: string;
  date: string;
}

export interface AdminPageProps {
  onLogout: () => void;
}
