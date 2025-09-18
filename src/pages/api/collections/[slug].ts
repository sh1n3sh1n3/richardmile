import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
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

    const { slug } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Collection slug is required',
      });
    }

    const collection = db.collection('sections');

    switch (req.method) {
      case 'GET': {
        // First try to find by slug field
        let collectionData = await collection.findOne({
          page: 'collections',
          slug: slug,
        });

        // If not found by slug, try to find by id field (for backward compatibility)
        if (!collectionData) {
          collectionData = await collection.findOne({
            page: 'collections',
            id: slug,
          });
        }

        if (!collectionData) {
          return res.status(404).json({
            success: false,
            message: 'Collection not found',
          });
        }

        return res.status(200).json({
          success: true,
          data: collectionData,
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: 'Method not allowed',
        });
    }
  } catch (error) {
    console.error('Collection slug API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
