"use client";

import React from "react";
import Link from "next/link";
import { Dna, Link2, Target, Clapperboard, BarChart3, Star } from "lucide-react";

export default function ProductIntelShowcase() {
  return (
    <section id="product-intelligence" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-teal)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-brand-coral)]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-teal)]/10 text-sm font-bold text-[var(--color-brand-teal)] mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Fitur Premium Baru
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] mb-4">
            Analisis{" "}
            <span className="text-gradient-brand">Kecerdasan Produk</span>
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Pahami psikologi produk secara mendalam sebelum membuat konten.
            AI kami membedah 10 pilar analisis untuk memaksimalkan konversi affiliasi Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Preview Card */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-brand-teal)]/8 to-[var(--color-brand-coral)]/5 rounded-3xl blur-2xl" />

            <div className="relative bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_16px_64px_rgba(0,103,125,0.10)] p-6 sm:p-8">
              {/* Header bar */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f1f5f9]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-brand-teal)] to-[#00838f] flex items-center justify-center text-white shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f172a]">Serum Brightening Niacinamide</p>
                  <p className="text-xs text-[#94a3b8] flex items-center gap-1">Skincare · Rp39.900 · <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" /> 4.8</p>
                </div>
                <span className="ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                  ✓ Analyzed
                </span>
              </div>

              {/* Analysis pillars preview */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-teal)] mb-1.5 flex items-center gap-1">
                    <Dna className="w-3.5 h-3.5" /> Product DNA
                  </p>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    Serum entry-level yang memenuhi kebutuhan emosional &quot;glow up&quot; — target utama: Gen-Z perempuan yang insecure soal bekas jerawat.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-coral)] mb-1.5 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> Buying Triggers
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Harga Murah", "Social Proof", "Before-After", "FOMO", "Viral"].map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f8fafc] border border-[#e2e8f0] text-[#475569]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1.5 flex items-center gap-1">
                    <Clapperboard className="w-3.5 h-3.5" /> Hook Terbaik
                  </p>
                  <p className="text-sm text-[#0f172a] font-medium italic">
                    &quot;Cuma Rp39rb, bekas jerawat gue ilang dalam 2 minggu — kok bisa?&quot;
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#f1f5f9]">
                <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[var(--color-brand-teal)] text-white">10 Pilar</span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#0f172a] text-white">Auto-Scrape</span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[var(--color-brand-coral)] text-white">AI Powered</span>
                <span className="ml-auto text-[10px] text-[#94a3b8]">Analisis 30 detik</span>
              </div>
            </div>
          </div>

          {/* Right: Feature list */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: <Dna className="w-5 h-5" />,
                color: "var(--color-brand-teal)",
                title: "Product DNA & Buyer Persona",
                desc: "Pahami inti emosional produk dan siapa yang paling mungkin membeli. AI mendeteksi persona utama berdasarkan psikologi e-commerce Indonesia.",
              },
              {
                icon: <Link2 className="w-5 h-5" />,
                color: "var(--color-brand-teal)",
                title: "Scraping Link Otomatis",
                desc: "Cukup tempel link Shopee, Tokopedia, atau marketplace — AI otomatis mengambil judul, deskripsi, dan data produk untuk riset yang lebih akurat.",
              },
              {
                icon: <Target className="w-5 h-5" />,
                color: "var(--color-brand-coral)",
                title: "Trigger & Objection Mapping",
                desc: "Identifikasi pemicu checkout terkuat dan peta keberatan calon pembeli — lengkap dengan counter-response siap pakai untuk konten.",
              },
              {
                icon: <Clapperboard className="w-5 h-5" />,
                color: "#d97706",
                title: "Hook & CTA Generator",
                desc: "Dapatkan formula hook 3 detik untuk TikTok, Reels & Shopee Video plus 6 jenis CTA mulai dari hard sell sampai comment bait.",
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                color: "var(--color-brand-teal)",
                title: "Content Angle Scoring",
                desc: "8 sudut pandang konten dievaluasi dengan skor viralitas dan konversi — tahu persis angle mana yang paling menguntungkan.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 rounded-xl hover:bg-[#f8fafc] transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                  style={{
                    borderColor: `${item.color}30`,
                    backgroundColor: `${item.color}10`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#0f172a] mb-1 group-hover:text-[var(--color-brand-teal)] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="mt-2 pl-4">
              <Link
                href="/login"
                id="product-intel-cta"
                className="btn-primary inline-flex py-3 px-6 text-sm"
              >
                Mulai Analisis Produk
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
