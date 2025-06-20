require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

const userRoutes = require('./routes/UsersRoutes');
const postRoutes = require('./routes/PostRoutes');
const messageRoutes = require('./routes/MessageRoutes')

const app = express();

mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// User Routes
app.use('/api/users', userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POst routes
app.use('/api/posts',postRoutes);

//message routes
app.use('/api/message',messageRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
