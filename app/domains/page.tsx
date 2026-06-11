import Navbar from "@/components/layout/Navbar";
import DomainsSection from "@/components/domains/DomainsSection";

export default function DomainsPage() {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#050816" }}
    >
      {/* Same layered background as home page */}
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <DomainsSection />
      </div>
    </div>
  );
}
