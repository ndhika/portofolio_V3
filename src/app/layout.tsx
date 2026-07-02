import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display/editorial sans for headlines
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// Neutral sans for body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Mono for labels/counters
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Andhika Rafi — Software Developer & Data Science",
  description:
    "Portfolio of Andhika Hisyam Muhammad Rafi. Full-stack developer crafting scalable web applications with clean architecture and thoughtful design.",
  keywords: [
    "Andhika Rafi",
    "Software Developer",
    "Full Stack Developer",
    "Data Science",
    "Laravel",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Andhika Hisyam Muhammad Rafi" }],
  openGraph: {
    title: "Andhika Rafi — Software Developer",
    description:
      "Full-stack developer crafting scalable web applications with clean architecture.",
    url: "https://dhikarafi.me",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
