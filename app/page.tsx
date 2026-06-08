import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/stats/StatsSection";
import HeroBackground from "@/components/hero/HeroBackground";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <HeroBackground />
      <Navbar />
      <HeroSection />
      <StatsSection />
    </div>
  );
}
