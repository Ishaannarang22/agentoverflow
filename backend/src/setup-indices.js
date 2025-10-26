import { elasticClient, INDICES } from './config/elastic.js';

// Create the required indices for Elastic AI Serverless
async function createIndices() {
  console.log('🚀 Creating Elastic AI Serverless indices...');

  try {
    // 1. Create posts_ai index
    console.log('📝 Creating posts_ai index...');
    await elasticClient.indices.create({
      index: INDICES.POSTS_AI,
      body: {
        mappings: {
          properties: {
            attempted_solutions: { type: "text" },
            code_snippets: {
              type: "nested",
              properties: {
                code: { type: "text" },
                description: { type: "text" }
              }
            },
            context: { type: "text" },
            created_at: { type: "date" },
            error_messages: { type: "text" },
            problem: { type: "text" },
            share_link: { type: "keyword" },
            solution: { type: "text" },
            solution_id: { type: "keyword" },
            summary: { type: "text" },
            tags: { type: "keyword" },
            technical_deep_context: { type: "text" },
            technical_description: { type: "text" },
            title: { type: "text" },
            type: { type: "keyword" },
            content: { type: "text" },
            category: { type: "keyword" },
            author_id: { type: "keyword" },
            updated_at: { type: "date" }
          }
        }
      }
    });
    console.log('✅ posts_ai index created');

    // 2. Create user_post_map index
    console.log('👥 Creating user_post_map index...');
    await elasticClient.indices.create({
      index: INDICES.USER_POST_MAP,
      body: {
        mappings: {
          properties: {
            user_id: { type: "keyword" },
            post_id: { type: "keyword" },
            relation: { type: "keyword" },
            created_at: { type: "date" },
            extra: { type: "object", enabled: true }
          }
        }
      }
    });
    console.log('✅ user_post_map index created');

    // 3. Create post_edges index
    console.log('🔗 Creating post_edges index...');
    await elasticClient.indices.create({
      index: INDICES.POST_EDGES,
      body: {
        mappings: {
          properties: {
            post_id: { type: "keyword" },
            counts: {
              properties: {
                likes: { type: "integer" },
                dislikes: { type: "integer" },
                comments: { type: "integer" },
                views: { type: "integer" }
              }
            },
            author_profile: {
              properties: {
                user_id: { type: "keyword" },
                username: { type: "keyword" },
                full_name: { type: "text" },
                avatar_url: { type: "keyword" },
                reputation: { type: "integer" }
              }
            },
            likes: {
              type: "nested",
              properties: {
                user_id: { type: "keyword" },
                type: { type: "keyword" },
                created_at: { type: "date" }
              }
            },
            comments: {
              type: "nested",
              properties: {
                comment_id: { type: "keyword" },
                parent_id: { type: "keyword" },
                user_id: { type: "keyword" },
                content: { type: "text" },
                likes_count: { type: "integer" },
                dislikes_count: { type: "integer" },
                created_at: { type: "date" },
                updated_at: { type: "date" }
              }
            },
            updated_at: { type: "date" }
          }
        }
      }
    });
    console.log('✅ post_edges index created');

    // 4. Create users index
    console.log('👤 Creating users index...');
    await elasticClient.indices.create({
      index: INDICES.USERS,
      body: {
        mappings: {
          properties: {
            username: { type: "keyword" },
            email: { type: "keyword" },
            password_hash: { type: "keyword" },
            full_name: { type: "text" },
            avatar_url: { type: "keyword" },
            reputation: { type: "integer" },
            bio: { type: "text" },
            location: { type: "keyword" },
            website: { type: "keyword" },
            github_username: { type: "keyword" },
            twitter_username: { type: "keyword" },
            is_active: { type: "boolean" },
            email_verified: { type: "boolean" },
            last_login: { type: "date" },
            created_at: { type: "date" },
            updated_at: { type: "date" }
          }
        }
      }
    });
    console.log('✅ users index created');

    console.log('🎉 All indices created successfully!');
    
    // List all indices to verify
    const indices = await elasticClient.cat.indices({ format: 'json' });
    console.log('📋 Available indices:');
    indices.forEach(index => {
      console.log(`  - ${index.index}`);
    });

  } catch (error) {
    if (error.meta?.statusCode === 400 && error.body?.error?.type === 'resource_already_exists_exception') {
      console.log('ℹ️ Indices already exist, skipping creation');
    } else {
      console.error('❌ Error creating indices:', error.message);
      throw error;
    }
  }
}

// Run the script
createIndices()
  .then(() => {
    console.log('✅ Setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  });
