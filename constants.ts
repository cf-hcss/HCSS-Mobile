import type { LinkItem } from './types.ts';
import { BookOpenIcon, CalendarIcon, EnvelopeIcon, UserGroupIcon, WalletIcon } from './components/icons.tsx';

export const ADMIN_PASSWORD = 'HCSSadmin2024!';

// ===================================================================================
// !! IMPORTANT !! - ALERTS CONFIGURATION
// ===================================================================================
// To enable dynamic alerts, you must provide TWO links from YOUR OWN Google Sheet.
// The Admin Panel will guide you if a link is missing.

// --- INSTRUCTIONS ---
// 1. OPEN THE TEMPLATE & MAKE A COPY: 
//    Open this link and click "File" > "Make a copy" to create your own sheet:
//    https://docs.google.com/spreadsheets/d/1DPx6a5jA8i-c2g2aQ_Vf12TMZb4JzQ0Z_u-O_5Lg_wI/edit?usp=sharing
//
// 2. GET YOUR "SHARE" LINK (for the Admin Panel button):
//    - In YOUR new sheet, click the "Share" button (top right).
//    - Under "General access," set it to "Anyone with the link" and "Viewer."
//    - Click "Copy link" and PASTE it below into ALERTS_SHEET_EDIT_URL.
//
// 3. GET YOUR "PUBLISH TO WEB" LINK (for the app to read data):
//    - In YOUR sheet, go to "File" > "Share" > "Publish to web."
//    - In the dialog, select your sheet.
//    - Choose "Comma-separated values (.csv)" from the dropdown.
//    - Click "Publish," then "OK."
//    - Copy the generated link and PASTE it below into ALERTS_SHEET_CSV_URL.

// STEP 2: Paste your sheet's "Share" link here.
// This is the link the admin panel button opens.
export const ALERTS_SHEET_EDIT_URL: string = 'https://docs.google.com/spreadsheets/d/1AULjkx_6jqNHyuHuEopXJ16b1ofImmjca6PODXO4T3o/edit?usp=sharing';

// STEP 3: Paste your "Publish to web" CSV link here.
// This is the link the app fetches data from.
export const ALERTS_SHEET_CSV_URL: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5F_tS5Z-eB-lqY5a-v-9K_F-2X_E4j_7f_0b-9O_u-rP_oA-2e-7Z-5B_8F_6k_3kX/pub?output=csv';
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