import React, { useEffect, useState } from 'react';
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Header from './components/Header.tsx';
import BottomNav from './components/BottomNav.tsx';

import HomePage from './pages/HomePage.tsx';
import UpdatesPage from './pages/UpdatesPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import StaffPage from './pages/StaffPage.tsx';
import AcademicsPage from './pages/AcademicsPage.tsx';
import EntertainmentPage from './pages/EntertainmentPage.tsx';
import AlertsPage from './pages/AlertsPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import LoginPage from './pages/LoginPage.tsx';

import {
  ADMIN_PASSWORD,
  ALERTS_SHEET_CSV_URL,
} from './constants.ts';

import type {
  AlertItem,
  AlertSeverity,
} from './types.ts';


const parseCSV = (text: string): string[][] => {
  const rows: string[][] = [];

  let currentRow: string[] = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentValue += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (char === ',' && !insideQuotes) {
      currentRow.push(currentValue.trim());
      currentValue = '';
      continue;
    }

    if (
      (char === '\n' || char === '\r') &&
      !insideQuotes
    ) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }

      currentRow.push(currentValue.trim());

      if (
        currentRow.some(
          (cell) => cell.trim() !== ''
        )
      ) {
        rows.push(currentRow);
      }

      currentRow = [];
      currentValue = '';
      continue;
    }

    currentValue += char;
  }

  currentRow.push(currentValue.trim());

  if (
    currentRow.some(
      (cell) => cell.trim() !== ''
    )
  ) {
    rows.push(currentRow);
  }

  return rows;
};


const normalizeSeverity = (
  value: string
): AlertSeverity => {
  const severity = value
    .trim()
    .toLowerCase();

  if (severity === 'critical') {
    return 'Critical';
  }

  if (severity === 'warning') {
    return 'Warning';
  }

  return 'Info';
};


const parseCsvToAlerts = (
  csvText: string
): AlertItem[] => {
  try {
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      console.warn(
        'Google Sheet returned no alert rows.'
      );

      return [];
    }

    const headers = rows[0].map(
      (header) =>
        header
          .trim()
          .toLowerCase()
          .replace(/^\uFEFF/, '')
    );

    console.log(
      'Google Sheet headers:',
      headers
    );

    const idIndex =
      headers.indexOf('id');

    const severityIndex =
      headers.indexOf('severity');

    const titleIndex =
      headers.indexOf('title');

    const messageIndex =
      headers.indexOf('message');

    const dateIndex =
      headers.indexOf('date');

    if (
      idIndex === -1 ||
      severityIndex === -1 ||
      titleIndex === -1 ||
      messageIndex === -1 ||
      dateIndex === -1
    ) {
      console.error(
        'Google Sheet must contain these columns: id, severity, title, message, date'
      );

      return [];
    }

    const alerts = rows
      .slice(1)
      .map((values, rowIndex) => {
        const rawId =
          values[idIndex]?.trim() || '';

        const id = parseInt(
          rawId,
          10
        );

        if (Number.isNaN(id)) {
          console.warn(
            `Skipping alert row ${rowIndex + 2}: invalid id`
          );

          return null;
        }

        const title =
          values[titleIndex]?.trim() || '';

        if (!title) {
          return null;
        }

        return {
          id,
          severity: normalizeSeverity(
            values[severityIndex] || ''
          ),
          title,
          message:
            values[messageIndex]?.trim() || '',
          date:
            values[dateIndex]?.trim() || '',
        };
      })
      .filter(
        (item): item is AlertItem =>
          item !== null
      );

    console.log(
      'Parsed HCSS alerts:',
      alerts
    );

    return alerts;
  } catch (error) {
    console.error(
      'Error parsing Google Sheet CSV:',
      error
    );

    return [];
  }
};


function App() {
  const [alerts, setAlerts] =
    useState<AlertItem[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);


  useEffect(() => {
    const fetchAlerts = async () => {
      if (
        !ALERTS_SHEET_CSV_URL ||
        !ALERTS_SHEET_CSV_URL.startsWith(
          'http'
        )
      ) {
        setAlerts([]);
        setError(
          'Alert feed is not configured.'
        );
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const separator =
          ALERTS_SHEET_CSV_URL.includes('?')
            ? '&'
            : '?';

        const freshUrl =
          `${ALERTS_SHEET_CSV_URL}${separator}cacheBust=${Date.now()}`;

        console.log(
          'Loading alerts from:',
          freshUrl
        );

        const response = await fetch(
          freshUrl,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error(
            `Google Sheet returned HTTP ${response.status}`
          );
        }

        const csvText =
          await response.text();

        console.log(
          'Raw Google Sheet response:',
          csvText
        );

        if (!csvText.trim()) {
          setAlerts([]);
          return;
        }

        const parsedAlerts =
          parseCsvToAlerts(csvText);

        setAlerts(parsedAlerts);
      } catch (err) {
        console.error(
          'Failed to load alerts:',
          err
        );

        setAlerts([]);

        setError(
          'Could not retrieve school alerts at this time.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);


  const handleLogin = (
    password: string
  ): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-slate-100 font-sans">

        <Header />

        <main className="relative flex-grow pb-20">

          <Routes>

            <Route
              path="/home"
              element={
                <HomePage
                  alerts={alerts}
                  isLoading={isLoading}
                  error={error}
                />
              }
            />

            <Route
              path="/updates"
              element={<UpdatesPage />}
            />

            <Route
              path="/alerts"
              element={
                <AlertsPage
                  alerts={alerts}
                  isLoading={isLoading}
                  error={error}
                />
              }
            />

            <Route
              path="/staff"
              element={<StaffPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            <Route
              path="/academics"
              element={<AcademicsPage />}
            />

            <Route
              path="/entertainment"
              element={
                <EntertainmentPage />
              }
            />

            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPage
                    onLogout={
                      handleLogout
                    }
                  />
                ) : (
                  <LoginPage
                    onLogin={
                      handleLogin
                    }
                  />
                )
              }
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/home"
                  replace
                />
              }
            />

          </Routes>

        </main>

        <BottomNav />

      </div>
    </HashRouter>
  );
}

export default App;
