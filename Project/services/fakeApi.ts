import {
  ATTRACTIONS,
  Attraction,
  ChatMessage,
  Itinerary,
  ItineraryDay,
  ItineraryRequest,
} from "../data/mockData";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getTrendingAttractions(): Promise<Attraction[]> {
  await delay(400);
  return ATTRACTIONS;
}

export async function searchAttractions(
  query: string,
  cityFilter?: string
): Promise<Attraction[]> {
  await delay(300);
  const q = query.toLowerCase();
  return ATTRACTIONS.filter((a) => {
    const matchesQuery =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCity =
      !cityFilter || a.city.toLowerCase() === cityFilter.toLowerCase();
    return matchesQuery && matchesCity;
  });
}

export async function generateItinerary(
  req: ItineraryRequest
): Promise<Itinerary> {
  await delay(600);

  const start = new Date(req.startDate);
  const end = new Date(req.endDate);
  const oneDayMs = 24 * 60 * 60 * 1000;
  const totalDays = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / oneDayMs) + 1
  );

  const matching = ATTRACTIONS.filter((a) =>
    a.city.toLowerCase().includes(req.destination.toLowerCase())
  );
  const pool = matching.length ? matching : ATTRACTIONS;
  const budgetSummary =
    req.budgetLevel === "budget"
      ? "Focus on free and low-cost activities."
      : req.budgetLevel === "luxury"
      ? "Include premium dining and unique experiences."
      : "Balanced mix of must-see spots and food.";

  const days: ItineraryDay[] = [];
  for (let i = 0; i < totalDays; i++) {
    const a1 = pool[(i * 2) % pool.length];
    const a2 = pool[(i * 2 + 1) % pool.length];
    days.push({
      day: i + 1,
      morning: `Start your day at ${a1.name} (${a1.category}).`,
      afternoon: `Head to ${a2.name} and explore nearby streets.`,
      evening: `Dinner at a local restaurant. ${budgetSummary}`,
    });
  }

  return {
    destination: req.destination,
    totalDays,
    days,
  };
}

let chatCounter = 0;

export async function sendChat(
  userText: string
): Promise<ChatMessage[]> {
  await delay(500);
  chatCounter += 1;

  const lower = userText.toLowerCase();
  const cityMention = ATTRACTIONS.find((a) =>
    lower.includes(a.city.toLowerCase())
  );

  const suggestions = cityMention
    ? ATTRACTIONS.filter((a) => a.city === cityMention.city)
        .slice(0, 3)
        .map((a) => a.name)
        .join(", ")
    : ATTRACTIONS.slice(0, 3)
        .map((a) => `${a.name} in ${a.city}`)
        .join(", ");

  const replyText = `Here are a few ideas: ${suggestions}. I picked them based on popularity and variety.`;

  return [
    {
      id: `u-${chatCounter}`,
      text: userText,
      sender: "user",
      createdAt: Date.now(),
    },
    {
      id: `a-${chatCounter}`,
      text: replyText,
      sender: "ai",
      createdAt: Date.now() + 1,
    },
  ];
}
