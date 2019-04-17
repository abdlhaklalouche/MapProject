import React, { Component } from 'react'
import { FormGroup, Label, Input } from 'reactstrap';
export default class AttributField extends Component {
  render() {
    const { attribut } = this.props;
    const defaultValue = this.props.defaultValue ? this.props.defaultValue : '';
    let input = '';
    switch(attribut.villes_attributs_type.nom) {
      case 'string':
        input = (
          <FormGroup>
            <Label for={`${attribut.nom.toLowerCase()}`}>{attribut.nom} {!attribut.optionnel ? (<span className="text-danger">*</span>) : ''}</Label>
            <Input type="text" defaultValue={defaultValue} name={`${attribut.nom.toLowerCase()}`} onChange={this.props.handleChange} />
          </FormGroup>
        );
      break;
      case 'checkbox':
        input = (
          <FormGroup className="my-2" check>
            <Label check>
              <Input type="checkbox" name={`${attribut.nom.toLowerCase()}`} onChange={this.props.handleChange} defaultChecked={defaultValue} />{' '}
              {attribut.nom}
            </Label>
          </FormGroup>
        )
      break;
      case 'text':
        input = (
          <FormGroup>
            <Label for={`${attribut.nom.toLowerCase()}`}>{attribut.nom} {!attribut.optionnel ? (<span className="text-danger">*</span>) : ''}</Label>
            {this.props.isEdit ? (
                <Input type="textarea" name={`${attribut.nom.toLowerCase()}`} onChange={this.props.handleChange} value={defaultValue} />
              ) : (
                <Input type="textarea" name={`${attribut.nom.toLowerCase()}`} onChange={this.props.handleChange} defaultValue={defaultValue} />
            )}
          </FormGroup>
        );
      break;
      default:
      break;
    }
    return input;
  }
}
