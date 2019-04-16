const VilleAttributType = require('./VilleAttributType');
const Sequelize = require('sequelize');
const db = require('../database');

const VilleAttribut = db.define('villes_attribut', {
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

VilleAttribut.belongsTo(VilleAttributType, {foreignKey: 'villes_attributs_types_id'});

module.exports = VilleAttribut;