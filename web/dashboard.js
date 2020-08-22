const   express = require('express')
        ,router = express.Router()

router.get('/', (req, res) => {
    res.send('Please log in here')
})


module.exports = router;