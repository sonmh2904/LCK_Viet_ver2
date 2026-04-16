const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const uri = process.env.MONGO_URI;
        const dbName = process.env.MONGO_DB_NAME || 'LCK_VIET2';

        const db = await mongoose.connect(uri, {
            dbName,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB connected successfully');

    } catch (error) {
        console.error("MongoDB connection failed: ", error);
        throw error;
    }
};

module.exports = connectDB;