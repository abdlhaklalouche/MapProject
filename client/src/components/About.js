import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import Back from './Back';

class About extends Component {
  render() {
    return (
      <div>
        <Back title="A propos de nous" />
        <Container className="after-top-bar">
          <h1 className="mt-5">A propos de nous</h1>
          <h5>Abdelhak Lallouche et Abdelhafid bachtouti</h5>
          <div className="mt-5">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </Container>
      </div>
    );
  }
}

export default About;
