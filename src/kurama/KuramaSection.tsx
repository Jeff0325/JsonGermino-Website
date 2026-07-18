import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mic } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import GradientField from "../components/ui/GradientField";
import MagneticButton from "../components/ui/MagneticButton";
import TypingText from "./components/TypingText";

type KuramaSectionProps = {
  onLaunch: () => void;
};

const GREETING_PREVIEW =
  "Hey, I'm KURAMA! I know pretty much everything about Jefferson — his projects, his skills, all of it. Curious about something? Launch me and just ask.";

const WAVEFORM_BARS = [0.5, 0.9, 0.6, 1, 0.45, 0.8, 0.35];

function VoiceWaveform() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-line bg-card/50 px-4 py-2.5 backdrop-blur-xl">
      <Mic className="h-3.5 w-3.5 text-cyan" />
      <div className="flex h-4 items-end gap-[3px]">
        {WAVEFORM_BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-blue via-purple to-cyan"
            style={{ height: "100%", transformOrigin: "bottom" }}
            animate={{ scaleY: [h * 0.35, h, h * 0.3, h * 0.85, h * 0.35] }}
            transition={{
              duration: 1.2 + (i % 3) * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
      <span className="font-mono-label text-[10px] text-ink-faint">Voice Enabled</span>
    </div>
  );
}

// Always rendered (not lazy) — this is just the teaser card. The heavy chat
// engine only loads once onLaunch triggers the lazy KuramaPanel (see Kurama.tsx).
export default function KuramaSection({ onLaunch }: KuramaSectionProps) {
  const [hasGreeted, setHasGreeted] = useState(false);

  return (
    <section id="kurama" className="relative overflow-hidden bg-void px-6 py-32 sm:px-10">
      <GradientField variant="section" />

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionHeading
          eyebrow="00 · Meet KURAMA"
          title="Your Interactive Portfolio Guide"
          description="Instead of browsing through every section of my portfolio, simply ask KURAMA. KURAMA can explain my experience, showcase my projects, describe my cloud architecture, demonstrate my AI and automation work, and guide you through my portfolio."
          align="center"
          className="mx-auto"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex justify-center"
        >
          <VoiceWaveform />
        </motion.div>

        <motion.div
          onViewportEnter={() => setHasGreeted(true)}
          viewport={{ once: true, margin: "-20%" }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan/30"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-purple/25"
              animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-card/70 text-cyan backdrop-blur-xl">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          {hasGreeted && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-md rounded-2xl border border-line bg-card/60 px-5 py-4 text-left text-sm leading-relaxed text-ink-dim backdrop-blur-xl"
            >
              <TypingText text={GREETING_PREVIEW} speed={22} />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <MagneticButton
              onClick={onLaunch}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-8 py-4 text-sm font-medium text-ink backdrop-blur-xl transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              Launch KURAMA
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
