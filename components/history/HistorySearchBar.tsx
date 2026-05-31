"use client";

import React from "react";

interface HistorySearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function HistorySearchBar({
  value,
  onChange,
  placeholder = "Cari produk di riwayat...",
}: HistorySearchBarProps) {
  return (
    <div className="relative mb-8 max-w-md">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]/15 focus:border-[var(--color-brand-teal)] text-sm text-gray-900 bg-white placeholder:text-gray-400 transition-all min-h-[44px]"
      />
    </div>
  );
}
