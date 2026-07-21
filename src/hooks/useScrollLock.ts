import { useEffect } from "react";

// Tracks the Y position scroll will restore to when the lock releases.
// Module-level (not component state) so portfolioActions.navigateToSection
// can redirect it — e.g. when KURAMA says "here are the projects" while its
// panel has scroll locked, scrollIntoView() is a no-op against a fixed
// body, so the destination has to be recorded here instead and gets
// applied for real when the panel closes and the lock releases.
let restoreY: number | null = null;

// Plain `overflow: hidden` on body doesn't reliably block touch-scroll on
// iOS Safari, so this uses the standard fixed-body-with-offset technique:
// pin the body in place at its current scroll position, then restore it.
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    restoreY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${restoreY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo(0, restoreY ?? 0);
      restoreY = null;
    };
  }, [locked]);
}

// True while a lock from useScrollLock is currently active on the body.
export function isScrollLocked() {
  return document.body.style.position === "fixed";
}

// Redirects where scroll will land once the current lock releases, and
// shifts the (invisible, blurred-behind-the-panel) locked body to match —
// so if the panel is closed via an unrelated path, the position is already
// correct instead of needing this function to have been called first.
export function setScrollLockTarget(y: number) {
  if (restoreY === null) return;
  restoreY = y;
  document.body.style.top = `-${y}px`;
}
