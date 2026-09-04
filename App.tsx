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
import { ADMIN_PASSWORD, ALERTS_SHEET_CSV_URL } from './constants.ts';
import type { AlertItem, AlertSeverity } from './types.ts';

const parseCsvToAlerts = (csvText: string): AlertItem[] => {
  try {
    const lines = csvText.trim().split(/\r?\n/);

    if (lines.length < 2) {
      return [];
    }

    const headers = lines
      .shift()!
      .split(',')
      .map((header) => header.trim());

    const idIndex = headers.indexOf('id');
    const severityIndex = headers.indexOf('severity');
    const titleIndex = headers.indexOf('title');
    const messageIndex = headers.indexOf('message');
    const dateIndex = headers.indexOf('date');

    if (
      [idIndex, severityIndex, titleIndex, messageIndex, dateIndex].includes(-1)
    ) {
      console.error(
        'CSV from Google Sheet is missing required headers: id, severity, title, message, date'
      );
      return [];
    }

    return lines
      .map((line) => {
        const values = line.split(',');

        if (
          values.length <=
          Math.max(
            idIndex,
            severityIndex,
            titleIndex,
            messageIndex,
            dateIndex
          )
        ) {
          return null;
        }

        const id = parseInt(values[idIndex], 10);

        if (isNaN(id)) {
          return null;
        }

        return {
          id,
          severity:
            (values[severityIndex]?.trim() as AlertSeverity) || 'Info',
          title: values[titleIndex]?.trim() || '',
          message: values[messageIndex]?.trim() || '',
          date: values[dateIndex]?.trim() || '',
        };
      })
      .filter((item): item is AlertItem => item !== null);
  } catch (error) {
    console.error('Error parsing CSV from Google Sheet:', error);
    return [];
  }
};

function App() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (
        !ALERTS_SHEET_CSV_URL ||
        !ALERTS_SHEET_CSV_URL.startsWith('http')
      ) {
        console.warn(
          'Alerts Google Sheet URL is not configured in constants.ts.'
        );

        setAlerts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(ALERTS_SHEET_CSV_URL);

        if (!response.ok) {
          throw new Error(
            `HTTP error fetching Google Sheet! status: ${response.status}`
          );
        }

        const csvText = await response.text();

        if (csvText.trim() === '') {
          setAlerts([]);
          return;
        }

        const data = parseCsvToAlerts(csvText);
        setAlerts(data);
      } catch (e) {
        console.error(
          'Failed to load or parse alerts from Google Sheet.',
          e
        );

        setAlerts([]);
        setError('Could not retrieve school alerts at this time.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleLogin = (password: string): boolean => {
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

            <Route path="/updates" element={<UpdatesPage />} />

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

            <Route path="/staff" element={<StaffPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/entertainment" element={<EntertainmentPage />} />

            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPage onLogout={handleLogout} />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </HashRouter>
  );
}

export default App;
