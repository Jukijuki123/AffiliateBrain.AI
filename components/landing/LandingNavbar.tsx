"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#how-it-works", label: "Cara Kerja" },
  { href: "#features", label: "Fitur" },
  { href: "#product-intelligence", label: "Analisis Produk" },
  { href: "#testimonials", label: "Testimoni" },
];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="AffiliateBrain Logo" width={40} height={40} className="rounded-lg object-contain" />
          <span className="text-lg font-bold font-['var(--font-montserrat)'] text-gradient-brand">
            AffiliateBrain
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#475569] hover:text-[var(--color-brand-teal)] transition-colors px-3 py-2 rounded-lg hover:bg-[var(--color-brand-teal)]/5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Nav Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold text-[#475569] hover:text-[var(--color-brand-teal)] transition-colors px-3 py-2"
          >
            Masuk
          </Link>
          <Link
            href="/login"
            className="btn-primary text-sm py-2.5 px-5"
          >
            Coba Gratis
          </Link>
        </div>

        {/* Mobile: Actions + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/login"
            className="btn-primary text-xs py-2 px-4"
          >
            Coba Gratis
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-[#475569] hover:bg-[#f1f5f9] transition-colors"
            aria-label="Menu navigasi"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e2e8f0] bg-white px-4 py-3 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#475569] hover:text-[var(--color-brand-teal)] hover:bg-[var(--color-brand-teal)]/5 transition-colors px-4 py-2.5 rounded-xl"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-[#f1f5f9] mt-2 pt-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold text-[#475569] hover:text-[var(--color-brand-teal)] px-4 py-2.5 rounded-xl transition-colors"
            >
              Masuk ke Akun
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
