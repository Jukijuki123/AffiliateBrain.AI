"use client";
import { ProductCategory } from "@/lib/types";

export default function CategorySelect({ value, onChange }: { value: ProductCategory | "", onChange: (val: ProductCategory) => void }) {
  const categories: { label: string, val: ProductCategory }[] = [
    { label: "Skincare & Kecantikan", val: "skincare" },
    { label: "Fashion & Pakaian", val: "fashion" },
    { label: "Elektronik & Gadget", val: "elektronik" },
    { label: "Makanan & Minuman", val: "makanan" },
    { label: "Kesehatan & Suplemen", val: "kesehatan" },
    { label: "Rumah Tangga", val: "rumah_tangga" },
    { label: "Olahraga", val: "olahraga" },
    { label: "Otomotif", val: "otomotif" },
    { label: "Lainnya", val: "lainnya" },
  ];

  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ProductCategory)}
        className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]/15 focus:border-[var(--color-brand-teal)] bg-white text-gray-900 text-sm min-h-[44px] appearance-none cursor-pointer transition-all"
      >
        <option value="" disabled className="text-gray-400">Pilih kategori produk...</option>
        {categories.map((c) => (
          <option key={c.val} value={c.val} className="text-gray-900 py-2">
            {c.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
