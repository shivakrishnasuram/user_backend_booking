const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://sskrishna:Shiv%40123@mydatabase.yo2hy.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=mydatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
