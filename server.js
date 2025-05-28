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
app.get("/get", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Hello</title>
            </head>
            <body>
                <h1>Hello, this is Shiva Krishna Suram, from Hyderabad</h1>
            </body>
        </html>
    `);
});


// connectDB();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
