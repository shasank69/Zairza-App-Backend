const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

const eventRoutes = require('./router/eventsrouter.js');
const userRoutes = require('./router/authrouter.js');
const inventoryRoutes = require('./router/inventoryrouter.js');
const projectRoutes = require('./router/projectsrouter.js');
const resourceRoutes = require('./router/resourcesrouter.js');
const selfProjectRoutes = require('./router/selfprojectrouter.js');

app.use(express.json());
require('dotenv').config(); 

const database = process.env.MONGO_URI;

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/self-projects', selfProjectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
