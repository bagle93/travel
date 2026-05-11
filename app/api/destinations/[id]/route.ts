import { NextResponse } from "next/server";
import {
  destinations,
  normaliseMonth,
  type Destination,
  type MonthKey,
} from "../../recommendations/route";

async function getWeather(destination: Destination) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(destination.lat));
  url.searchParams.set("longitude", String(destination.lon));
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,precipitation"
  );
  url.searchParams.set("daily", "precipitation_probability_max");
  url.searchParams.set("forecast_days", "3");

  try {
    const response = await fetch(url, { next: { revalidate: 900 } });
    if (!response.ok) throw new Error("Weather unavailable");
    const data = await response.json();

    return {
      temperature: `${Math.round(data.current.temperature_2m)}°C`,
      humidity: `${data.current.relative_humidity_2m}%`,
      rainProbability: `${Math.round(
        data.daily.precipitation_probability_max[0] ?? 0
      )}%`,
      label: "Live weather",
    };
  } catch {
    return {
      temperature: "Live data unavailable",
      humidity: "Check closer to travel",
      rainProbability: "Check closer to travel",
      label: "Fallback weather",
    };
  }
}

async function getCurrency(destination: Destination) {
  if (destination.currency === "INR") {
    return "INR, no exchange needed";
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?from=INR&to=${destination.currency}`,
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) throw new Error("Currency unavailable");
    const data = await response.json();
    const rate = data.rates[destination.currency];
    return `1 INR approx ${rate.toFixed(2)} ${destination.currency}`;
  } catch {
    return `${destination.currency}; live exchange unavailable`;
  }
}

function buildItinerary(destination: Destination) {
  return [
    {
      day: "Day 1",
      title: "Arrival, orientation and the signature frame",
      plan: `Check in, keep the first half slow, then visit ${destination.landmarks[0]} and ${destination.landmarks[1]}. End with a view-led dinner or relaxed local walk so the trip starts beautifully, not breathlessly.`,
    },
    {
      day: "Day 2",
      title: "Culture, hidden gem and food memory",
      plan: `Start early at ${destination.landmarks[2]}, then move to ${destination.hiddenGem}. Shape the evening around ${destination.food}, with enough time for markets, cafes or a guided neighbourhood walk.`,
    },
    {
      day: "Day 3",
      title: "Nature, adventure and a calm exit",
      plan: `${destination.nature}. Keep the final block open for a spa, shopping, packing and a proper airport or station buffer.`,
    },
  ];
}

function buildHotels(destination: Destination) {
  const base =
    destination.type === "National"
      ? [
          {
            name: "Boutique heritage stay",
            area: "Central sightseeing zone",
            price: "Rs 6,000-Rs 12,000/night",
            fit: "Best for couples and premium culture trips",
          },
          {
            name: "Comfort business hotel",
            area: "Airport or main city corridor",
            price: "Rs 4,000-Rs 8,000/night",
            fit: "Best for short stays and efficient transfers",
          },
          {
            name: "Experiential resort",
            area: "Outer nature belt",
            price: "Rs 9,000-Rs 18,000/night",
            fit: "Best for slow weekends and scenic stays",
          },
        ]
      : [
          {
            name: "Design boutique hotel",
            area: "Walkable dining and culture district",
            price: "Rs 9,000-Rs 18,000/night",
            fit: "Best for couples and first-time visitors",
          },
          {
            name: "Premium resort base",
            area: "Beach, marina or nature-facing zone",
            price: "Rs 16,000-Rs 35,000/night",
            fit: "Best for relaxed luxury and families",
          },
          {
            name: "Smart city hotel",
            area: "Transit-friendly central district",
            price: "Rs 7,000-Rs 14,000/night",
            fit: "Best for value-conscious international trips",
          },
        ];

  return base.map((hotel, index) => ({
    ...hotel,
    id: `${destination.id}-hotel-${index + 1}`,
    note: "Curated stay type. Connect a hotel API for live names, rates and availability.",
  }));
}

function monthLabel(month: MonthKey) {
  return month.charAt(0).toUpperCase() + month.slice(1);
}

function buildMonthReason(destination: Destination, month: MonthKey) {
  const label = monthLabel(month);
  const fit = destination.seasonMonths.includes(month)
    ? "a strong seasonal fit"
    : "a possible alternative, though not its strongest season";

  return `For ${label}, ${destination.name} is ${fit}. ${destination.why}`;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const month = normaliseMonth(searchParams.get("month"));
  const { id } = await context.params;
  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    return NextResponse.json({ error: "Destination not found" }, { status: 404 });
  }

  const [liveWeather, exchangeRate] = await Promise.all([
    getWeather(destination),
    getCurrency(destination),
  ]);

  return NextResponse.json({
    ...destination,
    month,
    monthLabel: monthLabel(month),
    whyForMonth: buildMonthReason(destination, month),
    liveWeather,
    exchangeRate,
    itinerary: buildItinerary(destination),
    hotels: buildHotels(destination),
  });
}
