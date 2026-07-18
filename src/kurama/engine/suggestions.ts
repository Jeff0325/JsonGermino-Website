import type { Intent } from "./types";

// Single source of truth for suggestion-chip labels: each maps to an exact
// Intent so chip clicks skip the free-text matcher entirely.
export const SUGGESTION_INTENTS: Record<string, Intent> = {
  "Tell me about Jefferson": "PROFILE",
  "Show React Projects": "PROJECTS_REACT",
  "Show Azure Projects": "CLOUD",
  "Show AI Projects": "PROJECTS_AI",
  "Show Automation Projects": "PROJECTS_AUTOMATION",
  "Explain Jefferson's Experience": "EXPERIENCE",
  "Download Resume": "RESUME",
  "Open GitHub": "GITHUB",
  "Open LinkedIn": "LINKEDIN",
  "Contact Jefferson": "CONTACT",
};

export const INITIAL_SUGGESTIONS = Object.keys(SUGGESTION_INTENTS);
