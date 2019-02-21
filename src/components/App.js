import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import Search from './Search';
import Result from './Result';
import Details from './Details';
import { createUrl, createUrl5 } from '../scripts/script';

class App extends Component {
  state = {
    url: null,
    url5: null,
    geo: false,
  }
  searchCity = city => {
    const url = createUrl(city.split());
    const url5 = createUrl5(city.split());
    this.setState({ url, url5 });
  };
  searchCoords = coords => {
    const url = createUrl(coords);
    const url5 = createUrl5(coords);
    this.setState({ 
      url,
      url5,
      geo: true,
    });
  };
  homepage = () => {
    this.setState({
      url: null,
      geo: false,
    });
  };

  render() {
    if (this.state.url === null) {
      return (
        <div className="app">
          <header className="app_header">
            <p className="app_title">Mon application météo*</p>
          </header>
          <Search 
            searchCity={ this.searchCity }
            searchCoords={ this.searchCoords }
          />
        </div>
      );
  }
  if (this.state.url !== null) {
    return (
      <div className="app">
        <Result url={ this.state.url } / >
        <Details url= { this.state.url5 } geo={ this.state.geo }/>
        <div
            className="app_back"
            onClick={ () => this.homepage() }
          >Retour</div>
      </div>
    );
  }
  
  }
}

export default App;
