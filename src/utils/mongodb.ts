import mongoose from 'mongoose';

// Cache connection across hot reloads/serverless invocations
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
let cached = (global as any).mongoose as MongooseCache | undefined;

if (!cached) {
  const initial: MongooseCache = { conn: null, promise: null };
  (global as any).mongoose = initial;
  cached = initial;
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

    const promise = (mongoose as any).connect(uri, opts).then((m: any) => m);
    cached!.promise = promise;
  }

  const conn = await cached!.promise;
  cached!.conn = conn;
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
    const reset: MongooseCache = { conn: null, promise: null };
    (global as any).mongoose = reset;
    cached = reset;
  }
}

