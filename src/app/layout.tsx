import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Andhika Rafi — Software Developer & Data Science Enthusiast",
  description:
    "Portfolio of Andhika Hisyam Muhammad Rafi. Full-stack developer building scalable web applications with clean architecture. Based in Indonesia.",
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
      "Full-stack developer building scalable web applications with clean architecture.",
    url: "https://dhikarafi.me",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
