/**
 * pages/AdminDashboard.js
 * ---------------------------------------------------------------
 * Admin analytics view.
 *
 * • Issues table (from GET /issues)
 * • Doughnut chart: issues by category (Chart.js)
 *
 * Charts only visualise API data – no frontend analytics.
 * ---------------------------------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import IssueTable from '../components/IssueTable';
import { getIssues } from '../services/api';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/* --- Chart colour palette --- */
const CHART_COLORS = [
  '#00d4ff',  // cyan
  '#00e676',  // green
  '#ffab00',  // amber
  '#ff5252',  // red
  '#e040fb',  // purple
  '#ff6d00',  // orange
];

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const result = await getIssues();
        const list = Array.isArray(result) ? result : result.issues || [];
        setIssues(list);
      } catch (err) {
        console.error('Failed to load issues:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  /* --- Aggregate issues by category for charts --- */
  const categoryCounts = issues.reduce((acc, issue) => {
    const cat = issue.category || issue.issueType || 'Unknown';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(categoryCounts);
  const counts = Object.values(categoryCounts);

  const doughnutData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: CHART_COLORS.slice(0, labels.length),
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Reported Issues',
        data: counts,
        backgroundColor: CHART_COLORS.slice(0, labels.length).map((c) => c + '99'),
        borderColor: CHART_COLORS.slice(0, labels.length),
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#e0e0e0', font: { family: 'Inter', size: 12 } },
      },
      tooltip: {
        backgroundColor: '#1a1a2e',
        titleColor: '#00d4ff',
        bodyColor: '#e0e0e0',
        borderColor: 'rgba(0,212,255,.3)',
        borderWidth: 1,
      },
    },
    scales: {
      x: { ticks: { color: '#90a4ae' }, grid: { color: 'rgba(255,255,255,.05)' } },
      y: { ticks: { color: '#90a4ae' }, grid: { color: 'rgba(255,255,255,.05)' } },
    },
  };

  return (
    <div className="page-wrapper">
      <div className="animate-in">
        <h1 className="page-title">📊 Admin Dashboard</h1>
        <p className="page-subtitle">Accessibility issue analytics &amp; overview</p>
      </div>

      {/* Charts row */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 animate-in">
          <div className="glass-card p-4">
            <h5 style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: 16 }}>
              Issues by Category
            </h5>
            <div style={{ height: 280 }}>
              {labels.length > 0 ? (
                <Doughnut data={doughnutData} options={{ ...chartOptions, scales: undefined }} />
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>No data</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 animate-in">
          <div className="glass-card p-4">
            <h5 style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: 16 }}>
              Issue Volume
            </h5>
            <div style={{ height: 280 }}>
              {labels.length > 0 ? (
                <Bar data={barData} options={chartOptions} />
              ) : (
                <p style={{ color: 'var(--text-secondary)' }}>No data</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Issues table */}
      <div className="animate-in">
        <h5 style={{ color: 'var(--text-bright)', fontWeight: 700, marginBottom: 16 }}>
          All Reported Issues
        </h5>
        <IssueTable issues={issues} loading={loading} />
      </div>
    </div>
  );
};

export default AdminDashboard;
