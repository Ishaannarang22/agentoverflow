import { useState, useEffect } from "react";
import { apiService, Post } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Tag, ExternalLink, ArrowUp, ArrowDown, MessageSquare, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [votingPosts, setVotingPosts] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const fetchPosts = async (query = "") => {
    try {
      setLoading(true);
      const response = await apiService.searchPosts({
        query,
        limit: 20,
        sortBy: "created_at",
        sortOrder: "desc"
      });

      if (response.success && response.data) {
        setPosts(response.data.posts);
        setTotalPosts(response.data.total);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch posts",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(searchQuery);
  };

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
          AgentOverflow
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Find solutions to your development problems
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search problems, solutions, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* Results Count */}
        <p className="text-sm text-gray-500">
          {loading ? "Loading..." : `${totalPosts} posts found`}
        </p>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found</p>
          <p className="text-gray-400">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">
                    <Link to={`/post/${post.id}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {post.type}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.created_at)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.summary || truncateText(post.problem || "", 150)}
                </p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Engagement Metrics */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.engagement?.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{post.engagement?.comments || 0}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, "like")}
                      disabled={votingPosts.has(post.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-green-600"
                    >
                      <ArrowUp className="w-3 h-3" />
                      <span>{post.engagement?.likes || 0}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(post.id, "dislike")}
                      disabled={votingPosts.has(post.id)}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                    >
                      <ArrowDown className="w-3 h-3" />
                      <span>{post.engagement?.dislikes || 0}</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/post/${post.id}`}>
                        Read More
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
