import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakeline — Wake Surf + Fish Forecast",
  description:
    "Glass conditions, wind protection, and bite times for the lakes you ride and fish.",
  manifest: "/manifest.webmanifest",
  applicationName: "Lakeline",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lakeline",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
