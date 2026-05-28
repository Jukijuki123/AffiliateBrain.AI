"use client";
import { Platform } from "@/lib/types";

export default function PlatformSelect({ values, onChange }: { values: Platform[], onChange: (vals: Platform[]) => void }) {
  const platforms: { label: string, val: Platform, desc: string, icon: React.ReactNode, color: string }[] = [
    { 
      label: "TikTok Shop", 
      val: "tiktok", 
      desc: "Skrip pendek, punchy, & trend-focused",
      color: "peer-checked:border-black peer-checked:bg-black/5 peer-checked:text-black",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08.65-.06 1.29-.05 1.94 0 3.39-.77 6.89-3.4 9.1-2.91 2.51-7.23 2.76-10.38.71-3.21-2.01-4.73-6.1-3.7-9.77 1.05-3.97 4.97-6.72 9.07-6.07 1.2.18 2.37.74 3.29 1.56V0h.01zm-3.6 8.52c-2.29-.04-4.44 1.59-4.88 3.85-.49 2.5 1.08 5.07 3.56 5.56 2.45.51 5.01-1.04 5.54-3.49.1-.47.11-.96.11-1.44 0-2.31 0-4.62 0-6.93-1.12.78-2.52 1.24-3.9 1.28l-.43.17z"/>
        </svg>
      )
    },
    { 
      label: "Shopee Video", 
      val: "shopee", 
      desc: "Fokus produk, promo, & diskon seru",
      color: "peer-checked:border-[#ee4d2d] peer-checked:bg-[#ee4d2d]/5 peer-checked:text-[#ee4d2d]",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    { 
      label: "Instagram Reels", 
      val: "reels", 
      desc: "Estetik, premium, & storytelling kreatif",
      color: "peer-checked:border-[var(--color-brand-purple)] peer-checked:bg-[var(--color-brand-purple)]/5 peer-checked:text-[var(--color-brand-purple)]",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    }
  ];

  const toggle = (val: Platform) => {
    if (values.includes(val)) {
      // Pastikan minimal 1 platform terpilih
      if (values.length > 1) {
        onChange(values.filter(v => v !== val));
      }
    } else {
      onChange([...values, val]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {platforms.map((p) => {
        const active = values.includes(p.val);
        return (
          <button
            key={p.val}
            type="button"
            onClick={() => toggle(p.val)}
            className={`group text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer min-h-[90px] flex gap-3 relative ${
              active 
                ? "border-[var(--color-brand-teal)] bg-[var(--color-brand-teal)]/[0.03] text-gray-900 shadow-sm" 
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50"
            }`}
          >
            <div className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              active 
                ? "bg-[var(--color-brand-teal)]/10 text-[var(--color-brand-teal)]" 
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
            }`}>
              {p.icon}
            </div>
            
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-gray-900">{p.label}</span>
              <span className="text-xs text-gray-500 font-['Inter'] leading-normal">{p.desc}</span>
            </div>

            {/* Checkmark indicator */}
            {active && (
              <div className="absolute top-3 right-3 bg-[var(--color-brand-teal)] text-white w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
