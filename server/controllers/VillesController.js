const fs = require('fs');
const path = require('path');
const Ville = require('../models/Ville');
const Commune = require('../models/Commune');
const VilleImage = require('../models/VilleImage');
const Objet = require('../models/Objet');
const VilleAttribut = require('../models/VilleAttribut');
const VilleAttributType = require('../models/VilleAttributType');
const VilleAttributDetail = require('../models/VilleAttributDetail');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Resize = require('../helpers/Resizer');

exports.all = function(req, res) {
  let where = {};
  if(req.query.query)
    where['nom'] = { [Op.like]: '%' + req.query.query + '%' }
  if(req.query.numero)
    where['numero'] = req.query.numero
  Ville.findAll({
    where,
    include: [{
      model: Commune,
      as: "communes",
      include: [{
        model: Objet,
        as: "objets"
      }]
    }]
  }).then(villes => res.json(villes));
}

exports.single = function(req, res) {
  Ville.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Commune,
        as: "communes",
        include: [{
          model: Objet,
          as: "objets"
        }]
      },
      {
        model: VilleImage,
        as: "images"
      },
      {
        model: VilleAttributDetail,
        as: "details",
        include: [{
          model: VilleAttribut,
          as: "villes_attribut",
          include: [{
            model: VilleAttributType,
            "as": "villes_attributs_type"
          }]
        }]
      },
    ]
  }).then(ville => res.json(ville));
}

exports.attributs = function(req, res) {
  VilleAttribut.findAll({
    include: [{
      model: VilleAttributType,
      as: "villes_attributs_type"
    }]
  }).then(attributs => res.json(attributs));
}

exports.delete = function(req, res) {
  Ville.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: VilleImage,
        as: "images"
      },
    ]
  }).then(ville => {
    ville.images.map(image => {
      fs.unlink(path.join(__dirname, `../public/images/villes/${image.nom}`));
    });
    Ville.destroy({
      where: {
        id: ville.id,
      }
    }).then(() => {
      return res.sendStatus(200);
    });
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.deleteImage = function(req, res) {
  VilleImage.findOne({
    where: {
      id: req.params.id
    }
  }).then(image => {
    VilleImage.destroy({
      where: {
        id: image.id
      }
    }).then(() => {
      fs.unlinkSync(path.join(__dirname, `../public/images/villes/${image.nom}`));
      return res.sendStatus(200);
    }).catch(err => {
      return res.sendStatus(403);
    })
  });
}

exports.add = async function(req, res) {
  const { numero, nom,  superficie, population, details} = req.body;
  const images = req.files;
  const parsedDetails = JSON.parse(details);
  const imagePath = path.join(__dirname, '../public/images/villes');
  const fileUpload = new Resize(imagePath);

  Ville.create({
    numero, nom,  superficie, population
  }).then(ville => {
    parsedDetails.map(detail => {
      VilleAttributDetail.create({
        valeur: detail.valeur,
        villes_id: ville.id,
        villes_attributs_id: detail.attribut_id
      })
    });
    images.map(async image => {
     const filename = await fileUpload.save(image.buffer);
      VilleImage.create({
        nom: filename,
        villes_id: ville.id
      });
    });
    return res.sendStatus(200);
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.edit = function(req, res) {
  const { nom,  superficie, population, details} = req.body;
  const images = req.files;
  const parsedDetails = JSON.parse(details);
  const imagePath = path.join(__dirname, '../public/images/villes');
  const fileUpload = new Resize(imagePath);

  Ville.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: VilleAttributDetail,
        as: "details",
        include: [{
          model: VilleAttribut,
          as: "villes_attribut",
          include: [{
            model: VilleAttributType,
            "as": "villes_attributs_type"
          }]
        }]
      },
    ]
  }).then(ville => {
    ville.update({
      nom, superficie, population
    }).then(ville => {
      VilleAttributDetail.destroy({
        where: {
          villes_id: ville.id
        }
      }).then(() => {
        parsedDetails.map(detail => {
          VilleAttributDetail.create({
            valeur: detail.valeur,
            villes_id: ville.id,
            villes_attributs_id: detail.attribut_id
          })
        });
      });
      images.map(async image => {
        const filename = await fileUpload.save(image.buffer);
        VilleImage.create({
          nom: filename,
          villes_id: ville.id
        });
      });
      return res.sendStatus(200);
    })
  }).catch(err => {
    return res.sendStatus(403);
  });
}