"use client";

import { useCallback, useEffect, useState } from "react";

const DEFAULT_PLACE = { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125 };

// WMO weather codes used by Open-Meteo
const CODES = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Freezing fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌧️"],
  61: ["Light rain", "🌧️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Heavy showers", "🌧️"],
  82: ["Violent showers", "⛈️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Severe thunderstorm", "⛈️"],
};

const describe = (code) => CODES[code] || ["Unknown", "🌡️"];

// Open-Meteo times are already in the city's local time (timezone=auto),
// so they are formatted as plain local strings without time zone conversion.
const fmtDateTime = (iso) =>
  new Date(iso).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtHour = (iso) =>
  new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export default function Weather() {
  const [place, setPlace] = useState(DEFAULT_PLACE);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (p) => {
    setLoading(true);
    setError("");
    try {
      const url =
        "https://api.open-meteo.com/v1/forecast" +
        `?latitude=${p.latitude}&longitude=${p.longitude}` +
        "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
        "&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
        "&timezone=auto&forecast_days=2";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Request failed");
      setData(await res.json());
      setPlace(p);
    } catch {
      setError("Could not load weather data. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(DEFAULT_PLACE);
  }, [load]);

  async function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`
      );
      const json = await res.json();
      if (!json.results?.length) {
        setError(`No city found for "${q}". Check the spelling and try again.`);
        setLoading(false);
        return;
      }
      const r = json.results[0];
      await load({ name: r.name, country: r.country || "", latitude: r.latitude, longitude: r.longitude });
      setQuery("");
    } catch {
      setError("City search failed. Check your connection and try again.");
      setLoading(false);
    }
  }

  const cur = data?.current;
  const units = data?.current_units;
  let hours = [];
  if (data) {
    const from = cur.time.slice(0, 13) + ":00";
    const start = Math.max(0, data.hourly.time.findIndex((t) => t >= from));
    hours = data.hourly.time.slice(start, start + 12).map((t, i) => ({
      time: t,
      temp: data.hourly.temperature_2m[start + i],
      humidity: data.hourly.relative_humidity_2m[start + i],
      wind: data.hourly.wind_speed_10m[start + i],
      code: data.hourly.weather_code[start + i],
    }));
  }

  return (
    <section aria-labelledby="weather-heading" className="bg-gradient-to-b from-sky to-mist">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row" role="search">
          <label htmlFor="city" className="sr-only">City name</label>
          <input
            id="city"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a city, e.g. Chittagong"
            className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-ink px-6 py-3 font-semibold text-sky transition-colors hover:bg-dusk disabled:opacity-60"
          >
            Search
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-900">
            {error}
          </p>
        )}

        {loading && !data && <p className="mt-10 text-lg">Loading weather…</p>}

        {data && (
          <div className={`mt-8 transition-opacity ${loading ? "opacity-60" : ""}`}>
            <div className="overflow-hidden rounded-2xl bg-ink text-sky shadow-lg">
              <div className="p-6 sm:p-10">
                <h1 id="weather-heading" className="text-2xl font-bold sm:text-3xl">
                  {place.name}
                  {place.country && <span className="font-normal text-sky/70">, {place.country}</span>}
                </h1>
                <p className="mt-1 text-sky/70">{fmtDateTime(cur.time)}</p>

                <div className="mt-6 flex items-center gap-4 sm:gap-6">
                  <span className="text-7xl sm:text-8xl" aria-hidden="true">
                    {describe(cur.weather_code)[1]}
                  </span>
                  <div>
                    <p className="text-6xl font-extrabold leading-none text-sun sm:text-8xl">
                      {Math.round(cur.temperature_2m)}
                      <span className="text-3xl sm:text-5xl">{units.temperature_2m}</span>
                    </p>
                    <p className="mt-2 text-lg">{describe(cur.weather_code)[0]}</p>
                  </div>
                </div>
              </div>

              <dl className="grid grid-cols-1 divide-y divide-dusk border-t border-dusk sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="px-6 py-5">
                  <dt className="text-sm text-sky/70">Humidity</dt>
                  <dd className="mt-1 text-2xl font-bold">
                    {cur.relative_humidity_2m}
                    {units.relative_humidity_2m}
                  </dd>
                </div>
                <div className="px-6 py-5">
                  <dt className="text-sm text-sky/70">Wind speed</dt>
                  <dd className="mt-1 text-2xl font-bold">
                    {cur.wind_speed_10m} {units.wind_speed_10m}
                  </dd>
                </div>
                <div className="px-6 py-5">
                  <dt className="text-sm text-sky/70">Update interval</dt>
                  <dd className="mt-1 text-2xl font-bold">{Math.round(cur.interval / 60)} min</dd>
                </div>
              </dl>
            </div>

            <h2 className="mt-10 text-xl font-bold">Next 12 hours</h2>
            <p className="mt-1 text-sm text-ink/70">Hourly forecast in {place.name}’s local time.</p>
            <ul className="mt-4 flex gap-3 overflow-x-auto pb-3">
              {hours.map((h) => (
                <li key={h.time} className="min-w-[8.5rem] shrink-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-ink/10">
                  <p className="text-sm font-semibold">{fmtHour(h.time)}</p>
                  <p className="mt-2 text-2xl" aria-hidden="true">{describe(h.code)[1]}</p>
                  <p className="mt-1 text-xl font-bold">
                    {Math.round(h.temp)}{units.temperature_2m}
                  </p>
                  <p className="mt-2 text-xs text-ink/70">Humidity {h.humidity}%</p>
                  <p className="text-xs text-ink/70">Wind {h.wind} {units.wind_speed_10m}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
