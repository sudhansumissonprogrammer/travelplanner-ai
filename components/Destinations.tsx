import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { Tour } from '../types';

const tours: Tour[] = [
  {
    id: 1,
    title: "Santorini Sunset Dreams",
    location: "Greece",
    price: 1899,
    duration: "7 Days",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=2070&auto=format&fit=crop",
    category: "Romantic"
  },
  {
    id: 2,
    title: "Kyoto Cultural Immersion",
    location: "Japan",
    price: 2450,
    duration: "10 Days",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    category: "Culture"
  },
  {
    id: 3,
    title: "Bali Tropical Paradise",
    location: "Indonesia",
    price: 1200,
    duration: "6 Days",
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
    category: "Relaxation"
  },
  {
    id: 4,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    price: 3100,
    duration: "8 Days",
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    category: "Adventure"
  },
  {
    id: 5,
    title: "Safari in Serengeti",
    location: "Tanzania",
    price: 4500,
    duration: "9 Days",
    rating: 5.0,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
    category: "Wildlife"
  },
  {
    id: 6,
    title: "Amalfi Coast Escape",
    location: "Italy",
    price: 2800,
    duration: "7 Days",
    rating: 4.7,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2030&auto=format&fit=crop",
    category: "Luxury"
  }
];

const Destinations: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="tours">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2">Popular Tours</h2>
            <h3 className="text-4xl font-serif font-bold text-gray-900">Trending Destinations</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
            View All Tours <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-dark uppercase tracking-wide">
                  {tour.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  ${tour.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{tour.duration}</span>
                  <span className="mx-2">•</span>
                  <MapPin className="w-4 h-4" /> {/* MapPin not imported in this file, adding fallback or import */}
                  <span>{tour.location}</span>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {tour.title}
                </h4>
                
                <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    <span className="font-bold text-gray-900">{tour.rating}</span>
                    <span className="text-gray-400 text-sm">({tour.reviews})</span>
                  </div>
                  <button className="text-brand-primary font-bold text-sm uppercase tracking-wide hover:underline">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold">
            View All Tours
          </button>
        </div>
      </div>
    </section>
  );
};

// Fix for missing MapPin import
import { MapPin } from 'lucide-react';

export default Destinations;