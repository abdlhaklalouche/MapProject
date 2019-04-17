import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import Back from '../Back';
import axios from 'axios';

class AddCategory extends Component {
  state = {
    types: [],
    attributs: [],
    nom: '',
  };

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  componentDidMount() {
    axios.get('http://localhost:5000/categories/types').then(response => {
      this.setState({
        types: response.data,
      });
    });
  }

  submit = e => {
    const { nom, attributs } = this.state;
    let errors = [];
    if(nom.length === 0) errors.push(`Le nom est requis`)
    if(errors.length > 0) {
      alert(errors.join('\n\n'))
    } else {
      axios.get(`http://localhost:5000/categories?query=${nom}`).then(({ data }) => {
        if(data.length > 0) {
          alert('Le nom est incorrect');
        } else {
          const formData = new FormData();
          formData.append('nom', nom);
          formData.append('attributs', JSON.stringify(attributs));
          axios.post('http://localhost:5000/categories/add', formData).then(res => {
            return this.props.history.push(`/categories`);
          }).catch(err => {
            alert('Error de server');
          })
        }
      });
    }
  }

  handleChangeAttr = (e, index) => {
    switch(e.target.type) {
      case 'checkbox':
      [...this.state.attributs][index][e.target.name] = e.target.checked;
      break;
      default:
      [...this.state.attributs][index][e.target.name] = e.target.value;
      break;
    }
    this.setState({
      attributs: [...this.state.attributs]
    });
  }

  new_attr = () => {
    this.setState({
      attributs: [
        ...this.state.attributs,
        {
          nom: '',
          type: 2,
          optionnel: true
        }
      ] 
    })
  }

  delete_attr = index => {
    var attributs = [...this.state.attributs];
    if (index !== -1) {
      attributs.splice(index, 1);
      this.setState({attributs});
    }
  }

  render() {
    const { types, attributs } = this.state;
    return (
      <div>
        <Back title="Ajouter un nouveau category" />
        <Container className="after-top-bar">
          <Row className="py-4 justify-content-center">
            <Col sm="6">
              <div>
                <FormGroup>
                  <Label>Nom <span className="text-danger">*</span></Label>
                  <Input type="text" name="nom" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  {attributs.map((attribut, i) => (
                    <div key={i} className="mb-2">
                      <Row className="mb-0 align-items-center">
                        <Col>
                          <FormGroup>
                            <Input type="text" value={attribut.nom} name="nom" onChange={e => this.handleChangeAttr(e, attributs.indexOf(attribut))} placeholder="nom de l'attribut" />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Input type="select" name="type" value={attribut.type} onChange={e => this.handleChangeAttr(e, attributs.indexOf(attribut))}>
                              {types.map(type => (
                                <option key={type.id} value={type.id}>{type.nom}</option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label check>
                              <Input type="checkbox" name="optionnel" onChange={e => this.handleChangeAttr(e, attributs.indexOf(attribut))} checked={attribut.optionnel} />
                              Optionnel
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button size="sm" color="danger" onClick={e => this.delete_attr(attributs.indexOf(attribut))}>Supprimé</Button>
                    </div>
                  ))}
                  <div className="text-right">
                    <Button size="sm" color="primary" onClick={this.new_attr}>Ajouter attribut</Button>
                  </div>
                </FormGroup>
                <Button onClick={this.submit}>Ajouter</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddCategory;
