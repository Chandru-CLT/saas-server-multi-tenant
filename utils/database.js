const mongoose = require('mongoose');

const connectToDatabase = (organization) => {
    return mongoose.createConnection(`mongodb+srv://chandru-clt:chandruclt@chandru-clt.ildrbug.mongodb.net//${organization}`);
};

module.exports = { connectToDatabase };

