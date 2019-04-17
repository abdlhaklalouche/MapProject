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

class AddCommune extends Component {
  state = {
    villes: [],
    attributs: [],
    ville: '',
    nom: '',
    code_postal: '',
    images: [],
  };

  componentDidMount() {
    axios.get('http://localhost:5000/villes').then(response => {
      this.setState({
        villes: response.data,
      });
    });
    axios.get('http://localhost:5000/communes/attributs').then(response => {
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
    const { ville, nom,  code_postal, images, attributs } = this.state;
    let details = [], errors = [];
    if(ville.length === 0) errors.push(`La ville est requis`)
    if(nom.length === 0) errors.push(`Le nom est requis`)
    if(code_postal.length === 0) errors.push(`La code postal est requis`)
    attributs.map(attribut => {
      if(attribut.optionnel !== true && this.state[attribut.nom.toLowerCase()].length === 0) {
        errors.push(`Le ${attribut.nom.toLowerCase()} est requis`)
      }
    });
    if(errors.length > 0) {
      alert(errors.join('\n\n'))
    } else {
      axios.get(`http://localhost:5000/communes?code_postal=${code_postal}`).then(({ data }) => {
        if(data.length > 0) {
          alert('Le code postal est incorrect');
        } else {
          const formData = new FormData();
          formData.append('villes_id', ville);
          formData.append('nom', nom);
          formData.append('code_postal', code_postal);
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
          axios.post('http://localhost:5000/communes/add', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            return this.props.history.push(`/communes/?ville=${ville}`);
          }).catch(err => {
            alert('Error de server');
          })
        }
      });
    }
  }

  render() {
    const { villes } = this.state;
    return (
      <div>
        <Back title="Ajouter un nouveau ville" />
        <Container className="after-top-bar">
          <Row className="py-4 justify-content-center">
            <Col sm="6">
              <div>
                <FormGroup>
                  <Label>La ville <span className="text-danger">*</span></Label>
                  <Input type="select" name="ville" onChange={this.handleChange}>
                    <option value="">Choisser la ville..</option>
                    {villes.map(ville => (
                      <option key={ville.id} value={ville.id}>{ville.nom}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Nom <span className="text-danger">*</span></Label>
                  <Input type="text" name="nom" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>Code postal <span className="text-danger">*</span></Label>
                  <Input type="text" name="code_postal" onChange={this.handleChange} />
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

export default AddCommune;
