const fs = require('fs');
const path = require('path');
const Objet = require('../models/Objet');
const Ville = require('../models/Ville');
const Commune = require('../models/Commune');
const Category = require('../models/Category');
const ObjetImage = require('../models/ObjetImage');
const CategoryAttribut = require('../models/CategoryAttribut');
const CategoryAttributType = require('../models/CategoryAttributType');
const ObjetAttributDetail = require('../models/ObjetAttributDetail');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Resize = require('../helpers/Resizer');

exports.all = async function(req, res) {
  let where = {};
  if(req.query.query)
    where['nom'] = { [Op.like]: '%' + req.query.query + '%' }
  if(req.query.category)
    where['categories_id'] = req.query.category
  if(req.query.commune)
    where['communes_id'] = req.query.commune
  else {
    if(req.query.ville) {
      const ville = await Ville.findOne({
        where: {
          id: req.query.ville
        },
        include: [{
          model: Commune,
          as: "communes"
        }]
      });
      if(ville) {
        let commune_ids = [];
        ville.communes.map(commune => {
          commune_ids.push(commune.id);
        });
        where['communes_id'] = { [Op.in]: [...commune_ids] }
      }
    }
  }
  Objet.findAll({where}).then(objets => res.json(objets));
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
        model: Commune,
        as: "commune"
      },
      {
        model: Category,
        as: "category",
        include: [{
          model: CategoryAttribut,
          as: "attributs",
          include: [{
            model: CategoryAttributType,
            as: "categories_attributs_type"
          }]
        }]
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
  const { communes_id, categories_id, nom, description, details} = req.body;
  const images = req.files;
  const parsedDetails = JSON.parse(details);
  const imagePath = path.join(__dirname, '../public/images/objets');
  const fileUpload = new Resize(imagePath);

  Objet.findOne({
    where: {
      id: req.params.id
    },
  }).then(objet => {
    objet.update({
      communes_id, categories_id, nom, description
    }).then(objet => {
      ObjetAttributDetail.destroy({
        where: {
          objets_id: objet.id
        }
      }).then(() => {
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
    }).catch(err => {
      return res.sendStatus(403);
    });
  }).catch(err => {
    return res.sendStatus(403);
  });
}