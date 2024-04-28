"use client";

// components
import HeroSection from "./hero";
import HowItWorksSection from "./how-it-works";
import SupportedTokens from "./supported-tokens";

export default function Home() {
  return (
   <div>
      <HeroSection />
      <HowItWorksSection />
      <SupportedTokens />
   </div>
  );
}
