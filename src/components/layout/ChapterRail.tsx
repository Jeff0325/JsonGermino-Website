import { useEffect, useState } from "react";
import { navItems } from "../../data/content";
import { cn } from "../../lib/utils";

export default function ChapterRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {navItems.map((item, i) => (
        <button
          key={item.id}
          data-cursor-hover
          onClick={() => scrollTo(item.id)}
          className="group flex items-center gap-3"
          aria-current={active === i ? "true" : undefined}
          aria-label={`Go to ${item.label}`}
        >
          <span
            className={cn(
              "font-mono-label text-[10px] text-ink-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              active === i && "opacity-100 text-cyan"
            )}
          >
            {String(i + 1).padStart(2, "0")} — {item.label}
          </span>
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full border border-ink-faint transition-all duration-300",
              active === i
                ? "scale-150 border-cyan bg-cyan shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]"
                : "group-hover:border-ink-dim"
            )}
          />
        </button>
      ))}
    </nav>
  );
}
