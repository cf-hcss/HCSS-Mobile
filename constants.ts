import type { LinkItem } from './types.ts';
import { BookOpenIcon, CalendarIcon, EnvelopeIcon, UserGroupIcon, WalletIcon } from './components/icons.tsx';

export const ADMIN_PASSWORD = 'HCSSadmin2024!';

// ===================================================================================
// !! IMPORTANT !! - ALERTS CONFIGURATION
// ===================================================================================
// To enable dynamic alerts, the app uses a public Google Sheet.
// The URLs below point to a sample data source and a template sheet that you can copy.

// INSTRUCTIONS for setting up your own alerts:
// 1. Open the ALERTS_SHEET_EDIT_URL link below and click "File" > "Make a copy" to create your own version.
// 2. In YOUR copied sheet, add your alerts. Then go to "File" > "Share" > "Publish to web".
// 3. In the dialog, publish the sheet as a "Comma-separated values (.csv)" file.
// 4. Copy the generated .csv URL and paste it below, replacing the sample ALERTS_SHEET_CSV_URL.
// 5. From your sheet, click "Share" (top right), set "General access" to "Anyone with the link", and copy that link.
// 6. Paste your sheet's link below, replacing the sample ALERTS_SHEET_EDIT_URL.

// This is the link to the editable Google Sheet. The admin panel button opens this URL.
// It currently points to a read-only template. Replace it with your own sheet's URL.
export const ALERTS_SHEET_EDIT_URL: string = 'https://docs.google.com/spreadsheets/d/11n4mPyCv_Amg_w2I-2FNnED2-i92p5Q_n19Q-8c-jY4/edit?usp=sharing';

// This is the published CSV link that the app fetches data from.
// It currently points to a working sample CSV file so the app works out-of-the-box.
export const ALERTS_SHEET_CSV_URL: string = 'https://gist.githubusercontent.com/ai-demos/3f705b1c593d8e57140f89c43e479c78/raw/00f1a260f545464177b96095a5f1a5660851ebd0/hcss-hub-alerts-v2.csv';
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