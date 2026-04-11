import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAuthApi } from '../../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);

    try {
      const response = await userAuthApi.forgotPassword(email);
      
      if (response.success) {
        setMessage(response.message || 'If an account exists with this email, a password reset link has been sent.');
        setEmail('');
      }
    } catch (err) {
      setMessage(err.message || 'If an account exists with this email, a password reset link has been sent.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8f5f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8 border border-[#d6c7b0]">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#3a5c40]">Forgot Password</h2>
            <p className="mt-2 text-sm text-[#6b5344]">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {message && (
            <div className="mb-4 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5a4a3a]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#d6c7b0] placeholder-[#a89a8a] text-[#3a5c40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5c40] focus:border-[#3a5c40] sm:text-sm"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  loading
                    ? 'bg-[#6b8a6f] cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] hover:from-[#2d4a32] hover:to-[#3a6340] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3a5c40]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[#6b5344]">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-[#3a5c40] hover:text-[#2d4a32]">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-[#6b5344]">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-[#3a5c40] hover:text-[#2d4a32]">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
