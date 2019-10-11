const Sequelize = require('sequelize');

const conn = require('./connection')

const User = conn.define('user', {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  company: {
    type: Sequelize.STRING,
  }
});

const Band = conn.define('band', {

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Band.belongsTo(User);
User.hasMany(Band);

const seed = () => {
  return Promise.all([
      User.create({
        name: 'Ram',
        email: 'ram@gmail.com',
        password: 'ram123',
        dob: Date.now(),
        company: "Nagarro"
      }),
      User.create({
        name: 'Shyam',
        email: 'shyam@gmail.com',
        password: 'shyam123',
        dob: '2019-10-08',
        company: "tcs"
      }),
      Band.create({
        name: 'One Direction',
        type: 'Boy Band',
        description: 'very popular band..',
        dob: Date.now()
      }),
      Band.create({
        name: 'Maroon 5 ',
        type: 'Pop',
        description: 'I m sugar..',
        dob: Date.now()
      }),
      Band.create({
        name: 'Coldplay',
        type: 'British Rock',
        description: 'paradise...',
        dob: Date.now()
      }),
      Band.create({
        name: 'Imagine Dragons',
        type: 'Rock',
        description: 'believer..',
        dob: Date.now()
      }),
    ]).then(([ram, shyam, od, m, c, i]) => {
      return Promise.all([
        od.setUser(ram),
        m.setUser(ram),
        c.setUser(shyam),
        i.setUser(shyam)
      ]);

    })
    .catch(error => console.log(error));
};


conn.sync({
    force: true
  })
  .then(() => seed())


module.exports = {
  User,
  Band
}