import React from 'react';
import { 
  Camera, 
  UserCheck, 
  Eye, 
  Radio, 
  Megaphone, 
  Theater, 
  Briefcase, 
  Plane 
} from 'lucide-react';

const CategorySection = () => {
  const categories = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Physical Security"
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Security Management"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Surveillance and Monitoring"
    },
    {
      icon: <Radio className="h-8 w-8" />,
      title: "Emergency and Incident Response"
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Security Training and Awareness"
    },
    {
      icon: <Theater className="h-8 w-8" />,
      title: "Intelligence and Threat Analysis"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Security Sales and Business Development"
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Maritime and Aviation Security"
    }
  ];

  return (
    <section className=" ">
      <div className="max-w-7xl mx-auto px-2 ">
        {/* Header */}
        <h2 className="app-text-h1 text-center mb-4">
          Spot top-quality candidates across all key functions,
          <br className="hidden sm:block" /> 
          with AI effortlessly filtering the best for you
        </h2>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="app-light-bg border border-gray-100 rounded-xl p-6
                         hover:shadow-lg transition-all duration-300
                         transform hover:-translate-y-1 group
                         flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="mb-4 text-blue-900 group-hover:text-blue-700 
                            transition-colors duration-300">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="app-text-h3
                           group-hover:text-blue-700 transition-colors duration-300
                           break-words">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;