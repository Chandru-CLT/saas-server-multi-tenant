const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Router imports
const userRoutes = require('./routes/userRoutes');
const staffRoutes = require('./routes/staffRouter');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const checkSubdomainAvailability = require('./middleware/checkDomain');

const app = express();
const PORT = 1997;

app.use(express.json());
app.use(cors())

// Connect to MongoDB
// mongoose.connect('mongodb+srv://chandru-clt:chandruclt@chandru-clt.ildrbug.mongodb.net')
//     .then(() => console.log('Database connected'))
//     .catch(err => console.error('Error connecting to database:', err));

// Routes
app.use('/api', userRoutes); //company signup
app.use('/staff', staffRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Multi Tenant Backend running on port ${PORT}`);
});
