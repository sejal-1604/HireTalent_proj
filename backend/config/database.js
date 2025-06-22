import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    const mongoURI = config.isTest ? config.MONGODB_TEST_URI : config.MONGODB_URI;
    
    const conn = await mongoose.connect(mongoURI, {
      // Remove deprecated options that are now defaults in Mongoose 6+
      // useNewUrlParser and useUnifiedTopology are no longer needed
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB disconnection:', err);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    
    // Exit process with failure in production
    if (config.isProduction) {
      process.exit(1);
    }
    
    throw error;
  }
};

// Function to disconnect from database (useful for testing)
const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};

// Function to clear database (useful for testing)
const clearDB = async () => {
  try {
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
    throw error;
  }
};

export { connectDB, disconnectDB, clearDB };
