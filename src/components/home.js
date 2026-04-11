import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicBlogs } from '../services/api';

const services = [
  { title: 'Consultation', body: 'Personalized health assessment with expert practitioners.', path: '/consultation' },
  { title: 'Training Programs', body: 'Certified courses in yoga, meditation, and nutrition.', path: '/training-programs' },
  { title: 'Ayurveda Treatment', body: 'Authentic therapies using natural herbs and oils.', path: '/ayurveda-treatment' },
  { title: 'Research Collaboration', body: 'Holistic wellness center combining traditional and modern healing approaches.', path: '/research-collaboration' },
];

const whoItems = [
  'Licensed healthcare practitioners use Ayurvedic knowledge to enhance their current practice.',
  'Massage therapists, beauticians and body workers open spas or salons with Panchakarma facilities.',
  'Health and beauty students establish Ayurvedic spas, beauty centers, and wellness centers.',
  'Freelance writers create Ayurveda publications using their deep knowledge.',
  'Researchers participate in Ayurveda projects with vast potential for health solutions.',
  'Entrepreneurs develop Ayurvedic herbal products, supplements, foods, and cosmetics.',
  'Academic students enter teaching or pursue advanced studies through practice and self-experience.',
];

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoadingBlogs(true);
                const data = await getPublicBlogs();
                // Get only the first 4 blogs for the home page
                setBlogs(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoadingBlogs(false);
            }
        };

        fetchBlogs();
    }, []);

    // Color schemes for blog cards
    const colorSchemes = [
        { 
            color: 'bg-purple-100 text-purple-800 border-l-4 border-purple-500',
            borderColor: 'border-purple-500',
            bgColor: 'bg-purple-500'
        },
        { 
            color: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500',
            borderColor: 'border-blue-500',
            bgColor: 'bg-blue-500'
        },
        { 
            color: 'bg-red-100 text-red-800 border-l-4 border-red-500',
            borderColor: 'border-red-500',
            bgColor: 'bg-red-500'
        },
        { 
            color: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500',
            borderColor: 'border-amber-500',
            bgColor: 'bg-amber-500'
        }
    ];

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-[#f4f3f8] min-h-screen">
            {/* Hero Section - Stack on mobile, row on larger screens */}
            {/* Hero Section - Full Window Cover */}
            <div className="hero-section flex items-center justify-center w-full min-h-screen">
            {/* Main Content Area - Centered with max width */}
            <div className="max-w-7xl mx-auto text-center p-8 relative z-10">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-4 tracking-tighter">
                    Bhagirathi Ayurveda
                </h1>
                <h2 className="text-5xl md:text-7xl lg:text-6xl font-bold text-[#F9CB28] mb-6 tracking-tight pt-3.5">
                    Panchkarma Clinic &amp; Research Centre
                </h2>
                <p className="text-2xl md:text-3xl text-white opacity-90 mb-50">
                    &quot; आरोग्यं धनसंपदा &quot;
                </p>
            </div>
        </div>

            {/* Welcome Section */}
            <div className="bg-[#f8f5f2]  py-8 md:py-9 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-6.5xl text-center pb-6 md:pb-8">
                    <h2 className="text-[#2d024f] text-xl md:text-4xl font-bold mt-1">Welcome to</h2>
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#825900] via-[#97800d] to-[#705f03] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold inline-block mx-auto sm:mx-2 mt-1 px-1 sm:px-2 py-3">
                        Bhagirathi Ayurveda
                    </h2>
                    <h2 className="text-[#2d024f] text-xl md:text-4xl font-bold mt-1">Panchkarma Clinic &amp; Research Centre !!!</h2>
                </div>
                <p className="w-full max-w-6xl text-left text-base md:text-lg text-[#0b2c2c] font-gentium tracking-wide pt-4 md:pt-2 pb-5 font-serif ">
                    Ayurveda, literally means the science of life (Ayur = Life, Veda = Science). Ayurveda, the science of life and longevity, is the oldest healthcare system in the world and it combines the profound thoughts of medicine and philosophy. Ayurveda is an ancient medical science which was developed in India thousands of years ago.
                </p>
            </div>

            {/* Cards Section*/}
            <div className="py-16 px-4 bg-white">
              <div className="max-w-110 mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-emerald-800 mb-3 font-serif">Ayurvedic Wellness Services</h2>
                <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
              </div>
                
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {services.map((card, index) => (
                  <Link 
                    key={index}
                    to={card.path}
                    className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`h-2 w-full ${['bg-amber-500','bg-teal-500','bg-rose-500','bg-emerald-500'][index % 4]}`}></div>
        
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${['bg-amber-500','bg-teal-500','bg-rose-500','bg-emerald-500'][index % 4]} rounded-lg flex items-center justify-center mr-4`}>
                          <div className="w-6 h-6 bg-white rounded-sm"></div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-5">{card.body}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Ayurveda Practitioners Section */}
            <div className="max-w-7xl mx-auto py-8 md:py-12 px-4">
                <h1 className="text-[#2a5c42] text-2xl md:text-3xl text-center pb-3 border-b-2 border-[#d4a76a]">Who Studies and Practices Ayurveda?</h1>
                <p className="italic text-center mb-4 md:mb-6 text-sm md:text-base">As a complete natural healthcare system, people who want lifelong health or to cure their own diseases study Ayurveda.</p>
                
                <ul className="space-y-3 md:space-y-4 list-none pl-0">
                    {whoItems.map((item, index) => (
                        <li 
                            key={index}
                            className="bg-white p-3 md:p-4 border-l-4 border-[#d4a76a] shadow-md transition-transform duration-300 hover:translate-x-3"
                        >
                            <span className="text-[#2a5c42] font-bold">{item.split(' ')[0] + ' ' + item.split(' ')[1]}</span> {item.split(' ').slice(2).join(' ')}
                        </li>
                    ))}
                </ul>
                
                <p className="font-bold text-center text-lg md:text-xl text-[#2a5c42] mt-6 md:mt-8">The possibilities in Ayurveda are endless and everlasting.</p>
            </div>

            {/* Blog Section */}
            <div className="max-w-7xl mx-auto py-10 md:py-16 px-4">
                <h1 className="text-2xl md:text-4xl text-[#2c3e50] text-center mb-8 md:mb-12 relative after:content-[''] after:absolute after:-bottom-2 md:after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#a6af24] after:to-[#2ecc71] font-bold font-serif ">
                    Explore our blogs
                </h1>
                
                {loadingBlogs ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a5c40]"></div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-600">
                        <p>No blogs available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {blogs.map((blog, index) => {
                            const scheme = colorSchemes[index % colorSchemes.length];
                            const title = typeof blog.title === 'string' ? blog.title : (blog.title?.en || 'Untitled');
                            const excerpt = typeof blog.excerpt === 'string' ? blog.excerpt : (blog.excerpt?.en || '');
                            const image = blog.featuredImage || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80';
                            
                            return (
                                <div 
                                    key={blog._id || blog.id}
                                    className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                                    style={{ minHeight: '400px' }}
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img 
                                            src={image}
                                            alt={title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-between p-6 z-10">
                                        {/* Top Badge */}
                                        <div className="flex justify-between items-start">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20">
                                                {blog.category || 'blog'}
                                            </span>
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="space-y-4">
                                            {/* Read Full Story - Appears on Hover */}
                                            <div className="overflow-hidden">
                                                <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="inline-block">
                                                        <span className="text-xs font-bold uppercase tracking-widest text-white border-b-2 border-[#ff6b35] pb-1">
                                                            READ FULL STORY
                                                        </span>
                                                        <div className="h-0.5 bg-gradient-to-r from-[#ff6b35] to-transparent mt-1 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-[#ff6b35] transition-colors duration-300">
                                                {title}
                                            </h3>

                                            {/* Date & Category */}
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">{formatDate(blog.publishDate)}</span>
                                                <div className={`w-3 h-3 rounded-full ${scheme.bgColor}`}></div>
                                            </div>

                                            {/* CTA Link */}
                                            <Link
                                                to="/blogs"
                                                className="inline-flex items-center text-sm font-medium text-white hover:text-[#ff6b35] transition-colors duration-300 group/link"
                                            >
                                                <span>Go to Blogs Section</span>
                                                <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Animated Border on Hover */}
                                    <div className={`absolute inset-0 ${scheme.borderColor} border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none`}></div>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                <div className="text-center mt-10">
                    <Link 
                        to="/blogs" 
                        className="text-[#3498db] font-medium text-base md:text-lg transition-all hover:text-[#2980b9]"
                    >
                        View all Blogs
                    </Link>
                </div>
            </div>

            {/* Video Testimonials */}
            <div className="bg-green-800 py-10 md:py-10">
                <h1 className="text-2xl md:text-4xl text-white text-center mb-10 md:mb-16 relative after:content-[''] after:absolute after:-bottom-2 md:after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-16 md:after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#a6af24] after:to-[#2ecc71] h-12 font-bold font-serif ">
                    Explore our Video Testimonials
                </h1>
                
                <div className="py-1 px-4">
                    <div className="max-w-7xl mx-auto">
    
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                               {
                                  title: "Ayushkamiya Adhyaya - Ashtanga Hridaya Sutrasthana - Chapter 1: Dr. Manoj Chaudhari (Pune)",
                                  id: "dDYR2WVlm3A"
                                },
                                {
                                  title: "Ritucharya Adhyaya (Seasonal Regimen) - Ashtanga Hridaya Sutrasthana - Chapter 3: Dr. Manoj Chaudhari",
                                  id: "RDJRv1oP7_g"
                                },
                                {
                                  title: "Dinacharya Adhyaya (Daily Regimen) - Ashtanga Hridaya - Sutrasthana - Chapter 2: Dr. Manoj Chaudhari",
                                  id: "Xnib9btMubI"
                                },
                                {
                                  title: "Annaswaroopa Vidnyayiya Part 1of6 - Ashtanga Hridaya - Sutrasthana - Chapter 6: Dr. Manoj Chaudhari",
                                  id: "QH6Yl7KXmBs"
                                }
                            ].map((video, index) => (
                            <div 
                              key={index}
                              className=" rounded-2xl  overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                            >
                                <div className="relative pb-[56.25%]">
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        className="absolute top-0 left-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={video.title}
                                    ></iframe>
                                </div>
          
                                <div className="p-4 bg-gradient-to-br from-white to-gray-50">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                        {video.title}
                                    </h3>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-6 md:mt-10">
                    <Link 
                        to="/video-testimonials" 
                        className="text-white font-medium text-base md:text-lg transition-all hover:text-[#c7ff2c]"
                    >
                        View all Video Testimonials
                    </Link>
                </div>
            </div>

            {/* Conclusion Section */}
            <div className="bg-[#fcf7fd] py-8 md:py-7 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-6xl text-center pb-4 md:pb-6">
                    <h2 className="text-[#2d024f] text-xl md:text-4xl font-serif mt-3">This is the perfect time to learn about Ayurveda!</h2>
                </div>
                <p className="w-full max-w-7xl text-left text-base md:text-lg text-[#0b2c2c] font-serif tracking-wide mt-5 mb-5">
                    Bhagirathi Ayurveda Centre is one of the only Ayurveda Academies offering authentic, Indian-sourced education, services and products. Our faculty Doctors are post graduates in Ayurveda with years of clinical and teaching experience.
                </p>
            </div>
        </div>
    );
}

export default Home;