
import React from 'react';
import type { AdminPageProps } from '../types.ts';
import { ArrowRightOnRectangleIcon, TableCellsIcon } from '../components/icons.tsx';
import { ALERTS_SHEET_URL } from '../constants.ts';

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const isSheetConfigured = ALERTS_SHEET_URL && ALERTS_SHEET_URL !== 'PASTE_YOUR_GOOGLE_SHEET_PUBLISH_URL_HERE';
  // A placeholder link for the button if the real one isn't configured
  const sheetLink = isSheetConfigured ? ALERTS_SHEET_URL.replace('/pub?output=csv', '') : '#';

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-navy text-center">Admin Panel</h2>
        <button
          onClick={onLogout}
          className="group flex items-center justify-center px-3 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg shadow-sm hover:bg-slate-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
          aria-label="Logout"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 transform scale-x-[-1]" />
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200/80">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Alert Management via Google Sheets</h3>
        <p className="text-gray-600 mb-6">
          To simplify and speed up alert publishing, all school alerts are now managed in a central Google Sheet. Changes made there will appear in the app almost instantly.
        </p>

        <a
          href={sheetLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center w-full px-5 py-3 bg-brand-navy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${!isSheetConfigured ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-disabled={!isSheetConfigured}
          onClick={(e) => !isSheetConfigured && e.preventDefault()}
        >
          <TableCellsIcon className="h-5 w-5 mr-2" />
          {isSheetConfigured ? 'Open Alerts Google Sheet' : 'Google Sheet Not Configured'}
        </a>
        {!isSheetConfigured && (
            <p className="text-center text-sm text-red-600 mt-2">
                The developer needs to configure the alerts URL in the source code.
            </p>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/80">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How to Update Alerts</h3>
        <div className="space-y-3 text-gray-600 text-sm">
          <p>Follow these steps to add, edit, or remove an alert:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Click the button above to open the official HCSS Alerts Google Sheet.</li>
            <li>
              Add a new row for a new alert, or edit an existing row. To remove an alert, simply delete its row.
            </li>
            <li>
              Ensure each alert has the following columns filled out correctly:
              <ul className="list-disc list-inside pl-4 mt-2 font-mono text-xs text-brand-navy">
                <li><code className="bg-slate-200 px-1 py-0.5 rounded">id</code>: A unique number for each alert (e.g., 1, 2, 3).</li>
                <li><code className="bg-slate-200 px-1 py-0.5 rounded">severity</code>: Must be one of <code className="bg-slate-200 px-1 py-0.5 rounded">Critical</code>, <code className="bg-slate-200 px-1 py-0.5 rounded">Warning</code>, or <code className="bg-slate-200 px-1 py-0.5 rounded">Info</code>.</li>
                <li><code className="bg-slate-200 px-1 py-0.5 rounded">title</code>: The headline of the alert.</li>
                <li><code className="bg-slate-200 px-1 py-0.5 rounded">message</code>: The full alert text.</li>
                <li><code className="bg-slate-200 px-1 py-0.5 rounded">date</code>: The date of the alert (e.g., January 1, 2024).</li>
              </ul>
            </li>
             <li className="mt-2">
              <span className="font-bold">Important:</span> Do not use commas (,) within any of the fields to ensure proper display.
            </li>
            <li>That's it! The Google Sheet saves automatically. Changes may take up to 5 minutes to appear in the app as the cache updates.</li>
          </ol>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;
