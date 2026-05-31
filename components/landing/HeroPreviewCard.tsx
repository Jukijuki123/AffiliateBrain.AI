"use client";

import React from "react";

export default function HeroPreviewCard() {
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-[var(--color-brand-teal)]/5 rounded-3xl blur-2xl" />

      <div className="relative bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_16px_64px_rgba(0,103,125,0.12)] p-6 max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#f1f5f9]">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-teal)] flex items-center justify-center text-white text-xs font-bold shrink-0">
            AI
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0f172a]">Serum Vitamin C Somethinc</p>
            <p className="text-xs text-[#94a3b8]">Skincare · TikTok Shop</p>
          </div>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            ✓ Generated
          </span>
        </div>

        {/* Script preview */}
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-coral)] mb-1">Hook (0–3 detik)</p>
            <p className="text-sm font-medium text-[#0f172a] leading-relaxed">
              &quot;Guys, kenapa wajahku bisa cerah banget cuma dalam 2 minggu? Ini rahasianya...&quot;
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-teal)] mb-1">Body</p>
            <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
              &quot;Aku udah coba banyak serum Vitamin C, tapi yang ini beda banget. Formulanya stabil, nggak bikin iritasi, dan hasilnya kelihatan setelah 7 hari pemakaian rutin...&quot;
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-teal)] mb-1">CTA</p>
            <p className="text-xs text-[#0f172a] font-semibold">
              &quot;Klik link di bio atau cari di TikTok Shop sekarang, stok terbatas!&quot;
            </p>
          </div>
        </div>

        {/* Platform badges */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#f1f5f9]">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-black text-white">TikTok</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#ee4d2d] text-white">Shopee</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#e1306c] text-white">Reels</span>
          <span className="ml-auto text-[10px] text-[#94a3b8]">3 skrip · 28 hashtag</span>
        </div>
      </div>
    </div>
  );
}
