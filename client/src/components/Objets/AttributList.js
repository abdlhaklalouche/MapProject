import React, { Component } from 'react'
import { ListGroupItem } from 'reactstrap';

export default class AttributList extends Component {
  render() {
    const { detail } = this.props;
    let output = '';
    switch(detail.categories_attribut.categories_attributs_type.nom) {
      case 'string':
      case 'text':
        output = detail.valeur;
      break;
      case 'checkbox':
        output = 'Oui';
      break;
      default:
      break;
    }
    return ['coordonnees', 'cercle', 'polygone'].includes(detail.categories_attribut.categories_attributs_type.nom) ? null : (
      <ListGroupItem>
        <dl className="row my-0">
          <dt className="col-sm-5">{detail.categories_attribut.nom}</dt>
          <dd className="col-sm-7">{output}</dd>
        </dl>
      </ListGroupItem>
    );
  }
}
