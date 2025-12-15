import React from 'react';
import { Search, MapPin } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartPlanning }) => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="Switzerland Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white mt-16">
        <span className="uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-4 block animate-fade-in-up">
          Discover the Extraordinary
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
          Travel Beyond <br /> <span className="text-brand-primary italic">Boundaries</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience curated journeys to the world's most breathtaking destinations. 
          Let us craft your perfect escape with precision and passion.
        </p>

        {/* Search Bar / Call to Action */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 flex flex-col md:flex-row items-center gap-2 shadow-2xl">
            <div className="flex-1 w-full flex items-center px-6 py-4 md:border-r border-white/20">
                <MapPin className="text-white/70 w-5 h-5 mr-3" />
                <input 
                    type="text" 
                    placeholder="Where do you want to go?" 
                    className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full"
                />
            </div>
            <button 
                onClick={onStartPlanning}
                className="w-full md:w-auto bg-brand-primary hover:bg-teal-700 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2"
            >
                <Search className="w-5 h-5" />
                Explore Now
            </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm font-medium opacity-80">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                <span>Curated Tours</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                <span>AI Itineraries</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                <span>24/7 Support</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;