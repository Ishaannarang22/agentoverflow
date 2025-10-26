import { useState, useEffect } from "react";
import { apiService, Post } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown, MessageSquare, Eye, Calendar, Tag, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Trending = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingPosts, setVotingPosts] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const fetchTrendingPosts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTrendingPosts(50);

      if (response.success && response.data) {
        setPosts(response.data.posts);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch trending posts",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error fetching trending posts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch trending posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const handleVote = async (postId: string, type: "like" | "dislike") => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to vote on posts",
        variant: "destructive"
      });
      return;
    }

    setVotingPosts(prev => new Set(prev).add(postId));
    
    try {
      const userId = user?.id || "anonymous-user";
      await apiService.togglePostLike(postId, userId, type);
      
      // Update local state optimistically
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const currentLikes = post.engagement?.likes || 0;
            const currentDislikes = post.engagement?.dislikes || 0;
            
            return {
              ...post,
              engagement: {
                ...post.engagement,
                likes: type === "like" ? currentLikes + 1 : Math.max(0, currentLikes - 1),
                dislikes: type === "dislike" ? currentDislikes + 1 : Math.max(0, currentDislikes - 1),
                comments: post.engagement?.comments || 0,
                views: post.engagement?.views || 0
              }
            };
          }
          return post;
        })
      );
      
      toast({
        title: "Success",
        description: `Post ${type === "like" ? "liked" : "disliked"} successfully`
      });
    } catch (error) {
      console.error("Failed to vote:", error);
      toast({
        title: "Error",
        description: "Failed to vote on post",
        variant: "destructive"
      });
    } finally {
      setVotingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Trending Posts
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Most popular posts sorted by upvotes
        </p>
      </div>

      {/* Posts List - StackOverflow Style */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2 w-16">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No trending posts found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Voting Section */}
                  <div className="flex flex-col items-center gap-2 w-16">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, "like")}
                      disabled={votingPosts.has(post.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-green-600 p-2 h-8 w-8"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <span className="font-bold text-lg text-gray-700">
                      {post.engagement?.likes || 0}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, "dislike")}
                      disabled={votingPosts.has(post.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600 p-2 h-8 w-8"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link to={`/post/${post.id}`} className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                      </Link>
                      <Badge variant="secondary" className="shrink-0">
                        {post.type}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.summary || truncateText(post.problem || "", 200)}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 5).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 5} more
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.engagement?.views || 0} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.engagement?.comments || 0} answers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/post/${post.id}`}>
                            View Post
                          </Link>
                        </Button>
                        {post.share_link && (
                          <Button variant="ghost" size="sm" asChild>
                            <a 
                              href={post.share_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Source
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
