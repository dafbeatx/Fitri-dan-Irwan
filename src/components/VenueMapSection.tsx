import React from "react";
import { weddingData } from "@/config/wedding-data";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { BotanicalDivider } from "./BotanicalDecor";

export function VenueMapSection() {
  const { locationMap, resepsi } = weddingData.events;

  return (
    <section
      aria-label="Peta Lokasi Acara"
      className="py-12 sm:py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center"
    >
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-[#99753F] font-semibold block mb-2">
          Petunjuk Lokasi
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-[#1F2D22]">
          Peta &amp; Navigasi
        </h2>
        <p className="mt-2 text-sm text-[#556858] max-w-md mx-auto">
          {resepsi.locationName}
        </p>
        <p className="text-xs text-[#556858] mt-1 max-w-md mx-auto leading-relaxed">
          {resepsi.address}
        </p>
      </div>

      {/* Map Embed Container */}
      <div className="rounded-3xl overflow-hidden border border-[#EAE2D5] shadow-sm bg-white p-2 sm:p-3 mb-6">
        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#FAF8F5] relative">
          <iframe
            src={locationMap.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Pernikahan Fitri dan Irwan"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Action Button: Open in Google Maps App / Browser - R-26 */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={locationMap.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka petunjuk arah di Google Maps"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#FAF8F5] bg-[#3F5244] hover:bg-[#324236] active:scale-95 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#C3A16A] min-h-[44px]"
        >
          <Navigation className="w-4 h-4 text-[#F3EBD8]" />
          <span>Buka di Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}
