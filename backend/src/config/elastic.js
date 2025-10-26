import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

// Elastic AI Serverless Client Configuration
const createElasticClient = () => {
  const config = {};

  // For Elastic AI Serverless, we only need API Key and endpoint URL
  if (process.env.ELASTIC_API_KEY) {
    // Use the endpoint URL if provided, otherwise use the default serverless endpoint
    config.node = process.env.ELASTIC_NODE || 'https://api.elastic-cloud.com';
    config.auth = {
      apiKey: process.env.ELASTIC_API_KEY
    };
    
    console.log('🔧 Using Elastic AI Serverless configuration');
    console.log(`📍 Endpoint: ${config.node}`);
  } else {
    throw new Error('ELASTIC_API_KEY is required for Elastic AI Serverless');
  }

  return new Client(config);
};

// Test connection
export const testConnection = async () => {
  try {
    const client = createElasticClient();
    
    // For Elastic AI Serverless, we need to test with a different approach
    // since ping() might not work the same way
    try {
      const response = await client.ping();
      console.log('✅ Elastic AI connection successful');
      return true;
    } catch (pingError) {
      // If ping fails, try to get cluster info instead
      try {
        const info = await client.info();
        console.log('✅ Elastic AI connection successful (via info)');
        return true;
      } catch (infoError) {
        console.error('❌ Elastic AI connection failed:', infoError.message);
        return false;
      }
    }
  } catch (error) {
    console.error('❌ Elastic AI connection failed:', error.message);
    return false;
  }
};

// Export configured client
export const elasticClient = createElasticClient();

// Index names (matching your schema)
export const INDICES = {
  POSTS_AI: 'posts_ai',
  USER_POST_MAP: 'user_post_map',
  POST_EDGES: 'post_edges',
  USERS: 'users'
};

export default elasticClient;
