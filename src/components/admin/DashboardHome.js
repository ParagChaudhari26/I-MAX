import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { trainingProgramsApi, newsEventsApi, testimonialsApi, blogsApi } from '../../services/api';

function DashboardHome() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    trainingPrograms: { total: 0, active: 0, loading: true },
    newsEvents: { total: 0, published: 0, loading: true },
    testimonials: { total: 0, approved: 0, loading: true },
    blogs: { total: 0, published: 0, loading: true }
  });

  const fetchStats = useCallback(async () => {
    try {
      // Fetch all data in parallel
      const [programs, news, testimonials, blogs] = await Promise.all([
        trainingProgramsApi.getAll(token),
        newsEventsApi.getAll(token),
        testimonialsApi.getAll(token),
        blogsApi.getAll(token),
      ]);

      setStats({
        trainingPrograms: {
          total: programs.data?.length || 0,
          active: programs.data?.filter(p => p.isActive)?.length || 0,
          loading: false
        },
        newsEvents: {
          total: news.data?.length || 0,
          published: news.data?.filter(n => n.isPublished)?.length || 0,
          loading: false
        },
        testimonials: {
          total: testimonials.data?.length || 0,
          approved: testimonials.data?.filter(t => t.isApproved)?.length || 0,
          loading: false
        },
        blogs: {
          total: blogs.data?.length || 0,
          published: blogs.data?.filter(b => b.isPublished)?.length || 0,
          loading: false
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({
        trainingPrograms: { ...prev.trainingPrograms, loading: false },
        newsEvents: { ...prev.newsEvents, loading: false },
        testimonials: { ...prev.testimonials, loading: false },
        blogs: { ...prev.blogs, loading: false }
      }));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchStats();
    }
  }, [token, fetchStats]);

  // Quick stats cards data with Ayurveda theme colors
  const statsCards = [
    {
      name: 'Training Programs',
      path: '/admin/dashboard/training-programs',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-[#3a5c40]',
      stats: stats.trainingPrograms,
      statLabel: 'Active',
      statKey: 'active'
    },
    {
      name: 'News & Events',
      path: '/admin/dashboard/news-events',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'bg-[#6b5344]',
      stats: stats.newsEvents,
      statLabel: 'Published',
      statKey: 'published'
    },
    {
      name: 'Testimonials',
      path: '/admin/dashboard/testimonials',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: 'bg-[#d9a441]',
      stats: stats.testimonials,
      statLabel: 'Approved',
      statKey: 'approved'
    },
    {
      name: 'Blogs',
      path: '/admin/dashboard/blogs',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'bg-[#8b6b4a]',
      stats: stats.blogs,
      statLabel: 'Published',
      statKey: 'published'
    },
  ];

  return (
    <div className="space-y-6 font-serif">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-[#d6c7b0]">
        <h1 className="text-2xl font-bold text-[#3a5c40] mb-2">
          Welcome back, {user?.username || 'Admin'}!
        </h1>
        <p className="text-[#6b5344]">
          Manage your website content from this dashboard. Select a module below to get started.
        </p>
      </div>

      {/* Quick Access Cards with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <Link
            key={card.name}
            to={card.path}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 group border border-[#d6c7b0] hover:border-[#3a5c40]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`inline-flex p-3 rounded-lg ${card.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                {card.icon}
              </div>
              {card.stats.loading ? (
                <div className="animate-pulse bg-[#d6c7b0] h-8 w-12 rounded"></div>
              ) : (
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#3a5c40]">{card.stats.total}</p>
                  <p className="text-xs text-[#6b5344]">Total</p>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-[#3a5c40] mb-1">{card.name}</h3>
            {card.stats.loading ? (
              <div className="animate-pulse bg-[#d6c7b0] h-4 w-24 rounded"></div>
            ) : (
              <p className="text-sm text-[#6b5344]">
                {card.stats[card.statKey]} {card.statLabel} • {card.stats.total - card.stats[card.statKey]} Draft
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Tips Section */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#d6c7b0]">
          <h2 className="text-lg font-semibold text-[#3a5c40] mb-4">Quick Tips</h2>
          <ul className="space-y-3 text-sm text-[#6b5344]">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3a5c40] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Use the sidebar navigation to switch between different content modules.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3a5c40] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Changes you make will be reflected on the public website immediately.
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#3a5c40] mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Click "View Site" in the top bar to see how your changes appear to visitors.
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#d6c7b0]">
          <h2 className="text-lg font-semibold text-[#3a5c40] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/dashboard/blogs"
              className="flex items-center p-3 bg-[#f0e8d8] rounded-lg hover:bg-[#e8dcc8] transition-colors"
            >
              <svg className="w-5 h-5 text-[#3a5c40] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-[#3a5c40] font-medium">New Blog</span>
            </Link>
            <Link
              to="/admin/dashboard/news-events"
              className="flex items-center p-3 bg-[#f0e8d8] rounded-lg hover:bg-[#e8dcc8] transition-colors"
            >
              <svg className="w-5 h-5 text-[#3a5c40] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-[#3a5c40] font-medium">New Event</span>
            </Link>
            <Link
              to="/admin/dashboard/prescriptions"
              className="flex items-center p-3 bg-[#f0e8d8] rounded-lg hover:bg-[#e8dcc8] transition-colors"
            >
              <svg className="w-5 h-5 text-[#3a5c40] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-[#3a5c40] font-medium">Upload Prescription</span>
            </Link>
            <Link
              to="/admin/dashboard/payment-receipts"
              className="flex items-center p-3 bg-[#f0e8d8] rounded-lg hover:bg-[#e8dcc8] transition-colors"
            >
              <svg className="w-5 h-5 text-[#3a5c40] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-[#3a5c40] font-medium">Upload Receipt</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
