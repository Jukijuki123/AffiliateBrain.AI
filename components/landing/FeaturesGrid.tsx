"use client";

import React from "react";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    colorClasses: "bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal)]",
    title: "3 Skrip Video Siap Pakai",
    desc: "Dapatkan hook, body, dan CTA lengkap untuk 3 angle konten berbeda — langsung bisa direkam.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
    colorClasses: "bg-slate-100 text-slate-700",
    title: "Caption & Hashtag Set",
    desc: "Caption pendek untuk TikTok/Reels, caption panjang untuk Shopee, plus 20+ hashtag niche yang relevan.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colorClasses: "bg-[var(--color-brand-coral-light)] text-[var(--color-brand-coral)]",
    title: "Jadwal Posting Optimal",
    desc: "Rekomendasi jam posting terbaik berdasarkan kebiasaan audiens Indonesia di setiap platform.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    colorClasses: "bg-gradient-to-br from-[var(--color-brand-teal-light)] to-[var(--color-brand-coral-light)] text-[var(--color-brand-teal)]",
    title: "Analisis Kecerdasan Produk",
    desc: "Scraping otomatis dari link marketplace + 10 pilar analisis psikologi pembeli berbasis AI.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-hero">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[var(--color-brand-teal)] uppercase tracking-widest mb-3">Fitur Unggulan</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Semua yang Kamu Butuhkan,{" "}
            <span className="text-gradient-brand">dalam Satu Klik</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="card card-hover p-6 flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.colorClasses}`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] mb-2">{f.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
