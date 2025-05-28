const express = require('express');
const connectDB = require('./config/db');
// const cors =require("cors")
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')
const app = express();
app.use(cors())

// app.use(express.cors())
app.use(express.json());
app.use('/', userRoutes);

// connectDB();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
