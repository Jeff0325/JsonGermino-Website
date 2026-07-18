import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../../lib/utils";

gsap.registerPlugin(ScrollTrigger);

type SplitTextProps = {
  text: string;
  className?: string;
  mode?: "word" | "char";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  trigger?: "scroll" | "mount";
  stagger?: number;
};

export default function SplitText({
  text,
  className,
  mode = "word",
  as = "p",
  delay = 0,
  trigger = "scroll",
  stagger,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-split-item]");
    const defaultStagger = mode === "char" ? 0.02 : 0.07;

    const anim = gsap.fromTo(
      items,
      { yPercent: 120, opacity: 0, rotateZ: 4 },
      {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: stagger ?? defaultStagger,
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: el,
                start: "top 85%",
                once: true,
              }
            : undefined,
      }
    );

    return () => {
      anim.kill();
    };
  }, [text, mode, delay, trigger, stagger]);

  const pieces = mode === "char" ? Array.from(text) : text.split(" ");

  return (
    <Tag ref={containerRef as never} className={cn("inline-block", className)}>
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em" }}
        >
          <span data-split-item className="inline-block will-change-transform">
            {piece === " " ? "\u00A0" : piece}
            {mode === "word" && i !== pieces.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
