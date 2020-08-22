const   mainPage = require('./web/mainPage')
        ,dashboard = require('./web/dashboard')
        ,database = require('./api/database')
        ,steamApi = require('./api/steam')
        ,express = require('express')
        ,app = express()
        ,port = 4004;


        
// The part for most users - showing the website itself
app.use('/', mainPage);

// Handling the dashboard for controlling the application
app.use('/dashboard', dashboard);

// All the APIs
app.use('/api/steam', steamApi);
app.use('/api/database', database);

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));