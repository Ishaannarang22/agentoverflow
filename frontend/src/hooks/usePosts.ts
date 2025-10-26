import { useState, useEffect, useCallback } from 'react';
import { apiService, Post, SearchParams } from '../services/api';

interface UsePostsOptions extends SearchParams {
  enabled?: boolean;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
  refetch: () => void;
  search: (params: SearchParams) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
}

export const usePosts = (options: UsePostsOptions = {}): UsePostsReturn => {
  const {
    enabled = true,
    query = '',
    category,
    tags,
    type,
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = options;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchPosts = useCallback(async (searchParams: SearchParams = {}) => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.searchPosts({
        ...searchParams,
        page: currentPage,
        limit,
        sortBy,
        sortOrder,
      });

      if (response.success && response.data) {
        setPosts(response.data.posts);
        setTotal(response.data.total);
        setCurrentPage(response.data.page);
      } else {
        setError(response.error || 'Failed to fetch posts');
        // Set empty posts array instead of leaving it undefined
        setPosts([]);
        setTotal(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Set empty posts array instead of leaving it undefined
      setPosts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [enabled, currentPage, limit, sortBy, sortOrder]);

  const search = useCallback((params: SearchParams) => {
    setCurrentPage(1);
    fetchPosts({ ...params, page: 1 });
  }, [fetchPosts]);

  const refetch = useCallback(() => {
    fetchPosts({
      query,
      category,
      tags,
      type,
    });
  }, [fetchPosts, query, category, tags, type]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPreviousPage]);

  useEffect(() => {
    fetchPosts({
      query,
      category,
      tags,
      type,
    });
  }, [fetchPosts, query, category, tags, type]);

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    posts,
    loading,
    error,
    total,
    page: currentPage,
    totalPages,
    refetch,
    search,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  };
};

// Hook for trending posts
export const useTrendingPosts = (limit = 10, timeframe = '7d') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getTrendingPosts(limit, timeframe);

      if (response.success && response.data) {
        setPosts(response.data.posts);
      } else {
        setError(response.error || 'Failed to fetch trending posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [limit, timeframe]);

  useEffect(() => {
    fetchTrendingPosts();
  }, [fetchTrendingPosts]);

  return {
    posts,
    loading,
    error,
    refetch: fetchTrendingPosts,
  };
};

// Hook for user posts
export const useUserPosts = (userId: string, page = 1, limit = 10) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchUserPosts = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getUserPosts(userId, page, limit);

      if (response.success && response.data) {
        setPosts(response.data.posts);
        setTotal(response.data.total);
      } else {
        setError(response.error || 'Failed to fetch user posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [userId, page, limit]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  return {
    posts,
    loading,
    error,
    total,
    refetch: fetchUserPosts,
  };
};
