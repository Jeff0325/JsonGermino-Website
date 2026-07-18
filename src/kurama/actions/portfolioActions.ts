import type { PortfolioAction } from "../engine/types";

export const HIGHLIGHT_PROJECTS_EVENT = "kurama:highlight-projects";

export type HighlightProjectsDetail = { ids: string[] };

export function navigateToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}

export function highlightProjects(projectIds: string[]) {
  navigateToSection("projects");
  window.dispatchEvent(
    new CustomEvent<HighlightProjectsDetail>(HIGHLIGHT_PROJECTS_EVENT, {
      detail: { ids: projectIds },
    })
  );
}

export function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function scrollToContact() {
  navigateToSection("contact");
}

export function executeAction(action: PortfolioAction) {
  switch (action.type) {
    case "navigate":
      navigateToSection(action.sectionId);
      break;
    case "highlightProjects":
      highlightProjects(action.projectIds);
      break;
    case "downloadResume":
      downloadResume();
      break;
    case "openExternal":
      openExternal(action.url);
      break;
  }
}
