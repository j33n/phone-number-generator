import React, { PureComponent } from 'react';
import logo from './assets/phone-generator-logo.png';
import './styles/App.scss';

class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <div className="header">
          <div>Generate New Numbers</div>
          <img src={logo} className="logo" alt="logo" />
          <div>View All Numbers</div>
        </div>
        <div className="container">
          <div className="content">Numbers</div>

        </div>
      </div>
    );
  }
}

export default App;
