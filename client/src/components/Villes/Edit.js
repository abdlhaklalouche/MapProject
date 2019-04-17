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
const axios = require('axios');


class Ville extends Component {
  state = {
    mounted: false,
    loading: true,
    found: false,
    ville: {},
    attributs: [],
    nom: '',
    superficie: '',
    population: '',
    villeImages: [],
    images: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/villes/attributs').then(res => {
      this.setState({
        attributs: res.data,
      });
      res.data.map(attribut => {
        this.setState({[attribut.nom.toLowerCase()]: ''})
      });
      axios.get(`http://localhost:5000/villes/${this.props.match.params.id}`).then((response) => {
        this.setState({
          loading: false,
        });
        if(response.data) {
          const ville = response.data;
          this.setState({
            found: true,
            ville: response.data,
            nom: ville.nom,
            superficie: ville.superficie,
            population: ville.population,
            villeImages: ville.images,
          });
          ville.details.map(detail => this.setState(() => ({
            [detail.villes_attribut.nom.toLowerCase()]: detail.villes_attribut.villes_attributs_type.nom === 'checkbox' ? true : detail.valeur
          })));
          this.setState({mounted: true})
        }
      });    
    });
  }

  handleChange = e => {
    switch(e.target.type) {
      case 'checkbox':
        this.setState({[e.target.name]: e.target.checked});
      break;
      default:
        this.setState({[e.target.name]: e.target.value});
      break;
    }
  };
  
  handleImagesChange = e => this.setState({images: e.target.files})

  submit = e => {
    const { ville, nom,  superficie, population, images, attributs } = this.state;
    let details = [], errors = [];
    if(nom.length === 0) errors.push(`Le nom est requis`)
    if(superficie.length === 0) errors.push(`La superficie est requis`)
    if(population.length === 0) errors.push(`La population est requis`)
    attributs.map(attribut => {
      if(attribut.optionnel !== true && this.state[attribut.nom.toLowerCase()].length === 0) {
        errors.push(`Le ${attribut.nom.toLowerCase()} est requis`)
      }
    });
    if(errors.length > 0) {
      alert(errors.join('\n\n'))
    } else {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('superficie', superficie);
      formData.append('population', population);
      for( var i = 0; i < images.length; i++ ){
        let file = images[i];
        formData.append('images', file);
      }
      attributs.map(attribut => {
        if(this.state[attribut.nom.toLowerCase()]) {
          return details.push({
            valeur: this.state[attribut.nom.toLowerCase()],
            attribut_id: attribut.id
          });
        }
      });
      formData.append('details', JSON.stringify(details));
      axios.post(`http://localhost:5000/villes/edit/${ville.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return window.location.href = `/villes/${ville.id}`;
      }).catch(err => {
        alert('Error de server');
      })
    }
  }

  deleteImage = (image_id) => {
    axios.get(`http://localhost:5000/villes/images/delete/${image_id}`).then(response => {
      const villeImages = this.state.villeImages.filter(image => image.id !== image_id)
      this.setState({villeImages})
    });
  }
  
  render() {
    const { ville, nom, superficie, population, villeImages } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
        <div>
          <Back title={`${ville.nom}`} />
          <Container className="after-top-bar">
            <Row className="py-4 justify-content-center">
              <Col sm="6">
                <div>
                  <FormGroup>
                    <Label>Nom <span className="text-danger">*</span></Label>
                    <Input type="text" name="nom" defaultValue={nom} onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Superficie <span className="text-danger">*</span></Label>
                    <Input type="text" name="superficie" defaultValue={superficie} onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label>Population <span className="text-danger">*</span></Label>
                    <Input type="text" name="population" defaultValue={population} onChange={this.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="images">Images</Label>
                    <Input type="file" name="images" id="images" multiple onChange={this.handleImagesChange} />
                    <div className="mt-2">
                      {villeImages.map(image => (
                        <div className="d-inline-block m-1" key={image.id}>
                          <img src={`http://localhost:5000/images/villes/${image.nom}`} width="100" height="100" alt={image.nom} />
                          <Button size="sm" color="danger" block onClick={() => this.deleteImage(image.id)}>Supprimé</Button>
                        </div>
                      ))}
                    </div>
                  </FormGroup>
                  {this.state.mounted ? 
                    this.state.attributs.map((attribut, i) => (
                      <div key={i}>
                        <AttributField attribut={attribut} isEdit={true} defaultValue={this.state[attribut.nom.toLowerCase()]} handleChange={this.handleChange} />
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

export default Ville;

