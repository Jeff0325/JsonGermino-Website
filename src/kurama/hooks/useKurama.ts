import { useCallback, useEffect, useState } from "react";
import { commandProcessor } from "../engine/commandProcessor";
import { executeAction } from "../actions/portfolioActions";
import { INITIAL_SUGGESTIONS } from "../engine/suggestions";
import type { Intent } from "../engine/types";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useSpeechSynthesis } from "./useSpeechSynthesis";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export type KuramaPhase = "booting" | "ready";

export const GREETING_TEXT =
  "Hello, and welcome to Jefferson Germino's portfolio. I'm KURAMA, your interactive portfolio guide. I can answer questions about Jefferson's experience, projects, cloud engineering, AI, automation, and technical skills. You can type a question, choose one of the suggested topics, or enable voice mode.";

function nextMessageId() {
  // crypto.randomUUID() rather than a module-level counter — a counter
  // resets on module reload (e.g. dev-server HMR) while existing messages
  // stay in state, producing duplicate React keys.
  return `kurama-msg-${crypto.randomUUID()}`;
}

export function useKurama(reducedMotion: boolean) {
  const [phase, setPhase] = useState<KuramaPhase>("booting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);

  const voice = useSpeechSynthesis();

  const pushMessage = useCallback((role: ChatMessage["role"], text: string) => {
    setMessages((prev) => [...prev, { id: nextMessageId(), role, text }]);
  }, []);

  const respond = useCallback(
    async (text: string, intentOverride?: Intent) => {
      setThinking(true);
      const response = await commandProcessor.processMessage(text, intentOverride);
      setThinking(false);
      pushMessage("assistant", response.text);
      voice.speak(response.text);
      if (response.suggestions) setSuggestions(response.suggestions);
      if (response.action) {
        const action = response.action;
        // openExternal/downloadResume fire immediately — delaying a
        // window.open() call risks the browser's popup blocker treating it
        // as outside the click's user-activation window. navigate/highlight
        // get a short beat so the reply is readable before the page moves.
        if (action.type === "openExternal" || action.type === "downloadResume") {
          executeAction(action);
        } else {
          window.setTimeout(() => executeAction(action), 700);
        }
      }
    },
    [pushMessage, voice]
  );

  const send = useCallback(
    (text: string, intentOverride?: Intent) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      pushMessage("user", trimmed);
      void respond(trimmed, intentOverride);
    },
    [pushMessage, respond]
  );

  const sendSuggestion = useCallback(
    (label: string, intent: Intent) => send(label, intent),
    [send]
  );

  const speech = useSpeechRecognition((transcript) => send(transcript));

  useEffect(() => {
    if (speech.permissionDenied) {
      setMicNotice("No problem. You can continue chatting by typing your questions.");
    }
  }, [speech.permissionDenied]);

  useEffect(() => {
    const bootDuration = reducedMotion ? 300 : 2600;
    const timer = window.setTimeout(() => {
      pushMessage("assistant", GREETING_TEXT);
      voice.speak(GREETING_TEXT);
      setPhase("ready");
    }, bootDuration);
    return () => window.clearTimeout(timer);
    // Runs once on mount — booting is a one-time intro sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    phase,
    messages,
    suggestions,
    thinking,
    micNotice,
    dismissMicNotice: () => setMicNotice(null),
    send,
    sendSuggestion,
    speech,
    voice,
  };
}
