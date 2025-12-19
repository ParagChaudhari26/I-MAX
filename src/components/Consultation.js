function Consultation(){

    return(
        <div>
            <div className="font-sans bg-white min-h-screen">
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
                CONSULTATION
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-16">
              
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
                Comprehensive Ayurvedic Consultations
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
                Discover your unique constitution and receive personalized health guidance
              </p>
              
              <div className="mt-8 bg-white rounded-xl p-6 text-left">
                <p className="text-gray-700 mb-4 text-[17px]">
                  Welcome to Bhagirathi Ayurveda Panchkarma Clinic & Research Centre, Pune, India has expanded its broad spectrum to corners of the world through Ayurveda consultation, Training & Panchakarma in an authentic manner.
                </p>
                <p className="text-gray-700 text-[17px]">
                  Ayurveda consultation provides you a one-stop solution for your health issues in an authentic way with free advice and home remedies. It is the most comprehensive way of connecting with our experienced Ayurvedic doctors from any part of the world with an easy approach for reliable solutions for your health problems.
                </p>
                <p className="text-gray-700 mt-4 text-[17px]">
                  Consult our expert Ayurvedic physicians for a personalized Ayurvedic consultation regarding your health issues for cure in a natural way. Our Ayurvedic physician will analyze your queries and revert to you with free advice on Ayurvedic treatment including Panchakarma, Ayurveda Medicines, Diet, lifestyle, Yoga, etc.
                </p>
              </div>
            </div>

            {/* Consultation Services */}
            <div className="mb-16 text-[17px]">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
                Our Ayurveda Consultation Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Free online Consultation",
                  "Phone Consultation",
                  "Skype Consultation",
                  "Urgent Consultation",
                  "Praktiti (Body type) Analysis"
                ].map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 shadow-sm border-l-4 border-emerald-500 hover:shadow-amber-900 transition-all duration-300 "
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="font-medium text-gray-800">{service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ayurveda Philosophy */}
            <div className="mb-16 bg-[#f8f5f2] p-8 text-[17px] border-2 border-white hover:border-[#8a6e4b] transition-all duration-200">
              <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
                The Ayurvedic Approach to Health
              </h3>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-emerald-800 mb-4">Why is a healthy diet important?</h4>
                <p className="text-gray-700 mb-4">
                  Health means balance – Every person has a natural tendency to become imbalanced. 
                  Ayurvedic diet is centered on treating life's experience as 'food' (for body and mind), 
                  which is assimilated into the body and contributes to its nourishment. It is considered 
                  as fuel for the maintenance of Agni (digestive fire). It also invigorates the mind and 
                  promotes the proper distribution of body elements, vitality, complexion and the acuity 
                  of the sense organs. The contary use of diet would lead to wholsome results.
                </p>
                <p className="text-gray-700 mb-4">
                  Proper diet makes your immune system strong by including natural food in your diet to 
                  avoid any condition which invites diseases or poor functioning of the body. Your body 
                  only functions properly when it is provided with all the necessary vitamins and nutrients  i.e healing by creating harmony with natural food stuffs like fruits and vegetables. Ayurveda health consultation provides you better guidelines to adopt a healthy diet according to your needs.
                </p>
                <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 my-6">
                  "Good food make good diet, good diet makes good health & good health gives us control 
                  over our own lives. Yet, we truly don't appreciate it until it's gone."
                </blockquote>
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-bold text-emerald-800 mb-4">How can your Lifestyle prevent Diseases?</h4>
                <p className="text-gray-700 mb-4">
                  Modern man has developed sophisticated machines, medical devices and medicines, however 
                  he is still deprived of good health and happiness. A variety of lifestyle-related habits, 
                  environment, modern standards of living and psychosocial factors are impacting our human 
                  health. Lifestyle related chronic diseases such as cancer, cardiovascular diseases, 
                  diabetes and obesity are placing an extreme burden on our health system.
                </p>
                <p className="text-gray-700">
                  Small changes in our lifestyle such as consuming more fruits and vegetables in our daily 
                  diet, moderate physical activity and positive thinking make a big difference to our overall 
                  health. During your Ayurveda health consultation, our practitioner will suggest a proper 
                  lifestyle for you to follow based on your condition which is not only easy to understand 
                  but also easy to practice.
                </p>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-bold text-emerald-800 mb-4">Ayurveda Consultation for prevention and cure of ailments:</h4>
                <p className="text-gray-700 mb-4">
                 We prevent and create diseases throughout actions. There are mainly three causes which create diseases in our body; they are diet, lifestyle and mental factors. If we are careless and do not bother to maintain an equilibrium in our own way of living, we become prey to many disorders. If we still do not learn from this, the disorders slowly give rise to serious diseases. Life-long vata imbalance, which is symptomatically cured by taking chemical drugs for many year, may finally give rise to arthritis or some other disease. Some ailments like Headache or migraine are generally not cured with the remedies of modern medicine and are suppressed by strong chemical drugs. In fact, headache and migraine are not even really ailments, but are a warning of a fatigued physical state and block of energy channels. Continuous use of these chemical drugs may lead to side effects or diseases which creates a vicious circle.
                </p>
                <p className="text-gray-700">
                  To adopt an Ayurvedic way of life requires time and attention, but it seems to be a solution for preventing serious illnesses. Using the example of migraine/headache many people take strong drugs to avoid the suffering they have to undergo. If you follow an Ayurvedic way of diet and lifestyle, it will help to remove ailments from its root cause, moreover you can get rid of your disease by not even having to spend a lot of money.

The fundamental wisdom is very basic and deals with simple facts of life. It teaches us to keep our body and mind in tune with rest of the cosmos. If we follow this tradition, we will be able to live happily, we can be more productive at work and we can give and share as members of a creative society.
                </p>
              </div>
            </div>

            {/* Body Type Section */}
            <div className="mb-16  rounded-xl p-8 text-[17px]">
              <div className="flex flex-wrap items-center gap-8 mb-8">
                
                <div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-4">Understanding Your Body Type (Prakriti)</h3>
                  <p className="text-gray-700 mb-6">
                    Your Prakriti is determined by the balance of three doshas - Vata, Pitta, and Kapha. 
                    Knowing your constitution helps in creating personalized health plans.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {[
                  { 
                    title: "Vata", 
                    items: [
                      "Elements: Air + Ether",
                      "Qualities: Cold, light, dry, mobile",
                      "Body Type: Slim, light frame",
                      "Personality: Creative, energetic, enthusiastic"
                    ]
                  },
                  { 
                    title: "Pitta", 
                    items: [
                      "Elements: Fire + Water",
                      "Qualities: Hot, sharp, oily, light",
                      "Body Type: Medium build, muscular",
                      "Personality: Intelligent, focused, goal-oriented"
                    ]
                  },
                  { 
                    title: "Kapha", 
                    items: [
                      "Elements: Earth + Water",
                      "Qualities: Heavy, slow, cool, oily",
                      "Body Type: Solid, heavier build",
                      "Personality: Calm, patient, grounded"
                    ]
                  }
                ].map((type, idx) => (
                  <div key={idx} className=" p-6 shadow-md bg-[#f8f5f2] border border-[#e8e3dc] hover:border-[#8a6e4b] transition-all duration-300 text-center">
                    <h4 className={`text-xl font-bold mb-4 ${idx === 0 ? 'text-blue-800' : idx === 1 ? 'text-red-800' : 'text-fuchsia-950'}`}>
                      {type.title}
                    </h4>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      {type.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
              </div>
            {/* Consultation Options */}
            <div className="mb-16 text-[17px]">
              <div className="bg-white p-8">
                <h3 className="text-2xl font-bold text-emerald-900 mb-6">Consultation Options</h3>
                
                <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                  <div className="relative bg-gray-200 w-full max-w-4xl mx-auto mb-2 overflow-hidden aspect-video">
                      <img 
                        src="https://images.pexels.com/photos/5407235/pexels-photo-5407235.jpeg?_gl=1*1q4ykym*_ga*MTI5NjM2Mjc2NS4xNzA0OTUxMzEw*_ga_8JE65Q40S6*czE3NTI5MTExNDQkbzUkZzEkdDE3NTI5MTEyMjQkajU5JGwwJGgw" 
                        alt="Medicine concept illustration"
                        className="absolute w-full h-full object-cover"
                        />
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-emerald-800 mb-4">Online Consultation</h4>
                    <p className="text-gray-700 mb-4">
                      Ayurveda is the science of life. It not only aims to cure diseases but also maintains 
                      the health of a healthy individual. This beautiful holistic science has been existing 
                      since ancient period to serve mankind through it's traditional medicinal system.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {[
                        "Comprehensive Ayurvedic health assessment",
                        "Personalized diet and lifestyle recommendations",
                        "Herbal formulations tailored to your constitution",
                        "Guidance on yoga and meditation practices",
                        "Digital access to all resources"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-emerald-600 mr-2">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="relative bg-gray-200 w-full max-w-4xl mx-auto mb-2 overflow-hidden aspect-video">
                      <img 
                        src="https://images.pexels.com/photos/5416013/pexels-photo-5416013.jpeg?_gl=1*u9um3c*_ga*MTI5NjM2Mjc2NS4xNzA0OTUxMzEw*_ga_8JE65Q40S6*czE3NTI5MTExNDQkbzUkZzEkdDE3NTI5MTE0NTQkajUyJGwwJGgw" 
                        alt="Medicine concept illustration"
                        className="absolute w-full h-full object-cover"
                        />
                  </div>
      <div>
      <h4 className="text-xl font-bold text-emerald-800 mb-4">Body Type (Prakriti) Analysis</h4>
      <p className="text-gray-700 mb-4">
        Ayurveda is a holistic science that has originated since ancient period. The treatment of diseases 
        is decided based on a highly individualized manner which is called 'Prakriti' in Ayurveda. Body type 
        (Prakriti) denotes the natural constitution of a person.
      </p>
      <ul className="space-y-3 text-gray-700">
        {[
          "Unique constitution analysis based on Tridoshas",
          "Helps in curing and preventing diseases",
          "Personalized diet and lifestyle recommendations",
          "Identifies disease tendencies for prevention",
          "Detailed report within 2 working days"
        ].map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-emerald-600 mr-2">•</span> {item}
          </li>
        ))}
      </ul>
      <p className="text-gray-700 mt-4">
        To support this service, we will expect US$ 4.90. You will receive your Body type (Prakriti) 
        Analysis report within 2 working days.
      </p>
    </div>
</div>
</div>
</div>
            
            {/* Prevention and Healing */}
            <div className="mb-16 bg-[#f8f5f2] p-8 text-[17px] border-2 border-white hover:border-[#8a6e4b] transition-all duration-200">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
                Ayurveda Consultation for Prevention and Cure
              </h3>
              
              <div className="grid md:grid-cols-1 gap-8 items-center">
                <div>
                  <p className="text-gray-700 mb-4">
                    We prevent and create diseases through our actions. There are mainly three causes 
                    which create diseases in our body; they are diet, lifestyle and mental factors. 
                    If we are careless and do not bother to maintain an equilibrium in our own way of 
                    living, we become prey to many disorders.
                  </p>
                  <p className="text-gray-700 mb-4">
                    To adopt an Ayurvedic way of life requires time and attention, but it seems to be 
                    a solution for preventing serious illnesses. Using the example of migraine/headache, 
                    many people take strong drugs to avoid the suffering they have to undergo. If you 
                    follow an Ayurvedic way of diet and lifestyle, it will help to remove ailments from 
                    its root cause, moreover you can get rid of your disease without expensive treatments.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-gray-700">
                  The fundamental wisdom is very basic and deals with simple facts of life. It teaches 
                  us to keep our body and mind in tune with rest of the cosmos. If we follow this tradition, 
                  we will be able to live happily, we can be more productive at work and we can give and 
                  share as members of a creative society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default Consultation;
