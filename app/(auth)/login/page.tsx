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
import { getFirebaseErrorMessage } from "@/lib/auth-errors";
import Image from "next/image";

import GoogleButton from "@/components/auth/GoogleButton";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

type AuthTab = "login" | "register";

const Divider = () => (
  <div className="flex items-center gap-3 my-5">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-xs text-gray-400 font-medium">atau</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
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
    if (!auth) return;
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
    if (!auth) return;
    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }
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
    if (!auth) return;
    if (!name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }
    if (!email) {
      setError("Email wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
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
    if (!auth) return;
    if (!forgotEmail) {
      setError("Masukkan email Anda.");
      return;
    }
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
      <ForgotPasswordForm
        forgotEmail={forgotEmail}
        setForgotEmail={setForgotEmail}
        isLoading={isLoading}
        error={error}
        successMessage={successMessage}
        onSubmit={handleForgotPassword}
        onBackToLoginClick={() => {
          setShowForgotPassword(false);
          setError("");
          setSuccessMessage("");
        }}
      />
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
            <Image src="/logo.png" alt="AffiliateBrain Logo" width={40} height={40} className="rounded-xl object-contain" />
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
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${tab === t
                    ? "bg-white text-[var(--color-brand-teal)] shadow-sm font-extrabold"
                    : "text-gray-400 hover:text-gray-600 hover:bg-white/30"
                  }`}
              >
                {t === "login" ? "Masuk ke Akun" : "Daftar Baru"}
              </button>
            ))}
          </div>

          <div className="px-8 py-7">
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
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
                isGoogleLoading={isGoogleLoading}
                isAuthAvailable={!!auth}
                onSubmit={handleLogin}
                onForgotPasswordClick={() => {
                  setShowForgotPassword(true);
                  setError("");
                  setForgotEmail(email);
                }}
                onSwitchTabRegister={() => switchTab("register")}
              />
            )}

            {/* ── REGISTER FORM ── */}
            {tab === "register" && (
              <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
                isGoogleLoading={isGoogleLoading}
                isAuthAvailable={!!auth}
                onSubmit={handleRegister}
                onSwitchTabLogin={() => switchTab("login")}
              />
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
