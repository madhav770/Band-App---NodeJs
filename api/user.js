const router = require('express').Router()

const useroperations = require('../db/operations/user')

router.post('/signup', function (req, res) {
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let dob = req.body.dob
    let company = req.body.company
    useroperations.emailExists(email)
        .then(() => {
            res.status(202).json({
                status: 202,
                message: "email already exists..",
                data: {}
            })
        }).catch(() => {
            useroperations.add(email, password, name, dob, company)
                .then((user) => {
                    let user1 = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        dob: user.dob,
                        company: user.company
                    }
                    req.session.user = user1;
                    res.status(201).json({
                        status: 201,
                        message: "user signup successfull..",
                        data: user1
                    })
                })
        })

})



router.post('/login', function (req, res) {
    let email = req.body.email
    let password = req.body.password
    useroperations.authenticate(email, password)
        .then((user) => {
            let user1 = {
                id: user.id,
                name: user.name,
                email: user.email,
                dob: user.dob,
                company: user.company
            }
            req.session.user = user1
            res.status(200).json({
                status: 200,
                message: "login successfull..",
                data: user1
            })

        }).catch(() => {
            res.status(202).json({
                status: 202,
                message: "invalid credentials..",
                data: {}
            })
        })
})

router.get('/dashboard', function (req, res) {
    useroperations.emailExists(req.session.user.email)
        .then((user) => {
            let user1 = {
                name: user.name,
                email: user.email,
                dob: user.dob,
                company: user.company
            }
            res.render('dashboard', user1)

        })
})

router.get('/logout', function (req, res) {
    req.session.user = null;
    res.redirect('/')
})

module.exports = router