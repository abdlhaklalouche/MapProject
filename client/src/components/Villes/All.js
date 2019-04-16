import React, { Component } from 'react';
import {
  Container,
  Input,
  Spinner,
  Table,
} from 'reactstrap';
import Back from '../Back';
const axios = require('axios');

class Villes extends Component {
  state = {
    loading: true,
    villes: [],
  };
  
  componentDidMount() {
    axios.get('http://localhost:5000/villes').then(response => {
      this.setState({
        villes: response.data,
        loading: false
      });
    });
  }

  search = (e) => {
    this.setState({loading: true})
    axios.get('http://localhost:5000/villes',{
      params: {
        query: e.target.value 
      }
    }).then(response => {
      this.setState({
        villes: response.data,
        loading: false
      })
    });
  }

  objetsCount = (ville) => {
    let count = 0;
    ville.communes.map(commune => count += commune.objets.length);
    return count;
  }

  render() {
    return (
      <div>
        <Back title="Les villes de l'algerie" />
        <Container className="mt-2 after-top-bar">
          <div className="py-2">
            <Input type="text" onKeyUp={this.search} placeholder="Rechercher..."/>
          </div>
          <div>
            <p>{this.state.villes.length} résultat trouvé</p>
          </div>
          { this.state.loading ? (
              <div className="py-2 text-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </div>
            ) : this.state.villes.length > 0 ? (
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Nom</th>
                    <th>Superficie</th>
                    <th>Population</th>
                    <th>Communes</th>
                    <th>Objets</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.villes.map((ville, key) => (
                    <tr key={key} className="cursor-pointer" onClick={() => this.props.history.push(`/villes/${ville.id}`)}>
                      <th scope="row">{ville.numero}</th>
                      <td>{ville.nom}</td>
                      <td>{ville.superficie} km²</td>
                      <td>{ville.population}</td>
                      <td>{ville.communes.length}</td>
                      <td>{this.objetsCount(ville)}</td>
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

export default Villes;

