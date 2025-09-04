import { NextApiRequest, NextApiResponse } from 'next';
import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Testing MinIO connection...');
    
    // Test bucket existence
    const bucketName = 'media-files';
    const bucketExists = await minioClient.bucketExists(bucketName);
    console.log('Bucket exists:', bucketExists);
    
    if (!bucketExists) {
      return res.status(404).json({ 
        message: 'Bucket not found',
        bucket: bucketName,
        suggestion: 'Create the bucket first or check MinIO configuration'
      });
    }

    // List objects in bucket
    const objects = await minioClient.listObjects(bucketName, '', true).toArray();
    console.log('Objects in bucket:', objects);
    
    // Test file accessibility for first object
    if (objects.length > 0) {
      const firstObject = objects[0];
      const fileUrl = `http://localhost:9000/${bucketName}/${firstObject.name}`;
      
      console.log('Testing file accessibility for:', firstObject.name);
      console.log('File URL:', fileUrl);
      
      try {
        const testResponse = await fetch(fileUrl);
        console.log('File accessibility test:', {
          status: testResponse.status,
          contentType: testResponse.headers.get('content-type'),
          contentLength: testResponse.headers.get('content-length'),
          url: fileUrl
        });
        
        // Check if file content is actually accessible
        let fileContent = '';
        try {
          fileContent = await testResponse.text();
          console.log('File content preview (first 100 chars):', fileContent.substring(0, 100));
        } catch (contentError) {
          console.warn('Could not read file content:', contentError);
        }
        
        if (testResponse.status === 200) {
          return res.status(200).json({
            message: 'MinIO test successful',
            bucket: bucketName,
            objects: objects.map(obj => ({
              name: obj.name,
              size: obj.size,
              lastModified: obj.lastModified
            })),
            firstFileTest: {
              status: testResponse.status,
              contentType: testResponse.headers.get('content-type'),
              contentLength: testResponse.headers.get('content-length'),
              url: fileUrl,
              contentPreview: fileContent.substring(0, 100)
            }
          });
        }
        
        return res.status(200).json({
          message: 'MinIO connected but file serving failed',
          bucket: bucketName,
          objects: objects.map(obj => ({
            name: obj.name,
            size: obj.size,
            lastModified: obj.lastModified
          })),
          error: `File accessibility test failed - HTTP status: ${testResponse.status}`,
          suggestion: 'Check MinIO public access settings and bucket policies'
        });
      } catch (testError) {
        console.warn('File accessibility test failed:', testError);
        return res.status(200).json({
          message: 'MinIO connected but file serving failed',
          bucket: bucketName,
          objects: objects.map(obj => ({
            name: obj.name,
            size: obj.size,
            lastModified: obj.lastModified
          })),
          error: 'File accessibility test failed - network error',
          suggestion: 'Check if MinIO is accessible on localhost:9000'
        });
      }
    }
    
    return res.status(200).json({
      message: 'MinIO connected successfully',
      bucket: bucketName,
      objects: [],
      note: 'Bucket is empty - upload some files first'
    });
    
  } catch (error) {
    console.error('MinIO test failed:', error);
    return res.status(500).json({ 
      message: 'MinIO test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'Check if MinIO service is running and accessible'
    });
  }
}
