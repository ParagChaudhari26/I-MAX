// src/About_us.jsx
import React from 'react';

const legacyBody = [
  'Bhagirathi Ayurveda Panchakarma Clinic & Research Centre was established to bring the benefits of authentic Ayurvedic treatments to patients from around the world. Founded on the principles of traditional Ayurvedic medicine, we have dedicated ourselves to preserving and propagating this ancient science of healing.',
  'Our clinic has grown from a modest beginning into a comprehensive wellness centre, offering a full spectrum of Ayurvedic treatments, Panchakarma therapies, and educational programs. We believe in the holistic approach to health—treating not just the symptoms but the root cause of disease.',
  'Under the guidance of our experienced Ayurvedic doctors, we have helped thousands of patients overcome chronic conditions and achieve lasting wellness. Our commitment to quality and authenticity sets us apart from other wellness centers.',
];

const whyPoints = [
  'Experienced and qualified Ayurvedic doctors with MD and PhD degrees.',
  'Authentic Panchakarma therapies using traditional methods and herbal medicines.',
  'International collaboration bringing Ayurveda to global patients.',
  'Comprehensive approach combining treatment, diet, and lifestyle guidance.',
  'Research-based practice ensuring evidence-backed treatments.',
  'Personalized care tailored to each patient’s unique constitution (Prakriti).',
];

const About_us = () => {
  return (
    <div className="font-sans bg-white text-[17px] text-gray-700">
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
                About Us
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* About Clinic */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* hospital image - using your existing CSS class */}
            <div className="hospital_image-wrapper md:w-1/2">
              <div className="hospital_image-placeholder overflow-hidden shadow-sm border-[#7577a3] border-3">
                <div className="hospital_clinic-image h-[500px] w-full"></div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif font-normal text-[#2a2118] mb-8 mt-2">Our Legacy</h2>
              
              <div className="space-y-6">
                {legacyBody.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-[#352a1d] leading-relaxed border-l-2 border-[#e8e3dc] pl-6 hover:border-[#30271d] transition-colors duration-300"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-4 bg-[#f8f5f2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-normal text-[#2a2118] mb-4 mt-2">Why Choose Us</h2>
            <div className="w-20 h-0.5 bg-[#8a6e4b] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyPoints.map((point, index) => (
              <div 
                key={index} 
                className="bg-white p-6 border border-[#e8e3dc] hover:border-[#8a6e4b] transition-all duration-300 group"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-[#f8f5f2] text-[#8a6e4b] border border-[#e8e3dc] flex items-center justify-center group-hover:bg-[#8a6e4b] group-hover:text-white group-hover:border-[#8a6e4b] transition-all duration-300">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                  </div>
                  <p className="ml-4 text-[#5a5248] group-hover:text-[#2a2118] transition-colors duration-300">{point}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-[#5a5248] italic inline-block px-8 py-4 bg-white border border-[#e8e3dc] max-w-2xl mx-auto font-bold">
              We at Bhagirathi Ayurveda are committed to delivering authentic, effective, and compassionate care.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#8a6e4b] font-medium tracking-wider">Meet Our Experts</span>
            <h2 className="text-3xl font-serif font-normal text-[#2a2118] mb-4 mt-2">Our Team</h2>
            <div className="w-20 h-0.5 bg-[#8a6e4b] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'yogita',
                name: 'Dr. Yogita Chaudhari',
                title: 'Chief Director',
                description: 'M.D. Ayurveda, well-known Ayurveda Physician in Pune'
              },
              {
                id: 'manoj',
                name: 'Dr. Manoj Chaudhari',
                title: 'Advisory Director',
                description: 'M.D. and Ph.D. in Ayurveda, Professor at Ashtang Ayurved College'
              },
              {
                id: 'ettore',
                name: 'Dr. Ettore Messinas',
                title: 'Executive Director',
                description: 'Ayurveda and Yoga international Teacher from Italy'
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-[#f8f5f2] p-6 border border-[#e8e3dc] hover:border-[#8a6e4b] transition-all duration-300 text-center"
              >
                <div className={`member-${member.id} bg-gray-200 w-32 h-32 rounded-full mx-auto mb-6 bg-cover bg-center border-4 border-white shadow-sm`}></div>
                <h3 className="text-xl font-serif text-[#2a2118] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#8a6e4b] font-medium mb-4">
                  {member.title}
                </p>
                <p className="text-[#5a5248]">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 px-4 bg-[#2a2118] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#b8a98a] font-medium tracking-wider">Our Principles</span>
            <h2 className="text-3xl font-serif font-normal text-white mb-4 mt-2">Core Values</h2>
            <div className="w-20 h-0.5 bg-[#b8a98a] mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Authenticity',
                description: 'Preserving the purity of traditional Ayurvedic practices',
                icon: '🪔'
              },
              {
                title: 'Compassion',
                description: 'Treating every individual with empathy and respect',
                icon: '🙏'
              },
              {
                title: 'Excellence',
                description: 'Maintaining the highest standards in treatments',
                icon: '✨'
              },
              {
                title: 'Holism',
                description: 'Addressing wellness of body, mind, and spirit',
                icon: '☯️'
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-[#3a3328] p-8 border border-[#4a4439] hover:border-[#b8a98a] transition-all duration-300 text-center"
              >
                <div className="text-3xl mb-4 text-[#b8a98a]">{value.icon}</div>
                <h3 className="text-xl font-serif mb-4 text-white">
                  {value.title}
                </h3>
                <p className="text-[#d1c8b8]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-20 px-4 bg-[#8a6e4b] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-normal mb-6">
            Begin Your Healing Journey
          </h2>
          <p className="text-[#f0e9dd] text-lg mb-10 max-w-2xl mx-auto">
            Take the first step towards natural, holistic healing with Bhagirathi Ayurveda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About_us;