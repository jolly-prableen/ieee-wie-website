import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  value: string;
  label: string;
  icon: LucideIcon;
};

export default function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div className="glass-card rounded-xl p-5 flex flex-col items-center text-center">
      <div
        className="text-purple-300 mb-3"
        style={{ filter: "drop-shadow(0 0 10px #a855f7)" }}
      >
        <Icon className="w-7 h-7" />
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs text-white/60 mt-1 whitespace-pre-line">
        {label}
      </div>
    </div>
  );
}
