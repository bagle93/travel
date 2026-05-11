import { NextResponse } from "next/server";

export type MonthKey =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type Destination = {
  id: string;
  name: string;
  countryOrState: string;
  type: "National" | "International";
  lat: number;
  lon: number;
  currency: string;
  pageTitle: string;
  seasonMonths: MonthKey[];
  style: {
    palette: string[];
    image: string;
    mood: string;
  };
  why: string;
  visa: string;
  flightRange: string;
  clothing: string;
  landmarks: string[];
  hiddenGem: string;
  food: string;
  nature: string;
};

const monthAliases: Record<string, MonthKey> = {
  jan: "january",
  january: "january",
  feb: "february",
  february: "february",
  mar: "march",
  march: "march",
  apr: "april",
  april: "april",
  may: "may",
  jun: "june",
  june: "june",
  jul: "july",
  july: "july",
  aug: "august",
  august: "august",
  sep: "september",
  sept: "september",
  september: "september",
  oct: "october",
  october: "october",
  nov: "november",
  november: "november",
  dec: "december",
  december: "december",
};

export const destinations: Destination[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    countryOrState: "Rajasthan, India",
    type: "National",
    lat: 26.9124,
    lon: 75.7873,
    currency: "INR",
    pageTitle: "Jaipur",
    seasonMonths: ["october", "november", "december", "january", "february"],
    style: {
      palette: ["#d96f62", "#d6a13d", "#273c75", "#5f7d4f"],
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
      mood: "Royal heritage, craft bazaars and golden desert light",
    },
    why:
      "Jaipur's post-monsoon and winter window brings clearer skies, easier palace walks and strong cultural travel demand across Rajasthan.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Jaipur: usually Rs 3,000-Rs 8,000 one-way.",
    clothing:
      "Cotton or linen layers, sunglasses, sunscreen, walking shoes and a light evening layer.",
    landmarks: ["Hawa Mahal", "City Palace", "Amber Palace"],
    hiddenGem: "Anokhi Museum of Hand Printing",
    food: "Pyaaz kachori, ghewar, dal baati churma and a thali-led bazaar walk",
    nature: "Jhalana Leopard Safari or Nahargarh sunrise trail",
  },
  {
    id: "udaipur",
    name: "Udaipur",
    countryOrState: "Rajasthan, India",
    type: "National",
    lat: 24.5854,
    lon: 73.7125,
    currency: "INR",
    pageTitle: "Udaipur",
    seasonMonths: ["september", "october", "november", "december", "january"],
    style: {
      palette: ["#315c72", "#d7b46a", "#f2efe6", "#7c8f6a"],
      image:
        "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1600&q=80",
      mood: "Lake palaces, soft hills and romantic slow travel",
    },
    why:
      "Post-monsoon lakes stay photogenic while temperatures become easier for palace, boat and old-city exploration.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Udaipur: usually Rs 4,500-Rs 10,000 one-way.",
    clothing:
      "Smart casual cottons, light shawl for boat evenings, sunglasses and comfortable old-city footwear.",
    landmarks: ["City Palace", "Lake Pichola", "Jagdish Temple"],
    hiddenGem: "Ahar Cenotaphs",
    food: "Laal maas, ker sangri, mirchi vada and lakeside thali experiences",
    nature: "Monsoon Palace sunset or Badi Lake cycling loop",
  },
  {
    id: "coorg",
    name: "Coorg",
    countryOrState: "Karnataka, India",
    type: "National",
    lat: 12.4244,
    lon: 75.7382,
    currency: "INR",
    pageTitle: "Kodagu_district",
    seasonMonths: ["october", "november", "december", "january", "february"],
    style: {
      palette: ["#245142", "#a56f3f", "#f0ddbd", "#6c8c55"],
      image:
        "https://images.unsplash.com/photo-1620395466172-f4af856d3bdb?auto=format&fit=crop&w=1600&q=80",
      mood: "Coffee estates, misty hills and plantation comfort",
    },
    why:
      "The post-monsoon and winter window brings lush landscapes, better road conditions and strong coffee-estate appeal.",
    visa: "No visa required for Indian travellers.",
    flightRange:
      "Fly to Bengaluru/Mangaluru, then road transfer: Rs 4,000-Rs 9,000 one-way plus cab.",
    clothing:
      "Light rain shell, breathable layers, trail shoes, insect repellent and a warm layer for mornings.",
    landmarks: ["Abbey Falls", "Raja's Seat", "Namdroling Monastery"],
    hiddenGem: "A guided coffee plantation cupping session",
    food: "Pandi curry, akki rotti, bamboo shoot curry and estate coffee",
    nature: "Mandalpatti jeep trail or soft trek near Tadiandamol",
  },
  {
    id: "varanasi",
    name: "Varanasi",
    countryOrState: "Uttar Pradesh, India",
    type: "National",
    lat: 25.3176,
    lon: 82.9739,
    currency: "INR",
    pageTitle: "Varanasi",
    seasonMonths: ["october", "november", "december", "january", "february"],
    style: {
      palette: ["#c7522a", "#f2b84b", "#273248", "#d7c6a3"],
      image:
        "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1600&q=80",
      mood: "Sacred river mornings, music, silk and evening lamps",
    },
    why:
      "Cooler evenings and festive-season spiritual travel make this a strong period for ghats, temples and slow cultural immersion.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Varanasi: usually Rs 4,000-Rs 10,000 one-way.",
    clothing:
      "Light cottons, modest temple wear, scarf, slip-on shoes and a light evening layer.",
    landmarks: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath"],
    hiddenGem: "Ramnagar Fort by boat",
    food: "Kachori sabzi, tamatar chaat, malaiyo and Banarasi paan",
    nature: "Sunrise boat ride on the Ganga",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    countryOrState: "Uttarakhand, India",
    type: "National",
    lat: 30.0869,
    lon: 78.2676,
    currency: "INR",
    pageTitle: "Rishikesh",
    seasonMonths: ["march", "april", "may", "september", "october", "november"],
    style: {
      palette: ["#2f7d79", "#d7a85a", "#f5efe2", "#2e4b3f"],
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
      mood: "River adventure, yoga decks and Himalayan foothills",
    },
    why:
      "The post-monsoon window reopens rafting, yoga retreats and clear foothill views after the heavy rain period.",
    visa: "No visa required for Indian travellers.",
    flightRange:
      "Fly to Dehradun or Delhi, then road transfer: Rs 3,500-Rs 9,000 one-way plus cab.",
    clothing:
      "Quick-dry layers, river sandals, light fleece, sun protection and waterproof phone pouch.",
    landmarks: ["Triveni Ghat", "Beatles Ashram", "Lakshman Jhula area"],
    hiddenGem: "Kunjapuri sunrise temple trail",
    food: "Satvik cafes, aloo puri, pahadi thali and riverside chai",
    nature: "White-water rafting or Neer Garh waterfall hike",
  },
  {
    id: "goa",
    name: "Goa",
    countryOrState: "Goa, India",
    type: "National",
    lat: 15.2993,
    lon: 74.124,
    currency: "INR",
    pageTitle: "Goa",
    seasonMonths: ["october", "november", "december", "january", "february", "march"],
    style: {
      palette: ["#0f8f8c", "#f2c078", "#ffffff", "#d94f30"],
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
      mood: "Beach energy, Portuguese lanes, seafood and sunset music",
    },
    why:
      "Goa's dry-season travel window brings cleaner post-monsoon landscapes, active beach culture and rising event momentum before peak crowds.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Goa: usually Rs 4,000-Rs 12,000 one-way.",
    clothing:
      "Resort wear, swimwear, breathable shirts, sunscreen, sandals and one smart-casual dinner outfit.",
    landmarks: ["Fontainhas", "Basilica of Bom Jesus", "Aguada Fort"],
    hiddenGem: "Divar Island village cycle loop",
    food: "Goan fish thali, poi, bebinca, xacuti and a Panjim tavern trail",
    nature: "Dudhsagar-side day trip, kayaking or a quiet South Goa beach morning",
  },
  {
    id: "kerala",
    name: "Kerala",
    countryOrState: "Kerala, India",
    type: "National",
    lat: 10.8505,
    lon: 76.2711,
    currency: "INR",
    pageTitle: "Kerala",
    seasonMonths: ["october", "november", "december", "january", "february", "march"],
    style: {
      palette: ["#1f6f50", "#d9a441", "#f7f0df", "#174a7c"],
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
      mood: "Backwaters, Ayurveda, tea gardens and coastal food",
    },
    why:
      "Kerala becomes especially attractive after the monsoon, with greener landscapes, backwater cruising and wellness travel moving into peak season.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Kochi/Trivandrum: usually Rs 5,000-Rs 13,000 one-way.",
    clothing:
      "Light cottons, sandals, rain-ready layer, mosquito repellent and modest temple-ready clothing.",
    landmarks: ["Fort Kochi", "Alleppey Backwaters", "Munnar Tea Gardens"],
    hiddenGem: "Kumarakom village canoe route",
    food: "Appam-stew, Kerala sadya, fish moilee, puttu-kadala and toddy-shop style seafood",
    nature: "Backwater houseboat, Munnar tea walk or Periyar forest boat safari",
  },
  {
    id: "kashmir",
    name: "Kashmir",
    countryOrState: "Jammu and Kashmir, India",
    type: "National",
    lat: 34.0837,
    lon: 74.7973,
    currency: "INR",
    pageTitle: "Kashmir",
    seasonMonths: ["april", "may", "june", "september", "october", "december", "january", "february"],
    style: {
      palette: ["#315b7c", "#c9a24d", "#f3f0e8", "#7b3f3f"],
      image:
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80",
      mood: "Alpine lakes, chinar leaves, houseboats and saffron warmth",
    },
    why:
      "Kashmir's shoulder and winter windows bring chinar colour, crisp mountain air, snow-season access and slower luxury travel moments.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Srinagar: usually Rs 5,000-Rs 14,000 one-way.",
    clothing:
      "Warm layers, light down jacket, walking shoes, sunglasses and moisturizer for dry mountain air.",
    landmarks: ["Dal Lake", "Mughal Gardens", "Shankaracharya Temple"],
    hiddenGem: "Dachigam National Park edge visit or old Srinagar craft walk",
    food: "Kahwa, wazwan, noon chai, girda bread and saffron-led sweets",
    nature: "Gulmarg gondola, Pahalgam valley drive or Dal Lake shikara sunrise",
  },
  {
    id: "andaman",
    name: "Andaman Islands",
    countryOrState: "Andaman and Nicobar Islands, India",
    type: "National",
    lat: 11.7401,
    lon: 92.6586,
    currency: "INR",
    pageTitle: "Andaman_and_Nicobar_Islands",
    seasonMonths: ["november", "december", "january", "february", "march", "april"],
    style: {
      palette: ["#0d8a9b", "#f3d487", "#ffffff", "#244b5a"],
      image:
        "https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=1600&q=80",
      mood: "Clear water, quiet beaches, reefs and slow island days",
    },
    why:
      "The best beach and water-activity window begins after the monsoon, making it a strong winter-sun India escape.",
    visa: "No visa required for Indian travellers.",
    flightRange: "Delhi/Mumbai to Port Blair: usually Rs 8,000-Rs 20,000 one-way.",
    clothing:
      "Swimwear, breathable resort wear, reef-safe sunscreen, sandals, dry bag and light rain shell.",
    landmarks: ["Cellular Jail", "Radhanagar Beach", "Ross Island"],
    hiddenGem: "Neil Island sunrise cycling",
    food: "Fresh seafood, coconut curries, Bengali-influenced fish meals and tropical fruit breakfasts",
    nature: "Snorkelling, scuba discovery dive or mangrove kayaking",
  },
  {
    id: "bali",
    name: "Bali",
    countryOrState: "Indonesia",
    type: "International",
    lat: -8.4095,
    lon: 115.1889,
    currency: "IDR",
    pageTitle: "Bali",
    seasonMonths: ["may", "june", "july", "august", "september", "october"],
    style: {
      palette: ["#1c8d8a", "#22201d", "#6ea34f", "#b6aa8e"],
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
      mood: "Ocean temples, rice terraces and wellness-led adventure",
    },
    why:
      "Bali's dry-season shoulder gives Indian travellers strong beach, culture and wellness value before the wetter months.",
    visa:
      "B1 Visa on Arrival/e-VoA for Indians; 30 days, extendable once to 60 days.",
    flightRange: "Delhi/Mumbai to Denpasar: usually Rs 15,000-Rs 30,000 one-way.",
    clothing:
      "Resort wear, swimwear, reef-safe sunscreen, sandals, compact rain jacket, mosquito repellent and temple sarong.",
    landmarks: ["Tanah Lot", "Uluwatu Temple", "Tegallalang Rice Terrace"],
    hiddenGem: "Sidemen village or a quieter Jatiluwih rice terrace walk",
    food: "Nasi campur, satay lilit, sambal matah and Balinese cooking class",
    nature: "Mount Batur sunrise, Ayung rafting or Nusa Penida coast day",
  },
  {
    id: "dubai",
    name: "Dubai",
    countryOrState: "United Arab Emirates",
    type: "International",
    lat: 25.2048,
    lon: 55.2708,
    currency: "AED",
    pageTitle: "Dubai",
    seasonMonths: ["november", "december", "january", "february", "march"],
    style: {
      palette: ["#c99a58", "#153047", "#f3eadc", "#8bb8c8"],
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
      mood: "Polished city breaks, desert luxury and shopping energy",
    },
    why:
      "Cooler months unlock outdoor dining, desert experiences and family-friendly city touring.",
    visa:
      "Pre-arranged UAE tourist visa required for most Indian passport holders.",
    flightRange: "Delhi/Mumbai to Dubai: usually Rs 9,000-Rs 22,000 one-way.",
    clothing:
      "Smart casuals, modest layers for public areas, sunglasses, sunscreen and light evening layer.",
    landmarks: ["Burj Khalifa", "Dubai Creek", "Museum of the Future"],
    hiddenGem: "Alserkal Avenue galleries",
    food: "Emirati breakfast, shawarma, mandi and a creek-side food walk",
    nature: "Desert conservation reserve safari or Hatta mountain day",
  },
  {
    id: "singapore",
    name: "Singapore",
    countryOrState: "Singapore",
    type: "International",
    lat: 1.3521,
    lon: 103.8198,
    currency: "SGD",
    pageTitle: "Singapore",
    seasonMonths: ["february", "march", "june", "july", "august"],
    style: {
      palette: ["#0f7c80", "#e43d30", "#f6f4ea", "#1f2933"],
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80",
      mood: "Clean urban nature, food courts and design-forward family travel",
    },
    why:
      "Reliable infrastructure, year-round attractions and easy short-haul connectivity make it a strong premium city break.",
    visa: "Singapore e-visa required for Indian passport holders.",
    flightRange:
      "Delhi/Mumbai to Singapore: usually Rs 11,000-Rs 24,000 one-way.",
    clothing:
      "Light breathable clothing, umbrella, walking shoes and a light layer for air-conditioned spaces.",
    landmarks: ["Gardens by the Bay", "Marina Bay", "Chinatown"],
    hiddenGem: "Joo Chiat and Katong heritage walk",
    food: "Hainanese chicken rice, laksa, kaya toast and hawker centre crawl",
    nature: "Southern Ridges walk or Pulau Ubin cycling",
  },
  {
    id: "phuket",
    name: "Phuket",
    countryOrState: "Thailand",
    type: "International",
    lat: 7.8804,
    lon: 98.3923,
    currency: "THB",
    pageTitle: "Phuket_province",
    seasonMonths: ["november", "december", "january", "february", "march"],
    style: {
      palette: ["#167c80", "#f2b35b", "#ffffff", "#34495e"],
      image:
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1600&q=80",
      mood: "Island hopping, beach clubs and limestone-blue water",
    },
    why:
      "The dry season begins around November, making Phuket stronger for beach and boat days after the monsoon tail.",
    visa:
      "Thailand visa rules for Indians change often; verify current exemption/e-visa status before booking.",
    flightRange: "India to Phuket: usually Rs 11,000-Rs 25,000 one-way.",
    clothing:
      "Swimwear, linen, reef-safe sunscreen, sandals, light rain layer and dry bag.",
    landmarks: ["Big Buddha", "Old Phuket Town", "Promthep Cape"],
    hiddenGem: "Koh Yao Noi day escape",
    food: "Tom yum, massaman curry, roti, mango sticky rice and night-market seafood",
    nature: "Phi Phi, Phang Nga Bay or Similan season boat trip",
  },
  {
    id: "maldives",
    name: "Maldives",
    countryOrState: "Maldives",
    type: "International",
    lat: 3.2028,
    lon: 73.2207,
    currency: "MVR",
    pageTitle: "Maldives",
    seasonMonths: ["november", "december", "january", "february", "march", "april"],
    style: {
      palette: ["#16a6b6", "#f5d27a", "#ffffff", "#0c5160"],
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
      mood: "Overwater calm, reefs and honeymoon-grade blue",
    },
    why:
      "The dry season improves visibility, seaplane reliability and premium resort appeal.",
    visa: "Visa on arrival for Indian travellers, subject to entry conditions.",
    flightRange: "India to Male: usually Rs 10,000-Rs 24,000 one-way.",
    clothing:
      "Resort wear, swimwear, reef-safe sunscreen, hat, sunglasses and modest wear for local islands.",
    landmarks: ["Male", "Hulhumale", "Resort island lagoon"],
    hiddenGem: "A local island cafe and sandbank picnic",
    food: "Mas huni, garudhiya, reef fish curry and tropical fruit breakfasts",
    nature: "Snorkelling, dolphin cruise or beginner dive session",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    countryOrState: "Vietnam",
    type: "International",
    lat: 16.1667,
    lon: 107.8333,
    currency: "VND",
    pageTitle: "Vietnam",
    seasonMonths: ["february", "march", "april", "october", "november", "december"],
    style: {
      palette: ["#b33a2f", "#e7b64b", "#1d5b4f", "#f4efe2"],
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80",
      mood: "Lantern streets, limestone bays, coffee culture and street food",
    },
    why:
      "Vietnam's cooler travel windows work well for culture, food, scenic routes and compact city-to-nature itineraries.",
    visa: "Vietnam e-visa required for Indian passport holders.",
    flightRange: "India to Hanoi/Ho Chi Minh City: usually Rs 10,000-Rs 24,000 one-way.",
    clothing:
      "Breathable layers, light rain jacket, walking shoes and a compact umbrella.",
    landmarks: ["Hanoi Old Quarter", "Ha Long Bay", "Hoi An Ancient Town"],
    hiddenGem: "Ninh Binh boat landscape day",
    food: "Pho, banh mi, egg coffee, bun cha and a night-market food walk",
    nature: "Ha Long/Lan Ha cruise, Ninh Binh cycling or Ba Na Hills day",
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    countryOrState: "Sri Lanka",
    type: "International",
    lat: 7.8731,
    lon: 80.7718,
    currency: "LKR",
    pageTitle: "Sri_Lanka",
    seasonMonths: ["december", "january", "february", "march", "april", "august"],
    style: {
      palette: ["#1d6f5f", "#d6a13d", "#f4ead8", "#7c3f2f"],
      image:
        "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80",
      mood: "Tea railways, beaches, temples and compact island variety",
    },
    why:
      "Sri Lanka is a strong short-haul island circuit when weather aligns by coast, with culture and nature packed into manageable distances.",
    visa: "Sri Lanka ETA/e-visa rules should be verified before booking.",
    flightRange: "India to Colombo: usually Rs 7,000-Rs 18,000 one-way.",
    clothing:
      "Light cottons, modest temple clothing, sandals, sunscreen and a rain layer.",
    landmarks: ["Galle Fort", "Kandy", "Sigiriya"],
    hiddenGem: "Ella tea country rail stop",
    food: "Hoppers, kottu, lamprais, crab curry and Ceylon tea",
    nature: "Train to Ella, Yala safari or south-coast beach day",
  },
];

export function normaliseMonth(value: string | null): MonthKey {
  const key = value?.trim().toLowerCase() ?? "";
  return monthAliases[key] ?? "october";
}

function wikiDate(daysAgo: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

async function getRecentPageViews(destination: Destination) {
  const start = wikiDate(31);
  const end = wikiDate(2);
  const title = encodeURIComponent(destination.pageTitle);
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${title}/daily/${start}/${end}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "travel-intelligence-demo/1.0",
      },
      next: { revalidate: 21600 },
    });
    if (!response.ok) throw new Error("Demand unavailable");
    const data = await response.json();
    return data.items.reduce(
      (total: number, item: { views: number }) => total + item.views,
      0
    ) as number;
  } catch {
    return 0;
  }
}

function seasonScore(destination: Destination, month: MonthKey) {
  return destination.seasonMonths.includes(month) ? 350000 : 25000;
}

async function rankedDestinations(month: MonthKey, type: Destination["type"]) {
  const candidates = destinations.filter((destination) => destination.type === type);
  const enriched = await Promise.all(
    candidates.map(async (destination) => {
      const recentDemand = await getRecentPageViews(destination);
      const demandWeight = Math.min(recentDemand, 180000);
      const score = seasonScore(destination, month) + demandWeight;
      return {
        id: destination.id,
        name: destination.name,
        countryOrState: destination.countryOrState,
        type: destination.type,
        why: destination.why,
        style: destination.style,
        demandSignal:
          recentDemand > 0
            ? `${Math.round(recentDemand / 1000).toLocaleString()}k recent destination reads`
            : "Seasonal fit signal",
        seasonalFit: destination.seasonMonths.includes(month)
          ? "Strong seasonal fit"
          : "Alternative pick",
        score,
      };
    })
  );

  return enriched.sort((first, second) => second.score - first.score).slice(0, 5);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = normaliseMonth(searchParams.get("month"));
  const [national, international] = await Promise.all([
    rankedDestinations(month, "National"),
    rankedDestinations(month, "International"),
  ]);

  return NextResponse.json({
    month,
    updatedAt: new Date().toISOString(),
    signal:
      "Ranked with recent Wikimedia destination interest plus month-season suitability.",
    national,
    international,
  });
}
