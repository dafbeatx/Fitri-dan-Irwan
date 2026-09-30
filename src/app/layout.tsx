import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush, Amiri } from "next/font/google";
import "./globals.css";

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
  title: "Walimatul 'Ursy: Fitri & Irwan",
  description: "Undangan Pernikahan Digital Fitri & Irwan. Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu Bapak/Ibu/Saudara/i.",
  openGraph: {
    title: "Walimatul 'Ursy: Fitri & Irwan",
    description: "Undangan Pernikahan Digital Fitri & Irwan",
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
      lang="id"
      className={`${cormorant.variable} ${jakarta.variable} ${alexBrush.variable} ${amiri.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#1F2D22] font-sans antialiased selection:bg-[#C3A16A]/20 selection:text-[#1F2D22]">
        {children}
      </body>
    </html>
  );
}
