import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDatabase } from '../../../../utils/mongodb';

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
        const { page } = req.query;
        const sections = await collection.find({ page }).toArray();
        return res.status(200).json(sections);
      }

      case 'POST': {
        const { slug, page } = req.body;

        // Validate slug for collections
        if (page === 'collections') {
          if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return res.status(400).json({
              success: false,
              message: 'Slug is required for collections',
            });
          }

          // Check if slug is unique
          const existingSlug = await collection.findOne({
            page: 'collections',
            slug: slug.trim(),
          });

          if (existingSlug) {
            return res.status(400).json({
              success: false,
              message: 'Slug must be unique. This slug already exists.',
            });
          }
        }

        const newSection = await collection.insertOne({
          ...req.body,
          slug: page === 'collections' ? slug.trim() : req.body.slug,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return res.status(201).json({ id: newSection.insertedId, ...req.body });
      }

      case 'PUT': {
        const { id, _id, slug, page, ...updateData } = req.body;

        // Validate slug for collections
        if (page === 'collections' && slug !== undefined) {
          if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return res.status(400).json({
              success: false,
              message: 'Slug is required for collections',
            });
          }

          // Check if slug is unique (excluding current document)
          const existingSlug = await collection.findOne({
            page: 'collections',
            slug: slug.trim(),
            _id: { $ne: new ObjectId(id) },
          });

          if (existingSlug) {
            return res.status(400).json({
              success: false,
              message: 'Slug must be unique. This slug already exists.',
            });
          }
        }

        const updateFields = {
          ...updateData,
          ...(page === 'collections' && slug ? { slug: slug.trim() } : {}),
          updatedAt: new Date(),
        };

        await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
        return res.status(200).json({ message: 'Section updated successfully' });
      }

      case 'DELETE': {
        const { id: deleteId } = req.body;
        await collection.deleteOne({ _id: new ObjectId(deleteId) });
        return res.status(200).json({ message: 'Section deleted successfully' });
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
