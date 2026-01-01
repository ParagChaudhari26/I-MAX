import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';

// Use static path for logo
const logoPath = new URL('../../images/header_images/logo.png', import.meta.url).href;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionExpiredMessage, setSessionExpiredMessage] = useState('');
  
  const { login, isAuthenticated, error: authError, setError, clearSessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if redirected due to session expiration
  useEffect(() => {
    if (location.state?.sessionExpired) {
      setSessionExpiredMessage('Your session has expired. Please log in again.');
      // Clear the session expired state
      if (clearSessionExpired) {
        clearSessionExpired();
      }
    }
  }, [location.state, clearSessionExpired]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the page they were trying to access, or dashboard
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location.state]);

  // Clear auth error when component unmounts
  useEffect(() => {
    return () => {
      if (setError) setError(null);
    };
  }, [setError]);

  const validateForm = () => {
    if (!username.trim()) {
      setFormError('Username is required');
      return false;
    }
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    setSessionExpiredMessage('');

    const result = await login(username.trim(), password);
    
    setIsSubmitting(false);

    if (result.success) {
      // Redirect to the page they were trying to access, or dashboard
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from);
    }
  };

  const displayError = formError || authError;

  return (
    <div className="min-h-screen flex flex-col font-serif bg-[#f8f5f0]">
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm border-b border-[#d6c7b0]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="md:mx-[20px] lg:mx-[40px] xl:mx-[80px]">
            <img src={logoPath} alt="Bhagirathi Ayurveda" className="h-12 w-auto" />
          </Link>
          <Link 
            to="/"
            className="text-sm text-[#5a4a3a] hover:text-[#3a5c40] transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#3a5c40]">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-[#6b5344]">
              Sign in to access the admin dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md border border-[#d6c7b0]" onSubmit={handleSubmit}>
            {sessionExpiredMessage && (
              <div className="bg-[#f0e8d8] border border-[#d9a441] text-[#6b5344] px-4 py-3 rounded-lg relative" role="alert">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#d9a441]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="block sm:inline">{sessionExpiredMessage}</span>
                </div>
              </div>
            )}
            
            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <span className="block sm:inline">{displayError}</span>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#5a4a3a]">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#d6c7b0] placeholder-[#a89a8a] text-[#3a5c40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5c40] focus:border-[#3a5c40] sm:text-sm"
                  placeholder="Enter your username"
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#5a4a3a]">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#d6c7b0] placeholder-[#a89a8a] text-[#3a5c40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5c40] focus:border-[#3a5c40] sm:text-sm"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  isSubmitting 
                    ? 'bg-[#6b8a6f] cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] hover:from-[#2d4a32] hover:to-[#3a6340] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a5c40]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer - Matching Frontend Style */}
      <footer className="bg-gradient-to-r from-[#e8d9c5] to-[#d9c5a8] border-t border-[#d6c7b0]">
        <div className="max-w-6xl mx-auto py-6 px-6">
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
            <a href="tel:+919021255057" className="flex items-center text-[#3a5c40] hover:text-[#2d3250] transition-colors">
              <FaPhone className="mr-2 text-[#5a4a3a]" />
              +91 9021255057
            </a>
            <a href="mailto:bhagirathiayurveda@gmail.com" className="flex items-center text-[#3a5c40] hover:text-[#2d3250] transition-colors">
              <FaEnvelope className="mr-2 text-[#5a4a3a]" />
              bhagirathiayurveda@gmail.com
            </a>
          </div>
          
          {/* Social Media */}
          <div className="flex justify-center space-x-6 mb-4">
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
          <div className="text-center">
            <p className="text-xs text-[#6b5344]">
              © {new Date().getFullYear()} Bhagirathi Ayurveda Panchakarma Clinic & Research Centre. All rights reserved.
            </p>
            <p className="text-[10px] text-[#6b5344] mt-1">
              Proudly preserving the 5,000 year old Ayurvedic tradition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginForm;
