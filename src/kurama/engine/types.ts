export type Intent =
  | "GREETING"
  | "PROFILE"
  | "SKILLS"
  | "PROJECTS_REACT"
  | "PROJECTS_WEB"
  | "PROJECTS_AI"
  | "PROJECTS_AUTOMATION"
  | "CLOUD"
  | "EXPERIENCE"
  | "RESUME"
  | "GITHUB"
  | "LINKEDIN"
  | "CONTACT"
  | "UNKNOWN";

export type PortfolioAction =
  | { type: "navigate"; sectionId: string }
  | { type: "highlightProjects"; projectIds: string[] }
  | { type: "downloadResume" }
  | { type: "openExternal"; url: string };

export type KuramaResponse = {
  text: string;
  action?: PortfolioAction;
  suggestions?: string[];
};
