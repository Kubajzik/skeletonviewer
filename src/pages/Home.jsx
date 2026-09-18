import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0E12] text-[#EDEAE2]">
      <HeroSection />
      <FeaturesSection />
      <SiteFooter />
    </div>
  );
}