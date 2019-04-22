const fs = require('fs');
const path = require('path');
const Commune = require('../models/Commune');
const Ville = require('../models/Ville');
const Objet = require('../models/Objet');
const ObjetImage = require('../models/ObjetImage');
const CommuneImage = require('../models/CommuneImage');
const CommuneAttribut = require('../models/CommuneAttribut');
const CommuneAttributType = require('../models/CommuneAttributType');
const CommuneAttributDetail = require('../models/CommuneAttributDetail');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Resize = require('../helpers/Resizer');

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
    attributes: [
      'id', 'nom', 'code_postal'
    ],
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
  Commune.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Objet,
        as: "objets",
        include: [{
          model: ObjetImage,
          as: "images"
        }]
      },
      {
        model: CommuneImage,
        as: "images"
      }
    ]
  }).then(async commune => {
    commune.images.map(async image => {
      await fs.unlink(path.join(__dirname, `../public/images/communes/${image.nom}`));
    });
    commune.objets.map(async objet => {
      objet.images.map(async image => {
        await fs.unlink(path.join(__dirname, `../public/images/objets/${image.nom}`));
      });
    })
    Commune.destroy({
      where: {
        id: commune.id,
      }
    }).then(() => {
      return res.sendStatus(200);
    }).catch(err => {
      return res.sendStatus(403);
    });
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


exports.deleteImage = function(req, res) {
  CommuneImage.findOne({
    where: {
      id: req.params.id
    }
  }).then(image => {
    CommuneImage.destroy({
      where: {
        id: image.id
      }
    }).then(() => {
      fs.unlinkSync(path.join(__dirname, `../public/images/communes/${image.nom}`));
      return res.sendStatus(200);
    }).catch(err => {
      return res.sendStatus(403);
    })
  });
}

exports.add = async function(req, res) {
  const { villes_id, nom,  code_postal, frontieres, details} = req.body;
  const images = req.files;
  const parsedDetails = JSON.parse(details);
  const imagePath = path.join(__dirname, '../public/images/communes');
  const fileUpload = new Resize(imagePath);

  Commune.create({
    villes_id, nom, code_postal, frontieres: JSON.parse(frontieres)
  }).then(commune => {
    parsedDetails.map(detail => {
      CommuneAttributDetail.create({
        valeur: detail.valeur,
        communes_id: commune.id,
        communes_attributs_id: detail.attribut_id
      })
    });
    images.map(async image => {
     const filename = await fileUpload.save(image.buffer);
      CommuneImage.create({
        nom: filename,
        communes_id: commune.id
      });
    });
    return res.sendStatus(200);
  }).catch(err => {
    return res.sendStatus(403);
  });
}

exports.edit = function(req, res) {
  const { villes_id, nom, frontieres, details} = req.body;
  const images = req.files;
  const parsedDetails = JSON.parse(details);
  const imagePath = path.join(__dirname, '../public/images/communes');
  const fileUpload = new Resize(imagePath);

  Commune.findOne({
    where: {
      id: req.params.id,
    },
    include: [
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
  }).then(commune => {
    commune.update({
      villes_id, nom, frontieres: JSON.parse(frontieres)
    }).then(commune => {
      CommuneAttributDetail.destroy({
        where: {
          communes_id: commune.id
        }
      }).then(() => {
        parsedDetails.map(detail => {
          CommuneAttributDetail.create({
            valeur: detail.valeur,
            communes_id: commune.id,
            communes_attributs_id: detail.attribut_id
          })
        });
      });
      images.map(async image => {
        const filename = await fileUpload.save(image.buffer);
        CommuneImage.create({
          nom: filename,
          communes_id: commune.id
        });
      });
      return res.sendStatus(200);
    }).catch(err => {
      return res.sendStatus(403);
    });
  }).catch(err => {
    return res.sendStatus(403);
  });
}