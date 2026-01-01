import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from 'url:../images/header_images/logo.png';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLowerMenuOpen, setIsLowerMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Path mapping for navigation items
  const pathMapping = {
    'Home': '/',
    'About Us': '/about-us',
    'Consultation': '/consultation',
    'Training Programs': '/training-programs',
    'Ayurveda Treatment': '/ayurveda-treatment',
    'Tourism': '/tourism',
    'Refund policy': '/refund-policy',
    'Contact us': '/contact-us',
    'News / Events': '/news-events',
    'Testimonials': '/testimonials',
    'Video Testimonials': '/video-testimonials',
    'Blogs': '/blogs',
    'Research Collaboration': '/research-collaboration',
    'Photo Gallery': '/photo-gallery',
    'FAQ': '/faq',
    'Request a Call': '/request-call'
  };

  // Close mobile menu when window resizes to desktop size
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

  const toggleLowerMenu = () => {
    setIsLowerMenuOpen(!isLowerMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsLowerMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenus();
  };

  const upperNavItems = [
    'Home', 'About Us', 'Consultation', 'Training Programs', 
    'Ayurveda Treatment', 'Tourism', 'Refund policy', 'Contact us'
  ];

  const lowerNavItems = [
    'News / Events', 'Testimonials', 'Video Testimonials', 'Blogs',
    'Research Collaboration', 'Photo Gallery', 'FAQ'
  ];

  return (
    <div className="font-['Segoe_UI'] sticky top-0 z-50">
      {/* Top Info Section */}
      <div className="flex flex-col md:flex-row justify-between items-center py-0.5 px-4 bg-white">
        <div className="flex items-center w-full md:w-auto justify-between">
          {/* Logo with Link */}
          <Link to="/" className="md:mx-[20px] lg:mx-[40px] xl:mx-[80px]">
            <img src={logo} alt="Bhagirathi Ayurveda" className="h-12 w-auto" />
          </Link>
          
          {/* Mobile menu button */}
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
          
          {/* Admin Login/Dashboard Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/admin/dashboard"
                className="bg-purple-600 text-white text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 hover:bg-purple-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/admin/login"
              className="bg-purple-600 text-white text-xs sm:text-sm py-1.5 px-3 rounded-lg font-medium transition duration-300 hover:bg-purple-700"
            >
              Login
            </Link>
          )}
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
            
            {/* Upper Navigation in Mobile */}
            <nav className="mb-4">
              <ul className="space-y-2">
                {upperNavItems.map((item) => (
                  <li key={item}>
                    <Link 
                      to={pathMapping[item]}
                      className="block py-2 px-4 text-gray-800 hover:bg-purple-100 rounded transition"
                      onClick={closeMenus}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Lower Navigation in Mobile */}
            <div className="mb-4">
              <button 
                className="w-full flex justify-between items-center py-2 px-4 text-gray-800 hover:bg-green-100 rounded transition"
                onClick={toggleLowerMenu}
              >
                <span>More Options</span>
                <svg 
                  className={`w-4 h-4 transform transition ${isLowerMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLowerMenuOpen && (
                <ul className="mt-2 space-y-2 pl-6">
                  {lowerNavItems.map((item) => (
                    <li key={item}>
                      <Link 
                        to={pathMapping[item]}
                        className="block py-2 text-gray-700 hover:text-blue-600 transition"
                        onClick={closeMenus}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Request a Call in Mobile */}
            <div className="mt-4">
              <Link 
                to="/request-call"
                className="bg-green-500 text-white text-center py-2 px-4 rounded-lg font-medium block"
                onClick={closeMenus}
              >
                Request a Call
              </Link>
            </div>
            
            {/* Admin Login/Dashboard in Mobile */}
            <div className="mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link 
                    to="/admin/dashboard"
                    className="bg-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium block"
                    onClick={closeMenus}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg font-medium block w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/admin/login"
                  className="bg-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium block"
                  onClick={closeMenus}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upper Navigation (Desktop)*/}
      <nav className="hidden md:block w-full px-4 md:px-6 lg:px-10 py-3 bg-[#e5c1e5] border-b-[3px] border-[#4646e4]">
        <ul className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          {upperNavItems.map((item) => (
            <li key={item} className="px-1 sm:px-2">
              <Link 
                to={pathMapping[item]}
                className="no-underline text-[#2c1515] text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1 transition-all duration-300 border-b-2 border-transparent hover:text-[#28029c] hover:border-[#2980b9]"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Lower Navigation (Desktop)*/}
      <nav className="hidden md:flex w-full px-4 md:px-6 lg:px-40 py-2 bg-[#e3efed] border-b-[3px] border-[#e0e0e0] justify-center items-center">
        <ul className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          {lowerNavItems.map((item) => (
            <li key={item} className="px-1 sm:px-2">
              <Link 
                to={pathMapping[item]}
                className="no-underline text-[#2c1515] text-xs sm:text-sm md:text-[15px] font-medium flex items-center gap-1 transition-all duration-300 border-b-2 border-transparent hover:text-[#28029c] hover:border-[#2980b9]"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Request a Call Button (Desktop) */}
        <div className="ml-2 sm:ml-10 transition duration-300 hover:scale-[1.02]">
          <Link 
            to="/request-call"
            className="bg-green-500 text-white text-xs sm:text-sm md:text-base py-1 px-2 sm:py-1.5 sm:px-3 rounded-lg font-medium transition duration-300 hover:bg-green-600 cursor-pointer block"
          >
            Request a Call
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;