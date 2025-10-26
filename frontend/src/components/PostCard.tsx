import { ArrowUp, ArrowDown, MessageSquare, Eye, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  index?: number;
}

export const PostCard = ({ post, index = 0 }: PostCardProps) => {
  // Use engagement data from API if available, otherwise default to 0
  // TEMPORARY: Add mock data for testing
  const votes = post.engagement?.likes || Math.floor(Math.random() * 50) + 1;
  const comments = post.engagement?.comments || Math.floor(Math.random() * 20) + 1;
  const views = post.engagement?.views || Math.floor(Math.random() * 500) + 50;
  
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    // For now, just update local state
    // In production, this would call the API
    setVoteState(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex gap-4">
            {/* Vote Section */}
            <div className="flex flex-col items-center gap-1 min-w-[40px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("up")}
                className={`p-1 h-8 w-8 transition-colors ${
                  voteState === "up"
                    ? "text-orange-500 hover:text-orange-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
              <motion.span
                key={votes}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className={`font-semibold text-sm ${
                  voteState === "up"
                    ? "text-orange-500"
                    : voteState === "down"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                {votes}
              </motion.span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("down")}
                className={`p-1 h-8 w-8 transition-colors ${
                  voteState === "down"
                    ? "text-red-500 hover:text-red-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <ArrowDown className="w-5 h-5" />
              </Button>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <Link
                to={`/post/${post.id}`}
                className="group"
              >
                <h2 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2 text-gray-900">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 mb-3 line-clamp-2">
                {post.content}
              </p>

              {post.code_snippets && post.code_snippets.length > 0 && (
                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-100 rounded px-2 py-1 w-fit">
                  <Code className="w-3 h-3" />
                  <span>Includes {post.code_snippets.length} code snippet{post.code_snippets.length > 1 ? 's' : ''}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-all"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Posted by Anonymous
                  </span>
                  <span className="text-xs text-gray-500">
                    · {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
