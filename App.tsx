
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
import { ADMIN_PASSWORD } from './constants.ts';
import type { AlertItem } from './types.ts';

function App() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('./alerts.json');

        // A 404 is a valid "no alerts" state if the file doesn't exist.
        if (response.status === 404) {
          console.log('alerts.json not found; defaulting to no alerts.');
          setAlerts([]);
          return;
        }
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        
        // An empty file or a file with just whitespace is also a "no alerts" state.
        if (text.trim() === '') {
          setAlerts([]);
          return;
        }

        const data = JSON.parse(text);
        setAlerts(data);

      } catch (e: any) {
        // If anything fails (network error, malformed JSON), gracefully default
        // to an empty list of alerts instead of showing a disruptive error message.
        console.error("Failed to load or parse alerts.json; defaulting to no alerts.", e);
        setAlerts([]);
        // We do not set a user-facing error for this type of content issue.
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
                  <AdminPage 
                    initialAlerts={alerts}
                    onLogout={handleLogout} 
                  />
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