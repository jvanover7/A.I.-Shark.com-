import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI Shark — AI Consulting for the Next Generation of Business",
  description:
    "The AI Shark is an AI consulting firm that designs custom automations and unique AI solutions for niche industries — helping established businesses leap ahead before new entrants catch up.",
  metadataBase: new URL("https://theaishark.com"),
  openGraph: {
    title: "The AI Shark — AI Consulting",
    description:
      "Custom AI strategy, automations, and ROI-driven solutions for industries no one else has thought of.",
    url: "https://theaishark.com",
    siteName: "The AI Shark",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Shark",
    description: "AI consulting for the next generation of business.",
  },
};

export const viewport: Viewport = {
  themeColor: "#02060f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
