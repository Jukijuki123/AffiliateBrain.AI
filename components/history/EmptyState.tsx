"use client";

import React from "react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="bg-white p-12 rounded-3xl shadow-[0_4px_35px_rgba(0,103,125,0.03)] border border-gray-100 text-center flex flex-col items-center max-w-xl mx-auto mt-6">
      <div className="relative w-24 h-24 mb-6 text-gray-300 flex items-center justify-center bg-slate-50 rounded-full border border-gray-50">
        <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.25A2.25 2.25 0 0118 21.75H6a2.25 2.25 0 01-2.25-2.25V15.75a2.25 2.25 0 012.25-2.25zM2.25 9.75h19.5m-19.5 0A2.25 2.25 0 014.5 7.5h15A2.25 2.25 0 0121.75 9.75m-19.5 0V5.625c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125V9.75" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Montserrat']">Kotak Masuk Riwayat Kosong</h3>
      <p className="text-gray-500 mb-8 font-['Inter'] text-sm leading-relaxed max-w-sm">
        Anda belum pernah membuat analisis produk atau strategi skrip apa pun. Mari buat sekarang!
      </p>
      <div className="flex gap-3 w-full font-sans">
        <Link
          href="/product-intel"
          className="flex-1 border border-[var(--color-brand-teal)] text-[var(--color-brand-teal)] hover:bg-[var(--color-brand-teal-light)] px-6 py-3.5 rounded-xl font-bold transition-all text-center text-sm"
        >
          Analisis Produk
        </Link>
        <Link
          href="/generate"
          className="flex-1 bg-[var(--color-brand-teal)] text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-[0_4px_12px_rgba(0,103,125,0.2)] active:scale-95 transition-all text-center text-sm"
        >
          Generate Skrip
        </Link>
      </div>
    </div>
  );
}
