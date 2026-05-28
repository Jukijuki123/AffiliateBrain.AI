import { Blueprint } from "@/lib/types";

export default function BlueprintSection({ blueprint }: { blueprint: Blueprint }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.03)] border border-gray-100">
      <div className="flex items-center gap-2.5 mb-6">
        <svg className="w-6 h-6 text-[var(--color-brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h2 className="text-xl font-bold font-['Montserrat'] text-[var(--color-brand-teal)]">
          Cetak Biru Strategi Konten
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-['Inter']">Target Pembeli</h3>
          <p className="text-gray-800 text-sm leading-relaxed font-medium font-['Inter']">{blueprint.targetAudience}</p>
        </div>
        
        <div className="bg-slate-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-['Inter']">Masalah yang Dipecahkan</h3>
          <p className="text-gray-800 text-sm leading-relaxed font-medium font-['Inter']">{blueprint.painPoint}</p>
        </div>
        
        <div className="md:col-span-2 bg-[var(--color-brand-teal-light)] p-5 rounded-2xl border border-[var(--color-brand-teal)]/10 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-brand-teal)]/5 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-xs font-bold text-[var(--color-brand-teal)] uppercase tracking-wider font-['Inter']">Manfaat & Nilai Jual Utama</h3>
          <p className="text-gray-900 font-bold text-base sm:text-lg leading-relaxed font-['Montserrat'] mt-1">
            {blueprint.keyBenefit}
          </p>
        </div>
      </div>
    </div>
  );
}
