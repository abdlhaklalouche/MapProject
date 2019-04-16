const Category = require('../models/Category');
const Objet = require('../models/Objet');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.all = function(req, res) {
  let where = {};
  if(req.query.query)
    where['nom'] = { [Op.like]: '%' + req.query.query + '%' }
  Category.findAll({
    where,
    include: [{
      model: Objet,
      as: "objets"
    }]
  }).then(categories => res.json(categories));
}

exports.single = function(req, res) {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Objet,
      as: "objets"
    }]
  }).then(category => res.json(category));
}

exports.delete = function(req, res) {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  }).then(() => {
    return res.sendStatus(200);
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.add = function(req, res) {

}

exports.edit = function(req, res) {

}