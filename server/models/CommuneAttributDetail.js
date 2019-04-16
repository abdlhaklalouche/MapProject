const CommuneAttribut = require('./CommuneAttribut');
const Sequelize = require('sequelize');
const db = require('../database');

const CommuneAttributDetail = db.define('communes_attributs_details', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valeur: {
    type: Sequelize.STRING
  },
}, {
  timestamps: false
});

CommuneAttributDetail.belongsTo(CommuneAttribut, {foreignKey: 'communes_attributs_id'});

module.exports = CommuneAttributDetail;