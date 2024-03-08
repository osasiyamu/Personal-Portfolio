const express = require('express');
const { pool } = require('./config/dbConnection');
const authController = require('./controllers/authCtrl');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5555; // Fallback to 5555 if the port is not defined in the environment

// Use CORS before defining routes
app.use(cors({
    origin: 'http://localhost:3000', // This allows your frontend to make requests to your backend
    credentials: true // This allows cookies to be sent with requests
}));

// Body parser middleware to parse request bodies (if you use express >= 4.16.0 this is built-in)
app.use(express.json());

// Attach signUp and signIn to routes
app.post('/api/signup', authController.signUp);
app.post('/api/signin', authController.signIn);

// Include other controllers
require('./controllers/portfolioCtrl')(app);

// Start the server
app.listen(port, () => {
    console.log(`Server has started on port: ${port}`);
});
