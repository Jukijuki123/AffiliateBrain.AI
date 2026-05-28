"use client";

import { useEffect, useState } from "react";
import { getGenerations, deleteGeneration } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { GenerationDocument } from "@/lib/types";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

export default function HistoryPage() {
  const [history, setHistory] = useState<GenerationDocument[]>([]);
  const [loading, setLoading] = useState(!!auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!auth) return;
    // Cara paling simpel agar build lolos:
    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {
        try {
          const docs = await getGenerations(user.uid);
          setHistory(docs);
        } catch (err) {
          console.error("Gagal memuat riwayat", err);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!auth || !auth.currentUser) return;

    setIsDeleting(id);
    try {
      await deleteGeneration(auth.currentUser.uid, id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      showToast("Strategi berhasil dihapus dari riwayat.", "success");
    } catch (err) {
      console.error("Gagal menghapus", err);
      showToast("Gagal menghapus strategi ini.", "error");
    } finally {
      setIsDeleting(null);
      setDeleteConfirmId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
    showToast("Penghapusan dibatalkan.", "info");
  };

  const filteredHistory = history.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const platformColors: Record<string, string> = {
    tiktok: "bg-slate-900 text-white",
    shopee: "bg-orange-50 text-[#ee4d2d] border border-orange-100",
    reels: "bg-[#e1306c]/10 text-[#e1306c] border border-[#e1306c]/20",
  };

  const platformNames: Record<string, string> = {
    tiktok: "TikTok",
    shopee: "Shopee",
    reels: "Reels",
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[var(--color-brand-teal)]/10 animate-ping duration-1000" />
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--color-brand-teal)] relative z-10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pb-24">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[var(--color-brand-teal)] leading-tight pb-1">
            Riwayat Strategi Konten
          </h1>
          <p className="text-gray-500 mt-2 font-['Inter'] text-sm sm:text-base">
            Temukan kembali 10 skrip video dan aset copywriting terakhir yang Anda buat.
          </p>
        </div>
        <Link
          href="/generate"
          className="btn-primary text-sm px-6 py-3.5 rounded-xl font-bold hover:shadow-[0_8px_24px_rgba(0,103,125,0.15)] active:scale-95 transition-all text-center min-h-[44px] shrink-0"
        >
          Buat Skrip Baru
        </Link>
      </div>

      {history.length === 0 ? (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl shadow-[0_4px_35px_rgba(0,103,125,0.03)] border border-gray-100 text-center flex flex-col items-center max-w-xl mx-auto mt-6">
          <div className="relative w-24 h-24 mb-6 text-gray-300 flex items-center justify-center bg-slate-50 rounded-full border border-gray-50">
            <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.25A2.25 2.25 0 0118 21.75H6a2.25 2.25 0 01-2.25-2.25V15.75a2.25 2.25 0 012.25-2.25zM2.25 9.75h19.5m-19.5 0A2.25 2.25 0 014.5 7.5h15A2.25 2.25 0 0121.75 9.75m-19.5 0V5.625c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125V9.75" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Montserrat']">Kotak Masuk Riwayat Kosong</h3>
          <p className="text-gray-500 mb-8 font-['Inter'] text-sm leading-relaxed max-w-sm">
            Anda belum pernah membuat strategi konten apa pun. Mari ketik nama produk Anda dan saksikan AI merumuskannya!
          </p>
          <Link
            href="/generate"
            className="w-full bg-[var(--color-brand-teal)] text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-[0_4px_12px_rgba(0,103,125,0.2)] active:scale-95 transition-all text-sm"
          >
            Mulai Buat Skrip Sekarang
          </Link>
        </div>
      ) : (
        <>
          {/* Search Input */}
          <div className="relative mb-8 max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama produk di riwayat..."
              className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-teal)]/15 focus:border-[var(--color-brand-teal)] text-sm text-gray-900 bg-white placeholder:text-gray-400 transition-all min-h-[44px]"
            />
          </div>

          {/* Grid List */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-['Inter']">
              Tidak ada produk yang cocok dengan pencarian &quot;<strong>{searchQuery}</strong>&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHistory.map((doc) => {
                const dateString = new Date(doc.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                });

                // Excerpt preview from hook to make it highly visual
                const hookExcerpt = doc.output?.scripts?.[0]?.hook
                  ? `"${doc.output.scripts[0].hook}"`
                  : "Detail strategi dan angle viral siap pakai...";

                return (
                  <div
                    key={doc.id}
                    className="bg-white p-6 sm:p-7 rounded-3xl shadow-[0_4px_30px_rgba(0,103,125,0.02)] border border-gray-100 hover:border-[var(--color-brand-teal)]/30 hover:shadow-[0_8px_30px_rgba(0,103,125,0.06)] transition-all duration-300 flex flex-col justify-between gap-5 relative group"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Top Header Card */}
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 bg-slate-50 border border-slate-100 text-gray-400 rounded-lg uppercase tracking-wider font-sans">
                          {doc.category === "skincare" ? "Skincare" : doc.category === "fashion" ? "Fashion" : doc.category || "Umum"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {doc.platforms.map(p => (
                            <span key={p} className={`text-[9px] px-2 py-0.5 rounded font-extrabold uppercase tracking-wide font-sans ${platformColors[p] || "bg-gray-100 text-gray-600"}`}>
                              {platformNames[p] || p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Main Title */}
                      <h3 className="font-bold text-lg text-gray-900 font-['Montserrat'] leading-tight group-hover:text-[var(--color-brand-teal)] transition-colors">
                        {doc.productName}
                      </h3>

                      {/* Excerpt preview */}
                      <p className="text-gray-400 text-xs font-['Inter'] leading-relaxed italic line-clamp-2 bg-slate-50/50 p-3 rounded-xl border border-slate-50/20">
                        {hookExcerpt}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-1">
                      <span className="text-xs text-gray-400 font-['Inter'] font-medium">
                        {dateString}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirmId(doc.id)}
                          disabled={isDeleting === doc.id}
                          type="button"
                          className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-90 cursor-pointer min-h-[38px] flex items-center justify-center border border-transparent hover:border-rose-100"
                          title="Hapus dari riwayat"
                        >
                          {isDeleting === doc.id ? (
                            <span className="inline-block w-4 h-4 border-2 border-rose-500/40 border-t-rose-500 rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>

                        {/* View Button */}
                        <Link
                          href={`/result/${doc.id}`}
                          className="px-4 py-2 bg-slate-50 text-gray-700 hover:bg-[var(--color-brand-teal)] hover:text-white border border-gray-200 hover:border-[var(--color-brand-teal)] text-xs font-bold rounded-xl transition-all active:scale-95 min-h-[38px] flex items-center justify-center cursor-pointer shadow-sm hover:shadow"
                        >
                          Lihat Hasil
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {/* Custom Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm animate-in fade-in" onClick={() => setDeleteConfirmId(null)} />
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 max-w-sm w-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative z-10 animate-in fade-in zoom-in-95 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-['Montserrat'] mb-2">Hapus dari Riwayat</h3>
            <p className="text-gray-500 text-xs sm:text-sm font-['Inter'] leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus strategi ini? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={handleCancelDelete}
                type="button"
                className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-semibold text-sm transition active:scale-98 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                type="button"
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold text-sm hover:shadow-[0_4px_12px_rgba(225,29,72,0.15)] transition active:scale-98 cursor-pointer"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
