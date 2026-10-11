import { weddingData } from "@/config/wedding-data";
import { Navigation, ExternalLink } from "lucide-react";
import { BotanicalDivider, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";

export function VenueMapSection() {
  const { locationMap, resepsi } = weddingData.events;

  return (
    <section
      aria-label="Peta Lokasi Acara"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto text-center"
    >
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold block mb-2.5">
          Petunjuk Lokasi
        </span>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wide">
          Peta &amp; Navigasi
        </h2>
        <BotanicalFlourishCrest className="my-2" />
        <p className="mt-2 text-sm text-sage-900 max-w-md mx-auto font-medium">
          {resepsi.locationName}
        </p>
        <p className="text-xs text-[#465A49] mt-1 max-w-md mx-auto leading-relaxed">
          {resepsi.address}
        </p>
      </div>

      {/* Map Embed Container with Botanical Corners */}
      <div className="relative rounded-3xl overflow-hidden border border-gold-300/60 shadow-sm bg-white p-2.5 sm:p-3 mb-6">
        <FloralCardCorner position="top-right" size={40} className="absolute top-0 right-0 z-20" />
        <FloralCardCorner position="bottom-left" size={40} className="absolute bottom-0 left-0 z-20" />
        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-ivory-50 relative z-10">
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
          className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-ivory-50 bg-sage-700 hover:bg-sage-800 active:scale-90 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-gold-400 min-h-11 cursor-pointer"
        >
          <Navigation className="w-4 h-4 text-gold-100" />
          <span>Buka di Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      <BotanicalDivider className="mt-12" />
    </section>
  );
}
