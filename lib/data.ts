import {
  Lightbulb,
  Compass,
  Heart,
  Zap,
  Users,
  Calendar,
  GraduationCap,
  Globe,
} from "lucide-react";

export const floatingCards = [
  {
    label: "INNOVATE",
    position: "top-left" as const,
    icon: Lightbulb,
    delay: 0,
    lines: ["Engineering", "the future"],
  },
  {
    label: "INSPIRE",
    position: "top-right" as const,
    icon: Compass,
    delay: 0.6,
    lines: ["The next", "generation"],
  },
  {
    label: "EMPOWER",
    position: "bottom-left" as const,
    icon: Heart,
    delay: 1.1,
    lines: ["Women.", "Communities.", "The world."],
  },
  {
    label: "IMPACT",
    position: "bottom-right" as const,
    icon: Zap,
    delay: 1.6,
    lines: ["Creating a", "sustainable", "tomorrow"],
  },
] as const;

export const stats = [
  { value: "500+", num: 500, label: "Members", icon: Users },
  { value: "40+", num: 40, label: "Events", icon: Calendar },
  { value: "15+", num: 15, label: "Workshops", icon: GraduationCap },
  { value: "1000+", num: 1000, label: "Community\nReach", icon: Globe },
] as const;
