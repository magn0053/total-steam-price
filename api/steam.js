const   fetch = require('fetch')
        ,express = require('express')
        ,router = express.Router()

router.get('/updateSteamGames', (req, res) => {
    res.send('Oi')
})


module.exports = router;