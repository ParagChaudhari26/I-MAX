import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
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
                    Panchkarma Clinic & Research Centre
                </h2>
                <p className="text-2xl md:text-3xl text-white opacity-90 mb-50">
                      " आरोग्यं धनसंपदा "
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
                    <h2 className="text-[#2d024f] text-xl md:text-4xl font-bold mt-1">Panchkarma Clinic & Research Centre !!!</h2>
                </div>
                <p className="w-full max-w-6xl text-left text-base md:text-lg text-[#0b2c2c] font-gentium tracking-wide pt-4 md:pt-2 pb-5 font-serif ">
                    Ayurveda, literally means the science of life (Ayur = Life, Veda = Science). Ayurveda, the science of life and longevity, is the oldest healthcare system in the world and it combines the profound thoughts of medicine and philosophy. Ayurveda is an ancient medical science which was developed in India thousands of years ago. Believed to have been passed on to humans from the Gods themselves, Ayurveda developed and evolved into what it is today from several ancient treatises, most notably Atharva Veda which dates back to five thousand years. The ancient Vedic literature by sages has clearly laid out instructions to maintain health as well as fighting illness through therapies, massages, herbal medicines, diet control and exercise. Since then Ayurveda has stood for the wholesome physical, mental and spiritual growth of humanity around the world.
                    Today, it's a distinctive, indispensable branch of medicine, a complete naturalistic system that depends on the diagnosis of your body's humours – Vata, Pitta & Kapha – to achieve the precise balance of health.
                    Understanding of Ayurveda science in today's world is indispensable:
                    Ayurveda science is aimed at the preservation of health and prevention of disease by establishing balance and harmony through nutrition, herbs, meditation through daily routines and seasonal regimens. As well it provides the cure of the diseases through natural ways like Massages, Shirodhara, Panchakarma therapies, intake of herbal compounds, etc. The World Health Organization recognizes Ayurveda as a complete natural health care system.
                </p>
            </div>

            {/* Cards Section*/}
            <div className="py-16 px-4 bg-white">
              <div className="max-w-110 mx-auto text-center mb-16">
                <h2 className="text-3xl font-bold text-emerald-800 mb-3 font-serif">Ayurvedic Wellness Services</h2>
                <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
              </div>
                
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { 
                    title: 'Consultation', 
                    content: 'Personalized health assessment with expert practitioners.',
                    color: 'bg-amber-500',
                    path: '/consultation'
                  },
                  { 
                    title: 'Training Programs', 
                    content: 'Certified courses in yoga, meditation, and nutrition.',
                    color: 'bg-teal-500',
                    path: '/training-programs'
                  },
                  { 
                    title: 'Ayurveda Treatment', 
                    content: 'Authentic therapies using natural herbs and oils.',
                    color: 'bg-rose-500',
                    path: '/ayurveda-treatment'
                  },
                  { 
                    title: 'Research Collaboration', 
                    content: 'Holistic wellness center combining traditional and modern healing approaches.',
                    color: 'bg-emerald-500',
                    path: '/research-collaboration'
                  }
                ].map((card, index) => (
                  <Link 
                    key={index}
                    to={card.path}
                    className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`h-2 w-full ${card.color}`}></div>
        
                    <div className="p-5">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mr-4`}>
                          <div className="w-6 h-6 bg-white rounded-sm"></div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                      </div>
                      
                      <p className="text-gray-600 mb-5">{card.content}</p>
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
                    {[
                        'Licensed healthcare practitioners use Ayurvedic knowledge to enhance their current practice.',
                        'Massage therapists, beauticians and body workers open spas or salons with Panchakarma facilities.',
                        'Health and beauty students establish Ayurvedic spas, beauty centers, and wellness centers.',
                        'Freelance writers create Ayurveda publications using their deep knowledge.',
                        'Researchers participate in Ayurveda projects with vast potential for health solutions.',
                        'Entrepreneurs develop Ayurvedic herbal products, supplements, foods, and cosmetics.',
                        'Academic students enter teaching or pursue advanced studies through practice and self-experience.'
                    ].map((item, index) => (
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* . The curly braces `{}` in JSX are used to embed JavaScript expressions. */}
                {[
                    { 
                        id: 'article1', // Simple ID added
                        //  category: 'Gynaecology',
                        title: 'Panchakarma – Treasure of Ayurveda', 
                        // author: 'admin', 
                        date: 'January 16, 2023 ',
                        color: 'bg-purple-100 text-purple-800 border-l-4 border-purple-500'
                    },
                    { 
                        id: 'article2', // Simple ID added
                         // category: 'Gynaecology',
                        title: 'Secrets of Ayurveda Skin Care', 
                        // author: 'Dr. Anita Mathew', 
                        date: 'January 16, 2023',
                        color: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                    },
                    { 
                        id: 'article3', // Simple ID added
                        // category: 'Gynaecology', 
                        title: 'Can Ayurveda benefit our skin and hair?', 
                        // author: 'Dr. Anjana Singh', 
                        date: 'January 16, 2023',
                        color: 'bg-red-100 text-red-800 border-l-4 border-red-500'
                    },
                    { 
                        id: 'article4', // Simple ID added
                        // category: 'Hematology', 
                        title: 'DO YOU WANT TO STOP YOUR AGING CLOCK?', 
                        // author: 'Dr. Subhaprakash Sanyal', 
                        date: 'January 16, 2023',
                        color: 'bg-amber-100 text-amber-800 border-l-4 border-amber-500'
                    }
                ].map((blog) => (
                <div 
                    key={blog.id} // Use ID for key
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 mt-3"
                >
                    <div className={`px-4 py-3 ${blog.color} text-sm font-medium`}>
                        {/* {blog.category} */}
                        blog
                    </div>
  
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                            {blog.title}
                        </h3>

                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                            <span className="font-medium">{blog.author}</span>
                            <span>{blog.date}</span>
                        </div>
        
                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                            {/* Simple link to article page */}
                            <Link
                                to="/blogs"
                                className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors"
                            >
                                Go to Blogs Section →
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
                
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
                    <h2 className="text-[#2d024f] text-xl md:text-4xl font-serif mt-3">This is the perfect time to learn about Ayurveda !</h2>
                </div>
                <p className="w-full max-w-7xl text-left text-base md:text-lg text-[#0b2c2c] font-serif tracking-wide mt-5 mb-5">
                    There is a distinctive opportunity in these days and age to guide successful lives by assisting family, friends and clients in creating healthier bodies and lifestyles which eventually lowering healthcare costs in future!
                    Bhagirathi Ayurveda Centre is one of the only Ayurveda Academies offering authentic, Indian-sourced education, services and products. Our faculty Doctors are post graduates in Ayurveda with years of clinical and teaching experience. Our curriculums are based on the curriculums of prominent Ayurveda universities in India. Our centre is well known for scientific Training of Ayurveda's Basic Principles, various Massage techniques, Herbology & Panchakarma along with the treatments in Pune (India) for all. We introduce this unique Training Programmes with enough practice sessions & healing therapies to the respectable foreign students to learn Ayurveda from its birth place and to apply in routine for long & healthy life of their own and people around them. We offer in-house, supervised internships for those who want more practical experience.
                    Welcome to Bhagirathi Ayurveda Panchkarma Clinic & Rsearch Centre, Pune (India) feels pride to provide services in Ayurveda like consultations, treatments and Training at our centre. We provide treatments for maintenance of holistic health (i.e. Physical & mental health) of healthy persons through Ayurveda's Panchkarma treatments, Massage, Yoga and herbal medicines.
                </p>
            </div>
        </div>
    );
}

export default Home;