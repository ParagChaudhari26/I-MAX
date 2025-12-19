function Refund_Policy(){

    return(
        <div className="min-h-screen font-sans text-[17px] bg-[#f8f5f2]">
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
          <div className="md:ml-12 lg:ml-25 mt-8 md:mt-30 self-center md:self-auto"> 
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#3a2f1d] leading-tight mt-0 md:mt-4 mb-4 md:mb-6 relative inline-block">
              <span className="relative z-10">
                REFUND POLICY
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

  {/* Main Content */}
  <div className="py-16 bg-green-800 rounded-t-4xl">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="bg-white rounded-2xl  overflow-hidden ">
        {/* In-Person Course Section */}
        <div className="p-6 md:p-10 border-b border-emerald-100">
          <div className="flex items-start">
            <div className="bg-amber-500 text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 pb-2 border-b border-amber-400">
                ABOUT INPERSON COURSE CHANGE
              </h2>
              <p className="text-gray-700 mb-4">
                We will refund the amount below from the scheduled date of attendance.
              </p>
              <p className="text-gray-700 mb-6">
                However, please be aware that the fee for refund will be borne by the customer.
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-emerald-50 rounded-lg">
                  <thead className="bg-emerald-700 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left rounded-tl-lg">Cancellation Period</th>
                      <th className="py-3 px-4 text-right rounded-tr-lg">Refund Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-emerald-100 hover:bg-emerald-100 transition-colors">
                      <td className="py-3 px-4 font-medium">30-21 days ago</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-700">70% refund</td>
                    </tr>
                    <tr className="border-b border-emerald-100 hover:bg-emerald-100 transition-colors">
                      <td className="py-3 px-4 font-medium">20-15 days ago</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-700">50% refund</td>
                    </tr>
                    <tr className="hover:bg-emerald-100 transition-colors">
                      <td className="py-3 px-4 font-medium">14 – the day</td>
                      <td className="py-3 px-4 text-right font-bold text-red-600">0% refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Online Course Section */}
        <div className="p-6 md:p-10">
          <div className="flex items-start">
            <div className="bg-emerald-600 text-white rounded-lg w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 text-xl font-bold">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 pb-2 border-b border-emerald-500">
                ABOUT ONLINE COURSE CHANGE
              </h2>
              <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500 transition-all duration-300 hover:border-amber-500">
                <p className="text-gray-700 mb-4 transition-colors duration-300 hover:text-emerald-800">
                  When you wish to change the schedule after the transfer, it is possible to match the schedule of the next online learning. We do not refund tuition fee. Please note that the schedule will follow the schedule of our Centre, we will contact you shortly.
                </p>
                <p className="text-gray-700 transition-colors duration-300 hover:text-emerald-800">
                  Absence due to self-circumstances will not be refundable during the period. You can view past participation as many times as possible during the course period from the Internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>

</div>
    )
}

export default Refund_Policy;