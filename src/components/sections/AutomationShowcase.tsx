import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import NodeGraph from "../ui/NodeGraph";
import GradientField from "../ui/GradientField";
import { automationNodes, automationEdges, consoleLog, profile } from "../../data/content";

function LiveConsole() {
  const [lines, setLines] = useState<string[]>([consoleLog[0]]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % consoleLog.length;
      setLines((prev) => [...prev.slice(-5), consoleLog[i]]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <GlassCard glow="cyan" className="flex h-full flex-col p-5">
      <div className="mb-3 flex items-center gap-2 border-b border-line pb-3 font-mono-label text-[10px] text-ink-faint">
        <Terminal className="h-3.5 w-3.5 text-cyan" />
        workflow.log
        <span className="ml-auto flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
          <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-glow" />
        </span>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden font-mono text-[11px] leading-relaxed">
        {lines.map((line, i) => (
          <motion.div
            key={`${line}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: i === lines.length - 1 ? 1 : 0.4, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-ink-dim"
          >
            <span className="text-cyan">$</span> {line}
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

export default function AutomationShowcase() {
  return (
    <section id="automation" className="relative overflow-hidden bg-void px-6 py-32 sm:px-10">
      <GradientField variant="section" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="04 · AI Workflow Automation"
          title="Systems that run while you sleep."
          description={profile.tagline}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <GlassCard glow="purple" className="overflow-x-auto p-6 sm:p-8">
            <div className="min-w-[720px]">
              <NodeGraph
                nodes={automationNodes}
                edges={automationEdges}
                accent="purple"
                highlightIds={["n8n", "make"]}
              />
            </div>
          </GlassCard>

          <LiveConsole />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Intake", detail: "Telegram, Gmail & web forms trigger the pipeline instantly." },
            { label: "Reasoning", detail: "OpenAI, Claude, and local Ollama models handle understanding and drafting." },
            { label: "Action", detail: "CRM, Sheets, Gmail, and Slack stay in sync automatically." },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-line bg-card/40 p-5">
              <div className="font-mono-label text-[10px] text-purple">{item.label}</div>
              <p className="mt-2 text-sm text-ink-dim">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
