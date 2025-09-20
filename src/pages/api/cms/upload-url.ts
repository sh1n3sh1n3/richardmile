import { NextApiRequest, NextApiResponse } from 'next';
import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
  pathStyle: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fileName, contentType, size } = req.body as {
      fileName?: string;
      contentType?: string;
      size?: number;
    };

    if (!fileName || !contentType || !size) {
      return res.status(400).json({ message: 'fileName, contentType and size are required' });
    }

    // Enforce max size of 50MB
    const maxBytes = 50 * 1024 * 1024;
    if (size > maxBytes) {
      return res.status(413).json({ message: 'File too large. Max 50MB' });
    }

    const bucketName = 'media-files';

    try {
      const exists = await minioClient.bucketExists(bucketName);
      if (!exists) {
        await minioClient.makeBucket(bucketName);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'MinIO service unavailable' });
    }

    const timestamp = Date.now();
    const objectKey = `${timestamp}-${fileName}`;

    // Create presigned PUT URL for direct upload from client
    const expirySeconds = 60 * 10; // 10 minutes
    const uploadUrl = await minioClient.presignedPutObject(bucketName, objectKey, expirySeconds);

    // Also provide a presigned GET for immediate preview after upload
    const getUrl = await minioClient.presignedGetObject(bucketName, objectKey, 60 * 60 * 24); // 24h

    return res.status(200).json({
      bucket: bucketName,
      objectKey,
      uploadUrl,
      getUrl,
      // Echo back for client convenience
      contentType,
      size,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to generate upload URL',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
