"use client";

import React, { useState, useEffect } from "react";

const DEFAULT_MESSAGES = [
  "Lagi mikirin hook yang gak bisa di-skip...",
  "Nanya ke database tren Indonesia dulu...",
  "Nyusun skrip yang bikin FYP...",
  "Mastiin CTAnya bikin orang langsung klik...",
  "Pilih hashtag yang pas, bukan asal tag...",
  "Hampir selesai, bentar lagi gaskeun!",
];

interface LoadingOverlayProps {
  title?: string;
  messages?: string[];
  intervalMs?: number;
}

export default function LoadingOverlay({
  title = "AI Sedang Menulis Strategi...",
  messages = DEFAULT_MESSAGES,
  intervalMs = 2000,
}: LoadingOverlayProps) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [messages, intervalMs]);

  return (
    <div className="bg-white p-8 sm:p-16 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.06)] border border-gray-100 flex flex-col items-center justify-center min-h-[450px] w-full">
      {/* Pulsing ring and rotating indicator */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[var(--color-brand-teal)]/10 animate-ping duration-1000" />
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[var(--color-brand-teal)] relative z-10" />
      </div>
      <p className="text-xl font-bold text-gray-800 text-center font-['Montserrat'] mb-2">
        {title}
      </p>
      <p className="text-sm text-gray-500 animate-pulse text-center font-['Inter'] max-w-md leading-relaxed">
        {messages[msgIdx]}
      </p>
    </div>
  );
}
