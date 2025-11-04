import React, { useState } from 'react';
import { HCSS_LOGO_BASE64 } from '../assets.ts';

interface LoginPageProps {
  onLogin: (password: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
    // On success, the parent component will re-render to show the AdminPage
  };

  return (
    <div className="p-4 max-w-sm mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <img src={HCSS_LOGO_BASE64} alt="HCSS Logo" className="h-20 w-20 mb-6" />
      <h2 className="text-2xl font-bold text-brand-navy mb-2">Admin Access</h2>
      <p className="text-gray-600 mb-6 text-center">Please enter the password to manage alerts.</p>
      <div className="w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200/80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-slate-100 text-gray-800 rounded-md border-gray-300 focus:ring-brand-burgundy focus:border-brand-burgundy"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full px-5 py-2.5 bg-brand-burgundy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;