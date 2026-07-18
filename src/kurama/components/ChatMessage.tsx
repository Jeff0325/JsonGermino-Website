import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import TypingText from "./TypingText";
import { cn } from "../../lib/utils";
import type { ChatMessage as ChatMessageType } from "../hooks/useKurama";

type ChatMessageProps = {
  message: ChatMessageType;
  animate: boolean;
  onTypingDone?: () => void;
};

export default function ChatMessage({ message, animate, onTypingDone }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line",
          isUser ? "bg-void/50 text-ink-dim" : "bg-cyan/10 text-cyan"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl border border-line px-4 py-3 text-sm leading-relaxed",
          isUser ? "bg-card text-ink" : "bg-card/60 text-ink-dim backdrop-blur-xl"
        )}
      >
        {isUser ? (
          message.text
        ) : (
          <TypingText text={message.text} animate={animate} onDone={onTypingDone} />
        )}
      </div>
    </motion.div>
  );
}
