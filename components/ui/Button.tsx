import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "glass";
};

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const variants = {
    primary:
      "btn-primary-glow text-white",
    secondary:
      "glass-card text-white",
    glass:
      "glass-card text-white",
  };

  return (
    <Link
      className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
