const Sequelize = require('sequelize');
const db = require('../database');

const VilleAttributType = db.define('villes_attributs_type', {
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

module.exports = VilleAttributType;