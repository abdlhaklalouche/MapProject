const Sequelize = require('sequelize');
const db = require('../database');

const CommuneImage = db.define('communes_image', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = CommuneImage;