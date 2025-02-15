import React from 'react';

const PeopleSection = () => {
  const cards = [
    {
      image: "img/people-1.webp",
      title: "Canada's one of the most trusted Employment site",
      description: "Reach candidates where they actively search for opportunities"
    },
    {
      image: "img/people-2.webp",
      title: "Pick from a pool of AI-verified skilled professionals",
      description: "Explore our large and inclusive pool of top talent to drive your business forward"
    },
    {
      image: "img/people-3.webp",
      title: "Made by Experts on latest Technologies",
      description: "Created by top security experts with the most advanced AI technologies"
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              data-aos="fade"
            >
              {/* Image Container */}
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h2 className="text-blue-900 text-xl font-semibold mb-4 min-h-[60px]">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-base">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="mt-12 text-center">
          <button 
            type="button" 
            className="bg-blue-900 text-white py-3 px-8 rounded-lg font-medium
                     transition-all duration-300 hover:bg-blue-800 
                     transform hover:scale-105 focus:outline-none focus:ring-2 
                     focus:ring-blue-900 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;