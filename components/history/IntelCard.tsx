"use client";

import React from "react";
import Link from "next/link";
import { ProductIntelDocument } from "@/lib/types";
import { Brain } from "lucide-react";

interface IntelCardProps {
  doc: ProductIntelDocument & { type: "product-intel" };
  isDeleting: boolean;
  onDeleteClick: () => void;
}

export default function IntelCard({ doc, isDeleting, onDeleteClick }: IntelCardProps) {
  const dateString = doc.createdAt
    ? new Date(doc.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

  const excerpt = doc.output?.productDNA
    ? doc.output.productDNA.replace(/[#*`\n]/g, " ").substring(0, 140).trim() + "..."
    : "Detail ulasan psikologi, trigger, dan hambatan beli...";

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.02)] border border-gray-100 hover:border-[var(--color-brand-teal)]/30 hover:shadow-[0_8px_30px_rgba(0,103,125,0.06)] transition-all duration-300 flex flex-col justify-between gap-5 relative group">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-4">
          <span className="text-[10px] font-bold px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-gray-400 rounded-lg uppercase tracking-wider font-sans">
            {doc.category === "skincare" ? "Skincare" : doc.category === "fashion" ? "Fashion" : doc.category || "Umum"}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wide font-sans bg-[var(--color-brand-teal)]/10 text-[var(--color-brand-teal)] border border-[var(--color-brand-teal)]/20">
              Intelijen Produk <Brain className="w-3 h-3 inline" />
            </span>
            {doc.marketplace && (
              <span className="text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wide font-sans bg-orange-50 text-orange-600 border border-orange-100">
                {doc.marketplace}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 font-['Montserrat'] leading-tight group-hover:text-[var(--color-brand-teal)] transition-colors line-clamp-1">
          {doc.title}
        </h3>

        <p className="text-gray-400 text-xs font-['Inter'] leading-relaxed italic line-clamp-2 bg-slate-50/50 p-3 rounded-xl border border-slate-50/20">
          {excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-1">
        <span className="text-xs text-gray-400 font-['Inter'] font-medium">
          {dateString}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={onDeleteClick}
            disabled={isDeleting}
            type="button"
            className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90 cursor-pointer min-h-[38px] flex items-center justify-center border border-transparent hover:border-rose-100"
            title="Hapus dari riwayat"
          >
            {isDeleting ? (
              <span className="inline-block w-4 h-4 border-2 border-rose-500/40 border-t-rose-500 rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
          <Link
            href={`/product-intel/result/${doc.id}`}
            className="px-4 py-2 bg-slate-50 text-gray-700 hover:bg-[var(--color-brand-teal)] hover:text-white border border-gray-200 hover:border-[var(--color-brand-teal)] text-xs font-bold rounded-xl transition-all active:scale-95 min-h-[38px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow"
          >
            Lihat Hasil
          </Link>
        </div>
      </div>
    </div>
  );
}
