import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({
        success: false,
        message: 'Database connection failed',
      });
    }

    const collection = db.collection('sections');

    // Get all collections with their categories
    const collections = await collection
      .find({ page: 'collections' })
      .project({ category: 1, _id: 0 })
      .toArray();

    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(collections.map((item) => item.category).filter(Boolean))
    );

    // Sort categories alphabetically
    const sortedCategories = uniqueCategories.sort();

    return res.status(200).json({
      success: true,
      data: sortedCategories,
      count: sortedCategories.length,
    });
  } catch (error) {
    console.error('Categories API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
