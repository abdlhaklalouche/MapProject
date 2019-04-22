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
import L from 'leaflet';
import { Map , GeoJSON, TileLayer } from 'react-leaflet';
import Back from '../Back';
import AttributList from './AttributList';
const axios = require('axios');


class Ville extends Component {
  state = {
    loading: true,
    found: false,
    ville: {},
  };

  componentWillMount() {
    axios.get(`http://localhost:5000/villes/${this.props.match.params.id}`).then((response) => {
      this.setState({
        loading: false,
      });
      if(response.data) {
        this.setState({
          found: true,
          ville: response.data,
        });
      }
    });    
  }

  delete = (ville_id) => {
    if(window.confirm('Etes-vous sûr?')) {
      axios.get(`http://localhost:5000/villes/delete/${ville_id}`).then((response) => {
        return this.props.history.push(`/villes`);
      });
    }
  }

  objetsCount = () => {
    let count = 0;
    this.state.ville.communes.map(commune => count += commune.objets.length);
    return count;
  }
  
  render() {
    const { ville } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
        <div>
          <Back title={`${ville.nom}`} />
          <Container fluid className="mt-2 after-top-bar">
            <Row>
              <Col sm="7">
                <div className="py-3">
                  <Link to={`/communes/add`}>
                    <Button color="primary" size="sm" className="mr-1">Nouveau commune</Button>
                  </Link>
                  <Link to={`/villes/edit/${ville.id}`}>
                    <Button color="secondary" size="sm" className="mr-1">Modifier</Button>
                  </Link>
                  <Button color="danger" size="sm" className="ml-1" onClick={() => this.delete(ville.id)}>Supprimé</Button>
                </div>
                <ListGroup flush>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-5">Numero de la ville</dt>
                      <dd className="col-sm-7">{ville.numero}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-5">Superficie</dt>
                      <dd className="col-sm-7">{ville.superficie} km²</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-5">Population</dt>
                      <dd className="col-sm-7">{ville.population}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem tag={Link} to={`/communes/?ville=${ville.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-5">Communes</dt>
                      <dd className="col-sm-7">{ville.communes.length}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem tag={Link} to={`/objets/?ville=${ville.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-5">Objets</dt>
                      <dd className="col-sm-7">{this.objetsCount()}</dd>
                    </dl>
                  </ListGroupItem>
                  {ville.details.map((detail, i) => 
                    (
                      <div key={i}>
                        <AttributList detail={detail} />
                      </div>
                    )
                  )}
                </ListGroup>
              </Col>
              <Col sm="5">
                {ville.frontieres ? (
                  <Map bounds={L.geoJson(ville.frontieres).getBounds()} zoom={13} className="leaflet">
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <GeoJSON data={ville.frontieres} />
                  </Map>
                ) : null} 
                <div>
                  {ville.images.map((image, key) => {
                    return (<img src={`http://localhost:5000/images/villes/${image.nom}`} key={key} alt="" width="150" height="150" className="m-1" />)
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

export default Ville;

