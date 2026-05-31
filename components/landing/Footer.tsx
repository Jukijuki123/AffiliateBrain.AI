"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e2e8f0] py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="AffiliateBrain Logo" width={24} height={24} className="rounded-md object-contain" />
          <span className="text-sm font-bold text-gradient-brand">AffiliateBrain.AI</span>
        </div>
        <p className="text-xs text-[#94a3b8] text-center">
          © 2026 AffiliateBrain.AI · Dibuat dengan dedikasi untuk Affiliator Indonesia
        </p>
        <div className="flex gap-4 text-xs text-[#94a3b8]">
          <a href="#" className="hover:text-[var(--color-brand-teal)] transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-[var(--color-brand-teal)] transition-colors">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
}
