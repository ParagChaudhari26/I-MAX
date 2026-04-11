import React, { useState, useEffect } from 'react';
import { getPublicNewsEvents } from '../services/api';

const resolveText = (val) => typeof val === 'string' ? val : (val?.en || '');

function News() {
    const [newsEvents, setNewsEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNewsEvents() {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching news/events from backend...');
                const data = await getPublicNewsEvents();
                console.log('News/Events received from backend:', data);
                
                // Check if data is an array
                if (!Array.isArray(data)) {
                    console.error('News/Events is not an array:', data);
                    throw new Error('Invalid response format from server');
                }
                
                setNewsEvents(data);
            } catch (err) {
                console.error('Error fetching news/events:', err);
                setError(err.message || 'Failed to load news and events. Please check if the backend server is running.');
                setNewsEvents([]);
            } finally {
                setLoading(false);
            }
        }

        fetchNewsEvents();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            {/* Header Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f8f5f2] z-0">
                    <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-multiply"></div>
                </div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-25 relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="max-w-2xl border-3 border-[#e5e0d6] rounded-lg p-6 w-full md:w-auto">
                        <div className="mb-6 md:mb-8">
                             <span className="text-[#8a6e4b] font-medium tracking-wider pl-1 text-sm md:text-base">Welcome to</span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#2a2118] leading-tight mt-3 md:mt-4 mb-4 md:mb-6">
                                Bhagirathi Ayurveda Panchakarma Clinic &amp; Research Centre
                            </h1>
                            <div className="w-16 md:w-20 h-0.5 bg-[#8a6e4b] my-4 md:my-6"></div>
                            <p className="text-base md:text-lg text-[#5a5248] font-light">"Where Ancient Wisdom Meets Modern Healing"</p>
                        </div>
                    </div>
                    <div className="md:ml-12 lg:ml-30 mt-8 md:mt-30 self-center md:self-auto">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#3a2f1d] leading-tight mt-0 md:mt-4 mb-4 md:mb-6 relative inline-block">
                            <span className="relative z-10">
                                News &amp; Events
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {!loading && newsEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {newsEvents.map((item) => (
                                <NewsEventCard 
                                    key={item._id} 
                                    item={item} 
                                    formatDate={formatDate} 
                                    translate={resolveText}
                                />
                            ))}
                        </div>
                    ) : !loading && (
                        <ComingSoonCard />
                    )}
                </div>
            </div>
        </div>
    );
}

function NewsEventCard({ item, formatDate, translate }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-xl">
            {item.imageUrl && (
                <div className="h-48 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
            )}
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${item.type === 'Event' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.type}
                    </span>
                    <span className="text-sm text-gray-500">{formatDate(item.publishDate)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {translate(item.title)}
                </h3>
                {item.type === 'Event' && (
                    <div className="mb-3 space-y-1">
                        {item.eventDate && (
                            <div className="flex items-center text-sm text-amber-700">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(item.eventDate)}
                            </div>
                        )}
                        {item.location && (
                            <div className="flex items-center text-sm text-amber-700">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {item.location}
                            </div>
                        )}
                    </div>
                )}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {translate(item.content)}
                </p>
                {item.author && <p className="text-xs text-gray-500">By {item.author}</p>}
            </div>
        </div>
    );
}

function ComingSoonCard() {
    return (
        <div className="bg-white rounded-lg overflow-hidden border-amber-700 border-2">
            <div className="p-8 md:p-12 text-center">
                <div className="text-green-700 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">News &amp; Events Coming Soon</h2>
                <p className="text-gray-600 text-lg mb-6">New content will be published here. Stay tuned!</p>
                <div className="animate-pulse flex justify-center space-x-4 mb-8">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default News;
