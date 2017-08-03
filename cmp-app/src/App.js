import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainView from './views/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainView></MainView>
      </div>
    );
  }
}

export default App;
