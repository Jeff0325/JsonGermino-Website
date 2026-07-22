import { useCallback, useEffect, useRef, useState } from "react";

// Preferred male ("boy") English voices, most desirable first. Different
// platforms expose different TTS voices (desktop Chrome/Edge vs. Android vs.
// iOS Safari), so without picking one explicitly, each platform falls back to
// its own default voice — which is why mobile previously sounded different
// (often female) from desktop. Naming this list explicitly keeps the voice
// consistent everywhere it's available, falling back to a name-based
// male-voice heuristic when none of these exist on the device.
const PREFERRED_MALE_VOICES = [
  "Google UK English Male",
  "Microsoft David - English (United States)",
  "Microsoft David Desktop - English (United States)",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Microsoft Mark - English (United States)",
  "Daniel",
  "Fred",
  "Aaron",
];

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (voices.length === 0) return null;

  for (const name of PREFERRED_MALE_VOICES) {
    const match = voices.find((v) => v.name === name);
    if (match) return match;
  }

  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  const heuristicPool = englishVoices.length > 0 ? englishVoices : voices;
  const maleByName = heuristicPool.find(
    (v) => /\bmale\b/i.test(v.name) && !/female/i.test(v.name)
  );
  if (maleByName) return maleByName;

  return null;
}

export function useSpeechSynthesis() {
  // On by default: KURAMA only ever speaks in response to the visitor's own
  // "Launch KURAMA" click, never on page load, so this isn't page-load
  // autoplay — it's audio following a direct user gesture. Visitors can
  // still mute via the header toggle.
  const [enabled, setEnabled] = useState(true);
  const [supported] = useState(() => typeof window !== "undefined" && "speechSynthesis" in window);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!supported) return;

    const loadVoice = () => {
      voiceRef.current = pickMaleVoice(window.speechSynthesis.getVoices());
    };

    loadVoice();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoice);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoice);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !enabled) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      if (voiceRef.current) utterance.voice = voiceRef.current;
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
