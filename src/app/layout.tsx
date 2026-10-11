import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush, Amiri } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF8F5",
};

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://fitri-dan-irwan.vercel.app")
  ),
  title: "The Wedding of Fitri & Irwan",
  description: "Undangan Pernikahan Digital Fitri & Irwan. Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu Bapak/Ibu/Saudara/i.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "The Wedding of Fitri & Irwan",
    description: "Jum'at, 23 Oktober 2026 • Undangan Pernikahan Digital Fitri & Irwan",
    type: "website",
    locale: "id_ID",
    siteName: "The Wedding of Fitri & Irwan",
    images: [
      {
        url: "/og-image.png?v=20261011",
        secureUrl: "/og-image.png?v=20261011",
        width: 600,
        height: 315,
        type: "image/png",
        alt: "The Wedding of Fitri & Irwan - Jum'at, 23 Oktober 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Fitri & Irwan",
    description: "Jum'at, 23 Oktober 2026 • Undangan Pernikahan Digital Fitri & Irwan",
    images: ["/og-image.png?v=20261011"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${jakarta.variable} ${alexBrush.variable} ${amiri.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-ivory-50 text-sage-900 font-sans antialiased selection:bg-gold-400/20 selection:text-sage-900">
        {children}
      </body>
    </html>
  );
}
