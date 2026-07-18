import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import KuramaSection from "./KuramaSection";
import ChatHead from "./ChatHead";

// Everything KuramaPanel pulls in (chat engine, knowledge JSON, speech
// hooks) is code-split into its own chunk, same pattern as Hero's
// lazy-loaded HeroObject — it only downloads once "Launch KURAMA" is clicked.
const KuramaPanel = lazy(() => import("./KuramaPanel"));

export default function Kurama() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLaunch = () => {
    setHasLaunched(true);
    setIsOpen(true);
  };

  return (
    <>
      <KuramaSection onLaunch={handleLaunch} />

      {/* Mounted once on first launch and kept alive after that — closing
          only hides it (via the isOpen prop), so the conversation and boot
          state survive close/reopen instead of resetting every time. */}
      {hasLaunched && (
        <Suspense fallback={null}>
          <KuramaPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}

      <AnimatePresence>
        {hasLaunched && !isOpen && <ChatHead key="chat-head" onClick={() => setIsOpen(true)} />}
      </AnimatePresence>
    </>
  );
}
