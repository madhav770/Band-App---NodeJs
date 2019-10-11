const con = require('../models');

const User = con.User;


module.exports = {
    emailExists: function (email) {
        return new Promise(function (resolve, reject) {
            User.findOne({
                    where: {
                        email: email
                    }
                })
                .then((user) => {
                    if (user) {
                        resolve(user)
                    } else {
                        reject()
                    }
                })
        })
    },
    authenticate: function (email, password) {
        return new Promise(function (resolve, reject) {
            User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user) {
                    if (user.password == password) {
                        resolve(user)
                    } else {
                        reject()
                    }
                } else {
                    reject();
                }
            })
        })
    },
    add: function (email, password, name, dob, company) {
        return User.create({
            name: name,
            email: email,
            password: password,
            dob: dob,
            company: company
        })
    }
}