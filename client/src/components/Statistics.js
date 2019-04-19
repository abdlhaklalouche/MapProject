import React, { Component } from 'react';
import {
  Container, Row, Col,
  Table
} from 'reactstrap';
import Back from './Back';
const axios = require('axios');

class Statistics extends Component {
  state = {
    villes: [],
    communes: [],
    categories: [],
    objets: [],
  };
  componentDidMount() {
    axios.get('http://localhost:5000/villes').then(({ data }) => this.setState({villes: data}));
    axios.get('http://localhost:5000/communes').then(({ data }) => this.setState({communes: data}));
    axios.get('http://localhost:5000/categories').then(({ data }) => this.setState({categories: data}));
    axios.get('http://localhost:5000/objets').then(({ data }) => this.setState({objets: data}));
  }

  objetsCount = (ville) => {
    let count = 0;
    ville.communes.map(commune => count += commune.objets.length);
    return count;
  }

  render() {
    const { villes, communes, categories, objets } = this.state;
    return (
      <div>
        <Back title="Statistics" />
        <Container className="bg-dark text-white after-top-bar" fluid>
          <Row className="py-5 text-center">
            <Col>
              <h2>{villes.length}</h2>
              <h6 className="text-muted">Tout les villes</h6>
            </Col>
            <Col>
              <h2>{communes.length}</h2>
              <h6 className="text-muted">Tout les communes</h6>
            </Col>
            <Col>
              <h2>{categories.length}</h2>
              <h6 className="text-muted">Tout les categories</h6>
            </Col>
            <Col>
              <h2>{objets.length}</h2>
              <h6 className="text-muted">Tout les objets</h6>
            </Col>
          </Row>
        </Container>
        <Container>
          {villes.map(ville => (
            <Row className="my-5">
              <Col sm="4">
                <h4>{ville.nom}</h4>
                <h6 className="small">Total communes: {ville.communes.length}</h6>
                <h6 className="small">Total objets: {this.objetsCount(ville)}</h6>
              </Col>
              <Col sm="8">
                <Row>
                  {ville.communes.map((commune, i) => (
                    <Col key={i} sm="4" className="mb-4">
                      <h6>{commune.nom}</h6>
                      <h6 className="small">Total objets: {commune.objets.length}</h6>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}

export default Statistics;
