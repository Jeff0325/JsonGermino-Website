import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    // Touch devices already scroll smoothly natively — letting Lenis
    // intercept touch scroll there adds no benefit and is what was causing
    // fixed-position elements (navbar, KURAMA's chat-head bubble) to jump
    // as mobile browsers animate their address bar during scroll.
    if (!enabled || window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, [enabled]);
}
