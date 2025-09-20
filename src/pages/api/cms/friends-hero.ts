import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDatabase();
    if (!db) {
      // If MongoDB connection fails, return default content for GET requests
      if (req.method === 'GET') {
        const defaultHeroContent = {
          video: 'https://video.richardmille.com/desktop/1290861657.mp4',
          title: 'Friends & partners',
          description:
            "Discover the brand through its partners. Alpine Creations's friends are varied and contrasting. Meet them.",
          isActive: true,
        };
        return res.status(200).json(defaultHeroContent);
      }
      return res.status(500).json({ message: 'Database connection failed' });
    }
    const collection = db.collection('friends_hero');

    switch (req.method) {
      case 'GET': {
        const heroContent = await collection.findOne({});
        if (!heroContent) {
          // Return default hero content if none exists
          const defaultHeroContent = {
            video: 'https://video.richardmille.com/desktop/1290861657.mp4',
            title: 'Friends & partners',
            description:
              "Discover the brand through its partners. Alpine Creations's friends are varied and contrasting. Meet them.",
            isActive: true,
          };
          return res.status(200).json(defaultHeroContent);
        }
        return res.status(200).json(heroContent);
      }

      case 'POST': {
        // Check if hero content already exists
        const existingContent = await collection.findOne({});
        if (existingContent) {
          return res.status(400).json({
            message: 'Hero content already exists. Use PUT to update.',
          });
        }

        const newHeroContent = await collection.insertOne({
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const insertedContent = await collection.findOne({ _id: newHeroContent.insertedId });
        return res.status(201).json(insertedContent);
      }

      case 'PUT': {
        const { id, _id, ...updateData } = req.body;
        console.log('PUT request data:', { id, _id, updateData });

        // If no ID provided, try to find existing content
        let query = {};
        if (id || _id) {
          query = { _id: new ObjectId(id || _id) };
        } else {
          // Find the first (and should be only) hero content
          const existingContent = await collection.findOne({});
          if (!existingContent) {
            return res.status(404).json({ message: 'Hero content not found' });
          }
          query = { _id: existingContent._id };
        }

        const result = await collection.updateOne(query, {
          $set: { ...updateData, updatedAt: new Date() },
        });

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Hero content not found' });
        }

        const updatedContent = await collection.findOne(query);
        return res.status(200).json(updatedContent);
      }

      case 'DELETE': {
        const { id: deleteId } = req.body;

        let query = {};
        if (deleteId) {
          query = { _id: new ObjectId(deleteId) };
        } else {
          // Delete the first (and should be only) hero content
          query = {};
        }

        const result = await collection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Hero content not found' });
        }

        return res.status(200).json({ message: 'Hero content deleted successfully' });
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);

    // If it's a MongoDB connection error, return default content for GET requests
    if (req.method === 'GET' && error instanceof Error && error.message.includes('MongoDB')) {
      const defaultHeroContent = {
        video: 'https://video.richardmille.com/desktop/1290861657.mp4',
        title: 'Friends & partners',
        description:
          "Discover the brand through its partners. Alpine Creations's friends are varied and contrasting. Meet them.",
        isActive: true,
      };
      return res.status(200).json(defaultHeroContent);
    }

    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
