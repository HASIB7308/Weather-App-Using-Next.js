import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <h2 className="text-3xl font-bold sm:text-4xl">A weather app that shows only what you need</h2>
        <div className="max-w-prose space-y-4 text-lg text-ink/80">
          <p>
            Skyline Weather shows the current temperature, local time, humidity and wind speed for any
            city, plus an hourly forecast for the next 12 hours.
          </p>
          <p>
            All data comes from Open-Meteo, a free weather API that needs no account or API key.
          </p>
          <Link href="/about" className="inline-block font-semibold text-sea underline hover:text-ink">
            Read more about the app
          </Link>
        </div>
      </div>
    </section>
  );
}
