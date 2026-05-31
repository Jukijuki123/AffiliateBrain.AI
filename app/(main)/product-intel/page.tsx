"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductIntelForm from "@/components/form/ProductIntelForm";
import { ProductIntelInput } from "@/lib/types";
import { auth } from "@/lib/firebase";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
import { Rocket, Check } from "lucide-react";

const loadingMessages = [
  "Membaca data dan spesifikasi produk...",
  "Melakukan scraping link produk untuk riset ulasan...",
  "Mengurai psikologi, trigger belanja, dan hambatan calon pembeli...",
  "Memetakan 10 pilar analisis kecerdasan produk...",
  "Menyusun hook video scroll-stopping untuk afiliator...",
  "Hampir selesai, memformat laporan intelijen produk...",
];

export default function ProductIntelPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();



  const handleGenerate = async (data: ProductIntelInput) => {
    setIsGenerating(true);
    setGlobalError("");

    try {
      if (!auth || !auth.currentUser) {
        throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
      }
      const token = await auth.currentUser.getIdToken();

      const res = await fetch("/api/product-intel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      let resData;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response received:", text);
        throw new Error("Terjadi kesalahan pada server. Silakan coba lagi.");
      }

      if (!res.ok) {
        throw new Error(resData?.error || "Gagal menghasilkan analisis produk");
      }

      router.push(`/product-intel/result/${resData.id}?success=true`);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan jaringan.";
      setGlobalError(errorMessage);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center lg:text-left">
        <span className="text-[10px] font-bold text-white bg-[var(--color-brand-teal)] px-3 py-1 rounded-full uppercase tracking-wider font-sans inline-block mb-3">
          Fitur Premium Baru <Rocket className="w-3.5 h-3.5 inline" />
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[var(--color-brand-teal)] leading-tight pb-1">
          Analisis Kecerdasan Produk AI
        </h1>
        <p className="text-gray-500 mt-2 font-['Inter'] max-w-xl text-sm sm:text-base">
          Temukan 10 pilar analisis psikologi pembeli, trigger konversi, tag ulasan, serta formula angle & hook video komersial.
        </p>
      </div>

      {isGenerating ? (
        <LoadingOverlay title="AI Sedang Menganalisis Produk..." messages={loadingMessages} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Form Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {globalError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-['Inter'] text-sm flex gap-2.5 items-start">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{globalError}</span>
              </div>
            )}
            <ProductIntelForm onSubmit={handleGenerate} isGenerating={false} />
          </div>

          {/* Sidebar Insights */}
          <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Guide Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[var(--color-brand-teal)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-gray-900 font-['Montserrat']">Kenapa Riset Produk?</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-['Inter'] mb-3">
                Sebelum membuat konten, memahami **psikologi produk** dan **hambatan pembeli** adalah kunci utama untuk meningkatkan rasio klik & penjualan (conversion rate) afiliasi Anda.
              </p>
              <ul className="flex flex-col gap-3 text-xs text-gray-600 font-['Inter']">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[var(--color-brand-teal)]" strokeWidth={3} />
                  <span><strong>Product DNA</strong>: Mengapa orang membeli secara impulsif.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[var(--color-brand-teal)]" strokeWidth={3} />
                  <span><strong>Objection Mapping</strong>: Menangkis keraguan pembeli sebelum membeli.</span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-[var(--color-brand-teal)]" strokeWidth={3} />
                  <span><strong>Hook Generator</strong>: Formula video viral 3 detik pertama.</span>
                </li>
              </ul>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[var(--color-brand-teal)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-gray-900 font-['Montserrat']">Scraping URL Otomatis</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-['Inter']">
                Masukkan Link Produk Shopee, Tokopedia, atau marketplace lainnya. Mesin AI kami akan secara otomatis **mengikis (scrape) deskripsi & judul web** untuk riset produk yang jauh lebih akurat tanpa perlu diketik manual!
              </p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
