import React from 'react';
import { ShieldCheck, Globe, Clock, HeartHandshake } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8 text-brand-primary" />,
      title: "Global Destinations",
      description: "Access to over 500+ exclusive locations and hidden gems around the world."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: "Safe & Secure",
      description: "We prioritize your safety with verified partners and 24/7 on-trip support."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-brand-primary" />,
      title: "Personalized Care",
      description: "Every itinerary is tailored to your unique preferences and travel style."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-primary" />,
      title: "Instant Booking",
      description: "Seamless booking process powered by modern technology and AI assistance."
    }
  ];

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2">Why Choose Ezora</h2>
          <h3 className="text-4xl font-serif font-bold text-gray-900">Redefining Luxury Travel</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;