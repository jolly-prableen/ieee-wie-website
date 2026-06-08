import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/stats/StatCard";
import { stats } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="relative z-10 max-w-[1320px] mx-auto px-10 pb-16">
      <GlassCard className="rounded-2xl p-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10">
        <div>
          <div className="text-xs tracking-[0.25em] text-purple-300/90 font-medium">
            WHAT IS WIE?
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-tight">
            Empowering Women.
            <br />
            Engineering the Future.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/65 max-w-md">
            IEEE Women in Engineering (WIE) is a global network dedicated to
            inspiring and empowering women in STEM. We support, encourage and
            promote women engineers and technologists, every step of the way.
          </p>
          <Link
            href="#"
            className="mt-6 glass-card inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium"
          >
            Learn More About Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-end mt-4 pr-2">
        <Sparkles className="w-5 h-5 text-purple-400/60" />
      </div>
    </section>
  );
}
