export const metadata = { title: "About | Skyline Weather" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-4xl font-bold">About Skyline Weather</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/80">
        <p>
          Skyline Weather is a simple weather app built with Next.js and Tailwind CSS. It shows how to
          fetch data from a public API and display it clearly on any screen size.
        </p>
        <p>
          The app loads the weather for Dhaka first. You can search for any other city by name. For each
          city it shows the current temperature, the local time, humidity, wind speed and the update
          interval of the data, followed by an hourly forecast.
        </p>
        <p>
          Weather data comes from{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sea underline hover:text-ink"
          >
            Open-Meteo
          </a>
          , a free API for non-commercial use that does not require an API key.
        </p>
      </div>
    </div>
  );
}
