const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const surveyRoutes = require('./routes/surveyRoutes');
const PORT = process.env.PORT || 3000;
const app = express(); // Make sure this line is present
const path = require('path'); // Include the 'path' module
const CURRENT_WORKING_DIR = process.cwd();
const PUBLIC_DIR = path.join(CURRENT_WORKING_DIR, '../dist/app');
console.log(PUBLIC_DIR);

app.use(cors());
app.use(express.json());

// MongoDB configuration
mongoose.connect("mongodb+srv://mongo:mongo123@webappdev.atjz4um.mongodb.net/Surveyproject", {
//mongoose.connect("mongodb+srv://musketeersgroup408:musk229408@cluster0.pf9v9q7.mongodb.net/Surveyproject?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use('/', userRoutes);
app.use('/', surveyRoutes);

// app.get('/', (req, res) => {
//   res.send("Welcome to Student Survey");
// });

// Serve static files
app.use(express.static(PUBLIC_DIR));

// For all other routes, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});