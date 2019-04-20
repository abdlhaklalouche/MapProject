const Category = require('../models/Category');
const Objet = require('../models/Objet');
const ObjetImage = require('../models/ObjetImage');
const CategoryAttribut = require('../models/CategoryAttribut');
const CategoryAttributType = require('../models/CategoryAttributType');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.all = function(req, res) {
  let where = {};
  if(req.query.query)
    where['nom'] = { [Op.like]: '%' + req.query.query + '%' }
  Category.findAll({
    where,
    include: [
      {
        model: Objet,
        as: "objets"
      },
      {
        model: CategoryAttribut,
        as: "attributs",
        include: [{
          model: CategoryAttributType,
          as: "categories_attributs_type"
        }]
      }
    ]
  }).then(categories => res.json(categories));
}

exports.single = function(req, res) {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Objet,
        as: "objets"
      },
      {
        model: CategoryAttribut,
        as: "attributs",
        include: [{
          model: CategoryAttributType,
          as: "categories_attributs_type"
        }]
      }
    ]
  }).then(category => res.json(category));
}

exports.delete = function(req, res) {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Objet,
      as: "objets",
      include: [{
        model: ObjetImage,
        as: "images"
      }]
    }]
  }).then(async category => {
    category.objets.map(objet => {
      objet.images.map(image => {
        await fs.unlink(path.join(__dirname, `../public/images/objets/${image.nom}`));
      });
    })
    Category.destroy({
      where: {
        id: category.id,
      },
    }).then(async () => {
      return res.sendStatus(200);
    }).catch(err => {
      return res.sendStatus(403);
    });
  }).catch(err => {
    return res.sendStatus(403);
  })
}

exports.types = function(req, res) {
  CategoryAttributType.findAll().then(types => res.json(types));
}

exports.add = function(req, res) {
  const { nom, attributs } = req.body;
  const parsedAttributs= JSON.parse(attributs);

  Category.create({
    nom
  }).then(category => {
    parsedAttributs.map(attribut => {
      CategoryAttribut.create({
        nom: attribut.nom,
        optionnel: attribut.optionnel,
        categories_attributs_types_id: attribut.type,
        categories_id: category.id,
      })
    });
    return res.sendStatus(200);
  }).catch(err => {
    return res.sendStatus(403);
  })
}

exports.edit = function(req, res) {
  const { nom, attributs } = req.body;
  const parsedAttributs= JSON.parse(attributs);

  Category.findOne({
    where: {
      id: req.params.id,
    }
  }).then(category => {
    category.update({
      nom
    }).then(category => {
      CategoryAttribut.destroy({
        where: {
          categories_id: category.id
        }
      }).then(() => {
        parsedAttributs.map(async attribut => {
          await CategoryAttribut.create({
            nom: attribut.nom,
            optionnel: attribut.optionnel,
            categories_attributs_types_id: attribut.type,
            categories_id: category.id,
          })
        });
        return res.sendStatus(200);
      }).catch(err => {
        return res.sendStatus(403);
      })
    }).catch(err => {
      return res.sendStatus(403);
    })
  }).catch(err => {
    return res.sendStatus(403);
  })
}