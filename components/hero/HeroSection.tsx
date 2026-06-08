import HeroContent from "@/components/hero/HeroContent";
import FloatingCards from "@/components/hero/FloatingCards";
import WireOverlay from "@/components/hero/WireOverlay";

export default function HeroSection() {
  return (
    <section className="relative z-10 grid grid-cols-1 lg:grid-cols-[42%_58%] gap-8 px-10 pt-16 pb-12 max-w-[1400px] mx-auto">
      <HeroContent />
      <div className="relative h-[620px]">
        <img
          src="/hologram.jpg"
          alt=""
          aria-hidden="true"
          className="absolute m-auto w-[115%] h-[115%] -left-[7.5%] -top-[7.5%] object-contain animate-floaty"
          style={{
            filter: "drop-shadow(0 0 80px rgba(139,92,246,0.55))",
            WebkitMaskImage:
              "radial-gradient(ellipse 58% 62% at 50% 50%, black 55%, transparent 82%)",
            maskImage:
              "radial-gradient(ellipse 58% 62% at 50% 50%, black 55%, transparent 82%)",
            mixBlendMode: "screen",
          }}
        />
        <WireOverlay />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[320px] h-[60px] rounded-[50%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(168,85,247,0.55), transparent 70%)",
            filter: "blur(14px)",
          }}
        />
        <FloatingCards />
      </div>
    </section>
  );
}
