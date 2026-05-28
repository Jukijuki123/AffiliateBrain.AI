"use client";

import { useState } from "react";
import { Copywriting } from "@/lib/types";
import CopyButton from "../ui/CopyButton";
import { useToast } from "@/components/ui/Toast";

export default function CopywritingAssets({ data }: { data: Copywriting }) {
  const { showToast } = useToast();
  const hashtagsArray = [
    ...(data.hashtags?.trending || []),
    ...(data.hashtags?.niche || []),
    ...(data.hashtags?.product || [])
  ];

  const allHashtags = hashtagsArray.join(" ");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopyTag = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopiedTag(tag);
      showToast(`Hashtag ${tag} berhasil disalin! 🏷️`, "info");
      setTimeout(() => setCopiedTag(null), 1500);
    } catch (err) {
      console.error(err);
      showToast("Gagal menyalin hashtag.", "error");
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.03)] border border-gray-100">
      <div className="flex items-center gap-2.5 mb-6">
        <svg className="w-6 h-6 text-[var(--color-brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <h2 className="text-xl font-bold font-['Montserrat'] text-[var(--color-brand-teal)]">
          Aset Copywriting & Sosmed
        </h2>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* Short Caption */}
        <div className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <h3 className="text-sm font-bold text-gray-800 font-['Montserrat']">Caption Pendek (TikTok / Reels)</h3>
            </div>
            <CopyButton text={data.captionShort} />
          </div>
          <p className="text-gray-600 bg-slate-50/50 p-4 rounded-xl text-sm leading-relaxed border border-gray-50 font-['Inter']">
            {data.captionShort}
          </p>
        </div>

        {/* Long Caption */}
        <div className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <h3 className="text-sm font-bold text-gray-800 font-['Montserrat']">Caption Panjang (Shopee Video / Deskripsi)</h3>
            </div>
            <CopyButton text={data.captionLong} />
          </div>
          <p className="text-gray-600 bg-slate-50/50 p-4 rounded-xl text-sm leading-relaxed border border-gray-50 whitespace-pre-wrap font-['Inter']">
            {data.captionLong}
          </p>
        </div>

        {/* Hashtags */}
        <div className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-teal)]" />
              <h3 className="text-sm font-bold text-gray-800 font-['Montserrat']">Kombinasi Hashtag Viral</h3>
            </div>
            <CopyButton text={allHashtags} />
          </div>
          
          <div className="bg-slate-50/50 p-4 rounded-xl border border-gray-50 flex flex-col gap-3">
            <p className="text-xs text-gray-400 font-['Inter']">Tip: Klik salah satu tag di bawah untuk menyalin tag tersebut saja secara instan.</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {hashtagsArray.map((tag, idx) => {
                const isCopied = copiedTag === tag;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCopyTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-95 border ${
                      isCopied 
                        ? "bg-[var(--color-state-success)] border-[var(--color-state-success)] text-white scale-105 shadow-sm" 
                        : "bg-white border-gray-200 text-[var(--color-brand-teal)] hover:border-[var(--color-brand-teal)] hover:bg-[var(--color-brand-teal)]/[0.02]"
                    }`}
                  >
                    {isCopied ? "✓ Tersalin!" : tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
