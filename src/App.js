import React from 'react';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <div className="container">
      <div className="header">
        <img src={ require('./assets/logo_crewmeister_white.svg') }
          alt="company logo" height="15px" width="152px"
        />
      </div>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
