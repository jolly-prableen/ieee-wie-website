"use client";

import type { LucideIcon } from "lucide-react";
import CountUp from "@/components/stats/CountUp";

type StatCardProps = {
  value: string;
  num: number;
  label: string;
  icon: LucideIcon;
};

export default function StatCard({ value, num, label, icon: Icon }: StatCardProps) {
  const suffix = value.replace(/[\d]/g, "");

  return (
    <div className="group glass-card rounded-xl p-6 flex flex-col items-center text-center w-full min-w-0 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_30px_rgba(168,85,247,0.4),0_0_60px_rgba(139,92,246,0.2)]">
      <div
        className="text-purple-300 mb-2.5 transition-all duration-300 group-hover:text-purple-200 group-hover:scale-110"
        style={{ filter: "drop-shadow(0 0 10px #a855f7)" }}
      >
        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="text-2xl font-bold leading-none group-hover:text-purple-200 transition-colors duration-300">
        <CountUp to={num} suffix={suffix} />
      </div>
      <div className="text-[11px] text-white/60 mt-1.5 whitespace-pre-line leading-snug transition-colors duration-300 group-hover:text-white/80">
        {label}
      </div>
    </div>
  );
}
