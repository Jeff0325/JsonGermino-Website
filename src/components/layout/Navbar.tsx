import { useEffect, useState } from "react";
import MagneticButton from "../ui/MagneticButton";
import { cn } from "../../lib/utils";
import { useViewportPin } from "../../hooks/useViewportInsets";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useViewportPin<HTMLElement>("top", 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-line bg-void/80 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <a
          href="#hero"
          data-cursor-hover
          className="font-display text-sm font-medium tracking-tight text-ink"
        >
          JG<span className="text-cyan">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#projects"
            data-cursor-hover
            className="font-mono-label text-xs text-ink-dim transition-colors hover:text-ink"
          >
            Work
          </a>
          <a
            href="#automation"
            data-cursor-hover
            className="font-mono-label text-xs text-ink-dim transition-colors hover:text-ink"
          >
            Automation
          </a>
          <a
            href="#about"
            data-cursor-hover
            className="font-mono-label text-xs text-ink-dim transition-colors hover:text-ink"
          >
            About
          </a>
        </div>

        <MagneticButton
          onClick={scrollToContact}
          className="rounded-full border border-line bg-card px-5 py-2 font-mono-label text-xs text-ink hover:border-cyan/50 hover:text-cyan"
        >
          Contact
        </MagneticButton>
      </div>
    </header>
  );
}
