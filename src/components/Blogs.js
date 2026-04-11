import React, { useState, useEffect } from 'react';
import { getPublicBlogs } from '../services/api';

function Blogs() {
    const [rawBlogs, setRawBlogs] = useState([]);
    const [blogsData, setBlogsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const resolveText = (val) => typeof val === 'string' ? val : (val?.en || '');

    // Color mapping based on category or index
    const getColorClass = (category, index) => {
        const colors = [
            'bg-purple-100 text-purple-800 border-l-4 border-purple-500',
            'bg-blue-100 text-blue-800 border-l-4 border-blue-500',
            'bg-red-100 text-red-800 border-l-4 border-red-500',
            'bg-amber-100 text-amber-800 border-l-4 border-amber-500',
            'bg-green-100 text-green-800 border-l-4 border-green-500',
            'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500'
        ];
        return colors[index % colors.length];
    };

    // Format date from backend
    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching blogs from backend...');
                const blogs = await getPublicBlogs();
                console.log('Blogs received from backend:', blogs);
                
                // Check if blogs is an array
                if (!Array.isArray(blogs)) {
                    console.error('Blogs is not an array:', blogs);
                    throw new Error('Invalid response format from server');
                }
                
                console.log('Mapped blogs based on language won\'t be fully done here, saving raw data');
                setRawBlogs(blogs);
                
                // If no blogs found, show message but don't set error
                if (blogs.length === 0) {
                    console.warn('No published blogs found in database. Make sure blogs are created and published in the admin panel.');
                    // Fallback removed to enforce dynamic rendering from database
                    setRawBlogs([]);
                }
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError(err.message || 'Failed to load blogs. Please check if the backend server is running.');
                setRawBlogs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    // Re-run the mapping whenever language changes
    useEffect(() => {
        if (!rawBlogs || rawBlogs.length === 0) {
            setBlogsData([]);
            return;
        }

        const mappedBlogs = rawBlogs.map((blog, index) => ({
            id: blog._id || blog.slug || `blog-${index}`,
            title: resolveText(blog.title) || 'Untitled',
            date: formatDate(blog.publishDate || blog.createdAt),
            excerpt: resolveText(blog.excerpt) || 'No excerpt available',
            content: resolveText(blog.content) || '<p>Content not available</p>',
            color: getColorClass(blog.category, index)
        }));
        
        setBlogsData(mappedBlogs);
    }, [rawBlogs]);



    return (
        <div>
            {/* Blog Section */}
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
                                    Blogs
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
                
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="max-w-7xl mx-auto px-4 py-10">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <p className="font-semibold">Error loading blogs.</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Blog Cards Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-10 md:py-16 px-4">
                        {blogsData.length > 0 ? (
                            blogsData.map((blog) => (
                                <BlogCard 
                                    key={blog.id}
                                    blog={blog}
                                    onReadArticle={() => {
                                        const modal = document.getElementById('blog-modal');
                                        const contentDiv = document.getElementById('blog-content');
                                        
                                        // Update modal content
                                        document.getElementById('blog-title').textContent = blog.title;
                                        document.getElementById('blog-date').textContent = `Published on ${blog.date}`;
                                        contentDiv.innerHTML = blog.content || '<p class="text-center py-8">Content will be added here</p>';
                                        
                                        // Show modal
                                        modal.classList.remove('hidden');
                                        document.body.style.overflow = 'hidden'; // Prevent scrolling
                                    }}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-600 text-lg">No blogs available yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Blog Modal */}
            <BlogModal />
        </div>
    )
}

function BlogCard({ blog, onReadArticle }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 mt-3">
            <div className={`px-4 py-3 ${blog.color} text-sm font-medium`}>
                Blog
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {blog.excerpt}
                </p>

                <div className="text-sm text-gray-500 mb-4">
                    <span>{blog.date}</span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <button 
                        className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors"
                        onClick={onReadArticle}
                    >
                        Read Article
                    </button>
                </div>
            </div>
        </div>
    );
}

// Blog Modal Component
function BlogModal() {
    const closeModal = () => {
        const modal = document.getElementById('blog-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    // Add event listener for Escape key to close modal
    if (typeof window !== 'undefined') {
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('blog-modal');
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    return (
        <div id="blog-modal" className="hidden fixed inset-0 bg-black bg-opacity-70  items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-7.5xl w-full max-h-[96vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h2 id="blog-title" className="text-2xl font-bold text-gray-800"></h2>
                    <button 
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    <div id="blog-date" className="text-sm text-gray-500 mb-6"></div>
                    <div id="blog-content" className="prose max-w-none"></div>
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={closeModal}
                            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;