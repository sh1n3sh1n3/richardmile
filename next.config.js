module.exports = {
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    // HOST
    HOST_API_KEY: '',
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
    // MONGODB
    MONGODB_URI:
      'mongodb+srv://admin:admin@cluster0.an4se.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    // MINIO
    // MINIO_ENDPOINT: 's3.waru.pro',
    // MINIO_PORT: '443',
    // MINIO_USE_SSL: 'true',
    // MINIO_ACCESS_KEY: 'iaHqAQdvili7DCOpxzg7',
    // MINIO_SECRET_KEY: 'YbLuIHdyepzWjSyi70XQdLqJInJEQBcU1Pwg3bW5',
    MINIO_ENDPOINT: 'play.min.io',
    MINIO_PORT: '443',
    MINIO_USE_SSL: 'true',
    MINIO_ACCESS_KEY: 'Q3AM3UQ867SPQQA43P2F',
    MINIO_SECRET_KEY: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    // MINIO_ENDPOINT: 'localhost',
    // MINIO_PORT: '9000',
    // MINIO_USE_SSL: 'false',
    // MINIO_ACCESS_KEY: 'minioadmin',
    // MINIO_SECRET_KEY: 'minioadmin',
  },
};
