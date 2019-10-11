const router = require('express').Router()

const bandOperations = require('../db/operations/band')

router.use('/band', require('./band'))

router.use('/user', require('./user'))

router.get('/', function (req, res) {
    bandOperations.getAll()
        .then(bands => {
            res.render('rand', {
                bands: bands
            })
        })
})

module.exports = router
