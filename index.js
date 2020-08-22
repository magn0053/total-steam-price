const   mainPage = require('./web/mainPage')
        steamApi = require('./api/steam')
        ,express = require('express')
        ,app = express()
        ,port = 4004


        
app.use('/', mainPage)
app.use('/api/steam', steamApi)

app.listen(port, () => console.log(`App is listening at http://localhost:${port}`))