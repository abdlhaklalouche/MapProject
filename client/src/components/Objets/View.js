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

class Objet extends Component {
  state = {
    loading: true,
    found: false,
    objet: {},
  };

  componentWillMount() {
    axios.get(`http://localhost:5000/objets/${this.props.match.params.id}`).then((response) => {
      this.setState({
        loading: false,
      });
      if(response.data) {
        this.setState({
          found: true,
          objet: response.data,
        });
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
    const { objet } = this.state;
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

