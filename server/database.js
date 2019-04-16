const Sequelize = require('sequelize');

module.exports = new Sequelize('MapProject', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql'
});