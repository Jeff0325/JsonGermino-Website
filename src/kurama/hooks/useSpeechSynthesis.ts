import { useCallback, useEffect, useState } from "react";

export function useSpeechSynthesis() {
  // On by default: KURAMA only ever speaks in response to the visitor's own
  // "Launch KURAMA" click, never on page load, so this isn't page-load
  // autoplay — it's audio following a direct user gesture. Visitors can
  // still mute via the header toggle.
  const [enabled, setEnabled] = useState(true);
  const [supported] = useState(() => typeof window !== "undefined" && "speechSynthesis" in window);

  useEffect(() => {
    return () => {
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !enabled) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    },
    [supported, enabled]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (!next && supported) window.speechSynthesis.cancel();
      return next;
    });
  }, [supported]);

  return { enabled, toggle, speak, supported };
}
