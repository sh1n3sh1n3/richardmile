import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { objectKey, originalName, mimeType, size, url, isVideo, isImage } = req.body as any;

    if (!objectKey || !originalName || !mimeType || !size || !url) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({ message: 'Database connection failed' });
    }
    const collection = db.collection('media');

    const doc = {
      fileName: objectKey,
      originalName,
      mimeType,
      size,
      url,
      isVideo: Boolean(isVideo ?? (typeof mimeType === 'string' && mimeType.startsWith('video/'))),
      isImage: Boolean(isImage ?? (typeof mimeType === 'string' && mimeType.startsWith('image/'))),
      uploadedAt: new Date(),
    };

    const result = await collection.insertOne(doc);

    return res.status(200).json({
      id: result.insertedId,
      ...doc,
      message: 'File metadata saved',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to save metadata',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
