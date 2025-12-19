
import React, { useState } from 'react';

export default function Training_Programs() {

  const [currentPage, setCurrentPage] = useState('online');

  // Simple header to switch between pages
  const Header = () => (
    <div className="bg-[#f8f5f2] p-4 shadow-lg border-b-amber-950">
      <div className="max-w-7xl mx-auto flex justify-center space-x-8">
        <button 
          onClick={() => setCurrentPage('online')} 
          className={`relative px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out ${
            currentPage === 'online' 
              ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' 
              : 'text-amber-900 bg-white hover:bg-amber-100 shadow-sm hover:shadow-md'
          }`}
        >
          {currentPage === 'online' && (
            <span className="absolute -top-2 -right-2 h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-600"></span>
            </span>
          )}
          Online Courses
        </button>
        
        <button 
          onClick={() => setCurrentPage('in-person')} 
          className={`relative px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out ${
            currentPage === 'in-person' 
              ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' 
              : 'text-amber-900 bg-white hover:bg-amber-100 shadow-sm hover:shadow-md'
          }`}
        >
          {currentPage === 'in-person' && (
            <span className="absolute -top-2 -right-2 h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-600"></span>
            </span>
          )}
          In-Person Courses
        </button>
      </div>
    </div>
  );

  // CourseCard Component
  const CourseCard = ({ course }) => {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-100 hover:border-[#8a6e4b] transition-all duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-amber-900">{course.title}</h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {course.category}
            </span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center text-sm text-amber-800">
              <span className="mr-1">⏱</span>
              {course.duration}
            </div>
            <div className="flex items-center text-sm text-amber-800">
              <span className="mr-1">$</span>
              {course.fees}
            </div>
            {course.inPerson && (
              <div className="flex items-center text-sm text-amber-800">
                <span className="mr-1">📍</span>
                In-Person
              </div>
            )}
          </div>
          
          <p className="mt-3 text-amber-800">{course.description}</p>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center text-emerald-700 font-medium"
          >
            {expanded ? 'Show Less' : 'View Modules'}
          </button>
          
          {expanded && (
            <div className="mt-4 pt-4 border-t border-amber-100">
              <h4 className="font-semibold text-amber-900 mb-2">Course Modules:</h4>
              <ul className="mt-2 space-y-3">
                {course.modules.map((module, idx) => (
                  <li key={idx} className="text-amber-800">
                    {module.title && (
                      <span className="font-medium text-emerald-700">{module.title}: </span>
                    )}
                    <div className="whitespace-pre-line mt-1">{module.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Online Courses Page
  const OnlineCourses = () => {
    const onlineCourses = [
      {
        id: 1,
        title: "Beauty Care by Ayurveda",
        category: "Beauty",
        duration: "30 hours",
        fees: "US $250",
        description: "This course helps you develop a deep sense of beauty that radiates from within. The course covers a variety of aspects of beauty, their relationship with your daily routine, and their link with the state of your physical, mental, and spiritual health. It describes the inner changes that will take place when you follow Ayurvedic principles on how to look and feel beautiful. After completing the course, you will realize that beauty is not an elusive thing, and that there is more to beauty than external good looks. In this course you will learn following modules.",
        modules: [
          { 
            title: "MODULE I: Beauty:- Ayurvedic approach", 
            description: "• The Ayurveda approach to beauty\n• Ayurveda routine for maintaining beauty\n• How beauty is related to your constitution" 
          },
          { 
            title: "MODULE II: Ayurvedic Skin Care", 
            description: "• Layers of skin as per Ayurveda\n• The steps of routine skin care\n• Diagnose your skin type\n• Common skin problems and their remedies" 
          },
          { 
            title: "MODULE III: Ayurvedic Rejuvenation Therapies", 
            description: "• Udvartana – skin cleansing therapy\n• Face massage\n• Svedana – herbal steaming" 
          },
          { 
            title: "MODULE IV: Ayurvedic Masks & Moisturizers", 
            description: "• Herbal cleansing masks and it's use on various types of skin\n• Various types of nourishing Masks\n• Toners and moisturizers" 
          },
          { 
            title: "MODULE V: Ayurvedic Hair Care", 
            description: "• Hair care and remedial tips for general hair problems\n• Hair types\n• Common hair problems and their remedies" 
          },
          { 
            title: "MODULE VI: The Secret of Beauty", 
            description: "• The role of the mind in health and beauty\n• Inner beauty and the ways to enhance beauty" 
          }
        ]
      },
      {
        id: 2,
        title: "Basics of Ayurveda",
        category: "Foundation",
        duration: "30 hours",
        fees: "US $250",
        description: "Learn the foundational principles of Ayurveda and its approach to holistic health.",
        modules: [
          { 
            title: "MODULE I: The Foundations of Ayurveda", 
            description: "• Ayurveda and its principles\n• Necessity to study in its Original-form\n• How to become a competent Ayurvedic physician\n• Ayurveda, a complete way of life\n• Definition of Ayurveda, Ayu and health\n• Aim of Ayurveda\n• Ayurveda; complete medical science\n• Eight specialised branches of Ayurveda\n• The real aim is to build a healthy and happy society" 
          },
          { 
            title: "MODULE II: Principles of Ayurveda", 
            description: "• Ayurveda is an eternal science\n• The philosophical background of Ayurveda\n• The pre-Vedic, Vedic and the post Vedic view of the historians\n• Theory of creation of universe\n• The five gross elements or Pancha Mahabhutas\n• Importance of creation and the panch Mahabhutas\n• The tridosha concept in Ayurveda\n• Factors responsible for aggravation of doshas\n• Qualities and natural aggravation of doshas" 
          },
          { 
            title: "MODULE III: Principles of Ayurveda Part II", 
            description: "• Types of sub doshas\n• Various states of doshas\n• How do doshas aggravate\n• Tridosha as three pillars of health\n• Importance of dhatus\n• Types, functions and formation of Srotasa\n• Diseases caused by various dhatus\n• Description about Ojas, the vital body-fluid\n• The waste materials also sustain the body\n• Proper quantity of malas (waste materials)\n• Disease caused by various malas" 
          },
          { 
            title: "MODULE IV: Metabolism and digestion", 
            description: "• Jatharagni (digestive fire)\n• Role of ama in disease process\n• Types of fires and their functions\n• Srotas, the root cause in disease process\n• Definition and types of Sroto dushti\n• Different categories of srotas\n• Importance of tastes in foods and herbs\n• Types and functions of tastes\n• Diseases caused due to tastes\n• Guna, virya, vipaka and special action of herbs" 
          },
          { 
            title: "MODULE V: Prakriti (Physical Constitution)", 
            description: "• Prakriti (personal constitution)\n• Types of prakriti\n• Factors affecting the constitution Prakriti and Vikriti\n• Determining the constitution\n• Basic factors for maintenance of health\n• Proper eating and proper mixing of foods\n• Quantity and quality of food\n• Opposing foods\n• Sleep, exercise, Panch Karma and Rasayana" 
          }
        ]
      },
      {
        id: 3,
        title: "Advance Ayurveda",
        category: "Advanced",
        duration: "50 hours",
        fees: "US $450",
        description: "This module provides a deeper examination of Ayurvedic concepts. The course content is divided into eight units, packed with relevant information",
        modules: [
          { 
            title: "Module I – Philosophy and Basic Principles of Ayurveda", 
            description: "1. Objectives of Ayurveda\n2. Definition of health in Ayurveda\n3. Basic and primordial elements of Universe and human body\n4. Eight specialties of Ayurveda\n5. Three humors (Doshas)\n6. Dhatus, Mala & Agni\n7. Diet, Sleep & Sex Three pillars of life\n8. Concept of mind\n9. Prakriti (Body type according to Ayurveda)" 
          },
          { 
            title: "Module II– Concepts of Positive Health", 
            description: "1. Daily routine (Dincharya)\n2. Seasonal regimen (Ritucharya)\n3. Social conducts\n4. Diet\n5. Natural urges" 
          },
          { 
            title: "Module III – Concepts of Ayurvedic materia-medica and Pharmaceutics", 
            description: "1. Principles related to action of drugs\n2. Methods of Ayurvedic formulations\n3. Drug doses, Anupana & Sahapana\n4. Common Ayurvedic formulation" 
          },
          { 
            title: "Module IV – Ayurveda's Diagnostic Methodology", 
            description: "1. Fundamentals of diagnosis\n2. Rogi Pariksha (Examination of the patient)\n3. Dashvidha Pariksha (Ten point examination):\n  • Prakriti (constitution)\n  • Vikriti (disease susceptibility)\n  • Sara (quality of dhatus)\n  • Samhanana ((body built-compactness of the body)\n  • Pramana (anthropometry-measurements)\n  • Satmya (adaptability)\n  • Sattva (mental stamina)\n  • Ahara shakti (digestive power-appetite,digestion)\n  • Vyayama Shakti (exercise endurance)\n  • Vaya and vayikarana (age & rate of aging)\n  • Roga Pariksha (Examination of the disease)\n4. Ashtavidha Pariksha (eight point examination):\n  • Nadi pariksha (Examination of the pulse)\n  • Mutra pariksha (Examination of the urine)\n  • Mala pariksha (Examination of the stool)\n  • Jihva pariksha (Examination of the tongue)\n  • Shabda pariksha (Examination of the speech and voice)\n  • Sparsha pariksha (Examination of the skin)\n  • Drika pariksha (Examination of the eyes)\n  • Akriti pariksha (Examination of the external features)" 
          },
          { 
            title: "Module V – General Ayurveda's Management of common diseases", 
            description: "Ayurvedic approaches to managing common health conditions" 
          }
        ]
      },
      {
        id: 4,
        title: "Ayurveda Herbology",
        category: "Herbs",
        duration: "30 hours",
        fees: "US $250",
        description: "Dravyaguna Vidnyana (Study of Ayurvedic Medicinal Herbs) – It is the science of energetic principles and their various uses for treating diseases. Today while learning and practicing Ayurveda and alternative medicine; the knowledge of the Healing Herbs described in Ayurveda is very important. Learning the Herbs in Ayurvedic way is very important but in today’s advanced world the updates and scientific information of the Herbs is also very useful for the treatment of a diseases.",
        modules: [
          { description: "1. History of Ayurveda\n2. Ashtanga Ayurveda\n3. Indian Philosophy\n4. Anatomy in Ayurveda (Sharir Rachana)\n5. Basic Principles of Ayurveda\n6. Concept of Tridosha\n7. Prakruti (Body type)\n8. Dhatu (Tissues)\n9. Mala or Waste products\n10. Ojas\n11. Digestion and Metabolism\n12. Srotasa" },
          { 
            title: "Module II – Ayurvedic Herbology – Dravya Guna Shastra", 
            description: "Study of energetic principles and uses of herbs" 
          },
          { 
            title: "Module III – Ayurvedic Pharmacy (Pancha Vidha Kashya Kalpana)", 
            description: "5 basic fundamentals of medicine preparations" 
          },
          { 
            title: "Module IV- Nidana – Diagnosis of disease", 
            description: "Diagnostic methodologies in Ayurveda" 
          }
        ]
      },
      {
        id: 5,
        title: "Sushruta Samhita Introduction",
        category: "Classics",
        duration: "30 hours",
        fees: "US $250",
        description: "Introduction to the principles and practice of Ayurvedic Surgery.",
        modules: [
          { description: "1. Introduction to Sushruta Samhita – Reference book of Ayurvedic Surgery" },
          { description: "2. Historical perspective – Who was Sushruta? Origins of the Compendium etc." },
          { description: "3. Salient points of Sutra sthana" },
          { description: "4. Chapter of Aphorisms: Birds eye view of Ayurvedic Surgery" },
          { description: "5. Salient points of Nidana sthana – Chapter of Ayurvedic Surgical Diagnosis" },
          { description: "6. Salient points of Sharira sthana – Chapter of Ayurvedic Surgical Anatomy and Physiology" },
          { description: "7. Salient points of Chikitsa sthana – Chapter of Surgery: Principles and practice of Ayurvedic Surgery" },
          { description: "8. Salient points of Kalpa sthana – Chapter of Formulations: finer points of Ayurvedic Pharmacy for Surgery" },
          { description: "9. Salient points of Uttara sthana – Chapter of Special topics: Specialties like Ophthalmology, ENT & face, Head etc." }
        ]
      },
      {
        id: 6,
        title: "Ashtanga Hridaya Samhita Introduction",
        category: "Classics",
        duration: "30 hours",
        fees: "US $250",
        description: "Essentials of Ayurvedic Medicine & Surgery from this classical text.",
        modules: [
          { description: "1. Introduction to Ashtanga Hridaya Samhita – Essentials of Ayurvedic Medicine & Surgery" },
          { description: "2. Historical perspective – Who was Vagbhata? Origins of the Compendium etc." },
          { description: "3. Salient points of Sutra sthana – Chapter of Aphorisms: Birds eye view of Ayurvedic Medicine and Surgery" },
          { description: "4. Salient points of Sharira sthana – Chapter of Ayurvedic Anatomy and Physiology" },
          { description: "5. Salient points of Nidana sthana – Chapter of Ayurvedic Diagnosis" },
          { description: "6. Salient points of Chikitsa sthana – Chapter of Therapeutics: Principles and practice of Ayurvedic Medicine & Surgery" },
          { description: "7. Salient points of Kalpa sthana – Chapter of Formulations: finer points of Ayurvedic Pharmacy" },
          { description: "8. Salient points of Uttara sthana – Chapter of Special topics: Specialties like Ophthalmology, ENT & face, Head" }
        ]
      },
      {
        id: 7,
        title: "Madhava Nidana Introduction",
        category: "Diagnosis",
        duration: "30 hours",
        fees: "US $250",
        description: "Principles and Practice of Ayurvedic Diagnostic Methodology.",
        modules: [
          { description: "1. Introduction to Madhava Nidana – Madhava's Principles and Practice of Ayurvedic Diagnosis" },
          { description: "2. Historical perspective – Who was Madhava? Origins of the Compendium etc." },
          { description: "3. Nidana Principles of Ayurvedic Diagnosis: Causes Purva-Rupa" },
          { description: "4. Principles of Ayurvedic Diagnosis: Prodromal Signs and symptoms" },
          { description: "5. Rupa Principles of Ayurvedic Diagnosis: Signs and symptoms" },
          { description: "6. Upashaya Principles of Ayurvedic Diagnosis: 18 types of diagnostic modalities" },
          { description: "7. Samprapti- Principles of Ayurvedic Diagnosis: Etio-pathogenesis" }
        ]
      },
      {
        id: 8,
        title: "Pre-Menstrual Syndrome (PMS) and Menopause",
        category: "Women's Health",
        duration: "15 hours",
        fees: "US $125",
        description: "Ayurvedic approach to managing PMS and Menopause.",
        modules: [
          { 
            title: "Concept of Pre- Menstrual Syndome (PMS) in Ayurveda", 
            description: "– Causative factors of PMS\n– Classification of PMS\n– Symptoms of PMS\n– Ayurveda Solutions for PMS" 
          },
          { 
            title: "Concept of Menopause (Rajo-Nivrutti) in Ayurveda", 
            description: "– Ayurveda views regarding Menopause\n– Signs and symptoms of Menopause\n– Ayurveda Solutions for Menopause" 
          }
        ]
      },
      {
        id: 9,
        title: "Women Care and Pregnancy Care",
        category: "Women's Health",
        duration: "30 hours",
        fees: "US $250",
        description: "Ayurvedic approach to women's health and pregnancy care.",
        modules: [
          { description: "1. Women – Strength of community" },
          { description: "2. Menstrual cycle – God gift to women" },
          { description: "3. Classification of female age life" },
          { description: "4. Ayurveda for healthy offspring" },
          { description: "5. Regimens to be followed before pregnancy" },
          { description: "6. Panchakarma (Bio-purification) – Five purificatory therapies to keep health of body" },
          { description: "7. Diet – Dietary details to maintain health" },
          { description: "8. Instructions for Coitus (actual act) instructions to conceive for healthy progeny" },
          { description: "9. Ayurveda approach for pregnancy care" },
          { 
            title: "10. Ayurveda's special month-wise regimen", 
            description: "• First month care\n• Second month care\n• Third month care\n• Fourth month care\n• Fifth month care\n• Sixth month care\n• Seventh month care\n• Eighth month care\n• Ninth month care\n• Tenth month care" 
          },
          { description: "11. Benefits of Ayurveda care in pregnancy" }
        ]
      },
      {
        id: 10,
        title: "Rasayana (Rejuvenation) Therapy",
        category: "Special Therapies",
        duration: "20 hours",
        fees: "US $170",
        description: "Learn about Ayurvedic rejuvenation therapies for physical and psychological well-being.",
        modules: [
          { description: "1. Rasayana (Rejuvenation) Therapy of Ayurveda – Special branch from 8 branches of Ayurveda science" },
          { description: "2. Importance of Rasayana Therapy" },
          { description: "3. Benefits of Rasayana Therapy – physical and psychological aspects" },
          { description: "4. Types of Rasayana Therapy – various kind of classification" },
          { description: "5. Kuti Praveshika Rasayana – Exercise of Rasayana after admission in a specially built hut" },
          { description: "6. Vatatapika Rasayana – Exercise of Rasayana in daily routine life" },
          { description: "7. Useful herbs useful as Rasayana" },
          { description: "8. Some popular Rasayana recipes such as Bramha Rasayana, Kushmanda Avaleha, Chyavanprasha-avleha, etc." },
          { description: "9. Achara Rasayana – Ideal conduct for human" }
        ]
      },
      {
        id: 11,
        title: "Vajikaranana (Vitalization) Therapy",
        category: "Special Therapies",
        duration: "20 hours",
        fees: "US $170",
        description: "Ayurvedic approach to sexual health and vitality.",
        modules: [
          { description: "1. Vajikarana (Vitalization) Therapy of Ayurveda – Special branch from 8 branches of Ayurveda science" },
          { description: "2. Importance of Vajikarana Therapy" },
          { description: "3. Benefits of Vajikarana Therapy – physical and psychological aspects" },
          { description: "4. Types of Vajikarana Therapy – various kind of classification" },
          { description: "5. Diagnosis way of Ayurveda for Sexual dysfunctions" },
          { description: "6. Treatment guidelines for Sexual dysfunctions" },
          { description: "7. Useful herbs to maintain sexual health" },
          { description: "8. Some popular Vajikarana recipes such as Kaucha Paka, Vanari Gutika, Chyavanprasha-avleha, etc." }
        ]
      }
    ];

    return (
      <div className="bg-[#f8f5f2] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
            Online Courses in Ayurveda
          </h1>

          {/* Changed to single column layout */}
          <div className="grid grid-cols-1 gap-8">
            {onlineCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // InPersonCourses Component
  const InPersonCourses = () => {
    const inPersonCourses = [
      {
        id: 1,
        title: "Ayurveda Basics & Panchakarma Training",
        category: "Foundation",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Introduction to Ayurveda and Panchakarma with practical training sessions.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda and Basic Principles\n• Introduction to Panchakarma and Basic Principles\n• Prakriti (body – type) analysis\n• Steps of Panchakarma: Poorva, Pradhana and Paschat – karma\n• Poorva Karma (pre-procedures) – types and its details\n• Snehana (oleation) and Swedana (fomentation)\n• Abhyanga (Basic Ayurveda Massage)\n• Preparation of Herbal oil\n• Ayurveda head massage\n• Ayurveda spinal massage\n• Marma (vital / important points inside body)\n• Shirodhara" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti (body – type) analysis\n• Understanding own diet and behavioural advice by Ayurveda\n• Snehana (Oleation) Technique\n• Swedana (Fomentation) Technique\n• Marma (vital / important points inside body)\n• Shirodhara\n• Abhyanga (Basic Ayurveda Massage)\n• Preparation of Herbal oil\n• Ayurveda head massage\n• Ayurveda spinal massage" 
          }
        ]
      },
      {
        id: 2,
        title: "Beauty Care by Ayurveda - Step I",
        category: "Beauty",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Ayurvedic approach to beauty care with theoretical and practical sessions.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda – Basic Principles\n• Prakriti (body type) analysis\n• Anatomy of face according to Ayurveda and approach to face care\n• Anatomy of hair according to Ayurveda and approach to hair care\n• Anatomy of skin according to Ayurveda and approach to skin care\n• Rasayana (rejuvenation) massage techniques\n• Management for early aging and wrinkles by Ayurveda\n• Approach to under eye dark circles by Ayurveda\n• Udvartana Therapy (herbal powder massage for obesity and cellulites management by Ayurveda)\n• Preparations of related herbs and oils" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti (body type) analysis\n• Rasayana (rejuvenation) massage\n• Management for early aging and wrinkles by Ayurveda\n• Approach to under eye dark circles by Ayurveda\n• Udvartana Therapy (herbal powder massage)\n• Demonstrations of preparations of herbs and oils" 
          }
        ]
      },
      {
        id: 3,
        title: "Ayurveda's Herbal Medicines and Oils Preparation",
        category: "Herbs",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Learn to prepare various Ayurvedic formulations and medicines.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda and Basic Principles\n• Panchavidha Kashaya Kalpana (Five basic fundamental forms for preparations of medicines of Herbs) :\n   Swarasa (juice)\n   Kalka (paste)\n   Kvatha (decoction)\n   Heema (cold infusion)\n   Phanta (hot infusion)\n• Upa-Kalpana (Secondary preparations): Various herbal powder mixtures such as Triphala, Face pack, Hair pack, etc.\n• Preparations of herbal decoctions: Demonstrations of various useful decoctions in daily life\n• Preparation of herbal oils and ghee: Demonstrations and practice of making different oils such as Hair oil, Massage oil, Triphala Ghee, etc.\n• Guggulu purification and preparation: Demonstration of purification of Guggulu and making of pills\n• Preparation of Avaleha (Confection/ herbal paste with sugar): Herbal sweet cakes preparation\n• Common Herbal tablets: Preparation of Vyoshadi Vati (tablet), etc.\n• Common Herbal compounds such as Hingvashtaka Churna, Anti dandruff hair wash, etc." 
          },
          { 
            title: "Practical Sessions", 
            description: "• Panchavidha Kashaya Kalpana (Five basic fundamental forms preparations) :\n   Swarasa (juice)\n   Kalka (paste)\n   Kvatha (decoction)\n   Heema (cold infusion)\n   Phanta (hot infusion)\n• Upa-Kalpana (Secondary preparations): Triphala, Face pack, Hair pack, etc.\n• Preparations of herbal decoctions\n• Demonstrations of making different oils such as Massage oil, Triphala Ghee, etc.\n• Guggulu purification and preparation and making of pills\n• Preparation of Herbal sweet cakes\n• Preparation of Vyoshadi Vati (tablet)\n• Preparations of Herbal compounds such as Hingvashtaka Churna, Anti dandruff hair wash, etc." 
          }
        ]
      },
      {
        id: 4,
        title: "Ayurveda Cooking Training",
        category: "Lifestyle",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Learn Ayurvedic principles of cooking and nutrition.",
        modules: [
          { 
            title: "Theory sessions", 
            description: "• Introduction to Ayurveda\n• Tridoshas (Five Elements Theory)\n• Determining Vata, Pitta & Kapha\n• Sapta Dhatus (Tissue materials)\n• Shad Rasas (Tastes): Sweet, Sour, Hot, Bitter, Salty & Astringent\n• Food and Consciousness: Satwa, Rajas & Tamas\n• Daily regime & seasonal regime to balance each body type\n• Nutritional value of various food items according to Ayurveda\n• Prevention of diseases, purification of the body\n• Diets for various Body types\n• Food Combination\n• Order to Eat Food as per Individual\n• Daily Rhythms of Time" 
          },
          { 
            title: "Practical sessions", 
            description: "• Herbal tea\n• Types of milk: Different ways of cooking milk with spices and Ayurveda herbs\n• Rice dishes\n• Vegetable dishes\n• Herbal Soups\n• Types of juices\n• Demonstration of different types of Ayurvedic spices\n• Demonstration of different types of salts\n• Demonstration of different types of rice\n• Demonstration of different types of Indian breads (Bhakri, Chapati, Thalipeetha, etc.)" 
          }
        ]
      },
      {
        id: 5,
        title: "Ayurveda Lifestyle Management",
        category: "Lifestyle",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Learn daily and seasonal regimens according to Ayurveda.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda and its Basic Principles\n• Prakriti (body – type) analysis\n• Dinacharya (Daily regimen) :\n   Awakening early in the morning\n   Purification of the body (Shouch vidhi)\n   Tooth brushing and tongue cleaning (Dantdhavana and Jivha nirlekhan vidhi)\n   Gargling (Gandusha)\n   Mouths wash (Kavala)\n   Massage (Abhyanga)\n   Body wash (Udvartana)\n   Cutting nails, hairs, etc. (Papmopashamana)\n   Bath (Snanam)\n   Hair dressing (Prasadhan vidhi)\n   Wearing of cloths (Vastra Paridhan)\n   Wearing of flowers (Pushpa Dharana)\n   Wearing of Garlands (Abhooshana)\n   Wearing of foot wear (Padatrana dharana)\n   Wearing of protective covering (Kavacha Dharana)\n• Ritucharya (Seasonal regimen) : Diet and behaviour regimens according to various seasons-\n  Shishira – Late winter\n   Vasanta – Spring\n   Grishma – Summer\n   Varsha – Rainy\n   Sharada – Spiritual\n   Hemanta – winter  \n• Aahara, Nidra and Bramhacharya (Food, Sleep and Sex) management according to Ayurveda\n• Home remedies for common health problems\n• Herbs used for beauty enhancement\n• Unique Concepts of Ayurveda – Rasayana (rejuvenation) and Vajikarana (aphrodisiacs)" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti (body – type) analysis and advices accordingly\n• Dinacharya (Daily regimen) : Experiencing all following things as per Ayurveda Awakening early in the morning\n   Tooth brushing and tongue cleaning (Dantdhavana and Jivha Nirlekhan vidhi)\n   Gargling (Gandusha)\n   Mouths wash (Kavala)\n   Massage (Abhyanga)\n   Body wash (Udvartana)\n   Bath (Snanam)\n   Hair dressing (Prasadhan vidhi)\n   Wearing of cloths (Vastra Paridhan)\n   Wearing of flowers (Pushpa Dharana)\n   Wearing of Garlands (Abhooshana)\n   Wearing of protective covering (Kavacha Dharana)\n• Preparations of Home remedies for common health problems\n• Preparations of Herbs used for beauty enhancement" 
          }
        ]
      },
      {
        id: 6,
        title: "Ayurveda Massage for Baby & Pregnancy Care",
        category: "Special Care",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Ayurvedic approach to baby massage and pregnancy care.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Basic Principles of Ayurveda: Pancha Mahabhoota, Tridosha, Sapta Dhatu, Mala\n• Identification of Prakriti (Body Constitution)\n• Introduction to Ayurvedic Baby Massage: Benefits, procedure, post procedure, oils\n• Introduction to Ayurvedic Pregnancy Massage: Safety, benefits, techniques\n• Methods of Ayurvedic Pregnancy Care: Month wise development, diet plans, Ayurveda for Normal Delivery\n• Introduction to Ayurvedic Postnatal Massage\n• Methods of Postnatal Care\n• Treatments of common problems" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti (Body Constitution) analysis\n• Baby massage procedure and post procedure\n• Preparation of herbal oils\n• Pregnancy Massage\n• Month wise specialized diet plan during pregnancy\n• Ayurvedic Postnatal Massage" 
          }
        ]
      },
      {
        id: 7,
        title: "Identification of Ayurvedic Herbs and Spices",
        category: "Herbs",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Learn to identify and use common Ayurvedic herbs and spices.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda and its basic principles\n• Common herbs and spices useful in day to day life and their properties\n• Shadrasa (Six tastes)\n• Virya (potency)\n• Vipaka (post digestive effect)\n• Guna (properties)\n• Dosha Concept – properties, normal and abnormal functions\n• Herbs and spices – actions and their impact on human body\n• Rasayana (rejuvenation) herbs and spices with their properties and actions\n• Vajikarana (Aphrodisiac) herbs and spices with their properties and actions\n• Herbs for beauty with their properties and actions\n• Vata Dosha balancing herbs and spices\n• Pitta Dosha balancing herbs and spices\n• Kapha Dosha balancing herbs and spices" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Herbs – identifications and demonstrations\n• Spices – identifications and demonstrations\n• Visit to Ayurveda Herbal garden\n• Herbal combinations preparations for beauty of skin\n• Herbal combinations preparations for beauty of hairs" 
          }
        ]
      },
      {
        id: 8,
        title: "Yoga Teacher Training (Basic)",
        category: "Yoga",
        duration: "30 hours",
        fees: "US $450",
        inPerson: true,
        description: "Basic yoga teacher training program.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Theoretical Knowledge of Yoga and Meditation\n• Ashtanga Yoga (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi)\n• Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Bandhas, Chanting, Mantra and Meditation\n• Anatomy and Physiology\n• Health benefits of yoga techniques, precautions / contraindications\n• Yogic practice according to different concepts\n• Presentations and teaching techniques" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Practice of Asanas, Pranayama, Dhyana\n• Practice of Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Practice of Bandhas, Chanting, Mantra and Meditation\n• Yogic practice according to different concepts" 
          }
        ]
      },
      {
        id: 9,
        title: "Ayurveda Therapist Training",
        category: "Professional",
        duration: "160 hours",
        fees: "US $2300",
        inPerson: true,
        description: "Comprehensive training to become an Ayurveda therapist.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Basic principles of Ayurveda:\n\n 1. Loka-purusha Samya Concept\n2. Pancha Mahabhoota Concept\n3. Dosha, Dhatu, Mala, etc\n\n• Prakriti (body – type) analysis: Principles and accordingly advices\n• Ayurveda Beauty Care techniques:\n\n1. Face care\n2. Skin care\n3. Hair care\n\n• Preparation of the herbs to be used for beauty care with its details\n• Herbs for primary health care\n• Ayurveda cooking :\n\n1. Shad Rasas (Tastes): Sweet, Sour, Hot, Bitter, Salty and Astringent\n2. Food and Consciousness: Satwa, Rajas and Tamas\n3. Daily regime and seasonal regime to balance each body type\n4. Nutritional value of various food items according to Ayurveda\n5. Prevention of diseases, purification of the body\n6. Diets for various Body types\n7. Food Combination\n8. Order to Eat Food as per Individual\n9. Daily Rhythms of Time\n\n• Basics of Panchakarma\n• Shirodhara for management of stress and anxiety\n• Ayurveda ways of pain management (Kati-basti, Patra-pottali swedana, Shastishali Pinda Swedana)\n• Life style management – Daily regimen, Seasonal regimen Marma (vital pressure point technique) therapy\n• Preparation of the herbs to be used for Panchakarma• Abhayanga: \nAyurveda massage techniques:\n\n1. Head Massage\n2. Spinal Massage\n3. Baby Massage\n\n• Special Ayurvedic Massage techniques – Pizhichila\n• Marma massage\n• Fundamentals of Diagnosis\n• Types of Ayurveda treatment:\n\n1. Panchakarma \n2. Vamana (Scientific vomiting)\n3. Virechana (Scientific purgation)\n4. Anuvasana Basti (Medicated oil enema)\n5. Asthapana Basti (Medicated decoction enema)\n6. Nasya (Nasal drops)\n\n• Pashchat Karma (Post-procedures) – preparations of food for Sansarjan Krama (food advice after Panchakarma )\n• Udvartana (herbal powder massage for curing obesity and cellulites)\n• Rasayana Upachara (Geriatric and Rejuvenation therapy)\n• Vajikarana Upachara (aphrodisiacs) concept" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti (body – type) analysis\n• Ayurveda Beauty Care: Face care, Skin care, Hair care\n• Preparation of the herbs to be used for beauty care\n• Ayurveda cooking :\n\n1. Herbal tea\n2. Types of milk: Different ways of cooking milk with spices and Ayurveda herbs\n3. Rice dishes\n4. Vegetable dishes\n5. Herbal Soups\n6. Types of juices\n7. Demonstration of different types of Ayurvedic spices\n8. Demonstration of different types of salts\n9. Demonstration of different types of rice\n10. Demonstration of different types of Indian breads (Bhakri, Chapati, Thalipeetha, etc.)\n\n• Shirodhara\n• Kati-basti, Manya-basti, Janu-basti, Pristha-basti\n• Patra-pottali Swedana, Shastishali Pinda Swedana\n• Preparation of the herbs to be used for Panchakarma\n• Abhayanga: Ayurveda massage techniques: Head Massage, Spinal Massage, Baby Massage, Pizhichila, Marma massage• Panchakarma –\n\n1. Vamana (Scientific vomiting) – Demonstration\n2. Virechana (Scientific purgation) – Demonstration\n3. Anuvasana Basti (Medicated oil enema)\n4. Asthapana Basti (Medicated decoction enema)\n5. Nasya (Nasal drops)\n\n• Pashchat Karma (Post-procedures) – Preparations of food for Sansarjan Krama (food advice after Panchakarma )\n• Udvartana (herbal powder massage)" 
          }
        ]
      },
      {
        id: 10,
        title: "Ayurveda & Panchakarma Therapy - Step III",
        category: "Advanced",
        duration: "80 hours",
        fees: "US $1100",
        inPerson: true,
        description: "Advanced training in Ayurveda and Panchakarma therapies.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "1. Introduction:\n\n• Definition\n• Aims and objects\n• Health Concept\n\n2. History of Ayurveda\n3. Ashtanga Ayurveda: Eight Branches of Ayurveda\n4. Basic Principles of Ayurveda:\n\n• Loka- Purusha Samya Siddhanta – Similarity Concept between Human and Universe\n• Pancha Mahabhoota Siddhanta – Concept of Five fundamental elements of Universe\n• Tridosha Siddhanta – Concept of Three basic physiological constituents\n• Sharira: Concept of Body – Mind – Soul\n• Sapta Dhatu – Concept of 7 types of body tissues\n• Mala Concept (Waste Products formed during digestion)\n• Srotasa Concept ( Different Ayurveda systems)\n• Agni Concept (Digestive power)\n• Koshta Concept ( Types of digestive power according to Prakruti – body types)\n• Prakruti Concept (Body types according to Dosha dominance)(Oleation) –\n\n5. Pre – Procedures of Panchakarma\n\nI) Snehana (Oleation) –\n\na) Internal Oleation\nb) External Oleation\n\n• Abhyanga\n• Padabhyanga (Feet massage)\n• Shiroabhyanga (Head Massage)\n\nII) Swedana (Fomentation) –\n\na) Tapa Sweda (Fomentation)\nb) Upanaha Sweda\nc) Ushma Sweda (Herbal Steam and Bolus Bags)\nd) Drava Sweda (Sudation with liquids)\ne) AnagnI Sweda (Sudation without fire)\nf) Benefits of Sweda (Sudation)\n\n6. Panchakarma Therapy\n7. Vamana (Scientific Vomiting)\n8. Virechana (Scientific Purgation)\n9. Basti (Medicated Enemas)\n10. Nasya (Nasal administration of medicine)\n11. Schedules: Panchakarma Therapies Schedule according to season\n12. Marma (Vital / Imp Points in body)\n13. Samsarjan Krama (Special diet regimen after Panchakarma)\n14. Frequently used formulae/ recipes and medicated oils for Panchakarma" 
          },
          { 
            title: "Practical Sessions", 
            description: "\n\n1. Abhyanga (Ayurveda Body Massage)\n2. Patra – Pottali Sweda = Elakizhi (Massage with Medicinal Leaves ball)\n3. Churna – Pottali Sweda = Podikizhi (Massage with herbal Powders ball)\n4. Pinda-sweda = Navarakizhi (Massage with Rice cooked with herbs – ball)\n5. Udvartana (Massage with Medicinal Powders)\n6. Dhara:\n\na. Sarvanga Dhara or Pizhichila (Medicated Oil bath with massage)\nb. Shirodhara (Dripping oil on head)\nc. Takra Dhara (Dripping medicated butter milk on head)\nd. Ksheeradhara (Dripping medicated cow milk on head)\n\n7. Karna Poorana (Therapy for Ear Problems)\n8. Therapies for retention of medicated oil/ ghee on local area of body:\n\na) Shiro-basti (Retention of medicated oil on head)\nb) Netra-basti /Netra Tarpana (Retention of medicated oil in eyes)\nc) Kati-basti (Retention of medicated oil on lower back)\nd) Greeva-basti / Manya-basti (Retention of medicated oil on neck)\ne) Janu-basti (Retention of medicated oil on knee joints)\nf) Hrid-basti (Retention of medicated oil on chest at heart area)\n\n9. Bashpa Sweda (Herbal Steam Bath)\n10. Nadi Sweda (Local Herbal steam)\n11. Nasya (Nasal Medication)\n12. Padabhyanga (Feet massage)\n13. Shiroabhyanga (Head Massage)\n14. Face Massage" 
          }
        ]
      },
      {
        id: 11,
        title: "Beauty Care by Ayurveda - Step II",
        category: "Beauty",
        duration: "60 hours",
        fees: "US $850",
        inPerson: true,
        description: "Advanced beauty care techniques with Ayurveda.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda – Basic Principles\n• Prakriti (body type) analysis\n• Anatomy of face, hair and skin\n• Rasayana massage techniques\n• Concerned herbs and herbs blended oils\n• Detoxification therapies\n• Management for acne, aging, wrinkles\n• Approach to common hair problems\n• Udvartana Therapy\n• Preparations of related herbs and oils\n• Preparations of herbal Ghee and creams\n• Udgharshana – Herbal scrubbing" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti analysis\n• Rasayana massage\n• Demonstrations of preparations\n• Detoxification therapies\n• Face packs\n• Hair packs\n• Udvartana Therapy\n• Demonstrations of herbal Ghee and creams\n• Udgharshana – Herbal scrubbing" 
          }
        ]
      },
      {
        id: 12,
        title: "Ayurveda Marma Massage - Step III",
        category: "Therapy",
        duration: "90 hours",
        fees: "US $1350",
        inPerson: true,
        description: "Specialized training in Ayurvedic Marma massage.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda and Basic Principles\n• Basic anatomy and physiology\n• Prakriti analysis\n• Abhyanga rules\n• Preparation of medicated oils\n• Ayurveda head, spinal, face massage\n• Marma technique\n• Shirodhara\n• Sarvangdhara (Pizhichila)\n• Udvartana\n• Pain management techniques\n• Ayurveda beauty care\n• Netrabasti\n• Nasya\n• Rasayana and Vajikarana concepts" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti analysis\n• Abhyanga\n• Preparation of oils\n• Head, spinal, Marma, face massage\n• Shirodhara\n• Sarvangdhara (Pizhichila)\n• Udvartana\n• Kati-basti, Manya-basti, Hrid-basti\n• Patra-pottali swedana\n• Face, hair and skin care\n• Netrabasti\n• Nasya" 
          }
        ]
      },
      {
        id: 13,
        title: "Ayurveda & Panchakarma Advance Training",
        category: "Professional",
        duration: "60 hours",
        fees: "US $850",
        inPerson: true,
        description: "Advanced training in Ayurveda and Panchakarma.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Introduction to Ayurveda and Panchakarma\n• Prakriti (body – type) analysis\n• Steps of Panchakarma\n• Poorva Karma details\n• Preparation of Herbal oil\n• Marma points\n• Sarvangdhara (Pizhichila)\n• Shirodhara\n• Netrabsti\n• Udvartana\n• Pain management\n• Pradhana Karma\n• Pashchat Karma\n• Rasayana and Vajikarana concepts" 
          },
          { 
            title: "Practical Sessions", 
            description: "• Prakriti analysis\n• Snehana Technique\n• Swedana Technique\n• Marma\n• Shirodhara\n• Abhyanga\n• Preparation of Herbal oil\n• Head massage\n• Spinal massage\n• Netrabsti\n• Udvartana\n• Kati-basti, Manya – basti, Janu-basti\n• Patra Pottali Swedana\n• Panchakarma procedures" 
          }
        ]
      },
      {
        id: 14,
        title: "Yoga Teacher Training (Advance)",
        category: "Yoga",
        duration: "80 hours",
        fees: "US $850",
        inPerson: true,
        description: "Advanced yoga teacher training program.",
        modules: [
          { 
            title: "Theory Sessions", 
            description: "• Theoretical Knowledge of Yoga and Meditation\n• Ashtanga Yoga (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi)\n• Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Bandhas, Chanting, Mantra and Meditation\n• Anatomy and Physiology: A basic knowledge of various body systems. Functioning of various organs and other systems which are affected by yoga practices. Health benefits of yoga techniques, precautions / contraindications.\n• Yogic practice according to different concepts\n• Presentations and teaching techniques of different Yogasanas (Postures)\n• Teaching Methodology: Principles of demonstration, observation, assisting/correcting, instruction, teaching styles, and qualities of a teacher and the student’s process of learning.\n• Philosophy/Ethics/Lifestyle: Study of yoga scriptures (Yoga Sutras, Bhagavad Gita, etc.), ethics for yoga teachers, ‘living the life of the yogi’, etc.\n• Yoga Lifestyle: Applications of Yoga, Yoga for back problems, obesity, heart problems, diabetes, hypertension, stress, digestive disorders, prenatal yoga, yoga psychology etc." 
          },
          { 
            title: "Practical Sessions", 
            description: "• Ashtanga Yoga (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi) – Demonstrations\n• Practice of Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Practice of Bandhas, Chanting, Mantra and Meditation\n• Yogic practice according to different concepts\n• Practical: Theoretical teaching as well as observing and assisting in classes taught by others. Hours are a combination of supervised and unsupervised.\n• Teaching Methodology demonstrations: Principles of demonstration, observation, assisting/correcting, instruction, teaching styles, and qualities of a teacher and the student’s process of learning." 
          }
        ]
      }
    ];

    return (
      <div className="bg-[#f8f5f2] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
            In-Person Courses in Ayurveda
          </h1>

          {/* Changed to single column layout */}
          <div className="grid grid-cols-1 gap-8">
            {inPersonCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  return (
    <div>
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
                TRAINING PROGRAMS
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {currentPage === 'online' && <OnlineCourses />}
          {currentPage === 'in-person' && <InPersonCourses />}
        </main>
      </div>
    </div>
  );
}