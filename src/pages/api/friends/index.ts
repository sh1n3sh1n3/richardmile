import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({ message: 'Database connection failed' });
    }
    const collection = db.collection('friends');

    switch (req.method) {
      case 'GET': {
        const friends = await collection.find({}).sort({ order: 1, createdAt: -1 }).toArray();
        return res.status(200).json(friends);
      }

      case 'POST': {
        const friendData = {
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const newFriend = await collection.insertOne(friendData);
        return res.status(201).json({
          id: newFriend.insertedId,
          ...friendData,
          _id: newFriend.insertedId,
        });
      }

      case 'PUT': {
        const { id, _id, ...updateData } = req.body;

        if (!id && !_id) {
          return res.status(400).json({ message: 'Friend ID is required' });
        }

        const friendId = id || _id;
        const result = await collection.updateOne(
          { _id: new ObjectId(friendId) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        return res.status(200).json({ message: 'Friend updated successfully' });
      }

      case 'DELETE': {
        const { id: deleteId } = req.body;

        if (!deleteId) {
          return res.status(400).json({ message: 'Friend ID is required' });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(deleteId) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        return res.status(200).json({ message: 'Friend deleted successfully' });
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Friends API error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
