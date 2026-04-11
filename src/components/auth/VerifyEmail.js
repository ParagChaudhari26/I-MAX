import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { userAuthApi } from '../../services/api';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    
    if (!tokenParam) {
      setStatus('error');
      setMessage('No verification token provided. Please check your email for the verification link.');
      return;
    }

    setToken(tokenParam);
    verifyToken(tokenParam);
  }, [searchParams]);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await userAuthApi.verifyEmail(tokenToVerify);
      
      if (response.success) {
        setStatus('success');
        setMessage('Email verified successfully! You can now log in to your account.');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setStatus('error');
      
      if (error.code === 'TOKEN_EXPIRED') {
        setMessage('This verification link has expired. Please request a new verification email.');
      } else if (error.code === 'INVALID_TOKEN') {
        setMessage('Invalid verification token. Please check your email for the correct verification link.');
      } else if (error.code === 'ALREADY_VERIFIED') {
        setMessage('Your email is already verified. You can log in to your account.');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage(error.message || 'Verification failed. Please try again.');
      }
    }
  };

  const handleResendVerification = async () => {
    // Extract email from token or prompt user
    const email = prompt('Please enter your email address to resend the verification link:');
    
    if (!email) return;

    try {
      await userAuthApi.resendVerification(email);
      setMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage(error.message || 'Failed to resend verification email.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8f5f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8 border border-[#d6c7b0] text-center">
          {status === 'verifying' && (
            <>
              <div className="mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3a5c40] mx-auto"></div>
              </div>
              <h2 className="text-2xl font-bold text-[#3a5c40] mb-4">Verifying Your Email</h2>
              <p className="text-[#6b5344]">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#3a5c40] mb-4">Email Verified!</h2>
              <p className="text-[#6b5344] mb-6">{message}</p>
              <p className="text-sm text-gray-500">Redirecting to login page...</p>
              <Link
                to="/login"
                className="mt-4 inline-block text-[#3a5c40] hover:text-[#2d4a32] font-medium"
              >
                Go to Login →
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
              <p className="text-[#6b5344] mb-6">{message}</p>
              
              <div className="space-y-4">
                <button
                  onClick={handleResendVerification}
                  className="w-full bg-gradient-to-r from-[#3a5c40] to-[#4a7c50] text-white px-4 py-2 rounded-lg hover:from-[#2d4a32] hover:to-[#3a6340] transition-colors"
                >
                  Resend Verification Email
                </button>
                
                <Link
                  to="/login"
                  className="block w-full text-center text-[#3a5c40] hover:text-[#2d4a32] font-medium"
                >
                  Go to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;

