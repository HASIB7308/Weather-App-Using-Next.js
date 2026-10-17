import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const main = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-main",
});

export const metadata = {
  title: "Skyline Weather",
  description: "Live temperature, humidity and wind speed for any city, powered by Open-Meteo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={main.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
