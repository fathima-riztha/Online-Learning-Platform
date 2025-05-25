const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const authRouts = require('./routes/auth');
const courseRouts = require('./routes/course');
const enrollmentRouts = require('./routes/entrolment');
const gptRoutes = require("./routes/gpt");

const app = express();
app.use(express.json());
app.use(cors(
  { origin: process.env.CLIENT_URL} 
));

app.use('/api/auth', authRouts);
app.use('/api/courses', courseRouts);
app.use('/api/enrollment', enrollmentRouts);
app.use("/api/gpt", gptRoutes);

const PORT=process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});