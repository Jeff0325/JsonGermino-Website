import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubGlyph } from "../ui/BrandIcons";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import ProjectModal from "../ui/ProjectModal";
import { projects, projectCategoryLabels, type Project, type ProjectCategory } from "../../data/content";
import { cn } from "../../lib/utils";
import { HIGHLIGHT_PROJECTS_EVENT, type HighlightProjectsDetail } from "../../kurama/actions/portfolioActions";

const accentBg: Record<string, string> = {
  blue: "from-blue/25",
  purple: "from-purple/25",
  cyan: "from-cyan/25",
};
const accentText: Record<string, string> = {
  blue: "text-blue",
  purple: "text-purple",
  cyan: "text-cyan",
};

const CATEGORIES: ProjectCategory[] = ["web", "automation"];

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${accentBg[project.accent]} via-void/60 to-void opacity-80`} />
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());

  // KURAMA points visitors at specific projects (e.g. "Show React Projects")
  // by dispatching this event after scrolling here — see kurama/actions/portfolioActions.ts.
  useEffect(() => {
    let clearTimer: number | undefined;

    const onHighlight = (e: Event) => {
      const detail = (e as CustomEvent<HighlightProjectsDetail>).detail;
      setHighlighted(new Set(detail.ids));
      window.clearTimeout(clearTimer);
      clearTimer = window.setTimeout(() => setHighlighted(new Set()), 4000);
    };

    window.addEventListener(HIGHLIGHT_PROJECTS_EVENT, onHighlight);
    return () => {
      window.removeEventListener(HIGHLIGHT_PROJECTS_EVENT, onHighlight);
      window.clearTimeout(clearTimer);
    };
  }, []);

  return (
    <section id="projects" className="relative bg-void px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="06 · Projects"
          title="Selected work, shipped and running."
          description="A cross-section of client and product work spanning full-stack web development and AI-driven automation."
        />

        <div className="mt-16 space-y-16">
          {CATEGORIES.map((category) => {
            const categoryProjects = projects.filter((p) => p.category === category);
            if (categoryProjects.length === 0) return null;

            return (
              <div key={category}>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="font-display text-xl text-ink sm:text-2xl">{projectCategoryLabels[category]}</h3>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                    >
                      <TiltCard
                        onClick={() => setSelected(project)}
                        className={cn(
                          "group h-full overflow-hidden rounded-2xl border border-line bg-card transition-shadow duration-500",
                          highlighted.has(project.id) && "border-cyan/60 shadow-[0_0_60px_-12px_rgba(34,211,238,0.55)]"
                        )}
                      >
                        <div className="relative flex h-full min-h-[240px] flex-col justify-end overflow-hidden p-6">
                          <ProjectPreview project={project} />
                          <div className="relative">
                            <span className={`font-mono-label text-xs ${accentText[project.accent]}`}>
                              {project.technologies[0]}
                            </span>
                            <h3 className="mt-3 font-display text-xl text-ink">{project.name}</h3>
                            <p className="mt-2 line-clamp-3 text-sm text-ink-dim">{project.tagline}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {project.technologies.slice(1, 4).map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[10px] text-ink-faint"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="mt-5 flex items-center gap-4 font-mono-label text-[10px] text-ink-faint">
                              <span className="inline-flex items-center gap-1 group-hover:text-cyan">
                                Details <ArrowUpRight className="h-3 w-3" />
                              </span>
                              {project.github && (
                                <span className="inline-flex items-center gap-1">
                                  <GithubGlyph className="h-3 w-3" /> Source
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
