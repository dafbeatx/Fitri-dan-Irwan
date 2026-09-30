import React from "react";
import { weddingData } from "@/config/wedding-data";
import { BookHeart, CalendarHeart } from "lucide-react";
import { BotanicalDivider } from "./BotanicalDecor";

export function StorySection() {
  const { loveStory } = weddingData;

  return (
    <section
      id="kisah"
      aria-label="Kisah Perjalanan Cinta"
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#99753F] font-semibold mb-2">
          <BookHeart className="w-4 h-4 text-[#C3A16A]" />
          <span>Kisah Kami</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2D22]">
          Perjalanan Cinta
        </h2>
        <p className="mt-3 text-sm text-[#556858] max-w-md mx-auto">
          Setiap kisah memiliki awal, dan inilah jejak langkah yang membawa kami bersatu.
        </p>
      </div>

      <div className="relative border-l-2 border-[#D0DDD2] ml-4 sm:ml-32 md:ml-40 space-y-10 py-4">
        {loveStory.map((story, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#C3A16A] flex items-center justify-center shadow-sm">
              <CalendarHeart className="w-4 h-4 text-[#3F5244]" />
            </div>

            {/* Year Label (Left-aligned on larger screens) */}
            <div className="sm:absolute sm:-left-36 md:-left-44 sm:top-2 sm:text-right">
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-[#3F5244] bg-[#E6ECE7] border border-[#D0DDD2]">
                {story.year}
              </span>
            </div>

            {/* Content Card */}
            <div className="bg-white/90 border border-[#EAE2D5] rounded-2xl p-5 sm:p-6 shadow-sm">
              <h3 className="font-serif-cormorant text-xl sm:text-2xl font-semibold text-[#1F2D22] mb-2">
                {story.title}
              </h3>
              <p className="text-sm text-[#556858] leading-relaxed">
                {story.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BotanicalDivider className="mt-14" />
    </section>
  );
}
