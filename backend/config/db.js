const mongoose = require('mongoose');
const MONGO_CONNECTION_URI = "mongodb+srv://mishikaj2001:HROIHf6E8AwJshqO@projecthub.dpeatfl.mongodb.net/projectHub?retryWrites=true&w=majority&appName=projectHub";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_CONNECTION_URI, {
    });

    console.log(`MongoDB connected ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;