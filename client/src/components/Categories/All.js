import React, { Component } from 'react';
import {
  Container,
  Input,
  Spinner,
  Table,
} from 'reactstrap';
import Back from '../Back';
const axios = require('axios');

class Categories extends Component {
  state = {
    loading: true,
    categories: [],
  };
  
  componentDidMount() {
    axios.get('http://localhost:5000/categories').then(response => {
      this.setState({
        categories: response.data,
        loading: false
      });
    });
  }

  search = (e) => {
    this.setState({loading: true})
    axios.get('http://localhost:5000/categories',{
      params: {
        query: e.target.value 
      }
    }).then(response => {
      this.setState({
        categories: response.data,
        loading: false
      })
    });
  }

  render() {
    return (
      <div>
        <Back to="/" title="Les categories dans l'algerie" />
        <Container className="mt-2 after-top-bar">
          <div className="py-2">
            <Input type="text" onKeyUp={this.search} placeholder="Rechercher..."/>
          </div>
          <div>{this.state.categories.length} résultat trouvé</div>
          { this.state.loading ? (
              <div className="py-2 text-center">
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </div>
            ) : this.state.categories.length > 0 ? (
              <Table borderless striped>
                <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Nom</th>
                    <th>Objets</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.categories.map((category, key) => (
                    <tr key={key} className="cursor-pointer" onClick={() => this.props.history.push(`/categories/${category.id}`)}>
                      <th scope="row">{category.id}</th>
                      <td>{category.nom}</td>
                      <td>{category.objets.length}</td>
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

export default Categories;

