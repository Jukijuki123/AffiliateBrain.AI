"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== "/login" && pathname !== "/") {
        router.push("/login");
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || (!user && pathname !== "/login" && pathname !== "/")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 relative overflow-hidden">
        {/* Soft light glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[300px] bg-[var(--color-brand-teal)]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[300px] bg-[var(--color-brand-coral)]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col items-center justify-center relative z-10 gap-5 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[var(--color-brand-teal)]/10 animate-ping duration-1000" />
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-teal)] flex items-center justify-center shadow-md relative z-10 animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-gray-900 font-['Montserrat']">AffiliateBrain.AI</h3>
            <p className="text-[10px] text-gray-400 font-['Inter'] uppercase tracking-widest font-semibold animate-pulse">Menghubungkan Akun...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
