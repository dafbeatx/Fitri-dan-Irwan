"use client";

import React, { useState } from "react";
import { weddingData } from "@/config/wedding-data";
import { Gift, Copy, Check, QrCode, MessageCircle, X } from "lucide-react";
import { BotanicalDivider } from "./BotanicalDecor";

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
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center"
    >
      <div className="mb-10">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#99753F] font-semibold mb-2">
          <Gift className="w-4 h-4 text-[#C3A16A]" />
          <span>Tanda Kasih</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#1F2D22]">
          Amplop Digital
        </h2>
        <p className="mt-3 text-sm text-[#556858] max-w-md mx-auto leading-relaxed">
          {gifts.intro}
        </p>
      </div>

      {/* Bank Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {gifts.accounts.map((acc) => {
          const isCopied = copiedBank === acc.bankName;

          return (
            <div
              key={acc.bankName}
              className="bg-white/90 border border-[#EAE2D5] rounded-3xl p-6 shadow-sm flex flex-col justify-between items-center text-center"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#3F5244] border border-[#D0DDD2] mb-3">
                  {acc.bankName}
                </span>
                <p className="font-mono text-lg sm:text-xl font-bold text-[#1F2D22] tracking-wider">
                  {acc.accountNumber}
                </p>
                <p className="text-xs text-[#556858] mt-1 font-medium">
                  a.n. {acc.accountHolder}
                </p>
              </div>

              {/* 1-Click Copy Button - R-26 */}
              <button
                type="button"
                onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                aria-label={`Salin nomor rekening ${acc.bankName}`}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all min-h-[44px] min-w-[140px] focus-visible:ring-2 focus-visible:ring-[#C3A16A] ${
                  isCopied
                    ? "bg-[#3F5244] text-[#FAF8F5]"
                    : "bg-[#FAF8F5] text-[#3F5244] border border-[#D0DDD2] hover:bg-[#E6ECE7]"
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#F3EBD8]" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C3A16A]" />
                    <span>Salin Rekening</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* QRIS & WhatsApp Confirmation Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {gifts.qris.enabled && (
          <button
            type="button"
            onClick={() => setShowQrisModal(true)}
            aria-label="Tampilkan QRIS Tanda Kasih"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#3F5244] bg-white border border-[#C3A16A]/60 hover:bg-[#FAF8F5] transition-colors shadow-xs min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#C3A16A]"
          >
            <QrCode className="w-4 h-4 text-[#C3A16A]" />
            <span>Lihat QRIS Tanda Kasih</span>
          </button>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Konfirmasi pengiriman tanda kasih via WhatsApp"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium text-[#FAF8F5] bg-[#3F5244] hover:bg-[#324236] transition-colors shadow-sm min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#C3A16A]"
        >
          <MessageCircle className="w-4 h-4 text-[#F3EBD8]" />
          <span>Konfirmasi via WhatsApp</span>
        </a>
      </div>

      {/* QRIS Modal Dialog (R-26, R-32) */}
      {showQrisModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Modal QRIS Tanda Kasih"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
        >
          <div className="relative max-w-sm w-full bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xl border border-[#C3A16A]/40">
            <button
              type="button"
              onClick={() => setShowQrisModal(false)}
              aria-label="Tutup tampilan QRIS"
              className="absolute top-4 right-4 p-2 rounded-full text-[#556858] hover:bg-[#FAF8F5] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C3A16A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-cormorant text-2xl font-semibold text-[#1F2D22] mb-1">
              {gifts.qris.title}
            </h3>
            <p className="text-xs text-[#556858] mb-6">
              Pernikahan Fitri &amp; Irwan
            </p>

            {/* QR Code Graphic Frame */}
            <div className="w-52 h-52 mx-auto rounded-2xl bg-[#FAF8F5] border-2 border-dashed border-[#C3A16A] p-4 flex flex-col items-center justify-center mb-4">
              <QrCode className="w-24 h-24 text-[#3F5244] mb-2" />
              <span className="text-[11px] font-medium text-[#4E6554] tracking-wide">
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
