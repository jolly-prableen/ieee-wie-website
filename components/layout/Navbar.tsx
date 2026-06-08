import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = ["Home", "Domains", "Events", "Board", "More", "About Us"];

export default function Navbar() {
  return (
    <header className="relative z-20 flex items-center justify-between px-10 pt-6">
      <div className="flex flex-col leading-none">
        <span className="text-[10px] tracking-[0.3em] text-white/80">IEEE</span>
        <span className="text-2xl font-bold tracking-tight">
          W<span className="italic font-script text-white">i</span>E
        </span>
        <span className="text-[8px] tracking-[0.25em] text-white/60 mt-0.5">
          Women in Engineering
        </span>
        <span className="text-[8px] tracking-[0.3em] text-white/50">
          VIT CHAPTER
        </span>
      </div>

      <nav className="hidden lg:flex items-center gap-10 text-sm text-white/80">
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item}
            href="#"
            className={`relative flex items-center gap-1 hover:text-white transition ${
              i === 0 ? "text-white" : ""
            }`}
          >
            {item}
            {item === "More" && <ChevronDown className="w-3 h-3" />}
            {i === 0 && (
              <span
                className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full"
                style={{
                  background: "#a855f7",
                  boxShadow:
                    "0 0 12px #a855f7, 0 0 24px #8b5cf6",
                }}
              />
            )}
          </Link>
        ))}
      </nav>

      <Link
        href="#"
        className="glass-card glow-border flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium"
      >
        Join WIE <ArrowRight className="w-4 h-4" />
      </Link>
    </header>
  );
}
