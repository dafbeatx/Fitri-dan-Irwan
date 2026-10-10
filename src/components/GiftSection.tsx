"use client";

import React, { useState } from "react";
import Image from "next/image";
import { weddingData } from "@/config/wedding-data";
import { Gift, Copy, Check, QrCode, MessageCircle, X } from "lucide-react";
import { BotanicalDivider, BotanicalFlourishCrest, FloralCardCorner } from "./BotanicalDecor";

export function GiftSection() {
  const { gifts } = weddingData;
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState(false);

  const handleCopy = (accountNumber: string, bankName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(accountNumber);
      setCopiedBank(bankName);
      setTimeout(() => setCopiedBank(null), 3000);
    }
  };

  const whatsappUrl = `https://wa.me/${gifts.confirmationPhone}?text=${encodeURIComponent(
    "Assalamu'alaikum Fitri & Irwan, saya ingin mengonfirmasi pengiriman tanda kasih / kado pernikahan."
  )}`;

  return (
    <section
      id="hadiah"
      aria-label="Tanda Kasih dan Amplop Digital"
      className="py-12 sm:py-16 px-4 max-w-sm mx-auto text-center"
    >
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.35em] text-gold-600 font-semibold mb-2.5">
          <Gift className="w-4 h-4 text-gold-500" />
          <span>Tanda Kasih</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl font-normal text-sage-900 tracking-wide">
          Amplop Digital
        </h2>
        <BotanicalFlourishCrest className="my-2" />
        <p className="mt-2 text-xs sm:text-sm text-[#465A49] max-w-xs mx-auto leading-relaxed">
          {gifts.intro}
        </p>
      </div>

      {/* Bank Account Cards or Fallback Card */}
      {gifts.accounts.length > 0 ? (
        <div className="flex flex-col gap-4 mb-8 w-full">
          {gifts.accounts.map((acc) => {
            const isCopied = copiedBank === acc.bankName;

            return (
              <div
                key={acc.bankName}
                className="relative w-full bg-white/95 border border-gold-300/60 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between items-center text-center overflow-hidden"
              >
                <FloralCardCorner position="top-right" size={38} className="absolute top-0 right-0" />
                <FloralCardCorner position="bottom-left" size={38} className="absolute bottom-0 left-0" />
                <div className="mb-5 flex flex-col items-center">
                  {acc.logoUrl ? (
                    <div className="h-10 sm:h-12 w-32 relative mb-4 flex items-center justify-center">
                      <Image
                        src={acc.logoUrl}
                        alt={`Logo ${acc.bankName}`}
                        width={128}
                        height={40}
                        className="object-contain h-8 sm:h-9 w-auto"
                        priority
                      />
                    </div>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-ivory-50 text-sage-700 border border-sage-200 mb-3">
                      {acc.bankName}
                    </span>
                  )}

                  <p className="font-mono text-xl sm:text-2xl font-bold text-sage-900 tracking-wider">
                    {acc.accountNumber}
                  </p>
                  <p className="text-xs sm:text-sm text-[#556858] mt-1.5 font-medium">
                    A.N {acc.accountHolder}
                  </p>
                </div>

                {/* 1-Click Copy Button - R-26 */}
                <button
                  type="button"
                  onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                  aria-label={`Salin nomor rekening ${acc.bankName}`}
                  className={`btn-press inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-11 min-w-38 shadow-xs focus-visible:ring-2 focus-visible:ring-gold-400 active:scale-90 cursor-pointer ${
                    isCopied
                      ? "bg-sage-700 text-ivory-50"
                      : "bg-ivory-50 text-sage-700 border border-sage-200 hover:bg-sage-100 hover:border-gold-300"
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-gold-100" />
                      <span>Nomor Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gold-400" />
                      <span>Salin Rekening</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/90 border border-ivory-200 rounded-3xl p-8 sm:p-10 shadow-sm max-w-lg mx-auto mb-8 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-sage-50 border border-gold-400/40 flex items-center justify-center">
            <Gift className="w-7 h-7 text-gold-500" />
          </div>
          <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-sage-900 font-medium">
            Doa Restu Anda Hadiah Terindah
          </h3>
          <p className="text-xs sm:text-sm text-[#556858] leading-relaxed max-w-md mx-auto">
            Kehadiran, silaturahmi, serta doa restu yang tulus dari Bapak/Ibu/Saudara/i merupakan karunia yang paling bermakna bagi kami berdua.
          </p>
          <div className="pt-2 text-[11px] text-sage-600/80 italic border-t border-ivory-200/80">
            Terima kasih atas kebaikan dan doa tulus yang Anda berikan.
          </div>
        </div>
      )}

      {/* QRIS & WhatsApp Confirmation Actions */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {gifts.qris.enabled && (
            <button
              type="button"
              onClick={() => setShowQrisModal(true)}
              aria-label="Tampilkan QRIS Tanda Kasih"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-sage-700 bg-white border border-gold-400/60 hover:bg-ivory-50 transition-colors shadow-xs min-h-11 focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <QrCode className="w-4 h-4 text-gold-400" />
              <span>Lihat QRIS Tanda Kasih</span>
            </button>
          )}

          {gifts.confirmationPhone ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Konfirmasi pengiriman tanda kasih via WhatsApp"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-ivory-50 bg-sage-700 hover:bg-sage-800 transition-colors shadow-sm min-h-11 focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <MessageCircle className="w-4 h-4 text-gold-100" />
              <span>Konfirmasi via WhatsApp</span>
            </a>
          ) : null}
        </div>

        {gifts.confirmationPhone && gifts.confirmationHolder && (
          <p className="text-[11px] text-sage-600">
            Konfirmasi ke: <span className="font-semibold text-sage-900">{gifts.confirmationHolder}</span>
            {gifts.confirmationDisplay && (
              <span className="font-mono text-emerald-700 ml-1">({gifts.confirmationDisplay})</span>
            )}
          </p>
        )}
      </div>

      {/* QRIS Modal Dialog (R-26, R-32) */}
      {showQrisModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Modal QRIS Tanda Kasih"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
        >
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xl border border-gold-400/40">
            <button
              type="button"
              onClick={() => setShowQrisModal(false)}
              aria-label="Tutup tampilan QRIS"
              className="absolute top-4 right-4 p-2 rounded-full text-[#556858] hover:bg-ivory-50 transition-colors min-h-11 min-w-11 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-cormorant text-2xl font-semibold text-sage-900 mb-1">
              {gifts.qris.title}
            </h3>
            <p className="text-xs text-[#556858] mb-6">
              Pernikahan Fitri &amp; Irwan
            </p>

            {/* QR Code Graphic Frame */}
            <div className="w-52 h-52 mx-auto rounded-2xl bg-ivory-50 border-2 border-dashed border-gold-400 p-4 flex flex-col items-center justify-center mb-4">
              <QrCode className="w-24 h-24 text-sage-700 mb-2" />
              <span className="text-[11px] font-medium text-sage-600 tracking-wide">
                Scan via Semua e-Wallet &amp; m-Banking
              </span>
            </div>

            <p className="text-xs text-[#556858] leading-relaxed">
              {gifts.qris.description}
            </p>
          </div>
        </div>
      )}

      <BotanicalDivider className="mt-14" />
    </section>
  );
}
