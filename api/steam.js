const fetch = require('fetch')
    , express = require('express')
    , router = express.Router();

router.get('/getSteamGamesList', (req, res) => {
    res.send('Oi');
});

router.get('');


module.exports = router;