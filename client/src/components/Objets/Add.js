import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import Back from '../Back';
import AttributField from './AttributField';
import axios from 'axios';

class AddObjet extends Component {
  state = {
    categories: [],
    category: false,
    villes: [],
    ville: false,
    communes: [],
    commune: false,
    attributs: [],
    nom: '',
    description: '',
    attributs_fields: {},
    images: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/villes').then(vres => {
      const villes = vres.data;
      this.setState({
        villes,
        ville: villes[0].id,
        communes: villes[0].communes,
        commune: villes[0].communes[0].id,
      });
    });
    axios.get('http://localhost:5000/categories').then(cres => {
      const categories = cres.data;
      this.setState({
        categories,
        category: categories[0].id,
        attributs: categories[0].attributs,
        attributs_fields: {}
      });
      categories[0].attributs.map(attribut => {
        this.setState({
          attributs_fields: {
            ...this.state.attributs_fields,
            [attribut.nom.toLowerCase()]: ''
          }
        })
      });
    });
  }

  handleChange = (e, attr = false) => {
    switch(e.target.type) {
      case 'checkbox':
        if(attr)
          this.setState({
            attributs_fields: {
              ...this.state.attributs_fields,
              [e.target.name]: e.target.checked
            }
          });
        else 
          this.setState({[e.target.name]: e.target.checked});
      break;
      default:
        if(attr)
          this.setState({
            attributs_fields: {
              ...this.state.attributs_fields,
              [e.target.name]: e.target.value
            }
          });
        else
          this.setState({[e.target.name]: e.target.value});
      break;
    }
  };

  handleChangeCategory = e => {
    axios.get(`http://localhost:5000/categories/${e.target.value}`).then(response => {
      const category = response.data;
      this.setState({
        category: category.id,
        attributs: category.attributs,
        attributs_fields: {}
      })
      category.attributs.map(attribut => {
        this.setState({
          attributs_fields: {
            ...this.state.attributs_fields,
            [attribut.nom.toLowerCase()]: ''
          }
        })
      });
    });
  }

  handleChangeVille = e => {
    axios.get(`http://localhost:5000/villes/${e.target.value}`).then(response => {
      const ville = response.data;
      this.setState({
        ville: ville.id,
        communes: ville.communes,
        commune: ville.communes[0].id,
      })
    });
  }
  
  handleImagesChange = e => this.setState({images: e.target.files})

  submit = e => {
    const { commune, category, nom, description, images, attributs } = this.state;
    let details = [], errors = [];
    if(commune.length === 0) errors.push(`La commune est requis`)
    if(category.length === 0) errors.push(`La category est requis`)
    if(nom.length === 0) errors.push(`Le nom est requis`)
    if(description.length === 0) errors.push(`La description est requis`)
    attributs.map(attribut => {
      if(attribut.optionnel !== true && this.state.attributs_fields[attribut.nom.toLowerCase()].length === 0) {
        errors.push(`Le ${attribut.nom.toLowerCase()} est requis`)
      }
    });
    if(errors.length > 0) {
      alert(errors.join('\n\n'))
    } else {
      const formData = new FormData();
      formData.append('communes_id', commune);
      formData.append('categories_id', category);
      formData.append('nom', nom);
      formData.append('description', description);
      for( var i = 0; i < images.length; i++ ){
        let file = images[i];
        formData.append('images', file);
      }
      attributs.map(attribut => {
        if(this.state.attributs_fields[attribut.nom.toLowerCase()]) {
          return details.push({
            valeur: this.state.attributs_fields[attribut.nom.toLowerCase()],
            attribut_id: attribut.id
          });
        }
      });
      formData.append('details', JSON.stringify(details));
      axios.post('http://localhost:5000/objets/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return this.props.history.push(`/objets`);
      }).catch(err => {
        alert('Error de server');
      })
    }
  }

  render() {
    const { villes, ville, communes, commune, categories, category, attributs } = this.state;
    return (
      <div>
        <Back title="Ajouter un nouveau objet" />
        <Container className="after-top-bar">
          <Row className="py-4 justify-content-center">
            <Col sm="6">
              <div>
                <FormGroup>
                  <Label>La ville <span className="text-danger">*</span></Label>
                  <Input type="select" name="ville" value={ville} onChange={this.handleChangeVille}>
                    {villes.map(ville => (
                      <option key={ville.id} value={ville.id}>{ville.nom}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>La commune <span className="text-danger">*</span></Label>
                  <Input type="select" name="commune" value={commune} onChange={e => this.handleChange(e)}>
                    {communes.map(commune => (
                      <option key={commune.id} value={commune.id}>{commune.nom}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>La category <span className="text-danger">*</span></Label>
                  <Input type="select" name="category" value={category} onChange={this.handleChangeCategory}>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.nom}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Nom <span className="text-danger">*</span></Label>
                  <Input type="text" name="nom" onChange={e => this.handleChange(e)} />
                </FormGroup>
                <FormGroup>
                  <Label>Description <span className="text-danger">*</span></Label>
                  <Input type="textarea" name="description" onChange={e => this.handleChange(e)} />
                </FormGroup>
                <FormGroup>
                  <Label for="images">Images</Label>
                  <Input type="file" name="images" id="images" multiple onChange={this.handleImagesChange} />
                </FormGroup>
                {attributs.map((attribut, i) => (  
                  <div key={i}>
                    <AttributField attribut={attribut} handleChange={e => this.handleChange(e, true)} />
                  </div>
                ))}
                <Button onClick={this.submit}>Ajouter</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddObjet;
