import React from 'react';


function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Angela Kopic",
            from: "Dublin, Ireland",
            text: "Studying Ayurveda with Dr. Yogita and Dr. Manoj was a deeply enriching experience. I learned how to understand health holistically and bring balance to life through Ayurveda. The body-mind-spirit connection is now clearer to me, and I’m growing on a deeper level. The course gave me a strong foundation and practical skills. Their passion for teaching was evident in every session. Pune is a vibrant city with beautiful temples, markets, and the serene Parvati Hill close to the Bhagirathi Centre.",
            imageClass: "angela",
            colors: {
                textBody: "text-amber-900",
                textName: "text-amber-800"
            }
        },
        {
            id: 2,
            name: "Cecilia Frigerio",
            from: "Barcelona, Spain",
            text: "As a holistic therapist, I felt called to study Ayurveda, and a friend recommended Bhagirathi. I'm so glad I came! Dr. Yogita and Dr. Manoj are amazing teachers who were always supportive and responsive to my needs. I received a personalized program that included massage techniques and panchakarma treatments. Theory and practice were well balanced. There’s even accommodation for students at the centre. I’m so grateful for this experience.",
            imageClass: "cecilia",
            colors: {
                textBody: "text-rose-900",
                textName: "text-rose-800"
            }
        },
        {
            id: 3,
            name: "Yuri Takeuchi San",
            from: "Japan",
            text: "I studied at Bhagirathi Ayurveda Centre in Pune with Dr. Yogita and Dr. Manoj, who are both very kind and calm. The training I received allowed me to open my own Ayurveda shop after returning to Japan. Pune is a wonderful city where tradition meets modern life. I look forward to learning more in the future at the same institute.",
            imageClass: "yuri",
            colors: {
                textBody: "text-emerald-900",
                textName: "text-emerald-800"
            }
        },
        {
            id: 4,
            name: "Cecilia Pancali",
            from: "Italy",
            text: "I learned Ayurvedic massage in the most beautiful way—with professionalism, love, and smiles. Thanks to Bhagirathi School, I now share the same love through my work. I discovered the true essence of Ayurveda from authentic Indian doctors, and it transformed my life. See you next year!",
            imageClass: "cecilia-p",
            colors: {
                textBody: "text-violet-900",
                textName: "text-violet-800"
            }
        },
        {
            id: 5,
            name: "Ettore Messinas",
            from: "Italy",
            text: "After years of exploring Ayurveda across India, I finally found Bhagirathi—truly a family school. The teachers are excellent, from top Ayurvedic universities. Pune is perfect, both for tourism and spiritual exploration, being the city of Iyengar and Osho. The combination was ideal, and I’ve even started collaborating with them on yoga and Ayurveda. Many years of beautiful work ahead. Namaskar.",
            imageClass: "ettore",
            colors: {
                textBody: "text-cyan-900",
                textName: "text-cyan-800"
            }
        },
        {
            id: 6,
            name: "Maria Peluzzi",
            from: "Italy",
            text: "I’ve done three courses in three years at Bhagirathi Ayurveda Centre because I love their teaching style. Dr. Yogita and Dr. Manoj are incredibly professional and passionate about Ayurveda. The practical sessions were extremely satisfying. Pune keeps evolving, and I enjoy the food and friendly people every time I visit.",
            imageClass: "maria",
            colors: {
                textBody: "text-orange-900",
                textName: "text-orange-800"
            }
        },
        {
            id: 7,
            name: "Chiharu",
            from: "Japan",
            text: "Studying with Dr. Yogita is a chance to receive genuine Ayurvedic training from a gifted teacher. Her warmth, humor, and generosity made every lesson enriching. Wisdom seems to flow naturally from her. We, her students, are truly lucky to have her share this ancient knowledge with us.",
            imageClass: "chiharu",
            colors: {
                textBody: "text-fuchsia-900",
                textName: "text-fuchsia-800"
            }
        },
        {
            id: 8,
            name: "Dorota Klaudia",
            from: "Poland",
            text: "Bhagirathi Centre is truly full of life, just like Ayurveda. The doctors are friendly, professional, and excellent communicators. Lessons were clearly explained and lovingly taught. During the practice sessions, I learned new therapies and became confident in applying them. Pune is a large, pleasant city with great food and efficient transport. I really like India.",
            imageClass: "dorota",
            colors: {
                textBody: "text-sky-900",
                textName: "text-sky-800"
            }
        },
        {
            id: 9,
            name: "Natalia Tageva",
            from: "Russia",
            text: "Dr. Yogita helped guide me back to health and inspired me in my work as a doctor and nutritionist. Her deep knowledge and passion for Ayurveda are reflected in every class. This course has helped me not just personally, but also in my professional life, enabling me to share Ayurveda with my own clients.",
            imageClass: "natalia",
            colors: {
                textBody: "text-lime-900",
                textName: "text-lime-800"
            }
        },
        {
            id: 10,
            name: "Sayuri Honda",
            from: "Japan",
            text: "Dr. Yogita has a unique gift for making ancient Ayurvedic wisdom feel accessible and meaningful. I believe Ayurveda chose her! Her compassion for her students, patients, and everyone around her is heartwarming. She truly cares and that makes her teaching unforgettable.",
            imageClass: "sayuri",
            colors: {
                textBody: "text-amber-900",
                textName: "text-amber-800"
            }
        },
        {
            id: 11,
            name: "Daniela Erhana",
            from: "Romania",
            text: "I’m grateful for the training I received at Bhagirathi Ayurveda Centre. The doctors are not only knowledgeable but also very supportive and flexible. Theory and practice were perfectly balanced, and I gained the confidence to use my skills back in Romania. I also enjoyed the food, calm atmosphere, and sightseeing in Pune and Ellora Caves.",
            imageClass: "daniela",
            colors: {
                textBody: "text-rose-900",
                textName: "text-rose-800"
            }
        },
        {
            id: 12,
            name: "Sebastian",
            from: "Dublin, Ireland",
            text: "As someone passionate about health, this course gave me immense value. Dr. Yogita’s teachings were inspiring and practical. Dr. Manoj and the team were supportive, and the course helped me find personal balance. Now, I’m sharing Ayurveda with others. It’s a profound science taught with authenticity and love.",
            imageClass: "sebastian",
            colors: {
                textBody: "text-emerald-900",
                textName: "text-emerald-800"
            }
        },
        {
            id: 13,
            name: "Candida Romoli",
            from: "Italy",
            text: "I feel fortunate to have trained at Bhagirathi Ayurveda Centre. The doctors were not only professional but deeply knowledgeable. The practice sessions gave me hands-on experience, and Pune's temples, markets, and cuisine made my stay even more enjoyable. I plan to return soon!",
            imageClass: "candida",
            colors: {
                textBody: "text-violet-900",
                textName: "text-violet-800"
            }
        },
        {
            id: 14,
            name: "Saskia Haeger",
            from: "Germany",
            text: "I came to Bhagirathi to learn traditional Indian baby massage for my work in Germany. Dr. Yogita and Dr. Manoj were incredibly patient and structured. After learning the theory, I had hands-on practice which made a big difference. Pune is full of beautiful places, great food, and shopping spots. A fantastic experience!",
            imageClass: "saskia",
            colors: {
                textBody: "text-cyan-900",
                textName: "text-cyan-800"
            }
        },
        {
            id: 15,
            name: "Giulia",
            from: "Italy",
            text: "Dr. Yogita’s passion is infectious. Her humorous, caring approach made the practice sessions deeply engaging. I gained confidence in performing Ayurvedic therapies. The food was lovely and the people welcoming. I hope to return soon!",
            imageClass: "giulia",
            colors: {
                textBody: "text-orange-900",
                textName: "text-orange-800"
            }
        },
        {
            id: 16,
            name: "Renate Bartel",
            from: "Austria",
            text: "Dr. Yogita is truly generous with her knowledge and experience. She wants to help people, and you can feel it. The doctors are knowledgeable and professional, and Pune is a clean, safe, and spiritually rich city. I highly recommend this centre to everyone!",
            imageClass: "renate",
            colors: {
                textBody: "text-fuchsia-900",
                textName: "text-fuchsia-800"
            }
        },
        {
            id: 17,
            name: "Sabrina Ignesti",
            from: "Italy",
            text: "The doctors at Bhagirathi Ayurveda Centre are professional, kind, and explain things in simple terms—great for international students. I was especially happy with the practical sessions. Pune is full of life and color, and the food is just perfect for my Kapha constitution!",
            imageClass: "sabrina",
            colors: {
                textBody: "text-sky-900",
                textName: "text-sky-800"
            }
        },
        {
            id: 18,
            name: "Marcela",
            from: "",
            text: "I loved this course! Dr. Yogita’s teaching is so relevant to today’s world, yet deeply rooted in tradition. She’s kind, patient, and passionate. I learned how Ayurveda can help specific organs and health issues, and how to be gentle and mindful with my body. Highly recommended!",
            imageClass: "marcela",
            colors: {
                textBody: "text-lime-900",
                textName: "text-lime-800"
            }
        },
        {
            id: 19,
            name: "Sonia Ladatto",
            from: "Italy",
            text: "This course was a life-changing experience. Dr. Yogita's teaching style is clear, engaging, and profound. I was completely immersed in every lecture and felt truly cared for. I’m thankful for her wisdom and kindness, and I look forward to returning for more.",
            imageClass: "sonia",
            colors: {
                textBody: "text-amber-900",
                textName: "text-amber-800"
            }
        },
        {
            id: 20,
            name: "Monica Mori",
            from: "Pisa, Italy",
            text: "I met Bhagirathi in 2014 and graduated in Ayurvedic massage and panchakarma. It was a fantastic experience! Dr. Yogita and Dr. Manoj played a crucial role in my professional journey. Ayurveda became my career after returning to Italy. I’m excited to return and keep growing. Thank you!",
            imageClass: "monica",
            colors: {
                textBody: "text-rose-900",
                textName: "text-rose-800"
            }
        },
        {
            id: 21,
            name: "Irene",
            from: "Italy",
            text: "As a student, I appreciated learning Ayurveda that could be applied in Western society, while staying true to its roots. The classes were very interactive and informative. Thank you, Dr. Yogita!",
            imageClass: "irene",
            colors: {
                textBody: "text-emerald-900",
                textName: "text-emerald-800"
            }
        },
        {
            id: 22,
            name: "Sarah Kothari",
            from: "Oxford, England",
            text: "Dr. Yogita and Dr. Manoj are amazing teachers with deep knowledge. I felt confident through their practical sessions. Pune felt very safe, the food was delicious, and I personally recommend this centre to anyone wanting genuine Ayurvedic training.",
            imageClass: "sarah",
            colors: {
                textBody: "text-violet-900",
                textName: "text-violet-800"
            }
        },
        {
            id: 23,
            name: "Natalia Tageva",
            from: "Russia",
            text: "Dr. Yogita changed my life. She helped restore my health and supported my work as an integrative doctor. Her depth of knowledge and passion for Ayurveda shines through. Pune is filled with temples and kind people. I love this city despite its differences from my home.",
            imageClass: "natalia2",
            colors: {
                textBody: "text-cyan-900",
                textName: "text-cyan-800"
            }
        },
        {
            id: 24,
            name: "Vanessa Sabatini",
            from: "Italy",
            text: "Bhagirathi Ayurveda is a professional and heart-centered school. The lessons were clear and lovingly taught. Practice sessions gave me confidence, and Pune’s vibrant atmosphere, tasty food, and spiritual energy made it a memorable learning journey.",
            imageClass: "vanessa",
            colors: {
                textBody: "text-orange-900",
                textName: "text-orange-800"
            }
        },
        {
            id: 25,
            name: "Claudia Bartoli",
            from: "Italy",
            text: "During spring, Bhagirathi Ayurveda kept me inspired and aligned with well-being. Communicating with Dr. Yogita was always easy and uplifting. I’m excited for future projects and grateful for the lasting impact of the practices I’ve learned here.",
            imageClass: "claudia",
            colors: {
                textBody: "text-fuchsia-900",
                textName: "text-fuchsia-800"
            }
        },
        {
            id: 26,
            name: "Elena Sanchez",
            from: "Caracas, Venezuela",
            text: "I found Bhagirathi in 2011 through the internet, and it was one of the best decisions I made. The daily classes, the personal attention, and the chance to be part of their family made it unforgettable. Making herbal oils, sharing meals—it was all so enriching. Ayurveda is a lifestyle and Bhagirathi guided me on this path.",
            imageClass: "elena",
            colors: {
                textBody: "text-sky-900",
                textName: "text-sky-800"
            }
        },
        {
            id: 27,
            name: "Nicola Messinas",
            from: "Italy",
            text: "The staff at Bhagirathi Ayurveda Centre share knowledge from the heart. The practice sessions helped me gain real confidence. Pune has lovely places, friendly people, and makes you feel at home. Thank you!",
            imageClass: "nicola",
            colors: {
                textBody: "text-lime-900",
                textName: "text-lime-800"
            }
        },
        {
            id: 28,
            name: "Mai Fujii",
            from: "Hawai",
            text: "Thank you for taking care of my health and hosting me at the guest house. The Panchakarma treatment made me healthier than ever. Dr. Yogita put so much care into my treatment and meals. I’d love to come back for Ganesha festival and learn Ayurvedic cooking!",
            imageClass: "mai",
            colors: {
                textBody: "text-amber-900",
                textName: "text-amber-800"
            }
        },
        {
            id: 29,
            name: "Heena Khan",
            from: "Germany",
            text: "I found Bhagirathi Ayurveda through Google and was very happy with my course. Dr. Yogita is so dedicated, especially during the Ayurveda cooking sessions. Everything was well taught and practical. I’ll definitely revisit!",
            imageClass: "heena",
            colors: {
                textBody: "text-rose-900",
                textName: "text-rose-800"
            }
        }
    ];

    // // Helper function to get initials for fallback
    // const getInitials = (name) => {
    //     return name.split(' ')
    //         .map(part => part[0])
    //         .join('')
    //         .toUpperCase();
    // };

    return (
        <div className="bg-white ">
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
                TESTIMONIALS
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-600/30 via-amber-800/50 to-amber-600/30 mt-1"></span>
              </span>
            </h1>
          </div>
        </div>
      </div>

            <div className="max-w-7xl mx-auto py-15">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white">
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id}
                            className={`bg-[#f8f5f2] p-7 shadow-xl border-3 border-[#e8e3dc] hover:border-[#8a6e4b] transition-all duration-300 hover:scale-[1.02]`}
                        >
                            <div className="testimonial-img-container">
                                <div className={`testimonial-img ${testimonial.imageClass}`}>
                                </div>
                            </div>
                            <p className={`${testimonial.colors.textBody} italic mb-6 text-lg bg-white/30 p-4 rounded-xl`}>
                                "{testimonial.text}"
                            </p>
                            <p className={`${testimonial.colors.textName} font-semibold text-center`}>
                                {testimonial.name} {testimonial.from && `from ${testimonial.from}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Testimonials;