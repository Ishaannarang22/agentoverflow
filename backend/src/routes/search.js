import express from 'express';
import { elasticClient, INDICES } from '../config/elastic.js';

const router = express.Router();

// Search posts with AI capabilities
router.get('/posts', async (req, res) => {
  try {
    const { 
      query = '', 
      category, 
      tags, 
      type, 
      page = 1, 
      limit = 10,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = req.query;

    const from = (page - 1) * limit;
    
    // Build search query
    const searchQuery = {
      index: 'claude_solutions', // Using the actual index with posts
      from,
      size: parseInt(limit),
      sort: [
        { created_at: { order: sortOrder } }
      ],
      query: {
        bool: {
          must: []
        }
      }
    };

    // Add text search if query provided
    if (query) {
      searchQuery.query.bool.must.push({
        multi_match: {
          query,
          fields: [
            'title^3',                    // Boost title matches
            'problem^2',                  // Boost problem matches
            'solution^2',                 // Boost solution matches
            'summary^1.5',                // Boost summary matches
            'technical_description^1.2',  // Boost technical description
            'context^1.1',                // Boost context
            'technical_deep_context',     // Include deep context
            'tags'                        // Include tags
          ],
          type: 'best_fields',
          fuzziness: 'AUTO'
        }
      });
    }

    // Add filters
    const filters = [];
    if (type) filters.push({ term: { type } });
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filters.push({ terms: { tags: tagArray } });
    }

    if (filters.length > 0) {
      searchQuery.query.bool.filter = filters;
    }

    const response = await elasticClient.search(searchQuery);
    
    // Get post edges for engagement data
    const postIds = response.hits.hits.map(hit => hit._id);
    console.log('Post IDs:', postIds);
    let edgesResponse = { docs: [] };
    
    if (postIds.length > 0) {
      try {
        edgesResponse = await elasticClient.mget({
          index: INDICES.POST_EDGES,
          body: {
            ids: postIds
          }
        });
        console.log('Edges response:', edgesResponse.docs.length, 'docs found');
      } catch (edgesError) {
        console.warn('Could not fetch engagement data:', edgesError.message);
      }
    }

    // Combine posts with engagement data
    const postsWithEngagement = response.hits.hits.map(hit => {
      const edgesDoc = edgesResponse.docs.find(doc => doc._id === hit._id);
      const engagement = edgesDoc?.found ? edgesDoc._source.counts : {
        likes: 0,
        dislikes: 0,
        comments: 0,
        views: 0
      };

      return {
        id: hit._id,
        ...hit._source,
        score: hit._score,
        engagement
      };
    });
    
    res.json({
      success: true,
      data: {
        posts: postsWithEngagement,
        total: response.hits.total.value,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(response.hits.total.value / limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
      message: error.message
    });
  }
});

// Test endpoint to debug post retrieval
router.get('/posts/:id/debug', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try different search methods
    const results = {};
    
    // Method 1: Get by _id
    try {
      const getResponse = await elasticClient.get({
        index: 'claude_solutions',
        id: id
      });
      results.getById = { success: true, data: getResponse._source };
    } catch (error) {
      results.getById = { success: false, error: error.message };
    }
    
    // Method 2: Search by id field
    try {
      const searchResponse = await elasticClient.search({
        index: 'claude_solutions',
        body: {
          query: { term: { id: id } }
        }
      });
      results.searchById = { success: true, hits: searchResponse.hits.hits.length };
    } catch (error) {
      results.searchById = { success: false, error: error.message };
    }
    
    // Method 3: Search by solution_id field
    try {
      const searchResponse = await elasticClient.search({
        index: 'claude_solutions',
        body: {
          query: { term: { solution_id: id } }
        }
      });
      results.searchBySolutionId = { success: true, hits: searchResponse.hits.hits.length };
    } catch (error) {
      results.searchBySolutionId = { success: false, error: error.message };
    }
    
    res.json({
      success: true,
      data: {
        requestedId: id,
        results
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({
      success: false,
      error: 'Debug failed',
      message: error.message
    });
  }
});

// Get post with full details including edges
router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get post details from claude_solutions index using Elasticsearch _id
    let post;
    try {
      const postResponse = await elasticClient.get({
        index: 'claude_solutions',
        id: id
      });
      post = {
        id: postResponse._id,
        ...postResponse._source
      };
    } catch (getError) {
      if (getError.meta?.statusCode === 404) {
        return res.status(404).json({
          success: false,
          error: 'Post not found'
        });
      }
      throw getError;
    }

    // Get post edges (likes, comments, etc.) - create default if doesn't exist
    let edges;
    try {
      const edgesResponse = await elasticClient.get({
        index: INDICES.POST_EDGES,
        id
      });
      edges = edgesResponse._source;
    } catch (edgesError) {
      // If edges don't exist, create default edges
      if (edgesError.meta?.statusCode === 404) {
        edges = {
          post_id: id,
          counts: {
            likes: 0,
            dislikes: 0,
            comments: 0,
            views: 0
          },
          likes: [],
          comments: [],
          updated_at: new Date().toISOString()
        };
        
        // Create the edges document
        await elasticClient.index({
          index: INDICES.POST_EDGES,
          id,
          body: edges
        });
      } else {
        throw edgesError;
      }
    }

    // Get author info from user_post_map
    const authorResponse = await elasticClient.search({
      index: INDICES.USER_POST_MAP,
      query: {
        bool: {
          must: [
            { term: { post_id: id } },
            { term: { relation: 'author' } }
          ]
        }
      }
    });

    res.json({
      success: true,
      data: {
        post,
        edges,
        author: authorResponse.hits.hits[0]?._source || null
      }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get post',
      message: error.message
    });
  }
});

// Get user's posts
router.get('/users/:userId/posts', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const from = (page - 1) * limit;

    // Get user's post IDs
    const userPostsResponse = await elasticClient.search({
      index: INDICES.USER_POST_MAP,
      from,
      size: parseInt(limit),
      query: {
        bool: {
          must: [
            { term: { user_id: userId } },
            { term: { relation: 'author' } }
          ]
        }
      }
    });

    const postIds = userPostsResponse.hits.hits.map(hit => hit._source.post_id);

    if (postIds.length === 0) {
      return res.json({
        success: true,
        data: {
          posts: [],
          total: 0,
          page: parseInt(page),
          limit: parseInt(limit)
        }
      });
    }

    // Get full post details
    const postsResponse = await elasticClient.mget({
      index: INDICES.POSTS_AI,
      body: {
        ids: postIds
      }
    });

    res.json({
      success: true,
      data: {
        posts: postsResponse.docs
          .filter(doc => doc.found)
          .map(doc => ({
            id: doc._id,
            ...doc._source
          })),
        total: userPostsResponse.hits.total.value,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user posts',
      message: error.message
    });
  }
});

// Get trending posts sorted by likes
router.get('/trending', async (req, res) => {
  try {
    const { limit = 50 } = req.query;

    // Get posts from claude_solutions index
    const response = await elasticClient.search({
      index: 'claude_solutions',
      size: parseInt(limit),
      query: {
        match_all: {}
      },
      sort: [
        { created_at: { order: 'desc' } }
      ]
    });

    // Get post edges for engagement data
    const postIds = response.hits.hits.map(hit => hit._id);
    const edgesResponse = await elasticClient.mget({
      index: INDICES.POST_EDGES,
      body: {
        ids: postIds
      }
    });

    // Combine posts with engagement data
    const postsWithEngagement = response.hits.hits.map(hit => {
      const edgesDoc = edgesResponse.docs.find(doc => doc._id === hit._id);
      const engagement = edgesDoc?.found ? edgesDoc._source.counts : {
        likes: 0,
        dislikes: 0,
        comments: 0,
        views: 0
      };

      return {
        id: hit._id,
        ...hit._source,
        engagement
      };
    });

    // Sort by likes (trending)
    const sortedPosts = postsWithEngagement.sort((a, b) => {
      const aLikes = a.engagement?.likes || 0;
      const bLikes = b.engagement?.likes || 0;
      return bLikes - aLikes;
    });

    res.json({
      success: true,
      data: {
        posts: sortedPosts,
        total: sortedPosts.length
      }
    });
  } catch (error) {
    console.error('Get trending posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get trending posts',
      message: error.message
    });
  }
});

export default router;
