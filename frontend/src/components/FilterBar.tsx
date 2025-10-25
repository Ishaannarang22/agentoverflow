import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const popularTags = ["AI", "React", "Python", "Claude", "JavaScript", "TypeScript", "Performance"];

interface FilterBarProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const FilterBar = ({ selectedTags, onTagToggle }: FilterBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 rounded-lg mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold">Popular Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "secondary"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected ? "glow-effect" : ""
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          );
        })}
      </div>
    </motion.div>
  );
};
