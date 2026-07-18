import { useEffect, useRef } from "react";

type Edge = "top" | "bottom";

// Mobile browsers are inconsistent about whether `position: fixed` is
// computed against the large (toolbar-hidden) or small (toolbar-visible)
// viewport, which lets edge-anchored fixed elements visibly dip/drift
// during scroll — most noticeable on a fast flick, where the browser's
// address-bar animation can outrun a React re-render. This writes
// directly to the DOM inside the event handler (no setState, no render)
// to stay in sync at the lowest possible latency.
export function useViewportPin<T extends HTMLElement>(edge: Edge, baseOffsetPx: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const vv = window.visualViewport;
    const el = ref.current;
    if (!vv || !el) return;

    const update = () => {
      const topInset = Math.max(0, Math.round(vv.offsetTop));
      const bottomInset = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      el.style[edge] = `${(edge === "top" ? topInset : bottomInset) + baseOffsetPx}px`;
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      window.removeEventListener("scroll", update);
    };
  }, [edge, baseOffsetPx]);

  return ref;
}
