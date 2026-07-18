import { Mic, MicOff } from "lucide-react";
import { cn } from "../../lib/utils";

type MicButtonProps = {
  listening: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export default function MicButton({ listening, onClick, disabled }: MicButtonProps) {
  return (
    <button
      type="button"
      data-cursor-hover
      onClick={onClick}
      disabled={disabled}
      aria-pressed={listening}
      aria-label={listening ? "Stop voice input" : "Start voice input"}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-40",
        listening
          ? "animate-pulse-glow border-cyan/60 bg-cyan/10 text-cyan"
          : "border-line text-ink-dim hover:border-cyan/50 hover:text-cyan"
      )}
    >
      {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </button>
  );
}
