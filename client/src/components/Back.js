import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';

export default class Back extends Component {
  render() {
    return (
      <Container fluid className="p-0 border-bottom" id="top-bar">
        <div className="p-3 d-flex flex-row align-items-center">
          <h3 className="m-0">
            <Button color="link" size="lg" className="p-0 undecorated d-inline-block" onClick={() => window.history.back()}>◄</Button>
          </h3>
          <h5 className="m-0 flex-grow-1 text-center">{this.props.title}</h5>
        </div>
      </Container>
    )
  }
}
