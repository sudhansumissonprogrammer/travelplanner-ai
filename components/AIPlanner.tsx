import React, { useState } from 'react';
import { 
  X, Sparkles, Send, Loader2, Map as MapIcon, Calendar, 
  DollarSign, Heart, Users, Plane, Hotel, Coffee, Sun, Moon,
  ShieldAlert, Umbrella, Info, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { generateItinerary } from '../services/gemini';
import { PlannerFormData, ItineraryResult } from '../types';

interface AIPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIPlanner: React.FC<AIPlannerProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Loading, 3: Result
  const [formData, setFormData] = useState<PlannerFormData>({
    startCity: '',
    destination: '',
    days: 5,
    travelers: 2,
    budget: '',
    travelStyle: 'Moderate',
    interests: ''
  });
  const [result, setResult] = useState<ItineraryResult | null>(null);
  const [activeDay, setActiveDay] = useState(1);

  const handleInputChange = (field: keyof PlannerFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setStep(2);
    try {
      const itinerary = await generateItinerary(formData);
      setResult(itinerary);
      setStep(3);
    } catch (error) {
      console.error(error);
      setStep(1);
      // In a real app, show error toast
    }
  };

  const handleReset = () => {
    setResult(null);
    setStep(1);
    setActiveDay(1);
    setFormData({
      startCity: '',
      destination: '',
      days: 5,
      travelers: 2,
      budget: '',
      travelStyle: 'Moderate',
      interests: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full">
        
        {/* Left Side: Visual Brand */}
        <div className="hidden lg:flex w-1/4 bg-brand-primary text-white p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-6 h-6" />
              <span className="font-bold text-lg tracking-wide">Ezora AI</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><MapIcon className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold">Smart Routing</h4>
                  <p className="text-teal-100 text-sm">Distance-optimized daily plans.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold">Budget Control</h4>
                  <p className="text-teal-100 text-sm">Detailed cost breakdowns.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-lg"><ShieldAlert className="w-5 h-5" /></div>
                <div>
                  <h4 className="font-bold">Safety First</h4>
                  <p className="text-teal-100 text-sm">Local tips and emergency info.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 opacity-80 text-xs">
            <p>Powered by Gemini 2.5 Flash</p>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-3/4 flex flex-col h-full bg-gray-50">
          
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              {step === 3 && (
                <button onClick={handleReset} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h3 className="text-xl font-bold text-gray-800">
                {step === 1 ? "Plan Your Journey" : step === 2 ? "Thinking..." : "Your Itinerary"}
              </h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            
            {/* Loading State */}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-brand-light rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-brand-primary rounded-full animate-spin absolute top-0 border-t-transparent"></div>
                  <Plane className="w-8 h-8 text-brand-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">Designing your trip to {formData.destination}</h3>
                  <p className="text-gray-500">Calculating best routes, checking hotels, and optimizing budget...</p>
                </div>
              </div>
            )}

            {/* Form State */}
            {step === 1 && (
              <div className="max-w-3xl mx-auto space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Start City</label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.startCity}
                        onChange={(e) => handleInputChange('startCity', e.target.value)}
                        placeholder="e.g., New York"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Destination</label>
                    <div className="relative">
                      <MapIcon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => handleInputChange('destination', e.target.value)}
                        placeholder="e.g., Paris, France"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Duration (Days)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={formData.days}
                        onChange={(e) => handleInputChange('days', parseInt(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Travelers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        value={formData.travelers}
                        onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Budget (Total)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder="e.g. 2000 USD"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Travel Style</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Budget', 'Moderate', 'Luxury'].map((style) => (
                      <button
                        key={style}
                        onClick={() => handleInputChange('travelStyle', style)}
                        className={`py-3 px-4 rounded-xl border font-medium transition-all ${
                          formData.travelStyle === style
                            ? 'bg-brand-primary text-white border-brand-primary'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-brand-primary/50'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Interests & Preferences</label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="e.g., Food tours, hiking, historical sites, museums, avoiding crowds..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.destination || !formData.startCity || !formData.budget}
                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                      !formData.destination || !formData.startCity || !formData.budget
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-brand-primary hover:bg-teal-700 hover:scale-[1.01]'
                    }`}
                  >
                    Generate Dream Itinerary <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Result State */}
            {step === 3 && result && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Trip Overview Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{result.tripTitle}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{result.summary}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 text-blue-800 font-bold mb-1">
                        <DollarSign className="w-4 h-4" /> Estimated Cost
                      </div>
                      <div className="text-2xl font-bold text-blue-900">{result.budget.totalEstimate}</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                       <div className="flex items-center gap-2 text-green-800 font-bold mb-1">
                        <Plane className="w-4 h-4" /> Transport
                      </div>
                      <div className="text-sm font-medium text-green-900">{result.transport.mode}: {result.transport.options}</div>
                      <div className="text-xs text-green-700 mt-1">{result.transport.duration} • {result.transport.approxCost}</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-xl">
                       <div className="flex items-center gap-2 text-amber-800 font-bold mb-1">
                        <Umbrella className="w-4 h-4" /> Weather
                      </div>
                      <div className="text-sm font-medium text-amber-900">{result.practicalTips.weather}</div>
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  
                  {/* Sidebar - Days */}
                  <div className="lg:col-span-1 space-y-2">
                    <h3 className="font-bold text-gray-700 mb-3 uppercase tracking-wider text-sm">Schedule</h3>
                    {result.days.map((day) => (
                      <button
                        key={day.day}
                        onClick={() => setActiveDay(day.day)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                          activeDay === day.day
                            ? 'bg-brand-primary text-white shadow-md'
                            : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-100'
                        }`}
                      >
                        <span className="font-bold">Day {day.day}</span>
                        <span className={`text-xs ${activeDay === day.day ? 'text-teal-100' : 'text-gray-400'}`}>
                          {day.theme}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Main Content - Timeline */}
                  <div className="lg:col-span-3">
                    {result.days.filter(d => d.day === activeDay).map((day) => (
                      <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-brand-light p-4 border-b border-brand-primary/10 flex justify-between items-center">
                          <h4 className="font-bold text-brand-dark text-lg">Day {day.day}: {day.theme}</h4>
                        </div>
                        
                        <div className="p-6 space-y-8">
                          {/* Morning */}
                          <div className="relative pl-8 border-l-2 border-orange-100">
                            <div className="absolute -left-[9px] top-0 bg-orange-100 p-1 rounded-full">
                              <Coffee className="w-4 h-4 text-orange-600" />
                            </div>
                            <h5 className="font-bold text-gray-800 mb-3">Morning</h5>
                            <ul className="space-y-4">
                              {day.morning.map((item, i) => (
                                <li key={i} className="bg-gray-50 p-3 rounded-lg flex flex-col md:flex-row md:items-center gap-2 text-sm">
                                  <span className="font-bold text-brand-primary min-w-[80px]">{item.time}</span>
                                  <span className="flex-1 font-medium text-gray-800">{item.activity}</span>
                                  <span className="text-gray-400 text-xs flex items-center gap-1"><MapIcon className="w-3 h-3" /> {item.location}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Afternoon */}
                          <div className="relative pl-8 border-l-2 border-blue-100">
                            <div className="absolute -left-[9px] top-0 bg-blue-100 p-1 rounded-full">
                              <Sun className="w-4 h-4 text-blue-600" />
                            </div>
                            <h5 className="font-bold text-gray-800 mb-3">Afternoon</h5>
                            <ul className="space-y-4">
                              {day.afternoon.map((item, i) => (
                                <li key={i} className="bg-gray-50 p-3 rounded-lg flex flex-col md:flex-row md:items-center gap-2 text-sm">
                                  <span className="font-bold text-brand-primary min-w-[80px]">{item.time}</span>
                                  <span className="flex-1 font-medium text-gray-800">{item.activity}</span>
                                  <span className="text-gray-400 text-xs flex items-center gap-1"><MapIcon className="w-3 h-3" /> {item.location}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Evening */}
                          <div className="relative pl-8 border-l-2 border-indigo-100">
                            <div className="absolute -left-[9px] top-0 bg-indigo-100 p-1 rounded-full">
                              <Moon className="w-4 h-4 text-indigo-600" />
                            </div>
                            <h5 className="font-bold text-gray-800 mb-3">Evening</h5>
                            <ul className="space-y-4">
                              {day.evening.map((item, i) => (
                                <li key={i} className="bg-gray-50 p-3 rounded-lg flex flex-col md:flex-row md:items-center gap-2 text-sm">
                                  <span className="font-bold text-brand-primary min-w-[80px]">{item.time}</span>
                                  <span className="flex-1 font-medium text-gray-800">{item.activity}</span>
                                  <span className="text-gray-400 text-xs flex items-center gap-1"><MapIcon className="w-3 h-3" /> {item.location}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Local Tips for the Day */}
                          <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl flex gap-3">
                            <Info className="w-5 h-5 text-brand-primary shrink-0" />
                            <p className="text-sm text-teal-800 italic">"{day.localTips}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodations & Budget - Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Hotels */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-brand-primary" /> Recommended Stays
                    </h3>
                    <div className="space-y-4">
                      {result.accommodation.map((place, i) => (
                        <div key={i} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-gray-900">{place.name}</h4>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{place.type}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{place.whyRecommended}</p>
                          <p className="text-sm font-bold text-brand-primary">{place.approxCost} / night</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-brand-primary" /> Estimated Budget Breakdown
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Accommodation</span>
                        <span className="font-bold text-gray-900">{result.budget.stay}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Travel (Flights/Trains)</span>
                        <span className="font-bold text-gray-900">{result.budget.travel}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Food & Dining</span>
                        <span className="font-bold text-gray-900">{result.budget.food}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 text-sm">Activities & Sightseeing</span>
                        <span className="font-bold text-gray-900">{result.budget.sightseeing}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                        <span className="text-yellow-800 text-sm">Emergency Buffer</span>
                        <span className="font-bold text-yellow-900">{result.budget.buffer}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Tips */}
                <div className="bg-brand-dark text-white rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="font-bold mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Safety</h4>
                    <p className="text-sm text-gray-300">{result.practicalTips.safety}</p>
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Packing Tips</h4>
                     <p className="text-sm text-gray-300">{result.practicalTips.packing}</p>
                  </div>
                </div>

                <div className="flex justify-center pt-8 pb-4">
                  <button onClick={handleReset} className="text-brand-primary font-bold hover:underline">
                    Plan Another Trip
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;