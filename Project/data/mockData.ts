export type Attraction = {
  id: string;
  city: string;
  country: string;
  name: string;
  category: string;
  rating: number;
  priceLevel: "$" | "$$" | "$$$";
  description: string;
  tags: string[];
};

export const ATTRACTIONS: Attraction[] = [
  {
    id: "1",
    city: "Paris",
    country: "France",
    name: "Eiffel Tower",
    category: "Landmark",
    rating: 4.8,
    priceLevel: "$$",
    description: "Iconic iron tower with city views and evening light show.",
    tags: ["view", "romantic", "must-see"],
  },
  {
    id: "2",
    city: "Paris",
    country: "France",
    name: "Louvre Museum",
    category: "Museum",
    rating: 4.7,
    priceLevel: "$$",
    description: "World-famous art museum home to the Mona Lisa.",
    tags: ["art", "history", "indoor"],
  },
  {
    id: "3",
    city: "Tokyo",
    country: "Japan",
    name: "Shibuya Crossing",
    category: "Neighborhood",
    rating: 4.6,
    priceLevel: "$",
    description: "Bustling intersection with neon lights and shopping streets.",
    tags: ["nightlife", "shopping", "city"],
  },
  {
    id: "4",
    city: "New York",
    country: "USA",
    name: "Central Park",
    category: "Park",
    rating: 4.8,
    priceLevel: "$",
    description: "Huge urban park with lakes, trails, and city skyline views.",
    tags: ["nature", "family", "free"],
  },
  {
    id: "5",
    city: "Rome",
    country: "Italy",
    name: "Colosseum",
    category: "Historical",
    rating: 4.7,
    priceLevel: "$$",
    description: "Ancient amphitheater famous for gladiator history.",
    tags: ["history", "landmark"],
  },
];

export type ItineraryRequest = {
  destination: string;
  startDate: string; // e.g. "2025-06-01"
  endDate: string;
  budgetLevel: "budget" | "standard" | "luxury";
};

export type ItineraryDay = {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
};

export type Itinerary = {
  destination: string;
  totalDays: number;
  days: ItineraryDay[];
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: "user" | "ai";
  createdAt: number;
};
