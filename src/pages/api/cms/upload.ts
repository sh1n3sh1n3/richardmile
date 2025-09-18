import { NextApiRequest, NextApiResponse } from 'next';
import * as Minio from 'minio';
import formidable from 'formidable';
import fs from 'fs';
import { getDatabase, closeMongoDBConnection } from '../../../utils/mongodb';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('Upload request received');

  try {
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024, // 50MB
    });

    console.log('Parsing form data...');
    const [, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File received:', {
      originalName: file.originalFilename,
      size: file.size,
      mimetype: file.mimetype,
    });

    console.log('Connecting to MongoDB...');
    const db = await getDatabase();
    if (!db) {
      return res.status(500).json({ message: 'Database connection failed' });
    }
    console.log('MongoDB connected successfully');

    // Ensure bucket exists
    const bucketName = 'media-files';
    console.log('Checking MinIO bucket:', bucketName);

    try {
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        console.log('Creating MinIO bucket:', bucketName);
        await minioClient.makeBucket(bucketName);
        console.log('MinIO bucket created successfully');
      } else {
        console.log('MinIO bucket already exists');
      }
    } catch (minioError) {
      console.error('MinIO error:', minioError);
      return res.status(500).json({ message: 'MinIO service unavailable' });
    }

    // Upload to MinIO
    const originalName = file.originalFilename || 'unknown';
    const fileExtension = originalName.split('.').pop() || '';
    const timestamp = Date.now();
    const fileName = `${timestamp}-${originalName}`;

    console.log('Uploading file to MinIO:', fileName);
    console.log('Original name:', originalName);
    console.log('File extension:', fileExtension);
    console.log('MIME type:', file.mimetype);

    const fileStream = fs.createReadStream(file.filepath);

    // Set metadata for MinIO to ensure proper content type
    const metadata = {
      'Content-Type': file.mimetype || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${originalName}"`,
      'Cache-Control': 'public, max-age=31536000',
    };

    await minioClient.putObject(bucketName, fileName, fileStream, file.size, metadata);
    console.log('File uploaded to MinIO successfully with metadata:', metadata);

    // Generate accessible URL - use MinIO's public URL format
    const fileUrl = `http://localhost:9000/${bucketName}/${fileName}`;

    // Test if file is accessible
    let isPubliclyAccessible = false;
    try {
      const testResponse = await fetch(fileUrl);
      console.log('File accessibility test:', {
        status: testResponse.status,
        contentType: testResponse.headers.get('content-type'),
        url: fileUrl,
      });

      isPubliclyAccessible = testResponse.status === 200;
    } catch (testError) {
      console.warn('File accessibility test failed:', testError);
    }

    // If public access fails, generate a presigned URL
    let finalUrl = fileUrl;
    if (!isPubliclyAccessible) {
      try {
        console.log('Public access failed, generating presigned URL...');
        const presignedUrl = await minioClient.presignedGetObject(
          bucketName,
          fileName,
          24 * 60 * 60
        ); // 24 hours
        finalUrl = presignedUrl;
        console.log('Generated presigned URL:', presignedUrl);
      } catch (presignError) {
        console.error('Failed to generate presigned URL:', presignError);
        // Keep the original URL as fallback
      }
    }

    // Save metadata to MongoDB
    console.log('Saving metadata to MongoDB...');
    const collection = db.collection('media');
    const result = await collection.insertOne({
      fileName,
      originalName,
      mimeType: file.mimetype,
      size: file.size,
      url: finalUrl,
      isVideo: file.mimetype?.startsWith('video/') || false,
      isImage: file.mimetype?.startsWith('image/') || false,
      uploadedAt: new Date(),
    });
    console.log('Metadata saved to MongoDB:', result.insertedId);

    return res.status(200).json({
      id: result.insertedId,
      fileName,
      originalName,
      url: finalUrl,
      mimeType: file.mimetype,
      size: file.size,
      isVideo: file.mimetype?.startsWith('video/') || false,
      isImage: file.mimetype?.startsWith('image/') || false,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    await closeMongoDBConnection();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
