"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import StatCard from "@/components/stats/StatCard";
import { stats } from "@/lib/data";

export default function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-[1320px] mx-auto px-10 pb-16"
    >
      <GlassCard className="rounded-2xl p-10 grid grid-cols-1 lg:grid-cols-[38%_62%] gap-6">
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

        <div className="flex flex-row items-center justify-center gap-3 self-center h-full">
          {stats.map((stat) => (
            <div key={stat.label} className="w-[160px]">
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-end mt-4 pr-2">
        <Sparkles className="w-5 h-5 text-purple-400/60" />
      </div>
    </motion.section>
  );
}
