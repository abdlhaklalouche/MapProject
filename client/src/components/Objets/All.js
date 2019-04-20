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
    query: ''
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
        this.setState({
          objets: response.data,
          loading: false
        });
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
          { this.state.loading ? (
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
        </Container>
      </div>
    );
  }
}

export default Objets;

