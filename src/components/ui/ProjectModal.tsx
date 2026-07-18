import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { GithubGlyph } from "./BrandIcons";
import { projectCategoryLabels, type Project } from "../../data/content";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const accentText: Record<string, string> = {
  blue: "text-blue",
  purple: "text-purple",
  cyan: "text-cyan",
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-card p-8 sm:p-10"
          >
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close project details"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-dim transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              <X className="h-4 w-4" />
            </button>

            <div className={`font-mono-label text-xs ${accentText[project.accent]}`}>
              {projectCategoryLabels[project.category]}
            </div>
            <h3 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{project.name}</h3>

            <div className="mt-8 space-y-6">
              <div>
                <div className="font-mono-label text-[10px] text-ink-faint">Overview</div>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{project.tagline}</p>
              </div>
              <div>
                <div className="font-mono-label text-[10px] text-ink-faint">Technologies</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-void/50 px-3 py-1 font-mono text-[11px] text-ink-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {(project.github || project.demo) && (
              <div className="mt-9 flex flex-wrap gap-3 border-t border-line pt-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink hover:border-ink-dim"
                  >
                    <GithubGlyph className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-void hover:bg-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
