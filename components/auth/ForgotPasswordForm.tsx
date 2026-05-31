"use client";

import React from "react";
import AuthInput from "./AuthInput";

interface ForgotPasswordFormProps {
  forgotEmail: string;
  setForgotEmail: (email: string) => void;
  isLoading: boolean;
  error: string;
  successMessage: string;
  onSubmit: (e: React.FormEvent) => void;
  onBackToLoginClick: () => void;
}

export default function ForgotPasswordForm({
  forgotEmail,
  setForgotEmail,
  isLoading,
  error,
  successMessage,
  onSubmit,
  onBackToLoginClick,
}: ForgotPasswordFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,103,125,0.08)] border border-gray-100 overflow-hidden relative">
          
          {/* Soft decorative blob inside card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-teal)]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="px-8 pt-8 pb-6 relative z-10">
            <button
              onClick={onBackToLoginClick}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[var(--color-brand-teal)] mb-6 transition-colors group cursor-pointer"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Login
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-teal)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--color-brand-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1 font-['Montserrat']">Reset Password</h1>
            <p className="text-xs text-gray-500 font-['Inter'] leading-relaxed">Masukkan email terdaftar Anda dan kami akan mengirimkan link untuk mengatur ulang password.</p>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-['Inter']">{error}</div>
            )}
            {successMessage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-xl text-xs text-green-700 flex gap-2 font-['Inter']">
                <svg className="w-4 h-4 shrink-0 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{successMessage}</span>
              </div>
            )}

            {!successMessage && (
              <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
                <AuthInput
                  id="forgot-email" label="Email" type="email"
                  value={forgotEmail} onChange={setForgotEmail}
                  placeholder="nama@email.com" autoComplete="email"
                />
                <button
                  type="submit" disabled={isLoading}
                  className="w-full bg-[var(--color-brand-teal)] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_4px_12px_rgba(0,103,125,0.2)] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  {isLoading ? <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
                  Kirim Link Reset
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
