"use client";

import { useState } from "react";
import { AnglePreview, Script } from "@/lib/types";
import CopyButton from "../ui/CopyButton";

const badgeColors: Record<string, string> = {
  A1: "bg-rose-50 text-rose-700 border border-rose-100", // FOMO
  A2: "bg-sky-50 text-sky-700 border border-sky-100",   // Testimoni
  A3: "bg-teal-50 text-teal-800 border border-teal-100",   // Edukasi
  A4: "bg-amber-50 text-amber-700 border border-amber-100", // Komedi
  A5: "bg-pink-50 text-pink-700 border border-pink-100", // Before/After
};

const angleNames: Record<string, string> = {
  A1: "FOMO / Urgensi",
  A2: "Testimoni / Review",
  A3: "Edukasi / Solutif",
  A4: "Komedi / Drama",
  A5: "Sebelum vs Sesudah",
};

export default function AngleRoulette({ angles, scripts }: { angles: AnglePreview[], scripts: Script[] }) {
  const [activeCode, setActiveCode] = useState(angles[0]?.code);
  const activeScript = scripts.find(s => s.angleCode === activeCode);

  return (
    <div className="flex flex-col gap-6">
      {/* Horizontal Scroller for Angles */}
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x scrollbar-thin scrollbar-thumb-gray-200">
        {angles.map((angle) => {
          const active = activeCode === angle.code;
          return (
            <button
              key={angle.code}
              type="button"
              onClick={() => setActiveCode(angle.code)}
              className={`flex-none snap-start p-5 rounded-2xl border text-left min-w-[250px] max-w-[280px] cursor-pointer transition-all duration-200 ${
                active
                  ? "border-[var(--color-brand-teal)] bg-[var(--color-brand-teal-light)] shadow-[0_8px_24px_rgba(0,103,125,0.06)] ring-1 ring-[var(--color-brand-teal)]/20"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${badgeColors[angle.code] || "bg-gray-100 text-gray-700"}`}>
                  {angleNames[angle.code] || angle.name}
                </span>
                {active && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-teal)] animate-pulse" />
                )}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm font-['Inter'] leading-relaxed line-clamp-2">
                {angle.preview}
              </p>
            </button>
          );
        })}
      </div>

      {/* Script Teleprompter Card */}
      {activeScript && (
        <div className="bg-white rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.03)] border border-gray-100 overflow-hidden">
          {/* Header Panel */}
          <div className="p-4 sm:p-5 bg-slate-50/50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[var(--color-brand-teal)]/10 text-[var(--color-brand-teal)] flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </span>
              <div>
                <h3 className="font-bold text-gray-950 font-['Montserrat'] text-sm sm:text-base">Skrip Video Siap Rekam</h3>
                <p className="text-xs text-gray-400 font-['Inter']">Estimasi Durasi: <strong>{activeScript.estimatedDuration} detik</strong></p>
              </div>
            </div>
            
            <CopyButton 
              text={`[HOOK (0-3s)]\n${activeScript.hook}\n\n[BODY]\n${activeScript.body}\n\n[CALL TO ACTION]\n${activeScript.cta}`} 
              className="!text-xs !px-4 !py-2.5"
            />
          </div>
          
          {/* Teleprompter Blocks */}
          <div className="p-6 flex flex-col gap-6 font-mono text-sm">
            {/* Hook */}
            <div className="border-l-4 border-rose-500 pl-4 relative group">
              <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                <CopyButton text={activeScript.hook} />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md uppercase font-sans">Hook (0-3s)</span>
                <span className="text-xs text-gray-400 font-sans">Stop Scroll! Bikin penonton tertahan.</span>
              </div>
              <p className="text-gray-950 font-bold text-base leading-relaxed whitespace-pre-wrap font-mono select-all">
                &quot;{activeScript.hook}&quot;
              </p>
            </div>

            {/* Divider Line */}
            <div className="border-l-4 border-dashed border-gray-200 h-2 ml-0" />

            {/* Body */}
            <div className="border-l-4 border-[var(--color-brand-teal)] pl-4 relative group">
              <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                <CopyButton text={activeScript.body} />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold text-[var(--color-brand-teal)] bg-[var(--color-brand-teal-light)] border border-[var(--color-brand-teal)]/10 px-2 py-0.5 rounded-md uppercase font-sans">Alur Cerita / Isi</span>
                <span className="text-xs text-gray-400 font-sans">Tunjukkan masalah & solusinya.</span>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-mono select-all">
                {activeScript.body}
              </p>
            </div>

            {/* Divider Line */}
            <div className="border-l-4 border-dashed border-gray-200 h-2 ml-0" />

            {/* CTA */}
            <div className="border-l-4 border-[var(--color-brand-coral)] pl-4 relative group">
              <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                <CopyButton text={activeScript.cta} />
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold text-[var(--color-brand-coral)] bg-[var(--color-brand-coral-light)] border border-[var(--color-brand-coral)]/20 px-2 py-0.5 rounded-md uppercase font-sans">Call to Action</span>
                <span className="text-xs text-gray-400 font-sans">Ajak penonton klik keranjang & beli.</span>
              </div>
              <p className="text-gray-950 font-bold text-base leading-relaxed whitespace-pre-wrap font-mono select-all">
                &quot;{activeScript.cta}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
