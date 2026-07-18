import { profile } from "../../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <a
          href="#hero"
          data-cursor-hover
          className="font-mono-label text-[10px] text-ink-faint hover:text-cyan"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
