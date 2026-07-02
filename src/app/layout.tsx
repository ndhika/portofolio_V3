import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Andhika Hisyam Muhammad Rafi | Portfolio",
  description: "Software Engineer & Data Scientist",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased bg-white text-neutral-950">
        {children}
      </body>
    </html>
  );
}
