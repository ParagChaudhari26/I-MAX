import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Ayurveda_Treatment() {
  const labelOverview = 'Overview';
  const labelMajor = 'Major Therapies';
  const labelAllied = 'Allied Therapies';
  return (
    <div>
    <div className="bg-[#f8f5f2]">
      {/* New Elegant Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f5f2] z-0">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-multiply"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-15 relative z-10 flex flex-col md:flex-row gap-8 md:gap-12">
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
                 AYURVEDA TREATMENT
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Mini Navigation Bar */}
<div className="flex justify-center mb-8">
  <div className="inline-flex bg-white rounded- shadow-md border rounded-xl border-gray-100">
    <NavLink 
      to="." 
      end
      className={({isActive}) => 
        `px-6 py-3 font-medium text-sm sm:text-base rounded-l-lg transition-colors ${
          isActive 
            ? 'bg-green-600 text-white' 
            : 'text-gray-600 hover:bg-gray-50'
        }`
      }
    >
      {labelOverview}
    </NavLink>
    <NavLink 
      to="major-therapies" 
      className={({isActive}) => 
        `px-6 py-3 font-medium text-sm sm:text-base border-l border-r border-gray-100 transition-colors ${
          isActive 
            ? 'bg-green-600 text-white' 
            : 'text-gray-600 hover:bg-gray-50'
        }`
      }
    >
      {labelMajor}
    </NavLink>
    <NavLink 
      to="minor-therapies" 
      className={({isActive}) => 
        `px-6 py-3 font-medium text-sm sm:text-base rounded-r-lg transition-colors ${
          isActive 
            ? 'bg-green-600 text-white' 
            : 'text-gray-600 hover:bg-gray-50'
        }`
      }
    >
      {labelAllied}
    </NavLink>
  </div>
</div>

{/* Content Area */}
<div className="bg-white rounded-xl shadow-lg p-6">
  <Outlet />
</div>
    </div>
    </div>
  );
}

export default Ayurveda_Treatment;