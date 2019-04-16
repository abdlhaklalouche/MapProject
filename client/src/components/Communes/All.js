import React, { Component } from 'react';
import {
  Container,
  Input,
  Spinner,
  Table,
  Form,
  FormGroup,
  Row,
  Col
} from 'reactstrap';
import Back from '../Back';
const axios = require('axios');
const queryString = require('query-string');

class Communes extends Component {
  state = {
    loading: true,
    villes: [],
    communes: [],
    ville: '',
    query: ''
  };
  
  componentDidMount() {
    this.search();
    axios.get('http://localhost:5000/villes').then(response => {
      this.setState({
        villes: response.data,
      });
    });
  }
  
  parse = () => {
    return new Promise(resolve => {
      const parsed = queryString.parse(this.props.location.search);
      this.setState({
        query: (parsed.query) ? parsed.query : '',
        ville: (parsed.ville) ? parsed.ville : '',
      });
      resolve();
    });
  }

  search = () => {
    this.setState({loading: true})
    this.parse().then(() => {
      axios.get('http://localhost:5000/communes', {
        params: {
          query: this.state.query,
          ville: this.state.ville
        }
      }).then(response => {
        this.setState({
          communes: response.data,
          loading: false
        });
      });
    });
  }

  handleText = (e) => {
    const parsed = queryString.parse(this.props.location.search);
    let params = {};
    params['query'] = e.target.value;
    if(parsed.ville)
      params['ville'] = parsed.ville;
    this.props.history.push({
      search: queryString.stringify(params)
    });
    setTimeout(() => {this.search()}, 500);
  }

  handleVille = (e) => {
    const parsed = queryString.parse(this.props.location.search);
    let params = {};
    params['ville'] = e.target.value;
    if(parsed.query)
      params['query'] = parsed.query;
    this.props.history.push({
      search: queryString.stringify(params)
    });
    setTimeout(() => {this.search()}, 500);
  }

  render() {
    return (
      <div>
        <Back title={`Les communes`} />
        <Container className="mt-2 after-top-bar">
          <div className="py-2">
            <Form action="/communes" method="get">
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Input type="text" name="search" id="search" defaultValue={this.state.query} onChange={this.handleText} placeholder="Rechercher..."/>
                  </FormGroup> 
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Input type="select" name="ville" id="ville" value={this.state.ville} onChange={this.handleVille}>
                      <option value="">Tout les villes..</option>
                      {this.state.villes.map((ville, key) => {
                        return (
                          <option value={ville.numero} key={key}>{ville.nom}</option>
                        )
                      })}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
          <div>
            <p>{this.state.communes.length} résultat trouvé</p>
          </div>
          { this.state.loading ? (
              <div className="py-2 text-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </div>
            ) : this.state.communes.length > 0 ? (
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Code postal</th>
                    <th>Objets</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.communes.map((commune, key) => (
                    <tr key={key} className="cursor-pointer" onClick={() => this.props.history.push(`/communes/${commune.id}`)}>
                      <th scope="row">{commune.id}</th>
                      <td>{commune.nom}</td>
                      <td>{commune.code_postal}</td>
                      <td>{commune.objets.length}</td>
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

export default Communes;

