import React from 'react';
import axios from 'axios';
import Day from './Day';
import Daily from './Daily';
import { getData } from '../scripts/cityForecast';
import { displayForecastByGeo } from '../scripts/geoForecast';
import { renderSlider } from '../scripts/script';
import PropTypes from 'prop-types';

class Details extends React.Component {
  static propTypes = {
    url: PropTypes.string,
  };

  state = {
    mouseDown: false,
    mouse: [],
    error: null,
    isLoaded: false,
    data: {},
    coords: [],
    forecast: {},
  }

  detailsRef = React.createRef();

  componentDidMount() {
    const geo = this.props.geo;
    axios.get(this.props.url)
      .then(result => {
        if (geo === true) {
          const forecast = displayForecastByGeo(result.data);
          this.setState({
            isLoaded: true,
            forecast,
          })
        } else {
          const data = getData(result.data);
          this.setState({
            isLoaded: true,
            data: data.forecast,
            coords: data.loc,
          })
        }
        
      },
        error => {
          console.log('err at api call details,' , error);
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
  }
  handleMouse = (mouse, evt) => {
    if (mouse === 'up' || mouse === 'leave') 
      this.setState({
        mouseDown: false,
      });
    if (mouse === 'down') {
      const mousePosition = evt.pageX - this.detailsRef.current.offsetLeft;
      const scrollLeft = this.detailsRef.current.scrollLeft;
      this.setState({
        mouseDown: true,
        mouse: [mousePosition, scrollLeft],
      });
    }

    if (mouse === 'move' && this.state.mouseDown)
      renderSlider(evt, this.detailsRef, this.state.mouse);
  }

  render() {
    const coords = this.state.coords;
    if (coords.length === 0) {
      return (
        <div 
          className="details"
          ref ={ this.detailsRef }
          onMouseDown={ evt => this.handleMouse('down', evt) }
          onMouseUp={ evt => this.handleMouse('up', evt) }
          onMouseLeave={ evt => this.handleMouse('leave', evt) }
          onMouseMove={ evt => this.handleMouse('move', evt) }        
        >
          {
            Object.keys(this.state.forecast).map(day =>
              <Day day={ this.state.forecast[day] } key={ day } />
            )
          }
        </div>
      );
    } else {
      return (
        <Daily data={ this.state.data } coords={ coords } />
      );
    }
  }
}

export default Details;