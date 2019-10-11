const models = require('../models')

const Band = models.Band
const User = models.User


module.exports = {
    getAll: function () {
        return Band.findAll()
    },
    addBand: function (email, name, type, desc) {
        return Promise.all([
            Band.create({
                name: name,
                type: type,
                description: desc
            }),
            User.findOne({
                where: {
                    email: email
                }
            })
        ]).then(([band, user]) => {
            band.setUser(user)
            return band
        })
    },
    getUserBands: function (email) {
        return new Promise(function (resolve, reject) {
            User.findOne({
                where: {
                    email: email
                }
            }).then((user) => {
                user.getBands()
                    .then((bands) => {
                        if (bands) {
                            resolve(bands)
                        } else {
                            reject();
                        }

                    })
            })
        })
    },
    getBandById: function (id) {
        return new Promise(function (resolve, reject) {
            Band.findByPk(id)
                .then((band) => {
                    resolve(band)
                })
        })
    },
    deleteBandById: function (id) {
        return new Promise(function (resolve, reject) {
            Band.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                resolve()
            })
        })
    },
    updateBand: function (id, name, type, description) {
        return new Promise(function (resolve, reject) {
            Band.update({
                name: name,
                type: type,
                description: description
            }, {
                where: {
                    id: id
                }
            }).then(() => {
                resolve()
            })
        })
    }

}