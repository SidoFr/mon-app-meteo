import React from 'react';
import axios from 'axios';
import { displayCurrentData } from '../scripts/script';
import PropTypes from 'prop-types';

class Result extends React.Component {
  static propTypes = {
    url: PropTypes.string,
  };

  state = {
    error: null,
    isLoaded: false,
    weather: {},
  }
  componentDidMount() {
    axios.get(this.props.url)
      .then(
        result => {
          const weather = displayCurrentData(result.data);
          this.setState({
            isLoaded: true,
            weather,
          });
        },
        error => {
          console.log('err at result api call: ', error);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
  }
  render() {
    if (this.state.error !== null) {
      return(
        <div className="result">
          <p className="result_error">Erreur.<br/>Essayez une commune proche
          <br/>ou une autre orthographe.</p>
        </div>
      );
    } else {
      const display = this.state.weather;
      return(
        <div className="result">
        <p>Actuellement à</p>
          <h2 className="result_city">{ display.city }, {display.country }</h2>
          <div className="result_forecast">
            <p className="result_weather">{ display.description }, </p>
            <p className="result_celsius">{ display.celsius }</p>
          </div>
          <img 
            src={ `/icons/${display.icon}.png` }
            alt="icône représentant le temps"
          />
        </div>
      );
    }
  }
}

export default Result;