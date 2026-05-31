"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import ProductIntelShowcase from "@/components/landing/ProductIntelShowcase";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CtaFinal from "@/components/landing/CtaFinal";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/generate");
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <ProductIntelShowcase />
      <TestimonialsSection />
      <CtaFinal />
      <Footer />
    </div>
  );
}
