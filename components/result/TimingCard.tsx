import { UploadTiming } from "@/lib/types";

export default function TimingCard({ timing }: { timing: UploadTiming }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.03)] border border-gray-100">
      <div className="flex items-center gap-2.5 mb-2">
        <svg className="w-6 h-6 text-[var(--color-brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold font-['Montserrat'] text-[var(--color-brand-teal)]">
          Rekomendasi Waktu Upload
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 mb-6 font-['Inter']">
        Berdasarkan jam puncak aktivitas/keterlibatan audiens di Indonesia.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TikTok */}
        {timing.tiktok && timing.tiktok.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-950 text-white flex flex-col gap-3 relative overflow-hidden group shadow-sm border border-slate-900">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl" />
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17v4.03c-1.44-.17-2.86-.74-3.99-1.72-.08.65-.06 1.29-.05 1.94 0 3.39-.77 6.89-3.4 9.1-2.91 2.51-7.23 2.76-10.38.71-3.21-2.01-4.73-6.1-3.7-9.77 1.05-3.97 4.97-6.72 9.07-6.07 1.2.18 2.37.74 3.29 1.56V0h.01z" />
                </svg>
              </span>
              <h3 className="font-bold text-sm font-['Montserrat']">TikTok</h3>
            </div>
            <ul className="text-xs text-slate-300 font-['Inter'] space-y-2">
              {timing.tiktok.map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Shopee */}
        {timing.shopee && timing.shopee.length > 0 && (
          <div className="p-5 rounded-2xl bg-[#ee4d2d] text-white flex flex-col gap-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl" />
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 01-8 0M3 5h18M5 5V18a2 2 0 002 2h10a2 2 0 002-2V5" />
                </svg>
              </span>
              <h3 className="font-bold text-sm font-['Montserrat']">Shopee Video</h3>
            </div>
            <ul className="text-xs text-orange-100 font-['Inter'] space-y-2">
              {timing.shopee.map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reels */}
        {timing.reels && timing.reels.length > 0 && (
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col gap-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl" />
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect width="18" height="18" x="3" y="3" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="16.5" cy="7.5" r="1" />
                </svg>
              </span>
              <h3 className="font-bold text-sm font-['Montserrat']">IG Reels</h3>
            </div>
            <ul className="text-xs text-slate-300 font-['Inter'] space-y-2">
              {timing.reels.map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
