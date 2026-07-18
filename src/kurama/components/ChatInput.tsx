import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import MicButton from "./MicButton";

type ChatInputProps = {
  onSend: (text: string) => void;
  onMicStart: () => void;
  listening: boolean;
  micSupported: boolean;
  disabled?: boolean;
};

export default function ChatInput({ onSend, onMicStart, listening, micSupported, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-line p-3 sm:p-4">
      {micSupported && <MicButton listening={listening} onClick={onMicStart} disabled={disabled} />}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={listening ? "Listening…" : "Ask KURAMA anything…"}
        disabled={disabled}
        className="flex-1 rounded-full border border-line bg-void/50 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-cyan/50 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        data-cursor-hover
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-void transition-opacity hover:bg-white disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
