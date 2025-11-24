import mongoose from 'mongoose';

export default async function connectToMongoDB() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("MONGODB_URI is missing");
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB with Mongoose:", error);
    }
}
