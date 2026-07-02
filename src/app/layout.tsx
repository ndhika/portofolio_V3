import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// Display/editorial serif for headlines
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Neutral sans for body
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

// Mono for labels/counters
const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
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
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
