import type { LinkItem } from './types.ts';
import { BookOpenIcon, CalendarIcon, EnvelopeIcon, UserGroupIcon, WalletIcon } from './components/icons.tsx';

export const ADMIN_PASSWORD = 'HCSSadmin2024!';

// ===================================================================================
// !! IMPORTANT !! - ALERTS CONFIGURATION
// ===================================================================================
// To enable dynamic alerts, you can use this pre-configured sample URL or replace it.
// INSTRUCTIONS:
// 1. Create a Google Sheet with the exact headers (in any order): id, severity, title, message, date
// 2. In the Google Sheet, go to File > Share > Publish to web.
// 3. In the dialog, under "Link", select the specific sheet with your alerts.
// 4. Change the format from "Web page" to "Comma-separated values (.csv)".
// 5. Click the "Publish" button and copy the generated URL.
// 6. Paste your copied URL below to replace the sample URL.
// Fix: Explicitly type ALERTS_SHEET_URL as string to prevent overly narrow type inference.
export const ALERTS_SHEET_URL: string = 'https://gist.githubusercontent.com/ai-demos/f3724c93563914a1e9411964f028457c/raw/f1e756c9a9ad84a32a0c41031a00a40d5884a2d7/hcss-hub-alerts.csv';
// ===================================================================================


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