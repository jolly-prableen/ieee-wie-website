import { floatingCards } from "@/lib/data";

const positions: Record<string, string> = {
  "top-left": "top-16 left-4",
  "top-right": "top-16 right-4",
  "bottom-left": "top-[56%] left-4",
  "bottom-right": "top-[46%] right-4",
};

export default function FloatingCards() {
  return (
    <>
      {floatingCards.map(({ label, position, icon: Icon, delay, lines }) => (
        <div
          key={label}
          className={`group absolute glass-card rounded-xl px-4 py-3 w-[150px] animate-floaty hover-lift cursor-default ${positions[position]}`}
          style={{ animationDelay: `${delay}s` }}
        >
          <div className="flex items-center gap-2 text-purple-300">
            <span
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:text-purple-200" />
            </span>
            <span className="text-[13px] font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-purple-200">
              {label}
            </span>
          </div>
          <div className="mt-1.5 text-[11px] leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90">
            {lines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
