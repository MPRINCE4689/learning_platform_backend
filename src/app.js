const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

// Routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const progressRoutes = require('./routes/progressRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quizzes', quizRoutes);

// MongoDB Connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('🎉 Welcome to the Online Learning Platform API');
});

// Start Server
app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`);
});
