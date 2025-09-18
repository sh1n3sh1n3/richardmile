import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({ message: 'Database connection failed' });
    }

    // Fetch both friends and hero data in parallel
    const [friends, heroContent] = await Promise.all([
      db.collection('friends').find({}).sort({ order: 1, createdAt: -1 }).toArray(),
      db.collection('friends_hero').findOne({}),
    ]);

    return res.status(200).json({
      friends,
      heroContent,
    });
  } catch (error) {
    console.error('Friends page data API error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
