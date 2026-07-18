import { useEffect, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import SplitText from "../ui/SplitText";
import MagneticButton from "../ui/MagneticButton";
import GradientField from "../ui/GradientField";
import { profile } from "../../data/content";

const HeroObject = lazy(() => import("../../three/HeroObject"));

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="relative mt-6 h-24 w-24 shrink-0 sm:h-28 sm:w-28"
    >
      <motion.span
        className="absolute -inset-3 rounded-full bg-blue/30 blur-xl"
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute -inset-1.5 rounded-full border border-cyan/50"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <div className="relative h-full w-full overflow-hidden rounded-full border border-line bg-card/50 shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]">
        <img
          src="/profile.png"
          alt={profile.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % profile.roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-8 items-center overflow-hidden font-mono text-sm text-cyan sm:text-base">
      <span className="mr-2 text-ink-faint">{"//"}</span>
      <motion.span
        key={index}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {profile.roles[index]}
      </motion.span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-void px-6 pt-28 sm:px-10"
    >
      <GradientField variant="hero" />

      {/* faint grid */}
      <div
        className="pointer-events-none absolute inset-0 grid-fade-mask opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card/50 px-4 py-1.5 font-mono-label text-[11px] text-ink-dim"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan" />
            Available for new projects
          </motion.div>

          <h1 className="text-5xl font-medium uppercase leading-[0.98] text-ink sm:text-7xl lg:text-[5.5rem]">
            <SplitText text="Jefferson" mode="char" trigger="mount" className="block" />
            {/* Rendered as one unit (not per-character split) — background-clip
                gradient text breaks when the glyphs live inside the nested
                will-change:transform spans SplitText uses for its stagger reveal. */}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-gradient block"
            >
              Germino
            </motion.span>
          </h1>

          <ProfilePhoto />

          <div className="mt-6">
            <RoleCycler />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-ink-dim sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-void hover:bg-white"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink hover:border-ink-dim"
            >
              <Download className="h-4 w-4" />
              Resume
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-ink-dim hover:text-ink"
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-full max-w-[560px] justify-self-center lg:justify-self-end"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-blue/20 blur-[100px]" />
          <Suspense fallback={<div className="h-full w-full" />}>
            <HeroObject />
          </Suspense>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-faint"
        aria-label="Scroll to next section"
      >
        <span className="font-mono-label text-[10px]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
