"use client";

import {
  CalendarDays,
  CloudSun,
  Compass,
  Hotel,
  IndianRupee,
  Loader2,
  MapPin,
  Palette,
  Plane,
  Shirt,
  Sparkles,
  TrendingUp,
  Umbrella,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Recommendation = {
  month: string;
  updatedAt: string;
  signal: string;
  national: DestinationCard[];
  international: DestinationCard[];
};

type DestinationCard = {
  id: string;
  name: string;
  countryOrState: string;
  type: "National" | "International";
  why: string;
  demandSignal: string;
  seasonalFit: string;
  style: {
    palette: string[];
    image: string;
    mood: string;
  };
};

type DestinationDetail = DestinationCard & {
  month: string;
  monthLabel: string;
  whyForMonth: string;
  visa: string;
  flightRange: string;
  clothing: string;
  exchangeRate: string;
  liveWeather: {
    temperature: string;
    humidity: string;
    rainProbability: string;
    label: string;
  };
  itinerary: {
    day: string;
    title: string;
    plan: string;
  }[];
  hotels: {
    id: string;
    name: string;
    area: string;
    price: string;
    fit: string;
    note: string;
  }[];
};

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Home() {
  const currentMonth = getCurrentMonthName();
  const [month, setMonth] = useState(currentMonth);
  const [activeMonth, setActiveMonth] = useState(currentMonth);
  const [data, setData] = useState<Recommendation | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [activeType, setActiveType] = useState<"National" | "International">(
    "National"
  );
  const [activeDetailTab, setActiveDetailTab] = useState<
    "overview" | "itinerary" | "hotels" | "basics"
  >("overview");
  const [detail, setDetail] = useState<DestinationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadRecommendations(activeMonth);
  }, [activeMonth]);

  useEffect(() => {
    if (!selectedId || !data?.month) return;

    const controller = new AbortController();
    void loadDetail(selectedId, data.month, controller.signal);

    return () => controller.abort();
  }, [selectedId, data?.month]);

  async function loadRecommendations(nextMonth: string) {
    setLoading(true);
    setError("");
    setDetail(null);
    try {
      const response = await fetch(`/api/recommendations?month=${nextMonth}`);
      if (!response.ok) throw new Error("Could not load recommendations");
      const payload = (await response.json()) as Recommendation;
      setData(payload);
      setActiveType("National");
      setActiveDetailTab("overview");
      setSelectedId(payload.national[0]?.id ?? payload.international[0]?.id ?? "");
    } catch {
      setError("Live recommendations are unavailable right now. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function loadDetail(id: string, monthKey: string, signal: AbortSignal) {
    setDetailLoading(true);
    setDetail(null);
    try {
      const response = await fetch(`/api/destinations/${id}?month=${monthKey}`, {
        signal,
      });
      if (!response.ok) throw new Error("Could not load destination");
      setDetail((await response.json()) as DestinationDetail);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setDetail(null);
      }
    } finally {
      if (!signal.aborted) {
        setDetailLoading(false);
      }
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveMonth(month);
  }

  const activeCard = useMemo(() => {
    if (!data) return null;
    return [...data.national, ...data.international].find(
      (item) => item.id === selectedId
    );
  }, [data, selectedId]);

  const visibleDestinations = useMemo(() => {
    if (!data) return [];
    return activeType === "National" ? data.national : data.international;
  }, [activeType, data]);

  function handleTypeChange(type: "National" | "International") {
    setActiveType(type);
    setActiveDetailTab("overview");
    if (!data) return;
    const next = type === "National" ? data.national[0] : data.international[0];
    if (next) setSelectedId(next.id);
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#">
          desividesi
        </a>
        <nav aria-label="Primary navigation">
          <a href="#discover">Discover</a>
          <a href="#planner">Planner</a>
          <a href="#hotels">Hotels</a>
        </nav>
      </header>

      <section className="hero compact-hero">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <Sparkles size={16} />
            <span>desividesi</span>
          </div>
          <h1>Find the right trips for your month.</h1>
          <p>
            Compare national and international picks, then open a guided plan
            with live weather, currency and logistics.
          </p>
          <form className="search-card" id="discover" onSubmit={handleSubmit}>
            <label htmlFor="month">
              <CalendarDays size={18} />
              Travel month
            </label>
            <select
              id="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            >
              {monthOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button type="submit">
              <Compass size={18} />
              Search
            </button>
          </form>
        </div>
      </section>

      {loading && (
        <section className="state-card">
          <Loader2 className="spin" size={22} />
          Reading live destination demand for {activeMonth}...
        </section>
      )}

      {error && <section className="state-card error">{error}</section>}

      {!loading && data && (
        <>
          <section className="signal-strip">
            <TrendingUp size={18} />
            <span>{data.signal}</span>
            <strong>Updated {new Date(data.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong>
          </section>

          <section className="planner-layout" id="planner">
            <div className="recommendation-board">
              <div className="pick-header">
                <div>
                  <span>Browse picks</span>
                  <h2>{activeType} Trips</h2>
                </div>
                <div className="type-tabs" aria-label="Trip type">
                  <button
                    className={activeType === "National" ? "active" : ""}
                    type="button"
                    onClick={() => handleTypeChange("National")}
                  >
                    National
                  </button>
                  <button
                    className={activeType === "International" ? "active" : ""}
                    type="button"
                    onClick={() => handleTypeChange("International")}
                  >
                    International
                  </button>
                </div>
              </div>
              <DestinationColumn
                destinations={visibleDestinations}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <section className="detail-section">
              {detailLoading && (
                <div className="detail-loading">
                  <Loader2 className="spin" size={20} />
                  Preparing the guide...
                </div>
              )}
              {!detailLoading && detail && (
                <DestinationGuide
                  destination={detail}
                  activeTab={activeDetailTab}
                  onTabChange={setActiveDetailTab}
                />
              )}
              {!detailLoading && !detail && activeCard && (
                <div className="detail-loading">
                  Select a destination to open it.
                </div>
              )}
            </section>
          </section>
        </>
      )}

      <footer className="site-footer">
        <span>desividesi</span>
        <p>
          Built for Indian travellers. Live weather and currency are connected;
          hotel inventory becomes live when a provider API is added.
        </p>
      </footer>
    </main>
  );
}

function DestinationColumn({
  destinations,
  selectedId,
  onSelect,
}: {
  destinations: DestinationCard[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="destination-column">
      <div className="card-stack">
        {destinations.map((destination) => (
          <button
            className={`trip-card ${selectedId === destination.id ? "active" : ""}`}
            key={destination.id}
            type="button"
            onClick={() => onSelect(destination.id)}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(12, 12, 10, 0.74), rgba(12, 12, 10, 0.14)), url(${destination.style.image})`,
            }}
          >
            <span className="destination-type">{destination.type}</span>
            <div>
              <h3>{destination.name}</h3>
              <p>
                <MapPin size={15} />
                {destination.countryOrState}
              </p>
            </div>
            <small>
              <TrendingUp size={14} />
              {destination.demandSignal}
            </small>
            <em>{destination.seasonalFit}</em>
          </button>
        ))}
      </div>
    </div>
  );
}

function DestinationGuide({
  destination,
  activeTab,
  onTabChange,
}: {
  destination: DestinationDetail;
  activeTab: "overview" | "itinerary" | "hotels" | "basics";
  onTabChange: (
    tab: "overview" | "itinerary" | "hotels" | "basics"
  ) => void;
}) {
  return (
    <article className="guide-shell">
      <div
        className="guide-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(12, 12, 10, 0.78), rgba(12, 12, 10, 0.16)), url(${destination.style.image})`,
        }}
      >
        <div>
          <span className="destination-type">{destination.type}</span>
          <h2>{destination.name}</h2>
          <p>
            <MapPin size={17} />
            {destination.countryOrState}
          </p>
        </div>
      </div>

      <div className="detail-tabs" id="hotels" aria-label="Destination details">
        <button
          className={activeTab === "overview" ? "active" : ""}
          type="button"
          onClick={() => onTabChange("overview")}
        >
          Overview
        </button>
        <button
          className={activeTab === "itinerary" ? "active" : ""}
          type="button"
          onClick={() => onTabChange("itinerary")}
        >
          Custom Plan
        </button>
        <button
          className={activeTab === "hotels" ? "active" : ""}
          type="button"
          onClick={() => onTabChange("hotels")}
        >
          Hotels
        </button>
        <button
          className={activeTab === "basics" ? "active" : ""}
          type="button"
          onClick={() => onTabChange("basics")}
        >
          Basics
        </button>
      </div>

      <div className="guide-grid">
        {activeTab === "overview" && (
          <section className="guide-main">
          <div className="content-block">
            <div className="section-title">
              <Sparkles size={18} />
              <h3>Why This Works In {destination.monthLabel}</h3>
            </div>
            <p>{destination.whyForMonth}</p>
          </div>

          <div className="insight-grid">
            <Insight
              icon={<CloudSun size={20} />}
              label={destination.liveWeather.label}
              value={destination.liveWeather.temperature}
              detail={`Humidity ${destination.liveWeather.humidity}`}
            />
            <Insight
              icon={<Umbrella size={20} />}
              label="Rain outlook"
              value={destination.liveWeather.rainProbability}
              detail="Live forecast signal"
            />
            <Insight
              icon={<Plane size={20} />}
              label="Travel cost"
              value={destination.flightRange}
              detail={destination.visa}
            />
            <Insight
              icon={<IndianRupee size={20} />}
              label="Currency"
              value={destination.exchangeRate}
              detail="Live exchange where available"
            />
          </div>
          </section>
        )}

        {activeTab === "basics" && (
          <section className="guide-main">
          <div className="content-block">
            <div className="section-title">
              <Shirt size={18} />
              <h3>Packing Intelligence</h3>
            </div>
            <p>{destination.clothing}</p>
          </div>
          <div className="content-block">
            <div className="section-title">
              <Plane size={18} />
              <h3>Travel Basics</h3>
            </div>
            <p>{destination.visa}</p>
            <p className="spaced-copy">{destination.flightRange}</p>
            <p className="spaced-copy">{destination.exchangeRate}</p>
          </div>
          </section>
        )}

        {activeTab === "itinerary" && (
        <aside className="guide-panel full-panel">
          <div className="section-title">
            <Compass size={18} />
            <h3>Custom 3-Day Plan</h3>
          </div>
          <div className="timeline">
            {destination.itinerary.map((item) => (
              <div className="timeline-item" key={item.day}>
                <span>{item.day}</span>
                <h4>{item.title}</h4>
                <p>{item.plan}</p>
              </div>
            ))}
          </div>
        </aside>
        )}

        {activeTab === "hotels" && (
        <aside className="guide-panel full-panel">
          <div className="section-title">
            <Hotel size={18} />
            <h3>Hotel Suggestions</h3>
          </div>
          <div className="hotel-list">
            {destination.hotels.map((hotel) => (
              <article className="hotel-card" key={hotel.id}>
                <div>
                  <h4>{hotel.name}</h4>
                  <p>{hotel.area}</p>
                </div>
                <strong>{hotel.price}</strong>
                <span>{hotel.fit}</span>
                <small>{hotel.note}</small>
              </article>
            ))}
          </div>
        </aside>
        )}

        {activeTab === "overview" && (
          <div className="palette-card">
            <div className="section-title">
              <Palette size={18} />
              <h3>Visual Direction</h3>
            </div>
            <p>{destination.style.mood}</p>
            <div className="swatches">
              {destination.style.palette.map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function Insight({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="insight">
      <div className="insight-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function getCurrentMonthName() {
  return new Date().toLocaleString("en-US", { month: "long" });
}
