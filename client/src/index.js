import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from './components/Home';
import About from './components/About';
import Statistics from './components/Statistics';

import Villes from './components/Villes/All';
import Ville from './components/Villes/View';
import AddVille from './components/Villes/Add';
import EditVille from './components/Villes/Edit';

import Communes from './components/Communes/All';
import Commune from './components/Communes/View';
import AddCommune from './components/Communes/Add';
import EditCommune from './components/Communes/Edit';


import Categories from './components/Categories/All';
import Category from './components/Categories/View';
import AddCategory from './components/Categories/Add';
import EditCategory from './components/Categories/Edit';

// import Objets from './components/Objets/All';
// import Objet from './components/Objets/View';
// import AddObjet from './components/Communes/Add';
// import EditObjet from './components/Objets/Edit';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
        <Route exact path="/"  component={Home} />
        <Route path="/statistics"  component={Statistics} />
        <Route path="/about"  component={About} />

        <Route exact path="/villes"  component={Villes} />
        <Route path="/villes/add"  component={AddVille} />
        <Route path="/villes/edit/:id/"  component={EditVille} />
        <Route path="/villes/:id"  component={Ville} />

        <Route exact path="/communes"  component={Communes} />
        <Route path="/communes/add"  component={AddCommune} />
        <Route path="/communes/edit/:id/"  component={EditCommune} />
        <Route path="/communes/:id"  component={Commune} />

        <Route exact path="/categories"  component={Categories} />
        <Route path="/categories/add"  component={AddCategory} />
        <Route path="/categories/edit/:id/"  component={EditCategory} />
        <Route path="/categories/:id"  component={Category} />

        {/* <Route exact path="/objets"  component={Objets} />
        <Route path="/objets/add"  component={AddObjet} />
        <Route path="/objets/edit/:id/"  component={EditObjet} />
        <Route path="/objets/:id"  component={Objet} /> */}

      </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);

