require('dotenv').config();
const mongoose = require('mongoose');
const TrainingProgram = require('../models/TrainingProgram');

const onlineCourses = [
  {
    title: { en: "Beauty Care by Ayurveda" },
    description: { en: "This course helps you develop a deep sense of beauty that radiates from within. The course covers a variety of aspects of beauty, their relationship with your daily routine, and their link with the state of your physical, mental, and spiritual health. It describes the inner changes that will take place when you follow Ayurvedic principles on how to look and feel beautiful. After completing the course, you will realize that beauty is not an elusive thing, and that there is more to beauty than external good looks. In this course you will learn following modules." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "MODULE I: Beauty:- Ayurvedic approach", content: "• The Ayurveda approach to beauty\n• Ayurveda routine for maintaining beauty\n• How beauty is related to your constitution" },
      { topic: "MODULE II: Ayurvedic Skin Care", content: "• Layers of skin as per Ayurveda\n• The steps of routine skin care\n• Diagnose your skin type\n• Common skin problems and their remedies" },
      { topic: "MODULE III: Ayurvedic Rejuvenation Therapies", content: "• Udvartana – skin cleansing therapy\n• Face massage\n• Svedana – herbal steaming" },
      { topic: "MODULE IV: Ayurvedic Masks & Moisturizers", content: "• Herbal cleansing masks and it's use on various types of skin\n• Various types of nourishing Masks\n• Toners and moisturizers" },
      { topic: "MODULE V: Ayurvedic Hair Care", content: "• Hair care and remedial tips for general hair problems\n• Hair types\n• Common hair problems and their remedies" },
      { topic: "MODULE VI: The Secret of Beauty", content: "• The role of the mind in health and beauty\n• Inner beauty and the ways to enhance beauty" }
    ]
  },
  {
    title: { en: "Basics of Ayurveda" },
    description: { en: "Learn the foundational principles of Ayurveda and its approach to holistic health." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "MODULE I: The Foundations of Ayurveda", content: "• Ayurveda and its principles\n• Necessity to study in its Original-form\n• How to become a competent Ayurvedic physician\n• Ayurveda, a complete way of life\n• Definition of Ayurveda, Ayu and health\n• Aim of Ayurveda\n• Ayurveda; complete medical science\n• Eight specialised branches of Ayurveda\n• The real aim is to build a healthy and happy society" },
      { topic: "MODULE II: Principles of Ayurveda", content: "• Ayurveda is an eternal science\n• The philosophical background of Ayurveda\n• The pre-Vedic, Vedic and the post Vedic view of the historians\n• Theory of creation of universe\n• The five gross elements or Pancha Mahabhutas\n• Importance of creation and the panch Mahabhutas\n• The tridosha concept in Ayurveda\n• Factors responsible for aggravation of doshas\n• Qualities and natural aggravation of doshas" },
      { topic: "MODULE III: Principles of Ayurveda Part II", content: "• Types of sub doshas\n• Various states of doshas\n• How do doshas aggravate\n• Tridosha as three pillars of health\n• Importance of dhatus\n• Types, functions and formation of Srotasa\n• Diseases caused by various dhatus\n• Description about Ojas, the vital body-fluid\n• The waste materials also sustain the body\n• Proper quantity of malas (waste materials)\n• Disease caused by various malas" },
      { topic: "MODULE IV: Metabolism and digestion", content: "• Jatharagni (digestive fire)\n• Role of ama in disease process\n• Types of fires and their functions\n• Srotas, the root cause in disease process\n• Definition and types of Sroto dushti\n• Different categories of srotas\n• Importance of tastes in foods and herbs\n• Types and functions of tastes\n• Diseases caused due to tastes\n• Guna, virya, vipaka and special action of herbs" },
      { topic: "MODULE V: Prakriti (Physical Constitution)", content: "• Prakriti (personal constitution)\n• Types of prakriti\n• Factors affecting the constitution Prakriti and Vikriti\n• Determining the constitution\n• Basic factors for maintenance of health\n• Proper eating and proper mixing of foods\n• Quantity and quality of food\n• Opposing foods\n• Sleep, exercise, Panch Karma and Rasayana" }
    ]
  },
  {
    title: { en: "Advance Ayurveda" },
    description: { en: "This module provides a deeper examination of Ayurvedic concepts. The course content is divided into eight units, packed with relevant information" },
    type: "Online",
    duration: "50 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module I – Philosophy and Basic Principles of Ayurveda", content: "1. Objectives of Ayurveda\n2. Definition of health in Ayurveda\n3. Basic and primordial elements of Universe and human body\n4. Eight specialties of Ayurveda\n5. Three humors (Doshas)\n6. Dhatus, Mala & Agni\n7. Diet, Sleep & Sex Three pillars of life\n8. Concept of mind\n9. Prakriti (Body type according to Ayurveda)" },
      { topic: "Module II– Concepts of Positive Health", content: "1. Daily routine (Dincharya)\n2. Seasonal regimen (Ritucharya)\n3. Social conducts\n4. Diet\n5. Natural urges" },
      { topic: "Module III – Concepts of Ayurvedic materia-medica and Pharmaceutics", content: "1. Principles related to action of drugs\n2. Methods of Ayurvedic formulations\n3. Drug doses, Anupana & Sahapana\n4. Common Ayurvedic formulation" },
      { topic: "Module IV – Ayurveda's Diagnostic Methodology", content: "1. Fundamentals of diagnosis\n2. Rogi Pariksha (Examination of the patient)\n3. Dashvidha Pariksha (Ten point examination):\n  • Prakriti (constitution)\n  • Vikriti (disease susceptibility)\n  • Sara (quality of dhatus)\n  • Samhanana ((body built-compactness of the body)\n  • Pramana (anthropometry-measurements)\n  • Satmya (adaptability)\n  • Sattva (mental stamina)\n  • Ahara shakti (digestive power-appetite,digestion)\n  • Vyayama Shakti (exercise endurance)\n  • Vaya and vayikarana (age & rate of aging)\n  • Roga Pariksha (Examination of the disease)\n4. Ashtavidha Pariksha (eight point examination):\n  • Nadi pariksha (Examination of the pulse)\n  • Mutra pariksha (Examination of the urine)\n  • Mala pariksha (Examination of the stool)\n  • Jihva pariksha (Examination of the tongue)\n  • Shabda pariksha (Examination of the speech and voice)\n  • Sparsha pariksha (Examination of the skin)\n  • Drika pariksha (Examination of the eyes)\n  • Akriti pariksha (Examination of the external features)" },
      { topic: "Module V – General Ayurveda's Management of common diseases", content: "Ayurvedic approaches to managing common health conditions" }
    ]
  },
  {
    title: { en: "Ayurveda Herbology" },
    description: { en: "Dravyaguna Vidnyana (Study of Ayurvedic Medicinal Herbs) – It is the science of energetic principles and their various uses for treating diseases. Today while learning and practicing Ayurveda and alternative medicine; the knowledge of the Healing Herbs described in Ayurveda is very important. Learning the Herbs in Ayurvedic way is very important but in today’s advanced world the updates and scientific information of the Herbs is also very useful for the treatment of a diseases." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module I - Basics", content: "1. History of Ayurveda\n2. Ashtanga Ayurveda\n3. Indian Philosophy\n4. Anatomy in Ayurveda (Sharir Rachana)\n5. Basic Principles of Ayurveda\n6. Concept of Tridosha\n7. Prakruti (Body type)\n8. Dhatu (Tissues)\n9. Mala or Waste products\n10. Ojas\n11. Digestion and Metabolism\n12. Srotasa" },
      { topic: "Module II – Ayurvedic Herbology – Dravya Guna Shastra", content: "Study of energetic principles and uses of herbs" },
      { topic: "Module III – Ayurvedic Pharmacy (Pancha Vidha Kashya Kalpana)", content: "5 basic fundamentals of medicine preparations" },
      { topic: "Module IV- Nidana – Diagnosis of disease", content: "Diagnostic methodologies in Ayurveda" }
    ]
  },
  {
    title: { en: "Sushruta Samhita Introduction" },
    description: { en: "Introduction to the principles and practice of Ayurvedic Surgery." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module Curriculum", content: "1. Introduction to Sushruta Samhita – Reference book of Ayurvedic Surgery\n2. Historical perspective – Who was Sushruta? Origins of the Compendium etc.\n3. Salient points of Sutra sthana\n4. Chapter of Aphorisms: Birds eye view of Ayurvedic Surgery\n5. Salient points of Nidana sthana – Chapter of Ayurvedic Surgical Diagnosis\n6. Salient points of Sharira sthana – Chapter of Ayurvedic Surgical Anatomy and Physiology\n7. Salient points of Chikitsa sthana – Chapter of Surgery: Principles and practice of Ayurvedic Surgery\n8. Salient points of Kalpa sthana – Chapter of Formulations: finer points of Ayurvedic Pharmacy for Surgery\n9. Salient points of Uttara sthana – Chapter of Special topics: Specialties like Ophthalmology, ENT & face, Head etc." }
    ]
  },
  {
    title: { en: "Ashtanga Hridaya Samhita Introduction" },
    description: { en: "Essentials of Ayurvedic Medicine & Surgery from this classical text." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module Curriculum", content: "1. Introduction to Ashtanga Hridaya Samhita – Essentials of Ayurvedic Medicine & Surgery\n2. Historical perspective – Who was Vagbhata? Origins of the Compendium etc.\n3. Salient points of Sutra sthana – Chapter of Aphorisms: Birds eye view of Ayurvedic Medicine and Surgery\n4. Salient points of Sharira sthana – Chapter of Ayurvedic Anatomy and Physiology\n5. Salient points of Nidana sthana – Chapter of Ayurvedic Diagnosis\n6. Salient points of Chikitsa sthana – Chapter of Therapeutics: Principles and practice of Ayurvedic Medicine & Surgery\n7. Salient points of Kalpa sthana – Chapter of Formulations: finer points of Ayurvedic Pharmacy\n8. Salient points of Uttara sthana – Chapter of Special topics: Specialties like Ophthalmology, ENT & face, Head" }
    ]
  },
  {
    title: { en: "Madhava Nidana Introduction" },
    description: { en: "Principles and Practice of Ayurvedic Diagnostic Methodology." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module Curriculum", content: "1. Introduction to Madhava Nidana – Madhava's Principles and Practice of Ayurvedic Diagnosis\n2. Historical perspective – Who was Madhava? Origins of the Compendium etc.\n3. Nidana Principles of Ayurvedic Diagnosis: Causes Purva-Rupa\n4. Principles of Ayurvedic Diagnosis: Prodromal Signs and symptoms\n5. Rupa Principles of Ayurvedic Diagnosis: Signs and symptoms\n6. Upashaya Principles of Ayurvedic Diagnosis: 18 types of diagnostic modalities\n7. Samprapti- Principles of Ayurvedic Diagnosis: Etio-pathogenesis" }
    ]
  },
  {
    title: { en: "Pre-Menstrual Syndrome (PMS) and Menopause" },
    description: { en: "Ayurvedic approach to managing PMS and Menopause." },
    type: "Online",
    duration: "15 hours",
    price: 125,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Concept of Pre- Menstrual Syndome (PMS) in Ayurveda", content: "– Causative factors of PMS\n– Classification of PMS\n– Symptoms of PMS\n– Ayurveda Solutions for PMS" },
      { topic: "Concept of Menopause (Rajo-Nivrutti) in Ayurveda", content: "– Ayurveda views regarding Menopause\n– Signs and symptoms of Menopause\n– Ayurveda Solutions for Menopause" }
    ]
  },
  {
    title: { en: "Women Care and Pregnancy Care" },
    description: { en: "Ayurvedic approach to women's health and pregnancy care." },
    type: "Online",
    duration: "30 hours",
    price: 250,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module Curriculum", content: "1. Women – Strength of community\n2. Menstrual cycle – God gift to women\n3. Classification of female age life\n4. Ayurveda for healthy offspring\n5. Regimens to be followed before pregnancy\n6. Panchakarma (Bio-purification) – Five purificatory therapies to keep health of body\n7. Diet – Dietary details to maintain health\n8. Instructions for Coitus (actual act) instructions to conceive for healthy progeny\n9. Ayurveda approach for pregnancy care" },
      { topic: "10. Ayurveda's special month-wise regimen", content: "• First month care\n• Second month care\n• Third month care\n• Fourth month care\n• Fifth month care\n• Sixth month care\n• Seventh month care\n• Eighth month care\n• Ninth month care\n• Tenth month care" },
      { topic: "11. Benefits", content: "11. Benefits of Ayurveda care in pregnancy" }
    ]
  },
  {
    title: { en: "Rasayana (Rejuvenation) Therapy" },
    description: { en: "Learn about Ayurvedic rejuvenation therapies for physical and psychological well-being." },
    type: "Online",
    duration: "20 hours",
    price: 170,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module Curriculum", content: "1. Rasayana (Rejuvenation) Therapy of Ayurveda – Special branch from 8 branches of Ayurveda science\n2. Importance of Rasayana Therapy\n3. Benefits of Rasayana Therapy – physical and psychological aspects\n4. Types of Rasayana Therapy – various kind of classification\n5. Kuti Praveshika Rasayana – Exercise of Rasayana after admission in a specially built hut\n6. Vatatapika Rasayana – Exercise of Rasayana in daily routine life\n7. Useful herbs useful as Rasayana\n8. Some popular Rasayana recipes such as Bramha Rasayana, Kushmanda Avaleha, Chyavanprasha-avleha, etc.\n9. Achara Rasayana – Ideal conduct for human" }
    ]
  },
  {
    title: { en: "Vajikarana (Vitalization) Therapy" },
    description: { en: "Ayurvedic approach to sexual health and vitality." },
    type: "Online",
    duration: "20 hours",
    price: 170,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Module Curriculum", content: "1. Vajikarana (Vitalization) Therapy of Ayurveda – Special branch from 8 branches of Ayurveda science\n2. Importance of Vajikarana Therapy\n3. Benefits of Vajikarana Therapy – physical and psychological aspects\n4. Types of Vajikarana Therapy – various kind of classification\n5. Diagnosis way of Ayurveda for Sexual dysfunctions\n6. Treatment guidelines for Sexual dysfunctions\n7. Useful herbs to maintain sexual health\n8. Some popular Vajikarana recipes such as Kaucha Paka, Vanari Gutika, Chyavanprasha-avleha, etc." }
    ]
  }
];

const inPersonCourses = [
  {
    title: { en: "Ayurveda Basics & Panchakarma Training" },
    description: { en: "Introduction to Ayurveda and Panchakarma with practical training sessions." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda and Basic Principles\n• Introduction to Panchakarma and Basic Principles\n• Prakriti (body – type) analysis\n• Steps of Panchakarma: Poorva, Pradhana and Paschat – karma\n• Poorva Karma (pre-procedures) – types and its details\n• Snehana (oleation) and Swedana (fomentation)\n• Abhyanga (Basic Ayurveda Massage)\n• Preparation of Herbal oil\n• Ayurveda head massage\n• Ayurveda spinal massage\n• Marma (vital / important points inside body)\n• Shirodhara" },
      { topic: "Practical Sessions", content: "• Prakriti (body – type) analysis\n• Understanding own diet and behavioural advice by Ayurveda\n• Snehana (Oleation) Technique\n• Swedana (Fomentation) Technique\n• Marma (vital / important points inside body)\n• Shirodhara\n• Abhyanga (Basic Ayurveda Massage)\n• Preparation of Herbal oil\n• Ayurveda head massage\n• Ayurveda spinal massage" }
    ]
  },
  {
    title: { en: "Beauty Care by Ayurveda - Step I" },
    description: { en: "Ayurvedic approach to beauty care with theoretical and practical sessions." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda – Basic Principles\n• Prakriti (body type) analysis\n• Anatomy of face according to Ayurveda and approach to face care\n• Anatomy of hair according to Ayurveda and approach to hair care\n• Anatomy of skin according to Ayurveda and approach to skin care\n• Rasayana (rejuvenation) massage techniques\n• Management for early aging and wrinkles by Ayurveda\n• Approach to under eye dark circles by Ayurveda\n• Udvartana Therapy (herbal powder massage for obesity and cellulites management by Ayurveda)\n• Preparations of related herbs and oils" },
      { topic: "Practical Sessions", content: "• Prakriti (body type) analysis\n• Rasayana (rejuvenation) massage\n• Management for early aging and wrinkles by Ayurveda\n• Approach to under eye dark circles by Ayurveda\n• Udvartana Therapy (herbal powder massage)\n• Demonstrations of preparations of herbs and oils" }
    ]
  },
  {
    title: { en: "Ayurveda's Herbal Medicines and Oils Preparation" },
    description: { en: "Learn to prepare various Ayurvedic formulations and medicines." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda and Basic Principles\n• Panchavidha Kashaya Kalpana (Five basic fundamental forms for preparations of medicines of Herbs) :\n   Swarasa (juice)\n   Kalka (paste)\n   Kvatha (decoction)\n   Heema (cold infusion)\n   Phanta (hot infusion)\n• Upa-Kalpana (Secondary preparations): Various herbal powder mixtures such as Triphala, Face pack, Hair pack, etc.\n• Preparations of herbal decoctions: Demonstrations of various useful decoctions in daily life\n• Preparation of herbal oils and ghee: Demonstrations and practice of making different oils such as Hair oil, Massage oil, Triphala Ghee, etc.\n• Guggulu purification and preparation: Demonstration of purification of Guggulu and making of pills\n• Preparation of Avaleha (Confection/ herbal paste with sugar): Herbal sweet cakes preparation\n• Common Herbal tablets: Preparation of Vyoshadi Vati (tablet), etc.\n• Common Herbal compounds such as Hingvashtaka Churna, Anti dandruff hair wash, etc." },
      { topic: "Practical Sessions", content: "• Panchavidha Kashaya Kalpana (Five basic fundamental forms preparations) :\n   Swarasa (juice)\n   Kalka (paste)\n   Kvatha (decoction)\n   Heema (cold infusion)\n   Phanta (hot infusion)\n• Upa-Kalpana (Secondary preparations): Triphala, Face pack, Hair pack, etc.\n• Preparations of herbal decoctions\n• Demonstrations of making different oils such as Massage oil, Triphala Ghee, etc.\n• Guggulu purification and preparation and making of pills\n• Preparation of Herbal sweet cakes\n• Preparation of Vyoshadi Vati (tablet)\n• Preparations of Herbal compounds such as Hingvashtaka Churna, Anti dandruff hair wash, etc." }
    ]
  },
  {
    title: { en: "Ayurveda Cooking Training" },
    description: { en: "Learn Ayurvedic principles of cooking and nutrition." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory sessions", content: "• Introduction to Ayurveda\n• Tridoshas (Five Elements Theory)\n• Determining Vata, Pitta & Kapha\n• Sapta Dhatus (Tissue materials)\n• Shad Rasas (Tastes): Sweet, Sour, Hot, Bitter, Salty & Astringent\n• Food and Consciousness: Satwa, Rajas & Tamas\n• Daily regime & seasonal regime to balance each body type\n• Nutritional value of various food items according to Ayurveda\n• Prevention of diseases, purification of the body\n• Diets for various Body types\n• Food Combination\n• Order to Eat Food as per Individual\n• Daily Rhythms of Time" },
      { topic: "Practical sessions", content: "• Herbal tea\n• Types of milk: Different ways of cooking milk with spices and Ayurveda herbs\n• Rice dishes\n• Vegetable dishes\n• Herbal Soups\n• Types of juices\n• Demonstration of different types of Ayurvedic spices\n• Demonstration of different types of salts\n• Demonstration of different types of rice\n• Demonstration of different types of Indian breads (Bhakri, Chapati, Thalipeetha, etc.)" }
    ]
  },
  {
    title: { en: "Ayurveda Lifestyle Management" },
    description: { en: "Learn daily and seasonal regimens according to Ayurveda." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda and its Basic Principles\n• Prakriti (body – type) analysis\n• Dinacharya (Daily regimen) :\n   Awakening early in the morning\n   Purification of the body (Shouch vidhi)\n   Tooth brushing and tongue cleaning (Dantdhavana and Jivha nirlekhan vidhi)\n   Gargling (Gandusha)\n   Mouths wash (Kavala)\n   Massage (Abhyanga)\n   Body wash (Udvartana)\n   Cutting nails, hairs, etc. (Papmopashamana)\n   Bath (Snanam)\n   Hair dressing (Prasadhan vidhi)\n   Wearing of cloths (Vastra Paridhan)\n   Wearing of flowers (Pushpa Dharana)\n   Wearing of Garlands (Abhooshana)\n   Wearing of foot wear (Padatrana dharana)\n   Wearing of protective covering (Kavacha Dharana)\n• Ritucharya (Seasonal regimen) : Diet and behaviour regimens according to various seasons-\n  Shishira – Late winter\n   Vasanta – Spring\n   Grishma – Summer\n   Varsha – Rainy\n   Sharada – Spiritual\n   Hemanta – winter  \n• Aahara, Nidra and Bramhacharya (Food, Sleep and Sex) management according to Ayurveda\n• Home remedies for common health problems\n• Herbs used for beauty enhancement\n• Unique Concepts of Ayurveda – Rasayana (rejuvenation) and Vajikarana (aphrodisiacs)" },
      { topic: "Practical Sessions", content: "• Prakriti (body – type) analysis and advices accordingly\n• Dinacharya (Daily regimen) : Experiencing all following things as per Ayurveda Awakening early in the morning\n   Tooth brushing and tongue cleaning (Dantdhavana and Jivha Nirlekhan vidhi)\n   Gargling (Gandusha)\n   Mouths wash (Kavala)\n   Massage (Abhyanga)\n   Body wash (Udvartana)\n   Bath (Snanam)\n   Hair dressing (Prasadhan vidhi)\n   Wearing of cloths (Vastra Paridhan)\n   Wearing of flowers (Pushpa Dharana)\n   Wearing of Garlands (Abhooshana)\n   Wearing of protective covering (Kavacha Dharana)\n• Preparations of Home remedies for common health problems\n• Preparations of Herbs used for beauty enhancement" }
    ]
  },
  {
    title: { en: "Ayurveda Massage for Baby & Pregnancy Care" },
    description: { en: "Ayurvedic approach to baby massage and pregnancy care." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Basic Principles of Ayurveda: Pancha Mahabhoota, Tridosha, Sapta Dhatu, Mala\n• Identification of Prakriti (Body Constitution)\n• Introduction to Ayurvedic Baby Massage: Benefits, procedure, post procedure, oils\n• Introduction to Ayurvedic Pregnancy Massage: Safety, benefits, techniques\n• Methods of Ayurvedic Pregnancy Care: Month wise development, diet plans, Ayurveda for Normal Delivery\n• Introduction to Ayurvedic Postnatal Massage\n• Methods of Postnatal Care\n• Treatments of common problems" },
      { topic: "Practical Sessions", content: "• Prakriti (Body Constitution) analysis\n• Baby massage procedure and post procedure\n• Preparation of herbal oils\n• Pregnancy Massage\n• Month wise specialized diet plan during pregnancy\n• Ayurvedic Postnatal Massage" }
    ]
  },
  {
    title: { en: "Identification of Ayurvedic Herbs and Spices" },
    description: { en: "Learn to identify and use common Ayurvedic herbs and spices." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda and its basic principles\n• Common herbs and spices useful in day to day life and their properties\n• Shadrasa (Six tastes)\n• Virya (potency)\n• Vipaka (post digestive effect)\n• Guna (properties)\n• Dosha Concept – properties, normal and abnormal functions\n• Herbs and spices – actions and their impact on human body\n• Rasayana (rejuvenation) herbs and spices with their properties and actions\n• Vajikarana (Aphrodisiac) herbs and spices with their properties and actions\n• Herbs for beauty with their properties and actions\n• Vata Dosha balancing herbs and spices\n• Pitta Dosha balancing herbs and spices\n• Kapha Dosha balancing herbs and spices" },
      { topic: "Practical Sessions", content: "• Herbs – identifications and demonstrations\n• Spices – identifications and demonstrations\n• Visit to Ayurveda Herbal garden\n• Herbal combinations preparations for beauty of skin\n• Herbal combinations preparations for beauty of hairs" }
    ]
  },
  {
    title: { en: "Yoga Teacher Training (Basic)" },
    description: { en: "Basic yoga teacher training program." },
    type: "In-Person",
    duration: "30 hours",
    price: 450,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Theoretical Knowledge of Yoga and Meditation\n• Ashtanga Yoga (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi)\n• Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Bandhas, Chanting, Mantra and Meditation\n• Anatomy and Physiology\n• Health benefits of yoga techniques, precautions / contraindications\n• Yogic practice according to different concepts\n• Presentations and teaching techniques" },
      { topic: "Practical Sessions", content: "• Practice of Asanas, Pranayama, Dhyana\n• Practice of Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Practice of Bandhas, Chanting, Mantra and Meditation\n• Yogic practice according to different concepts" }
    ]
  },
  {
    title: { en: "Ayurveda Therapist Training" },
    description: { en: "Comprehensive training to become an Ayurveda therapist." },
    type: "In-Person",
    duration: "160 hours",
    price: 2300,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Basic principles of Ayurveda:\n\n 1. Loka-purusha Samya Concept\n2. Pancha Mahabhoota Concept\n3. Dosha, Dhatu, Mala, etc\n\n• Prakriti (body – type) analysis: Principles and accordingly advices\n• Ayurveda Beauty Care techniques:\n\n1. Face care\n2. Skin care\n3. Hair care\n\n• Preparation of the herbs to be used for beauty care with its details\n• Herbs for primary health care\n• Ayurveda cooking :\n\n1. Shad Rasas (Tastes): Sweet, Sour, Hot, Bitter, Salty and Astringent\n2. Food and Consciousness: Satwa, Rajas and Tamas\n3. Daily regime and seasonal regime to balance each body type\n4. Nutritional value of various food items according to Ayurveda\n5. Prevention of diseases, purification of the body\n6. Diets for various Body types\n7. Food Combination\n8. Order to Eat Food as per Individual\n9. Daily Rhythms of Time\n\n• Basics of Panchakarma\n• Shirodhara for management of stress and anxiety\n• Ayurveda ways of pain management (Kati-basti, Patra-pottali swedana, Shastishali Pinda Swedana)\n• Life style management – Daily regimen, Seasonal regimen Marma (vital pressure point technique) therapy\n• Preparation of the herbs to be used for Panchakarma• Abhayanga: \nAyurveda massage techniques:\n\n1. Head Massage\n2. Spinal Massage\n3. Baby Massage\n\n• Special Ayurvedic Massage techniques – Pizhichila\n• Marma massage\n• Fundamentals of Diagnosis\n• Types of Ayurveda treatment:\n\n1. Panchakarma \n2. Vamana (Scientific vomiting)\n3. Virechana (Scientific purgation)\n4. Anuvasana Basti (Medicated oil enema)\n5. Asthapana Basti (Medicated decoction enema)\n6. Nasya (Nasal drops)\n\n• Pashchat Karma (Post-procedures) – preparations of food for Sansarjan Krama (food advice after Panchakarma )\n• Udvartana (herbal powder massage for curing obesity and cellulites)\n• Rasayana Upachara (Geriatric and Rejuvenation therapy)\n• Vajikarana Upachara (aphrodisiacs) concept" },
      { topic: "Practical Sessions", content: "• Prakriti (body – type) analysis\n• Ayurveda Beauty Care: Face care, Skin care, Hair care\n• Preparation of the herbs to be used for beauty care\n• Ayurveda cooking :\n\n1. Herbal tea\n2. Types of milk: Different ways of cooking milk with spices and Ayurveda herbs\n3. Rice dishes\n4. Vegetable dishes\n5. Herbal Soups\n6. Types of juices\n7. Demonstration of different types of Ayurvedic spices\n8. Demonstration of different types of salts\n9. Demonstration of different types of rice\n10. Demonstration of different types of Indian breads (Bhakri, Chapati, Thalipeetha, etc.)\n\n• Shirodhara\n• Kati-basti, Manya-basti, Janu-basti, Pristha-basti\n• Patra-pottali Swedana, Shastishali Pinda Swedana\n• Preparation of the herbs to be used for Panchakarma\n• Abhayanga: Ayurveda massage techniques: Head Massage, Spinal Massage, Baby Massage, Pizhichila, Marma massage• Panchakarma –\n\n1. Vamana (Scientific vomiting) – Demonstration\n2. Virechana (Scientific purgation) – Demonstration\n3. Anuvasana Basti (Medicated oil enema)\n4. Asthapana Basti (Medicated decoction enema)\n5. Nasya (Nasal drops)\n\n• Pashchat Karma (Post-procedures) – Preparations of food for Sansarjan Krama (food advice after Panchakarma )\n• Udvartana (herbal powder massage)" }
    ]
  },
  {
    title: { en: "Ayurveda & Panchakarma Therapy - Step III" },
    description: { en: "Advanced training in Ayurveda and Panchakarma therapies." },
    type: "In-Person",
    duration: "80 hours",
    price: 1100,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "1. Introduction:\n\n• Definition\n• Aims and objects\n• Health Concept\n\n2. History of Ayurveda\n3. Ashtanga Ayurveda: Eight Branches of Ayurveda\n4. Basic Principles of Ayurveda:\n\n• Loka- Purusha Samya Siddhanta – Similarity Concept between Human and Universe\n• Pancha Mahabhoota Siddhanta – Concept of Five fundamental elements of Universe\n• Tridosha Siddhanta – Concept of Three basic physiological constituents\n• Sharira: Concept of Body – Mind – Soul\n• Sapta Dhatu – Concept of 7 types of body tissues\n• Mala Concept (Waste Products formed during digestion)\n• Srotasa Concept ( Different Ayurveda systems)\n• Agni Concept (Digestive power)\n• Koshta Concept ( Types of digestive power according to Prakruti – body types)\n• Prakruti Concept (Body types according to Dosha dominance)(Oleation) –\n\n5. Pre – Procedures of Panchakarma\n\nI) Snehana (Oleation) –\n\na) Internal Oleation\nb) External Oleation\n\n• Abhyanga\n• Padabhyanga (Feet massage)\n• Shiroabhyanga (Head Massage)\n\nII) Swedana (Fomentation) –\n\na) Tapa Sweda (Fomentation)\nb) Upanaha Sweda\nc) Ushma Sweda (Herbal Steam and Bolus Bags)\nd) Drava Sweda (Sudation with liquids)\ne) AnagnI Sweda (Sudation without fire)\nf) Benefits of Sweda (Sudation)\n\n6. Panchakarma Therapy\n7. Vamana (Scientific Vomiting)\n8. Virechana (Scientific Purgation)\n9. Basti (Medicated Enemas)\n10. Nasya (Nasal administration of medicine)\n11. Schedules: Panchakarma Therapies Schedule according to season\n12. Marma (Vital / Imp Points in body)\n13. Samsarjan Krama (Special diet regimen after Panchakarma)\n14. Frequently used formulae/ recipes and medicated oils for Panchakarma" },
      { topic: "Practical Sessions", content: "\n\n1. Abhyanga (Ayurveda Body Massage)\n2. Patra – Pottali Sweda = Elakizhi (Massage with Medicinal Leaves ball)\n3. Churna – Pottali Sweda = Podikizhi (Massage with herbal Powders ball)\n4. Pinda-sweda = Navarakizhi (Massage with Rice cooked with herbs – ball)\n5. Udvartana (Massage with Medicinal Powders)\n6. Dhara:\n\na. Sarvanga Dhara or Pizhichila (Medicated Oil bath with massage)\nb. Shirodhara (Dripping oil on head)\nc. Takra Dhara (Dripping medicated butter milk on head)\nd. Ksheeradhara (Dripping medicated cow milk on head)\n\n7. Karna Poorana (Therapy for Ear Problems)\n8. Therapies for retention of medicated oil/ ghee on local area of body:\n\na) Shiro-basti (Retention of medicated oil on head)\nb) Netra-basti /Netra Tarpana (Retention of medicated oil in eyes)\nc) Kati-basti (Retention of medicated oil on lower back)\nd) Greeva-basti / Manya-basti (Retention of medicated oil on neck)\ne) Janu-basti (Retention of medicated oil on knee joints)\nf) Hrid-basti (Retention of medicated oil on chest at heart area)\n\n9. Bashpa Sweda (Herbal Steam Bath)\n10. Nadi Sweda (Local Herbal steam)\n11. Nasya (Nasal Medication)\n12. Padabhyanga (Feet massage)\n13. Shiroabhyanga (Head Massage)\n14. Face Massage" }
    ]
  },
  {
    title: { en: "Beauty Care by Ayurveda - Step II" },
    description: { en: "Advanced beauty care techniques with Ayurveda." },
    type: "In-Person",
    duration: "60 hours",
    price: 850,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda – Basic Principles\n• Prakriti (body type) analysis\n• Anatomy of face, hair and skin\n• Rasayana massage techniques\n• Concerned herbs and herbs blended oils\n• Detoxification therapies\n• Management for acne, aging, wrinkles\n• Approach to common hair problems\n• Udvartana Therapy\n• Preparations of related herbs and oils\n• Preparations of herbal Ghee and creams\n• Udgharshana – Herbal scrubbing" },
      { topic: "Practical Sessions", content: "• Prakriti analysis\n• Rasayana massage\n• Demonstrations of preparations\n• Detoxification therapies\n• Face packs\n• Hair packs\n• Udvartana Therapy\n• Demonstrations of herbal Ghee and creams\n• Udgharshana – Herbal scrubbing" }
    ]
  },
  {
    title: { en: "Ayurveda Marma Massage - Step III" },
    description: { en: "Specialized training in Ayurvedic Marma massage." },
    type: "In-Person",
    duration: "90 hours",
    price: 1350,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda and Basic Principles\n• Basic anatomy and physiology\n• Prakriti analysis\n• Abhyanga rules\n• Preparation of medicated oils\n• Ayurveda head, spinal, face massage\n• Marma technique\n• Shirodhara\n• Sarvangdhara (Pizhichila)\n• Udvartana\n• Pain management techniques\n• Ayurveda beauty care\n• Netrabasti\n• Nasya\n• Rasayana and Vajikarana concepts" },
      { topic: "Practical Sessions", content: "• Prakriti analysis\n• Abhyanga\n• Preparation of oils\n• Head, spinal, Marma, face massage\n• Shirodhara\n• Sarvangdhara (Pizhichila)\n• Udvartana\n• Kati-basti, Manya-basti, Hrid-basti\n• Patra-pottali swedana\n• Face, hair and skin care\n• Netrabasti\n• Nasya" }
    ]
  },
  {
    title: { en: "Ayurveda & Panchakarma Advance Training" },
    description: { en: "Advanced training in Ayurveda and Panchakarma." },
    type: "In-Person",
    duration: "60 hours",
    price: 850,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Introduction to Ayurveda and Panchakarma\n• Prakriti (body – type) analysis\n• Steps of Panchakarma\n• Poorva Karma details\n• Preparation of Herbal oil\n• Marma points\n• Sarvangdhara (Pizhichila)\n• Shirodhara\n• Netrabsti\n• Udvartana\n• Pain management\n• Pradhana Karma\n• Pashchat Karma\n• Rasayana and Vajikarana concepts" },
      { topic: "Practical Sessions", content: "• Prakriti analysis\n• Snehana Technique\n• Swedana Technique\n• Marma\n• Shirodhara\n• Abhyanga\n• Preparation of Herbal oil\n• Head massage\n• Spinal massage\n• Netrabsti\n• Udvartana\n• Kati-basti, Manya – basti, Janu-basti\n• Patra Pottali Swedana\n• Panchakarma procedures" }
    ]
  },
  {
    title: { en: "Yoga Teacher Training (Advance)" },
    description: { en: "Advanced yoga teacher training program." },
    type: "In-Person",
    duration: "80 hours",
    price: 850,
    instructor: "Staff",
    isActive: true,
    syllabus: [
      { topic: "Theory Sessions", content: "• Theoretical Knowledge of Yoga and Meditation\n• Ashtanga Yoga (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi)\n• Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Bandhas, Chanting, Mantra and Meditation\n• Anatomy and Physiology: A basic knowledge of various body systems. Functioning of various organs and other systems which are affected by yoga practices. Health benefits of yoga techniques, precautions / contraindications.\n• Yogic practice according to different concepts\n• Presentations and teaching techniques of different Yogasanas (Postures)\n• Teaching Methodology: Principles of demonstration, observation, assisting/correcting, instruction, teaching styles, and qualities of a teacher and the student’s process of learning.\n• Philosophy/Ethics/Lifestyle: Study of yoga scriptures (Yoga Sutras, Bhagavad Gita, etc.), ethics for yoga teachers, ‘living the life of the yogi’, etc.\n• Yoga Lifestyle: Applications of Yoga, Yoga for back problems, obesity, heart problems, diabetes, hypertension, stress, digestive disorders, prenatal yoga, yoga psychology etc." },
      { topic: "Practical Sessions", content: "• Ashtanga Yoga (Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana and Samadhi) – Demonstrations\n• Practice of Yogasana, Kriyas (Cleansing Processes), Shatkarma, Pranayam and Dhyana\n• Practice of Bandhas, Chanting, Mantra and Meditation\n• Yogic practice according to different concepts\n• Practical: Theoretical teaching as well as observing and assisting in classes taught by others. Hours are a combination of supervised and unsupervised.\n• Teaching Methodology demonstrations: Principles of demonstration, observation, assisting/correcting, instruction, teaching styles, and qualities of a teacher and the student’s process of learning." }
    ]
  }
];

async function seedTraining() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await TrainingProgram.deleteMany({});
    console.log("Cleared existing training programs");

    let count = 0;
    for (const course of [...onlineCourses, ...inPersonCourses]) {
      await TrainingProgram.create(course);
      count++;
    }

    console.log(`Successfully seeded ${count} Training Programs!`);
  } catch (error) {
    console.error("Error seeding training programs:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedTraining();
