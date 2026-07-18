import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Counter from "../ui/Counter";
import { aboutText, stats } from "../../data/content";

const orbitTech = [
  "React", "Azure", "C#", "n8n", "SQL", "Docker", "Claude", "Figma",
];

function OrbitRing() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[12%] rounded-full border border-line/70" />
      <div className="absolute inset-[24%] rounded-full border border-line/50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-24 w-24 rounded-2xl border border-line bg-card/80 backdrop-blur-xl flex items-center justify-center font-display text-xs text-center text-ink-dim px-2">
          Web · Cloud · AI
        </div>
      </div>

      <div className="absolute inset-0 animate-[spin_28s_linear_infinite]">
        {orbitTech.slice(0, 4).map((tech, i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 50;
          return (
            <div
              key={tech}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card font-mono text-[10px] text-ink-dim"
              style={{
                transform: `translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%) translate(-50%, -50%)`,
              }}
            >
              <span className="animate-[spin_28s_linear_infinite_reverse]">{tech}</span>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-[8%] animate-[spin_38s_linear_infinite_reverse]">
        {orbitTech.slice(4).map((tech, i) => {
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          const radius = 50;
          return (
            <div
              key={tech}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card font-mono text-[10px] text-ink-dim"
              style={{
                transform: `translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%) translate(-50%, -50%)`,
              }}
            >
              <span className="animate-[spin_38s_linear_infinite]">{tech}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative bg-secondary px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
          <div>
            <SectionHeading
              eyebrow="01 · About"
              title="From break-fix to build-forward."
            />

            <div className="mt-10 space-y-6">
              {aboutText.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl text-balance text-base leading-relaxed text-ink-dim sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <OrbitRing />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-3xl font-medium text-ink sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 font-mono-label text-[10px] text-ink-faint">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
