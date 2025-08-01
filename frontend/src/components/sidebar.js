import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './sidebar.css';

/**
 * Sidebar component
 *
 * Renders the left navigation bar used throughout the application.  The
 * sidebar displays links to the key pages (Play/Cases, Leaderboard,
 * case library and case creation) and shows authentication options
 * based on whether the user is logged in.  A dark mode toggle is
 * passed in from the Layout component.
 */
export default function Sidebar({ darkMode, onToggleDarkMode }) {
  const { userId, logout } = useContext(AuthContext);
  // Collapsed state toggles between full menu and icon‑only menu.
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed((prev) => !prev);

  // Define the core navigation items.  Each item has a path, icon and label.
  const navItems = [
    { to: '/cases', icon: '▶', label: 'Play' },
    { to: '/leaderboard', icon: '🏆', label: 'Leaderboard' },
    { to: '/cases', icon: '📚', label: 'Cases' },
    { to: '/create-case', icon: '➕', label: 'Create Case' },
  ];

  // Build additional navigation for authentication based on login state.
  const authItems = userId
    ? [
        { to: `/profile/${userId}`, icon: '👤', label: 'Profile' },
      ]
    : [
        { to: '/login', icon: '🔑', label: 'Login' },
        { to: '/signup', icon: '📝', label: 'Sign Up' },
      ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}> 
      <div className="sidebar-inner">
        {/* Header row with site name and collapse button */}
        <div className="sidebar-header">
          {/* Hide the title when collapsed to save space */}
          {!collapsed && <h2>OralSim</h2>}
          <button
            className="collapse-toggle"
            onClick={toggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '❯' : '❮'}
          </button>
        </div>
        {/* Navigation links */}
        <nav className="sidebar-nav">
          {[...navItems, ...authItems].map((item) => (
            <Link key={item.to} to={item.to} className="sidebar-link">
              <span className="icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="label">{item.label}</span>
            </Link>
          ))}
          {/* Logout button (only when authenticated) */}
          {userId && (
            <button onClick={logout} className="sidebar-link">
              <span className="icon" aria-hidden="true">🚪</span>
              <span className="label">Logout</span>
            </button>
          )}
          {/* Dark mode toggle */}
          <button onClick={onToggleDarkMode} className="sidebar-link" style={{ marginTop: '0.5rem' }}>
            <span className="icon" aria-hidden="true">
              {darkMode ? '🌞' : '🌜'}
            </span>
            <span className="label">{darkMode ? 'Light' : 'Dark'}</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}