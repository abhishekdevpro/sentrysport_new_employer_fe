import React from 'react';
import { Button } from '../ui/button';

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
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
          <div className='text-center'>
            <h2 className="app-text-h1 text-center !text-blue-900 mb-4">
            Discover the power of our community
          </h2>
          </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="app-light-bg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              data-aos="fade"
            >
              {/* Image Container */}
              <div className="aspect-w-16 aspect-h-9 w-full p-2">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h2 className="app-text-h2  mb-2">
                  {card.title}
                </h2>
                <p className="app-text-p  ">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="mt-12 text-center">
          <Button 
            type="button" 
            size="lg"
          >
            Create Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;