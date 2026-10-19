import { MongoClient, Db } from "mongodb";

const options = {};

let clientPromise: Promise<MongoClient> | null = null;

export function isMongoConfigured(): boolean {
    const uri = process.env.MONGODB_URI?.trim();
    return !!uri && (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"));
}

export async function getMongoClient(): Promise<MongoClient | null> {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) {
        return null;
    }

    if (!clientPromise) {
        if (process.env.NODE_ENV === "development") {
            const globalWithMongo = global as typeof globalThis & {
                _mongoClientPromise?: Promise<MongoClient>;
            };

            if (!globalWithMongo._mongoClientPromise) {
                const client = new MongoClient(uri, options);
                globalWithMongo._mongoClientPromise = client.connect();
            }
            clientPromise = globalWithMongo._mongoClientPromise;
        } else {
            const client = new MongoClient(uri, options);
            clientPromise = client.connect();
        }
    }

    return clientPromise;
}

export async function getMongoDb(): Promise<Db | null> {
    try {
        const client = await getMongoClient();
        if (!client) return null;
        return client.db("portfolio");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        return null;
    }
}
