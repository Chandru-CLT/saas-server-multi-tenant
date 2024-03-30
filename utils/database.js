const mongoose = require('mongoose');

const connectToDatabase = (organization) => {
    return mongoose.createConnection(`mongodb+srv://chandru-clt:chandruclt@chandru-clt.ildrbug.mongodb.net/${organization}`, {
    // return mongoose.createConnection(`mongodb://localhost:27017/${organization}`, {
        connectTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 30000, // 30 seconds
    });
};

module.exports = { connectToDatabase };
