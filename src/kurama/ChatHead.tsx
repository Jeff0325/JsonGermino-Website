import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type ChatHeadProps = {
  onClick: () => void;
};

// Persistent reopen bubble shown once KURAMA has been launched at least once
// and the panel is currently closed — clicking it reopens the same
// conversation instead of replaying the boot sequence (see Kurama.tsx).
//
// Plain fixed positioning on purpose: an earlier version repositioned this
// via JS on every scroll/visualViewport tick to compensate for mobile
// browser chrome, but that introduced more visible jitter than it removed.
// Native `position: fixed` is compositor-handled and smoother in practice.
//
// will-change-transform forces this onto its own GPU layer. Without it,
// real Android Chrome was seen lagging fixed elements behind the page during
// scroll (visibly dragged along with content, snapping to bottom-right only
// once scrolling stopped) whenever GSAP's ScrollTrigger scroll listeners
// were busy on the main thread — the browser fell back to repainting the
// "fixed" layer instead of letting the compositor pin it independently.
export default function ChatHead({ onClick }: ChatHeadProps) {
  return (
    <motion.button
      type="button"
      data-cursor-hover
      onClick={onClick}
      aria-label="Reopen KURAMA"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 will-change-transform items-center justify-center rounded-full border border-line bg-card/80 text-cyan shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)] backdrop-blur-xl"
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-cyan/40"
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <Sparkles className="h-5 w-5" />
    </motion.button>
  );
}
