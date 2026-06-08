import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="relative pl-10">
      <div className="absolute left-0 top-0 flex flex-col items-center gap-2">
        <span className="text-xs text-white/70 font-medium">01</span>
        <div className="w-px h-32 bg-gradient-to-b from-purple-400/60 to-transparent" />
        <div className="flex flex-col gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-px bg-white/30" />
          ))}
        </div>
      </div>

      <h1 className="font-pixel leading-[1.25] text-[38px] tracking-tight">
        <div
          style={{
            color: "#A67CFF",
            textShadow:
              "0 0 10px rgba(166,124,255,0.35), 0 0 20px rgba(166,124,255,0.15)",
          }}
        >
          Debugging
        </div>
        <div
          className="mt-4 text-white text-[42px]"
          style={{
            textShadow: "0 0 10px rgba(166,124,255,0.35), 0 0 20px rgba(166,124,255,0.15)",
          }}
        >
          gender gap<span className="animate-blink text-[#A67CFF]">_</span>
        </div>
      </h1>

      <p className="mt-7 text-[15px] leading-relaxed text-white/70 max-w-md">
        Building a future where innovation is powered by diverse minds, fearless
        engineers, and women shaping technology.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="#"
          className="btn-primary-glow flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white"
        >
          Explore Domains <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#"
          className="glass-card flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white"
        >
          Join IEEE WIE <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
