// API service for communicating with the Express.js backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface SearchParams {
  query?: string;
  category?: string;
  tags?: string | string[];
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface Post {
  id: string;
  title: string;
  content: string;
  problem?: string;
  solution?: string;
  summary?: string;
  technical_description?: string;
  context?: string;
  attempted_solutions?: string;
  error_messages?: string;
  technical_deep_context?: string;
  code_snippets?: Array<{
    code: string;
    description: string;
  }>;
  tags: string[];
  type: string;
  category: string;
  created_at: string;
  updated_at: string;
  score?: number;
  engagement?: {
    likes: number;
    dislikes: number;
    comments: number;
    views: number;
  };
}

interface PostEdges {
  post_id: string;
  counts: {
    likes: number;
    dislikes: number;
    comments: number;
    views: number;
  };
  likes: Array<{
    user_id: string;
    type: 'like' | 'dislike';
    created_at: string;
  }>;
  comments: Array<{
    comment_id: string;
    parent_id?: string;
    user_id: string;
    content: string;
    likes_count: number;
    dislikes_count: number;
    created_at: string;
    updated_at: string;
  }>;
  author_profile?: {
    user_id: string;
    username: string;
    full_name: string;
    avatar_url?: string;
    reputation: number;
  };
  updated_at: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      // If the backend is not running or Elastic AI is not configured,
      // return empty data instead of failing
      if (error instanceof Error && (
        error.message.includes('Failed to fetch') || 
        error.message.includes('NetworkError') ||
        error.message.includes('getaddrinfo ENOTFOUND')
      )) {
        console.warn('Backend not available, returning empty data');
        return {
          success: true,
          data: {
            posts: [],
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0
          } as T
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Search posts
  async searchPosts(params: SearchParams = {}): Promise<ApiResponse<{
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return this.request(`/search/posts?${searchParams.toString()}`);
  }

  // Get single post with full details
  async getPost(id: string): Promise<ApiResponse<{
    post: Post;
    edges: PostEdges;
    author: any;
  }>> {
    return this.request(`/search/posts/${id}`);
  }

  // Get user's posts
  async getUserPosts(
    userId: string,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<{
    posts: Post[];
    total: number;
    page: number;
    limit: number;
  }>> {
    return this.request(`/search/users/${userId}/posts?page=${page}&limit=${limit}`);
  }

  // Get trending posts
  async getTrendingPosts(
    limit = 50
  ): Promise<ApiResponse<{
    posts: Post[];
    total: number;
  }>> {
    return this.request(`/search/trending?limit=${limit}`);
  }

  // Create a new post
  async createPost(postData: {
    author_id: string;
    title: string;
    content: string;
    category: string;
    tags?: string[];
    type?: string;
    problem?: string;
    solution?: string;
    summary?: string;
    technical_description?: string;
    context?: string;
    attempted_solutions?: string;
    error_messages?: string;
    technical_deep_context?: string;
    code_snippets?: Array<{
      code: string;
      description: string;
    }>;
  }): Promise<ApiResponse<Post>> {
    return this.request('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  // Update a post
  async updatePost(
    id: string,
    updateData: Partial<Post>
  ): Promise<ApiResponse<Post>> {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Delete a post
  async deletePost(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Like/Unlike a post
  async togglePostLike(
    postId: string,
    userId: string,
    type: 'like' | 'dislike' = 'like'
  ): Promise<ApiResponse<{
    counts: {
      likes: number;
      dislikes: number;
      comments: number;
      views: number;
    };
    userAction: 'added' | 'removed';
  }>> {
    return this.request(`/posts/${postId}/like`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, type }),
    });
  }

  // Add comment to a post
  async addComment(
    postId: string,
    userId: string,
    content: string,
    parentId?: string
  ): Promise<ApiResponse<{
    comment: {
      comment_id: string;
      parent_id?: string;
      user_id: string;
      content: string;
      likes_count: number;
      dislikes_count: number;
      created_at: string;
      updated_at: string;
    };
    counts: {
      likes: number;
      dislikes: number;
      comments: number;
      views: number;
    };
  }>> {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        content,
        parent_id: parentId,
      }),
    });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{
    status: string;
    timestamp: string;
    services: {
      elastic: string;
    };
  }>> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export type { Post, PostEdges, SearchParams, ApiResponse };
