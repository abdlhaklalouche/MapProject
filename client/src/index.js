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

import Categories from './components/Categories/All';
import Category from './components/Categories/View';
// import AddCategory from './components/Categories/Add';


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
        <Route path="/communes/:id"  component={Commune} />

        <Route exact path="/categories"  component={Categories} />
        {/* <Route path="/categories/add"  component={AddCategory} /> */}
        <Route path="/categories/:id"  component={Category} />


      </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);

