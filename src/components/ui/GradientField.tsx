import { cn } from "../../lib/utils";

type GradientFieldProps = {
  className?: string;
  variant?: "hero" | "section";
};

export default function GradientField({ className, variant = "section" }: GradientFieldProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute rounded-full blur-[120px] animate-blob-slow",
          variant === "hero" ? "h-[42rem] w-[42rem] opacity-40" : "h-[28rem] w-[28rem] opacity-25"
        )}
        style={{
          background:
            "radial-gradient(circle, var(--color-blue) 0%, transparent 70%)",
          top: "-10%",
          left: "-10%",
        }}
      />
      <div
        className={cn(
          "absolute rounded-full blur-[120px] animate-blob-slower",
          variant === "hero" ? "h-[38rem] w-[38rem] opacity-30" : "h-[24rem] w-[24rem] opacity-20"
        )}
        style={{
          background:
            "radial-gradient(circle, var(--color-purple) 0%, transparent 70%)",
          bottom: "-15%",
          right: "-5%",
        }}
      />
      <div
        className={cn(
          "absolute rounded-full blur-[100px] animate-blob-slow",
          variant === "hero" ? "h-[26rem] w-[26rem] opacity-20" : "h-[18rem] w-[18rem] opacity-15"
        )}
        style={{
          background: "radial-gradient(circle, var(--color-cyan) 0%, transparent 70%)",
          top: "40%",
          left: "55%",
          animationDelay: "-4s",
        }}
      />
    </div>
  );
}
