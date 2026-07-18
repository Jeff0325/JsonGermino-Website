import SplitText from "./SplitText";
import { cn } from "../../lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto", "max-w-3xl", className)}>
      <div
        className={cn(
          "mb-5 flex items-center gap-3 font-mono-label text-xs text-cyan",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-cyan/60" />
        {eyebrow}
      </div>
      <SplitText
        as="h2"
        text={title}
        mode="word"
        className="text-4xl font-medium text-ink sm:text-5xl md:text-6xl"
      />
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-ink-dim sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
