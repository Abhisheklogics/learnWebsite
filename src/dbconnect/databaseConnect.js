import mongoose from 'mongoose';

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    return; 
  }

  try {
    console.log('Connecting to database at:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
}
