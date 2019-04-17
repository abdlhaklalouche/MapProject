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
import Back from '../Back';
import AttributList from './AttributList';
const axios = require('axios');


class Commune extends Component {
  state = {
    loading: true,
    found: false,
    commune: {},
  };

  componentWillMount() {
    axios.get(`http://localhost:5000/communes/${this.props.match.params.id}`).then((response) => {
      this.setState({
        loading: false,
      });
      if(response.data) {
        this.setState({
          found: true,
          commune: response.data,
        });
      }
    });    
  }

  delete = (commune) => {
    if(window.confirm('Etes-vous sûr?')) {
      axios.get(`http://localhost:5000/communes/delete/${commune.id}`).then((response) => {
        return this.props.history.push(`/communes/?villes=${commune.ville.id}`);
      });
    }
  }
  
  render() {
    const { commune } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
        <div>
          <Back title={`${commune.nom}`} />
          <Container fluid className="mt-2 after-top-bar">
            <Row>
              <Col sm="7">
                <div className="py-3">
                  <Link to={`/communes/edit/${commune.id}`}>
                    <Button color="secondary" size="sm" className="mr-1">Modifier</Button>
                  </Link>
                  <Button color="danger" size="sm" className="ml-1" onClick={() => this.delete(commune)}>Supprimé</Button>
                </div>
                <ListGroup flush>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-5">Numero de la commune</dt>
                      <dd className="col-sm-7">{commune.id}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-5">Code postal</dt>
                      <dd className="col-sm-7">{commune.code_postal}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem tag={Link} to={`/villes/${commune.ville.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-5">La ville</dt>
                      <dd className="col-sm-7">{commune.ville.nom}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem tag={Link} to={`/objets/?commune=${commune.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-5">Objets</dt>
                      <dd className="col-sm-7">{commune.objets.length}</dd>
                    </dl>
                  </ListGroupItem>
                  {commune.details.map(detail => 
                  (<AttributList detail={detail} />)
                  )}
                </ListGroup>
              </Col>
              <Col sm="5">
                <div>
                  {commune.images.map((image, key) => {
                    return (<img src={`http://localhost:5000/images/communes/${image.nom}`} alt="" width="150" height="150" className="m-1" />)
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

export default Commune;

