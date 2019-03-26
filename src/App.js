import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Album from './components/album/Album';
import Navigation from "./components/Navigation/Navigation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Navigation>
        </Navigation>
        <main>
          <Album/>
                  </main>
      </div>
    );
  }
}

export default App;
