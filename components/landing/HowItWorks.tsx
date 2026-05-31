"use client";

import React from "react";

const steps = [
  {
    num: "01",
    title: "Isi Detail Produk",
    desc: "Masukkan nama produk, link Shopee/Tokopedia, kategori, dan target audiens Anda.",
  },
  {
    num: "02",
    title: "AI Generate Strategi",
    desc: "AffiliateBrain menganalisis produk dan menciptakan blueprint konten yang disesuaikan.",
  },
  {
    num: "03",
    title: "Copy & Publish",
    desc: "Salin skrip, caption, dan hashtag langsung ke TikTok, Shopee Video, atau Reels.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[var(--color-brand-teal)] uppercase tracking-widest mb-3">Cara Kerja</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
            3 Langkah Jadi Skrip Viral
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-[var(--color-brand-teal)]/20 opacity-30" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl mb-4 border"
                style={{
                  borderColor: i === 0 ? "rgba(0, 95, 115, 0.2)" : i === 1 ? "#cbd5e1" : "rgba(249, 87, 56, 0.2)",
                  backgroundColor: i === 0 ? "var(--color-brand-teal-light)" : i === 1 ? "#f1f5f9" : "var(--color-brand-coral-light)",
                  color: i === 0 ? "var(--color-brand-teal)" : i === 1 ? "var(--color-text-secondary)" : "var(--color-brand-coral)"
                }}
              >
                <span>{step.num}</span>
              </div>
              <h3 className="text-lg font-bold text-[#0f172a] mb-2">{step.title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
