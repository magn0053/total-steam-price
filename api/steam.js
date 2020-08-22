const fetch = require('fetch')
    , express = require('express')
    , router = express.Router();

router.post('/steamGamesList', (req, res) => {
    res.send('Oi');
});

router.post('/steamGamesPricing', (req, res) => {
    res.send('I\'ll get some prices');
})

router.get('');


module.exports = router;