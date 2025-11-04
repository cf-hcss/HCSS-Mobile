import React from 'react';
import type { AdminPageProps } from '../types.ts';
import { ArrowRightOnRectangleIcon, TableCellsIcon, ExclamationTriangleIcon } from '../components/icons.tsx';
import { ALERTS_SHEET_EDIT_URL, ALERTS_SHEET_CSV_URL } from '../constants.ts';

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const isEditUrlConfigured = ALERTS_SHEET_EDIT_URL.startsWith('http');
  const isCsvUrlConfigured = ALERTS_SHEET_CSV_URL.startsWith('http');

  const renderConfigurationWarning = () => {
    if (isEditUrlConfigured && isCsvUrlConfigured) {
      return null; // All good, no warning needed
    }

    if (isEditUrlConfigured && !isCsvUrlConfigured) {
      // Edit URL is present, but CSV is missing. Guide the user to the final step.
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-lg mb-8" role="alert">
            <div className="flex">
                <div className="py-1"><ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-4" /></div>
                <div>
                    <p className="font-bold">Almost Done: Publish Your Sheet</p>
                    <p className="text-sm">
                        The link to your sheet is set up! The final step is to publish it to the web so the app can read the data.
                    </p>
                    <ol className="list-decimal list-inside mt-2 text-sm space-y-1">
                        <li>Click the "Open Alerts Google Sheet" button below.</li>
                        <li>In your sheet, go to <strong>File &gt; Share &gt; Publish to web</strong>.</li>
                        <li>Publish the sheet as a <strong>Comma-separated values (.csv)</strong> file.</li>
                        <li>Copy the generated link and have the developer paste it into the <code className="bg-yellow-200 text-xs px-1 py-0.5 rounded-sm">ALERTS_SHEET_CSV_URL</code> variable in the <code className="bg-yellow-200 text-xs px-1 py-0.5 rounded-sm">constants.ts</code> file.</li>
                    </ol>
                </div>
            </div>
        </div>
      );
    }
    
    // Default case: Neither URL is configured.
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg mb-8" role="alert">
            <div className="flex">
                <div className="py-1"><ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-4" /></div>
                <div>
                    <p className="font-bold">Configuration Required</p>
                    <p className="text-sm">
                        The Google Sheet for alerts has not been set up. Please ask the developer to update the 
                        <code className="bg-red-200 text-xs px-1 py-0.5 rounded-sm">ALERTS_SHEET_EDIT_URL</code> and 
                        <code className="bg-red-200 text-xs px-1 py-0.5 rounded-sm">ALERTS_SHEET_CSV_URL</code> 
                        variables in the <code className="bg-red-200 text-xs px-1 py-0.5 rounded-sm">constants.ts</code> file.
                    </p>
                </div>
            </div>
        </div>
    );
  };


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

      {renderConfigurationWarning()}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200/80">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Alert Management via Google Sheets</h3>
        <p className="text-gray-600 mb-6">
          To simplify and speed up alert publishing, all school alerts are now managed in a central Google Sheet. Changes made there will appear in the app almost instantly.
        </p>

        <a
          href={isEditUrlConfigured ? ALERTS_SHEET_EDIT_URL : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center w-full px-5 py-3 text-white font-semibold rounded-lg shadow-md transition-colors ${
            isEditUrlConfigured 
            ? 'bg-brand-navy hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400' 
            : 'bg-gray-400 cursor-not-allowed'
          }`}
          aria-disabled={!isEditUrlConfigured}
        >
          <TableCellsIcon className="h-5 w-5 mr-2" />
          Open Alerts Google Sheet
        </a>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/80">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How to Update Alerts</h3>
        <div className="space-y-3 text-gray-600 text-sm">
          <p>Follow these steps to add, edit, or remove an alert:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Click the button above to open your configured HCSS Alerts Google Sheet.</li>
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
            <li>Changes you make in the sheet are automatically fetched by the app. There is no "save" button in the admin panel.</li>
          </ol>
        </div>
      </div>

    </div>
  );
};

export default AdminPage;
