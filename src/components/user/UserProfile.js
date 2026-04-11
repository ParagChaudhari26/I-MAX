import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuthApi } from '../../services/api';

function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Get user data from localStorage once on mount
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Set email in formData only once
        setFormData(prev => ({
          ...prev,
          email: parsedUser.email || ''
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []); // Run only once on mount

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage({ type: 'error', text: 'All password fields are required' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      return;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(formData.newPassword)) {
      setMessage({ type: 'error', text: 'Password must contain at least one letter and one number' });
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setMessage({ type: 'error', text: 'Please login again' });
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const response = await userAuthApi.changePassword(token, formData.currentPassword, formData.newPassword);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setIsEditing(false);
      }
    } catch (error) {
      if (error.code === 'INVALID_PASSWORD') {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
      } else if (error.code === 'SAME_PASSWORD') {
        setMessage({ type: 'error', text: 'New password must be different from current password' });
      } else if (error.code === 'SESSION_EXPIRED' || error.code === 'EXPIRED_TOKEN') {
        setMessage({ type: 'error', text: 'Session expired. Please login again' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to change password' });
      }
    } finally {
      setLoading(false);
    }
  };

  const accountCreatedDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'N/A';

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333', fontSize: '2rem' }}>My Profile</h1>

      {message.text && (
        <div style={{
          padding: '15px 20px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontWeight: 500,
          background: message.type === 'success' ? '#d4edda' : '#f8d7da',
          color: message.type === 'success' ? '#155724' : '#721c24',
          border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '60px', height: '60px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.5rem', textTransform: 'capitalize' }}>
              {user?.email?.split('@')[0] || 'User'}
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>{user?.email}</p>
          </div>

          <div style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 600, color: '#555' }}>Email Status:</span>
              <span style={{ color: user?.isVerified ? '#28a745' : '#dc3545', fontWeight: 600 }}>
                {user?.isVerified ? '✓ Verified' : '✗ Not Verified'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 600, color: '#555' }}>Member Since:</span>
              <span style={{ color: '#333' }}>{accountCreatedDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
              <span style={{ fontWeight: 600, color: '#555' }}>User ID:</span>
              <span style={{ color: '#333', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                {user?.id || user?._id || 'N/A'}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => navigate('/user/dashboard')}
              style={{
                width: '100%',
                padding: '12px 20px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#333', fontSize: '1.3rem' }}>Security Settings</h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '8px 16px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Change Password
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#555' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  placeholder="Enter current password"
                  disabled={loading}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#555' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  placeholder="Enter new password (min 8 characters)"
                  disabled={loading}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '0.95rem'
                  }}
                />
                <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                  Must contain at least one letter and one number
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#555' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                  disabled={loading}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(prev => ({
                      ...prev,
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    }));
                    setMessage({ type: '', text: '' });
                  }}
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: '#f5f5f5',
                    color: '#666',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <p style={{ margin: '10px 0', color: '#555' }}>Your password is encrypted and secure.</p>
              <p style={{ margin: '10px 0', color: '#999', fontSize: '0.9rem' }}>Last updated: Recently</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
