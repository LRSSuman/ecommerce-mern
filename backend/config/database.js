const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DB_LOCAL_URI);
        console.log(`MongoDB is connected to the host: ${connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
    }
};

module.exports = connectDatabase;
