const router = require('express').Router()

const bandOperations = require('../db/operations/band')

router.use(function (req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.status(403).json({
            status: 403,
            message: "login before this..",
            data: {}
        })
    }
})

router.get('/allbands', function (req, res) {
    bandOperations.getAll()
        .then((bands) => {
            res.render('allbands', {
                bands: bands
            })
        })
})
router.get('/mybands', function (req, res) {
    bandOperations.getUserBands(req.session.user.email)
        .then((bands) => {
            res.render('mybands', {
                bands: bands
            })
           
        }).catch(() => {

        })
})
router.get('/add', function (req, res) {
    res.render('addband')
})

router.post('/add', function (req, res) {
    let email = req.session.user.email
    let name = req.body.name
    let type = req.body.type
    let description = req.body.description

    bandOperations.addBand(email, name, type, description)
        .then((band) => {
            res.status(201).json({
                status: 201,
                message: "band added successfully..",
                data: band
            })
        }).catch(() => {
            res.status(500).json({
                status: 500,
                message: "cudnt add..",
                data: {}
            })
        })
})

router.post('/delete', function (req, res) {
    let bandId = req.body.id
    let userId = req.session.user.id
    bandOperations.getBandById(bandId)
        .then((band) => {
            if (band.userId == userId) {
                bandOperations.deleteBandById(bandId)
                    .then(() => {
                        res.status(200).json({
                            status: 200,
                            message: "deleted successfully.."
                        })
                    })
            } else {
                res.status(200).json({
                    status: 403,
                    message: "unauthorised to delete this.. ",
                    data: {}
                })
            }
        })

})

router.get('/edit/:id', function (req, res) {
    let bandId = req.params.id
    bandOperations.getBandById(bandId)
        .then((band) => {
            res.render('editband', {
                name: band.name,
                type: band.type,
                description: band.description,
                bandid: bandId
            })
        })
})

router.post('/edit', function (req, res) {
    let bandId = req.body.id
    let name = req.body.name
    let type = req.body.type
    let description = req.body.description
    let userId = req.session.user.id
    bandOperations.getBandById(bandId)
        .then((band) => {
            if (band.userId == userId) {
                bandOperations.updateBand(bandId, name, type, description)
                    .then(() => {
                        res.status(200).json({
                            status: 200,
                            message: "updated successfully.."
                        })
                    })
            } else {
                res.status(403).json({
                    status: 403,
                    message: "unauthorised to edit  this.. ",
                    data: {}
                })
            }
        })

})



module.exports = router