import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/stats/StatsSection";

export default function Home() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#050816" }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 25%, #1d0d3f 0%, #120826 30%, #08051a 65%, #04030d 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18] mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 210deg at 70% 10%, transparent 0deg, rgba(168,85,247,0.35) 18deg, transparent 36deg, transparent 180deg, rgba(139,92,246,0.25) 200deg, transparent 220deg)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(76,29,149,0.35), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <canvas className="absolute inset-0 w-full h-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>
      <Navbar />
      <HeroSection />
      <StatsSection />
    </div>
  );
}
