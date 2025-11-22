import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor define la variable de entorno MONGODB_URI en .env.local'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

// Lock to prevent concurrent connection attempts
let connectionLock: Promise<typeof mongoose> | null = null;

async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // If there's an active connection attempt, wait for it
  if (connectionLock) {
    return connectionLock;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'bellarya',
    };

    // Create connection lock
    connectionLock = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB conectado a la base de datos: bellarya');
        cached.conn = mongoose;
        connectionLock = null;
        return mongoose;
      })
      .catch((e) => {
        connectionLock = null;
        cached.promise = null;
        throw e;
      });

    cached.promise = connectionLock;
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
