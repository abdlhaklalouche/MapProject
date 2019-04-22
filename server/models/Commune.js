const Sequelize = require('sequelize');
const db = require('../database');
const Objet = require('./Objet');
const CommuneImage = require('./CommuneImage');
const CommuneAttributDetail = require('./CommuneAttributDetail');

const Commune = db.define('commune', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: Sequelize.STRING
  },
  code_postal: {
    type: Sequelize.INTEGER
  },
  frontieres: {
    type: Sequelize.JSON
  }
}, {
  timestamps: false
});

Commune.hasMany(Objet, {as: 'objets', foreignKey: 'communes_id'});
Objet.belongsTo(Commune, {foreignKey: 'communes_id'});

Commune.hasMany(CommuneImage, {as: 'images', foreignKey: 'communes_id'});
CommuneImage.belongsTo(Commune, {foreignKey: 'communes_id'});

Commune.hasMany(CommuneAttributDetail, {as: 'details', foreignKey: 'communes_id'});
CommuneAttributDetail.belongsTo(Commune, {foreignKey: 'communes_id'});

module.exports = Commune;