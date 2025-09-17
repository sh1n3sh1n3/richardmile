import { MongoClient } from 'mongodb';

// Global variable to hold the MongoDB client instance
let mongoClient: MongoClient | null = null;

// Get or create MongoDB client
export async function getMongoClient(): Promise<MongoClient | null> {
  if (mongoClient) {
    try {
      // Test if connection is still alive
      await mongoClient.db('admin').command({ ping: 1 });
      return mongoClient;
    } catch (error) {
      console.log('Existing MongoDB connection is dead, creating new one...');
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

  console.log('Connecting to MongoDB with URI:', uri);

  // Different options for local vs cloud MongoDB
  let options: any = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    maxIdleTimeMS: 30000,
    retryWrites: true,
    retryReads: true,
  };

  if (uri.includes('mongodb+srv')) {
    // MongoDB Atlas (cloud) - SSL is required
    console.log('Using MongoDB Atlas configuration');
    options = {
      ...options,
      tls: true,
      tlsAllowInvalidCertificates: false, // Better security for production
      tlsAllowInvalidHostnames: false,
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
    return null; // Return null instead of throwing to allow graceful handling
  }
}

// Get database instance with retry logic
export async function getDatabase(retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const client = await getMongoClient();
      if (!client) {
        if (attempt === retries) {
          throw new Error('Failed to establish MongoDB connection after multiple attempts');
        }
        console.log(`MongoDB connection attempt ${attempt} failed, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        continue;
      }
      return client.db('cms');
    } catch (error) {
      if (attempt === retries) {
        console.error('Final MongoDB connection attempt failed:', error);
        throw new Error(
          `Failed to establish MongoDB connection: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
      console.log(`MongoDB connection attempt ${attempt} failed, retrying...`, error);
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
    }
  }
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
