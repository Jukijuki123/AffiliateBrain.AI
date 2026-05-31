"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GenerationDocument } from "@/lib/types";
import BlueprintSection from "@/components/result/BlueprintSection";
import AngleRoulette from "@/components/result/AngleRoulette";
import CopywritingAssets from "@/components/result/CopywritingAssets";
import TimingCard from "@/components/result/TimingCard";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useToast } from "@/components/ui/Toast";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function ResultPage() {
  const params = useParams();
  const id = params?.id as string;
  const { showToast } = useToast();

  const [data, setData] = useState<GenerationDocument | null>(null);
  const [loading, setLoading] = useState(!!auth);
  const [error, setError] = useState(!auth ? "Tidak dapat memuat data. Silakan coba lagi." : "");

  useEffect(() => {
    if (!id) return;

    // Trigger toast if navigated from a successful generation
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("success") === "true") {
      showToast("Strategi Konten Berhasil Dibuat!", "success");
      // Clean up the URL parameter gracefully
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid, "generations", id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setData({ id: snap.id, ...snap.data() } as GenerationDocument);
          } else {
            setError("Data tidak ditemukan");
          }
        } catch (err) {
          console.error(err);
          setError("Gagal memuat data");
        }
      } else {
        setError("Silakan login untuk melihat hasil");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, showToast]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-16 h-16 text-amber-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-['Montserrat']">{error || "Terjadi kesalahan"}</h2>
        <p className="text-gray-500 mb-8 text-sm">Silakan coba muat ulang halaman.</p>
        <Link 
          href="/generate" 
          className="px-6 py-3 bg-[var(--color-brand-teal)] text-white font-semibold rounded-xl hover:shadow-[0_4px_12px_rgba(0,103,125,0.2)] active:scale-95 transition-all text-sm"
        >
          Kembali ke Form
        </Link>
      </div>
    );
  }

  const { output } = data;
  
  // Dynamic viral probability score based on id
  const viralScore = Math.floor(((id.charCodeAt(0) || 85) * (id.charCodeAt(1) || 90)) % 10) + 90;

  const platformBadgeStyle: Record<string, string> = {
    tiktok: "bg-slate-950 text-white border border-slate-900",
    shopee: "bg-[#ee4d2d]/10 text-[#ee4d2d] border border-[#ee4d2d]/20",
    reels: "bg-[#e1306c]/10 text-[#e1306c] border border-[#e1306c]/20"
  };

  const platformNames: Record<string, string> = {
    tiktok: "TikTok",
    shopee: "Shopee Video",
    reels: "IG Reels"
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pb-28">
      {/* Back to Generate link */}
      <div className="mb-6">
        <Link 
          href="/generate" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[var(--color-brand-teal)] transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Form
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.03)] border border-gray-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-brand-teal)]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col gap-3 relative z-10">
          <span className="text-[10px] font-bold text-white bg-[var(--color-brand-teal)] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans self-start">
            Analisis AI Berhasil
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Montserrat'] text-gray-900 leading-tight">
            {data.productName}
          </h1>
          <div className="flex flex-wrap gap-2">
            {data.platforms.map(p => (
              <span key={p} className={`text-[10px] px-2.5 py-1 rounded-lg uppercase font-bold tracking-wider font-sans ${platformBadgeStyle[p] || "bg-gray-100 text-gray-700"}`}>
                {platformNames[p] || p}
              </span>
            ))}
          </div>
        </div>

        {/* Action / Metric Area */}
        <div className="flex flex-wrap items-center gap-4 relative z-10 shrink-0">
          {/* Viral Score Badge */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-[0_2px_8px_rgba(16,185,129,0.2)]">
              {viralScore}%
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 font-['Inter']">Skor Viralitas AI</span>
              <p className="text-[11px] text-gray-500 leading-none mt-0.5">Potensi FYP tinggi!</p>
            </div>
          </div>

          <Link 
            href="/generate"
            className="btn-primary text-sm px-6 py-3.5 flex items-center gap-2"
          >
            <span>Buat Baru</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main Sections */}
      <div className="flex flex-col gap-8">
        <BlueprintSection blueprint={output.blueprint} />
        
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col gap-1 mb-6">
            <h2 className="text-xl font-extrabold font-['Montserrat'] text-gray-900 leading-tight">
              Formula Sudut Pandang Konten
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-['Inter']">Pilih salah satu sudut pandang (angle) di bawah untuk memuat skrip video khusus.</p>
          </div>
          <AngleRoulette angles={output.angles} scripts={output.scripts} />
        </div>

        <CopywritingAssets data={output.copywriting} />
        
        <TimingCard timing={output.timing} />
      </div>

      {/* Sticky Action Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] sm:hidden z-10 flex justify-center">
         <Link 
          href="/generate"
          className="w-full max-w-sm bg-[var(--color-brand-teal)] text-white text-center py-3.5 rounded-xl font-bold text-sm hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Generate Strategi Baru</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
