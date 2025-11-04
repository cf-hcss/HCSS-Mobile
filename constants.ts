import type { LinkItem } from './types.ts';
import { BookOpenIcon, CalendarIcon, EnvelopeIcon, UserGroupIcon, WalletIcon } from './components/icons.tsx';

export const ADMIN_PASSWORD = 'HCSSadmin2024!';

export const IMPORTANT_LINKS: LinkItem[] = [
  {
    title: 'PowerSchool Parent',
    href: 'https://hcss.powerschool.com/public/',
    icon: UserGroupIcon,
    color: 'text-brand-burgundy',
  },
  {
    title: 'School Calendar',
    href: 'https://east.hampdencharter.org/wp-content/uploads/2025/06/HCSS-School-Calendar-25-26.pdf',
    icon: CalendarIcon,
    color: 'text-brand-burgundy',
  },
  {
    title: 'School Webstore',
    href: 'https://hampdencharter.revtrak.net/',
    icon: WalletIcon,
    color: 'text-brand-burgundy',
  },
  {
    title: 'Athletics Store',
    href: 'https://www.tees413.com/hcsswolves/',
    icon: WalletIcon,
    color: 'text-brand-burgundy',
  },
  {
    title: 'HCSS Main Website',
    href: 'https://hampdencharter.org',
    icon: EnvelopeIcon,
    color: 'text-brand-burgundy',
  },
    {
    title: 'Canvas Guide / Login',
    href: 'https://east.hampdencharter.org/wp-content/uploads/2021/08/Canvas-Parent-Access-Guide.pdf',
    icon: BookOpenIcon,
    color: 'text-brand-burgundy',
  },
  {
    title: 'Online Payments',
    href: 'https://hampdencharter.revtrak.net/school-fees#/list',
    icon: WalletIcon,
    color: 'text-brand-burgundy',
  },
];