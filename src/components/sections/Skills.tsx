import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Server, Cloud, Workflow, GitBranch, PenTool, Plus,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { skillCategories } from "../../data/content";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: Code2,
  backend: Server,
  cloud: Cloud,
  automation: Workflow,
  devops: GitBranch,
  uiux: PenTool,
};

const glowColor: Record<string, "blue" | "purple" | "cyan"> = {
  frontend: "cyan",
  backend: "blue",
  cloud: "blue",
  automation: "purple",
  devops: "cyan",
  uiux: "purple",
};

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="relative bg-void px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="02 · Skills"
          title="A bit of everything, done properly."
          description="I build the interfaces people use, the infrastructure behind them, and the automation that ties it all together — so I can take a project from idea to something that actually works."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = icons[category.id] ?? Code2;
            const isActive = active === category.id;
            const glow = glowColor[category.id];

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <GlassCard
                  glow={glow}
                  onMouseEnter={() => setActive(category.id)}
                  onMouseLeave={() => setActive(null)}
                  data-cursor-hover
                  className="group cursor-pointer p-7"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-void/40 text-cyan transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-6"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <Plus
                      className={`h-4 w-4 text-ink-faint transition-transform duration-300 ${
                        isActive ? "rotate-45 text-cyan" : ""
                      }`}
                    />
                  </div>

                  <h3 className="mt-6 font-display text-xl text-ink">{category.title}</h3>
                  <p className="mt-1 text-sm text-ink-dim">{category.description}</p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-line bg-void/60 px-3 py-1 font-mono text-[11px] text-ink-dim"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                      {category.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-line/70 px-2.5 py-1 font-mono text-[10px] text-ink-faint"
                        >
                          {skill}
                        </span>
                      ))}
                      {category.skills.length > 3 && (
                        <span className="px-2.5 py-1 font-mono text-[10px] text-ink-faint">
                          +{category.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
