"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/form/ProductForm";
import { GenerationInput } from "@/lib/types";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import OnboardingModal from "@/components/layout/OnboardingModal";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

export default function GeneratePage() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const checkOnboarding = async () => {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && !userSnap.data().onboardingDone) {
            setShowOnboarding(true);
          }
        } catch (error) {
          console.error("Failed to check onboarding status", error);
        }
      };
      checkOnboarding();
    }
  }, [user]);



  const handleGenerate = async (data: GenerationInput) => {
    setIsGenerating(true);
    setGlobalError("");
    
    try {
      if (!auth || !auth.currentUser) throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
      const token = await auth.currentUser.getIdToken();

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
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
        throw new Error(resData?.error || "Gagal menghasilkan strategi");
      }

      router.push(`/result/${resData.id}?success=true`);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan jaringan.";
      setGlobalError(errorMessage);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Onboarding Modal Overlay */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />

      {/* Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[var(--color-brand-teal)] leading-tight pb-1">
          Buat Skrip Video Viral
        </h1>
        <p className="text-gray-500 mt-2 font-['Inter'] max-w-xl text-sm sm:text-base">
          Tulis detail produk untuk mendapatkan formula hook terbaik, skrip natural, hingga hashtag tertarget.
        </p>
      </div>

      {isGenerating ? (
        <LoadingOverlay />
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
            <ProductForm onSubmit={handleGenerate} isGenerating={false} />
          </div>

          {/* Sidebar Insights */}
          <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Guide Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[var(--color-brand-teal)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-gray-900 font-['Montserrat']">Tips Prompt Sempurna</h3>
              </div>
              <ul className="flex flex-col gap-4 text-sm text-gray-600 font-['Inter']">
                <li className="flex gap-2.5">
                  <span className="text-[var(--color-brand-teal)] font-bold">1.</span>
                  <span><strong>Spesifik</strong>: Daripada menulis &quot;Baju Anak&quot;, lebih baik &quot;Kaos Oversized Anak Katun Combed 30s&quot;.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-[var(--color-brand-teal)] font-bold">2.</span>
                  <span><strong>Keunikan</strong>: Cantumkan diskon, garansi, bahan premium, atau gratis ongkir pada keunikan produk.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="text-[var(--color-brand-teal)] font-bold">3.</span>
                  <span><strong>Audiens</strong>: Sesuaikan gaya bahasa dengan target audiens. Gen-Z menyukai istilah gaul Indonesia.</span>
                </li>
              </ul>
            </div>

            {/* Platform Strategy Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-[var(--color-brand-teal)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 5.84M2 22l4-4m16-16l-8 8M14 6l4 4" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-gray-900 font-['Montserrat']">Karakteristik Media</h3>
              </div>
              <div className="flex flex-col gap-4 text-xs text-gray-500 font-['Inter']">
                <div className="border-l-2 border-black pl-3 py-1">
                  <strong className="text-gray-800 text-sm block mb-0.5">TikTok</strong>
                  Kecepatan, humor, tren lagu latar, dan durasi di bawah 60 detik.
                </div>
                <div className="border-l-2 border-[#ee4d2d] pl-3 py-1">
                  <strong className="text-gray-800 text-sm block mb-0.5">Shopee Video</strong>
                  Fokus pada pembuktian produk (demo), promo harga, voucher, dan keranjang belanja.
                </div>
                <div className="border-l-2 border-slate-700 pl-3 py-1">
                  <strong className="text-gray-800 text-sm block mb-0.5">Instagram Reels</strong>
                  Estetika visual, storytelling emosional, transisi rapi, dan kualitas video HD.
                </div>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
