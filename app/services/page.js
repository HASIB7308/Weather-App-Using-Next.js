export const metadata = { title: "Services | Skyline Weather" };

const services = [
  {
    title: "Current conditions",
    text: "See the temperature and sky condition right now, with the local time of the city you chose.",
  },
  {
    title: "Humidity and wind",
    text: "Check relative humidity and wind speed for the current moment and for every hour ahead.",
  },
  {
    title: "Hourly forecast",
    text: "Scroll through the next 12 hours to plan your day, from the commute to the evening.",
  },
  {
    title: "City search",
    text: "Type the name of any city in the world to switch the weather display to that place.",
  },
  {
    title: "Update interval",
    text: "Each reading shows how often the weather source refreshes its data, so you know how fresh it is.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-bold">Services</h1>
      <p className="mt-4 max-w-prose text-lg text-ink/80">
        Everything the app can tell you about the weather.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.title} className="rounded-xl bg-white p-6 ring-1 ring-ink/10">
            <h2 className="text-xl font-bold">{s.title}</h2>
            <p className="mt-2 text-ink/80">{s.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
