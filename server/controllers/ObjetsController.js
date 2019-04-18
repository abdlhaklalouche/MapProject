const fs = require('fs');
const path = require('path');
const Objet = require('../models/Objet');
const ObjetImage = require('../models/ObjetImage');
const CategoryAttribut = require('../models/CategoryAttribut');
const ObjetAttributDetail = require('../models/ObjetAttributDetail');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Resize = require('../helpers/Resizer');

exports.all = function(req, res) {

}

exports.single = function(req, res) {
  
}

exports.delete = function(req, res) {
  
}

exports.deleteImage = function(req, res) {
  
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