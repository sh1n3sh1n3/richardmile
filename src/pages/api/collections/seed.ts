import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';
import { collections } from '../../../assets/data/collections';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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

    // Clear existing collections data (only collections page data)
    await collection.deleteMany({ page: 'collections' });
    console.log('Cleared existing collections data');

    // Transform static data to include additional fields for CMS
    const collectionsData = collections.map((item, index) => ({
      ...item,
      page: 'collections', // Add page field to identify as collections data
      order: index + 1,
      featured: item.new || item.limited, // Mark new or limited items as featured
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add CMS-specific fields
      slug: item.id, // Use the existing id as slug
      seoTitle: `${item.name} - ${item.subtitle}`,
      seoDescription: item.description,
      tags: [
        item.category.toLowerCase(),
        ...(item.limited ? ['limited'] : []),
        ...(item.new ? ['new'] : []),
      ],
      // Add additional metadata
      specifications: {
        movement: 'Automatic',
        powerReserve: '50 hours',
        waterResistance: '50m',
        caseMaterial: 'Carbon TPT',
        strapMaterial: 'Rubber',
        buckle: 'Titanium',
      },
      // Add availability info
      availability: {
        inStock: !item.limited,
        limitedEdition: item.limited,
        quantity: item.limited ? Math.floor(Math.random() * 10) + 1 : null,
      },
    }));

    // Insert collections data
    const result = await collection.insertMany(collectionsData);
    console.log(`Inserted ${result.insertedCount} collections`);

    // Get the inserted collections to return
    const insertedCollections = await collection.find({}).sort({ order: 1 }).toArray();

    return res.status(201).json({
      success: true,
      message: `Successfully seeded ${result.insertedCount} collections`,
      data: {
        count: result.insertedCount,
        collections: insertedCollections,
      },
    });
  } catch (error) {
    console.error('Collections seed error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to seed collections',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}
