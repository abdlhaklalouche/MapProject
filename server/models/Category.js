const Sequelize = require('sequelize');
const db = require('../database');
const Objet = require('./Objet');

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

module.exports = Category;