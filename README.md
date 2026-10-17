# Skyline Weather (Next.js + Tailwind CSS + Open-Meteo)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/page.js` - Home (Weather + About section)
- `app/about`, `app/services`, `app/contact` - other pages
- `components/Header.js`, `components/Footer.js` - shared layout components
- `components/Weather.js` - fetches data from Open-Meteo (no API key needed)
