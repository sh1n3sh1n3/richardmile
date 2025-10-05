import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

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
        // Find the collection with isDefault: true
        let defaultCollection = await collection.findOne({
          page: 'collections',
          isDefault: true,
        });

        // If no default collection is set, fallback to the first collection by order
        if (!defaultCollection) {
          defaultCollection = await collection.findOne(
            { page: 'collections' },
            { sort: { order: 1, createdAt: -1 } }
          );
        }

        if (!defaultCollection) {
          return res.status(404).json({
            success: false,
            message: 'No collections found',
          });
        }

        return res.status(200).json({
          success: true,
          data: defaultCollection,
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: 'Method not allowed',
        });
    }
  } catch (error) {
    console.error('Default collection API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
