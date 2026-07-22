import { useCallback, useEffect, useRef, useState } from "react";

// Preferred male ("boy") English voices, most desirable first. Where one of
// these exists (Windows desktop, some Android devices with Google's network
// TTS voices installed), it's picked by name and spoken at normal pitch.
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

// Many Android devices only expose their system TTS as one generic voice per
// language ("English United States", lang en_US) with no gender variant at
// all to select by name — confirmed via direct device inspection: 94 voices,
// every one named by locale only. Voice selection can't fix that, so this is
// the fallback for when no named match exists: lower the pitch on whatever
// voice the device actually has, nudging it toward sounding more male/boyish
// instead of leaving it at its own (often higher-pitched) default.
const FALLBACK_PITCH = 0.8;

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
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
        utterance.pitch = 1;
      } else {
        utterance.pitch = FALLBACK_PITCH;
      }
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
