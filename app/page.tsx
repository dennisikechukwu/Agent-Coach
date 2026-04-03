"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesSection } from "../components/landing/FeaturesSection";
import { StepByStepSection } from "../components/landing/StepByStepSection";
import { PartnersSection } from "../components/landing/PartnersSection";
import { FAQSection } from "../components/landing/FAQSection";
import { Footer } from "../components/landing/Footer";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  // Instantly redirect to dashboard if wallet connects successfully
  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/10">
      
      {/* Clean Premium Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StepByStepSection />
      <PartnersSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
