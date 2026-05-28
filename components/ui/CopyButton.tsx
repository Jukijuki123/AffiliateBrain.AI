"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

export default function CopyButton({ text, className = "" }: { text: string, className?: string }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast("Teks berhasil disalin ke clipboard! 📋", "info");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
      showToast("Gagal menyalin teks.", "error");
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer border active:scale-95 ${
        copied 
          ? "bg-[var(--color-state-success)]/10 border-[var(--color-state-success)]/30 text-[var(--color-state-success)] font-bold" 
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50/50 hover:text-gray-900 shadow-sm"
      } ${className}`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <span>Salin</span>
        </>
      )}
    </button>
  );
}
