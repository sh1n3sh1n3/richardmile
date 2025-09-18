import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { page } = req.query;

  try {
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({ message: 'Database connection failed' });
    }
    const collection = db.collection('sections');

    const sections = await collection.find({ page }).sort({ order: 1 }).toArray();

    return res.status(200).json(sections);
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await closeMongoDBConnection();
  }
}
