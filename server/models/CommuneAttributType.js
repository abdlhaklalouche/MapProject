const Sequelize = require('sequelize');
const db = require('../database');

const CommuneAttributType = db.define('communes_attributs_type', {
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

module.exports = CommuneAttributType;