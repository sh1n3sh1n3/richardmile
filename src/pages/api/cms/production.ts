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
    const collection = db.collection('production');

    switch (req.method) {
      case 'GET': {
        // Fetch the single production document
        const production = await collection.findOne({});
        return res.status(200).json(production || null);
      }

      case 'POST': {
        // Check if production already exists
        const existing = await collection.findOne({});
        if (existing) {
          // Update existing production
          const { _id, ...updateData } = req.body as any;
          await collection.updateOne(
            { _id: existing._id },
            { $set: { ...updateData, updatedAt: new Date() } }
          );
          return res.status(200).json({
            success: true,
            message: 'Production updated successfully',
          });
        }

        // Create new production
        const newProduction = await collection.insertOne({
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return res.status(201).json({
          success: true,
          id: newProduction.insertedId,
          ...req.body,
        });
      }

      case 'PUT': {
        // Update existing production
        const { _id, ...updateData } = req.body as any;

        // Find the production document (should only be one)
        const existing = await collection.findOne({});
        if (!existing) {
          return res.status(404).json({
            success: false,
            message: 'Production not found',
          });
        }

        await collection.updateOne(
          { _id: existing._id },
          { $set: { ...updateData, updatedAt: new Date() } }
        );

        return res.status(200).json({
          success: true,
          message: 'Production updated successfully',
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: 'Method not allowed',
        });
    }
  } catch (error) {
    console.error('Production API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
