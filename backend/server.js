const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const authenticateUser = require('./routes/authMiddleware');

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/TrendElite').then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', authenticateUser, require('./routes/posts'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/validate',authenticateUser);

app.get('/api/validate', authenticateUser, (req, res) => {
  // If authenticateUser middleware allows this request, the user is authenticated
  res.status(200).json({ message: 'Token is valid' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
