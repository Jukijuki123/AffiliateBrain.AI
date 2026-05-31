"use client";

import React from "react";
import Link from "next/link";

export default function CtaFinal() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center">
          {/* Background */}
          <div className="absolute inset-0 bg-[var(--color-brand-teal)]" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}} />

          <div className="relative">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">Mulai Sekarang</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Buat Skrip Viral Pertamamu — Gratis!
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Tidak butuh kartu kredit. Tidak butuh pengalaman copywriting.
            </p>
            <Link
              href="/login"
              id="final-cta-button"
              className="btn-coral inline-flex py-4 px-10 text-base shadow-2xl"
            >
              Daftar & Generate Sekarang
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
