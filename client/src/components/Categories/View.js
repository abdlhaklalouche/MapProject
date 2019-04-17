import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Table
} from 'reactstrap';
import Back from '../Back';
const axios = require('axios');


class Villes extends Component {
  state = {
    loading: true,
    found: false,
    category: {},
  };
  
  componentWillMount() {
    axios.get(`http://localhost:5000/categories/${this.props.match.params.id}`).then((response) => {
      this.setState({
        loading: false,
      });
      if(response.data) {
        this.setState({
          found: true,
          category: response.data,
        });
      }
    });    
  }

  delete = (category_id) => {
    if(window.confirm('Etes-vous sûr?')) {
      axios.get(`http://localhost:5000/categories/delete/${category_id}`).then((response) => {
        return this.props.history.push(`/categories`);
      });
    }
  }
  
  render() {
    const { category } = this.state;
    return (
      this.state.loading ? null : !this.state.found ? (<div>404 page non trouvé</div>) : (
        <div>
          <Back title={`${category.nom}`} />
          <Container fluid className="mt-2 after-top-bar">
            <Row>
              <Col sm="9">
                <div className="py-3">
                  <Link to={`/categories/edit/${category.id}`}>
                    <Button color="secondary" size="sm" className="mr-1">Modifier</Button>
                  </Link>
                  <Button color="danger" size="sm" className="ml-1" onClick={() => this.delete(category.id)}>Supprimé</Button>
                </div>
                <ListGroup flush>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-4">Numero de la category</dt>
                      <dd className="col-sm-8">{category.id}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem tag={Link} to={`/objets/?category=${category.id}`} className="bg-light undecorated">
                    <dl className="row my-0">
                      <dt className="col-sm-4">Objets</dt>
                      <dd className="col-sm-8">{category.objets.length}</dd>
                    </dl>
                  </ListGroupItem>
                  <ListGroupItem>
                    <dl className="row my-0">
                      <dt className="col-sm-4">Les attributs</dt>
                      <dd className="col-sm-8">
                        <Table borderless striped>
                          <thead>
                            <tr>
                              <th>Nom</th>
                              <th>Type</th>
                              <th>Optionnel</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.attributs.map((attribut, key) => (
                              <tr key={key}>
                                <td>{attribut.nom}</td>
                                <td>{attribut.categories_attributs_type.nom}</td>
                                <td>{attribut.optionnel ? 'Oui' : 'No'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </dd>
                    </dl>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
      )
    );
  }
}

export default Villes;

