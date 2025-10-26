import { useState, useEffect, useCallback } from 'react';
import { apiService, Post, PostEdges } from '../services/api';

interface UsePostReturn {
  post: Post | null;
  edges: PostEdges | null;
  author: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  likePost: (userId: string, type?: 'like' | 'dislike') => Promise<void>;
  addComment: (userId: string, content: string, parentId?: string) => Promise<void>;
}

export const usePost = (postId: string): UsePostReturn => {
  const [post, setPost] = useState<Post | null>(null);
  const [edges, setEdges] = useState<PostEdges | null>(null);
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getPost(postId);

      if (response.success && response.data) {
        setPost(response.data.post);
        setEdges(response.data.edges);
        setAuthor(response.data.author);
      } else {
        setError(response.error || 'Failed to fetch post');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const likePost = useCallback(async (userId: string, type: 'like' | 'dislike' = 'like') => {
    if (!postId) return;

    try {
      const response = await apiService.togglePostLike(postId, userId, type);

      if (response.success && response.data) {
        // Update local state
        setEdges(prev => prev ? {
          ...prev,
          counts: response.data!.counts,
          likes: response.data!.userAction === 'added' 
            ? [...prev.likes, { user_id: userId, type, created_at: new Date().toISOString() }]
            : prev.likes.filter(like => !(like.user_id === userId && like.type === type))
        } : null);
      } else {
        throw new Error(response.error || 'Failed to like post');
      }
    } catch (err) {
      console.error('Error liking post:', err);
      throw err;
    }
  }, [postId]);

  const addComment = useCallback(async (userId: string, content: string, parentId?: string) => {
    if (!postId) return;

    try {
      const response = await apiService.addComment(postId, userId, content, parentId);

      if (response.success && response.data) {
        // Update local state
        setEdges(prev => prev ? {
          ...prev,
          counts: response.data!.counts,
          comments: [...prev.comments, response.data!.comment]
        } : null);
      } else {
        throw new Error(response.error || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return {
    post,
    edges,
    author,
    loading,
    error,
    refetch: fetchPost,
    likePost,
    addComment,
  };
};
