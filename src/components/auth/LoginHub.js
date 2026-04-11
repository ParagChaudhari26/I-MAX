import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Login hub: single entry for User and Admin auth.
 * Styled to match site UI (Consultation / Admin Login pages).
 */
function LoginHub() {
  return (
    <div className="min-h-[70vh] bg-[#f8f5f0] py-12 sm:py-16 px-4 font-['Segoe_UI']">
      <div className="max-w-lg mx-auto">
        {/* Page title */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-[#2a2118] tracking-tight">
            Sign in
          </h1>
          <p className="mt-2 text-[#5a5248] text-sm sm:text-base">
            Choose how you would like to continue
          </p>
          <div className="w-16 h-0.5 bg-[#8a6e4b] mx-auto mt-4" aria-hidden="true" />
        </div>

        <div className="space-y-6">
          {/* User Login card */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e5e0d6] overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#3a5c40]/10 text-[#3a5c40]" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-[#2c1515]">
                  User Login
                </h2>
              </div>
              <p className="text-sm text-[#5a5248] mb-5 ml-12">
                Register a new account or sign in as a user.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/register"
                  className="flex-1 text-center py-3 px-4 rounded-lg font-medium text-[#3a5c40] bg-white border-2 border-[#3a5c40] hover:bg-[#f0f5f0] transition-colors duration-200"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="flex-1 text-center py-3 px-4 rounded-lg font-medium text-white bg-[#3a5c40] border-2 border-[#3a5c40] hover:bg-[#2d4a32] transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            </div>
          </section>

          {/* Admin Login card */}
          <section className="bg-white rounded-xl shadow-sm border border-[#e5e0d6] overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-100 text-purple-700" aria-hidden="true">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-[#2c1515]">
                  Admin Login
                </h2>
              </div>
              <p className="text-sm text-[#5a5248] mb-5 ml-12">
                Sign in to access the admin dashboard.
              </p>
              <Link
                to="/admin/login"
                className="inline-flex items-center justify-center w-full sm:w-auto min-w-[140px] py-3 px-6 rounded-lg font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
              >
                Admin Login
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LoginHub;
