import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import { userApi } from '../services/api';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  const isUserLoggedIn = !!userToken;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    if (!isUserLoggedIn || !userToken) return;
    try {
      const { data } = await userApi.getNotifications(userToken);
      setNotifications(data || []);
      const countRep = await userApi.getUnreadCount(userToken);
      setUnreadCount(countRep?.count || 0);
    } catch (error) {
      // Fail silently
    }
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [isUserLoggedIn, userToken]);

  const toggleDropdown = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    if (opening && unreadCount > 0) {
      setUnreadCount(0);
      userApi.markAllAsRead(userToken).then(() => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      });
    }
  };

  if (!isUserLoggedIn) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors focus:outline-none"
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span
            className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white"
            style={{ animation: 'notifPop 0.25s ease' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown — CSS-only transition */}
      <div
        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700 text-sm">Notifications</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">
              No notifications yet
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-4 border-b border-gray-50 hover:bg-gray-50 flex flex-col gap-1 transition-colors ${!notif.isRead ? 'bg-emerald-50/30' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-sm text-gray-800">
                    {notif.notificationId?.title || 'Notification'}
                  </span>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{notif.notificationId?.message || ''}</p>
                <span className="text-[10px] text-gray-400 mt-2">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`@keyframes notifPop { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
    </div>
  );
};

export default NotificationBell;
