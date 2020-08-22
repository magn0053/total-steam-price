const   express = require('express')
        ,router = express.Router()

router.get('/', (req, res) => {
    res.send('The price will be here');
})


module.exports = router;