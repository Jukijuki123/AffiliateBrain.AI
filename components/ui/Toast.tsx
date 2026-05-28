"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Toasts Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <ToastCard 
            key={toast.id} 
            toast={toast} 
            onClose={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} 
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  const styles: Record<ToastType, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    success: {
      bg: "bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(16,185,129,0.08)]",
      text: "text-gray-800",
      border: "border-emerald-500/20 border-l-4 border-l-emerald-500",
      icon: (
        <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    error: {
      bg: "bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(239,68,68,0.08)]",
      text: "text-gray-800",
      border: "border-rose-500/20 border-l-4 border-l-rose-500",
      icon: (
        <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    info: {
      bg: "bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,95,115,0.08)]",
      text: "text-gray-800",
      border: "border-[var(--color-brand-teal)]/20 border-l-4 border-l-[var(--color-brand-teal)]",
      icon: (
        <svg className="w-5 h-5 text-[var(--color-brand-teal)] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      bg: "bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(245,158,11,0.08)]",
      text: "text-gray-800",
      border: "border-amber-500/20 border-l-4 border-l-amber-500",
      icon: (
        <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  };

  const style = styles[toast.type];

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border ${style.border} ${style.bg} ${style.text} pointer-events-auto transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-bottom-5 fade-in`}
      role="alert"
    >
      {style.icon}
      <span className="text-xs font-semibold font-['Inter'] flex-1 leading-normal">{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        aria-label="Tutup"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
