import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/data/mockData";
import { useState } from "react";
import { motion } from "framer-motion";

interface CommentThreadProps {
  comment: Comment;
  depth?: number;
}

export const CommentThread = ({ comment, depth = 0 }: CommentThreadProps) => {
  const [votes, setVotes] = useState(comment.votes);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [showReply, setShowReply] = useState(false);

  const handleVote = (type: "up" | "down") => {
    if (voteState === type) {
      setVotes(comment.votes);
      setVoteState(null);
    } else {
      const adjustment = type === "up" ? 1 : -1;
      const previousAdjustment = voteState === "up" ? -1 : voteState === "down" ? 1 : 0;
      setVotes(votes + adjustment + previousAdjustment);
      setVoteState(type);
    }
  };

  const maxDepth = 4;
  const isNested = depth > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: depth * 0.05 }}
      className={`${isNested ? "ml-8 border-l-2 border-glass-border pl-4" : ""}`}
    >
      <div className="py-3">
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1 min-w-[32px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("up")}
              className={`p-0 h-6 w-6 transition-colors ${
                voteState === "up"
                  ? "text-primary hover:text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <motion.span
              key={votes}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`text-xs font-medium ${
                voteState === "up"
                  ? "text-primary"
                  : voteState === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {votes}
            </motion.span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote("down")}
              className={`p-0 h-6 w-6 transition-colors ${
                voteState === "down"
                  ? "text-destructive hover:text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-5 h-5">
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>{comment.author.username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{comment.author.username}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm mb-2">{comment.content}</p>

            {depth < maxDepth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReply(!showReply)}
                className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-primary"
              >
                <MessageSquare className="w-3 h-3" />
                Reply
              </Button>
            )}

            {showReply && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 p-3 glass-card rounded-lg"
              >
                <p className="text-sm text-muted-foreground">
                  Reply feature coming soon! For now, this demonstrates the threaded layout.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-1">
          {comment.replies.map((reply) => (
            <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </motion.div>
  );
};
