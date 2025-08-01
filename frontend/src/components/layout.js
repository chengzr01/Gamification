import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import '../theme.css';
import './layout.css';

export default function Layout({ children }) {
  // Initialise theme based on localStorage or system preference
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return prefersDark;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="app-shell">
      <Sidebar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}