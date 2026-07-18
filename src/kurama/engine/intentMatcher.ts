import type { Intent } from "./types";

type Rule = { intent: Intent; patterns: RegExp[] };

// Order matters — first matching rule wins, so more specific intents sit above
// their more general neighbors (e.g. "azure" before a generic "cloud" mention,
// "experience" before the looser "profile" catch-all).
const rules: Rule[] = [
  { intent: "GITHUB", patterns: [/\bgithub\b/] },
  { intent: "LINKEDIN", patterns: [/\blinkedin\b/] },
  { intent: "RESUME", patterns: [/\bresume\b/, /\bcv\b/, /\bdownload\b/] },
  { intent: "CONTACT", patterns: [/\bcontact\b/, /\breach (him|you|out)\b/, /\bhire\b/, /\bemail\b/, /\bget in touch\b/] },
  { intent: "CLOUD", patterns: [/\bazure\b/, /\bcloud\b/, /\binfrastructure\b/, /\bdevops\b/] },
  { intent: "PROJECTS_REACT", patterns: [/\breact\b/] },
  { intent: "PROJECTS_AI", patterns: [/\bai\b/, /\bartificial intelligence\b/, /\bmachine learning\b/, /\bllm\b/, /\bclaude\b/, /\bopenai\b/, /\bollama\b/] },
  { intent: "PROJECTS_AUTOMATION", patterns: [/\bautomation\b/, /\bautomat(e|ed|ing)\b/, /\bn8n\b/, /\bmake\.com\b/, /\bworkflow\b/] },
  { intent: "PROJECTS_WEB", patterns: [/\bweb\b/, /\bfrontend\b/, /\bfront-end\b/] },
  { intent: "EXPERIENCE", patterns: [/\bexperience\b/, /\bwork history\b/, /\bcareer\b/, /\bjob\b/] },
  { intent: "SKILLS", patterns: [/\bskills?\b/, /\btech stack\b/, /\btechnologies\b/] },
  { intent: "PROFILE", patterns: [/\babout\b/, /\bwho is\b/, /\btell me about\b/, /\byourself\b/, /\bbio\b/, /\bjefferson\b/] },
  { intent: "GREETING", patterns: [/^\s*(hi|hello|hey|yo|good (morning|afternoon|evening))\b/] },
];

export function matchIntent(input: string): Intent {
  const text = input.toLowerCase().trim();
  if (!text) return "UNKNOWN";

  for (const rule of rules) {
    if (rule.patterns.some((pattern) => pattern.test(text))) {
      return rule.intent;
    }
  }

  if (/\bproject/.test(text)) return "PROJECTS_WEB";
  return "UNKNOWN";
}
