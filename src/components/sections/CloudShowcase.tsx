import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Database, Network, Server, ScrollText } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import NodeGraph from "../ui/NodeGraph";
import { azureServices, azureEdges } from "../../data/content";

const serviceInfo: Record<string, { detail: string; icon: React.ComponentType<{ className?: string }> }> = {
  vm: { detail: "Compute layer running the core application workloads.", icon: Server },
  gateway: { detail: "Layer-7 routing with SSL termination at the edge.", icon: Network },
  waf: { detail: "Filters malicious traffic before it reaches the app.", icon: ShieldCheck },
  lb: { detail: "Distributes traffic across healthy instances.", icon: Network },
  network: { detail: "Virtual network segmentation and NSG rules.", icon: Network },
  storage: { detail: "Blob storage for application assets and backups.", icon: Database },
  recovery: { detail: "Automated backup and disaster recovery vault.", icon: ShieldCheck },
  monitor: { detail: "Real-time health and performance monitoring.", icon: Activity },
  logs: { detail: "Centralized query and alerting on log data.", icon: ScrollText },
};

export default function CloudShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="cloud" className="relative bg-secondary px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="05 · Azure Cloud Engineering"
          title="Infrastructure that stays up when it matters."
          description="A resilient architecture pattern I deploy and adapt for production workloads on Microsoft Azure."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <GlassCard glow="blue" className="overflow-x-auto p-6 sm:p-8">
            <div className="min-w-[640px]" onMouseLeave={() => setHovered(null)}>
              <div
                onMouseOver={(e) => {
                  const target = (e.target as HTMLElement).closest("[data-node-id]");
                  if (target) setHovered(target.getAttribute("data-node-id"));
                }}
              >
                <NodeGraph
                  nodes={azureServices}
                  edges={azureEdges}
                  accent="blue"
                  highlightIds={hovered ? [hovered] : ["vm"]}
                />
              </div>
            </div>
          </GlassCard>

          <div className="space-y-3">
            {azureServices.slice(0, 5).map((service) => {
              const info = serviceInfo[service.id];
              const Icon = info?.icon ?? Server;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHovered(service.id)}
                  onMouseLeave={() => setHovered(null)}
                  data-cursor-hover
                  className="flex items-center gap-3 rounded-xl border border-line bg-card/40 p-4 transition-colors hover:border-blue/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-void/50 text-blue">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-ink">{service.label}</div>
                    <div className="text-xs text-ink-faint">{info?.detail}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
