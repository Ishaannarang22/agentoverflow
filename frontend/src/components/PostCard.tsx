import { ArrowUp, ArrowDown, MessageSquare, Eye, Code } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/data/mockData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  index?: number;
}

export const PostCard = ({ post, index = 0 }: PostCardProps) => {
  const [votes, setVotes] = useState(post.votes);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (voteState === type) {
      setVotes(post.votes);
      setVoteState(null);
    } else {
      const adjustment = type === "up" ? 1 : -1;
      const previousAdjustment = voteState === "up" ? -1 : voteState === "down" ? 1 : 0;
      setVotes(votes + adjustment + previousAdjustment);
      setVoteState(type);
    }
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

              {post.code && (
                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 bg-gray-100 rounded px-2 py-1 w-fit">
                  <Code className="w-3 h-3" />
                  <span>Includes code snippet</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-all"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to={`/profile/${post.author.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">
                    {post.author.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    · {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
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
