const CommuneAttributType = require('./CommuneAttributType');
const Sequelize = require('sequelize');
const db = require('../database');

const CommuneAttribut = db.define('communes_attribut', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: Sequelize.STRING
  },
  optionnel: {
    type: Sequelize.BOOLEAN
  }
}, {
  timestamps: false
});

CommuneAttribut.belongsTo(CommuneAttributType, {foreignKey: 'communes_attributs_types_id'});

module.exports = CommuneAttribut;