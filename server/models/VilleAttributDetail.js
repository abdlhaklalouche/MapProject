const VilleAttribut = require('./VilleAttribut');
const Sequelize = require('sequelize');
const db = require('../database');

const VilleAttributDetail = db.define('villes_attributs_details', {
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

VilleAttributDetail.belongsTo(VilleAttribut, {foreignKey: 'villes_attributs_id'});

module.exports = VilleAttributDetail;