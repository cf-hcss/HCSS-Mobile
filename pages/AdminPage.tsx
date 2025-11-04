
import React from 'react';
import type { AdminPageProps } from '../types.ts';
import { ArrowRightOnRectangleIcon, TableCellsIcon } from '../components/icons.tsx';
import { ALERTS_SHEET_EDIT_URL, ALERTS_SHEET_CSV_URL } from '../constants.ts';

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const isUsingSampleData = ALERTS_SHEET_CSV_URL.includes('gist.githubusercontent.com');

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
          href={ALERTS_SHEET_EDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-full px-5 py-3 bg-brand-navy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        >
          <TableCellsIcon className="h-5 w-5 mr-2" />
          Open Alerts Google Sheet
        </a>
        {isUsingSampleData && (
            <p className="text-center text-sm text-amber-700 mt-3 bg-amber-100 p-3 rounded-md border border-amber-200">
                <strong>Note:</strong> You are currently using the sample alerts. To manage your own alerts, follow the instructions below.
            </p>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/80">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How to Update Alerts</h3>
        <div className="space-y-3 text-gray-600 text-sm">
          <p>Follow these steps to add, edit, or remove an alert:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Click the button above to open the official HCSS Alerts Google Sheet template. Click <strong>File &gt; Make a copy</strong> to create your own version.</li>
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
            <li>Once you have your own sheet, you must update the URLs in the <code className="bg-slate-200 text-xs px-1 py-0.5 rounded">constants.ts</code> file in the source code to point to your new sheet.</li>
          </ol>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;