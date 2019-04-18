const Sequelize = require('sequelize');
const db = require('../database');

const ObjetImage = db.define('objets_image', {
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

module.exports = ObjetImage;