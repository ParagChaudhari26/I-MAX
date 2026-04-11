import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthApi } from '../../services/api';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : ''
      });
      return;
    }

    setLoading(true);

    try {
      const response = await userAuthApi.login(formData.email, formData.password);
      
      if (response.success && response.data) {
        // Store token in localStorage
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        
        setMessage('Login successful! Redirecting...');
        
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      if (error.code === 'EMAIL_NOT_VERIFIED') {
        setMessage('Please verify your email before logging in. Check your inbox for the verification link.');
        setErrors({ 
          email: 'Email not verified',
          resendEmail: formData.email 
        });
      } else if (error.code === 'INVALID_CREDENTIALS') {
        setErrors({ 
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        });
      } else {
        setMessage(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!errors.resendEmail) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      await userAuthApi.resendVerification(errors.resendEmail);
      setMessage('Verification email sent! Please check your inbox.');
      setErrors({ ...errors, resendEmail: null });
    } catch (error) {
      setMessage(error.message || 'Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8f5f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8 border border-[#d6c7b0]">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#3a5c40]">Sign In</h2>
            <p className="mt-2 text-sm text-[#6b5344]">
              Sign in to your account
            </p>
          </div>

          {message && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.includes('successful') || message.includes('sent')
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-[#d6c7b0]'
                } placeholder-[#a89a8a] text-[#3a5c40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5c40] focus:border-[#3a5c40] sm:text-sm`}
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-[#d6c7b0]'
                } placeholder-[#a89a8a] text-[#3a5c40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a5c40] focus:border-[#3a5c40] sm:text-sm`}
                placeholder="Enter your password"
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <div className="mt-2 text-right">
                <Link to="/forgot-password" className="text-sm font-medium text-[#3a5c40] hover:text-[#2d4a32]">
                  Forgot password?
                </Link>
              </div>
            </div>

            {errors.resendEmail && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">
                  Your email is not verified. Click below to resend the verification email.
                </p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="text-sm text-[#3a5c40] hover:text-[#2d4a32] font-medium underline"
                >
                  Resend Verification Email
                </button>
              </div>
            )}

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
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
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

export default Login;

