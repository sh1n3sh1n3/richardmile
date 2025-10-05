import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed',
      });
    }
    const collection = db.collection('sections');

    switch (req.method) {
      case 'GET': {
        const { category, featured, limit } = req.query;

        let query: any = { page: 'collections' };

        // Filter by category if provided
        if (category && category !== 'all') {
          query.category = category;
        }

        // Filter by featured if provided
        if (featured === 'true') {
          query.featured = true;
        }

        let cursor = collection.find(query).sort({ isDefault: -1, order: 1, createdAt: -1 });

        // Apply limit if provided
        if (limit) {
          cursor = cursor.limit(parseInt(limit as string, 10));
        }

        const collections = await cursor.toArray();

        return res.status(200).json({
          success: true,
          data: collections,
          count: collections.length,
        });
      }

      case 'POST': {
        const newCollection = await collection.insertOne({
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return res.status(201).json({
          success: true,
          data: { id: newCollection.insertedId, ...req.body },
        });
      }

      case 'PUT': {
        const { id, _id, ...updateData } = req.body;

        if (!id && !_id) {
          return res.status(400).json({
            success: false,
            message: 'Collection ID is required for update',
          });
        }

        const result = await collection.updateOne(
          { _id: new ObjectId(id || _id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Collection not found',
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Collection updated successfully',
          data: { id: id || _id, ...updateData },
        });
      }

      case 'DELETE': {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({
            success: false,
            message: 'Collection ID is required for deletion',
          });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Collection not found',
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Collection deleted successfully',
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: 'Method not allowed',
        });
    }
  } catch (error) {
    console.error('Collections API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
