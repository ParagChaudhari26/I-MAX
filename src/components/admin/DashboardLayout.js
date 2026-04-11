import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Use static path for logo
const logoPath = new URL('../../images/header_images/logo.png', import.meta.url).href;

// Navigation items for the sidebar
const navigationItems = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Training Programs',
    path: '/admin/dashboard/training-programs',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: 'News & Events',
    path: '/admin/dashboard/news-events',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    name: 'Testimonials',
    path: '/admin/dashboard/testimonials',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    name: 'Blogs',
    path: '/admin/dashboard/blogs',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    name: 'Notifications',
    path: '/admin/dashboard/notifications',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    name: 'Prescriptions',
    path: '/admin/dashboard/prescriptions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Payment Receipts',
    path: '/admin/dashboard/payment-receipts',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    ),
  },
  {
    name: 'Banner Messages',
    path: '/admin/dashboard/banner-messages',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    name: 'Photo Gallery',
    path: '/admin/dashboard/gallery',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActiveRoute = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] font-serif flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-4 bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] flex-shrink-0">
          <Link to="/admin/dashboard" className="flex items-center" onClick={closeSidebar}>
            <img src={logoPath} alt="Bhagirathi Ayurveda" className="h-12 w-auto mr-2" />
            <span className="text-lg font-bold text-white leading-tight">Admin<br/>Panel</span>
          </Link>
          <button
            className="lg:hidden text-white hover:text-gray-200"
            onClick={closeSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation - Scrollable area */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-[#e8f0e4] text-[#3a5c40]'
                      : 'text-[#5a4a3a] hover:bg-[#f0e8d8] hover:text-[#3a5c40]'
                  }`}
                >
                  <span className={`mr-3 ${isActiveRoute(item.path) ? 'text-[#3a5c40]' : 'text-[#6b5344]'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info at Bottom - Fixed */}
        <div className="p-4 border-t border-[#d6c7b0] bg-white flex-shrink-0">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] flex items-center justify-center text-white font-semibold flex-shrink-0">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-[#3a5c40] truncate">
                {user?.username || 'Admin'}
              </p>
              <p className="text-xs text-[#6b5344] truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-[#d6c7b0]">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-[#5a4a3a] hover:text-[#3a5c40]"
              onClick={toggleSidebar}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page Title - Mobile */}
            <div className="flex-1 lg:flex-none">
              <h1 className="text-lg font-semibold text-[#3a5c40] lg:hidden">Admin Dashboard</h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm text-[#5a4a3a] hover:text-[#3a5c40] transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </Link>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>

        {/* Footer - Matching Frontend Style */}
        <footer className="bg-gradient-to-r from-[#e8d9c5] to-[#d9c5a8] border-t border-[#d6c7b0]">
          <div className="max-w-6xl mx-auto py-8 px-6">
            {/* Main Footer Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-6">
              {/* Branding */}
              <div className="flex items-center">
                <img src={logoPath} alt="Bhagirathi Ayurveda" className="h-16 w-auto mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-[#3a5c40]">Bhagirathi Ayurveda</h3>
                  <p className="text-sm text-[#6b5344] italic">"Where Ancient Wisdom Meets Modern Healing"</p>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="flex flex-col gap-3 text-sm">
                <a href="tel:+919021255057" className="flex items-center text-[#3a5c40] hover:text-[#2d3250] transition-colors">
                  <FaPhone className="mr-2 text-[#5a4a3a]" />
                  +91 9021255057
                </a>
                <a href="mailto:bhagirathiayurveda@gmail.com" className="flex items-center text-[#3a5c40] hover:text-[#2d3250] transition-colors">
                  <FaEnvelope className="mr-2 text-[#5a4a3a]" />
                  bhagirathiayurveda@gmail.com
                </a>
                <a 
                  href="https://maps.google.com/?q=Bhagirathi Ayurveda Pune, India" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-[#3a5c40] hover:text-[#2d3250] transition-colors"
                >
                  <FaMapMarkerAlt className="mr-2 text-[#5a4a3a]" />
                  Pune, India
                </a>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex justify-center space-x-6 py-4 border-t border-[#d6c7b0]">
              <a 
                href="https://www.facebook.com"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6b5344] hover:text-[#3b5998] transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.instagram.com"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6b5344] hover:text-[#E1306C] transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.twitter.com"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6b5344] hover:text-[#1DA1F2] transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://www.youtube.com/@DrManojChaudhariAyurveda"
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#6b5344] hover:text-[#FF0000] transition-colors text-xl"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="pt-4 border-t border-[#d6c7b0] text-center">
              <p className="text-xs text-[#6b5344]">
                © {new Date().getFullYear()} Bhagirathi Ayurveda Panchakarma Clinic & Research Centre. All rights reserved.
              </p>
              <p className="text-[10px] text-[#6b5344] mt-1">
                Admin Dashboard - Proudly preserving the 5,000 year old Ayurvedic tradition
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;
