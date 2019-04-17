const Sequelize = require('sequelize');
const db = require('../database');
const Objet = require('./Objet');
const CategoryAttribut = require('../models/CategoryAttribut');

const Category = db.define('category', {
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

Category.hasMany(Objet, {as: 'objets', foreignKey: 'categories_id'});
Objet.belongsTo(Category, {foreignKey: 'categories_id'});

Category.hasMany(CategoryAttribut, {as: 'attributs', foreignKey: 'categories_id'});
CategoryAttribut.belongsTo(Category, {foreignKey: 'categories_id'});

module.exports = Category;