
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getDatabase, closeMongoDBConnection } from '../../../../utils/mongodb';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDatabase();
    const collection = db.collection('sections');

    switch (req.method) {
      case 'GET': {
        const { page } = req.query;
        const sections = await collection.find({ page }).toArray();
        return res.status(200).json(sections);
      }

      case 'POST': {
        const newSection = await collection.insertOne({
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return res.status(201).json({ id: newSection.insertedId, ...req.body });
      }

      case 'PUT': {
        const { id, _id, ...updateData } = req.body;
        console.log('PUT request data:', { id, _id, updateData });
        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
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
  } finally {
    await closeMongoDBConnection();
  }
}
