import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/utils";

type MagneticButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function MagneticButton<T extends ElementType = "button">({
  as,
  children,
  className,
  strength = 22,
  ...props
}: MagneticButtonProps<T>) {
  const ref = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (as || "button") as any;

  // Pointer Events report the real input device per-interaction (pointerType),
  // unlike mouse events which touch interactions can also synthesize — that
  // synthetic mousemove was dragging this button out of place on mobile taps
  // with no matching mouseleave to reset it.
  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(relX / rect.width) * strength}px, ${
      (relY / rect.height) * strength
    }px)`;
  };

  const handleLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <Component
      ref={ref}
      data-cursor-hover
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        "transition-transform duration-300 ease-out will-change-transform",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
