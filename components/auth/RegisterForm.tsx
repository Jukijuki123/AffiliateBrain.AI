"use client";

import React from "react";
import AuthInput from "./AuthInput";

interface RegisterFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirm: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isAuthAvailable: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchTabLogin: () => void;
}

export default function RegisterForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  isLoading,
  isGoogleLoading,
  isAuthAvailable,
  onSubmit,
  onSwitchTabLogin,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <AuthInput
        id="reg-name"
        label="Nama Lengkap"
        type="text"
        value={name}
        onChange={setName}
        placeholder="Nama Anda"
        autoComplete="name"
      />
      <AuthInput
        id="reg-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="nama@email.com"
        autoComplete="email"
      />
      <AuthInput
        id="reg-password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        placeholder="Minimal 6 karakter"
        autoComplete="new-password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        }
      />
      <AuthInput
        id="reg-confirm"
        label="Konfirmasi Password"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Ulangi password"
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={isLoading || isGoogleLoading || !isAuthAvailable}
        className="w-full bg-[var(--color-brand-teal)] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_8px_24px_rgba(0,103,125,0.2)] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 mt-1 cursor-pointer min-h-[44px]"
      >
        {isLoading && <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
        Daftar Akun Gratis
      </button>

      <p className="text-center text-xs text-gray-400 mt-2 font-['Inter']">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={onSwitchTabLogin}
          className="text-[var(--color-brand-teal)] font-bold hover:underline cursor-pointer"
        >
          Masuk di sini
        </button>
      </p>
    </form>
  );
}
