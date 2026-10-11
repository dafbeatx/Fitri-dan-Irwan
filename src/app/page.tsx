import type { Metadata } from "next";
import { Suspense } from "react";
import { WeddingClientPage } from "@/components/WeddingClientPage";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const toParam = searchParams.to;
  const guestName = typeof toParam === "string" ? decodeURIComponent(toParam).trim() : undefined;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://fitri-dan-irwan.vercel.app");

  // Version parameter for cache busting WhatsApp and social scrapers
  const ogImageVersion = "20261011";
  const ogImageUrl = `${siteUrl}/og-image.png?v=${ogImageVersion}`;

  if (guestName) {
    const title = `The Wedding of Fitri & Irwan - Kepada Yth. ${guestName}`;
    const description = `Jum'at, 23 Oktober 2026 • Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i ${guestName} untuk menghadiri hari bahagia pernikahan kami.`;
    const guestCanonical = `${siteUrl}/?to=${encodeURIComponent(guestName)}`;

    return {
      title,
      description,
      alternates: {
        canonical: guestCanonical,
      },
      openGraph: {
        title,
        description,
        url: guestCanonical,
        siteName: "The Wedding of Fitri & Irwan",
        locale: "id_ID",
        type: "website",
        images: [
          {
            url: ogImageUrl,
            secureUrl: ogImageUrl,
            width: 600,
            height: 315,
            type: "image/png",
            alt: `Undangan Pernikahan Fitri & Irwan untuk ${guestName}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageUrl],
      },
    };
  }

  return {
    title: "The Wedding of Fitri & Irwan",
    description: "Jum'at, 23 Oktober 2026 • Undangan Pernikahan Digital Fitri & Irwan",
    openGraph: {
      title: "The Wedding of Fitri & Irwan",
      description: "Jum'at, 23 Oktober 2026 • Undangan Pernikahan Digital Fitri & Irwan",
      url: siteUrl,
      siteName: "The Wedding of Fitri & Irwan",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
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
      images: [ogImageUrl],
    },
  };
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
        </div>
      }
    >
      <WeddingClientPage />
    </Suspense>
  );
}

