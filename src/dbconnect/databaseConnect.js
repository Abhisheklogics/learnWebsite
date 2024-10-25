import mongoose from 'mongoose';

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    return; 
  }

  try {
    const dbUri = process.env.MONGO_URI; // Ensure this is correct
    console.log('Connecting to database at:', dbUri);
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
