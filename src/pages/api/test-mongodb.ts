import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    await db.command({ ping: 1 });
    const collections = await db.listCollections().toArray();
    return res.status(200).json({
      message: 'MongoDB connection test successful',
      connectionType: (process.env.MONGODB_URI || '').includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB',
      db: db.databaseName,
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'MongoDB connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
