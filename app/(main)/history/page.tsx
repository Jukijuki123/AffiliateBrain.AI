"use client";

import { useEffect, useState } from "react";
import { getGenerations, deleteGeneration, getProductIntels, deleteProductIntel } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { GenerationDocument, ProductIntelDocument } from "@/lib/types";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { Brain, Clapperboard } from "lucide-react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";
import HistorySearchBar from "@/components/history/HistorySearchBar";
import IntelCard from "@/components/history/IntelCard";
import ScriptCard from "@/components/history/ScriptCard";
import DeleteConfirmModal from "@/components/history/DeleteConfirmModal";
import EmptyState from "@/components/history/EmptyState";

type HistoryItem =
  | (GenerationDocument & { type: "generation" })
  | (ProductIntelDocument & { type: "product-intel" });

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(!!auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const [gens, intels] = await Promise.all([
            getGenerations(user.uid),
            getProductIntels(user.uid),
          ]);

          const gensWithMeta = gens.map((g) => ({ ...g, type: "generation" as const }));
          const intelsWithMeta = intels.map((i) => ({ ...i, type: "product-intel" as const }));

          const combined = [...gensWithMeta, ...intelsWithMeta].sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });

          setHistory(combined);
        } catch (err) {
          console.error("Gagal memuat riwayat", err);
          showToast("Gagal memuat beberapa riwayat strategi.", "error");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [showToast]);

  const handleDelete = async (id: string) => {
    if (!auth || !auth.currentUser) return;

    setIsDeleting(id);
    try {
      const itemToDelete = history.find((item) => item.id === id);
      if (itemToDelete?.type === "product-intel") {
        await deleteProductIntel(auth.currentUser.uid, id);
      } else {
        await deleteGeneration(auth.currentUser.uid, id);
      }
      setHistory((prev) => prev.filter((item) => item.id !== id));
      showToast("Riwayat strategi berhasil dihapus.", "success");
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

  const filteredHistory = history.filter((item) => {
    const name = item.type === "product-intel" ? item.title : item.productName;
    return name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Separate sections
  const intelHistory = filteredHistory.filter((item) => item.type === "product-intel") as (ProductIntelDocument & { type: "product-intel" })[];
  const scriptHistory = filteredHistory.filter((item) => item.type === "generation") as (GenerationDocument & { type: "generation" })[];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pb-24">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat'] text-[var(--color-brand-teal)] leading-tight pb-1">
            Riwayat Strategi & Analisis
          </h1>
          <p className="text-gray-500 mt-2 font-['Inter'] text-sm sm:text-base">
            Temukan kembali hasil analisis produk dan skrip promosi video viral yang Anda buat.
          </p>
        </div>
        <div className="flex gap-3 font-sans">
          <Link
            href="/product-intel"
            className="px-5 py-3 border border-[var(--color-brand-teal)] text-[var(--color-brand-teal)] hover:bg-[var(--color-brand-teal-light)] rounded-xl font-bold transition-all text-center min-h-[44px] text-sm shrink-0 flex items-center justify-center"
          >
            Analisis Produk
          </Link>
          <Link
            href="/generate"
            className="btn-primary text-sm px-6 py-3.5 rounded-xl font-bold hover:shadow-[0_8px_24px_rgba(0,103,125,0.15)] active:scale-95 transition-all text-center min-h-[44px] shrink-0 flex items-center justify-center"
          >
            Buat Skrip Baru
          </Link>
        </div>
      </div>

      {history.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Search Input */}
          <HistorySearchBar value={searchQuery} onChange={setSearchQuery} />

          <div className="flex flex-col gap-14">
            {/* Section 1: Product Intel */}
            <div>
              <div className="flex items-center gap-2 mb-6 pb-2.5 border-b border-gray-100">
                <Brain className="w-6 h-6 text-[var(--color-brand-teal)]" />
                <h2 className="text-xl font-extrabold font-['Montserrat'] text-gray-900">
                  Analisis Intelijen Produk ({intelHistory.length})
                </h2>
              </div>
              {intelHistory.length === 0 ? (
                <div className="bg-slate-50/50 rounded-2xl p-8 text-center text-xs text-gray-400 font-['Inter'] border border-dashed border-gray-200">
                  {searchQuery ? "Tidak ada riwayat analisis produk yang cocok." : "Belum ada riwayat analisis produk."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {intelHistory.map((doc) => (
                    <IntelCard
                      key={doc.id}
                      doc={doc}
                      isDeleting={isDeleting === doc.id}
                      onDeleteClick={() => setDeleteConfirmId(doc.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: Script Generations */}
            <div>
              <div className="flex items-center gap-2 mb-6 pb-2.5 border-b border-gray-100">
                <Clapperboard className="w-6 h-6 text-[var(--color-brand-coral)]" />
                <h2 className="text-xl font-extrabold font-['Montserrat'] text-gray-900">
                  Strategi & Skrip Video Viral ({scriptHistory.length})
                </h2>
              </div>
              {scriptHistory.length === 0 ? (
                <div className="bg-slate-50/50 rounded-2xl p-8 text-center text-xs text-gray-400 font-['Inter'] border border-dashed border-gray-200">
                  {searchQuery ? "Tidak ada riwayat skrip video yang cocok." : "Belum ada riwayat skrip video."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {scriptHistory.map((doc) => (
                    <ScriptCard
                      key={doc.id}
                      doc={doc}
                      isDeleting={isDeleting === doc.id}
                      onDeleteClick={() => setDeleteConfirmId(doc.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteConfirmId}
        onCancel={handleCancelDelete}
        onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
      />
    </div>
  );
}
