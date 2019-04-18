const CategoryAttribut = require('./CategoryAttribut');
const Sequelize = require('sequelize');
const db = require('../database');

const ObjetAttributDetail = db.define('objets_detail', {
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

ObjetAttributDetail.belongsTo(CategoryAttribut, {foreignKey: 'categories_attributs_id'});

module.exports = ObjetAttributDetail;