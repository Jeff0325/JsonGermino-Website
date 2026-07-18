import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "../../lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
};

export default function TiltCard({ children, className, onClick, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;

    const glare = el.querySelector<HTMLElement>("[data-tilt-glare]");
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.10), transparent 55%)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      data-cursor-hover
      className={cn(
        "relative transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d]",
        className
      )}
    >
      <div data-tilt-glare className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity" />
      {children}
    </div>
  );
}
