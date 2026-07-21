import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 will-change-transform transition-all duration-500",
        scrolled
          ? // backdrop-blur is dropped on touch: it has to keep re-sampling the
            // scrolling content behind a fixed element every frame, which is
            // heavy enough on Android GPUs to make the whole bar lag behind
            // the scroll gesture. bg opacity goes up on touch to compensate.
            "border-b border-line bg-void/80 backdrop-blur-xl [@media(pointer:coarse)]:bg-void/95 [@media(pointer:coarse)]:backdrop-blur-none"
          : "border-b border-transparent"
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
      </div>
    </header>
  );
}
