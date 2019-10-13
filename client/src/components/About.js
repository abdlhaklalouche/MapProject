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
            <p>L’objectif ciblé dans notre projet de fin d’études est la conception et le développement d'une application qui gère les objets et les emplacements dans la carte, Notre travail consiste à analyser, ajouter, mettre à jour et supprimer des villes, des communes, des catégories, des objets et des emplacements dans la carte avec des attributs dynamiques. Pour cela, on a conçu et mis en œuvre une base de données, implémentée sous le SGBD Oracle Mysql Workbench et interfacée par la langage Javascript/ElectronJs et nous avons traité la carte en utilisant la librairie appelée leaflet.</p>
          </div>
        </Container>
      </div>
    );
  }
}

export default About;
