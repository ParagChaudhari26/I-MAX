import React from 'react';

function Research_Collaboration(){
  const L = (obj) => typeof obj === 'string' ? obj : (obj?.en || '');
  const TXT = {
    heading: { en: 'RESEARCH COLLABORATION', hi: 'अनुसंधान सहयोग', mr: 'संशोधन सहकार्य' },
    basicResearch: { en: 'Basic Research', hi: 'मूलभूत अनुसंधान', mr: 'मूलभूत संशोधन' },
    publication: { en: 'Publication', hi: 'प्रकाशन', mr: 'प्रकाशन' },
    completed: { en: 'Completed Projects', hi: 'पूर्ण परियोजनाएँ', mr: 'पूर्ण प्रकल्प' },
  };

    return(
        <div>
        <div className="bg-white shadow-lg overflow-hidden border border-[#e5e0d6] text-[17px]">
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
                {L(TXT.heading)}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <div className="prose max-w-none">
              
              <p className="mb-6 text-gray-700">
                Pune, India has been engaged in the Ayurveda revolution, Panchakarma intervention, 
                Training of Ayurveda through modern courses etc. We strongly believe that Ayurveda is 
                scientific and consistent. Our efforts have strengthened research collaboration on 
                several new micro-genomics studies through quality research. Our research activities 
                include:
              </p>
              
              <div className="mb-8 bg-[#f8f5f0] p-5 rounded-lg border-l-4 border-[#d4a017]">
                <h2 className="text-xl font-bold text-[#0a5f38] mb-3">{L(TXT.basicResearch)}</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Historical Research</li>
                  <li>Product Research</li>
                  <li>Clinical Research</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#0a5f38] mb-3">{L(TXT.publication)}</h2>
                <p className="mb-4 text-gray-700">
                  Our aim is to study the three areas of Ayurveda medical science (Teaching, Practice 
                  and Research Interventions) along with our effective personalized Ayurveda practices. 
                  Our focus includes teaching methodologies and dietary research.
                </p>
                {/* <a 
                  href="https://www.yu.edu/content-and-business.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#1a7d4e] hover:text-[#0a5f38] font-medium"
                >
                  View Publication
                </a> */}
              </div>
              
              <div className="mb-8">
                <p className="mb-4 text-gray-700">
                  We are committed to carrying out quality research that impacts not only the evolution 
                  of Bhagirathi Ayurveda Group but the entire Ayurveda community. We aim to collaborate 
                  globally to provide the best-quality learning in Ayurveda.
                </p>
                
                <p className="mb-4 text-gray-700">
                  We invite and encourage research projects under international collaborations. 
                  In international conferences, we focus on key developments in eco-specific products, 
                  global research on climate crisis, and academic projects. We have established goals 
                  and resources to conduct quality research.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-[#0a5f38] mb-3">{L(TXT.completed)}</h2>
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  <li>
                    A "high level, randomized, double diverse, prospective, placebo-controlled, 
                    dose-determination study" is given to each of fifteen participants as a dietary 
                    supplement for Mole (most frequently: 1–4 mg, 2–6 mg), placebo-controlled, 
                    randomized, single-determination study, 4 groups of users as a dietary supplement 
                    for special functional, nutrition-based, natural health.
                  </li>
                  <li>
                    Many programs, randomized, regular, placebo-controlled, preliminary study in 
                    managing the delivery efficiency, behaviour of users to subjects with complaints 
                    of sickness, heart disease, tremors & fevers among women and adults.
                  </li>
                  <li>
                    Proposal for collaboration of Research Projects, Bhagirathi Ayurveda Center, Pune, 
                    India seeks to join with foundations and institutions, nationally and globally, who 
                    have similar research interests in Ayurveda.
                  </li>
                </ul>
              </div>
              
              <div className="mt-12 pt-8 border-t border-[#e5e0d6]">
                <p className="text-gray-600 italic">With dedication to advancing Ayurvedic science,</p>
                <p className="font-bold text-xl text-[#0a5f38] mt-2">The Research Team</p>
                <p className="text-gray-700">Bhagirathi Ayurveda Panchakarma Clinic & Research Centre</p>
                <p className="text-gray-600 mt-1">Pune, India</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Research_Collaboration;