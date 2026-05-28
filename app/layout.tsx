import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AffiliateBrain.AI — Buat Skrip Konten Affiliate yang Viral",
  description:
    "AI yang membuatkan hook, skrip video, dan copywriting siap pakai untuk TikTok Shop, Shopee Video, dan Reels Indonesia.",
  keywords: ["affiliate marketing", "TikTok Shop", "Shopee Video", "skrip viral", "AI content"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f0f4f8]">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
