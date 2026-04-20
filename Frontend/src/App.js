/**
 * App.js
 * Root application component.
 */

import React, { Suspense, Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import API from './services/api';

// Lazy-load pages so a crash in one won't blank the entire app
const Home            = React.lazy(() => import('./pages/Home'));
const ReportIssue     = React.lazy(() => import('./pages/ReportIssue'));
const LeaderboardPage = React.lazy(() => import('./pages/LeaderboardPage'));
const AdminDashboard  = React.lazy(() => import('./pages/AdminDashboard'));
const Login           = React.lazy(() => import('./pages/Login'));
const NotFound        = React.lazy(() => import('./pages/NotFound'));

/* --- Demo Mode Alert --- */
const DemoModeAlert = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #ff9800, #f57c00)',
        color: '#000',
        padding: '12px 20px',
        textAlign: 'center',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}
    >
      <span>⚠️ <strong>Demo Mode:</strong> Firebase is not configured. Using sample data for demonstration.</span>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(0,0,0,0.2)',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        Dismiss
      </button>
    </div>
  );
};

/* --- Top-level Error Boundary --- */
class AppErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center', background: '#1a1a2e', minHeight: '100vh' }}>
          <h2 style={{ color: '#ff5252' }}>Something went wrong</h2>
          <p style={{ color: '#90a4ae' }}>{String(this.state.error)}</p>
          <button onClick={() => window.location.reload()}
            style={{ marginTop: 16, padding: '10px 24px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* --- Loading Spinner --- */
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
    <h2 style={{ color: '#00d4ff' }}>Loading...</h2>
  </div>
);

function App() {
  const [showDemoAlert, setShowDemoAlert] = React.useState(false);
  const [alertDismissed, setAlertDismissed] = React.useState(false);

  React.useEffect(() => {
    const checkDemoMode = async () => {
      try {
        const response = await fetch(`${API.defaults.baseURL}/status`);
        const data = await response.json();
        if (data.demo_mode && !alertDismissed) {
          setShowDemoAlert(true);
        }
      } catch (err) {
        console.error('Failed to check demo mode:', err);
      }
    };
    checkDemoMode();
  }, [alertDismissed]);

  const handleDismiss = () => {
    setShowDemoAlert(false);
    setAlertDismissed(true);
  };

  return (
    <AppErrorBoundary>
      <div className="App">
        <DemoModeAlert show={showDemoAlert} onClose={handleDismiss} />
        <Navbar />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/report"      element={<ReportIssue />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/admin"       element={<AdminDashboard />} />
            <Route path="/login"       element={<Login />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </AppErrorBoundary>
  );
}

export default App;
