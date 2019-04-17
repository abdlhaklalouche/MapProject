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
    mounted: false,
    loading: true,
    found: false,
    category: {},
    types: [],
    attributs: [],
    nom: '',
  };

  
  handleChange = e => this.setState({[e.target.name]: e.target.value});

  componentDidMount() {
    axios.get(`http://localhost:5000/categories/${this.props.match.params.id}`).then((response) => {
      this.setState({
        loading: false,
      });
      if(response.data) {
        const category = response.data;
        this.setState({
          found: true,
          category,
          nom: category.nom,
        });
        let attributs = [];
        category.attributs.map(attribut => {
          attributs.push({
            nom: attribut.nom,
            optionnel: attribut.optionnel,
            type: attribut.categories_attributs_types_id
          });
        });
        this.setState({attributs});
        axios.get('http://localhost:5000/categories/types').then(response => {
          this.setState({
            types: response.data,
          });
          this.setState({mounted: true})
        });
      }
    }); 
  }

  submit = e => {
    const { category, nom, attributs } = this.state;
    let errors = [];
    if(nom.length === 0) errors.push(`Le nom est requis`)
    if(errors.length > 0) {
      alert(errors.join('\n\n'))
    } else {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('attributs', JSON.stringify(attributs));
      axios.post(`http://localhost:5000/categories/edit/${category.id}`, formData).then(res => {
        return window.location.href = `/categories/${category.id}`;
      }).catch(err => {
        alert('Error de server');
      })
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
    const { category, nom, types, attributs } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
      <div>
        <Back title={category.nom} />
        <Container className="after-top-bar">
          <Row className="py-4 justify-content-center">
            <Col sm="6">
              <div>
                <FormGroup>
                  <Label>Nom <span className="text-danger">*</span></Label>
                  <Input type="text" name="nom" defaultValue={nom} onChange={this.handleChange} />
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
                <Button onClick={this.submit}>Modifier</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      )
    );
  }
}

export default AddCategory;
