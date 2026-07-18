import profileData from "./profile.json";
import summaryData from "./summary.json";
import experienceData from "./experience.json";
import projectsData from "./projects.json";
import skillsData from "./skills.json";
import contactData from "./contact.json";
import linksData from "./links.json";

export type ProjectCategory = "web" | "automation";

export type KnowledgeProject = {
  id: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  technologies: string[];
  github?: string;
};

export type KnowledgeExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
};

export type KnowledgeSkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

export type KnowledgeProfile = typeof profileData;
export type KnowledgeSummary = typeof summaryData;
export type KnowledgeContact = typeof contactData;
export type KnowledgeLinks = typeof linksData;

export type KnowledgeBase = {
  profile: KnowledgeProfile;
  summary: KnowledgeSummary;
  experience: KnowledgeExperience[];
  projects: KnowledgeProject[];
  skills: KnowledgeSkillCategory[];
  contact: KnowledgeContact;
  links: KnowledgeLinks;
};

export function getKnowledgeBase(): KnowledgeBase {
  return {
    profile: profileData,
    summary: summaryData,
    experience: experienceData as KnowledgeExperience[],
    projects: projectsData as KnowledgeProject[],
    skills: skillsData as KnowledgeSkillCategory[],
    contact: contactData,
    links: linksData,
  };
}
