const CategoryAttributType = require('./CategoryAttributType');
const Sequelize = require('sequelize');
const db = require('../database');

const CategoryAttribut = db.define('categories_attribut', {
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

CategoryAttribut.belongsTo(CategoryAttributType, {foreignKey: 'categories_attributs_types_id'});

module.exports = CategoryAttribut;