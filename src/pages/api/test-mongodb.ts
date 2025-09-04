import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing MongoDB connection...');
    
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    console.log('Connection URI:', uri);
    
    // Different options for local vs cloud MongoDB
    let options: any = {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    if (uri.includes('mongodb+srv')) {
      // MongoDB Atlas (cloud) - SSL is required
      console.log('Using MongoDB Atlas configuration');
      options = {
        ...options,
        ssl: true,
        sslValidate: false,
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
    
    const client = new MongoClient(uri, options);

    console.log('Attempting to connect...');
    await client.connect();
    console.log('MongoDB connection successful!');
    
    // Test database access
    const db = client.db('cms');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    await client.close();
    console.log('Connection closed');
    
    return res.status(200).json({ 
      message: 'MongoDB connection test successful',
      uri,
      connectionType: uri.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('MongoDB test failed:', error);
    return res.status(500).json({ 
      message: 'MongoDB connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
      connectionType: process.env.MONGODB_URI?.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB'
    });
  }
}
