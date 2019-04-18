const fs = require('fs');
const path = require('path');
const Objet = require('../models/Objet');
const ObjetImage = require('../models/ObjetImage');
const CategoryAttribut = require('../models/CategoryAttribut');
const CategoryAttributType = require('../models/CategoryAttributType');
const ObjetAttributDetail = require('../models/ObjetAttributDetail');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Resize = require('../helpers/Resizer');

exports.all = function(req, res) {

}

exports.single = function(req, res) {
  Objet.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: ObjetImage,
        as: "images"
      },
      {
        model: ObjetAttributDetail,
        as: "details",
        include: [{
          model: CategoryAttribut,
          as: "categories_attribut",
          include: [{
            model: CategoryAttributType,
            "as": "categories_attributs_type"
          }]
        }]
      },
    ]
  }).then(objet => res.json(objet));
}

exports.delete = function(req, res) {
  Objet.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: ObjetImage,
        as: "images"
      },
    ]
  }).then(objet => {
    objet.images.map(image => {
      fs.unlink(path.join(__dirname, `../public/images/objets/${image.nom}`));
    });
    Objet.destroy({
      where: {
        id: objet.id,
      }
    }).then(() => {
      return res.sendStatus(200);
    });
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.deleteImage = function(req, res) {
  ObjetImage.findOne({
    where: {
      id: req.params.id
    }
  }).then(image => {
    ObjetImage.destroy({
      where: {
        id: image.id
      }
    }).then(() => {
      fs.unlinkSync(path.join(__dirname, `../public/images/objets/${image.nom}`));
      return res.sendStatus(200);
    }).catch(err => {
      return res.sendStatus(403);
    })
  });
}

exports.add = async function(req, res) {
  const { communes_id, categories_id, nom, description, details} = req.body;
  const images = req.files;
  const parsedDetails = JSON.parse(details);
  const imagePath = path.join(__dirname, '../public/images/objets');
  const fileUpload = new Resize(imagePath);

  Objet.create({
    categories_id, communes_id, nom,  description,
  }).then(objet => {
    parsedDetails.map(detail => {
      ObjetAttributDetail.create({
        valeur: detail.valeur,
        objets_id: objet.id,
        categories_attributs_id: detail.attribut_id
      })
    });
    images.map(async image => {
     const filename = await fileUpload.save(image.buffer);
      ObjetImage.create({
        nom: filename,
        objets_id: objet.id
      });
    });
    return res.sendStatus(200);
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.edit = function(req, res) {
  
}