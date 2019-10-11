const Sequelize = require('sequelize');

const config = require('./dbConfig');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    min: 0,
    max: 5
  }
});


module.exports = sequelize;
