import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-sky">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-bold">Skyline Weather</p>
          <p className="mt-1 text-sm text-sky/70">
            Weather data by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-sun"
            >
              Open-Meteo.com
            </a>
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li><Link href="/" className="hover:text-sun">Home</Link></li>
          <li><Link href="/about" className="hover:text-sun">About</Link></li>
          <li><Link href="/services" className="hover:text-sun">Services</Link></li>
          <li><Link href="/contact" className="hover:text-sun">Contact</Link></li>
        </ul>
      </div>
      <div className="border-t border-dusk py-4 text-center text-xs text-sky/60">
        © {new Date().getFullYear()} Skyline Weather. All rights reserved.
      </div>
    </footer>
  );
}
