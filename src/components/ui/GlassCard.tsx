import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  glow?: "blue" | "purple" | "cyan" | "none";
};

const glowMap: Record<string, string> = {
  blue: "hover:shadow-[0_0_60px_-15px_rgba(62,123,250,0.35)] hover:border-blue/40",
  purple: "hover:shadow-[0_0_60px_-15px_rgba(155,92,255,0.35)] hover:border-purple/40",
  cyan: "hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.35)] hover:border-cyan/40",
  none: "",
};

export default function GlassCard({ children, className, glow = "blue", ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-card/60 backdrop-blur-xl transition-all duration-500",
        glowMap[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
