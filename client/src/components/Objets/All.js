import React, { Component } from 'react';
import {
  Container, Row, Col,
  Input,
  Spinner,
  Table,
  Form,
  FormGroup,
  Button
} from 'reactstrap';
import { Map , Marker, Popup, Circle, GeoJSON, FeatureGroup, TileLayer } from 'react-leaflet';
import Back from '../Back';
const axios = require('axios');
const queryString = require('query-string');

class Objets extends Component {
  state = {
    loading: true,
    objets: [],
    villes: [],
    communes: [],
    categories: [],
    ville: false,
    commune: false,
    category: false,
    query: '',
    maps: []
  };
  
  componentDidMount() {
    axios.get('http://localhost:5000/villes').then(response => {
      this.setState({villes: response.data})
    });
    axios.get('http://localhost:5000/categories').then(response => {
      this.setState({categories: response.data})
    });
    this.search();
  }

  parse = () => {
    return new Promise(resolve => {
      const parsed = queryString.parse(this.props.location.search);
      if(parsed.ville) {
        axios.get(`http://localhost:5000/villes/${parsed.ville}`).then(response => {
          if(response.data) {
            const ville = response.data;
            this.setState({
              ville: ville.id,
              communes: ville.communes
            });
          }
        });
      }
      this.setState({
        query: (parsed.query) ? parsed.query : '',
        ville: (parsed.ville) ? parsed.ville : '',
        commune: (parsed.commune) ? parsed.commune : '',
        category: (parsed.category) ? parsed.category : '',
      });
      resolve();
    });
  }

  search = () => {
    this.setState({loading: true})
    this.parse().then(() => {
      axios.get('http://localhost:5000/objets', {
        params: {
          query: this.state.query,
          ville: this.state.ville,
          commune: this.state.commune,
          category: this.state.category
        }
      }).then(response => {
        const objets = response.data;
        this.setState({
          objets,
          loading: false
        });
        objets.map(objet => {
          objet.details.map(detail => {
            // eslint-disable-next-line default-case
            switch(detail.categories_attribut.categories_attributs_type.nom) {
              case 'coordonnees':
                var markerCoordonnees = detail.valeur.toString().split(',');
                const markerLat = parseFloat(markerCoordonnees[0]);
                const markerLng = parseFloat(markerCoordonnees[1]);
                this.setState({
                  maps: [
                    ...this.state.maps,
                    (
                      <Marker position={[markerLat, markerLng]} key={detail.id}>
                        <Popup>{`${objet.nom} ${detail.categories_attribut.nom}`}</Popup>
                      </Marker>
                    )
                  ]
                });
              break;
              case 'cercle':
                var circleCoordonnees = detail.valeur.toString().split(',');
                const circleLat = parseFloat(circleCoordonnees[0]);
                const circleLng = parseFloat(circleCoordonnees[1]);
                const radius = parseInt(circleCoordonnees[2]);
                this.setState({
                  maps: [
                    ...this.state.maps,
                    (
                      <Circle 
                        key={detail.id}
                        center={[circleLat, circleLng]}
                        fillColor="blue" 
                        radius={radius}>
                        <Popup>{`${objet.nom} ${detail.categories_attribut.nom}`}</Popup>
                      </Circle>
                    )
                  ]
                });
              break;
              case 'polygone':
                var positions =  JSON.parse(detail.valeur);
                this.setState({
                  maps: [
                    ...this.state.maps,
                    (
                      <GeoJSON data={positions} key={detail.id}>
                        <Popup>{`${objet.nom} ${detail.categories_attribut.nom}`}</Popup>
                      </GeoJSON>
                    )
                  ]
                });
              break;
            }
          });
        });
        if(this.state.maps.length > 0) {
          this.refs.map.leafletElement.fitBounds(this.refs.featureGroup.leafletElement.getBounds(), {maxZoom: 13, padding: [20, 20]});
        }
      });
    });
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  handleChangeVille = e => {
    if(e.target.value.length === 0) {
      this.setState({ville: false});
    } else {
      axios.get(`http://localhost:5000/villes/${e.target.value}]`).then(response => {
        if(response.data) {
          const ville = response.data;
          this.setState({
            ville: ville.id,
            communes: ville.communes
          });
        }
      });
    }
  };

  render() {
    const { maps } = this.state;
    return (
      <div>
        <Back title="Les objet dans l'algerie" />
        <Container className="mt-2 after-top-bar">
          <div className="py-2">
            <Form action="/objets" method="get">            
              <FormGroup>
                <Input type="text" name="query"  defaultValue={this.state.query} onChange={this.handleChange} placeholder="Rechercher..."/>
              </FormGroup>
              <Row form>
                <Col>
                  <FormGroup>
                    <Input type="select" name="ville" value={this.state.ville} onChange={this.handleChangeVille}>
                      <option value="">Tout les villes..</option>
                      {this.state.villes.map((ville, key) => {
                        return (
                          <option value={ville.id} key={key}>{ville.nom}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                {this.state.ville ? (
                <Col>
                  <FormGroup>
                    <Input type="select" name="commune" value={this.state.commune} onChange={this.handleChange}>
                      <option value="">Tout les communes..</option>
                      {this.state.communes.map((commune, key) => {
                        return (
                          <option value={commune.id} key={key}>{commune.nom}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                ) : null}
                <Col>
                  <FormGroup>
                    <Input type="select" name="category" value={this.state.category} onChange={this.handleChange}>
                      <option value="">Tout les categories..</option>
                      {this.state.categories.map((category, key) => {
                        return (
                          <option value={category.id} key={key}>{category.nom}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Button block>Rechercher</Button>
                  </FormGroup>  
                </Col>
              </Row>
            </Form>
          </div>
          <div>
            <p>{this.state.objets.length} résultat trouvé</p>
          </div>
          <Row>
            <Col sm="8">  
              {this.state.loading ? (
                  <div className="py-2 text-center">
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                  </div>
                ) : this.state.objets.length > 0 ? (
                  <Table borderless striped>
                    <thead>
                      <tr>
                        <th>Numero</th>
                        <th>Nom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.objets.map((objet, key) => (
                        <tr key={key} className="cursor-pointer" onClick={() => this.props.history.push(`/objets/${objet.id}`)}>
                          <th scope="row">{objet.id}</th>
                          <td>{objet.nom}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : null
              }
            </Col>
            <Col sm="4">
              {maps.length > 0 ? (
                <Map ref="map" zoom={13} className="leaflet">
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                  <FeatureGroup ref="featureGroup">
                    {maps}
                  </FeatureGroup>
                </Map>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Objets;

