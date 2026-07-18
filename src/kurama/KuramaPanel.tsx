import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import StartupSequence from "./components/StartupSequence";
import ChatMessage from "./components/ChatMessage";
import SuggestionChips from "./components/SuggestionChips";
import ChatInput from "./components/ChatInput";
import VoiceToggle from "./components/VoiceToggle";
import { useKurama } from "./hooks/useKurama";
import { SUGGESTION_INTENTS } from "./engine/suggestions";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useScrollLock } from "../hooks/useScrollLock";

type KuramaPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Lazy-loaded chunk (see Kurama.tsx) — everything this file imports, directly
// or transitively (engine, knowledge JSON, speech hooks), only downloads
// once a visitor clicks "Launch KURAMA". This component mounts exactly once,
// on first launch, and stays mounted after that — closing only flips
// `isOpen` (see the AnimatePresence below), so useKurama's conversation and
// boot state survive close/reopen instead of resetting every time.
export default function KuramaPanel({ isOpen, onClose }: KuramaPanelProps) {
  const reducedMotion = useReducedMotion();
  const kurama = useKurama(reducedMotion);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastAnimatedId = useRef<string | null>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [kurama.messages, kurama.phase]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleSuggestion = (label: string) => {
    kurama.sendSuggestion(label, SUGGESTION_INTENTS[label]);
  };

  const lastAssistantIndex = kurama.messages.map((m) => m.role).lastIndexOf("assistant");

  return (
    <AnimatePresence>
      {isOpen && (
        // A single motion element carries the exit animation here (deliberately —
        // nested motion.div children that each declare their own `exit` can leave
        // AnimatePresence unable to detect completion, leaving an invisible
        // opacity:0 overlay stuck in the DOM blocking clicks). The backdrop and
        // panel below are plain elements so there's exactly one exit to track.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex justify-end"
        >
          <div onClick={onClose} className="absolute inset-0 bg-void/70 backdrop-blur-sm" />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="KURAMA portfolio assistant"
            className="relative flex h-full w-full max-w-md flex-col border-l border-line bg-card/80 backdrop-blur-2xl sm:m-4 sm:h-[calc(100%-2rem)] sm:rounded-2xl sm:border"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]" />
                <span className="font-display text-sm text-ink">KURAMA</span>
                <span className="font-mono-label text-[10px] text-ink-faint">Portfolio Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <VoiceToggle enabled={kurama.voice.enabled} onToggle={kurama.voice.toggle} />
                <button
                  type="button"
                  data-cursor-hover
                  onClick={onClose}
                  aria-label="Close KURAMA"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-dim hover:border-cyan/50 hover:text-cyan"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {kurama.phase === "booting" ? (
                <StartupSequence reducedMotion={reducedMotion} />
              ) : (
                <>
                  {kurama.messages.map((message, i) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      animate={!reducedMotion && i === lastAssistantIndex && lastAnimatedId.current !== message.id}
                      onTypingDone={() => {
                        lastAnimatedId.current = message.id;
                      }}
                    />
                  ))}
                  {kurama.micNotice && <p className="text-center text-xs text-ink-faint">{kurama.micNotice}</p>}
                </>
              )}
            </div>

            {kurama.phase === "ready" && (
              <div className="px-5 pb-3">
                <SuggestionChips
                  suggestions={kurama.suggestions}
                  onSelect={handleSuggestion}
                  disabled={kurama.thinking}
                />
              </div>
            )}

            {kurama.phase === "ready" && (
              <ChatInput
                onSend={kurama.send}
                onMicStart={kurama.speech.start}
                listening={kurama.speech.listening}
                micSupported={kurama.speech.supported}
                disabled={kurama.thinking}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
