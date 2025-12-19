
import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
     {
      question: "What is Ayurveda?",
      answer: "Indian traditional and integrative medicine is known as 'Ayurveda'. Ayurveda is translated as 'knowledge of life' from the Sanskrit words 'ayu' and 'veda,' which both mean 'life' and 'the knowledge,' respectively. This traditional medical practise has developed through the years, including centuries of knowledge that has been gained via intense meditation, intellectual and religious enlightenment, and practical experience. It demonstrates how, in the end, we can shape, lengthen, and govern our lives free from illness or ageing."
    },
    {
      question: "Is Ayurvedic Medicine Effective?",
      answer: "Yes, the patient/person can often anticipate the first shift among many shifts within 2 to 6 weeks provided the client follows all the instructions from the Ayurvedic practitioner."
    },
    {
      question: "What are Ayurveda treatments?",
      answer: "The Ayurvedic toolkit has a variety of remedies for harmonising health. They consist of:\n• Improvements in lifestyle, such as regular bedtimes\n• Dietary adjustments, such as consuming more warm foods, oils, or greens\n• Herbs Are available in a variety of formats, including decoctions, tablets, tinctures, teas, capsules, and loose powder, etc.\n• Body treatments/therapies\n• Yoga and Meditation\n• Panchakarma - a thorough purification and rejuvenation procedure"
    },
    {
      question: "What is Ayurveda used to treat?",
      answer: "All other illnesses, particularly those that are chronic and do not respond to Western medicine, are helped by Ayurveda. Ayurveda treats gastrointestinal issues (ulcers, IBS, IBD, Crohn's, diverticulitis,…), fatigue, pain (low back pain, muscular or bone pain,…), hormone/endocrine function (diabetes, infertility, menopause…), weight issues, immune system function (cancer), auto-immune (hashimoto's, rheumatoid arthritis, lupus, MS…), urinary function, anti-aging, nervous system (RLS, parkinson's, ADHD/ADD…), respiratory system (asthma, bronchitis, sinusitis,…), circulatory system (hypertension, cholesterol, heart function…), cognitive function and psychological disorders/imbalances (memory, depression, stress, anxiety, insomnia, bipolar,…)"
    },
    {
      question: "What makes Ayurveda significant?",
      answer: "Allopathic treatments focus on symptoms, while Ayurveda addresses the underlying causes of illness. Ayurveda targets the underlying issue, which will have a lasting impact. With Ayurveda, you can control your own health. No needless testing or waiting for a prescription are required. For instance, if you tend to get mild constipation in the fall, you should begin consuming warmer, moderately spiced foods prior to the season, as well as healthy oils, water, and warm herbal teas. You should also avoid cold and drying foods."
    },
    {
      question: "Does Ayurvedic medicine have side effects?",
      answer: "Actually, no side effects in true sense. A detoxification effect could appear as a rash or mild flu-like symptoms. This is typically a natural response and indicates that the herbs are working. The practitioner frequently modifies the dosage when the reaction is stronger than usual."
    },
    {
      question: "Who decides on the appropriate Ayurveda Therapies / treatment(s) for me?",
      answer: "After a comprehensive consultation with one of our skilled Ayurveda Doctors, you will be given advice on the therapies/treatment(s) best suited to your current condition and nature."
    },
    {
      question: "Is Ayurveda safe?",
      answer: "This therapeutic method is regarded as quite safe when used by a licenced and competent Ayurvedic professional. Always see your primary care physician before beginning any treatment, and inform your Ayurvedic consultant of any medications or health issues before beginning any regimen."
    },
    {
      question: "How do I make an appointment?",
      answer: "Please contact us by phone or email with your needs, and we will be happy to assist.\nEmail: bhagirathiayurveda@gmail.com\nPhone: +91 90212 55057\nNote: First-come, first-served scheduling applies to appointments. To avoid disappointment, we advise visitors to make appointments in advance."
    },
    {
      question: "What exactly are Panchakarma therapies?",
      answer: "Five cleansing therapies or actions make up 'Panchakarma'. The following 5 actions are among the options for Panchakarma:\n1. Vamana (therapeutic vomiting for excess Kapha)\n2. Virechana (purgation – powerful laxative for excess Pitta and Vata)\n3. Basti (medicated enemas for excess Vata)\n4. Nasya (nasal oil for the head, neck, and lingering doshas) increases prana flow, opens channels in the skull, cleans the nasal passages and sinuses, and alleviates allergic diseases.\n5. Rakta moksha (bloodletting – for excess Pitta, periphery diseases) – when too many toxins are transported by the blood to the skin illnesses\nAdditional body treatments that can be utilised in Panchakarma include steams, fasting, exposure to wind or sun, exercise, and herbs that remove toxins. Other body therapies include Abhyanga (warm oil body treatment), Shirodhara (streaming warm oil on the forehead), Pindasweda, Katibasti, Hridbasti, etc."
    },
    {
      question: "When should 'Panchakarma' be used?",
      answer: "A medical illness becomes chronic when toxins build up over time and make it worse. In such circumstances, medication alone might not be enough. The best medical procedure to treat a chronic illness and stop its recurrence is Panchakarma."
    },
    {
      question: "What constitutes the foundation of Ayurveda medicine?",
      answer: "Ineffective dietary and lifestyle behaviours are corrected as part of the Ayurvedic treatment procedure. Most of the time, by changing one's lifestyle, all other changes come about automatically. Based on the system's inherent energy, health is returned. However, vitality deteriorates in those who have led a bad lifestyle for a long time. Assistance is required in the form of special detoxification procedures to cleanse the body. In Ayurveda, treatments or medications are used to support the body's natural healing process."
    },
    {
      question: "What are the advantages of Panchakarma?",
      answer: "Among the advantages of Panchakarma are:\n• Lowers cholesterol\n• Reduces the fourteen main hazardous and cancer-causing compounds from the body tissues, which has a negative impact on the rate of platelet clumping.\n• Significantly raises the level of hdl, the healthy cholesterol\n• Reduces systolic blood pressure\n• 70% less exposure to pesticides, heavy metals, and other dangerous pollutants than the general population.\n• Decreases free radicals, the primary cause of all disease.\n• Lowers somatic complaints, irritation, physical exhaustion, psychological inhibition, and emotional stability significantly\n• Reduced anxiety\n• Work to address the disease's underlying causes\n• Increases immunity\n• Poisons from chemicals (environment pollution, drinking, smoking, chemicals in food, medicines)\n• Removes toxic emotions (stress, jealousy, sorrows, fears, anger, grief, anxiety)\n• Decrease in excess fat\n• Combats ageing\n• Enhances skin's radiance eliminates stress, insomnia, and mental fatigue\n• Balances the levels of blood pressure and circulation\n• Benefits the digestive system\n• Increases vitality and endurance"
    },
    {
      question: "What distinguishes Ayurvedic treatment from Western medicine?",
      answer: "Because it is holistic, Ayurveda is successful at healing illnesses. It offers customised care and is appropriate for India's socioeconomic circumstances. Ayurveda has an advantage over western medicine in terms of disease prevention and treatment thanks to the availability of several formulations for various diseases, the use of food products as medicines, and lifestyle knowledge."
    },
    {
      question: "Do you have qualified therapists?",
      answer: "Our Ayurveda doctors further teach our therapists once they have obtained their professional credentials."
    },
    {
      question: "What would the gender of my therapist be?",
      answer: "We strictly adhere to the Ayurvedic principles at our Ayurveda Panchakarma Clinic by assigning female therapists to treat women and male therapists to treat men. There are no transgender therapies or treatments offered by us."
    },
    {
      question: "Do you have Ayurvedic consultants/doctors?",
      answer: "Yes, we have Ayurvedic doctors with degrees in BAMS, MD, and PhD in Ayurveda who have more than 20 years of expertise in Panchakarma therapies, consultation, teaching, and other aspects of Ayurveda."
    },
    {
      question: "What is the Ayurveda treatment for arthritis?",
      answer: "Arthritis is typically caused by ama, toxins, and a weak digestive system. In general, Panchakarma is suggested due to the pollutants. The arthritis-related doshic imbalance will affect the course of treatment.\nIf Vata is the main culprit, we should treat the condition with warm, moderately spiced foods, haritaki, castor oil both internally and topically, and perhaps yogaraj guggulu or simhanada guggulu.\nThe use of greens in the diet, cooling spices, herbs that offer moist and cooling characteristics, amalaki, and potentially kaishore guggulu are all recommended if Pitta is the primary aggressor.\nIf Kapha is the main factor, there will be swelling and water retention, and we will be employing bibhitaki, spicy, pungent spices on warm cooked dishes, and perhaps diuretics. guggulu or triphala triphala guggulu or punarnava guggulu or simhanada guggulu.\nYoga is helpful for all arthritic conditions."
    },
    {
      question: "How often do I need to receive treatment?",
      answer: "Ayurveda Panchakarma therapies are strongly advised to be received once a year for healthy people, and more frequently for people with diseases, depending on your unique circumstances and the individual. There are some therapies that are extremely beneficial when taken in succession."
    },
    {
      question: "What is the origin of Ayurvedic medicine?",
      answer: "Nature! The foundation of all Ayurvedic treatments is the idea that you can eat your treatments. To avoid adding further toxins to the body, it is important to ensure that the herbs, oils, and other ingredients come from clean sources."
    },
    {
      question: "Who created Ayurveda?",
      answer: "At least 5000 years ago, the Gods gave the Indian sages the gift of Ayurveda. According to recent studies, Ayurveda is practised from 10,000 years ago. Charaka, Sushruta and Vagbhata are the authors of the three main Ayurveda's classical texts, viz: Charaka Samhita, Sushruta Samhita, Ashtanga Sangraha and Ashtanga Hridaya Samhita. Moreover; Sharngadhara, Bhavamishra, and Madhava are the authors of the three Ayurveda's next texts, viz: Sharangadhara Samhita, Bhavaprakasha Samhita and Madava Nidana Samhita."
    },
    {
      question: "What is meant by Vikruti?",
      answer: "Your current imbalance, or vikruti, and your innate constitution, or prakruti, were there when you were conceived. We are unwinding the vikruti (imbalance) in Ayurveda so that you can get back to your prakruti (basic constitution)."
    },
    {
      question: "How do Marma points work?",
      answer: "• Junctions where the physical and energy components of our being converge\n• Body's energy points can be used to heal the body, mind, and spirit.\n• A marma point is a location where two or more types of tissue, such as veins, muscles, ligaments, bones, or joints, connect. It is, for example, the point between the eyebrows.\n• Points of entry to the body's innate healing intelligence\n• 107 marma points are available."
    },
    {
      question: "How is cow ghee consumed in the morning?",
      answer: "Ghee is melted with hot water and then consumed on an empty stomach. You wait to eat until later that day when you are actually hungry."
    },
    {
      question: "Can modern medications be taken with Ayurveda remedies?",
      answer: "Ayurveda medications can typically be administered with allopathic medications as long as the attending physician has not advised differently. Additionally, many chronic and degenerative disorders are treated using Ayurvedic medicines in addition to allopathic ones. Consuming straightforward herbal Ayurvedic preparations is hence safe. But it's always a good idea to see your doctor before taking any drugs."
    },
    {
      question: "Is there an Ayurveda cancer treatment?",
      answer: "Cancer can be treated with Ayurveda, and the two can complement one other extremely well. What your doctor advises will depend on the type, stage, and aggressiveness of the cancer.\nYour ayurvedic doctor might recommend a healthy diet, way of living, and herbs to help you acquire and maintain strength prior to starting cancer treatment.\nAyurveda helps reduce the negative effects and symptoms of cancer therapy while maintaining a healthy digestive system. During chemotherapy and radiation treatment, herbal juices are an option. Medicated oils and herbs can be utilised in between treatments to assist and improve cancer treatment protocols. breathing techniques, yoga nidra once more, and meditation\nprovide immense support during this phase.\nPost Cancer Treatment – Cleanse the body of the toxins after cancer treatment, strongly tonify and build healthy tissues, rebuild and strengthen Immunity. The usage of herbs, foods, body therapies, and yoga practices to prevent another occurrence."
    },
    {
      question: "Can chemotherapy be taken with Ayurvedic medicine?",
      answer: "Ayurveda can assist in reducing the negative effects and symptoms of cancer therapies and in maintaining a healthy digestive fire. During chemotherapy and radiation, herbal teas, juices, and digestive seasonings on food can all be used. Cilantro leaf juice and Manjishtha tea decoction are particularly beneficial. Medicated oils and herbs can be utilised in between treatments to assist and improve cancer treatment protocols. Again, during this stage, breathing techniques, yoga nidra, and meditation are of utmost assistance. Ayurveda offers assistance in a special way so that the body can relax and allow for profound healing."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f2] py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 mb-4 font-serif">
          Frequently Asked Questions
        </h1>
        <div className="w-16 h-1 bg-teal-300 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about Ayurveda, treatments, and our center
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-sm border border-b-green-900 overflow-hidden transition-all duration-300 ${
                hoveredIndex === index ? 'shadow-md border-teal-100' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                className={`w-full flex justify-between items-center p-5 text-left transition-colors ${
                  openIndex === index 
                    ? 'bg-teal-50 text-teal-800' 
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="font-medium text-lg pr-4">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  openIndex === index 
                    ? 'bg-teal-500 text-white rotate-180' 
                    : 'bg-slate-100 text-slate-500 hover:bg-teal-100 hover:text-teal-600'
                }`}>
                  <span className="font-bold text-lg">↓</span>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="p-5 bg-white border-t border-slate-100">
                  <p className="text-slate-600 whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Decorative elements */}
      <div className="fixed top-20 right-10 w-48 h-48 rounded-full bg-teal-100 blur-3xl opacity-40 -z-10"></div>
      <div className="fixed bottom-20 left-10 w-64 h-64 rounded-full bg-amber-100 blur-3xl opacity-30 -z-10"></div>
    </div>
  );
}

export default FAQ;