import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { userAuthApi } from '../../services/api';
import './UserDashboard.css';

function UserDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Get user data from localStorage
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = async () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      try {
        await userAuthApi.logout(userToken);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="user-dashboard">
      <aside className={`user-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">🪔</div>
            {sidebarOpen && (
              <div className="brand-text">
                <h2>Bhagirathi</h2>
                <span>Wellness Portal</span>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/user/dashboard" 
            className={isActive('/user/dashboard') ? 'active' : ''}
            title="Dashboard"
          >
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link 
            to="/user/dashboard/prescriptions" 
            className={isActive('/user/dashboard/prescriptions') ? 'active' : ''}
            title="Prescriptions"
          >
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            {sidebarOpen && <span>Prescriptions</span>}
          </Link>
          <Link 
            to="/user/dashboard/notifications" 
            className={isActive('/user/dashboard/notifications') ? 'active' : ''}
            title="Notifications"
          >
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </span>
            {sidebarOpen && <span>Notifications</span>}
          </Link>
          <Link 
            to="/user/dashboard/payments" 
            className={isActive('/user/dashboard/payments') ? 'active' : ''}
            title="Payments"
          >
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </span>
            {sidebarOpen && <span>Payments</span>}
          </Link>
          <Link 
            to="/user/profile" 
            className={isActive('/user/profile') ? 'active' : ''}
            title="Profile"
          >
            <span className="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            {sidebarOpen && <span>Profile</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          {sidebarOpen && (
            <div className="user-info">
              <div className="user-avatar">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-details">
                <p className="user-name">{user?.email?.split('@')[0] || 'User'}</p>
                <p className="user-email">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="logout-btn" title="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="user-main-content">
        <div className="top-bar">
          <Link to="/" className="back-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Back to Home</span>
          </Link>
          <div className="top-bar-right">
            <span className="welcome-text">Welcome, {user?.email?.split('@')[0] || 'User'}</span>
          </div>
        </div>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserDashboardLayout;
