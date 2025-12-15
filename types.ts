export interface Tour {
  id: number;
  title: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

export interface Activity {
  time: string;
  activity: string;
  location: string;
}

export interface DailyPlan {
  day: number;
  theme: string;
  morning: Activity[];
  afternoon: Activity[];
  evening: Activity[];
  localTips: string;
}

export interface Accommodation {
  name: string;
  type: string;
  approxCost: string;
  whyRecommended: string;
}

export interface Transport {
  mode: string;
  options: string; // e.g., "Flight from NYC to LHR"
  duration: string;
  approxCost: string;
}

export interface BudgetBreakdown {
  stay: string;
  travel: string;
  food: string;
  sightseeing: string;
  buffer: string;
  totalEstimate: string;
}

export interface ItineraryResult {
  tripTitle: string;
  summary: string;
  days: DailyPlan[];
  accommodation: Accommodation[];
  transport: Transport;
  budget: BudgetBreakdown;
  practicalTips: {
    weather: string;
    safety: string;
    packing: string;
  };
}

export interface PlannerFormData {
  startCity: string;
  destination: string;
  days: number;
  travelers: number;
  budget: string;
  travelStyle: 'Budget' | 'Moderate' | 'Luxury';
  interests: string;
}

export interface PlannerState {
  isLoading: boolean;
  result: ItineraryResult | null;
  error: string | null;
}

export enum ViewState {
  HOME = 'HOME',
  TOURS = 'TOURS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT'
}