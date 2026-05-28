"use client";
import { AudienceType } from "@/lib/types";

export default function AudienceSelect({ value, onChange }: { value: AudienceType | "", onChange: (val: AudienceType) => void }) {
  const audiences: { label: string, val: AudienceType, icon: React.ReactNode }[] = [
    { 
      label: "Remaja Wanita", 
      val: "remaja_wanita", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      label: "Remaja Pria", 
      val: "remaja_pria", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )
    },
    { 
      label: "Dewasa Wanita", 
      val: "dewasa_wanita", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0zM12 14.5a8.5 8.5 0 00-8.5 8.5h17a8.5 8.5 0 00-8.5-8.5z" />
        </svg>
      )
    },
    { 
      label: "Dewasa Pria", 
      val: "dewasa_pria", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      label: "Ibu Rumah Tangga", 
      val: "ibu_rumah_tangga", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    { 
      label: "Mahasiswa", 
      val: "mahasiswa", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84m-20.798 0l2.771-.864m15.256.864l2.772-.864M12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      )
    },
    { 
      label: "Pekerja Kantoran", 
      val: "pekerja_kantoran", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.453.254-.718.254H4.875a1.125 1.125 0 01-.718-.254m16.5 0V12m-16.5 2.15V12m0 2.15L3 14.15m0 0a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.11 48.11 0 013.413-.387m0 0V4.75A1.75 1.75 0 019.25 3h5.5a1.75 1.75 0 011.75 1.75v1.43m-9 0h9" />
        </svg>
      )
    },
    { 
      label: "Umum", 
      val: "umum", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.793.793a1 1 0 001.414 0l1.25-1.25a1 1 0 00-1.414-1.414l-1.25 1.25a1 1 0 000 1.414zm9.9-1.614l.793-.793a1 1 0 011.414 0l1.25 1.25a1 1 0 01-1.414 1.414l-1.25-1.25a1 1 0 010-1.414zm-9.9 14.14l.793-.793a1 1 0 011.414 0l1.25 1.25a1 1 0 01-1.414 1.414l-1.25-1.25a1 1 0 010-1.414zm9.9-1.614l.793.793a1 1 0 001.414 0l1.25-1.25a1 1 0 00-1.414-1.414l-1.25 1.25a1 1 0 000 1.414zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
      {audiences.map((c) => {
        const active = value === c.val;
        return (
          <button
            key={c.val}
            type="button"
            onClick={() => onChange(c.val)}
            className={`p-4 rounded-xl border text-sm transition-all text-center flex flex-col items-center justify-center gap-2.5 cursor-pointer min-h-[90px] ${
              active 
                ? "bg-[var(--color-brand-teal)]/[0.04] border-[var(--color-brand-teal)] text-[var(--color-brand-teal)] font-bold shadow-sm ring-1 ring-[var(--color-brand-teal)]/20" 
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50/50 hover:text-gray-800"
            }`}
          >
            <div className={`shrink-0 transition-colors ${active ? "text-[var(--color-brand-teal)]" : "text-gray-400"}`}>
              {c.icon}
            </div>
            <span className="text-xs leading-tight font-semibold">{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
