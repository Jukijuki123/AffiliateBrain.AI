"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    colorClasses: "bg-[var(--color-brand-teal-light)] text-[var(--color-brand-teal)]",
    title: "3 Skrip Video Siap Pakai",
    desc: "Dapatkan hook, body, dan CTA lengkap untuk 3 angle konten berbeda — langsung bisa direkam.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
    colorClasses: "bg-slate-100 text-slate-700",
    title: "Caption & Hashtag Set",
    desc: "Caption pendek untuk TikTok/Reels, caption panjang untuk Shopee, plus 20+ hashtag niche yang relevan.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    colorClasses: "bg-[var(--color-brand-coral-light)] text-[var(--color-brand-coral)]",
    title: "Jadwal Posting Optimal",
    desc: "Rekomendasi jam posting terbaik berdasarkan kebiasaan audiens Indonesia di setiap platform.",
  },
];

const steps = [
  {
    num: "01",
    title: "Isi Detail Produk",
    desc: "Masukkan nama produk, link Shopee/Tokopedia, kategori, dan target audiens Anda.",
  },
  {
    num: "02",
    title: "AI Generate Strategi",
    desc: "AffiliateBrain menganalisis produk dan menciptakan blueprint konten yang disesuaikan.",
  },
  {
    num: "03",
    title: "Copy & Publish",
    desc: "Salin skrip, caption, dan hashtag langsung ke TikTok, Shopee Video, atau Reels.",
  },
];

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

// ── Preview Card Component ────────────────────────────────────────────────────

function HeroPreviewCard() {
  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-[var(--color-brand-teal)]/5 rounded-3xl blur-2xl" />

      <div className="relative bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_16px_64px_rgba(0,103,125,0.12)] p-6 max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#f1f5f9]">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-teal)] flex items-center justify-center text-white text-xs font-bold shrink-0">
            AI
          </div>
          <div>
            <p className="text-xs font-semibold text-[#0f172a]">Serum Vitamin C Somethinc</p>
            <p className="text-xs text-[#94a3b8]">Skincare · TikTok Shop</p>
          </div>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            ✓ Generated
          </span>
        </div>

        {/* Script preview */}
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-coral)] mb-1">Hook (0–3 detik)</p>
            <p className="text-sm font-medium text-[#0f172a] leading-relaxed">
              &quot;Guys, kenapa wajahku bisa cerah banget cuma dalam 2 minggu? Ini rahasianya...&quot;
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-teal)] mb-1">Body</p>
            <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
              &quot;Aku udah coba banyak serum Vitamin C, tapi yang ini beda banget. Formulanya stabil, nggak bikin iritasi, dan hasilnya kelihatan setelah 7 hari pemakaian rutin...&quot;
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-teal)] mb-1">CTA</p>
            <p className="text-xs text-[#0f172a] font-semibold">
              &quot;Klik link di bio atau cari di TikTok Shop sekarang, stok terbatas!&quot;
            </p>
          </div>
        </div>

        {/* Platform badges */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#f1f5f9]">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-black text-white">TikTok</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#ee4d2d] text-white">Shopee</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#e1306c] text-white">Reels</span>
          <span className="ml-auto text-[10px] text-[#94a3b8]">3 skrip · 28 hashtag</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/generate");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── NAVBAR ───────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-teal)] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-lg font-bold font-['var(--font-montserrat)'] text-gradient-brand">
              AffiliateBrain
            </span>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-[#475569] hover:text-[var(--color-brand-teal)] transition-colors px-3 py-2"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="btn-primary text-sm py-2.5 px-5"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-hero pt-16 pb-20 sm:pt-24 sm:pb-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e2e8f0] shadow-sm text-sm font-semibold text-[#475569] mb-6">
                <svg className="w-4 h-4 text-[var(--color-brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Dibuat untuk Affiliator Indonesia</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5">
                <span className="text-[#0f172a]">Dari Nama Produk</span>
                <br />
                <span className="text-gradient-brand">Jadi Skrip Viral.</span>
              </h1>

              {/* Sub-copy */}
              <p className="text-lg sm:text-xl text-[#475569] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                AI yang paham budaya <strong className="text-[#0f172a]">TikTok Shop</strong>,{" "}
                <strong className="text-[#0f172a]">Shopee Video</strong>, dan{" "}
                <strong className="text-[#0f172a]">Reels</strong> Indonesia — dalam 30 detik.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link
                  href="/login"
                  id="hero-cta-primary"
                  className="btn-primary py-3.5 px-8 text-base"
                >
                  Coba Gratis — Tanpa Kartu Kredit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-[var(--color-brand-teal)] border border-[var(--color-brand-teal)]/30 rounded-xl hover:bg-[var(--color-brand-teal)]/5 transition-colors"
                >
                  Lihat Cara Kerjanya
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-1.5">
                  {["SR", "BK", "YP", "DM"].map((ini, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold ${
                        ["bg-[var(--color-brand-teal)]", "bg-slate-500", "bg-[var(--color-brand-coral)]", "bg-amber-500"][i]
                      }`}
                    >
                      {ini}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#475569]">
                  <strong className="text-[#0f172a]">2.000+</strong> affiliator sudah pakai
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Preview Card */}
            <div className="flex justify-center lg:justify-end">
              <HeroPreviewCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-[var(--color-brand-teal)] uppercase tracking-widest mb-3">Cara Kerja</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
              3 Langkah Jadi Skrip Viral
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-[var(--color-brand-teal)]/20 opacity-30" />

            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl mb-4 border"
                  style={{
                    borderColor: i === 0 ? "rgba(0, 95, 115, 0.2)" : i === 1 ? "#cbd5e1" : "rgba(249, 87, 56, 0.2)",
                    backgroundColor: i === 0 ? "var(--color-brand-teal-light)" : i === 1 ? "#f1f5f9" : "var(--color-brand-coral-light)",
                    color: i === 0 ? "var(--color-brand-teal)" : i === 1 ? "var(--color-text-secondary)" : "var(--color-brand-coral)"
                  }}
                >
                  <span>{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-[var(--color-brand-teal)] uppercase tracking-widest mb-3">Fitur Unggulan</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a]">
              Semua yang Kamu Butuhkan,{" "}
              <span className="text-gradient-brand">dalam Satu Klik</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="card card-hover p-6 flex flex-col gap-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.colorClasses}`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0f172a] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#475569] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
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

      {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center">
            {/* Background */}
            <div className="absolute inset-0 bg-[var(--color-brand-teal)]" />
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}} />

            <div className="relative">
              <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-3">Mulai Sekarang</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Buat Skrip Viral Pertamamu — Gratis!
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Tidak butuh kartu kredit. Tidak butuh pengalaman copywriting.
              </p>
              <Link
                href="/login"
                id="final-cta-button"
                className="btn-coral inline-flex py-4 px-10 text-base shadow-2xl"
              >
                Daftar & Generate Sekarang
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-[#e2e8f0] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[var(--color-brand-teal)] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gradient-brand">AffiliateBrain.AI</span>
          </div>
          <p className="text-xs text-[#94a3b8] text-center">
            © 2026 AffiliateBrain.AI · Dibuat dengan dedikasi untuk Affiliator Indonesia
          </p>
          <div className="flex gap-4 text-xs text-[#94a3b8]">
            <a href="#" className="hover:text-[var(--color-brand-teal)] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[var(--color-brand-teal)] transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
