
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
import { HCSS_LOGO_BASE64 } from './assets.ts';
import { ADMIN_PASSWORD, ALERTS_SHEET_CSV_URL } from './constants.ts';
import type { AlertItem, AlertSeverity } from './types.ts';

const parseCsvToAlerts = (csvText: string): AlertItem[] => {
    try {
        const lines = csvText.trim().split(/\r?\n/);
        if (lines.length < 2) return []; // No header or no data

        // Extract and trim headers from the first line
        const headers = lines.shift()!.split(',').map(h => h.trim());
        
        // Find the column index for each required field
        const idIndex = headers.indexOf('id');
        const severityIndex = headers.indexOf('severity');
        const titleIndex = headers.indexOf('title');
        const messageIndex = headers.indexOf('message');
        const dateIndex = headers.indexOf('date');

        // If any header is missing, we can't process the file
        if ([idIndex, severityIndex, titleIndex, messageIndex, dateIndex].includes(-1)) {
            console.error('CSV from Google Sheet is missing required headers: id, severity, title, message, date');
            return [];
        }
        
        return lines.map(line => {
            const values = line.split(',');
            // Ensure we have enough columns for this row before trying to access indices
            if (values.length <= Math.max(idIndex, severityIndex, titleIndex, messageIndex, dateIndex)) return null;

            const id = parseInt(values[idIndex], 10);
            
            if (isNaN(id)) return null; // Skip rows with invalid IDs

            return {
                id: id,
                severity: values[severityIndex]?.trim() as AlertSeverity || 'Info',
                title: values[titleIndex]?.trim() || '',
                message: values[messageIndex]?.trim() || '',
                date: values[dateIndex]?.trim() || '',
            };
        }).filter((item): item is AlertItem => item !== null); // Filter out any null entries
    } catch (error) {
        console.error("Error parsing CSV from Google Sheet:", error);
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
      // If the sheet URL hasn't been configured or is a placeholder, don't try to fetch.
      if (!ALERTS_SHEET_CSV_URL || !ALERTS_SHEET_CSV_URL.startsWith('http')) {
          console.warn("Alerts Google Sheet URL is not configured in constants.ts. Displaying no alerts.");
          setAlerts([]);
          setIsLoading(false);
          return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(ALERTS_SHEET_CSV_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error fetching Google Sheet! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        
        if (csvText.trim() === '') {
          setAlerts([]);
          return;
        }

        const data = parseCsvToAlerts(csvText);
        setAlerts(data);

      } catch (e: any) {
        console.error("Failed to load or parse alerts from Google Sheet; defaulting to no alerts.", e);
        setAlerts([]);
        setError("Could not retrieve school alerts at this time.");
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
      <div className="flex flex-col min-h-screen font-sans bg-slate-100">
        <Header />
        <main className="flex-grow pb-20 relative">
          <div 
            className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-[0.02] -z-10 pointer-events-none" 
            style={{ backgroundImage: `url('${HCSS_LOGO_BASE64}')` }}
            aria-hidden="true"
          ></div>
          <Routes>
            <Route path="/home" element={<HomePage alerts={alerts} isLoading={isLoading} error={error} />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/alerts" element={<AlertsPage alerts={alerts} isLoading={isLoading} error={error} />} />
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
