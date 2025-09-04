import mongoose from 'mongoose';

// Cache connection across hot reloads/serverless invocations
let cached = (global as any).mongoose as
  | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
  | undefined;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectMongoose(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const dbName = process.env.MONGODB_DB || 'cms';

    const opts: any = {
      dbName,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4, // prefer IPv4 to avoid SRV/IPv6 issues
      bufferCommands: false,
    } as any;

    cached!.promise = (mongoose as any).connect(uri, opts).then((m: any) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

// Expose DB like before for minimal API changes
export async function getDatabase() {
  const m = await connectMongoose();
  return m.connection.db;
}

export async function closeMongoDBConnection() {
  // Do not close on Vercel to reuse connection; close only in local dev or explicit tests
  if (!process.env.VERCEL && mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    cached = (global as any).mongoose = { conn: null, promise: null };
  }
}

