const { app, port } = require('./config/dbConnection');

require('./controllers/portfolioCtrl')(app);
require('./controllers/searchCtrl')(app);


app.listen(port, () => console.log(`Server has started on port: ${port}`));
