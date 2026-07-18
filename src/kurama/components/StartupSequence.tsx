import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

const BOOT_LINES = [
  "Initializing KURAMA...",
  "Loading Portfolio Knowledge...",
  "Preparing Interactive Assistant...",
  "System Ready.",
];

type StartupSequenceProps = {
  reducedMotion?: boolean;
};

export default function StartupSequence({ reducedMotion }: StartupSequenceProps) {
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? BOOT_LINES.length : 0);

  useEffect(() => {
    if (reducedMotion) return;
    const stepDuration = 600;
    const timers = BOOT_LINES.map((_, i) =>
      window.setTimeout(() => setVisibleCount(i + 1), (i + 1) * stepDuration)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reducedMotion]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-10 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan/40"
          animate={reducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-purple/40"
          animate={reducedMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue via-purple to-cyan shadow-[0_0_30px_5px_rgba(34,211,238,0.4)]" />
      </div>

      <div className="w-full max-w-xs space-y-2.5 text-left font-mono text-xs">
        {BOOT_LINES.map((line, i) => {
          const done = i < visibleCount;
          const active = i === visibleCount - 1;
          return (
            <div
              key={line}
              className={cn("flex items-center gap-2 transition-opacity duration-300", done ? "opacity-100" : "opacity-20")}
            >
              {done ? (
                <Check className={cn("h-3.5 w-3.5 shrink-0", active ? "text-cyan" : "text-ink-faint")} />
              ) : (
                <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-ink-faint/40" />
              )}
              <span className={done ? "text-ink-dim" : "text-ink-faint"}>{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
