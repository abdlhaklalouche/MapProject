const Sequelize = require('sequelize');
const db = require('../database');

const Objet = db.define('objet', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false
});

module.exports = Objet;