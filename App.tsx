import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

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

  let row: string[] = [];
  let value = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (char === ',' && !insideQuotes) {
      row.push(value.trim());
      value = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }

      row.push(value.trim());

      if (row.some((cell) => cell !== '')) {
        rows.push(row);
      }

      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  row.push(value.trim());

  if (row.some((cell) => cell !== '')) {
    rows.push(row);
  }

  return rows;
};


const parseCsvToAlerts = (csvText: string): AlertItem[] => {
  try {
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return [];
    }

    const headers = rows[0].map((header) =>
      header.trim().toLowerCase()
    );

    const idIndex = headers.indexOf('id');
    const severityIndex = headers.indexOf('severity');
    const titleIndex = headers.indexOf('title');
    const messageIndex = headers.indexOf('message');
    const dateIndex = headers.indexOf('date');

    if (
      [
        idIndex,
        severityIndex,
        titleIndex,
        messageIndex,
        dateIndex,
      ].includes(-1)
    ) {
      console.error(
        'Google Sheet is missing required columns: id, severity, title, message, date'
      );

      return [];
    }

    return rows
      .slice(1)
      .map((values) => {
        const id = parseInt(values[idIndex] || '', 10);

        if (isNaN(id)) {
          return null;
        }

        const rawSeverity =
          values[severityIndex]?.trim() || 'Info';

        let severity: AlertSeverity = 'Info';

        if (rawSeverity.toLowerCase() === 'critical') {
          severity = 'Critical';
        } else if (rawSeverity.toLowerCase() === 'warning') {
          severity = 'Warning';
        } else if (rawSeverity.toLowerCase() === 'info') {
          severity = 'Info';
        }

        return {
          id,
          severity,
          title: values[titleIndex]?.trim() || '',
          message: values[messageIndex]?.trim() || '',
          date: values[dateIndex]?.trim() || '',
        };
      })
      .filter(
        (item): item is AlertItem =>
          item !== null && item.title !== ''
      );
  } catch (error) {
    console.error(
      'Error parsing Google Sheet CSV:',
      error
    );

    return [];
  }
};


function App() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);


  useEffect(() => {
    const fetchAlerts = async () => {
      if (
        !ALERTS_SHEET_CSV_URL ||
        !ALERTS_SHEET_CSV_URL.startsWith('http')
      ) {
        setAlerts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const separator =
          ALERTS_SHEET_CSV_URL.includes('?') ? '&' : '?';

        const freshUrl =
          `${ALERTS_SHEET_CSV_URL}${separator}t=${Date.now()}`;

        const response = await fetch(freshUrl, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(
            `Google Sheet request failed: ${response.status}`
          );
        }

        const csvText = await response.text();

        const data = parseCsvToAlerts(csvText);

        console.log(
          'HCSS alerts loaded:',
          data
        );

        setAlerts(data);
      } catch (e) {
        console.error(
          'Failed to retrieve alerts:',
          e
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
              element={<EntertainmentPage />}
            />

            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPage
                    onLogout={handleLogout}
                  />
                ) : (
                  <LoginPage
                    onLogin={handleLogin}
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
