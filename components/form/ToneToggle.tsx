"use client";
import { ToneType } from "@/lib/types";

export default function ToneToggle({ value, onChange }: { value: ToneType, onChange: (val: ToneType) => void }) {
  const options: { label: string, val: ToneType, desc: string, icon: React.ReactNode, activeClass: string }[] = [
    { 
      label: "Formal", 
      val: "formal", 
      desc: "Sopan, edukatif, & profesional",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 9h6m-6 4h6m-6 4h6" />
        </svg>
      ),
      activeClass: "border-[var(--color-brand-teal)] bg-[var(--color-brand-teal)]/[0.03] text-[var(--color-brand-teal)] ring-1 ring-[var(--color-brand-teal)]/20"
    },
    { 
      label: "Santai", 
      val: "santai", 
      desc: "Ramah, luwes, & bercerita",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      activeClass: "border-[var(--color-brand-teal)] bg-[var(--color-brand-teal)]/[0.03] text-gray-900 ring-1 ring-[var(--color-brand-teal)]/20"
    },
    { 
      label: "Gen-Z", 
      val: "genz", 
      desc: "Bahasa gaul & tren FYP",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
      activeClass: "border-[var(--color-brand-coral)] bg-[var(--color-brand-coral)]/[0.03] text-[var(--color-brand-coral)] ring-1 ring-[var(--color-brand-coral)]/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {options.map((opt) => {
        const active = value === opt.val;
        return (
          <button
            key={opt.val}
            type="button"
            onClick={() => onChange(opt.val)}
            className={`group text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[90px] flex gap-3 relative ${
              active 
                ? opt.activeClass 
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50/50"
            }`}
          >
            <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 text-xl transition-colors ${
              active 
                ? "bg-white shadow-sm" 
                : "bg-gray-100 group-hover:bg-gray-200"
            }`}>
              {opt.icon}
            </div>
            
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-gray-900">{opt.label}</span>
              <span className="text-xs text-gray-500 font-['Inter'] leading-normal">{opt.desc}</span>
            </div>

            {/* Radio-like indicator */}
            {active && (
              <div className="absolute top-3 right-3 w-4 h-4 rounded-full flex items-center justify-center border-2 border-current">
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
