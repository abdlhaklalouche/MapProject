const Sequelize = require('sequelize');
const db = require('../database');
const Commune = require('./Commune');
const VilleImage = require('./VilleImage');
const VilleAttributDetail = require('./VilleAttributDetail');

const Ville = db.define('ville', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: {
    type: Sequelize.INTEGER
  },
  nom: {
    type: Sequelize.STRING
  },
  superficie: {
    type: Sequelize.INTEGER
  },
  population: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

Ville.hasMany(Commune, {as: 'communes', foreignKey: 'villes_id'});
Commune.belongsTo(Ville, {foreignKey: 'villes_id'});

Ville.hasMany(VilleImage, {as: 'images', foreignKey: 'villes_id'});
VilleImage.belongsTo(Ville, {foreignKey: 'villes_id'});

Ville.hasMany(VilleAttributDetail, {as: 'details', foreignKey: 'villes_id'});
VilleAttributDetail.belongsTo(Ville, {foreignKey: 'villes_id'});

module.exports = Ville;