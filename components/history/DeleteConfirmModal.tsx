"use client";

import React from "react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm animate-in fade-in"
        onClick={onCancel}
      />
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10 animate-in fade-in zoom-in-95 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 font-['Montserrat'] mb-2">Hapus dari Riwayat</h3>
        <p className="text-gray-500 text-xs sm:text-sm font-['Inter'] leading-relaxed mb-6">
          Apakah Anda yakin ingin menghapus strategi ini? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            type="button"
            className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-semibold text-sm transition active:scale-98 cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold text-sm hover:shadow-[0_4px_12px_rgba(225,29,72,0.15)] transition active:scale-98 cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
