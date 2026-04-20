/**
 * components/Navbar.js
 * ---------------------------------------------------------------
 * Top navigation bar – present on every page.
 * Uses React Router NavLink for active-link highlighting.
 * ---------------------------------------------------------------
 */

import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef(null);
  const { theme, changeTheme } = useTheme();

  const closeNav = () => setExpanded(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = () => {
    if (theme === 'light') return '☀️';
    if (theme === 'dark') return '🌙';
    return '💻';
  };

  const themeOptions = [
    { value: 'system', label: 'System', icon: '💻' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
  ];

  return (
    <nav className="navbar navbar-expand-lg acns-navbar sticky-top">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand" to="/" onClick={closeNav}>
          ♿ ACNS
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span style={{ fontSize: '1.5rem' }}>☰</span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={closeNav}>
                🗺️ Map
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/report" onClick={closeNav}>
                🚧 Report Issue
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard" onClick={closeNav}>
                🏆 Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" onClick={closeNav}>
                📊 Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" onClick={closeNav}>
                🔑 Login
              </NavLink>
            </li>
            <li className="nav-item" ref={themeRef}>
              <div style={{ position: 'relative' }}>
                <button
                  className="nav-link"
                  onClick={() => setThemeOpen(!themeOpen)}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--accent)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    minWidth: '44px',
                    minHeight: '44px'
                  }}
                  title={`Theme: ${theme}`}
                >
                  <span style={{ fontSize: '1.1rem' }}>{getThemeIcon()}</span>
                </button>
                {themeOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-card)',
                      zIndex: 1000,
                      minWidth: '120px',
                      overflow: 'hidden'
                    }}
                  >
                    {themeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          changeTheme(opt.value);
                          setThemeOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '10px 14px',
                          background: theme === opt.value ? 'var(--accent)' : 'transparent',
                          color: theme === opt.value ? 'var(--bg-primary)' : 'var(--text-primary)',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          fontSize: '0.9rem'
                        }}
                      >
                        <span>{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
