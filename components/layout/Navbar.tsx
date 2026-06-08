import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = ["Home", "Domains", "Events", "Board", "More", "About Us"];

export default function Navbar() {
  return (
    <header className="relative z-20 flex items-center justify-between px-10 pt-6">
      <Link href="#" className="group flex flex-col leading-none">
        <span className="text-[10px] tracking-[0.3em] text-white/80 group-hover:text-white transition-colors">
          IEEE
        </span>
        <span className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_6px_rgba(168,85,247,0.5)] transition-all duration-300 group-hover:text-purple-200 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] flex items-center">
          <span className="text-purple-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">W</span>
          <span className="text-purple-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] text-[28px] leading-none -mt-0.5">i</span>
          <span className="text-purple-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">E</span>
        </span>
        <span className="text-[8px] tracking-[0.25em] text-white/60 mt-0.5 transition-colors group-hover:text-white/80">
          Women in Engineering
        </span>
        <span className="text-[8px] tracking-[0.3em] text-white/50 transition-colors group-hover:text-white/70">
          VIT CHAPTER
        </span>
      </Link>

      <nav className="hidden lg:flex items-center gap-10 text-sm text-white/80">
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item}
            href="#"
            className={`group relative flex items-center gap-1 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] ${
              i === 0 ? "text-white" : "text-white/80 hover:text-white"
            }`}
          >
            {item}
            {item === "More" && <ChevronDown className="w-3 h-3" />}
            {i === 0 && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full animate-spark-pulse"
                style={{
                  background: "#a855f7",
                  boxShadow:
                    "0 0 12px #a855f7, 0 0 24px #8b5cf6",
                }}
              />
            )}
            {i !== 0 && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-purple-500 transition-all duration-300 group-hover:w-full" />
            )}
          </Link>
        ))}
      </nav>

      <Link
        href="#"
        className="group glass-card glow-border hover-lift flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
      >
        Join WIE{" "}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </header>
  );
}
