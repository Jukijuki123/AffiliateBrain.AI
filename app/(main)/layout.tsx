import AuthGuard from "@/components/layout/AuthGuard";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <Navbar />
      <main className="min-h-screen bg-[#f8f9fa]">
        {children}
      </main>
    </AuthGuard>
  );
}
