import React, { useState, useEffect } from 'react';
import { Menu, X, Plane, Sparkles } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onOpenPlanner: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onOpenPlanner }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', value: ViewState.HOME },
    { label: 'Tours', value: ViewState.TOURS },
    { label: 'About', value: ViewState.ABOUT },
    { label: 'Contact', value: ViewState.CONTACT },
  ];

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-6xl rounded-full bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl py-3' 
            : 'top-0 left-0 w-full bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView(ViewState.HOME)}
          >
            <div className="bg-brand-primary p-2 rounded-lg shadow-sm">
              <Plane className="text-white w-5 h-5" />
            </div>
            <span className={`text-2xl font-serif font-bold transition-colors ${isScrolled ? 'text-brand-dark' : 'text-white'}`}>
              Ezora
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setView(link.value)}
                className={`font-medium text-sm transition-colors hover:text-brand-primary ${
                  currentView === link.value 
                    ? 'text-brand-primary font-bold' 
                    : (isScrolled ? 'text-gray-700' : 'text-gray-200')
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onOpenPlanner}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg ${
                 isScrolled 
                 ? 'bg-brand-primary text-white hover:bg-teal-700' 
                 : 'bg-white text-brand-primary hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Plan with AI
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden fixed inset-x-4 top-24 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-top
          ${isMobileMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
        `}>
          <div className="p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setView(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-gray-800 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="h-px bg-gray-100 my-2"></div>
            <button
              onClick={() => {
                onOpenPlanner();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-brand-primary text-white py-4 rounded-xl w-full font-bold shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              AI Travel Planner
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;