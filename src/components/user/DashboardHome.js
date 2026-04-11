import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Hardcoded data for demo
const HARDCODED_SUMMARY = {
  totalPrescriptions: 5,
  unreadNotifications: 3,
  totalTransactions: 8,
  lastPrescription: {
    doctorName: 'Dr. Rajesh Kumar',
    diagnosis: 'Seasonal Allergies',
    createdAt: new Date('2026-03-25')
  },
  lastPayment: {
    amount: 2500,
    purpose: 'consultation',
    status: 'success',
    createdAt: new Date('2026-03-25')
  }
};

function DashboardHome() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with hardcoded data
    setTimeout(() => {
      setSummary(HARDCODED_SUMMARY);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading your wellness dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Your Wellness Journey</h1>
          <p className="dashboard-subtitle">Track your health and treatments with Bhagirathi Ayurveda</p>
        </div>
        <div className="header-decoration">
          <span className="om-symbol">ॐ</span>
        </div>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card card-emerald">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <svg className="card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>
            <span className="card-badge">Active</span>
          </div>
          <div className="card-content">
            <h3 className="card-number">{summary?.totalPrescriptions || 0}</h3>
            <p className="card-label">Prescriptions</p>
            <Link to="/user/dashboard/prescriptions" className="card-link">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        <div className="summary-card card-amber">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <svg className="card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            {summary?.unreadNotifications > 0 && (
              <span className="card-badge pulse">{summary.unreadNotifications} New</span>
            )}
          </div>
          <div className="card-content">
            <h3 className="card-number">{summary?.unreadNotifications || 0}</h3>
            <p className="card-label">Notifications</p>
            <Link to="/user/dashboard/notifications" className="card-link">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        <div className="summary-card card-teal">
          <div className="card-header">
            <div className="card-icon-wrapper">
              <svg className="card-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <span className="card-badge">Completed</span>
          </div>
          <div className="card-content">
            <h3 className="card-number">{summary?.totalTransactions || 0}</h3>
            <p className="card-label">Transactions</p>
            <Link to="/user/dashboard/payments" className="card-link">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        {summary?.lastPrescription && (
          <div className="activity-section">
            <div className="section-header">
              <h2 className="section-title">Latest Prescription</h2>
              <div className="section-divider"></div>
            </div>
            <div className="activity-card prescription-card">
              <div className="activity-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div className="activity-details">
                <div className="detail-row">
                  <span className="detail-label">Doctor</span>
                  <span className="detail-value">{summary.lastPrescription.doctorName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Diagnosis</span>
                  <span className="detail-value">{summary.lastPrescription.diagnosis}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{new Date(summary.lastPrescription.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <Link to="/user/dashboard/prescriptions" className="activity-link">
                  View Full Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {summary?.lastPayment && (
          <div className="activity-section">
            <div className="section-header">
              <h2 className="section-title">Latest Payment</h2>
              <div className="section-divider"></div>
            </div>
            <div className="activity-card payment-card">
              <div className="activity-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className="activity-details">
                <div className="detail-row">
                  <span className="detail-label">Amount</span>
                  <span className="detail-value amount">₹{summary.lastPayment.amount.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Purpose</span>
                  <span className="detail-value capitalize">{summary.lastPayment.purpose}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className={`status-badge status-${summary.lastPayment.status}`}>
                    {summary.lastPayment.status}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date</span>
                  <span className="detail-value">{new Date(summary.lastPayment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="wellness-quote">
        <div className="quote-icon">🪷</div>
        <p className="quote-text">"Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."</p>
        <p className="quote-author">— Buddha</p>
      </div>
    </div>
  );
}

export default DashboardHome;
