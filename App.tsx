import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import AIPlanner from './components/AIPlanner';
import Footer from './components/Footer';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.TOURS:
        // In a real app, this would be a full page list. For single page landing style, we scroll or show just the component.
        // For this clone, we keep the main layout but could auto-scroll.
        return (
          <>
            <div className="pt-24 pb-12 bg-gray-50 text-center">
              <h1 className="text-4xl font-serif font-bold text-gray-900">Our Exclusive Tours</h1>
              <p className="text-gray-600 mt-2">Explore the world with our hand-picked packages</p>
            </div>
            <Destinations />
          </>
        );
      case ViewState.ABOUT:
         return (
             <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                 <h1 className="text-4xl font-serif font-bold mb-6">About Ezora</h1>
                 <p className="max-w-2xl mx-auto text-gray-600 leading-loose">
                     Ezora Tours was born from a passion for discovery. We believe that travel is more than just moving from place to place; it's about the transformation that happens along the way. Our team of expert travelers and AI specialists work together to create seamless, personalized, and unforgettable experiences for every client.
                 </p>
                 <Features />
             </div>
         );
      case ViewState.CONTACT:
          return (
              <div className="pt-32 pb-20 container mx-auto px-6 flex flex-col items-center">
                  <h1 className="text-4xl font-serif font-bold mb-8">Contact Us</h1>
                  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                              <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none"></textarea>
                          </div>
                          <button className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors">
                              Send Message
                          </button>
                      </form>
                  </div>
              </div>
          );
      case ViewState.HOME:
      default:
        return (
          <>
            <Hero onStartPlanning={() => setIsPlannerOpen(true)} />
            <Features />
            <Destinations />
            
            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover" alt="Beach" />
                    <div className="absolute inset-0 bg-brand-dark/60"></div>
                </div>
                <div className="relative container mx-auto px-6 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Start Your Adventure?</h2>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Let our AI assistant build a custom itinerary just for you in seconds.
                    </p>
                    <button 
                        onClick={() => setIsPlannerOpen(true)}
                        className="bg-white text-brand-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Plan My Trip
                    </button>
                </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-primary selection:text-white">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        onOpenPlanner={() => setIsPlannerOpen(true)}
      />
      
      <main>
        {renderContent()}
      </main>

      <Footer />
      
      <AIPlanner 
        isOpen={isPlannerOpen} 
        onClose={() => setIsPlannerOpen(false)} 
      />
    </div>
  );
}

export default App;