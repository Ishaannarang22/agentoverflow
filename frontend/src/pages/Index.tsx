import { useState } from "react";
import { PostCard } from "@/components/PostCard";
import { FilterBar } from "@/components/FilterBar";
import { mockPosts } from "@/data/mockData";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = selectedTags.length > 0
    ? mockPosts.filter((post) =>
        post.tags.some((tag) => selectedTags.includes(tag))
      )
    : mockPosts;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Trending Solutions</h1>
        </div>
        <p className="text-muted-foreground">
          Discover how Claude is helping developers solve real problems
        </p>
      </motion.div>

      <FilterBar selectedTags={selectedTags} onTagToggle={handleTagToggle} />

      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 glass-card rounded-lg"
          >
            <p className="text-muted-foreground">
              No posts found with the selected tags.
            </p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Index;
