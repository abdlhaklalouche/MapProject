import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Map , Marker, Popup, Circle, GeoJSON, FeatureGroup, TileLayer } from 'react-leaflet';
import Back from '../Back';
import AttributList from './AttributList';
const axios = require('axios');

class Objet extends Component {
  state = {
    loading: true,
    found: false,
    objet: {},
    maps: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/objets/${this.props.match.params.id}`).then((response) => {
      this.setState({
        loading: false,
      });
      if(response.data) {
        const objet = response.data;
        this.setState({
          found: true,
          objet,
        });
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
                      <Popup>{detail.categories_attribut.nom}</Popup>
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
                      <Popup>{detail.categories_attribut.nom}</Popup>
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
                      <Popup>{detail.categories_attribut.nom}</Popup>
                    </GeoJSON>
                  )
                ]
              });
            break;
          }
        });
      }
      if(this.state.maps.length > 0) {
        this.refs.map.leafletElement.fitBounds(this.refs.featureGroup.leafletElement.getBounds(), {maxZoom: 13, padding: [20, 20]});
      }
    });
  }

  delete = (objet_id) => {
    if(window.confirm('Etes-vous sûr?')) {
      axios.get(`http://localhost:5000/objets/delete/${objet_id}`).then((response) => {
        return this.props.history.push(`/objets`);
      });
    }
  }
  
  render() {
    const { objet, maps } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
        <div>
          <Back title={`${objet.nom}`} />
          <Container fluid className="mt-2 after-top-bar">
            <Row>
              <Col sm="7">
                <div className="py-3">
                  <Link to={`/objets/edit/${objet.id}`}>
                    <Button color="secondary" size="sm" className="mr-1">Modifier</Button>
                  </Link>
                  <Button color="danger" size="sm" className="ml-1" onClick={() => this.delete(objet.id)}>Supprimé</Button>
                </div>
                <ListGroup flush>
                  <ListGroupItem tag={Link} to={`/communes/${objet.commune.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-5">La commune</dt>
                      <dd className="col-sm-7">{objet.commune.nom}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem tag={Link} to={`/categories/${objet.category.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-5">La category</dt>
                      <dd className="col-sm-7">{objet.category.nom}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-5">Description</dt>
                      <dd className="col-sm-7">{objet.description}</dd>
                    </dl>
                  </ListGroupItem>
                  {objet.details.map((detail, i) => 
                    (
                      <div key={i}>
                        <AttributList detail={detail} />
                      </div>
                    )
                  )}
                </ListGroup>
              </Col>
              <Col sm="5">
                {maps.length > 0 ? (
                  <Map ref="map" zoom={13} minZoom={0} className="leaflet">
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                      />
                    <FeatureGroup ref="featureGroup">
                      {maps}
                    </FeatureGroup>
                  </Map>
                ) : null}
                <div>
                  {objet.images.map((image, key) => {
                    return (<img src={`http://localhost:5000/images/objets/${image.nom}`} key={key} alt="" width="150" height="150" className="m-1" />)
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    );
  }
}

export default Objet;

