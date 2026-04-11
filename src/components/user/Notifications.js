import React, { useEffect, useState } from 'react';
import { userApi } from '../../services/api';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
  const [filter, setFilter] = useState('all'); // all, unread

  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

  useEffect(() => {
    fetchNotifications();
  }, [page, filter]);

  const fetchNotifications = async () => {
    if (!userToken) {
      setError('Please log in to view notifications');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const params = {
        page: page.toString(),
        limit: '20'
      };
      
      if (filter === 'unread') {
        params.unreadOnly = 'true';
      }

      const response = await userApi.getNotifications(userToken, params);
      
      setNotifications(response.data || []);
      setPagination(response.pagination || { page: 1, limit: 20, total: 0, pages: 1 });
    } catch (err) {
      // Silently handle the error - don't log to console in production
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error fetching notifications:', err.message);
      }
      setError('Unable to load notifications at this time. Please try again later.');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    if (!userToken) return;

    try {
      await userApi.markAsRead(userToken, id);
      
      // Update local state
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true, readAt: new Date() } : n
      ));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const filteredNotifications = notifications;

  if (loading && !notifications.length) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Notifications</h1>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => { setFilter('all'); setPage(1); }}
          >
            All
          </button>
          <button 
            className={filter === 'unread' ? 'active' : ''}
            onClick={() => { setFilter('unread'); setPage(1); }}
          >
            Unread
          </button>
        </div>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📭</div>
          <p style={{ fontSize: '1.1rem' }}>
            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          </p>
        </div>
      ) : (
        <>
          <div className="notifications-list">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification._id} 
                className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                onClick={() => !notification.isRead && markAsRead(notification._id)}
              >
                <div className="notification-header">
                  <h3>{notification.notificationId?.title || 'Notification'}</h3>
                  <span className="notification-date">
                    {new Date(notification.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="notification-message">
                  {notification.notificationId?.message || ''}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {notification.notificationId?.category && (
                    <span className={`notification-type ${notification.notificationId.category}`}>
                      {notification.notificationId.category}
                    </span>
                  )}
                  {!notification.isRead && (
                    <span className="unread-badge">New</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <div style={{ color: 'var(--medium-brown)', fontSize: '0.9rem' }}>
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={pagination.page === 1}
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Notifications;
