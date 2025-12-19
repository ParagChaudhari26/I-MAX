// function Photo_Gallery(){

//     return(
//         <h1>Welcome to Photo_Gallery Page</h1>
//     )
// }

// export default Photo_Gallery;

function Photo_Gallery(){

    return(
        <div>
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
                  Bhagirathi Ayurveda Panchkarma Clinic & Research Centre
              </h1>
              <div className="w-16 md:w-20 h-0.5 bg-[#8a6e4b] my-4 md:my-6"></div>
              <p className="text-base md:text-lg text-[#5a5248] font-light">
                Authentic Ayurvedic treatments and holistic wellness solutions
              </p>
            </div>
          </div>
          <div className="md:ml-12 lg:ml-30 mt-8 md:mt-30 self-center md:self-auto"> 
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#3a2f1d] leading-tight mt-0 md:mt-4 mb-4 md:mb-6 relative inline-block">
              <span className="relative z-10">
                Photo Gallary
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    {/* Main Content */}
    <div className="bg-white rounded-lg overflow-hidden border-amber-700 border-2">
      <div className="p-8 md:p-12 text-center">
        <div className="text-green-700 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
          Coming Soon
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          {/* We're preparing some wonderful Ayurvedic events and news updates for you. */}
        </p>
        <div className="animate-pulse flex justify-center space-x-4 mb-8">
          <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          <div className="h-3 w-3 bg-green-600 rounded-full"></div>
          <div className="h-3 w-3 bg-green-700 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}

export default Photo_Gallery;