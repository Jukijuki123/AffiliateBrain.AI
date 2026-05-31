"use client";

import React from "react";

interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  rightElement?: React.ReactNode;
}

export default function AuthInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  rightElement,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
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
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
