import { MongoClient } from 'mongodb';
import * as dns from 'dns';

// Global variable to hold the MongoDB client instance
let mongoClient: MongoClient | null = null;

// Get or create MongoDB client
export async function getMongoClient(): Promise<MongoClient> {
  if (mongoClient) {
    try {
      // Test if connection is still alive
      await mongoClient.db('admin').command({ ping: 1 });
      return mongoClient;
    } catch (error) {
      // Connection is dead, close it
      try {
        await mongoClient.close();
      } catch (closeError) {
        console.error('Error closing dead MongoDB connection:', closeError);
      }
      mongoClient = null;
    }
  }

  // Create new connection
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  
  // Force IPv4 first resolution to avoid SRV/IPv6 issues on some platforms (e.g., serverless)
  if (typeof (dns as any).setDefaultResultOrder === 'function') {
    try {
      (dns as any).setDefaultResultOrder('ipv4first');
    } catch {}
  }
  console.log('Connecting to MongoDB...');
  
  // Different options for local vs cloud MongoDB
  let options: any = {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
  };

  if (uri.includes('mongodb+srv')) {
    // MongoDB Atlas (cloud)
    console.log('Using MongoDB Atlas configuration');
    options = {
      ...options,
      // SRV URIs handle TLS automatically; do not pass deprecated/unsupported flags
      retryWrites: true,
      w: 'majority',
    };
  } else {
    // Local MongoDB - no SSL needed
    console.log('Using local MongoDB configuration');
    options = {
      ...options,
      ssl: false,
      directConnection: true,
    };
  }

  console.log('MongoDB connection options:', options);

  mongoClient = new MongoClient(uri, options);
  
  try {
    await mongoClient.connect();
    console.log('MongoDB connected successfully to:', uri);
    return mongoClient;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    mongoClient = null;
    throw error;
  }
}

// Get database instance
export async function getDatabase() {
  const client = await getMongoClient();
  return client.db('cms');
}

// Close MongoDB connection
export async function closeMongoDBConnection() {
  if (mongoClient) {
    try {
      await mongoClient.close();
      mongoClient = null;
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Failed to close MongoDB connection:', error);
    }
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeMongoDBConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeMongoDBConnection();
  process.exit(0);
});
