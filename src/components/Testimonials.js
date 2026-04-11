import React, { useState, useEffect } from 'react';
import { getPublicTestimonials } from '../services/api';

const resolveText = (val) => typeof val === 'string' ? val : (val?.en || '');

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Color mapping for testimonials
    const colorSchemes = [
        { textBody: "text-amber-900", textName: "text-amber-800" },
        { textBody: "text-rose-900", textName: "text-rose-800" },
        { textBody: "text-emerald-900", textName: "text-emerald-800" },
        { textBody: "text-violet-900", textName: "text-violet-800" },
        { textBody: "text-cyan-900", textName: "text-cyan-800" },
        { textBody: "text-orange-900", textName: "text-orange-800" },
        { textBody: "text-fuchsia-900", textName: "text-fuchsia-800" },
        { textBody: "text-sky-900", textName: "text-sky-800" },
        { textBody: "text-lime-900", textName: "text-lime-800" },
    ];

    // Map image class names (you may need to adjust this based on your image naming)
    const getImageClass = (imageUrl, customerName) => {
        if (imageUrl) {
            // Extract filename from URL and remove extension
            const filename = imageUrl.split('/').pop().split('.')[0];
            return filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
        }
        // Fallback: try to match name to existing image classes
        const nameLower = customerName.toLowerCase();
        const imageMap = {
            'angela': 'angela',
            'cecilia': nameLower.includes('pancali') ? 'cecilia-p' : 'cecilia',
            'yuri': 'yuri',
            'ettore': 'ettore',
            'maria': 'maria',
            'chiharu': 'chiharu',
            'dorota': 'dorota',
            'natalia': 'natalia',
            'sayuri': 'sayuri',
            'daniela': 'daniela',
            'sebastian': 'sebastian',
            'candida': 'candida',
            'saskia': 'saskia',
            'giulia': 'giulia',
            'renate': 'renate',
            'sabrina': 'sabrina',
            'marcela': 'marcela',
            'sonia': 'sonia',
            'monica': 'monica',
            'irene': 'irene',
            'sarah': 'sarah',
            'vanessa': 'vanessa',
            'claudia': 'claudia',
            'elena': 'elena',
            'nicola': 'nicola',
            'mai': 'mai',
            'heena': 'heena',
        };
        for (const [key, value] of Object.entries(imageMap)) {
            if (nameLower.includes(key)) {
                return value;
            }
        }
        return 'default';
    };

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching testimonials from backend...');
                const data = await getPublicTestimonials();
                console.log('Testimonials received from backend:', data);
                
                // Check if data is an array
                if (!Array.isArray(data)) {
                    console.error('Testimonials is not an array:', data);
                    throw new Error('Invalid response format from server');
                }
                
                // Map backend testimonial structure to frontend format
                const mappedTestimonials = data.map((testimonial, index) => ({
                    id: testimonial._id || `testimonial-${index}`,
                    name: testimonial.customerName || 'Anonymous',
                    from: testimonial.customerLocation || '',
                    // Store raw localized fields; translation happens at render time
                    text: testimonial.testimonialText || '',
                    imageClass: getImageClass(testimonial.imageUrl, testimonial.customerName),
                    colors: colorSchemes[index % colorSchemes.length],
                    rating: testimonial.rating || 5,
                    treatment: testimonial.treatment || '',
                    dateReceived: testimonial.dateReceived || testimonial.createdAt
                }));
                
                console.log('Mapped testimonials:', mappedTestimonials);
                setTestimonials(mappedTestimonials);
                
                // If no testimonials found, show message but don't set error
                if (mappedTestimonials.length === 0) {
                    console.warn('No approved testimonials found in database. Make sure testimonials are created and approved in the admin panel.');
                }
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError(err.message || 'Failed to load testimonials. Please check if the backend server is running.');
                // Fallback removed to enforce dynamic rendering from database
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTestimonials();
    }, []);



    // // Helper function to get initials for fallback
    // const getInitials = (name) => {
    //     return name.split(' ')
    //         .map(part => part[0])
    //         .join('')
    //         .toUpperCase();
    // };

    return (
        <div className="bg-white ">
            {/* New Elegant Header Section */}
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
                Testimonials
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

            <div className="max-w-7xl mx-auto py-15">
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="max-w-7xl mx-auto px-4 py-10">
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
                            <p className="font-semibold">Unable to load testimonials.</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Testimonials Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white">
                        {testimonials.length > 0 ? (
                            testimonials.map((testimonial) => (
                                <div 
                                    key={testimonial.id}
                                    className={`bg-[#f8f5f2] p-7 shadow-xl border-3 border-[#e8e3dc] hover:border-[#8a6e4b] transition-all duration-300 hover:scale-[1.02]`}
                                >
                                    <div className="testimonial-img-container">
                                        <div className={`testimonial-img ${testimonial.imageClass}`}>
                                        </div>
                                    </div>
                                    <p className={`${testimonial.colors.textBody} italic mb-6 text-lg bg-white/30 p-4 rounded-xl`}>
                                        "{resolveText(testimonial.text)}"
                                    </p>
                                    <p className={`${testimonial.colors.textName} font-semibold text-center`}>
                                        {testimonial.name} {testimonial.from && `from ${testimonial.from}`}
                                    </p>
                                    {testimonial.rating && (
                                        <div className="text-center mt-2 text-amber-600">
                                            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-600 text-lg">No approved testimonials yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Testimonials;