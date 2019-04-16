const Commune = require('../models/Commune');
const Ville = require('../models/Ville');
const Objet = require('../models/Objet');
const CommuneImage = require('../models/CommuneImage');
const CommuneAttribut = require('../models/CommuneAttribut');
const CommuneAttributType = require('../models/CommuneAttributType');
const CommuneAttributDetail = require('../models/CommuneAttributDetail');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.all = function(req, res) {
  let where = {};
  if(req.query.query)
    where['nom'] = { [Op.like]: '%' + req.query.query + '%' }
  if(req.query.ville)
    where['villes_id'] = req.query.ville
  if(req.query.code_postal)
    where['code_postal'] = req.query.code_postal
  Commune.findAll({
    where,
    include: [{
      model: Objet,
      as: "objets"
    }]
  }).then(communes => res.json(communes));
}

exports.single = function(req, res) {
  Commune.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Objet,
        as: "objets"
      },
      {
        model: Ville,
        as: "ville"
      },
      {
        model: CommuneImage,
        as: "images"
      },
      {
        model: CommuneAttributDetail,
        as: "details",
        include: [{
          model: CommuneAttribut,
          as: "communes_attribut",
          include: [{
            model: CommuneAttributType,
            "as": "communes_attributs_type"
          }]
        }]
      },
    ]
  }).then(commune => res.json(commune));
}

exports.delete = function(req, res) {
  Commune.destroy({
    where: {
      id: req.params.id,
    }
  }).then(() => {
    return res.sendStatus(200);
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.attributs = function(req, res) {
  CommuneAttribut.findAll({
    include: [{
      model: CommuneAttributType,
      as: "communes_attributs_type"
    }]
  }).then(attributs => res.json(attributs));
}

exports.add = function(req, res) {

}

exports.edit = function(req, res) {

}