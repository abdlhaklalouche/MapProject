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
    mounted: false,
    loading: true,
    found: false,
    commune: {},
    villes: [],
    attributs: [],
    ville: '',
    nom: '',
    code_postal: '',
    images: [],
    communeImages: [],
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
      axios.get(`http://localhost:5000/communes/${this.props.match.params.id}`).then((response) => {
        this.setState({
          loading: false,
        });
        if(response.data) {
          const commune = response.data;
          this.setState({
            found: true,
            commune,
            ville: commune.ville.id,
            nom: commune.nom,
            code_postal: commune.code_postal,
            communeImages: commune.images,
          });
          commune.details.map(detail => this.setState(() => ({
            [detail.communes_attribut.nom.toLowerCase()]: detail.communes_attribut.communes_attributs_type.nom === 'checkbox' ? true : detail.valeur
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
    const { commune, ville, nom, images, attributs } = this.state;
    let details = [], errors = [];
    if(ville.length === 0) errors.push(`La ville est requis`)
    if(nom.length === 0) errors.push(`Le nom est requis`)
    attributs.map(attribut => {
      if(attribut.optionnel !== true && this.state[attribut.nom.toLowerCase()].length === 0) {
        errors.push(`Le ${attribut.nom.toLowerCase()} est requis`)
      }
    });
    if(errors.length > 0) {
      alert(errors.join('\n\n'))
    } else {
      const formData = new FormData();
      formData.append('villes_id', ville);
      formData.append('nom', nom);
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
      axios.post(`http://localhost:5000/communes/edit/${commune.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return window.location.href = `/communes/${commune.id}`;
      }).catch(err => {
        alert('Error de server');
      })
    }
  }

  deleteImage = (image_id) => {
    axios.get(`http://localhost:5000/communes/images/delete/${image_id}`).then(response => {
      const communeImages = this.state.communeImages.filter(image => image.id !== image_id)
      this.setState({communeImages})
    });
  }

  render() {
    const { villes, commune, nom, code_postal, communeImages } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
      <div>
        <Back title={commune.nom} />
        <Container className="after-top-bar">
          <Row className="py-4 justify-content-center">
            <Col sm="6">
              <div>
                <FormGroup>
                  <Label>La ville <span className="text-danger">*</span></Label>
                  <Input type="select" name="ville" value={commune.ville.id} onChange={this.handleChange}>
                    <option value="">Choisser la ville..</option>
                    {villes.map(ville => (
                      <option key={ville.id} value={ville.id}>{ville.nom}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Nom <span className="text-danger">*</span></Label>
                  <Input type="text" name="nom" defaultValue={nom} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label>Code postal <span className="text-danger">*</span></Label>
                  <Input type="text" name="code_postal" defaultValue={code_postal} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="images">Images</Label>
                  <Input type="file" name="images" id="images" multiple onChange={this.handleImagesChange} />
                  <div className="mt-2">
                    {communeImages.map(image => (
                      <div className="d-inline-block m-1" key={image.id}>
                        <img src={`http://localhost:5000/images/communes/${image.nom}`} width="100" height="100" alt={image.nom} />
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

export default AddCommune;
