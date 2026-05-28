"use client";

import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

type AuthTab = "login" | "register";

function getFirebaseErrorMessage(error: FirebaseError): string {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Silakan login atau gunakan email lain.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Password terlalu lemah. Minimal 6 karakter.";
    case "auth/user-not-found":
      return "Email tidak ditemukan. Cek kembali atau daftar akun baru.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email atau password salah. Silakan coba lagi.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
    case "auth/popup-closed-by-user":
      return "Login Google dibatalkan.";
    case "auth/network-request-failed":
      return "Koneksi internet bermasalah. Periksa jaringan Anda.";
    default:
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
}

// ── Shared Components ────────────────────────────────────────────────────────

const Divider = () => (
  <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs text-gray-400 font-medium">atau</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const Input = ({
  id, label, type, value, onChange, placeholder, autoComplete,
  rightElement,
}: {
  id: string; label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
  rightElement?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:border-[#00677d] focus:ring-2 focus:ring-[#00677d]/15 transition-all duration-200"
      />
      {rightElement && (
        <div className="absolute inset-y-0 right-3 flex items-center">{rightElement}</div>
      )}
    </div>
  </div>
);

const GoogleButton = ({
  onClick, disabled, isGoogleLoading
}: {
  onClick: () => void; disabled: boolean; isGoogleLoading: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
  >
    {isGoogleLoading ? (
      <span className="inline-block w-5 h-5 border-2 border-gray-300 border-t-[#4285F4] rounded-full animate-spin" />
    ) : (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )}
    <span>Lanjutkan dengan Google</span>
  </button>
);

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<AuthTab>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const redirectAfterLogin = async () => {
    router.push("/generate");
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      await redirectAfterLogin();
    } catch (err) {
      if (err instanceof FirebaseError) setError(getFirebaseErrorMessage(err));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Email dan password wajib diisi."); return; }
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await redirectAfterLogin();
    } catch (err) {
      if (err instanceof FirebaseError) setError(getFirebaseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Nama lengkap wajib diisi."); return; }
    if (!email) { setError("Email wajib diisi."); return; }
    if (password.length < 6) { setError("Password minimal 6 karakter."); return; }
    if (password !== confirmPassword) { setError("Konfirmasi password tidak cocok."); return; }
    setIsLoading(true);
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name.trim() });
      // Create user document in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        displayName: name.trim(),
        email: result.user.email,
        photoURL: null,
        createdAt: serverTimestamp(),
        onboardingDone: false,
      });
      router.push("/generate");
    } catch (err) {
      if (err instanceof FirebaseError) setError(getFirebaseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) { setError("Masukkan email Anda."); return; }
    setIsLoading(true);
    setError("");
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      setSuccessMessage("Link reset password telah dikirim ke email Anda. Cek inbox atau folder spam.");
    } catch (err) {
      if (err instanceof FirebaseError) setError(getFirebaseErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const switchTab = (newTab: AuthTab) => {
    setTab(newTab);
    setError("");
    setSuccessMessage("");
    setShowForgotPassword(false);
  };


  // ── Forgot Password View ───────────────────────────────────────────────────
  if (showForgotPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,103,125,0.08)] border border-gray-100 overflow-hidden relative">
            
            {/* Soft decorative blob inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-teal)]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="px-8 pt-8 pb-6 relative z-10">
              <button
                onClick={() => { setShowForgotPassword(false); setError(""); setSuccessMessage(""); }}
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
                <form onSubmit={handleForgotPassword} className="mt-6 flex flex-col gap-5">
                  <Input
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

  // ── Main Auth Page ─────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Dynamic blurred ambient light circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] bg-[var(--color-brand-teal)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] bg-[var(--color-brand-coral)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-teal)] flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-2xl font-bold font-['Montserrat'] text-[var(--color-brand-teal)] leading-none">
              AffiliateBrain.AI
            </span>
          </div>
          <p className="text-xs text-gray-500 font-['Inter']">AI Asisten Cerdas untuk Afiliator Indonesia</p>
        </div>

        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,103,125,0.08)] border border-white/60 overflow-hidden">

          {/* Segmented Controller Tab Switch */}
          <div className="flex bg-slate-100/80 p-1.5 rounded-2xl gap-1 mx-8 mt-8 border border-slate-200/50">
            {(["login", "register"] as AuthTab[]).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                type="button"
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                  tab === t
                    ? "bg-white text-[var(--color-brand-teal)] shadow-sm font-extrabold"
                    : "text-gray-400 hover:text-gray-600 hover:bg-white/30"
                }`}
              >
                {t === "login" ? "Masuk ke Akun" : "Daftar Baru"}
              </button>
            ))}
          </div>

          <div className="px-8 py-7">

            {/* Config Warning Banner */}
            {!auth && (
              <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 flex gap-2.5 items-start font-['Inter'] leading-relaxed">
                <svg className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <div>
                  <strong className="block mb-0.5 font-bold">Firebase Belum Dikonfigurasi</strong>
                  Lengkapi berkas <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-[10px]">.env.local</code> di folder root dengan API key Firebase Anda agar fitur login dan database dapat berfungsi.
                </div>
              </div>
            )}

            {/* Error/Success Banner */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-100 rounded-2xl text-xs text-red-600 flex gap-2.5 items-start font-['Inter']">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign-In */}
            <GoogleButton 
              onClick={handleGoogleLogin} 
              disabled={isLoading || isGoogleLoading || !auth} 
              isGoogleLoading={isGoogleLoading} 
            />

            <Divider />

            {/* ── LOGIN FORM ── */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                  id="login-email" label="Email" type="email"
                  value={email} onChange={setEmail}
                  placeholder="nama@email.com" autoComplete="email"
                />
                <Input
                  id="login-password" label="Password" type={showPassword ? "text" : "password"}
                  value={password} onChange={setPassword}
                  placeholder="Password Anda" autoComplete="current-password"
                  rightElement={
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer">
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

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(true); setError(""); setForgotEmail(email); }}
                    className="text-xs text-[var(--color-brand-teal)] hover:underline font-bold cursor-pointer"
                  >
                    Lupa password?
                  </button>
                </div>

                <button
                  type="submit" disabled={isLoading || isGoogleLoading || !auth}
                  className="w-full bg-[var(--color-brand-teal)] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_8px_24px_rgba(0,103,125,0.2)] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 mt-1 cursor-pointer min-h-[44px]"
                >
                  {isLoading && <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  Masuk ke Akun
                </button>

                <p className="text-center text-xs text-gray-400 mt-2 font-['Inter']">
                  Belum punya akun?{" "}
                  <button type="button" onClick={() => switchTab("register")}
                    className="text-[var(--color-brand-teal)] font-bold hover:underline cursor-pointer">
                    Daftar gratis
                  </button>
                </p>
              </form>
            )}

            {/* ── REGISTER FORM ── */}
            {tab === "register" && (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <Input
                  id="reg-name" label="Nama Lengkap" type="text"
                  value={name} onChange={setName}
                  placeholder="Nama Anda" autoComplete="name"
                />
                <Input
                  id="reg-email" label="Email" type="email"
                  value={email} onChange={setEmail}
                  placeholder="nama@email.com" autoComplete="email"
                />
                <Input
                  id="reg-password" label="Password" type={showPassword ? "text" : "password"}
                  value={password} onChange={setPassword}
                  placeholder="Minimal 6 karakter" autoComplete="new-password"
                  rightElement={
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer">
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
                <Input
                  id="reg-confirm" label="Konfirmasi Password" type={showPassword ? "text" : "password"}
                  value={confirmPassword} onChange={setConfirmPassword}
                  placeholder="Ulangi password" autoComplete="new-password"
                />

                <button
                  type="submit" disabled={isLoading || isGoogleLoading || !auth}
                  className="w-full bg-[var(--color-brand-teal)] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-[0_8px_24px_rgba(0,103,125,0.2)] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 mt-1 cursor-pointer min-h-[44px]"
                >
                  {isLoading && <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                  Daftar Akun Gratis
                </button>

                <p className="text-center text-xs text-gray-400 mt-2 font-['Inter']">
                  Sudah punya akun?{" "}
                  <button type="button" onClick={() => switchTab("login")}
                    className="text-[var(--color-brand-teal)] font-bold hover:underline cursor-pointer">
                    Masuk di sini
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6 font-['Inter']">
          Dengan mendaftar, Anda menyetujui Syarat & Ketentuan layanan kami.
        </p>
      </div>
    </div>
  );
}
