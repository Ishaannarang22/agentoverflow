import express from 'express';
import { elasticClient, INDICES } from '../config/elastic.js';

const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const postData = req.body;
    const { author_id, title, content, category, tags = [], type = 'question' } = postData;

    // Validate required fields for claude_solutions
    if (!author_id || !title) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: author_id, title'
      });
    }

    // Ensure user exists in users index
    await ensureUserExists(author_id);

    // Map the data to claude_solutions schema - populate ALL fields
    const claudeSolutionData = {
      // Core fields
      title: postData.title || '',
      problem: postData.problem || postData.context || '',
      context: postData.content || postData.context || '',
      solution: postData.solution || '',
      summary: postData.summary || postData.solution || '',
      
      // Technical fields
      technical_description: postData.technical_description || postData.architecture || '',
      technical_deep_context: postData.technical_deep_context || postData.architecture || '',
      
      // Problem-solving fields
      attempted_solutions: postData.attempted_solutions || postData.context || '',
      error_messages: postData.error_messages || '',
      
      // Code snippets (ensure it's an array)
      code_snippets: Array.isArray(postData.code_snippets) ? postData.code_snippets : [],
      
      // Metadata fields
      tags: Array.isArray(postData.tags) ? postData.tags : [],
      type: postData.type || 'solution',
      share_link: postData.share_link || '',
      solution_id: postData.solution_id || `sol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      
      // System fields
      author_id: postData.author_id,
      created_at: new Date().toISOString()
    };

    console.log('📝 Creating claude solution with data:', claudeSolutionData);

    // Create post in claude_solutions index
    const postResponse = await elasticClient.index({
      index: INDICES.CLAUDE_SOLUTIONS,
      body: claudeSolutionData
    });

    const postId = postResponse._id;

    // Create user-post mapping
    await elasticClient.index({
      index: INDICES.USER_POST_MAP,
      body: {
        user_id: author_id,
        post_id: postId,
        relation: 'author',
        created_at: new Date().toISOString()
      }
    });

    // Create post edges (for likes, comments, etc.)
    await elasticClient.index({
      index: INDICES.POST_EDGES,
      id: postId,
      body: {
        post_id: postId,
        counts: {
          likes: 0,
          dislikes: 0,
          comments: 0,
          views: 0
        },
        likes: [],
        comments: [],
        updated_at: new Date().toISOString()
      }
    });

    // Update user stats (increment post count)
    await updateUserStats(author_id, 'posts', 1);

    res.status(201).json({
      success: true,
      data: {
        id: postId,
        ...postData,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create post',
      message: error.message
    });
  }
});

// Helper function to ensure user exists
async function ensureUserExists(userId) {
  try {
    // Check if user exists
    const userExists = await elasticClient.exists({
      index: INDICES.USERS,
      id: userId
    });

    if (!userExists) {
      console.log(`👤 Creating user ${userId} in users index`);
      
      // Create anonymous user
      const userDoc = {
        username: userId === 'anonymous' ? 'Anonymous User' : userId,
        email: userId === 'anonymous' ? 'anonymous@agentoverflow.com' : `${userId}@agentoverflow.com`,
        display_name: userId === 'anonymous' ? 'Anonymous User' : userId,
        bio: '',
        avatar_url: '',
        stats: {
          posts_count: 0,
          comments_count: 0,
          likes_received: 0,
          reputation: 0
        },
        preferences: {
          theme: 'light',
          notifications: true
        },
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };

      await elasticClient.index({
        index: INDICES.USERS,
        id: userId,
        body: userDoc
      });

      console.log(`✅ User ${userId} created successfully`);
    }
  } catch (error) {
    console.error(`Error ensuring user ${userId} exists:`, error);
    // Don't throw error - continue with post creation
  }
}

// Helper function to update user stats
async function updateUserStats(userId, statType, increment = 1) {
  try {
    const updateBody = {};
    updateBody[`stats.${statType}_count`] = { increment };

    await elasticClient.update({
      index: INDICES.USERS,
      id: userId,
      body: {
        script: {
          source: `ctx._source.stats.${statType}_count += params.increment`,
          params: { increment }
        }
      }
    });

    console.log(`📊 Updated user ${userId} ${statType} count by ${increment}`);
  } catch (error) {
    console.error(`Error updating user ${userId} stats:`, error);
    // Don't throw error - continue with post creation
  }
}

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update post in posts_ai index
    const response = await elasticClient.update({
      index: INDICES.POSTS_AI,
      id,
      body: {
        doc: {
          ...updateData,
          updated_at: new Date().toISOString()
        }
      }
    });

    res.json({
      success: true,
      data: {
        id,
        ...updateData,
        updated_at: new Date().toISOString()
      }
    });
  } catch (error) {
    if (error.meta?.statusCode === 404) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update post',
      message: error.message
    });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete from all indices
    await Promise.all([
      elasticClient.delete({ index: INDICES.POSTS_AI, id }),
      elasticClient.delete({ index: INDICES.POST_EDGES, id }),
      // Delete user-post mappings
      elasticClient.deleteByQuery({
        index: INDICES.USER_POST_MAP,
        body: {
          query: {
            term: { post_id: id }
          }
        }
      })
    ]);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    if (error.meta?.statusCode === 404) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete post',
      message: error.message
    });
  }
});

// Like/Unlike a post
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, type = 'like' } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'user_id is required'
      });
    }

    // Get current post edges
    const edgesResponse = await elasticClient.get({
      index: INDICES.POST_EDGES,
      id
    });

    const edges = edgesResponse._source;
    const existingLikeIndex = edges.likes.findIndex(
      like => like.user_id === user_id
    );

    let updatedLikes = [...edges.likes];
    let updatedCounts = { ...edges.counts };

    if (existingLikeIndex >= 0) {
      // User already liked/disliked, remove it
      const existingLike = updatedLikes[existingLikeIndex];
      updatedLikes.splice(existingLikeIndex, 1);
      
      if (existingLike.type === 'like') {
        updatedCounts.likes = Math.max(0, updatedCounts.likes - 1);
      } else {
        updatedCounts.dislikes = Math.max(0, updatedCounts.dislikes - 1);
      }
    } else {
      // Add new like/dislike
      updatedLikes.push({
        user_id,
        type,
        created_at: new Date().toISOString()
      });
      
      if (type === 'like') {
        updatedCounts.likes += 1;
      } else {
        updatedCounts.dislikes += 1;
      }
    }

    // Update post edges
    await elasticClient.update({
      index: INDICES.POST_EDGES,
      id,
      body: {
        doc: {
          likes: updatedLikes,
          counts: updatedCounts,
          updated_at: new Date().toISOString()
        }
      }
    });

    res.json({
      success: true,
      data: {
        counts: updatedCounts,
        userAction: existingLikeIndex >= 0 ? 'removed' : 'added'
      }
    });
  } catch (error) {
    if (error.meta?.statusCode === 404) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to like post',
      message: error.message
    });
  }
});

// Add comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, content, parent_id = null } = req.body;

    if (!user_id || !content) {
      return res.status(400).json({
        success: false,
        error: 'user_id and content are required'
      });
    }

    const commentId = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newComment = {
      comment_id: commentId,
      parent_id,
      user_id,
      content,
      likes_count: 0,
      dislikes_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Get current post edges
    const edgesResponse = await elasticClient.get({
      index: INDICES.POST_EDGES,
      id
    });

    const edges = edgesResponse._source;
    const updatedComments = [...edges.comments, newComment];
    const updatedCounts = {
      ...edges.counts,
      comments: edges.counts.comments + 1
    };

    // Update post edges
    await elasticClient.update({
      index: INDICES.POST_EDGES,
      id,
      body: {
        doc: {
          comments: updatedComments,
          counts: updatedCounts,
          updated_at: new Date().toISOString()
        }
      }
    });

    res.status(201).json({
      success: true,
      data: {
        comment: newComment,
        counts: updatedCounts
      }
    });
  } catch (error) {
    if (error.meta?.statusCode === 404) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }
    
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add comment',
      message: error.message
    });
  }
});

export default router;
