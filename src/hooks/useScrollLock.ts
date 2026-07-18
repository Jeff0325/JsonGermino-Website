import { useEffect } from "react";

// Plain `overflow: hidden` on body doesn't reliably block touch-scroll on
// iOS Safari, so this uses the standard fixed-body-with-offset technique:
// pin the body in place at its current scroll position, then restore it.
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
