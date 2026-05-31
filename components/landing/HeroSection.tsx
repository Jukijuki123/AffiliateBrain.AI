"use client";

import React from "react";
import Link from "next/link";
import HeroPreviewCard from "./HeroPreviewCard";

export default function HeroSection() {
  return (
    <section className="bg-gradient-hero pt-16 pb-20 sm:pt-24 sm:pb-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-sm text-sm font-semibold text-[#475569] mb-6">
              <svg className="w-4 h-4 text-[var(--color-brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Dibuat untuk Affiliator Indonesia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5">
              <span className="text-[#0f172a]">Dari Nama Produk</span>
              <br />
              <span className="text-gradient-brand">Jadi Skrip Viral.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-lg sm:text-xl text-[#475569] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              AI yang paham budaya <strong className="text-[#0f172a]">TikTok Shop</strong>,{" "}
              <strong className="text-[#0f172a]">Shopee Video</strong>, dan{" "}
              <strong className="text-[#0f172a]">Reels</strong> Indonesia — dalam 30 detik.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Link
                href="/login"
                id="hero-cta-primary"
                className="btn-primary py-3.5 px-8 text-base"
              >
                Generate Ide Konten
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-[var(--color-brand-teal)] border border-[var(--color-brand-teal)]/30 rounded-xl hover:bg-[var(--color-brand-teal)]/5 transition-colors"
              >
                Lihat Cara Kerjanya
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-1.5">
                {["SR", "BK", "YP", "DM"].map((ini, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold ${["bg-[var(--color-brand-teal)]", "bg-slate-500", "bg-[var(--color-brand-coral)]", "bg-amber-500"][i]
                      }`}
                  >
                    {ini}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#475569]">
                <strong className="text-[#0f172a]">2.000+</strong> affiliator sudah pakai
              </p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Preview Card */}
          <div className="flex justify-center lg:justify-end">
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
