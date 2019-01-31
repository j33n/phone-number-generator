import { Link, Router } from '@reach/router';

import React, { PureComponent } from 'react';
import logo from './assets/phone-generator-logo.png';
import GenerateNumbers from './pages/GenerateNumbers/GenerateNumbers';
import ViewNumbers from './pages/ViewNumbers/ViewNumbers';
import './styles/App.scss';

class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <div className="header">
          <div className="menu generate">
            <h1><Link to="/">Generate New Numbers</Link></h1>
          </div>
          <div className="logo-container">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <div className="menu view">
            <h1><Link to="view">View All Numbers</Link></h1>
          </div>
        </div>
        <div className="container">
          <Router>
            <GenerateNumbers path="/" />
            <ViewNumbers path="view" />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
