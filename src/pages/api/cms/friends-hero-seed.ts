import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const db = await getDatabase();
    const collection = db.collection('friends_hero');

    // Check if hero content already exists
    const existingContent = await collection.findOne({});
    if (existingContent) {
      return res.status(400).json({
        message:
          'Hero content already exists. Delete existing content first if you want to reseed.',
      });
    }

    // Default FriendsHero content
    const friendsHeroContent = {
      video: 'https://video.richardmille.com/desktop/1290861657.mp4',
      title: 'Friends & partners',
      description:
        "Discover the brand through its partners. Richard Mille's friends are varied and contrasting. Meet them.",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(friendsHeroContent);
    const insertedContent = await collection.findOne({ _id: result.insertedId });

    return res.status(201).json({
      message: 'Friends Hero content seeded successfully',
      data: insertedContent,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await closeMongoDBConnection();
  }
}
