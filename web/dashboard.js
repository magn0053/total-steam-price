const { mongo } = require('mongoose');

const express = require('express')
    , router = express.Router()
    , database = require('../api/mongodb.js')
    , ejs = require('ejs')
    , path = require('path')
    , configuration = require('../configuration.json')
    ;


router.get('/', (req, res) => {
    res.render(path.join(__dirname, './pages/dashboardLogin.ejs'));

});

router.post('/login/', (req, res) => {

   //database.connection.connect(configuration.mongodb.url, configuration.mongodb.username, configuration.mongodb.password);

    console.log(database.user);
    database.user.findOne({ username: req.body.username }, function (err, user) {

        if (!user.validPassword(req.body.password)) {
            //password did not match
            console.log('No match');
        } else {
            // password matched. proceed forward
            console.log('It\'s a match');
        }
    });

})

module.exports = router;