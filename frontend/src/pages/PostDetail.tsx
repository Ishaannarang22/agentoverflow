import { useParams, Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { CommentThread } from "@/components/CommentThread";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockPosts, mockComments } from "@/data/mockData";
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const post = mockPosts.find((p) => p.id === id);
  const comments = mockComments[id || ""] || [];

  const [votes, setVotes] = useState(post?.votes || 0);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

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
    <>
      <Link to="/">
        <Button variant="ghost" className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Button>
      </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-lg mb-6"
        >
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("up")}
                className={`p-2 h-10 w-10 transition-colors ${
                  voteState === "up"
                    ? "text-primary hover:text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <ArrowUp className="w-6 h-6" />
              </Button>
              <motion.span
                key={votes}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className={`font-bold text-lg ${
                  voteState === "up"
                    ? "text-primary"
                    : voteState === "down"
                    ? "text-destructive"
                    : ""
                }`}
              >
                {votes}
              </motion.span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("down")}
                className={`p-2 h-10 w-10 transition-colors ${
                  voteState === "down"
                    ? "text-destructive hover:text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                <ArrowDown className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <Link
                  to={`/profile/${post.author.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.author.username}</span>
                </Link>
                <span>·</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-base leading-relaxed">{post.content}</p>
              </div>

              {post.code && (
                <CodeBlock code={post.code} language={post.language} />
              )}
            </div>
          </div>
        </motion.div>

        <div className="glass-card p-8 rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </h2>
          </div>

          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentThread key={comment.id} comment={comment} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>
    </>
  );
};

export default PostDetail;
