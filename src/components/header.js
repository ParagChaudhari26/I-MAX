import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAuthApi } from '../services/api';
import NotificationBell from './NotificationBell';
import logo from 'url:../images/header_images/logo.png';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLowerMenuOpen, setIsLowerMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Consultation', path: '/consultation' },
    { label: 'Training Programs', path: '/training-programs' },
    { label: 'Ayurveda Treatment', path: '/ayurveda-treatment' },
    { label: 'Tourism', path: '/tourism' },
    { label: 'Refund Policy', path: '/refund-policy' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const lowerNavItems = [
    { label: 'News / Events', path: '/news-events' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Video Testimonials', path: '/video-testimonials' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Research Collaboration', path: '/research-collaboration' },
    { label: 'Photo Gallery', path: '/photo-gallery' },
    { label: 'FAQ', path: '/faq' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsLowerMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsLowerMenuOpen(false);
  };

  const toggleLowerMenu = () => setIsLowerMenuOpen(!isLowerMenuOpen);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLowerMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenus();
  };

  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  const userData = typeof window !== 'undefined' ? localStorage.getItem('userData') : null;
  const isUserLoggedIn = !!userToken;
  const currentUser = userData ? JSON.parse(userData) : null;

  const handleUserLogout = async () => {
    if (userToken) {
      try {
        await userAuthApi.logout(userToken);
      } catch (_) {}
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
    }
    navigate('/');
    closeMenus();
  };

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="font-['Segoe_UI'] sticky top-0 z-40 mt-[32px]">
      {/* Top Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-center py-0.5 px-4 bg-white">
        <div className="flex items-center w-full md:w-auto justify-between">
          <Link to="/" className="md:mx-[20px] lg:mx-[40px] xl:mx-[80px]">
            <img src={logo} alt="Bhagirathi Ayurveda" className="h-12 w-auto" />
          </Link>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mt-2 md:mt-0">
          <div className="font-medium text-xs sm:text-sm">
            <a href="tel:+91902125057" className="hover:underline">+91 902125057</a>
          </div>
          <div className="font-medium text-xs sm:text-sm">
            <a href="https://maps.google.com/?q=Bhagirathi Ayurveda Pune, India" target="_blank" rel="noopener noreferrer" className="hover:underline">Bhagirathi Ayurveda Pune, India</a>
          </div>
          <div className="font-medium text-xs sm:text-sm">
            <a href="mailto:bhagirathiayurveda@gmail.com" className="hover:underline">bhagirathiayurveda@gmail.com</a>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/admin/dashboard" className="bg-purple-600 text-white text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 hover:bg-purple-700">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-gray-500 text-white text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 hover:bg-gray-600">
                Logout
              </button>
            </div>
          ) : isUserLoggedIn ? (
            <div className="relative flex items-center gap-2">
              <button onClick={toggleUserMenu} className="flex items-center gap-2 text-[#3a5c40] hover:text-[#2d4a32] text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 border border-[#3a5c40] bg-white hover:bg-[#f0f5f0]">
                <span className="hidden sm:inline">{currentUser?.email?.split('@')[0] || 'User'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <svg className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link to="/user/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition" onClick={closeMenus}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      Dashboard
                    </div>
                  </Link>
                  <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition" onClick={closeMenus}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      My Profile
                    </div>
                  </Link>
                  <hr className="my-2" />
                  <button onClick={handleUserLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="text-[#3a5c40] hover:text-[#2d4a32] text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 border border-[#3a5c40] bg-white hover:bg-[#f0f5f0]">
              Login
            </Link>
          )}

          <NotificationBell />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg fixed inset-0 top-11 z-40 overflow-y-auto">
          <div className="p-4">
            <div className="font-medium mb-4">
              <p className="text-sm"><a href="tel:+91902125057" className="hover:underline">+91 902125057</a></p>
              <p className="text-sm mt-1"><a href="https://maps.google.com/?q=Bhagirathi Ayurveda Pune, India" target="_blank" rel="noopener noreferrer" className="hover:underline">Bhagirathi Ayurveda Pune, India</a></p>
              <p className="text-sm mt-1"><a href="mailto:bhagirathiayurveda@gmail.com" className="hover:underline">bhagirathiayurveda@gmail.com</a></p>
            </div>

            <nav className="mb-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="block py-2 px-4 text-gray-800 hover:bg-purple-100 rounded transition" onClick={closeMenus}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mb-4">
              <button className="w-full flex justify-between items-center py-2 px-4 text-gray-800 hover:bg-green-100 rounded transition" onClick={toggleLowerMenu}>
                <span>More Options</span>
                <svg className={`w-4 h-4 transform transition ${isLowerMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLowerMenuOpen && (
                <ul className="mt-2 space-y-2 pl-6">
                  {lowerNavItems.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="block py-2 text-gray-700 hover:text-blue-600 transition" onClick={closeMenus}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link to="/admin/dashboard" className="bg-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium block" onClick={closeMenus}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg font-medium block w-full">
                    Logout
                  </button>
                </div>
              ) : isUserLoggedIn ? (
                <div className="space-y-2">
                  <Link to="/user/dashboard" className="border-2 border-[#3a5c40] text-[#3a5c40] bg-white hover:bg-[#f0f5f0] text-center py-2 px-4 rounded-lg font-medium block" onClick={closeMenus}>
                    Dashboard
                  </Link>
                  <Link to="/user/profile" className="border-2 border-[#3a5c40] text-[#3a5c40] bg-white hover:bg-[#f0f5f0] text-center py-2 px-4 rounded-lg font-medium block" onClick={closeMenus}>
                    My Profile
                  </Link>
                  <button onClick={handleUserLogout} className="border-2 border-red-500 text-red-600 bg-white hover:bg-red-50 text-center py-2 px-4 rounded-lg font-medium block w-full">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="border-2 border-[#3a5c40] text-[#3a5c40] bg-white hover:bg-[#f0f5f0] text-center py-2 px-4 rounded-lg font-medium block" onClick={closeMenus}>
                  Login
                </Link>
              )}
            </div>

            <div className="mt-4">
              <Link to="/request-call" className="bg-green-500 text-white text-center py-2 px-4 rounded-lg font-medium block" onClick={closeMenus}>
                Request a Call
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Upper Navigation (Desktop) */}
      <nav className="hidden md:block w-full px-4 md:px-6 lg:px-10 py-3 bg-[#e5c1e5] border-b-[3px] border-[#4646e4]">
        <ul className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          {navItems.map((item) => (
            <li key={item.path} className="px-1 sm:px-2">
              <Link to={item.path} className="no-underline text-[#2c1515] text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1 transition-all duration-300 border-b-2 border-transparent hover:text-[#28029c] hover:border-[#2980b9]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Lower Navigation (Desktop) */}
      <nav className="hidden md:flex w-full px-4 md:px-6 lg:px-40 py-2 bg-[#e3efed] border-b-[3px] border-[#e0e0e0] justify-center items-center">
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          {lowerNavItems.map((item) => (
            <li key={item.path} className="px-1 sm:px-2">
              <Link to={item.path} className="no-underline text-[#2c1515] text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1 transition-all duration-300 border-b-2 border-transparent hover:text-[#28029c] hover:border-[#2980b9]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-2 sm:ml-10 transition duration-300 hover:scale-[1.02]">
          <Link to="/request-call" className="bg-green-500 text-white text-xs sm:text-sm md:text-base py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg font-medium transition duration-300 hover:bg-green-600 cursor-pointer block">
            Request a Call
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;