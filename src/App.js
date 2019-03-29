import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Album from './components/album/Album';
import Navigation from "./components/Navigation/Navigation";
import {Route, Switch} from 'react-router-dom';
import Currency from "./components/Currency/Currency";
import Calculator from "./components/Calculator/Calculator";
import Game from './components/Game/Game';




class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Navigation/>
        <main>


          <Switch>
              <Route path="/Album" component={Album}/>
              <Route path="/Currency" component={Currency}/>
              <Route path="/Calculator" component={Calculator}/>
              <Route path="/Game" component={Game}/>
              {/*<Route path="/aboutUs" component={AboutUs}/>*/}
            </Switch>
        </main>

      </div>
    );
  }
}

export default App;
