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

class AddVille extends Component {
  state = {
    attributs: [],
    numero: '',
    nom: '',
    superficie: '',
    population: '',
    images: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/villes/attributs').then(response => {
      this.setState({
        attributs: response.data,
      });
      response.data.map(attribut => {
        this.setState({[attribut.nom.toLowerCase()]: ''})
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
    const { numero, nom,  superficie, population, images, attributs } = this.state;
    let details = [], errors = [];
    if(numero.length === 0) errors.push(`Le numero est requis`)
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
      axios.get(`http://localhost:5000/villes?numero=${numero}`).then(({ data }) => {
        if(data.length > 0) {
          alert('Le numero est incorrect');
        } else {
          const formData = new FormData();
          formData.append('numero', numero);
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
          axios.post('http://localhost:5000/villes/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            return this.props.history.push(`/villes`);
          }).catch(err => {
            alert('Error de server');
          })
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Back title="Ajouter un nouveau ville" />
        <Container className="after-top-bar">
          <Row className="py-4 justify-content-center">
            <Col sm="6">
              <div>
                <FormGroup>
                  <Label for="numero">Numero <span className="text-danger">*</span></Label>
                  <Input type="text" name="numero" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>Nom <span className="text-danger">*</span></Label>
                  <Input type="text" name="nom" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>Superficie <span className="text-danger">*</span></Label>
                  <Input type="text" name="superficie" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>Population <span className="text-danger">*</span></Label>
                  <Input type="text" name="population" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="images">Images</Label>
                  <Input type="file" name="images" id="images" multiple onChange={this.handleImagesChange} />
                </FormGroup>
                {this.state.attributs.map((attribut, i) => (  
                  <div key={i}>
                    <AttributField attribut={attribut} handleChange={this.handleChange} />
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

export default AddVille;
