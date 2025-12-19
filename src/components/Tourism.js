function Tourism() {
  const places = [
    {
      id: 1,
      name: "Shaniwar Wada",
      description: "Historic fort palace showcasing Maratha architecture.",
      image: "https://i.pinimg.com/736x/00/20/f4/0020f4e245d76730d68e169947d412b4.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Shaniwar_Wada"
    },
    {
      id: 2,
      name: "Aga Khan Palace",
      description: "Memorial dedicated to Mahatma Gandhi.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pune_Palace.jpg/1200px-Pune_Palace.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Aga_Khan_Palace"
    },
    {
      id: 3,
      name: "Sinhagad Fort",
      description: "Ancient hill fortress with panoramic views.",
      image: "https://rrtravelscabs.com/wp-content/uploads/2023/11/b3.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Sinhagad"
    },
    {
      id: 4,
      name: "Osho Teerth Park",
      description: "Serene meditation garden with bamboo groves.",
      image: "https://punetourism.co.in/images//tourist-places/osho-teerth-park-pune/osho-teerth-park-pune-india-tourism-photo-gallery.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Osho_(Bhagwan_Rajneesh)"
    },
    {
      id: 5,
      name: "Dagdusheth Temple",
      description: "Famous Ganesha temple with gold-plated dome.",
      image: "https://d3k1i85mml78tf.cloudfront.net/Blogs/1714808146892_post_image_5.webp",
      wikipedia: "https://en.wikipedia.org/wiki/Dagadusheth_Halwai_Ganapati_Temple"
    },
    {
      id: 6,
      name: "Kelkar Museum",
      description: "Collection of Indian artifacts and instruments.",
      image: "https://map.sahapedia.org/admin/assets/images/2021091410154793Museums_30_Raja_Dinkar_Kelkar_Museum_banner.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Raja_Dinkar_Kelkar_Museum"
    },
    {
      id: 7,
      name: "Pataleshwar Cave",
      description: "8th-century rock-cut temple dedicated to Lord Shiva.",
      image: "https://sceneloc8.com/wp-content/uploads/2024/03/Pataleshwar-Cave-Temple-5.png",
      wikipedia: "https://en.wikipedia.org/wiki/Pataleshwar_Caves,_Pune"
    },
    {
      id: 8,
      name: "Rajgad Fort",
      description: "Former capital of the Maratha Empire with stunning views.",
      image: "https://www.treksandtrails.org/system/images/000/780/220/665460b6259a3b5cb595bca0e69a667f/banner/Rajgad_Fort_in_Pune__Maharashtra.jpg?1749646818",
      wikipedia: "https://en.wikipedia.org/wiki/Rajgad_Fort"
    },
    {
      id: 9,
      name: "Mulshi Lake",
      description: "Scenic reservoir surrounded by Sahyadri mountains.",
      image: "https://sceneloc8.com/wp-content/uploads/2024/03/Mulshi-Lake-and-Dam-4.png",
      wikipedia: "https://en.wikipedia.org/wiki/Mulshi"
    },
    {
      id: 10,
      name: "Peshwe Park",
      description: "Zoo and recreation area with historical significance.",
      image: "https://punetourism.co.in/images/places-to-visit/headers/peshwe-energy-park-pune-tourism-entry-fee-timings-holidays-reviews-header.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Rajiv_Gandhi_Zoological_Park"
    },
    {
      id: 11,
      name: "Tulshi Baug",
      description: "Historic market for traditional goods and spices.",
      image: "https://map.sahapedia.org/admin/assets/images/2021042212370845Mkt_Tulshibaug_5_Image11.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Tulshibaug"
    },
    {
      id: 12,
      name: "Katraj Snake Park",
      description: "Reptile conservation center with diverse species.",
      image: "https://farm9.staticflickr.com/8058/8175041867_ff2748376f_z.jpg",
      wikipedia: "https://en.wikipedia.org/wiki/Katraj_Snake_Park"
    }
  ];

  const experiences = [
    {
      title: "Cultural Walks",
      description: "Guided heritage tours through old Pune",
      icon: "🚶‍♂️"
    },
    {
      title: "Food Trails",
      description: "Explore Maharashtrian culinary delights",
      icon: "🍛"
    },
    {
      title: "Trekking",
      description: "Sahyadri mountain adventures",
      icon: "⛰️"
    },
    {
      title: "Festivals",
      description: "Ganesh Chaturthi celebrations",
      icon: "🎉"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 text-[17px]">
      {/* Header */}
      <header className="py-10 text-center bg-green-900 text-amber-100">
        <h1 className="text-4xl font-serif font-bold">Discover Pune</h1>
        <p className="mt-3 text-amber-200 max-w-2xl mx-auto">
          Explore the cultural capital of Maharashtra through its historic forts, vibrant markets, and natural wonders
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-serif text-green-900 mb-4">" The Oxford of the East "</h2>
          <p className="text-amber-800 max-w-3xl mx-auto leading-relaxed">
            Pune seamlessly blends its rich Maratha heritage with modern urban energy. Founded in the 8th century, 
            this city has been a center of education, culture, and history for centuries. From ancient cave temples 
            to British-era architecture, Pune offers diverse experiences for every traveler.
          </p>
        </section>

        {/* Top Attractions */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-green-900 mb-6 text-center">Must-Visit Places</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.slice(0, 8).map((place) => (
              <div key={place.id} className="bg-white rounded-lg shadow overflow-hidden border-2 border-white hover:border-[#524e90] transition-all duration-300">
                <div className="h-48">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-serif text-green-900 mb-1">{place.name}</h3>
                  <p className="text-amber-700 mb-3">{place.description}</p>
                  <a 
                    href={place.wikipedia} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Learn more on Wikipedia
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experiences Section */}
        <section className="mb-16 bg-green-50 p-8 rounded-lg">
          <h2 className="text-3xl font-serif text-green-900 mb-8 text-center">Pune Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm border-2 border-white hover:border-[#8a3f3f] transition-all duration-300">
                <div className="text-4xl mb-3">{exp.icon}</div>
                <h3 className="text-xl font-serif text-green-900 mb-2">{exp.title}</h3>
                <p className="text-amber-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* More Attractions */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-green-900 mb-6 text-center">More to Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.slice(8).map((place) => (
              <div key={place.id} className="bg-white rounded-lg shadow overflow-hidden border-2 border-white hover:border-[#4f7a73] transition-all duration-300">
                <div className="h-48">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-serif text-green-900 mb-1">{place.name}</h3>
                  <p className="text-amber-700 mb-3">{place.description}</p>
                  <a 
                    href={place.wikipedia} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Learn more on Wikipedia
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Tips */}
        <section className="bg-green-100 p-8 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-serif text-green-900 mb-4">Best Time to Visit</h3>
              <p className="text-amber-800 mb-4">
                October to February offers pleasant weather with temperatures between 10-28°C, 
                perfect for sightseeing and outdoor activities.
              </p>
              <p className="text-amber-800">
                Monsoon season (June-September) transforms the surrounding hills into lush green 
                landscapes, ideal for nature lovers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-green-900 mb-4">Getting Around</h3>
              <p className="text-amber-800 mb-4">
                Pune has an extensive network of buses, auto-rickshaws, and app-based taxis. 
                The metro system is expanding to connect major attractions.
              </p>
              <p className="text-amber-800">
                For historical areas, walking tours provide the best experience to appreciate 
                the architecture and local culture.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Tourism;