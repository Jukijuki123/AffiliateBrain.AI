"use client";

import React from "react";

const testimonials = [
  {
    name: "Siti Rahayu",
    handle: "@sitirahayu_beauty",
    platform: "TikTok Shop",
    avatar: "SR",
    avatarBg: "bg-[var(--color-brand-coral)]",
    quote:
      "Sebelumnya saya butuh 2 jam untuk bikin satu skrip. Sekarang 30 detik udah jadi dan hasilnya malah lebih bagus. Omset bulanan naik hampir 40%!",
  },
  {
    name: "Budi Santoso",
    handle: "@budi_gadget_id",
    platform: "Shopee Video",
    avatar: "BS",
    avatarBg: "bg-[var(--color-brand-teal)]",
    quote:
      "Skrip yang dihasilkan terasa natural banget, tidak kaku seperti hasil AI lainnya. Pas banget untuk audiens Indonesia yang saya sasar.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[var(--color-brand-coral)] uppercase tracking-widest mb-3">Testimoni</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Kata Mereka yang Sudah Coba
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[#475569] leading-relaxed italic mb-5">
                &quot;{t.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${t.avatarBg}`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0f172a]">{t.name}</p>
                  <p className="text-xs text-[#94a3b8]">{t.handle} · {t.platform}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
