import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, CardBody, CardText, CardImg,
  CardTitle, Button, Form, FormGroup, Input
} from 'reactstrap';
const axios = require('axios');

class Home extends Component {
  state = {
    villes: [],
    categories: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/villes').then(response => {
      this.setState({villes: response.data})
    });
    axios.get('http://localhost:5000/categories').then(response => {
      this.setState({categories: response.data})
    });
  }

  render() {
    return (
      <div>
        <Container className="py-5">
          <Row className="justify-content-around">
            <Col sm="10" md="8">
              <Form action="/objets" method="get">            
                <FormGroup>
                  <Input type="text" name="search" id="search" placeholder="Rechercher..."/>
                </FormGroup>
                <Row form>
                  <Col md={5}>
                    <FormGroup>
                      <Input type="select" name="ville" id="ville">
                        <option value="">Tout les villes..</option>
                        {this.state.villes.map((ville, key) => {
                          return (
                            <option value={ville.id} key={key}>{ville.nom}</option>
                          )
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Input type="select" name="category" id="category">
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
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-around">
            <Col sm="4" md="3" lg="2">
              <Card className="text-center border-0">
                <Link to="/villes" className="undecorated">
                  <CardImg top width="100%" src="http://localhost:5000/images/resources/villes.png" alt="villes" />
                </Link>
                <CardBody className="px-0 py-3">
                  <Link to="/villes" className="undecorated">
                    <CardTitle tag="h6">VILLES</CardTitle>
                    <CardText tag="h6" className="text-muted small">Tous les ville et leurs communes de l'algerie.</CardText>
                  </Link>
                  <Link to="/villes/add" className="undecorated">
                    <Button color="primary" size="sm" className="mt-2" block>AJOUTER</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4" md="3" lg="2">
              <Card className="text-center border-0">
                <Link to="/categories" className="undecorated">
                  <CardImg top width="100%" src="http://localhost:5000/images/resources/categories.png" alt="categories" />
                </Link>
                <CardBody className="px-0 py-3">
                  <Link to="/categories" className="undecorated">
                    <CardTitle tag="h6">CATEGORIES</CardTitle>
                    <CardText tag="h6" className="text-muted small">Tous les categories dans cette program.</CardText>
                  </Link>
                  <Link to="/categories/add" className="undecorated">
                    <Button color="primary" size="sm" className="mt-2" block>AJOUTER</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
            <Col sm="4" md="3" lg="2">
              <Card className="text-center border-0">
                <Link to="/objets" className="undecorated">
                  <CardImg top width="100%" src="http://localhost:5000/images/resources/objets.png" alt="objets" />
                </Link>
                <CardBody className="px-0 py-3">
                  <Link to="/objets" className="undecorated">
                    <CardTitle tag="h6">OBJETS</CardTitle>
                    <CardText tag="h6" className="text-muted small">Tout les objets dans l'algerie.</CardText>
                  </Link>
                  <Link to="/objets/add" className="undecorated">
                    <Button color="primary" size="sm" className="mt-2" block>AJOUTER</Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col sm="3" className="text-center">
              <Link to="/statistics" className="undecorated">
                <img src="http://localhost:5000/images/resources/statistics.png" width="42" height="42" alt="statistics" />
                <h6 className="small mt-2">STATISTICS</h6>
              </Link>
            </Col>
            <Col sm="3" className="text-center">
              <Link to="/about" className="undecorated">
                <img src="http://localhost:5000/images/resources/info.png" width="42" height="42" alt="info" />
                <h5 className="small mt-2">A PROPOS DE NOUS</h5>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
