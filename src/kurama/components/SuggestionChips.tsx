import { motion } from "framer-motion";

type SuggestionChipsProps = {
  suggestions: string[];
  onSelect: (label: string) => void;
  disabled?: boolean;
};

export default function SuggestionChips({ suggestions, onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((label, i) => (
        <motion.button
          key={label}
          type="button"
          data-cursor-hover
          disabled={disabled}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          onClick={() => onSelect(label)}
          className="rounded-full border border-line bg-card/50 px-3.5 py-2 text-xs text-ink-dim transition-colors hover:border-cyan/50 hover:text-cyan disabled:pointer-events-none disabled:opacity-40"
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}
