import type { KnowledgeBase, KnowledgeProject, ProjectCategory } from "../knowledge";
import type { Intent, KuramaResponse } from "./types";

function projectsByCategory(projects: KnowledgeProject[], category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}

function projectsByTech(projects: KnowledgeProject[], tech: string) {
  return projects.filter((p) => p.technologies.some((t) => t.trim().toLowerCase() === tech.toLowerCase()));
}

function listProjectNames(projects: KnowledgeProject[]) {
  if (projects.length === 0) return "";
  if (projects.length === 1) return projects[0].name;
  return `${projects
    .slice(0, -1)
    .map((p) => p.name)
    .join(", ")} and ${projects[projects.length - 1].name}`;
}

const DEFAULT_SUGGESTIONS = [
  "Tell me about Jefferson",
  "Show React Projects",
  "Show AI Projects",
  "Explain Jefferson's Experience",
  "Contact Jefferson",
];

export interface ResponseProvider {
  generate(intent: Intent, knowledge: KnowledgeBase, rawInput: string): KuramaResponse;
}

/**
 * v1 response source: templated prose built from the local knowledge base.
 * A future LLMResponseProvider (OpenAI/Claude/Ollama) can implement the same
 * interface without the UI or command processor changing.
 */
export class TemplateResponseProvider implements ResponseProvider {
  generate(intent: Intent, knowledge: KnowledgeBase, rawInput: string): KuramaResponse {
    switch (intent) {
      case "GREETING":
        return {
          text: `Hey there! Ask me about ${knowledge.profile.name.split(" ")[0]}'s projects, experience, or skills — or pick a topic below.`,
          suggestions: DEFAULT_SUGGESTIONS,
        };

      case "PROFILE": {
        const { summary } = knowledge;
        return {
          text: `${summary.headline} ${summary.paragraphs[0]}`,
          suggestions: ["Show React Projects", "Explain Jefferson's Experience", "Contact Jefferson"],
        };
      }

      case "SKILLS": {
        const topSkills = knowledge.skills.map((c) => `${c.title} (${c.skills.slice(0, 3).join(", ")})`).join("; ");
        return {
          text: `Jefferson works across ${knowledge.skills.length} skill areas: ${topSkills}.`,
          action: { type: "navigate", sectionId: "skills" },
          suggestions: ["Show React Projects", "Show Azure Projects", "Show Automation Projects"],
        };
      }

      case "PROJECTS_REACT": {
        const matches = knowledge.projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === "react"));
        return {
          text: matches.length
            ? `Here's Jefferson's React work: ${listProjectNames(matches)}. Scrolling you down to take a look.`
            : "Jefferson's projects are showcased in the Projects section — scrolling you there now.",
          action: { type: "highlightProjects", projectIds: matches.map((p) => p.id) },
          suggestions: ["Show AI Projects", "Show Automation Projects", "Explain Jefferson's Experience"],
        };
      }

      case "PROJECTS_WEB": {
        const matches = projectsByCategory(knowledge.projects, "web");
        return {
          text: matches.length
            ? `Jefferson's web development projects: ${listProjectNames(matches)}.`
            : "Jefferson's projects are showcased in the Projects section — scrolling you there now.",
          action: { type: "highlightProjects", projectIds: matches.map((p) => p.id) },
          suggestions: ["Show React Projects", "Show Automation Projects", "Show AI Projects"],
        };
      }

      case "PROJECTS_AI": {
        const matches = projectsByTech(knowledge.projects, "ai");
        return {
          text: matches.length
            ? `Jefferson's AI-powered work includes ${listProjectNames(matches)} — using AI to read, categorize, and respond automatically instead of relying on manual work. Taking you to the Projects section.`
            : "Jefferson's AI work is folded into the Automation showcase — scrolling you there.",
          action: { type: "highlightProjects", projectIds: matches.map((p) => p.id) },
          suggestions: ["Show Automation Projects", "Show React Projects", "Contact Jefferson"],
        };
      }

      case "PROJECTS_AUTOMATION": {
        const matches = projectsByCategory(knowledge.projects, "automation");
        return {
          text: matches.length
            ? `${listProjectNames(matches)} — Jefferson designed automation workflows connecting tools like n8n and Make.com with AI and OCR to remove repetitive manual work. Here's the case study.`
            : "Jefferson's automation work is showcased in the Automation section — scrolling you there.",
          action: { type: "highlightProjects", projectIds: matches.map((p) => p.id) },
          suggestions: ["Show AI Projects", "Show Azure Projects", "Explain Jefferson's Experience"],
        };
      }

      case "CLOUD":
        return {
          text: "Jefferson's cloud engineering centers on Microsoft Azure — virtual machines, load balancing, WAF, disaster recovery, and monitoring. Here's the architecture he's built.",
          action: { type: "navigate", sectionId: "cloud" },
          suggestions: ["Explain Jefferson's Experience", "Show Automation Projects", "Contact Jefferson"],
        };

      case "EXPERIENCE": {
        const [latest] = knowledge.experience;
        return {
          text: latest
            ? `Currently, Jefferson is a ${latest.role} at ${latest.company} (${latest.period}). ${latest.description}`
            : "Let me take you to Jefferson's experience timeline.",
          action: { type: "navigate", sectionId: "experience" },
          suggestions: ["Show Azure Projects", "Show Automation Projects", "Contact Jefferson"],
        };
      }

      case "RESUME":
        return {
          text: "Sure — downloading Jefferson's resume now.",
          action: { type: "downloadResume" },
          suggestions: ["Tell me about Jefferson", "Contact Jefferson"],
        };

      case "GITHUB":
        return {
          text: "Opening Jefferson's GitHub in a new tab.",
          action: { type: "openExternal", url: knowledge.links.github },
          suggestions: DEFAULT_SUGGESTIONS,
        };

      case "LINKEDIN":
        return {
          text: "Opening Jefferson's LinkedIn in a new tab.",
          action: { type: "openExternal", url: knowledge.links.linkedin },
          suggestions: DEFAULT_SUGGESTIONS,
        };

      case "CONTACT":
        return {
          text: `Best way to reach Jefferson is ${knowledge.contact.email} — or use the contact form. Scrolling you there now.`,
          action: { type: "navigate", sectionId: "contact" },
          suggestions: ["Download Resume", "Open GitHub", "Open LinkedIn"],
        };

      default:
        return {
          text: `I'm not sure about "${rawInput.trim()}" yet — but I can tell you about Jefferson's experience, projects, skills, or how to get in touch.`,
          suggestions: DEFAULT_SUGGESTIONS,
        };
    }
  }
}
