import { useParams, Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { CommentThread } from "@/components/CommentThread";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { usePost } from "@/hooks/usePost";
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Eye, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PostDetail = () => {
  const { id } = useParams();
  const { post, edges, author, loading, error, likePost, addComment } = usePost(id || "");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-4">{error || "The post you're looking for doesn't exist."}</p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const handleVote = async (type: "up" | "down") => {
    try {
      // For now, use a placeholder user ID - in production, get from auth context
      const userId = user?.id || "anonymous-user";
      await likePost(userId, type);
      setVoteState(type);
    } catch (error) {
      console.error("Failed to vote:", error);
      toast({
        title: "Error",
        description: "Failed to vote on post",
        variant: "destructive"
      });
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to add a comment",
        variant: "destructive"
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingComment(true);
    
    try {
      const userId = user?.id || "anonymous-user";
      await addComment(userId, newComment.trim());
      setNewComment("");
      toast({
        title: "Success",
        description: "Comment added successfully"
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingComment(false);
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
                key={edges?.counts.likes || 0}
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
                {edges?.counts.likes || 0}
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
                {post.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                {author && (
                  <>
                    <Link
                      to={`/profile/${author.user_id}`}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={author.avatar_url} />
                        <AvatarFallback>{author.username?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{author.username || 'Unknown User'}</span>
                    </Link>
                    <span>·</span>
                  </>
                )}
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{edges?.counts.views || 0} views</span>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                {post.problem && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Problem</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.problem}</p>
                  </div>
                )}
                
                {post.solution && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Solution</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.solution}</p>
                  </div>
                )}
                
                {post.summary && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Summary</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.summary}</p>
                  </div>
                )}
                
                {post.technical_description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Technical Description</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.technical_description}</p>
                  </div>
                )}
                
                {post.context && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Context</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.context}</p>
                  </div>
                )}
                
                {post.technical_deep_context && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Deep Technical Context</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.technical_deep_context}</p>
                  </div>
                )}
                
                {post.content && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">Content</h3>
                    <p className="text-base leading-relaxed text-gray-700">{post.content}</p>
                  </div>
                )}
              </div>

              {post.code_snippets && post.code_snippets.length > 0 && (
                <div className="space-y-4">
                  {post.code_snippets.map((snippet, index) => (
                    <CodeBlock 
                      key={index}
                      code={snippet.code} 
                      language="typescript" 
                      title={snippet.description}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="glass-card p-8 rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">
              {edges?.counts.comments || 0} {(edges?.counts.comments || 0) === 1 ? "Comment" : "Comments"}
            </h2>
          </div>

          {/* Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-6">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>{user?.username?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                    disabled={isSubmittingComment}
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      type="submit" 
                      size="sm" 
                      disabled={isSubmittingComment || !newComment.trim()}
                      className="gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmittingComment ? "Posting..." : "Post Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 mb-2">Want to join the discussion?</p>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log in to comment
                </Button>
              </Link>
            </div>
          )}

          <div className="space-y-4">
            {edges?.comments && edges.comments.length > 0 ? (
              edges.comments.map((comment) => (
                <CommentThread key={comment.comment_id} comment={comment} />
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
