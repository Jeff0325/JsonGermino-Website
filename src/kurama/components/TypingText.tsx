import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  animate?: boolean;
  speed?: number;
  className?: string;
  onDone?: () => void;
};

export default function TypingText({ text, animate = true, speed = 16, className, onDone }: TypingTextProps) {
  const [count, setCount] = useState(animate ? 0 : text.length);

  useEffect(() => {
    if (!animate) {
      setCount(text.length);
      onDone?.();
      return;
    }

    setCount(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        window.clearInterval(id);
        onDone?.();
      }
    }, speed);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, animate]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      {animate && count < text.length && <span className="text-cyan">▍</span>}
    </span>
  );
}
