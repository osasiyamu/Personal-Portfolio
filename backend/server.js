const { app, port } = require('./config/dbConnection');
const authController = require('./controllers/authCtrl');

// Attach signUp and signIn to routes
app.post('/api/signup', authController.signUp);
app.post('/api/signin', authController.signIn);
app.post('/api/signout', authController.signOut);

// Include other controllers
require('./controllers/portfolioCtrl')(app);
require('./controllers/searchCtrl')(app);

// Start the server
app.listen(port, () => {
    console.log(`Server has started on port: ${port}`);
});
