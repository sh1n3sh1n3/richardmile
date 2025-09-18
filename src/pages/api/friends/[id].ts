import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Friend ID is required' });
  }

  try {
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({ message: 'Database connection failed' });
    }
    const collection = db.collection('friends');

    switch (req.method) {
      case 'GET': {
        const friend = await collection.findOne({ _id: new ObjectId(id) });

        if (!friend) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        return res.status(200).json(friend);
      }

      case 'PUT': {
        const { _id, ...updateData } = req.body;

        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        return res.status(200).json({ message: 'Friend updated successfully' });
      }

      case 'DELETE': {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        return res.status(200).json({ message: 'Friend deleted successfully' });
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Friend API error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
