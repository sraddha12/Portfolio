import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sraddha Kanuparthy | Software Engineer & AI Developer",
  description: "Personal Portfolio of Sraddha Kanuparthy - Software Engineer, AI Developer, and Cybersecurity Enthusiast. Explore my featured projects, technical expertise, and journey.",
  keywords: [
    "Sraddha Kanuparthy",
    "Software Engineer",
    "AI Developer",
    "Cybersecurity",
    "Machine Learning",
    "Portfolio",
    "Next.js Portfolio",
    "React Engineer"
  ],
  authors: [{ name: "Sraddha Kanuparthy" }],
  creator: "Sraddha Kanuparthy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sraddhakanuparthy.com",
    title: "Sraddha Kanuparthy | Software Engineer & AI Developer",
    description: "Personal Portfolio of Sraddha Kanuparthy - Software Engineer, AI Developer, and Cybersecurity Enthusiast.",
    siteName: "Sraddha Kanuparthy Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sraddha Kanuparthy Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sraddha Kanuparthy | Software Engineer & AI Developer",
    description: "Personal Portfolio of Sraddha Kanuparthy - Software Engineer, AI Developer, and Cybersecurity Enthusiast.",
    creator: "@SraddhaK",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://sraddhakanuparthy.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
