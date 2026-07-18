import { Volume2, VolumeX } from "lucide-react";
import { cn } from "../../lib/utils";

type VoiceToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

export default function VoiceToggle({ enabled, onToggle }: VoiceToggleProps) {
  return (
    <button
      type="button"
      data-cursor-hover
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn off voice replies" : "Turn on voice replies"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
        enabled ? "border-cyan/60 bg-cyan/10 text-cyan" : "border-line text-ink-dim hover:border-ink-dim"
      )}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
