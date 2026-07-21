import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Building2 } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { experience } from "../../data/content";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineHeight = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="experience" className="relative overflow-hidden bg-secondary px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="03 · Experience"
          title="Where the skills were forged."
          align="center"
          className="mx-auto"
        />

        <div ref={containerRef} className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-line sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            className="absolute left-4 top-0 w-px origin-top bg-gradient-to-b from-cyan via-purple to-blue sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: lineHeight, height: "100%" }}
          />

          <div className="space-y-16">
            {experience.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={item.id}
                  className="relative grid grid-cols-1 gap-6 pl-12 sm:grid-cols-2 sm:gap-12 sm:pl-0"
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={isEven ? "sm:order-1 sm:text-right sm:pr-12" : "sm:order-2 sm:col-start-2 sm:pl-12"}
                  >
                    <GlassCard glow="purple" className="p-6 text-left">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-void/40 text-purple">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-display text-lg text-ink">{item.company}</div>
                          <div className="font-mono-label text-[10px] text-ink-faint">{item.period}</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm font-medium text-cyan">{item.role}</div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-dim">{item.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-ink-faint"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>

                  <div className={isEven ? "sm:order-2" : "sm:order-1 sm:row-start-1"} />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_3px_rgba(34,211,238,0.6)] sm:left-1/2"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
