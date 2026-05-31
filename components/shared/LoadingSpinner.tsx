"use client";

import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  message,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
    xl: "h-20 w-20 border-4",
  };

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative">
        {/* Pulsing ring behind for larger sizes */}
        {size !== "sm" && (
          <div className="absolute inset-0 rounded-full bg-[var(--color-brand-teal)]/10 animate-ping duration-1000" />
        )}
        <div
          className={`animate-spin rounded-full border-t-[var(--color-brand-teal)] border-b-[var(--color-brand-teal)] border-r-transparent border-l-transparent relative z-10 ${sizeClasses[size]}`}
        />
      </div>
      {message && (
        <p className="mt-4 text-sm text-gray-500 animate-pulse text-center font-['Inter']">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}
