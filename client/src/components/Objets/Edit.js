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

class EditObjet extends Component {
  state = {
    mounted: false,
    loading: true,
    found: false,
    objet: {},
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
    objetImages: [],
    images: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/objets/${this.props.match.params.id}`).then((response) => {
      if(response.data) {
        const objet = response.data;
        this.setState({
          loading: false,
          found: true,
          objet,
          nom: objet.nom,
          description: objet.description,
          objetImages: objet.images,
          category: objet.category.id,
          attributs: objet.category.attributs
        });
        axios.get('http://localhost:5000/villes').then(vres => {
          const villes = vres.data;
          this.setState({
            villes,
            ville: objet.commune.villes_id,
            communes: villes.find(ville => ville.id === objet.commune.villes_id).communes,
            commune: objet.commune.id
          });
        });
        axios.get('http://localhost:5000/categories').then(cres => {
          const categories = cres.data;
          this.setState({
            categories,
          });
        });
        objet.details.map(detail => this.setState({
          attributs_fields: {
            ...this.state.attributs_fields,
            [detail.categories_attribut.nom.toLowerCase()]: detail.categories_attribut.categories_attributs_type.nom === 'checkbox' ? true : detail.valeur
          }
        }));
        this.setState({mounted: true})
      }
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
    const { objet, commune, category, nom, description, images, attributs } = this.state;
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
      axios.post(`http://localhost:5000/objets/edit/${objet.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return window.location.href = `/objets/${objet.id}`;
      }).catch(err => {
        alert('Error de server');
      })
    }
  }

  deleteImage = (image_id) => {
    axios.get(`http://localhost:5000/objets/images/delete/${image_id}`).then(response => {
      const objetImages = this.state.objetImages.filter(image => image.id !== image_id)
      this.setState({objetImages})
    });
  }

  render() {
    const { villes, ville, communes, commune, categories, category, nom, description, attributs, objetImages } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
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
                  <Input type="text" name="nom" defaultValue={nom} onChange={e => this.handleChange(e)} />
                </FormGroup>
                <FormGroup>
                  <Label>Description <span className="text-danger">*</span></Label>
                  <Input type="textarea" name="description" defaultValue={description} onChange={e => this.handleChange(e)} />
                </FormGroup>
                <FormGroup>
                  <Label for="images">Images</Label>
                  <Input type="file" name="images" id="images" multiple onChange={this.handleImagesChange} />
                  <div className="mt-2">
                    {objetImages.map(image => (
                      <div className="d-inline-block m-1" key={image.id}>
                        <img src={`http://localhost:5000/images/objets/${image.nom}`} width="100" height="100" alt={image.nom} />
                        <Button size="sm" color="danger" block onClick={() => this.deleteImage(image.id)}>Supprimé</Button>
                      </div>
                    ))}
                  </div>
                </FormGroup>
                {this.state.mounted ? 
                  attributs.map((attribut, i) => (
                    <div key={i}>
                      <AttributField attribut={attribut} isEdit={true} defaultValue={this.state.attributs_fields[attribut.nom.toLowerCase()]} handleChange={e => this.handleChange(e, true)} />
                    </div>
                  ))
                  : null
                }
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

export default EditObjet;
