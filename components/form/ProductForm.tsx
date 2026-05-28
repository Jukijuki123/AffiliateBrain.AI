"use client";
import { useState } from "react";
import { GenerationInput, Platform, ToneType, ProductCategory, AudienceType } from "@/lib/types";
import ToneToggle from "./ToneToggle";
import PlatformSelect from "./PlatformSelect";
import CategorySelect from "./CategorySelect";
import AudienceSelect from "./AudienceSelect";

export default function ProductForm({ onSubmit, isGenerating }: { onSubmit: (data: GenerationInput) => void, isGenerating: boolean }) {
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [category, setCategory] = useState<ProductCategory | "">("");
  const [platforms, setPlatforms] = useState<Platform[]>(["tiktok"]);
  const [audience, setAudience] = useState<AudienceType | "">("");
  const [tone, setTone] = useState<ToneType>("santai");
  const [uniquePoint, setUniquePoint] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!productName.trim() && !productUrl.trim()) {
      return setError("Nama produk atau URL wajib diisi");
    }
    if (!category) return setError("Kategori wajib dipilih");
    if (platforms.length === 0) return setError("Pilih minimal 1 platform");
    if (!audience) return setError("Target audiens wajib dipilih");

    onSubmit({
      productName,
      productUrl,
      category: category as ProductCategory,
      platforms,
      audience: audience as AudienceType,
      tone,
      uniquePoint
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.04)] border border-gray-100 flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-['Inter'] flex gap-2 border border-red-100">
          <svg className="w-5 h-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {/* Product Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat'] flex items-center gap-1">
          Nama Produk atau Layanan <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Tulis nama brand dan model produk yang ingin dipromosikan.</p>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Cth: Serum Vitamin C Somethinc"
            className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]/15 focus:border-[var(--color-brand-teal)] text-sm text-gray-900 bg-white placeholder:text-gray-400 transition-all min-h-[44px]"
          />
        </div>
      </div>

      {/* Product URL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat']">
          Link Toko / Produk (Opsional)
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Membantu AI menganalisis detail produk langsung dari e-commerce.</p>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
          <input 
            type="url" 
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="Cth: https://shopee.co.id/somethinc.official/..."
            className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]/15 focus:border-[var(--color-brand-teal)] text-sm text-gray-900 bg-white placeholder:text-gray-400 transition-all min-h-[44px]"
          />
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat'] flex items-center gap-1">
          Kategori Produk <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Pilih kategori yang paling sesuai dengan jenis barang Anda.</p>
        <div className="mt-1">
          <CategorySelect value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Platform */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat'] flex items-center gap-1">
          Platform Target <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Anda bisa memilih lebih dari satu platform sekaligus.</p>
        <div className="mt-1">
          <PlatformSelect values={platforms} onChange={setPlatforms} />
        </div>
      </div>

      {/* Audience */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat'] flex items-center gap-1">
          Target Pembeli Utama <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Pilih kelompok pembeli yang paling potensial membeli produk ini.</p>
        <div className="mt-1">
          <AudienceSelect value={audience} onChange={setAudience} />
        </div>
      </div>

      {/* Gaya Bahasa */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat'] flex items-center gap-1">
          Gaya Bahasa Video <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Pilih nada bicara AI untuk menyusun alur cerita skrip.</p>
        <div className="mt-1">
          <ToneToggle value={tone} onChange={setTone} />
        </div>
      </div>

      {/* Unique Point */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-bold text-gray-800 font-['Montserrat']">
          Keunikan & Kelebihan Produk (Opsional)
        </label>
        <p className="text-xs text-gray-400 font-['Inter'] -mt-1">Cth: Sedang diskon 50%, free gift cermin, bahan tebal tidak menerawang, BPOM.</p>
        <div className="relative mt-1">
          <div className="absolute top-3 left-4 pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <textarea 
            value={uniquePoint}
            onChange={(e) => setUniquePoint(e.target.value)}
            placeholder="Tulis kelebihan produk Anda di sini agar AI bisa menyusun selling point yang tajam..."
            className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]/15 focus:border-[var(--color-brand-teal)] text-sm text-gray-900 bg-white placeholder:text-gray-400 transition-all min-h-[100px] font-['Inter']"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isGenerating}
        className="w-full bg-[var(--color-brand-teal)] hover:bg-[#004d5e] text-white py-4 rounded-xl font-bold text-base hover:shadow-[0_8px_20px_rgba(0,95,115,0.15)] active:scale-[0.98] transition-all disabled:opacity-50 mt-4 flex justify-center items-center gap-2 min-h-[48px] cursor-pointer"
      >
        {isGenerating ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>Menganalisa Produk...</span>
          </>
        ) : (
          <>
            <span>Generate Strategi Skrip</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
