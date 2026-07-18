import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";
import { GithubGlyph, LinkedinGlyph } from "../ui/BrandIcons";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import MagneticButton from "../ui/MagneticButton";
import GradientField from "../ui/GradientField";
import { profile } from "../../data/content";

const socialLinks = [
  { label: "GitHub", href: profile.socials.github, icon: GithubGlyph },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinGlyph },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

// TODO: paste your Web3Forms Access Key here (from web3forms.com/dashboard)
const WEB3FORMS_ACCESS_KEY = "ac350ede-d665-4fe5-95ea-b631ed16e0c9";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.success) {
        setSent(true);
      } else {
        setError("Something went wrong — please try again, or email me directly.");
      }
    } catch {
      setError("Something went wrong — please try again, or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-secondary px-6 py-32 sm:px-10">
      <GradientField variant="section" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="07 · Contact"
          title="Let's build something intelligent."
          description="Open to freelance projects, full-time roles, and collaborations involving web platforms, Azure infrastructure, or AI-driven automation."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
              { icon: MapPin, label: "Location", value: profile.location, href: undefined },
            ].map((item) => (
              <GlassCard key={item.label} glow="cyan" className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-void/50 text-cyan">
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="font-mono-label text-[10px] text-ink-faint">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} data-cursor-hover className="text-sm text-ink hover:text-cyan">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm text-ink">{item.value}</div>
                  )}
                </div>
              </GlassCard>
            ))}

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <MagneticButton
                  as="a"
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-dim hover:border-cyan/50 hover:text-cyan"
                >
                  <social.icon className="h-4 w-4" />
                </MagneticButton>
              ))}
            </div>
          </div>

          <GlassCard glow="purple" className="p-7 sm:p-9">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl text-ink">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-ink-dim">
                  Thanks for reaching out — I'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono-label text-[10px] text-ink-faint">Name</span>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-lg border border-line bg-void/50 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-cyan/50 focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono-label text-[10px] text-ink-faint">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      className="mt-2 w-full rounded-lg border border-line bg-void/50 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-cyan/50 focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="font-mono-label text-[10px] text-ink-faint">Message</span>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    placeholder="Tell me about your project…"
                    className="mt-2 w-full resize-none rounded-lg border border-line bg-void/50 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-cyan/50 focus:outline-none"
                  />
                </label>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <MagneticButton
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-void hover:bg-white disabled:opacity-60 sm:w-auto"
                >
                  {sending ? "Sending…" : "Send Message"}
                  {!sending && <Send className="h-4 w-4" />}
                </MagneticButton>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}