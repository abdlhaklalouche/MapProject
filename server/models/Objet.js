const Sequelize = require('sequelize');
const db = require('../database');
const ObjetImage = require('./ObjetImage');
const ObjetAttributDetail = require('./ObjetAttributDetail');

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

Objet.hasMany(ObjetImage, {as: 'images', foreignKey: 'objets_id'});
ObjetImage.belongsTo(Objet, {foreignKey: 'objets_id'});

Objet.hasMany(ObjetAttributDetail, {as: 'details', foreignKey: 'objets_id'});
ObjetAttributDetail.belongsTo(Objet, {foreignKey: 'objets_id'});

module.exports = Objet;